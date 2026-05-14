import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import saiLogo from '@/assets/sai-logo-cmyk.png';

const serviceSteps = [
  {
    number: '01',
    titleLines: ['Machine Suggestions'],
    detailLines: ['Right shortlist for output', '& budget'],
  },
  {
    number: '02',
    titleLines: ['Consultancy'],
    detailLines: ['Technical guidance', 'before commitment'],
  },
  {
    number: '03',
    titleLines: ['Sourcing'],
    detailLines: ['Best-fit brands', '& machine options'],
  },
  {
    number: '04',
    titleLines: ['Planning'],
    detailLines: ['Growth-ready line', '& floor planning'],
  },
  {
    number: '05',
    titleLines: ['Installation'],
    detailLines: ['Setup that gets', 'production-ready fast'],
  },
  {
    number: '06',
    titleLines: ['Deployment'],
    detailLines: ['Smooth rollout', 'into your workflow'],
  },
  {
    number: '07',
    titleLines: ['After-Sales'],
    detailLines: ['Follow-up, spares,', '& continuity'],
  },
  {
    number: '08',
    titleLines: ['Technical Support'],
    detailLines: ['Machine-side help', 'when it matters'],
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ringRotation, setRingRotation] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const mix = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height * 0.35), 0, 1);
      setActiveIndex(clamp(Math.round(mix * (serviceSteps.length - 1)), 0, serviceSteps.length - 1));
      setRingRotation(mix * 18);
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const cx = 460;
  const cy = 460;
  const ringRadius = 306;
  const labelRadius = 394;

  return (
    <>
      <style>{`
        @keyframes svc-orbit-spin  { from { transform: rotate(0deg)   } to { transform: rotate(360deg)  } }
        @keyframes svc-orbit-rspin { from { transform: rotate(0deg)   } to { transform: rotate(-360deg) } }
        @keyframes svc-center-glow { 0%,100% { opacity: 0.18 } 50% { opacity: 0.45 } }
      `}</style>
    <section
      ref={sectionRef}
      style={{
        background: '#060A10',
        padding: '124px 0 114px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 14% 20%, rgba(59,130,246,0.1) 0%, transparent 30%), radial-gradient(circle at 82% 18%, rgba(59,130,246,0.08) 0%, transparent 24%), radial-gradient(circle at 54% 58%, rgba(59,130,246,0.05) 0%, transparent 34%)',
        }}
      />

      <div
        style={{ maxWidth: 1360, margin: '0 auto', padding: '0 56px', position: 'relative' }}
        className="max-md:!px-6 max-[767px]:!px-4"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.88fr 1.12fr',
            gap: 54,
            alignItems: 'center',
          }}
          className="max-lg:!grid-cols-1 max-lg:!gap-10"
        >
          <div
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'none' : 'translateY(22px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#3B82F6',
                marginBottom: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontWeight: 700,
              }}
            >
              <div style={{ width: 32, height: 1, background: '#3B82F6' }} />
              What We Do
            </div>

            <h2
              style={{
                fontSize: 'clamp(42px,5vw,76px)',
                fontWeight: 800,
                lineHeight: 0.94,
                color: '#fff',
                margin: 0,
                maxWidth: 560,
              }}
            >
              One machinery partner.
              <br />
              <span style={{ color: '#60A5FA', fontWeight: 600 }}>Eight connected phases.</span>
            </h2>

            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.62)',
                lineHeight: 1.8,
                marginTop: 24,
                marginBottom: 30,
                maxWidth: 500,
              }}
            >
              From first suggestion to long-term support, Sai Enterprises handles the full machinery cycle with one accountable team.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">
                Contact Sales <span style={{ fontSize: 15 }}>→</span>
              </Link>
              <Link to="/machinery" className="btn-outline">
                Explore Machinery
              </Link>
            </div>
          </div>

          <div
            style={{
              position: 'relative',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'none' : 'translateY(28px)',
              transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.12s',
            }}
          >
            {/* Mobile fallback: 2-col step grid */}
            <div
              className="lg:!hidden"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2,1fr)',
                gap: 8,
              }}
            >
              {serviceSteps.map((step) => (
                <div
                  key={step.number}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#60A5FA', letterSpacing: '0.1em' }}>
                    {step.number}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                    {step.titleLines.join(' ')}
                  </span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                    {step.detailLines.join(' ')}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                maxWidth: 760,
                margin: '0 auto',
              }}
              className="max-lg:!hidden"
            >
              <svg viewBox="0 0 920 920" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <radialGradient id="svc-core" cx="50%" cy="42%" r="58%">
                    <stop offset="0%" stopColor="rgba(59,130,246,0.18)" />
                    <stop offset="55%" stopColor="rgba(11,17,28,0.98)" />
                    <stop offset="100%" stopColor="rgba(6,10,16,1)" />
                  </radialGradient>
                  <linearGradient id="svc-ring-main" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(96,165,250,0.42)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
                    <stop offset="100%" stopColor="rgba(59,130,246,0.2)" />
                  </linearGradient>
                  <filter id="svc-glow" x="-150%" y="-150%" width="400%" height="400%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g
                  style={{
                    transformOrigin: `${cx}px ${cy}px`,
                    transform: `rotate(${ringRotation}deg)`,
                    transition: 'transform 0.25s ease-out',
                  }}
                >
                  <circle cx={cx} cy={cy} r={ringRadius + 78} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <circle cx={cx} cy={cy} r={ringRadius + 34} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  <circle cx={cx} cy={cy} r={ringRadius} fill="none" stroke="url(#svc-ring-main)" strokeWidth="2.4" strokeDasharray="16 18" />
                  <circle cx={cx} cy={cy} r={ringRadius - 42} fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1.2" strokeDasharray="2 14" />
                </g>

                {/* Slowly-rotating outer accent rings */}
                <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'svc-orbit-spin 120s linear infinite' }}>
                  <circle cx={cx} cy={cy} r={ringRadius + 116} fill="none" stroke="rgba(59,130,246,0.06)" strokeWidth="1" strokeDasharray="3 28" />
                </g>
                <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'svc-orbit-rspin 80s linear infinite' }}>
                  <circle cx={cx} cy={cy} r={ringRadius + 56} fill="none" stroke="rgba(96,165,250,0.07)" strokeWidth="0.8" strokeDasharray="8 36" />
                </g>

                {/* Center ambient glow pulse */}
                <circle cx={cx} cy={cy} r="188" fill="none" stroke="rgba(59,130,246,0.07)" strokeWidth="40"
                  style={{ filter: 'blur(12px)', animation: 'svc-center-glow 4s ease-in-out infinite' }} />

                <circle cx={cx} cy={cy} r="144" fill="url(#svc-core)" stroke="rgba(59,130,246,0.22)" strokeWidth="1.2" />
                <circle cx={cx} cy={cy} r="166" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                {serviceSteps.map((step, index) => {
                  const angleDeg = -90 + index * 45;
                  const rad = angleDeg * (Math.PI / 180);
                  const cos = Math.cos(rad);
                  const sin = Math.sin(rad);
                  const dotX = cx + cos * ringRadius;
                  const dotY = cy + sin * ringRadius;
                  const labelX = cx + cos * labelRadius;
                  const labelY = cy + sin * labelRadius;
                  const anchor = cos > 0.34 ? 'start' : cos < -0.34 ? 'end' : 'middle';
                  const titleStartY = sin < -0.58 ? 10 : sin > 0.58 ? -38 : -12;
                  const isActive = index === activeIndex;

                  return (
                    <g key={step.number}>
                      {isActive && (
                        <circle cx={dotX} cy={dotY} r="36" fill="none" stroke="rgba(96,165,250,0.16)" strokeWidth="1.2">
                          <animate attributeName="r" values="28;38;28" dur="2.4s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.5;0.08;0.5" dur="2.4s" repeatCount="indefinite" />
                        </circle>
                      )}

                      <motion.g
                        initial={{ opacity: 0, scale: 0.4, x: cx - dotX, y: cy - dotY }}
                        animate={{
                          opacity: revealed ? 1 : 0,
                          scale: revealed ? 1 : 0.4,
                          x: revealed ? 0 : cx - dotX,
                          y: revealed ? 0 : cy - dotY,
                        }}
                        transition={{
                          duration: 0.95,
                          delay: 0.26 + index * 0.14,
                          type: 'spring',
                          stiffness: 92,
                          damping: 18,
                        }}
                      >
                        <circle
                          cx={dotX}
                          cy={dotY}
                          r={isActive ? 34 : 30}
                          fill={isActive ? 'rgba(13,21,36,0.98)' : 'rgba(8,14,24,0.94)'}
                          stroke={isActive ? 'rgba(96,165,250,0.68)' : 'rgba(59,130,246,0.28)'}
                          strokeWidth={isActive ? 1.8 : 1.2}
                          filter={isActive ? 'url(#svc-glow)' : undefined}
                        />
                        <text
                          x={dotX}
                          y={dotY + 6}
                          textAnchor="middle"
                          fill={isActive ? '#93C5FD' : '#60A5FA'}
                          fontSize="18"
                          fontWeight="800"
                          letterSpacing="1.4"
                          style={{ userSelect: 'none', pointerEvents: 'none' }}
                        >
                          {step.number}
                        </text>
                      </motion.g>

                      <motion.g
                        initial={{ opacity: 0, x: (cx - labelX) * 0.28, y: (cy - labelY) * 0.28 }}
                        animate={{
                          opacity: revealed ? 1 : 0,
                          x: revealed ? 0 : (cx - labelX) * 0.28,
                          y: revealed ? 0 : (cy - labelY) * 0.28,
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.42 + index * 0.14,
                          type: 'spring',
                          stiffness: 80,
                          damping: 20,
                        }}
                      >
                        {step.titleLines.map((line, lineIndex) => (
                          <text
                            key={`${step.number}-title-${lineIndex}`}
                            x={labelX}
                            y={labelY + titleStartY + lineIndex * 22}
                            textAnchor={anchor}
                            fill="#FFFFFF"
                            fontSize="21"
                            fontWeight={isActive ? 800 : 720}
                            style={{ userSelect: 'none', pointerEvents: 'none' }}
                          >
                            {line}
                          </text>
                        ))}

                        {step.detailLines.map((line, lineIndex) => (
                          <text
                            key={`${step.number}-detail-${lineIndex}`}
                            x={labelX}
                            y={labelY + titleStartY + step.titleLines.length * 22 + 10 + lineIndex * 16}
                            textAnchor={anchor}
                            fill={isActive ? 'rgba(255,255,255,0.76)' : 'rgba(255,255,255,0.48)'}
                            fontSize="13"
                            fontWeight="500"
                            style={{ userSelect: 'none', pointerEvents: 'none' }}
                          >
                            {line}
                          </text>
                        ))}
                      </motion.g>
                    </g>
                  );
                })}

                <motion.g
                  initial={{ opacity: 0, scale: 0.86 }}
                  animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.86 }}
                  transition={{ duration: 1.05, delay: 0.14 }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                >
                  <circle cx={cx} cy={cy} r="122" fill="rgba(12,19,32,0.98)" stroke="rgba(59,130,246,0.24)" strokeWidth="1.4" />
                  <image href={saiLogo} x={cx - 54} y={cy - 86} width="108" height="108" preserveAspectRatio="xMidYMid meet" />
                  <text x={cx} y={cy + 36} textAnchor="middle" fill="#FFFFFF" fontSize="28" fontWeight="800">
                    Sai Enterprises
                  </text>
                  <text
                    x={cx}
                    y={cy + 70}
                    textAnchor="middle"
                    fill="rgba(96,165,250,0.78)"
                    fontSize="11"
                    fontWeight="700"
                    letterSpacing="4.2"
                  >
                    END-TO-END CYCLE
                  </text>
                </motion.g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ServicesSection;
