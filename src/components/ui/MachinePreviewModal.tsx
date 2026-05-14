import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { InteractiveTravelCard } from '@/components/ui/3d-card';

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
        @keyframes modal-panel-in   { from { opacity:0; transform:translateY(24px) scale(0.97) } to { opacity:1; transform:none } }
        @keyframes img-float        { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
      `}</style>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        style={{
          position: 'fixed', inset: 0, zIndex: 600,
          background: 'rgba(6,10,16,0.62)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
          animation: 'modal-overlay-in 0.22s ease forwards',
        }}
      >
        {/* Panel */}
        <div style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)',
          border: '1px solid rgba(26,58,78,0.10)',
          borderRadius: 34,
          maxWidth: 1120, width: '100%',
          maxHeight: '92vh', overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 46px 90px rgba(10,20,40,0.24), 0 8px 22px rgba(10,20,40,0.08)',
          animation: 'modal-panel-in 0.38s cubic-bezier(0.16,1,0.3,1) forwards',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(45,95,124,0.2) transparent',
          overflowX: 'hidden',
        }}
          className="max-md:max-h-screen"
        >
          {/* Close button */}
          <CloseBtn onClose={onClose} />

          {/* Content grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1.08fr 0.92fr',
          }}
            className="max-lg:!grid-cols-1"
          >
            {/* ── LEFT: image ── */}
            <div style={{
              background: `radial-gradient(circle at 50% 10%, ${accent}18 0%, transparent 26%), linear-gradient(180deg, #f9fcff 0%, #eff5fb 58%, #fbfdff 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: 'clamp(240px, 35vw, 560px)', padding: 'clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px) clamp(22px, 3vw, 42px)',
              position: 'relative', overflow: 'hidden',
              borderRight: '1px solid rgba(26,58,78,0.07)',
            }}>
              {/* Subtle dot grid */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(circle, rgba(45,95,124,0.04) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }} />

              <div style={{
                position: 'absolute',
                inset: 'auto 12% 10% 12%',
                height: 180,
                borderRadius: 999,
                background: `radial-gradient(circle, ${accent}20 0%, transparent 72%)`,
                filter: 'blur(34px)',
                pointerEvents: 'none',
              }} />

              {p.image ? (
                <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ perspective: '1200px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <InteractiveTravelCard
                      title={p.name}
                      subtitle=""
                      imageUrl={p.image}
                      actionText=""
                      href="#"
                      onActionClick={() => {}}
                      imageFit="contain"
                      contentless
                      imagePaddingClassName="p-2 md:p-3"
                      innerInsetClassName="inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)]"
                      className="h-[31rem] w-[25rem] max-w-full border-white/22 bg-transparent shadow-[0_30px_74px_rgba(8,15,28,0.16)]"
                    />
                  </div>
                </div>
              ) : (
                <div style={{
                  width: '100%', height: 260,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: 'rgba(26,58,78,0.18)' }}>
                    {p.name}
                  </span>
                </div>
              )}

            </div>

            {/* ── RIGHT: details ── */}
            <div style={{
              padding: '48px 42px 42px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.99), rgba(246,250,255,0.96))',
            }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                {p.brand && (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'rgba(15,34,51,0.58)',
                    padding: '7px 12px', border: '1px solid rgba(26,58,78,0.10)',
                    width: 'fit-content', background: 'rgba(59,130,246,0.06)',
                    borderRadius: 999,
                  }}>
                    ◆ {p.brand}
                  </div>
                )}

                {p.categoryName && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 9,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: accent,
                    padding: '7px 12px',
                    border: `1px solid ${accent}26`,
                    background: `${accent}10`,
                    borderRadius: 999,
                    fontWeight: 700,
                  }}>
                    {p.categoryName}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h2 style={{
                  fontSize: 'clamp(30px,3vw,42px)', fontWeight: 800,
                  color: '#102338', lineHeight: 1.02, letterSpacing: '-0.035em',
                  maxWidth: 520,
                }}>
                  {p.name}
                </h2>

                {p.description && (
                  <p style={{
                    fontSize: 13.5,
                    color: 'rgba(16,35,56,0.66)',
                    lineHeight: 1.82,
                    padding: '16px 18px',
                    border: '1px solid rgba(26,58,78,0.08)',
                    background: `linear-gradient(135deg, ${accent}0f 0%, rgba(255,255,255,0.86) 62%)`,
                    borderRadius: 20,
                  }}>
                    {p.description}
                  </p>
                )}
              </div>

              {/* Sizes */}
              {p.sizes && p.sizes.length > 0 && (
                <Section label="Available Sizes" accent={accent}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {p.sizes.map((s) => (
                      <span key={s} style={{
                        fontSize: 11, fontWeight: 600,
                        padding: '5px 14px',
                        border: `1px solid ${accent}35`, color: accent,
                        background: `${accent}10`,
                        borderRadius: 999,
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
                        padding: '9px 0', borderBottom: '1px solid rgba(26,58,78,0.06)',
                      }}>
                        <span style={{ fontSize: 11, color: 'rgba(26,58,78,0.42)' }}>{k}</span>
                        <span style={{ fontSize: 12, color: '#1A3A4E', fontWeight: 600, textAlign: 'right' }}>{v}</span>
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
                        <span style={{ color: accent, marginTop: 3, flexShrink: 0, fontSize: 7 }}>◆</span>
                        <span style={{ fontSize: 13, color: 'rgba(26,58,78,0.65)', lineHeight: 1.6 }}>{f}</span>
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
                        fontSize: 11, padding: '5px 12px',
                        background: 'rgba(45,95,124,0.05)', border: '1px solid rgba(45,95,124,0.12)',
                        color: 'rgba(26,58,78,0.65)',
                        borderRadius: 999,
                      }}>{a}</span>
                    ))}
                  </div>
                </Section>
              )}

              {/* No detail state */}
              {totalSections === 0 && !p.description && (
                <p style={{ fontSize: 13, color: 'rgba(26,58,78,0.4)', lineHeight: 1.7 }}>
                  Contact us for full specifications and availability on this machine.
                </p>
              )}

              {/* CTA row */}
              <div style={{
                display: 'flex', gap: 12, marginTop: 8, paddingTop: 20,
                borderTop: '1px solid rgba(26,58,78,0.08)',
                flexWrap: 'wrap',
              }}>
                <Link
                  to={`/contact?machine=${encodeURIComponent(p.name)}&category=${encodeURIComponent(p.categoryName ?? p.category)}`}
                  onClick={onClose}
                  style={{
                    fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700,
                    padding: '13px 26px', background: `linear-gradient(135deg, ${accent}, #2563eb)`, color: '#fff',
                    textDecoration: 'none', transition: 'opacity 0.2s', display: 'inline-block',
                    boxShadow: `0 12px 26px ${accent}30`,
                    borderRadius: 999,
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
                      fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600,
                      padding: '13px 26px', background: '#fff',
                      border: '1px solid rgba(26,58,78,0.15)', color: 'rgba(26,58,78,0.55)',
                      textDecoration: 'none', transition: 'all 0.2s',
                      borderRadius: 999,
                    }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = accent; el.style.color = accent; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(26,58,78,0.15)'; el.style.color = 'rgba(26,58,78,0.55)'; }}
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
        background: hov ? 'rgba(16,35,56,0.08)' : 'rgba(16,35,56,0.04)',
        border: '1px solid rgba(26,58,78,0.10)',
        color: 'rgba(26,58,78,0.55)', cursor: 'pointer',
        width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, transition: 'all 0.2s', borderRadius: 999,
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
      fontSize: 8, letterSpacing: '0.26em', textTransform: 'uppercase',
      color: accent, marginBottom: 12,
      fontWeight: 700,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <div style={{ width: 16, height: 1.5, background: accent }} />
      {label}
    </div>
    {children}
  </div>
);

export default MachinePreviewModal;
