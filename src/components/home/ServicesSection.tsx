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
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    setIsMobile(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const FS_TITLE = 28;
  const FS_DETAIL = 17;
  const FS_NUM = 22;
  const FS_BRAND = 28;
  const FS_TAG = 11;
  const DOT_R = 34;
  const DOT_R_ACT = 39;

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
      if (rect.bottom < -240 || rect.top > window.innerHeight + 240) return;
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
  const ringRadius = 292;
  const labelRadius = 388;

  return (
    <section
      ref={sectionRef}
      className="services-cycle-section"
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
            gridTemplateColumns: '0.76fr 1.24fr',
            gap: 44,
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
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#66B5FF',
                marginBottom: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontWeight: 700,
              }}
            >
              <div style={{ width: 26, height: 2, borderRadius: 2, background: 'linear-gradient(90deg,#2E90FF,#1BD6F2)' }} />
              What We Do
            </div>

            <h2
              style={{
                fontSize: 'clamp(32px,3.4vw,52px)',
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: '-0.035em',
                color: '#fff',
                margin: 0,
                maxWidth: 460,
              }}
            >
              One machinery partner.
              <br />
              <span style={{
                background: 'linear-gradient(100deg, #66B5FF, #1BD6F2)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Eight connected phases.
              </span>
            </h2>

            <p
              style={{
                fontSize: 15.5,
                color: 'rgba(255,255,255,0.66)',
                lineHeight: 1.72,
                marginTop: 22,
                marginBottom: 30,
                maxWidth: 430,
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
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: isMobile ? undefined : '1180 / 980',
                maxWidth: 820,
                minWidth: 0,
                margin: '0 auto',
              }}
            >
              {isMobile ? (
                <div
                  role="list"
                  aria-label="Eight connected service phases"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                    gap: 10,
                    width: '100%',
                    maxWidth: 520,
                    margin: '0 auto',
                  }}
                >
                  {serviceSteps.map((step, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={step.number}
                        type="button"
                        role="listitem"
                        onClick={() => setActiveIndex(index)}
                        aria-current={isActive ? 'step' : undefined}
                        style={{
                          position: 'relative',
                          minWidth: 0,
                          minHeight: 112,
                          padding: '14px 12px',
                          overflow: 'hidden',
                          textAlign: 'left',
                          color: '#fff',
                          border: `1px solid ${isActive ? 'rgba(96,165,250,.62)' : 'rgba(255,255,255,.08)'}`,
                          borderRadius: 16,
                          background: isActive
                            ? 'linear-gradient(145deg,rgba(37,99,235,.19),rgba(10,18,31,.96))'
                            : 'rgba(9,15,25,.78)',
                          boxShadow: isActive ? '0 14px 34px rgba(0,0,0,.24), inset 0 1px rgba(255,255,255,.05)' : 'none',
                          transition: 'border-color .25s ease, background .25s ease, box-shadow .25s ease',
                        }}
                      >
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            color: isActive ? '#93C5FD' : 'rgba(96,165,250,.72)',
                            fontSize: 10,
                            fontWeight: 800,
                            letterSpacing: '.14em',
                          }}
                        >
                          {step.number}
                          <i
                            aria-hidden="true"
                            style={{
                              width: isActive ? 22 : 6,
                              height: 2,
                              borderRadius: 99,
                              background: isActive ? '#60A5FA' : 'rgba(255,255,255,.14)',
                              boxShadow: isActive ? '0 0 10px rgba(96,165,250,.55)' : 'none',
                              transition: 'width .3s ease, background .3s ease',
                            }}
                          />
                        </span>
                        <strong
                          style={{
                            display: 'block',
                            marginTop: 12,
                            overflowWrap: 'anywhere',
                            fontSize: 13,
                            lineHeight: 1.22,
                          }}
                        >
                          {step.titleLines.join(' ')}
                        </strong>
                        <small
                          style={{
                            display: 'block',
                            marginTop: 7,
                            overflowWrap: 'anywhere',
                            color: 'rgba(255,255,255,.48)',
                            fontSize: 10,
                            lineHeight: 1.4,
                          }}
                        >
                          {step.detailLines.join(' ')}
                        </small>
                      </button>
                    );
                  })}
                </div>
              ) : (
              <svg
                viewBox="-130 -30 1180 980"
                role="img"
                aria-label="Eight connected phases in the Sai Enterprises service cycle"
                style={{ display: 'block', width: '100%', height: '100%', overflow: 'hidden' }}
              >
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
                  <circle cx={cx} cy={cy} r={ringRadius + 34} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                  <circle cx={cx} cy={cy} r={ringRadius} fill="none" stroke="url(#svc-ring-main)" strokeWidth="3.2" strokeDasharray="20 16" />
                  <circle cx={cx} cy={cy} r={ringRadius - 42} fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1.2" strokeDasharray="2 14" />
                </g>

                {/* Restrained static guide rings keep the cycle legible without constant GPU work. */}
                <g>
                  <circle cx={cx} cy={cy} r={ringRadius + 116} fill="none" stroke="rgba(59,130,246,0.06)" strokeWidth="1" strokeDasharray="3 28" />
                </g>
                <g>
                  <circle cx={cx} cy={cy} r={ringRadius + 56} fill="none" stroke="rgba(96,165,250,0.07)" strokeWidth="0.8" strokeDasharray="8 36" />
                </g>

                {/* Static center glow */}
                <circle cx={cx} cy={cy} r="188" fill="none" stroke="rgba(59,130,246,0.07)" strokeWidth="40"
                  style={{ filter: 'blur(12px)', opacity: 0.3 }} />

                <circle cx={cx} cy={cy} r="144" fill="url(#svc-core)" stroke="rgba(59,130,246,0.22)" strokeWidth="1.2" />
                <circle cx={cx} cy={cy} r="166" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                {serviceSteps.map((step, index) => {
                  const angleDeg = -90 + index * 45;
                  const rad = angleDeg * (Math.PI / 180);
                  const cos = Math.cos(rad);
                  const sin = Math.sin(rad);
                  const dotX = cx + cos * ringRadius;
                  const dotY = cy + sin * ringRadius;
                  /* Diagonal labels are anchored side-on, so their text runs back
                     toward the ring and used to sit on top of its own node. Pushing
                     them further out buys the vertical clearance they need. */
                  const isDiagonal = Math.abs(cos) > 0.3 && Math.abs(sin) > 0.3;
                  const lr = labelRadius + (isDiagonal ? 54 : 0);
                  const labelX = cx + cos * lr;
                  const labelY = cy + sin * lr;
                  const anchor = cos > 0.34 ? 'end' : cos < -0.34 ? 'start' : 'middle';
                  const titleStartY = sin < -0.58 ? 12 : sin > 0.58 ? -58 : -14;
                  const isActive = index === activeIndex;

                  return (
                    <g key={step.number}>
                      {isActive && (
                        <circle cx={dotX} cy={dotY} r="36" fill="none" stroke="rgba(96,165,250,0.18)" strokeWidth="1.2" />
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
                          r={isActive ? DOT_R_ACT : DOT_R}
                          fill={isActive ? 'rgba(13,21,36,0.98)' : 'rgba(8,14,24,0.94)'}
                          stroke={isActive ? 'rgba(102,181,255,0.95)' : 'rgba(46,144,255,0.45)'}
                          strokeWidth={isActive ? 2.4 : 1.6}
                          filter={isActive ? 'url(#svc-glow)' : undefined}
                        />
                        <text
                          x={dotX}
                          y={dotY + (isMobile ? 9 : 6)}
                          textAnchor="middle"
                          fill={isActive ? '#93C5FD' : '#60A5FA'}
                          fontSize={FS_NUM}
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
                            y={labelY + titleStartY + lineIndex * 28}
                            textAnchor={anchor}
                            fill="#FFFFFF"
                            fontSize={FS_TITLE}
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
                            y={labelY + titleStartY + step.titleLines.length * 28 + 8 + lineIndex * 21}
                            textAnchor={anchor}
                            fill={isActive ? 'rgba(255,255,255,0.86)' : 'rgba(255,255,255,0.6)'}
                            fontSize={FS_DETAIL}
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
                  <text x={cx} y={cy + 36} textAnchor="middle" fill="#FFFFFF" fontSize={FS_BRAND} fontWeight="800">
                    Sai Enterprises
                  </text>
                  <text
                    x={cx}
                    y={cy + 70}
                    textAnchor="middle"
                    fill="rgba(96,165,250,0.78)"
                    fontSize={FS_TAG}
                    fontWeight="700"
                    letterSpacing="4.2"
                  >
                    END-TO-END CYCLE
                  </text>
                </motion.g>
              </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
