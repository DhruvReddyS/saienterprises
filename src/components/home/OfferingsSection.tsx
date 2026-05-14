import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-printing.jpg';
import hpmMachineImage from '@/assets/hpm-machine.png';
import corrugationImage from '@/assets/corrugation-hero.jpg';
import brochureImage from '@/assets/brochure-hero.jpg';

const CATS = [
  {
    id: 'pre-press', name: 'Pre-Press',
    desc: 'Plate imaging, exposure & processing',
    img: heroImage,
    slug: 'pre-press',
    machines: ['Screen / Plate Exposure Machine', 'Fully Automatic CTCP', 'CTP System', 'Plate Processor', 'Plate Backing Oven'],
  },
  {
    id: 'press', name: 'Press',
    desc: 'Offset & card-processing machinery',
    img: heroImage,
    slug: 'press',
    machines: ['Mini Offset 16×22"', 'Web Offset Printing Machine', 'Variable-Data Printing Machine', 'Auto Cards Matching Machine'],
  },
  {
    id: 'post-press', name: 'Post-Press',
    desc: 'Cutting, lamination, binding & finishing',
    img: hpmMachineImage,
    slug: 'post-press',
    machines: ['HPM Programmable Paper Cutter', 'Three Knife Trimmer', 'Perfect Binder', 'Thermal Laminator', 'UV Aqua Coater'],
    imgContain: true,
  },
  {
    id: 'corrugation', name: 'Corrugation',
    desc: 'Corrugation, laminating, cutting & handling',
    img: corrugationImage,
    slug: 'corrugation',
    machines: ['Fully Automatic Flute Laminator', 'Double Profile Paper Corrugation', 'Thin Blade Slitter Scorer', 'Four Bar Rotary Cutting'],
  },
  {
    id: 'allied', name: 'Allied / Consumables',
    desc: 'Allied accessories & consumables',
    img: brochureImage,
    slug: 'allied',
    machines: ['Rigid Box', 'Thermal Tape', 'Numbering', 'Jelly Glue', 'Kanefusa Knives (Japanese)'],
  },
];

const OfferingsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [curIdx, setCurIdx] = useState(0);
  const [prog, setProg] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
        setCurIdx(idx);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, [isMobile]);

  const cat = CATS[curIdx];

  if (isMobile) {
    return (
      <section style={{ background: '#060A10' }}>
        {CATS.map((c, i) => (
          <div key={c.id} style={{
            padding: '60px 28px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.28)', marginBottom: 20,
            }}>
              0{i + 1} / 05
            </div>
            <div style={{ aspectRatio: '16/9', overflow: 'hidden', marginBottom: 24 }}>
              <img src={c.img} alt={c.name} loading="lazy" decoding="async" style={{
                width: '100%', height: '100%',
                objectFit: c.imgContain ? 'contain' : 'cover',
                background: c.imgContain ? '#0D1421' : undefined,
              }} />
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(44px,10vw,72px)', fontWeight: 700, lineHeight: 0.88,
              color: '#fff', letterSpacing: '-0.03em', marginBottom: 16,
            }}>
              {c.name}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3B82F6',
              marginBottom: 16,
            }}>
              {c.desc}
            </div>
            {c.machines.slice(0, 3).map((m) => (
              <div key={m} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.32)', marginBottom: 6,
              }}>
                {m}
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
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '52% 48%',
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
            0{curIdx + 1} / 05
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(54px,9vw,120px)',
            fontWeight: 700, lineHeight: 0.88,
            color: '#fff', letterSpacing: '-0.03em',
            transition: 'opacity 0.3s, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {cat.name}
          </div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#3B82F6', marginTop: 20,
          }}>
            {cat.desc}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 20 }}>
            {cat.machines.slice(0, 3).map((m) => (
              <div key={m} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.32)',
              }}>
                {m}
              </div>
            ))}
          </div>

          <Link
            to={`/machinery/${cat.slug}`}
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

        {/* RIGHT: full-bleed image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {CATS.map((c, i) => (
            <div key={c.id} style={{
              position: 'absolute', inset: 0,
              opacity: i === curIdx ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}>
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%', height: '100%',
                  objectFit: c.imgContain ? 'contain' : 'cover',
                  background: c.imgContain ? '#0D1421' : undefined,
                  transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                  transform: i === curIdx ? 'scale(1)' : 'scale(1.03)',
                  willChange: 'transform',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(6,10,16,0.6) 0%, transparent 40%), linear-gradient(to top, rgba(6,10,16,0.4) 0%, transparent 50%)',
              }} />
            </div>
          ))}

          {/* Index label top right */}
          <div style={{
            position: 'absolute', top: 28, right: 32, zIndex: 2,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}>
            0{curIdx + 1} / 05
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferingsSection;
