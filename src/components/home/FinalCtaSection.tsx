import { Link } from 'react-router-dom';
import saiLogo from '@/assets/sai-logo-cmyk.png';

const FinalCtaSection = () => (
  <section style={{ background: '#060A10', padding: '0 0 96px', position: 'relative', overflow: 'hidden' }}>
    {/* ambient glow */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse at 50% 60%, rgba(59,130,246,0.07) 0%, transparent 55%)',
    }} />

    <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 56px', position: 'relative' }} className="max-md:!px-6">
      <div style={{
        background: 'linear-gradient(135deg, rgba(11,19,31,0.97) 0%, rgba(8,13,22,0.99) 100%)',
        border: '1px solid rgba(59,130,246,0.18)',
        padding: '56px 56px 48px',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(2,6,23,0.38), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
        className="max-md:!px-8 max-md:!py-10"
      >
        {/* Background watermark */}
        <div style={{
          position: 'absolute', right: -20, bottom: -20, pointerEvents: 'none',
          fontSize: 'clamp(80px,14vw,180px)', fontWeight: 900,
          color: 'rgba(255,255,255,0.018)', lineHeight: 1, letterSpacing: '-0.04em',
          userSelect: 'none',
        }}>
          SAI ENT.
        </div>

        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #3B82F6, #60A5FA, transparent)' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}
          className="max-lg:!grid-cols-1 max-lg:!gap-8"
        >
          <div>
            {/* Logo + eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <img src={saiLogo} alt="Sai Enterprises" style={{ height: 32, objectFit: 'contain' }} />
              <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.12)' }} />
              <span style={{
                fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
                color: '#3B82F6', fontWeight: 700,
              }}>
                Start With Sai Enterprises
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(32px,4vw,54px)', lineHeight: 1.0, margin: '0 0 16px', color: '#fff',
              fontWeight: 800,
            }}>
              Find the right machine mix,<br />
              <span style={{ color: '#60A5FA', fontWeight: 600 }}>then move faster.</span>
            </h2>

            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.52)', maxWidth: 540 }}>
              Explore the full machinery range or ask for a tailored quote. The path stays clean, direct, and handled by one team from selection to installation.
            </p>

            {/* Trust signals */}
            <div style={{ display: 'flex', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
              {['24+ Years', '4000+ Machines', '2000+ Clients', 'HPM Sole Agent'].map((t) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#22C55E" stroke="none">
                    <path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 220 }}>
            <Link
              to="/machinery"
              className="btn-primary"
              style={{
                justifyContent: 'center', fontSize: 11,
                boxShadow: '0 16px 40px rgba(59,130,246,0.3)',
                padding: '15px 32px',
              }}
            >
              Explore Machinery <span style={{ fontSize: 16 }}>→</span>
            </Link>
            <Link
              to="/contact"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 32px',
                border: '1px solid rgba(255,255,255,0.14)',
                color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3B82F6'; el.style.color = '#3B82F6'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.14)'; el.style.color = 'rgba(255,255,255,0.7)'; }}
            >
              Get a Quote <span style={{ fontSize: 14 }}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FinalCtaSection;
