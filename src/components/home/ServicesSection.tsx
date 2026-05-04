import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import saiLogo from '@/assets/sai-logo-cmyk.png';

const serviceSteps = [
  { number: '01', title: 'Machine\nSuggestions', detail: 'Right shortlist for\noutput & budget' },
  { number: '02', title: 'Consultancy', detail: 'Technical guidance\nbefore commitment' },
  { number: '03', title: 'Sourcing', detail: 'Best-fit brands\n& machine options' },
  { number: '04', title: 'Planning', detail: 'Growth-ready line\n& floor planning' },
  { number: '05', title: 'Installation', detail: 'Setup that gets\nproduction-ready fast' },
  { number: '06', title: 'Deployment', detail: 'Smooth rollout\ninto your workflow' },
  { number: '07', title: 'After-Sales', detail: 'Follow-up, spares\n& continuity' },
  { number: '08', title: 'Technical\nSupport', detail: 'Machine-side help\nwhen it matters' },
];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ringRot, setRingRot] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setRevealed(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const raw = (window.innerHeight - rect.top) / (window.innerHeight + rect.height * 0.35);
        const mix = clamp(raw, 0, 1);
        setActiveIndex(clamp(Math.round(mix * (serviceSteps.length - 1)), 0, serviceSteps.length - 1));
        setRingRot(mix * 30);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // SVG constants — all in SVG coordinate space, no HTML overflow possible
  const CX = 400;
  const CY = 400;
  const RING_R = 256;
  const LABEL_R = 326;

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#060A10',
        padding: '120px 0 112px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ambient blobs */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 18% 22%, rgba(59,130,246,0.09) 0%, transparent 30%), radial-gradient(circle at 80% 16%, rgba(59,130,246,0.07) 0%, transparent 25%)',
      }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px', position: 'relative' }}
        className="max-md:!px-6"
      >
        {/* ── Main: caption (left) + orbital (right) ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'center',
        }}
          className="max-lg:!grid-cols-1 max-lg:!gap-10"
        >
          {/* ── LEFT: caption + step list ── */}
          <div style={{
            opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)',
            transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {/* Header */}
            <div style={{
              fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#3B82F6', marginBottom: 18,
              display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700,
            }}>
              <div style={{ width: 32, height: 1, background: '#3B82F6' }} />
              What We Do
            </div>
            <h2 style={{
              fontSize: 'clamp(38px,4.8vw,72px)', fontWeight: 800, lineHeight: 0.94,
              color: '#fff', margin: '0 0 20px',
            }}>
              Eight steps.<br />
              <span style={{ color: '#60A5FA', fontWeight: 600 }}>One complete flow.</span>
            </h2>
            <p style={{
              fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, marginBottom: 28, maxWidth: 420,
            }}>
              From first shortlist to long-term support — one team builds the full machinery cycle around your production floor.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">
                Contact Sales <span style={{ fontSize: 15 }}>→</span>
              </Link>
              <Link to="/about" className="btn-outline">About Us</Link>
            </div>
          </div>

          {/* ── RIGHT: Orbital SVG — all labels live INSIDE the SVG ── */}
          <div style={{
            position: 'relative',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'none' : 'translateY(28px)',
            transition: 'all 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', maxWidth: 560, margin: '0 auto' }}>
              <svg
                viewBox="0 0 800 800"
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
              >
                <defs>
                  <radialGradient id="svc-core" cx="50%" cy="44%" r="58%">
                    <stop offset="0%" stopColor="rgba(59,130,246,0.18)" />
                    <stop offset="60%" stopColor="rgba(10,15,24,0.98)" />
                    <stop offset="100%" stopColor="rgba(6,10,16,1)" />
                  </radialGradient>
                  <filter id="svc-glow">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <filter id="svc-glow-sm">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <linearGradient id="svc-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(59,130,246,0.5)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
                    <stop offset="100%" stopColor="rgba(59,130,246,0.22)" />
                  </linearGradient>
                </defs>

                {/* Rotating outer rings */}
                <g style={{ transformOrigin: `${CX}px ${CY}px`, transform: `rotate(${ringRot}deg)`, transition: 'transform 0.2s ease-out' }}>
                  <circle cx={CX} cy={CY} r={RING_R + 52} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  <circle cx={CX} cy={CY} r={RING_R} fill="none" stroke="url(#svc-ring)" strokeWidth="2" strokeDasharray="12 15" />
                  <circle cx={CX} cy={CY} r={RING_R - 40} fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="1" strokeDasharray="2 12" />
                </g>

                {/* Core circle */}
                <circle cx={CX} cy={CY} r={164} fill="url(#svc-core)" stroke="rgba(59,130,246,0.18)" strokeWidth="1.2" />
                <circle cx={CX} cy={CY} r={176} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                {/* Steps: dots + SVG text labels */}
                {serviceSteps.map((step, i) => {
                  const angleDeg = -90 + i * 45;
                  const rad = angleDeg * (Math.PI / 180);
                  const cos = Math.cos(rad);
                  const sin = Math.sin(rad);

                  // Dot on ring
                  const dx = CX + cos * RING_R;
                  const dy = CY + sin * RING_R;

                  // Label anchor position (further out from ring)
                  const lx = CX + cos * LABEL_R;
                  const ly = CY + sin * LABEL_R;

                  // Text anchor based on horizontal quadrant
                  const anchor: string = cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle';

                  // Count total text lines for this step
                  const titleLines = step.title.split('\n');
                  const detailLines = step.detail.split('\n');
                  const totalTextHeight = titleLines.length * 13 + 4 + detailLines.length * 11;

                  // Smooth vertical offset: lerp from "text below anchor" (top of ring)
                  // to "text above anchor" (bottom of ring), passing through "centered" at sides.
                  // sin ranges from -1 (top) to +1 (bottom)
                  // At sin=-1 (top):    offset = 6         → text hangs below anchor
                  // At sin= 0 (sides):  offset = -height/2 → text centered on anchor
                  // At sin=+1 (bottom): offset = -height+2 → text sits above anchor
                  const t = (sin + 1) / 2; // 0 at top, 0.5 at sides, 1 at bottom
                  const blockOffsetY = 6 - t * (totalTextHeight + 4);

                  const isActive = i === activeIndex;

                  return (
                    <g key={step.number}>
                      {/* Active pulse ring */}
                      {isActive && (
                        <circle cx={dx} cy={dy} r={24} fill="none" stroke="rgba(96,165,250,0.18)" strokeWidth="1">
                          <animate attributeName="r" values="18;28;18" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}

                      {/* Dot bubble */}
                      <motion.circle
                        cx={dx} cy={dy}
                        r={isActive ? 18 : 13}
                        fill={isActive ? 'rgba(12,22,40,0.98)' : 'rgba(8,14,24,0.92)'}
                        stroke={isActive ? 'rgba(96,165,250,0.7)' : 'rgba(59,130,246,0.3)'}
                        strokeWidth={isActive ? 1.5 : 1}
                        filter={isActive ? 'url(#svc-glow-sm)' : undefined}
                        animate={{ r: isActive ? 18 : 13 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                      />

                      {/* Number inside dot */}
                      <text
                        x={dx} y={dy + 3.5}
                        textAnchor="middle"
                        fill={isActive ? '#93C5FD' : 'rgba(96,165,250,0.6)'}
                        fontSize="9"
                        fontWeight="800"
                        letterSpacing="0.1"
                        fontFamily="'DM Sans', sans-serif"
                        style={{ userSelect: 'none', pointerEvents: 'none', transition: 'fill 0.3s' }}
                      >
                        {step.number}
                      </text>

                      {/* Connector line from dot toward label */}
                      <line
                        x1={dx + cos * 20} y1={dy + sin * 20}
                        x2={lx - cos * 16} y2={ly - sin * 16}
                        stroke={isActive ? 'rgba(96,165,250,0.35)' : 'rgba(255,255,255,0.08)'}
                        strokeWidth="0.7"
                        style={{ transition: 'stroke 0.3s' }}
                      />

                      {/* Title text */}
                      {titleLines.map((line, li) => (
                        <text
                          key={`t${li}`}
                          x={lx}
                          y={ly + blockOffsetY + li * 13}
                          textAnchor={anchor}
                          fill={isActive ? '#fff' : 'rgba(255,255,255,0.72)'}
                          fontSize="11.5"
                          fontWeight="700"
                          fontFamily="'DM Sans', sans-serif"
                          style={{ userSelect: 'none', pointerEvents: 'none', transition: 'fill 0.3s' }}
                        >
                          {line}
                        </text>
                      ))}

                      {/* Detail text */}
                      {detailLines.map((line, li) => (
                        <text
                          key={`d${li}`}
                          x={lx}
                          y={ly + blockOffsetY + titleLines.length * 13 + 4 + li * 11}
                          textAnchor={anchor}
                          fill={isActive ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.28)'}
                          fontSize="9.5"
                          fontFamily="'DM Sans', sans-serif"
                          style={{ userSelect: 'none', pointerEvents: 'none', transition: 'fill 0.3s' }}
                        >
                          {line}
                        </text>
                      ))}
                    </g>
                  );
                })}
              </svg>

              {/* Sai logo — HTML overlay centered */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.85 }}
                transition={{ duration: 1.1, delay: 0.2 }}
                style={{
                  position: 'absolute',
                  left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '26%', aspectRatio: '1/1',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 50% 38%, rgba(59,130,246,0.22) 0%, rgba(10,15,24,0.98) 65%)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 28px 72px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.08)',
                  zIndex: 2, padding: 16, textAlign: 'center',
                }}
              >
                <img src={saiLogo} alt="Sai Enterprises" style={{ width: '80%', objectFit: 'contain', marginBottom: 8 }} />
                <div style={{
                  fontSize: 7.5, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(96,165,250,0.7)',
                }}>
                  End-to-End
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
