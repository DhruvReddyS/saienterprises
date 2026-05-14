import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getMachineImage } from '@/data/machineAssets';

/* ── Best machine images per category ── */
const PRE_PRESS_IMGS = [
  getMachineImage(['pre press'], ['ctp']),
  getMachineImage(['pre press'], ['ctcp']),
  getMachineImage(['pre press'], ['plate processor']),
];
const PRESS_IMGS = [
  getMachineImage(['press'], ['heidelberg 01']),
  getMachineImage(['press'], ['komori']),
  getMachineImage(['press'], ['mini offset']),
];
const POST_PRESS_IMGS = [
  getMachineImage(['sai', 'hpm'], ['hpm cutting machine']),
  getMachineImage(['post press'], ['perfect binder']),
  getMachineImage(['post press'], ['thermal lamination']),
];
const CORRUGATION_IMGS = [
  getMachineImage(['corrugation'], ['double profile paper corrugation']),
  getMachineImage(['corrugation'], ['fully automatic flute laminator']),
  getMachineImage(['corrugation'], ['thin blade slitter scorer']),
];
const ALLIED_IMGS = [
  getMachineImage(['allied'], ['kanefusa']),
  getMachineImage(['allied'], ['rigid box thermal tape']),
  getMachineImage(['allied'], ['numbering']),
];

const CATS = [
  {
    id: 'pre-press', name: 'Pre-Press', slug: 'pre-press',
    desc: 'Plate imaging, exposure & processing',
    machines: ['Screen / Plate Exposure Machine', 'Fully Automatic CTCP', 'CTP System', 'Plate Processor', 'Plate Backing Oven'],
    imgs: PRE_PRESS_IMGS,
  },
  {
    id: 'press', name: 'Press', slug: 'press',
    desc: 'Offset & card-processing machinery',
    machines: ['Mini Offset 16×22"', 'Web Offset Printing Machine', 'Variable-Data Printing Machine', 'Auto Cards Matching Machine'],
    imgs: PRESS_IMGS,
  },
  {
    id: 'post-press', name: 'Post-Press', slug: 'post-press',
    desc: 'Cutting, lamination, binding & finishing',
    machines: ['HPM Programmable Paper Cutter', 'Three Knife Trimmer', 'Perfect Binder', 'Thermal Laminator', 'UV Aqua Coater'],
    imgs: POST_PRESS_IMGS,
  },
  {
    id: 'corrugation', name: 'Corrugation', slug: 'corrugation',
    desc: 'Corrugation, laminating, cutting & handling',
    machines: ['Fully Automatic Flute Laminator', 'Double Profile Paper Corrugation', 'Thin Blade Slitter Scorer', 'Four Bar Rotary Cutting'],
    imgs: CORRUGATION_IMGS,
  },
  {
    id: 'allied', name: 'Allied / Consumables', slug: 'allied',
    desc: 'Allied accessories & consumables',
    machines: ['Rigid Box', 'Thermal Tape', 'Numbering', 'Jelly Glue', 'Kanefusa Knives (Japanese)'],
    imgs: ALLIED_IMGS,
  },
];

/* Img panel: dark bg + contain for PNGs, pure cover for JPGs */
const ImgPanel = ({ src, alt, style }: { src?: string; alt: string; style?: React.CSSProperties }) => {
  const isJpg = src?.match(/\.(jpg|jpeg)$/i);
  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: isJpg
          ? '#080D16'
          : 'radial-gradient(circle at 50% 55%, rgba(59,130,246,0.09) 0%, #080D16 70%)',
      }} />
      {src && (
        <img
          src={src} alt={alt} loading="eager" decoding="async"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: isJpg ? 'cover' : 'contain',
            objectPosition: 'center',
            padding: isJpg ? 0 : 16,
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      )}
    </div>
  );
};

/* ── Mobile card image collage: main + 2 thumbs ── */
const MobileCollage = ({ imgs, name }: { imgs: (string | undefined)[]; name: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gridTemplateRows: '1fr 1fr', gap: 3, marginBottom: 24, aspectRatio: '16/9', minHeight: 180 }}>
    <ImgPanel src={imgs[0]} alt={name} style={{ gridRow: '1 / 3' }} />
    <ImgPanel src={imgs[1]} alt={name} />
    <ImgPanel src={imgs[2]} alt={name} />
  </div>
);

