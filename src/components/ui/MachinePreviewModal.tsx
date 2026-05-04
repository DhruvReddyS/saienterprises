import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';

interface Props {
  product: Product & { categoryName?: string; categorySlug?: string };
  onClose: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  'pre-press': '#6366F1',
  press: '#3B82F6',
  'post-press': '#0EA5E9',
  corrugation: '#10B981',
  allied: '#F59E0B',
};

const MachinePreviewModal = ({ product: p, onClose }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const accent = CATEGORY_COLORS[p.category] ?? '#3B82F6';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const totalSections = [
    p.sizes?.length,
    p.specifications ? Object.keys(p.specifications).length : 0,
    p.features?.length,
    p.applications?.length,
  ].filter(Boolean).length;

  return (
    <>
      <style>{`
        @keyframes modal-overlay-in { from { opacity:0 } to { opacity:1 } }
        @keyframes modal-panel-in   { from { opacity:0; transform:translateY(28px) scale(0.97) } to { opacity:1; transform:none } }
        @keyframes img-float        { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
      `}</style>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        style={{
          position: 'fixed', inset: 0, zIndex: 600,
          background: 'rgba(3,7,13,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
          animation: 'modal-overlay-in 0.22s ease forwards',
        }}
      >
        {/* Panel */}
        <div style={{
          background: '#0A0F1A',
          border: '1px solid rgba(255,255,255,0.08)',
          maxWidth: 920, width: '100%',
          maxHeight: '92vh', overflowY: 'auto',
          position: 'relative',
          animation: 'modal-panel-in 0.38s cubic-bezier(0.16,1,0.3,1) forwards',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.1) transparent',
        }}
          className="max-md:max-h-screen"
        >
          {/* Top accent line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: accent, zIndex: 2 }} />

          {/* Close button */}
          <CloseBtn onClose={onClose} />

          {/* Content grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1.1fr',
          }}
            className="max-md:grid-cols-1"
          >
            {/* ── LEFT: image ── */}
            <div style={{
              background: `radial-gradient(ellipse at 40% 40%, ${accent}0C 0%, transparent 68%), #060A10`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: 320, padding: '48px 32px',
              position: 'relative', overflow: 'hidden',
              borderRight: '1px solid rgba(255,255,255,0.05)',
            }}>
              {/* Grid pattern */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
              }} />

              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  onLoad={() => setImgLoaded(true)}
                  style={{
                    maxWidth: '100%', maxHeight: 280, objectFit: 'contain',
                    filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.6))',
                    animation: 'img-float 6s ease-in-out infinite',
                    position: 'relative', zIndex: 1,
                    opacity: imgLoaded ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }}
                />
              ) : (
                <div style={{
                  width: '100%', height: 260,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: 'rgba(255,255,255,0.07)' }}>
                    {p.name}
                  </span>
                </div>
              )}

              {/* Category badge bottom */}
              {p.categoryName && (
                <div style={{
                  position: 'absolute', bottom: 16, left: 16,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: accent, background: `${accent}15`,
                  border: `1px solid ${accent}30`, padding: '4px 10px',
                }}>
                  {p.categoryName}
                </div>
              )}
            </div>

            {/* ── RIGHT: details ── */}
            <div style={{ padding: '44px 36px 40px', display: 'flex', flexDirection: 'column', gap: 22 }}>

              {/* Brand tag */}
              {p.brand && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  padding: '5px 12px', border: '1px solid rgba(255,255,255,0.1)',
                  width: 'fit-content',
                }}>
                  ◆ {p.brand}
                </div>
              )}

              {/* Name */}
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(24px,3vw,38px)', fontWeight: 600,
                color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em',
              }}>
                {p.name}
              </h2>

              {/* Description */}
              {p.description && (
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8,
                  borderLeft: `2px solid ${accent}50`, paddingLeft: 14,
                }}>
                  {p.description}
                </p>
              )}

              {/* Sizes */}
              {p.sizes && p.sizes.length > 0 && (
                <Section label="Available Sizes" accent={accent}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {p.sizes.map((s) => (
                      <span key={s} style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                        padding: '5px 14px',
                        border: `1px solid ${accent}40`, color: accent,
                        background: `${accent}0A`,
                      }}>{s}</span>
                    ))}
                  </div>
                </Section>
              )}

              {/* Specifications */}
              {p.specifications && Object.keys(p.specifications).length > 0 && (
                <Section label="Specifications" accent={accent}>
                  <div>
                    {Object.entries(p.specifications).map(([k, v]) => (
                      <div key={k} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                        padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                      }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.36)' }}>{k}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#fff', fontWeight: 500 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Features */}
              {p.features && p.features.length > 0 && (
                <Section label="Key Features" accent={accent}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {p.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <span style={{ color: accent, marginTop: 2, flexShrink: 0, fontSize: 8 }}>◆</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.58)', lineHeight: 1.6 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Applications */}
              {p.applications && p.applications.length > 0 && (
                <Section label="Applications" accent={accent}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {p.applications.map((a) => (
                      <span key={a} style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: 11, padding: '4px 12px',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.62)',
                      }}>{a}</span>
                    ))}
                  </div>
                </Section>
              )}

              {/* No detail state */}
              {totalSections === 0 && !p.description && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
                  Contact us for full specifications and availability on this machine.
                </p>
              )}

              {/* CTA row */}
              <div style={{
                display: 'flex', gap: 12, marginTop: 8, paddingTop: 20,
                borderTop: '1px solid rgba(255,255,255,0.07)',
                flexWrap: 'wrap',
              }}>
                <Link
                  to={`/contact?machine=${encodeURIComponent(p.name)}&category=${encodeURIComponent(p.categoryName ?? p.category)}`}
                  onClick={onClose}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700,
                    padding: '11px 24px', background: accent, color: '#fff',
                    textDecoration: 'none', transition: 'opacity 0.2s', display: 'inline-block',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  Request Quote →
                </Link>
                {p.categorySlug && (
                  <Link
                    to={`/machinery/${p.categorySlug}`}
                    onClick={onClose}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600,
                      padding: '11px 24px', background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none', transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = accent; el.style.color = accent; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.15)'; el.style.color = 'rgba(255,255,255,0.55)'; }}
                  >
                    View Category →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ── sub-components ── */

const CloseBtn = ({ onClose }: { onClose: () => void }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClose}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'absolute', top: 16, right: 16, zIndex: 10,
        background: hov ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
        width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, transition: 'all 0.2s',
      }}
      aria-label="Close"
    >
      ✕
    </button>
  );
};

const Section = ({ label, accent, children }: { label: string; accent: string; children: React.ReactNode }) => (
  <div>
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 8, letterSpacing: '0.26em', textTransform: 'uppercase',
      color: accent, marginBottom: 12,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <div style={{ width: 16, height: 1, background: accent }} />
      {label}
    </div>
    {children}
  </div>
);

export default MachinePreviewModal;
