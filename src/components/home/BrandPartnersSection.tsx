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
    }, { threshold: 0.3 });
    if (dividerRef.current) obs.observe(dividerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ background: '#F0F4FF', padding: 'clamp(64px,8vw,120px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }} className="max-md:!px-7">

        {/* Divider with line-draw */}
        <div ref={dividerRef} style={{ display: 'flex', alignItems: 'center', marginBottom: 80 }}>
          <div style={{
            height: 1, flex: 1, background: '#0D1421', opacity: 0.12,
            transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right',
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }} />
          <div style={{
            padding: '0 32px',
            fontFamily: "'DM Sans', sans-serif",
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

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px,4vw,54px)', fontWeight: 600,
              lineHeight: 1.05, color: '#060A10', letterSpacing: '-0.02em',
              marginBottom: 20,
            }}>
              India's Sole HPM<br />Agent Since 2000.
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, lineHeight: 1.8, color: 'rgba(13,20,33,0.55)',
              maxWidth: 420, marginBottom: 44,
            }}>
              HPM's paper cutter manufacturing story starts in 1983. The range is now known for programmable paper cutters and pile handling systems — used by printers, finishers, and packaging plants that need dependable output.
            </p>

            {/* Facts table */}
            <div style={{ borderTop: '1px solid rgba(13,20,33,0.08)' }}>
              {hpmFacts.map((f) => (
                <div key={f.k} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  padding: '14px 0', borderBottom: '1px solid rgba(13,20,33,0.07)',
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'rgba(13,20,33,0.32)',
                  }}>{f.k}</span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, color: '#060A10', fontWeight: 500,
                  }}>{f.v}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 36 }}>
              <Link to="/machinery/post-press" className="cta-blue" style={{ color: '#3B82F6' }}>
                Explore HPM Machines <span className="arr">→</span>
              </Link>
            </div>
          </div>

          {/* Right: machine showcase */}
          <div>
            <div style={{ position: 'relative' }}>
              {/* Machine card */}
              <div style={{
                background: '#060A10', aspectRatio: '4/3', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
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
                    width: '85%', height: '85%', objectFit: 'contain',
                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
                    animation: 'float 5s ease-in-out infinite',
                    willChange: 'transform',
                  }}
                />
              </div>
              {/* Badge — positioned on outer container so it's not clipped */}
              <div style={{ position: 'absolute', bottom: -12, right: -12, width: 90, height: 90, zIndex: 10 }}>
                <img src={largestSellingBadge} alt="India's Largest Selling Paper Cutter" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              {/* Stats grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
                background: 'rgba(13,20,33,0.06)', marginTop: 28,
              }}>
                {hpmStats.map((s) => (
                  <div key={s.label} style={{ background: '#F0F4FF', padding: '20px' }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 32, color: '#060A10', fontWeight: 600, lineHeight: 1,
                    }}>{s.val}</div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
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