/* ── Desktop image cell ── self-contained with explicit sizing ── */
const ImgCell = ({ src, alt, style }: { src?: string; alt: string; style?: React.CSSProperties }) => {
  const isJpg = src?.match(/\.(jpg|jpeg)$/i);
  return (
    <div style={{
      background: isJpg ? '#080D16' : 'radial-gradient(circle at 50% 55%, rgba(59,130,246,0.09) 0%, #080D16 70%)',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      {src && (
        <img
          src={src} alt={alt} loading="eager" decoding="async"
          style={{
            width: '100%', height: '100%',
            objectFit: isJpg ? 'cover' : 'contain',
            objectPosition: 'center',
            padding: isJpg ? 0 : 16,
          }}
        />
      )}
    </div>
  );
};

/* ── Desktop collage: large left + 2 stacked right ── */
const DesktopCollage = ({ imgs, name, fadeKey }: { imgs: (string | undefined)[]; name: string; fadeKey: number }) => (
  <div
    key={fadeKey}
    style={{
      position: 'absolute', inset: 0,
      display: 'grid',
      gridTemplateColumns: '58.7% 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: 2,
      animation: 'offerings-fade-in 0.45s ease forwards',
    }}
  >
    <ImgCell src={imgs[0]} alt={`${name} — main`} style={{ gridRow: '1 / 3' }} />
    <ImgCell src={imgs[1]} alt={`${name} — secondary`} />
    <ImgCell src={imgs[2]} alt={`${name} — tertiary`} />
  </div>
);

const OfferingsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [curIdx, setCurIdx] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [prog, setProg] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const updateIdx = useCallback((newIdx: number) => {
    if (newIdx === curIdx) return;
    setCurIdx(newIdx);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    fadeTimerRef.current = setTimeout(() => setDisplayIdx(newIdx), 80);
  }, [curIdx]);

  useEffect(() => {
    if (isMobile) return;
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const sec = sectionRef.current;
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        const secH = sec.offsetHeight;
        const vh = window.innerHeight;
        const p = Math.max(0, Math.min(1, -rect.top / (secH - vh)));
        setProg(p);
        const idx = Math.min(CATS.length - 1, Math.floor(p * CATS.length));
        updateIdx(idx);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [isMobile, updateIdx]);

  const cat = CATS[curIdx];
  const displayCat = CATS[displayIdx];

  if (isMobile) {
    return (
      <section style={{ background: '#060A10' }}>
        {CATS.map((c, i) => (
          <div key={c.id} style={{
            padding: '52px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.28)', marginBottom: 18,
            }}>
              0{i + 1} / 05
            </div>

            {/* Multi-image collage */}
            <MobileCollage imgs={c.imgs} name={c.name} />

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(44px,10vw,72px)', fontWeight: 700, lineHeight: 0.88,
              color: '#fff', letterSpacing: '-0.03em', marginBottom: 14,
            }}>
              {c.name}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3B82F6',
              marginBottom: 14,
            }}>
              {c.desc}
            </div>
            {c.machines.slice(0, 3).map((m) => (
              <div key={m} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.32)', marginBottom: 6,
              }}>
                — {m}
              </div>
            ))}
            <Link
              to={`/machinery/${c.slug}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                marginTop: 24, padding: '11px 22px',
                background: '#3B82F6', color: '#fff',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
            >
              View Category <span style={{ fontSize: 14 }}>→</span>
            </Link>
          </div>
        ))}
      </section>
    );
  }

  return (
    <div ref={sectionRef} style={{ height: `${CATS.length * 100}vh`, position: 'relative' }}>
      <style>{`
        @keyframes offerings-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '48% 52%', gridTemplateRows: '1fr',
        background: '#060A10',
      }}>
        {/* LEFT: typography */}
        <div style={{
          position: 'relative', display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', padding: '80px 56px 72px 56px', zIndex: 2,
        }}>
          {/* vertical timeline bar */}
          <div style={{
            position: 'absolute', left: 32, top: 80, bottom: 80,
            width: 1, background: 'rgba(255,255,255,0.07)',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%',
              background: '#3B82F6',
              height: `${prog * 100}%`,
              transition: 'height 0.15s linear',
            }} />
          </div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)', marginBottom: 20,
          }}>
            0{displayIdx + 1} / 05
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(54px,9vw,120px)',
            fontWeight: 700, lineHeight: 0.88,
            color: '#fff', letterSpacing: '-0.03em',
            transition: 'opacity 0.3s, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {displayCat.name}
          </div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#3B82F6', marginTop: 20,
          }}>
            {displayCat.desc}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 20 }}>
            {displayCat.machines.slice(0, 3).map((m) => (
              <div key={m} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.32)',
              }}>
                — {m}
              </div>
            ))}
          </div>

          <Link
            to={`/machinery/${displayCat.slug}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              marginTop: 28, padding: '13px 28px',
              background: '#3B82F6', color: '#fff',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'background 0.2s',
              boxShadow: '0 8px 28px rgba(59,130,246,0.28)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
          >
            View Category <span style={{ fontSize: 14 }}>→</span>
          </Link>
        </div>

        {/* RIGHT: multi-image collage */}
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
          <DesktopCollage
            key={displayIdx}
            imgs={displayCat.imgs}
            name={displayCat.name}
            fadeKey={displayIdx}
          />

          {/* Index label top right */}
          <div style={{
            position: 'absolute', top: 28, right: 32, zIndex: 10,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}>
            0{displayIdx + 1} / 05
          </div>

          {/* Thin divider lines between images — purely decorative */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, zIndex: 5, pointerEvents: 'none',
            left: 'calc(58.7% + 1px)', width: 1, background: 'rgba(6,10,16,0.8)',
          }} />
          <div style={{
            position: 'absolute', left: 'calc(58.7%)', right: 0, zIndex: 5, pointerEvents: 'none',
            top: '50%', height: 1, background: 'rgba(6,10,16,0.8)',
          }} />
        </div>
      </div>
    </div>
  );
};

export default OfferingsSection;
