import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import hpmLogo from '@/assets/hpm-logo.png';
import saiLogo from '@/assets/sai-logo-cmyk.png';
import largestSellingBadge from '@/assets/largest-selling-badge.png';
import { getMachineImage } from '@/data/machineAssets';
import BrandImage from '@/components/BrandImage';

/* ── helpers ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, on };
}

/* ── data ── */
const hpmHistory = [
  { year: '1983', event: 'Paper cutter manufacturing begins', detail: 'Rui\'an Longshan General Machinery Factory starts producing paper cutters — the seed of what HPM becomes.' },
  { year: '1997', event: 'Huayue identity formed', detail: 'Business evolves into Ruian Huayue Packaging Machinery. The HPM brand name is established with a tightened focus on cutting systems.' },
  { year: '2000', event: 'Sai becomes sole India agent', detail: 'Sai Enterprises, founded in Hyderabad, secures the exclusive HPM distribution and service mandate for India from day one.' },
  { year: '2005+', event: 'Programmable cutters advanced', detail: 'The HPM line expands into fully hydraulic and program-controlled cutter systems — bringing precision and automation to production floors.' },
  { year: 'Today', event: 'Full paper handling stack', detail: 'HPM now spans programmable paper cutters, pile handling, digital cutters, and finishing support for production environments worldwide.' },
];

const hpmProducts = [
  {
    name: 'Programmable Paper Cutter',
    code: 'HPM Series',
    desc: 'Hydraulic clamp, programmable back gauge, touchscreen interface. Production-grade precision for commercial print floors.',
    image: getMachineImage(['Sai & HPM'], ['HPM Cutting Machine', 'HPM 115']),
    specs: [
      { k: 'Cutting Width', v: 'Up to 115 cm' },
      { k: 'Clamp', v: 'Hydraulic' },
      { k: 'Control', v: 'Programmable' },
    ],
  },
  {
    name: 'Digital Paper Cutter',
    code: 'HPM Digital',
    desc: 'High-speed digital control with memory storage for repeat jobs. Ideal for packaging and label converters.',
    image: getMachineImage(['Sai & HPM'], ['HPM Digital Paper Cutter', 'HPM 66']),
    specs: [
      { k: 'Cutting Width', v: 'Up to 66 cm' },
      { k: 'Programs', v: '99 programs' },
      { k: 'Drive', v: 'Servo motor' },
    ],
  },
  {
    name: 'Pile Turner',
    code: 'HPM Handling',
    desc: 'Precise pile turning and aeration for accurate sheet stacking before and after press. Essential for pre-press prep.',
    image: getMachineImage(['Sai & HPM'], ['Pile Turner', 'Pile Lifter']),
    specs: [
      { k: 'Max Load', v: '800 kg' },
      { k: 'Rotation', v: '180°' },
      { k: 'Control', v: 'Foot pedal' },
    ],
  },
];

const whySai = [
  { num: '01', title: 'Exclusive India agent since 2000', desc: 'No middle layer. Direct line to HPM Taiwan. Sai is the only authorized source for HPM machines and genuine spares in India.' },
  { num: '02', title: 'Technical service included', desc: 'Every HPM machine placed by Sai comes with installation, commissioning, and ongoing service support across all Sai regional offices.' },
  { num: '03', title: 'Genuine spares in stock', desc: 'Critical HPM spare parts stocked at Hyderabad headquarters. Eliminates long import delays for essential components.' },
  { num: '04', title: 'Right-sizing consultation', desc: 'HPM models span 66 cm to 115 cm. Sai helps select the right cutter for production volume, sheet size, and budget without overselling.' },
];

