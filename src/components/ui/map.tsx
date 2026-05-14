import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapPoint {
  lat: number;
  lng: number;
  label?: string;
}

interface MapRoute {
  start: MapPoint;
  end: MapPoint;
  color?: string;
  strokeWidth?: number;
}

type MarkerTone = "hq" | "india" | "overseas" | "reach";

interface MapMarker {
  lat: number;
  lng: number;
  label?: string;
  tone?: MarkerTone;
  pulse?: boolean;
  labelDx?: number;
  labelDy?: number;
  labelWidth?: number;
}

interface MapProps {
  dots?: MapRoute[];
  markers?: MapMarker[];
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
  darkMode?: boolean;
}

const markerPalette: Record<MarkerTone, { fill: string; soft: string; ring: string; text: string }> = {
  hq: {
    fill: "#f8d24b",
    soft: "rgba(248,210,75,0.26)",
    ring: "rgba(248,210,75,0.5)",
    text: "#fff7cf",
  },
  india: {
    fill: "#ffffff",
    soft: "rgba(255,255,255,0.18)",
    ring: "rgba(96,165,250,0.42)",
    text: "#f8fbff",
  },
  overseas: {
    fill: "#60a5fa",
    soft: "rgba(96,165,250,0.22)",
    ring: "rgba(96,165,250,0.45)",
    text: "#d8eafe",
  },
  reach: {
    fill: "#3b82f6",
    soft: "rgba(59,130,246,0.18)",
    ring: "rgba(59,130,246,0.34)",
    text: "#d5e5ff",
  },
};

