import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMachineImage } from '@/data/machineAssets';

/* ── Top 4 machine images per category ── */
const CATS = [
  {
    id: 'pre-press', name: 'Pre-Press', slug: 'pre-press',
    desc: 'Plate imaging, exposure & processing — the start of every press-ready workflow.',
    imgs: [
      getMachineImage(['pre press'], ['ctp']),
      getMachineImage(['pre press'], ['ctcp']),
      getMachineImage(['pre press'], ['plate processor']),
      getMachineImage(['pre press'], ['screen plate exposure']),
    ],
  },
  {
    id: 'press', name: 'Press', slug: 'press',
    desc: 'Offset & card-processing machinery — production-ready output at scale.',
    imgs: [
      getMachineImage(['press'], ['heidelberg 01']),
      getMachineImage(['press'], ['komori']),
      getMachineImage(['press'], ['mini offset']),
      getMachineImage(['press'], ['variable data printing']),
    ],
  },
  {
    id: 'post-press', name: 'Post-Press', slug: 'post-press',
    desc: 'Cutting, lamination, binding & finishing — every detail that ships.',
    imgs: [
      getMachineImage(['sai', 'hpm'], ['hpm cutting machine']),
      getMachineImage(['sai', 'hpm'], ['three knife trimmer']),
      getMachineImage(['post press'], ['perfect binder']),
      getMachineImage(['post press'], ['thermal lamination']),
    ],
  },
  {
    id: 'corrugation', name: 'Corrugation', slug: 'corrugation',
    desc: 'Corrugation, laminating, cutting & handling — built for packaging volumes.',
    imgs: [
      getMachineImage(['corrugation'], ['fully automatic flute laminator']),
      getMachineImage(['corrugation'], ['double profile paper corrugation']),
      getMachineImage(['corrugation'], ['thin blade slitter scorer']),
      getMachineImage(['corrugation'], ['four bar rotary cutting']),
    ],
  },
  {
    id: 'allied', name: 'Allied', slug: 'allied',
    desc: 'Allied accessories & consumables — the small parts that keep lines running.',
    imgs: [
      getMachineImage(['allied'], ['kanefusa']),
      getMachineImage(['allied'], ['rigid box thermal tape']),
      getMachineImage(['allied'], ['numbering']),
      getMachineImage(['allied'], ['jelly glue']),
    ],
  },
];

/* ── Dark palette ── */
const T = {
  bg:      '#060A10',
  bg2:     '#0B111B',         // featured cell
  bg3:     '#0F1622',         // thumbnail cell
  bg4:     '#141C2A',         // hover
  ink:     '#FFFFFF',
  ink2:    'rgba(255,255,255,0.62)',
  ink3:    'rgba(255,255,255,0.36)',
  rule:    'rgba(255,255,255,0.08)',
  accent:  '#3B82F6',
  accentS: '#60A5FA',
};