/* ── product card ── */
const ProductCard = ({ p, i }: { p: typeof hpmProducts[0]; i: number }) => {
  const { ref, on } = useReveal(0.1);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#0D1421' : '#060A10',
        border: `1px solid ${hov ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.07)'}`,
        overflow: 'hidden', cursor: 'default',
        transition: 'all 0.4s ease',
        opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(28px)',
        transitionDelay: `${i * 0.1}s`,
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{
        background: 'radial-gradient(circle at 50% 40%, rgba(59,130,246,0.08), transparent 70%)',
        height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, overflow: 'hidden', position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        {p.image ? (
          <img src={p.image} alt={p.name} style={{
            maxWidth: '100%', maxHeight: 170, objectFit: 'contain',
            filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.5))',
            transform: hov ? 'scale(1.06) translateY(-4px)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          }} />
        ) : (
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: 'rgba(255,255,255,0.1)' }}>{p.name}</div>
        )}
        {/* HPM badge */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
          padding: '3px 10px',
          fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3B82F6',
        }}>
          {p.code}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '28px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 26, fontWeight: 600, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em',
        }}>
          {p.name}
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75 }}>
          {p.desc}
        </p>

        {/* Specs */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14, marginTop: 4 }}>
          {p.specs.map((s) => (
            <div key={s.k} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{s.k}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── main ── */
const PartnersPage = () => {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeHistoryIdx, setActiveHistoryIdx] = useState(0);
  const [activeProductIdx, setActiveProductIdx] = useState(0);
  const saiHpmReveal = useReveal(0.12);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* Auto-advance HPM slider */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProductIdx((i) => (i + 1) % hpmProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <Header />

      {/* ── HERO ── */}
      <div style={{
        background: '#060A10', paddingTop: 140, paddingBottom: 100,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* ghost background */}
        <div style={{
          position: 'absolute', top: 0, right: -60,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(100px,20vw,300px)', fontWeight: 700,
          color: 'rgba(255,255,255,0.015)', lineHeight: 0.85, letterSpacing: '-0.04em',
          pointerEvents: 'none', userSelect: 'none',
        }}>
          HPM
        </div>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.05) 0%, transparent 40%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 2 }}
          className="max-md:!px-7"
        >
          {/* HPM logo */}
          <div style={{
            marginBottom: 48,
            opacity: heroRevealed ? 1 : 0, transform: heroRevealed ? 'none' : 'translateY(12px)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <BrandImage src={hpmLogo} alt="HPM" style={{ height: 44 }} />
          </div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: '#3B82F6', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 12,
            opacity: heroRevealed ? 1 : 0, transition: 'all 0.7s 0.04s',
          }}>
            <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
            Brand Partner · Taiwan
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(52px,7.5vw,108px)', fontWeight: 600,
            lineHeight: 0.92, letterSpacing: '-0.025em',
            color: '#fff', maxWidth: 860,
            opacity: heroRevealed ? 1 : 0, transform: heroRevealed ? 'none' : 'translateY(28px)',
            transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.08s',
          }}>
            India's sole<br />
            <span style={{ color: '#3B82F6', fontStyle: 'italic', fontWeight: 300 }}>HPM agent</span><br />
            since 2000.
          </h1>

          <p style={{
            marginTop: 40, fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, fontWeight: 300,
            color: 'rgba(255,255,255,0.48)', lineHeight: 1.85, maxWidth: 520,
            opacity: heroRevealed ? 1 : 0, transform: heroRevealed ? 'none' : 'translateY(16px)',
            transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.16s',
          }}>
            HPM is Taiwan's leading paper cutter manufacturer. Sai Enterprises has been the exclusive authorized agent for HPM machines, spares, and service across India since 2000.
          </p>

          {/* Impact stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, marginTop: 64,
            background: 'rgba(255,255,255,0.04)',
            opacity: heroRevealed ? 1 : 0, transition: 'all 0.7s 0.28s',
          }}
            className="max-md:!grid-cols-3 max-sm:!grid-cols-1"
          >
            {[
              { val: '490+', label: 'HPM Paper Cutters Sold' },
              { val: '90%', label: 'Market Share · Fully Automatic Cutters' },
              { val: '24+', label: 'Years as Sole India Agent' },
            ].map((s, i) => (
              <div key={s.label} style={{
                padding: '32px 28px', background: '#060A10',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(36px,4vw,56px)', fontWeight: 700,
                  color: '#3B82F6', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 8,
                }}>
                  {s.val}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Badges + Stamp */}
          <div style={{
            marginTop: 52, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
            opacity: heroRevealed ? 1 : 0, transition: 'all 0.7s 0.24s',
          }}>
            {[
              { label: 'Exclusive India Agent', color: '#3B82F6' },
              { label: 'Since 2000', color: '#FACC15' },
              { label: 'Genuine Spares', color: '#10B981' },
              { label: 'India Service', color: '#6366F1' },
            ].map((b) => (
              <div key={b.label} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
                padding: '7px 16px',
                border: `1px solid ${b.color}40`,
                color: b.color, background: `${b.color}0D`,
              }}>
                {b.label}
              </div>
            ))}
            {/* Largest selling stamp — fully visible */}
            <div style={{
              padding: '8px 16px', background: 'rgba(250,204,21,0.06)',
              border: '1px solid rgba(250,204,21,0.3)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <img src={largestSellingBadge} alt="India's Largest Paper Cutter Distributor" style={{
                height: 44, objectFit: 'contain', display: 'block',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── HISTORY TIMELINE — white/light ── */}
      <div style={{ background: '#F8FAFC', borderTop: '1px solid rgba(0,0,0,0.06)', padding: '100px 0' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }} className="max-md:!px-7">
          <div style={{ marginBottom: 60 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
              HPM History
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, color: '#060A10', letterSpacing: '-0.02em', lineHeight: 1 }}>
              Four decades of precision.
            </h2>
          </div>

          {/* Timeline */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(0,0,0,0.07)' }}
            className="max-md:grid-cols-1"
          >
            {/* Year nav */}
            <div style={{ background: '#fff', padding: '8px 0' }}>
              {hpmHistory.map((h, i) => (
                <button
                  key={h.year}
                  onClick={() => setActiveHistoryIdx(i)}
                  style={{
                    width: '100%', textAlign: 'left', background: activeHistoryIdx === i ? '#F4F6FB' : 'none', border: 'none', cursor: 'pointer',
                    padding: '20px 32px',
                    borderLeft: `2px solid ${activeHistoryIdx === i ? '#3B82F6' : 'rgba(0,0,0,0.08)'}`,
                    transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center', gap: 20,
                  }}
                >
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22, fontWeight: 700,
                    color: activeHistoryIdx === i ? '#3B82F6' : 'rgba(0,0,0,0.25)',
                    minWidth: 70, transition: 'color 0.3s',
                  }}>
                    {h.year}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                    color: activeHistoryIdx === i ? '#060A10' : 'rgba(0,0,0,0.45)',
                    transition: 'color 0.3s',
                  }}>
                    {h.event}
                  </div>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div style={{ background: '#060A10', padding: '48px 40px', display: 'flex', alignItems: 'center' }}>
              <div key={activeHistoryIdx}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(52px,6vw,80px)', fontWeight: 700, color: 'rgba(59,130,246,0.15)', lineHeight: 1, marginBottom: 8 }}>
                  {hpmHistory[activeHistoryIdx].year}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 600, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
                  {hpmHistory[activeHistoryIdx].event}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.85 }}>
                  {hpmHistory[activeHistoryIdx].detail}
                </p>
                {hpmHistory[activeHistoryIdx].year === '2000' && (
                  <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <BrandImage src={saiLogo} alt="Sai Enterprises" tone="white" style={{ height: 22, opacity: 0.6 }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3B82F6' }}>× HPM Partnership</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PRODUCTS SLIDER ── */}
      <div style={{ background: '#060A10', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }} className="max-md:!px-7">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
                HPM Machine Range
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                What HPM makes.
              </h2>
            </div>
            {/* Navigation */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {hpmProducts.map((_, i) => (
                  <button key={i} onClick={() => setActiveProductIdx(i)} style={{
                    width: i === activeProductIdx ? 24 : 8, height: 8,
                    background: i === activeProductIdx ? '#3B82F6' : 'rgba(255,255,255,0.2)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }} />
                ))}
              </div>
              <button
                onClick={() => setActiveProductIdx((i) => (i - 1 + hpmProducts.length) % hpmProducts.length)}
                style={{
                  width: 40, height: 40, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.2)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button
                onClick={() => setActiveProductIdx((i) => (i + 1) % hpmProducts.length)}
                style={{
                  width: 40, height: 40, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.2)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>

          {/* Slider track */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.04)', minHeight: 380 }}
            className="max-md:!grid-cols-1"
          >
            {/* Active product image */}
            <div style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(circle at 50% 40%, rgba(59,130,246,0.08), transparent 70%)' }}>
              {hpmProducts.map((p, i) => (
                <div key={p.name} style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40,
                  opacity: i === activeProductIdx ? 1 : 0,
                  transform: i === activeProductIdx ? 'scale(1) translateX(0)' : 'scale(0.96) translateX(20px)',
                  transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                  pointerEvents: i === activeProductIdx ? 'auto' : 'none',
                }}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} style={{
                      maxWidth: '100%', maxHeight: 260, objectFit: 'contain',
                      filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.55))',
                    }} />
                  ) : (
                    <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.08)', fontFamily: "'Cormorant Garamond', serif" }}>{p.name}</div>
                  )}
                  {/* Step indicator */}
                  <div style={{
                    position: 'absolute', top: 20, left: 20,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
                  }}>
                    {String(i + 1).padStart(2, '0')} / {String(hpmProducts.length).padStart(2, '0')}
                  </div>
                </div>
              ))}
              {/* Static thumbnail row */}
              <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8, padding: '0 20px' }}>
                {hpmProducts.map((p, i) => (
                  <button key={p.name} onClick={() => setActiveProductIdx(i)} style={{
                    width: 56, height: 40, padding: 4,
                    background: i === activeProductIdx ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
                    border: i === activeProductIdx ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                    {p.image ? (
                      <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.7 }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)' }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Active product info */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              {hpmProducts.map((p, i) => (
                <div key={p.name} style={{
                  position: 'absolute', inset: 0,
                  opacity: i === activeProductIdx ? 1 : 0,
                  transform: i === activeProductIdx ? 'translateX(0)' : 'translateX(16px)',
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  pointerEvents: i === activeProductIdx ? 'auto' : 'none',
                }}>
                  <ProductCard p={p} i={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── WHY SAI FOR HPM — white/light ── */}
      <div ref={saiHpmReveal.ref} style={{ background: '#F4F6FB', padding: '100px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }} className="max-md:!px-7">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}
            className="max-md:grid-cols-1 max-md:gap-12"
          >
            {/* Left */}
            <div style={{
              opacity: saiHpmReveal.on ? 1 : 0, transform: saiHpmReveal.on ? 'none' : 'translateX(-24px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
                Why Buy HPM Through Sai
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, lineHeight: 1.0,
                color: '#060A10', letterSpacing: '-0.02em', marginBottom: 28,
              }}>
                The only HPM<br />
                <span style={{ color: '#3B82F6', fontStyle: 'italic', fontWeight: 300 }}>source you need.</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(0,0,0,0.52)', lineHeight: 1.85, maxWidth: 420 }}>
                Buying HPM through Sai is the only way to get an authorized machine in India — with genuine spares, trained technicians, and a single point of accountability from day one.
              </p>

              <div style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link to="/contact?ref=hpm" style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
                  padding: '13px 30px', background: '#3B82F6', color: '#fff',
                  textDecoration: 'none', transition: 'background 0.2s',
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
                >
                  Enquire About HPM →
                </Link>
                <Link to="/machinery" style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
                  padding: '13px 30px', background: 'transparent',
                  border: '1px solid rgba(0,0,0,0.2)', color: 'rgba(0,0,0,0.6)',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3B82F6'; el.style.color = '#3B82F6'; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,0,0,0.2)'; el.style.color = 'rgba(0,0,0,0.6)'; }}
                >
                  All Machinery →
                </Link>
              </div>
            </div>

            {/* Right: advantage cards */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(0,0,0,0.07)',
              opacity: saiHpmReveal.on ? 1 : 0, transform: saiHpmReveal.on ? 'none' : 'translateX(24px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}>
              {whySai.map((w) => (
                <div key={w.num} style={{
                  background: '#fff', padding: '28px 24px',
                  borderTop: '2px solid #3B82F6',
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: 'rgba(59,130,246,0.15)', lineHeight: 1, marginBottom: 12 }}>
                    {w.num}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#060A10', marginBottom: 10, lineHeight: 1.3 }}>
                    {w.title}
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(0,0,0,0.48)', lineHeight: 1.7 }}>
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BROCHURE CTA ── */}
      <div style={{ background: '#060A10', padding: '80px 64px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        className="max-md:!px-7"
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 36 }}>
            Need HPM pricing or sizing guidance?
          </h2>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact?ref=hpm" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
              padding: '13px 28px', background: '#3B82F6', color: '#fff', textDecoration: 'none', transition: 'background 0.2s',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
            >
              Contact for HPM →
            </Link>
            <Link to="/brochure" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
              padding: '13px 28px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3B82F6'; el.style.color = '#3B82F6'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.15)'; el.style.color = 'rgba(255,255,255,0.6)'; }}
            >
              Open Brochure Viewer →
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </PageTransition>
  );
};

export default PartnersPage;
