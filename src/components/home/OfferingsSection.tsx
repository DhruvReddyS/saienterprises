import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMachineImage } from '@/data/machineAssets';

/* ── One cover image per category ── */
const CATS = [
  {
    id: 'pre-press', name: 'Pre-Press', slug: 'pre-press',
    desc: 'Plate imaging, exposure & processing',
    machines: ['CTP System', 'Fully Automatic CTCP', 'Plate Processor', 'Screen Plate Exposure Machine', 'Plate Backing Oven'],
    cover: getMachineImage(['pre press'], ['ctp']),
  },
  {
    id: 'press', name: 'Press', slug: 'press',
    desc: 'Offset & card-processing machinery',
    machines: ['Heidelberg Offset', 'Komori Press', 'Mini Offset 16×22"', 'Variable-Data Printing Machine'],
    cover: getMachineImage(['press'], ['heidelberg 01']),
  },
  {
    id: 'post-press', name: 'Post-Press', slug: 'post-press',
    desc: 'Cutting, lamination, binding & finishing',
    machines: ['HPM Programmable Paper Cutter', 'Three Knife Trimmer', 'Perfect Binder', 'Thermal Laminator'],
    cover: getMachineImage(['sai', 'hpm'], ['hpm cutting machine']),
  },
  {
    id: 'corrugation', name: 'Corrugation', slug: 'corrugation',
    desc: 'Corrugation, laminating, cutting & handling',
    machines: ['Fully Automatic Flute Laminator', 'Double Profile Corrugation', 'Thin Blade Slitter Scorer', 'Four Bar Rotary Cutting'],
    cover: getMachineImage(['corrugation'], ['double profile paper corrugation']),
  },
  {
    id: 'allied', name: 'Allied', slug: 'allied',
    desc: 'Allied accessories & consumables',
    machines: ['Kanefusa Knives (Japanese)', 'Rigid Box Thermal Tape', 'Numbering Heads', 'Jelly Glue'],
    cover: getMachineImage(['allied'], ['kanefusa']),
  },
];