const OfferingsSection = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [idx, setIdx]   = useState(0);
  const [prog, setProg] = useState(0);
  const [pin, setPin]   = useState<'before' | 'pinned' | 'after'>('before');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let raf = 0;

    const update = () => {
      const w = wrapRef.current;
      if (!w) return;
      const r = w.getBoundingClientRect();
      const vh = window.innerHeight;
      const H  = w.offsetHeight;

      if (r.top > 0) {
        setPin('before'); setProg(0); setIdx(0);
      } else if (r.bottom < vh) {
        setPin('after'); setProg(1); setIdx(CATS.length - 1);
      } else {
        setPin('pinned');
        const p = Math.max(0, Math.min(1, -r.top / (H - vh)));
        setProg(p);
        setIdx(Math.min(CATS.length - 1, Math.floor(p * CATS.length)));
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  /* ══════════════════════ MOBILE ══════════════════════ */
  if (isMobile) {
    return (
      <section style={{ background: T.bg }}>
        {CATS.map((c, i) => (
          <div key={c.id} style={{ padding: '60px 24px 56px', borderBottom: `1px solid ${T.rule}` }}>
            <div style={{
              fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase',
              color: T.accent, marginBottom: 14, fontWeight: 700, fontFamily: "'DM Sans',sans-serif",
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 18, height: 1, background: T.accent }} />
              0{i + 1} / 05
            </div>

            <CoverCollage imgs={c.imgs} alt={c.name} compact />

            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 'clamp(42px,10vw,72px)', fontWeight: 700, lineHeight: .9,
              color: T.ink, letterSpacing: '-.03em', margin: '20px 0 10px',
            }}>{c.name}</h2>
            <div style={{ fontSize: 13, color: T.ink2, marginBottom: 24, lineHeight: 1.65 }}>{c.desc}</div>

            <Link to={`/machinery/${c.slug}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '11px 22px', background: T.accent, color: T.ink,
              fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
              View Category <span style={{ fontSize: 14 }}>→</span>
            </Link>
          </div>
        ))}
      </section>
    );
  }

  /* ══════════════════════ DESKTOP — pinned single panel ══════════════════════ */
  const cur = CATS[idx];
  const panelPos: React.CSSProperties =
    pin === 'before' ? { position: 'absolute', top: 0,    left: 0, right: 0 }
  : pin === 'after'  ? { position: 'absolute', bottom: 0, left: 0, right: 0 }
                     : { position: 'fixed',    top: 0,    left: 0, right: 0 };

  return (
    <div ref={wrapRef} style={{
      position: 'relative',
      height: `${CATS.length * 100}vh`,
      background: T.bg,
    }}>
      <div style={{
        ...panelPos,
        height: '100vh',
        overflow: 'hidden',
        background: T.bg,
        display: 'flex',
        zIndex: 1,
      }}>
        {/* ─── LEFT 48% — text aligned BOTTOM ─── */}
        <div style={{
          width: '48%', flexShrink: 0, height: '100vh',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px 64px 96px 96px',
          position: 'relative',
        }}>
          {/* vertical timeline */}
          <div style={{
            position: 'absolute', left: 56, top: 96, bottom: 110,
            width: 1, background: T.rule,
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%',
              height: `${prog * 100}%`, background: T.accent,
              transition: 'height 0.15s linear',
            }} />
          </div>

          {/* tag */}
          <div style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 10, letterSpacing: '.32em', textTransform: 'uppercase',
            color: T.accent, fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
          }}>
            <span style={{ width: 24, height: 1, background: T.accent }} />
            Machinery · 0{idx + 1} / 05
          </div>

          {/* name */}
          <h2 key={`n-${idx}`} style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(64px,9vw,132px)', fontWeight: 700, lineHeight: .88,
            color: T.ink, letterSpacing: '-.03em', margin: '0 0 22px',
            animation: 'off-fade-up 0.55s cubic-bezier(0.16,1,0.3,1) both',
          }}>{cur.name}</h2>

          {/* desc */}
          <p key={`d-${idx}`} style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 14, color: T.ink2, lineHeight: 1.75,
            maxWidth: 480, margin: '0 0 36px',
            animation: 'off-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both',
          }}>{cur.desc}</p>

          {/* CTA */}
          <Link
            to={`/machinery/${cur.slug}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 28px', alignSelf: 'flex-start',
              background: T.accent, color: T.ink,
              fontSize: 10, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 12px 32px rgba(59,130,246,.28)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = T.accentS;
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(96,165,250,.42)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = T.accent;
              (e.currentTarget as HTMLElement).style.transform = '';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(59,130,246,.28)';
            }}
          >
            View Category <span style={{ fontSize: 14 }}>→</span>
          </Link>
        </div>

        {/* ─── RIGHT 52% — featured cover layout ─── */}
        <div style={{
          width: '52%', flexShrink: 0, height: '100vh',
          position: 'relative', overflow: 'hidden',
          padding: '64px 64px 80px 32px',
          boxSizing: 'border-box',
          background: T.bg,
        }}>
          {/* 5 collages pre-rendered, opacity-switched */}
          {CATS.map((c, i) => (
            <div
              key={c.id}
              style={{
                position: 'absolute',
                top: 64, left: 32, right: 64, bottom: 80,
                opacity: i === idx ? 1 : 0,
                transform: i === idx ? 'scale(1) translateY(0)' : 'scale(0.98) translateY(8px)',
                transition: 'opacity 0.55s ease, transform 0.65s cubic-bezier(0.16,1,0.3,1)',
                pointerEvents: i === idx ? 'auto' : 'none',
              }}
            >
              <CoverCollage imgs={c.imgs} alt={c.name} />
            </div>
          ))}

          {/* index chip top-right */}
          <div style={{
            position: 'absolute', top: 80, right: 80, zIndex: 10,
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 9, letterSpacing: '.36em', textTransform: 'uppercase',
            color: T.ink, fontWeight: 700,
            padding: '7px 14px',
            background: 'rgba(6,10,16,0.6)',
            border: `1px solid ${T.rule}`,
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent }} />
            0{idx + 1} / 05
          </div>

          {/* progress bar bottom */}
          <div style={{
            position: 'absolute', left: 32, right: 64, bottom: 40, zIndex: 10,
            height: 2, background: T.rule,
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0,
              height: '100%', width: `${prog * 100}%`,
              background: T.accent,
              transition: 'width 0.15s linear',
              boxShadow: '0 0 12px rgba(59,130,246,0.6)',
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes off-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

/* ── Cover collage: 2x2 grid ── */
const CoverCollage = ({ imgs, alt, compact }: { imgs: (string | undefined)[]; alt: string; compact?: boolean }) => (
  <div style={{
    width: '100%', height: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: compact ? '140px 140px' : '1fr 1fr',
    gap: compact ? 6 : 10,
  }}>
    <ImgCell src={imgs[0]} alt={alt} />
    <ImgCell src={imgs[1]} alt={alt} />
    <ImgCell src={imgs[2]} alt={alt} />
    <ImgCell src={imgs[3]} alt={alt} />
  </div>
);

/* ── Image cell ── */
const ImgCell = ({ src, alt }: { src?: string; alt: string }) => {
  const isJpg = !!src?.match(/\.(jpg|jpeg)$/i);
  return (
    <div style={{
      background: T.bg2,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${T.rule}`,
      transition: 'background 0.3s, border-color 0.3s',
    }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = T.bg4;
        el.style.borderColor = 'rgba(59,130,246,0.25)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = T.bg2;
        el.style.borderColor = T.rule;
      }}
    >
      {/* subtle radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 65%)',
      }} />
      {src && (
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          style={{
            display: 'block',
            position: 'relative', zIndex: 1,
            maxWidth: '100%',
            maxHeight: '100%',
            width: isJpg ? '100%' : 'auto',
            height: isJpg ? '100%' : 'auto',
            objectFit: isJpg ? 'cover' : 'contain',
            padding: isJpg ? 0 : 16,
          }}
        />
      )}
    </div>
  );
};

export default OfferingsSection;
