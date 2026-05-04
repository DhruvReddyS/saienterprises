import { useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Coordinate helper – equirectangular projection
// x = (lon + 180) / 360 * 1000
// y = (90 - lat) / 180 * 520
// ---------------------------------------------------------------------------
function proj(lon: number, lat: number): [number, number] {
  return [((lon + 180) / 360) * 1000, ((90 - lat) / 180) * 520];
}

// ---------------------------------------------------------------------------
// Continent path data (simplified, 12-20 points each)
// ---------------------------------------------------------------------------
const CONTINENTS: { id: string; d: string }[] = [
  {
    id: 'north-america',
    d: `M 120,60 L 180,55 L 220,70 L 260,90 L 275,120 L 265,160
        L 240,180 L 220,200 L 200,230 L 185,250 L 170,240
        L 155,210 L 140,180 L 130,150 L 110,120 L 105,90 Z`,
  },
  {
    id: 'south-america',
    d: `M 195,255 L 220,245 L 245,255 L 265,275 L 270,310
        L 265,350 L 250,390 L 230,420 L 210,430 L 195,415
        L 185,380 L 182,340 L 188,300 L 190,270 Z`,
  },
  {
    id: 'europe',
    d: `M 440,60 L 480,55 L 510,65 L 525,80 L 515,100
        L 495,110 L 475,105 L 455,115 L 440,108 L 430,90
        L 432,72 Z`,
  },
  {
    id: 'africa',
    d: `M 450,145 L 480,138 L 510,140 L 535,155 L 545,185
        L 548,220 L 540,260 L 520,295 L 495,320 L 475,330
        L 458,320 L 442,295 L 435,260 L 432,220 L 435,185
        L 440,160 Z`,
  },
  {
    id: 'arabian-peninsula',
    d: `M 548,155 L 570,148 L 590,155 L 598,175 L 590,200
        L 572,210 L 555,200 L 548,178 Z`,
  },
  {
    id: 'indian-subcontinent',
    d: `M 608,128 L 630,122 L 650,130 L 660,150 L 655,175
        L 640,200 L 625,215 L 612,210 L 600,192 L 598,168
        L 600,145 Z`,
  },
  {
    id: 'russia-central-asia',
    d: `M 490,30 L 580,25 L 680,28 L 740,40 L 760,60 L 740,75
        L 700,80 L 660,72 L 620,68 L 580,70 L 540,65 L 510,55
        L 490,45 Z`,
  },
  {
    id: 'east-southeast-asia',
    d: `M 720,68 L 780,65 L 820,75 L 840,95 L 830,120
        L 800,135 L 770,140 L 745,130 L 728,110 L 718,88 Z`,
  },
  {
    id: 'australia',
    d: `M 740,320 L 790,310 L 830,315 L 855,335 L 860,365
        L 845,390 L 815,400 L 780,398 L 755,380 L 740,355
        L 735,330 Z`,
  },
];

// ---------------------------------------------------------------------------
// Location data
// ---------------------------------------------------------------------------
interface Office {
  id: string;
  label: string;
  lon: number;
  lat: number;
  type: 'hq' | 'india' | 'overseas';
}

interface ReachDot {
  id: string;
  lon: number;
  lat: number;
}

const OFFICES: Office[] = [
  { id: 'hyderabad', label: 'Hyderabad\n(HQ)', lon: 78.5, lat: 17.4, type: 'hq' },
  { id: 'delhi', label: 'Delhi', lon: 77.2, lat: 28.6, type: 'india' },
  { id: 'meerut', label: 'Meerut', lon: 77.7, lat: 29.0, type: 'india' },
  { id: 'mumbai', label: 'Mumbai', lon: 72.88, lat: 19.1, type: 'india' },
  { id: 'pune', label: 'Pune', lon: 73.9, lat: 18.5, type: 'india' },
  { id: 'vijayawada', label: 'Vijayawada', lon: 80.6, lat: 16.5, type: 'india' },
  { id: 'nairobi', label: 'Nairobi\nKenya', lon: 36.8, lat: -1.3, type: 'overseas' },
  { id: 'addisababa', label: 'Addis Ababa\nEthiopia', lon: 38.7, lat: 9.0, type: 'overseas' },
  { id: 'colombo', label: 'Colombo\nSri Lanka', lon: 79.86, lat: 6.93, type: 'overseas' },
];

const REACH_DOTS: ReachDot[] = [
  { id: 'dubai', lon: 55.3, lat: 25.2 },
  { id: 'nepal', lon: 84.1, lat: 28.4 },
  { id: 'capetown', lon: 18.4, lat: -33.9 },
  { id: 'daressalaam', lon: 39.3, lat: -6.8 },
  { id: 'oman', lon: 58.6, lat: 23.6 },
  { id: 'accra', lon: -0.2, lat: 5.6 },
];

// Arc targets: from Hyderabad to these offices/dots
const ARC_TARGETS = ['nairobi', 'dubai', 'colombo', 'addisababa', 'capetown'];

// ---------------------------------------------------------------------------
// Quadratic bezier arc helper
// Picks a control point offset perpendicular to the midpoint to arc upward
// ---------------------------------------------------------------------------
function arcPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  curvature = 0.25,
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  // Perpendicular unit vector (rotated 90° counter-clockwise)
  const px = -dy / len;
  const py = dx / len;
  const offset = len * curvature;
  const cx = mx + px * offset;
  const cy = my + py * offset;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
interface PinProps {
  cx: number;
  cy: number;
  color: string;
  r?: number;
  pulse?: boolean;
  label?: string;
  labelDx?: number;
  labelDy?: number;
}

function Pin({ cx, cy, color, r = 5, pulse = false, label, labelDx = 6, labelDy = 3 }: PinProps) {
  return (
    <g>
      {pulse && (
        <>
          <circle cx={cx} cy={cy} r={r + 5} fill="none" stroke={color} strokeWidth={0.8} opacity={0.3}>
            <animate attributeName="r" values={`${r + 3};${r + 9};${r + 3}`} dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy={cy} r={r + 2} fill="none" stroke={color} strokeWidth={0.6} opacity={0.2}>
            <animate attributeName="r" values={`${r + 1};${r + 6};${r + 1}`} dur="2.4s" begin="0.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      <circle cx={cx} cy={cy} r={r} fill={color} opacity={0.9} />
      <circle cx={cx} cy={cy} r={r * 0.4} fill="rgba(255,255,255,0.85)" />
      {label && label.split('\n').map((line, i) => (
        <text
          key={i}
          x={cx + labelDx}
          y={cy + labelDy + i * 9}
          fill="rgba(255,255,255,0.75)"
          fontSize={8}
          fontFamily="'DM Sans', sans-serif"
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

interface ArcLineProps {
  d: string;
  visible: boolean;
  delay?: number;
}

function ArcLine({ d, visible, delay = 0 }: ArcLineProps) {
  // We animate strokeDashoffset via CSS animation triggered by `visible`
  return (
    <path
      d={d}
      fill="none"
      stroke="#3B82F6"
      strokeWidth={0.8}
      strokeLinecap="round"
      style={{
        strokeDasharray: 600,
        strokeDashoffset: visible ? 0 : 600,
        transition: visible
          ? `stroke-dashoffset 1.6s ease-out ${delay}s`
          : 'none',
        opacity: visible ? 0.65 : 0,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Legend
// ---------------------------------------------------------------------------
function Legend() {
  const items = [
    { color: '#FACC15', label: 'HQ – Hyderabad' },
    { color: '#EF4444', label: 'India Offices' },
    { color: '#3B82F6', label: 'Overseas (Kenya/Ethiopia/SL)' },
    { color: 'rgba(59,130,246,0.6)', label: 'Export Markets' },
  ];
  return (
    <g transform="translate(18, 430)">
      <rect x={-6} y={-14} width={148} height={items.length * 18 + 10} rx={4} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />
      {items.map((item, i) => (
        <g key={item.label} transform={`translate(0, ${i * 18})`}>
          <circle cx={6} cy={0} r={4} fill={item.color} />
          <circle cx={6} cy={0} r={1.6} fill="rgba(255,255,255,0.8)" />
          <text
            x={16}
            y={4}
            fill="rgba(255,255,255,0.55)"
            fontSize={8}
            fontFamily="'DM Sans', sans-serif"
          >
            {item.label}
          </text>
        </g>
      ))}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function WorldPresenceMap() {
  const containerRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pre-compute projected coordinates
  const [hqX, hqY] = proj(78.5, 17.4);

  const officeCoords = OFFICES.map((o) => ({ ...o, ...(() => { const [x, y] = proj(o.lon, o.lat); return { x, y }; })() }));
  const reachCoords = REACH_DOTS.map((r) => ({ ...r, ...(() => { const [x, y] = proj(r.lon, r.lat); return { x, y }; })() }));

  // Arc destination lookup: combine offices + reach dots
  const allPoints: Record<string, [number, number]> = {};
  officeCoords.forEach((o) => { allPoints[o.id] = [o.x, o.y]; });
  reachCoords.forEach((r) => { allPoints[r.id] = [r.x, r.y]; });

  const arcs = ARC_TARGETS.map((targetId, idx) => {
    const [tx, ty] = allPoints[targetId] ?? [0, 0];
    return {
      id: targetId,
      d: arcPath(hqX, hqY, tx, ty, 0.22),
      delay: idx * 0.35,
    };
  });

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 1000 520"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block', background: '#060A10' }}
      aria-label="World presence map – Sai Enterprises"
    >
      <defs>
        {/* Ocean radial glow */}
        <radialGradient id="oceanGlow" cx="55%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#0D2340" stopOpacity="1" />
          <stop offset="100%" stopColor="#060A10" stopOpacity="1" />
        </radialGradient>
        {/* Subtle vignette */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="#060A10" stopOpacity="0.7" />
        </radialGradient>
      </defs>

      {/* Ocean background */}
      <rect width={1000} height={520} fill="url(#oceanGlow)" />

      {/* Lat/lon grid lines (very subtle) */}
      {[-60, -30, 0, 30, 60].map((lat) => {
        const [, y] = proj(0, lat);
        return (
          <line
            key={`lat-${lat}`}
            x1={0} y1={y} x2={1000} y2={y}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={0.5}
          />
        );
      })}
      {[-120, -60, 0, 60, 120].map((lon) => {
        const [x] = proj(lon, 0);
        return (
          <line
            key={`lon-${lon}`}
            x1={x} y1={0} x2={x} y2={520}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={0.5}
          />
        );
      })}

      {/* Continents */}
      {CONTINENTS.map((c) => (
        <path
          key={c.id}
          d={c.d}
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={0.6}
          strokeLinejoin="round"
        />
      ))}

      {/* Vignette overlay */}
      <rect width={1000} height={520} fill="url(#vignette)" />

      {/* Arc lines – drawn from HQ to key destinations */}
      {arcs.map((arc) => (
        <ArcLine key={arc.id} d={arc.d} visible={visible} delay={arc.delay} />
      ))}

      {/* Global reach dots */}
      {reachCoords.map((r) => (
        <g key={r.id}>
          <circle cx={r.x} cy={r.y} r={4} fill="rgba(59,130,246,0.18)" />
          <circle cx={r.x} cy={r.y} r={2.5} fill="rgba(59,130,246,0.6)" />
          <circle cx={r.x} cy={r.y} r={1} fill="rgba(255,255,255,0.7)" />
        </g>
      ))}

      {/* Office pins */}
      {officeCoords.map((o) => {
        const isHQ = o.type === 'hq';
        const color = isHQ ? '#FACC15' : o.type === 'india' ? '#EF4444' : '#3B82F6';
        const r = isHQ ? 7 : 5;
        // Label offset: push label away from neighbouring pins
        let ldx = 7;
        let ldy = 3;
        if (o.id === 'pune') { ldx = -48; ldy = 3; }
        if (o.id === 'vijayawada') { ldx = 7; ldy = 12; }
        if (o.id === 'delhi') { ldx = -36; ldy = -5; }
        if (o.id === 'nairobi') { ldx = 7; ldy = -5; }

        return (
          <Pin
            key={o.id}
            cx={o.x}
            cy={o.y}
            color={color}
            r={r}
            pulse={isHQ}
            label={o.label}
            labelDx={ldx}
            labelDy={ldy}
          />
        );
      })}

      {/* Legend */}
      <Legend />

      {/* Title */}
      <text
        x={500}
        y={22}
        textAnchor="middle"
        fill="rgba(255,255,255,0.35)"
        fontSize={10}
        letterSpacing={2}
        fontFamily="'DM Sans', sans-serif"
        style={{ textTransform: 'uppercase' }}
      >
        GLOBAL PRESENCE
      </text>
    </svg>
  );
}
