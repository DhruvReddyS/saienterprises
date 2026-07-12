import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import hpmLogo from '@/assets/hpm-logo.png';
import hpmMachine from '@/assets/hpm-machine.png';
import largestSellingBadge from '@/assets/largest-selling-badge.png';
import BrandImage from '@/components/BrandImage';

const hpmStats = [
  { val: '920mm', label: 'Min. Cutting Width' },
  { val: '1880mm', label: 'Max. Cutting Width' },
  { val: '7 Sizes', label: 'Range Available' },
  { val: '4000+', label: 'Units Sold in India' },
];

const hpmFacts = [
  { k: 'Origin', v: 'Taiwan, since 1983' },
  { k: 'Focus', v: 'Programmable Cutters + Pile Handling' },
  { k: 'India Agent', v: 'Sai Enterprises, Hyderabad' },
  { k: 'Partnership', v: 'Since 2000 · Sole Representative' },
];

const BrandPartnersSection = () => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRevealed(true); obs.disconnect(); }
    }, { threshold: 0.06 });
    if (dividerRef.current) obs.observe(dividerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ background: '#F0F4FF', padding: 'clamp(48px,6vw,76px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }} className="max-md:!px-7 max-[767px]:!px-4">

        {/* Divider with line-draw */}
        <div ref={dividerRef} className="brand-divider" style={{ display: 'flex', alignItems: 'center', marginBottom: 80 }}>
          <div style={{
            height: 1, flex: 1, background: '#0D1421', opacity: 0.12,
            transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right',
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }} />
          <div style={{
            padding: '0 32px',
            fontFamily: "'Manrope', sans-serif",
            fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'rgba(13,20,33,0.38)', whiteSpace: 'nowrap',
          }}>
            Exclusive Indian Partner
          </div>
          <div style={{
            height: 1, flex: 1, background: '#0D1421', opacity: 0.12,
            transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }} />
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 96px)', alignItems: 'start',
        }} className="max-lg:!grid-cols-1 max-lg:!gap-12">

          {/* Left: brand info */}
          <div>
            <BrandImage
              src={hpmLogo}
              alt="HPM"
              className="mb-7"
              style={{ height: 28 }}
            />

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 14px 10px 10px',
              marginBottom: 22,
              borderRadius: 18,
              background: 'rgba(255,255,255,0.72)',
              border: '1px solid rgba(59,130,246,0.14)',
              boxShadow: '0 14px 34px rgba(13,20,33,0.07)',
            }}>
              <span style={{
                width: 52,
                height: 52,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 14,
                background: '#fff',
                border: '1px solid rgba(203,40,40,0.12)',
                flexShrink: 0,
              }}>
                <img
                  src={largestSellingBadge}
                  alt="India's Largest Selling Paper Cutter"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: 42,
                    height: 42,
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 5px 8px rgba(203,40,40,0.10))',
                  }}
                />
              </span>
              <span>
                <span style={{
                  display: 'block',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 8.5,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#3B82F6',
                  fontWeight: 800,
                  marginBottom: 4,
                }}>
                  India leadership
                </span>
                <span style={{
                  display: 'block',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 13,
                  lineHeight: 1.25,
                  color: '#060A10',
                  fontWeight: 800,
                }}>
                  Largest Paper Cutter Distributor
                </span>
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(36px,4vw,54px)', fontWeight: 600,
              lineHeight: 1.05, color: '#060A10', letterSpacing: '-0.02em',
              marginBottom: 20,
            }}>
              India's Sole HPM<br />Agent Since 2000.
            </h2>

            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 14, lineHeight: 1.8, color: 'rgba(13,20,33,0.55)',
              maxWidth: 420, marginBottom: 44,
            }}>
              HPM's paper cutter manufacturing story starts in 1983. The range is now known for programmable paper cutters and pile handling systems, used by printers, finishers, and packaging plants that need dependable output.
            </p>

            {/* Facts table */}
            <div style={{ borderTop: '1px solid rgba(13,20,33,0.08)' }}>
              {hpmFacts.map((f) => (
                <div key={f.k} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  padding: '14px 0', borderBottom: '1px solid rgba(13,20,33,0.07)',
                }}>
                  <span style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'rgba(13,20,33,0.32)',
                  }}>{f.k}</span>
                  <span style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 13, color: '#060A10', fontWeight: 500,
                  }}>{f.v}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 36 }}>
              <Link to="/machinery?category=post-press" className="cta-blue" style={{ color: '#3B82F6' }}>
                Explore HPM Machines <span className="arr">→</span>
              </Link>
            </div>
          </div>

          {/* Right: machine showcase */}
          <div style={{ paddingTop: 18 }}>
            <div style={{ position: 'relative' }}>
              {/* Machine card */}
              <div style={{
                background: 'linear-gradient(145deg, #060A10 0%, #0B182A 100%)',
                aspectRatio: '4/3',
                overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
                borderRadius: 30,
                boxShadow: '0 30px 80px rgba(6,10,16,0.22)',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(circle at 50% 60%, rgba(59,130,246,0.12) 0%, transparent 65%)',
                  pointerEvents: 'none',
                }} />
                <img
                  src={hpmMachine}
                  alt="HPM Paper Cutter"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '80%', height: '80%', objectFit: 'contain',
                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
                    animation: 'float 5s ease-in-out infinite',
                    willChange: 'transform',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  left: 24,
                  bottom: 22,
                  padding: '10px 14px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.78)',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(12px)',
                }}>
                  HPM cutting systems
                </div>
              </div>
              {/* Stats grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
                background: 'rgba(13,20,33,0.06)', marginTop: 28,
              }}>
                {hpmStats.map((s) => (
                  <div key={s.label} style={{ background: '#F0F4FF', padding: '20px' }}>
                    <div style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 32, color: '#060A10', fontWeight: 600, lineHeight: 1,
                    }}>{s.val}</div>
                    <div style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: 'rgba(13,20,33,0.38)', marginTop: 4,
                    }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPartnersSection;