const OfferingsSection = () => {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const tlFillRef    = useRef<HTMLDivElement>(null);
  const nameRef      = useRef<HTMLDivElement>(null);
  const descRef      = useRef<HTMLDivElement>(null);
  const machRef      = useRef<HTMLDivElement>(null);
  const idxRef       = useRef<HTMLDivElement>(null);
  const ridxRef      = useRef<HTMLDivElement>(null);
  const linkRef      = useRef<HTMLAnchorElement>(null);
  const imgRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const curIdxRef    = useRef(-1);
  const rafRef       = useRef(0);

  const [isMobile, setIsMobile] = useState(false);

  /* ── mobile check ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── scroll-driven sticky (desktop only) ── */
  useEffect(() => {
    if (isMobile) return;

    const update = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect  = sec.getBoundingClientRect();
      const secH  = sec.offsetHeight;
      const vh    = window.innerHeight;
      const prog  = Math.max(0, Math.min(1, -rect.top / (secH - vh)));
      const idx   = Math.min(CATS.length - 1, Math.floor(prog * CATS.length));

      /* timeline fill */
      if (tlFillRef.current) tlFillRef.current.style.height = `${prog * 100}%`;

      if (idx !== curIdxRef.current) {
        curIdxRef.current = idx;
        const c = CATS[idx];
        const label = `0${idx + 1} / 05`;
        if (idxRef.current)  idxRef.current.textContent  = label;
        if (ridxRef.current) ridxRef.current.textContent = label;
        if (descRef.current) descRef.current.textContent = c.desc;
        if (machRef.current) machRef.current.innerHTML   = c.machines.slice(0, 3)
          .map(m => `<div style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.32);margin-bottom:6px">— ${m}</div>`)
          .join('');
        if (linkRef.current) linkRef.current.href = `/machinery/${c.slug}`;

        /* switch images */
        imgRefs.current.forEach((el, i) => {
          if (el) el.style.opacity = i === idx ? '1' : '0';
        });

        /* fade-in name */
        if (nameRef.current) {
          nameRef.current.style.opacity   = '0';
          nameRef.current.style.transform = 'translateY(16px)';
          setTimeout(() => {
            if (!nameRef.current) return;
            nameRef.current.textContent  = c.name;
            nameRef.current.style.opacity   = '1';
            nameRef.current.style.transform = '';
          }, 60);
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  /* ══════════════════ MOBILE ══════════════════ */
  if (isMobile) {
    return (
      <section style={{ background: '#060A10' }}>
        {CATS.map((c, i) => {
          const isJpg = !!c.cover?.match(/\.(jpg|jpeg)$/i);
          return (
            <div key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {/* Cover image */}
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#080D16', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {c.cover && (
                  <img src={c.cover} alt={c.name} loading="eager" decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: isJpg ? 'cover' : 'contain', display: 'block', padding: isJpg ? 0 : 20 }} />
                )}
              </div>
              {/* Text */}
              <div style={{ padding: '36px 24px 48px' }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.28)', marginBottom: 14 }}>
                  0{i + 1} / 05
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(44px,10vw,72px)', fontWeight: 700, lineHeight: .88, color: '#fff', letterSpacing: '-.03em', marginBottom: 14 }}>
                  {c.name}
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 18 }}>
                  {c.desc}
                </div>
                {c.machines.slice(0, 3).map(m => (
                  <div key={m} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.32)', marginBottom: 6 }}>
                    — {m}
                  </div>
                ))}
                <Link to={`/machinery/${c.slug}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 24,
                  padding: '11px 22px', background: '#3B82F6', color: '#fff',
                  fontSize: 10, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase',
                  textDecoration: 'none',
                }}>
                  View Category <span style={{ fontSize: 14 }}>→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    );
  }

  /* ══════════════════ DESKTOP STICKY ══════════════════ */
  return (
    <div ref={sectionRef} style={{ height: `${CATS.length * 100}vh`, position: 'relative' }}>
      <style>{`
        .off-name { transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .off-img  { transition: opacity 0.55s ease; }
        .off-img img { width:100%; height:100%; object-fit:contain; display:block; padding:32px; }
        .off-img img.cover { object-fit:cover; padding:0; }
      `}</style>

      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '52% 48%',
        background: '#060A10',
      }}>

        {/* ── LEFT: typography ── */}
        <div style={{
          position: 'relative', display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', padding: '64px 56px 72px 56px', zIndex: 2,
        }}>
          {/* timeline bar */}
          <div style={{ position: 'absolute', left: 32, top: 80, bottom: 80, width: 1, background: 'rgba(255,255,255,0.07)' }}>
            <div ref={tlFillRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '0%', background: '#3B82F6', transition: 'height 0.15s linear' }} />
          </div>

          <div ref={idxRef} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.28)', marginBottom: 20 }}>
            01 / 05
          </div>

          <div ref={nameRef} className="off-name" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(54px,9vw,120px)', fontWeight: 700, lineHeight: .88, color: '#fff', letterSpacing: '-.03em' }}>
            {CATS[0].name}
          </div>

          <div ref={descRef} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: '#3B82F6', marginTop: 20 }}>
            {CATS[0].desc}
          </div>

          <div ref={machRef} style={{ marginTop: 20 }}>
            {CATS[0].machines.slice(0, 3).map(m => (
              <div key={m} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.32)', marginBottom: 6 }}>
                — {m}
              </div>
            ))}
          </div>

          <a ref={linkRef} href={`/machinery/${CATS[0].slug}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            marginTop: 28, padding: '13px 28px', alignSelf: 'flex-start',
            background: '#3B82F6', color: '#fff',
            fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase',
            textDecoration: 'none', boxShadow: '0 8px 28px rgba(59,130,246,.28)',
            transition: 'background .2s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
          >
            View Category <span style={{ fontSize: 14 }}>→</span>
          </a>
        </div>

        {/* ── RIGHT: full-bleed images, all pre-rendered, opacity-switched ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {CATS.map((c, i) => {
            const isJpg = !!c.cover?.match(/\.(jpg|jpeg)$/i);
            return (
              <div
                key={c.id}
                ref={el => { imgRefs.current[i] = el; }}
                className="off-img"
                style={{
                  position: 'absolute', inset: 0,
                  opacity: i === 0 ? 1 : 0,
                  background: isJpg
                    ? '#080D16'
                    : 'radial-gradient(circle at 50% 50%, rgba(59,130,246,.07) 0%, #080D16 70%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {c.cover && (
                  <img
                    src={c.cover}
                    alt={c.name}
                    loading="eager"
                    decoding="async"
                    className={isJpg ? 'cover' : ''}
                  />
                )}
                {/* Overlay gradient */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'linear-gradient(to right, rgba(6,10,16,.7) 0%, transparent 45%), linear-gradient(to top, rgba(6,10,16,.4) 0%, transparent 50%)',
                }} />
              </div>
            );
          })}

          {/* index label top-right */}
          <div ref={ridxRef} style={{
            position: 'absolute', top: 28, right: 32, zIndex: 10,
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.3)',
          }}>
            01 / 05
          </div>
        </div>

      </div>
    </div>
  );
};

export default OfferingsSection;