export function WorldMap({
  dots = [],
  markers = [],
  lineColor = "#60a5fa",
  showLabels = true,
  labelClassName = "text-xs",
  animationDuration = 1.9,
  loop = true,
  darkMode = true,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const map = useMemo(() => new DottedMap({ height: 100, grid: "diagonal" }), []);

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: darkMode ? "#FFFF7F24" : "#0f172a24",
        shape: "circle",
        backgroundColor: darkMode ? "#060A10" : "#ffffff",
      }),
    [darkMode, map]
  );

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / 2;
    const travel = Math.abs(end.x - start.x);
    const midY = Math.min(start.y, end.y) - Math.max(28, Math.min(84, travel * 0.16));
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const staggerDelay = 0.18;
  const totalAnimationTime = dots.length * staggerDelay + animationDuration;
  const pauseTime = 2.1;
  const fullCycleDuration = totalAnimationTime + pauseTime;
  const useStandalonePointLabels = markers.length === 0;

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[28px] bg-[#060A10] font-sans md:aspect-[2.18/1]">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none object-cover [mask-image:linear-gradient(to_bottom,transparent,white_12%,white_90%,transparent)]"
        alt="world map"
        draggable={false}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(59,130,246,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_26%,rgba(6,10,16,0.12)_100%)]" />

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="absolute inset-0 h-full w-full select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="map-glow">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const path = createCurvedPath(startPoint, endPoint);
          const routeColor = dot.color || lineColor;
          const startTime = (i * staggerDelay) / fullCycleDuration;
          const endTime = (i * staggerDelay + animationDuration) / fullCycleDuration;
          const resetTime = totalAnimationTime / fullCycleDuration;
          const gradientId = `path-gradient-${i}`;

          return (
            <g key={`path-group-${i}`}>
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="8%" stopColor={routeColor} stopOpacity="0.95" />
                  <stop offset="92%" stopColor={routeColor} stopOpacity="0.95" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>

              <motion.path
                d={path}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={dot.strokeWidth || 1}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={loop ? { pathLength: [0, 0, 1, 1, 0] } : { pathLength: 1 }}
                transition={
                  loop
                    ? {
                        duration: fullCycleDuration,
                        times: [0, startTime, endTime, resetTime, 1],
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0,
                      }
                    : {
                        duration: animationDuration,
                        delay: i * staggerDelay,
                        ease: "easeInOut",
                      }
                }
              />

              {loop && (
                <motion.circle
                  r="3.6"
                  fill={routeColor}
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{
                    offsetDistance: [null, "0%", "100%", "100%", "100%"],
                    opacity: [0, 0, 1, 0, 0],
                  }}
                  transition={{
                    duration: fullCycleDuration,
                    times: [0, startTime, endTime, resetTime, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0,
                  }}
                  style={{
                    offsetPath: `path('${path}')`,
                    filter: `drop-shadow(0 0 8px ${routeColor})`,
                  }}
                />
              )}
            </g>
          );
        })}

        {markers.map((marker, index) => {
          const point = projectPoint(marker.lat, marker.lng);
          const tone = markerPalette[marker.tone || "reach"];
          const labelWidth = marker.labelWidth || 144;
          const dx = marker.labelDx ?? 12;
          const dy = marker.labelDy ?? -34;
          const labelX = point.x + dx - labelWidth / 2;
          const labelY = point.y + dy;
          const hasPulse = marker.pulse ?? marker.tone === "hq";

          return (
            <g key={`marker-${index}`}>
              <motion.g
                onHoverStart={() => setHoveredLocation(marker.label || `Location ${index + 1}`)}
                onHoverEnd={() => setHoveredLocation(null)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
                className="cursor-pointer"
              >
                {hasPulse && (
                  <>
                    <circle cx={point.x} cy={point.y} r="8.5" fill={tone.soft}>
                      <animate attributeName="r" values="5;14;5" dur="2.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.65;0;0.65" dur="2.8s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={point.x} cy={point.y} r="6.4" fill="none" stroke={tone.ring} strokeWidth="1">
                      <animate attributeName="r" values="4;11;4" dur="2.8s" begin="0.3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.7;0;0.7" dur="2.8s" begin="0.3s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                <circle
                  cx={point.x}
                  cy={point.y}
                  r={marker.tone === "hq" ? 5.2 : marker.tone === "reach" ? 3.8 : 4.6}
                  fill={tone.fill}
                  filter="url(#map-glow)"
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={marker.tone === "hq" ? 1.5 : 1.25}
                  fill="rgba(255,255,255,0.92)"
                />
              </motion.g>

              {showLabels && marker.label && (
                <motion.g
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.45 }}
                  className="pointer-events-none hidden md:block"
                >
                  <foreignObject x={labelX} y={labelY} width={labelWidth} height="34">
                    <div className="flex h-full items-center justify-center">
                      <span
                        className={`inline-flex rounded-full border border-white/10 bg-[#09111c]/92 px-3 py-1 text-center font-medium shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-sm ${labelClassName}`}
                        style={{ color: tone.text }}
                      >
                        {marker.label}
                      </span>
                    </div>
                  </foreignObject>
                </motion.g>
              )}
            </g>
          );
        })}

        {useStandalonePointLabels &&
          dots.map((dot, i) => {
            const startPoint = projectPoint(dot.start.lat, dot.start.lng);
            const endPoint = projectPoint(dot.end.lat, dot.end.lng);

            return (
              <g key={`points-group-${i}`}>
                {[dot.start, dot.end].map((point, pointIndex) => {
                  const coords = pointIndex === 0 ? startPoint : endPoint;
                  return (
                    <g key={`${point.label}-${pointIndex}`}>
                      <motion.g
                        onHoverStart={() => setHoveredLocation(point.label || `Location ${i + pointIndex}`)}
                        onHoverEnd={() => setHoveredLocation(null)}
                        className="cursor-pointer"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <circle cx={coords.x} cy={coords.y} r="3" fill={lineColor} filter="url(#map-glow)" />
                        <circle cx={coords.x} cy={coords.y} r="3" fill={lineColor} opacity="0.45">
                          <animate attributeName="r" from="3" to="12" dur="2s" begin="0s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.6" to="0" dur="2s" begin="0s" repeatCount="indefinite" />
                        </circle>
                      </motion.g>

                      {showLabels && point.label && (
                        <motion.g
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.18 * i + 0.2, duration: 0.45 }}
                          className="pointer-events-none"
                        >
                          <foreignObject x={coords.x - 62} y={coords.y - 38} width="124" height="32" className="block">
                            <div className="flex h-full items-center justify-center">
                              <span
                                className={`rounded-full border border-white/12 bg-[#08111d]/92 px-3 py-1 font-medium text-white shadow-sm backdrop-blur-sm ${labelClassName}`}
                              >
                                {point.label}
                              </span>
                            </div>
                          </foreignObject>
                        </motion.g>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
      </svg>

      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 rounded-full border border-white/12 bg-[#08111d]/90 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm md:hidden"
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
