import { useEffect, useRef, useState } from 'react';
import { setPageMeta } from '@/lib/seo';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import PageTransition from '@/components/PageTransition';
import { BorderBeam } from '@/components/ui/border-beam';
import { GlowCard } from '@/components/ui/spotlight-card';
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
    name: 'HPM 115 Programmable Cutter',
    code: 'HPM 115',
    category: 'Paper Cutters',
    desc: 'Flagship 115 cm fully programmable paper cutter with hydraulic clamp and touchscreen control. Production-grade precision for large-format print floors.',
    image: getMachineImage(['Sai & HPM'], ['HPM 115']),
    specs: [
      { k: 'Cutting Width', v: '115 cm' },
      { k: 'Clamp', v: 'Hydraulic' },
      { k: 'Control', v: 'Programmable' },
    ],
  },
  {
    name: 'HPM 66 Paper Cutter',
    code: 'HPM 66',
    category: 'Paper Cutters',
    desc: 'Compact 66 cm cutter with digital back gauge and servo motor drive. Ideal for smaller commercial print and packaging operations.',
    image: getMachineImage(['Sai & HPM'], ['HPM 66']),
    specs: [
      { k: 'Cutting Width', v: '66 cm' },
      { k: 'Drive', v: 'Servo motor' },
      { k: 'Programs', v: '99 programs' },
    ],
  },
  {
    name: 'HPM Cutting Machine',
    code: 'HPM Cutter',
    category: 'Paper Cutters',
    desc: 'Versatile heavy-duty paper cutter for commercial print floors. Reliable hydraulic system with precision back gauge and safety beam.',
    image: getMachineImage(['Sai & HPM'], ['HPM Cutting Machine']),
    specs: [
      { k: 'Type', v: 'Hydraulic Guillotine' },
      { k: 'Clamp', v: 'Hydraulic Auto' },
      { k: 'Safety', v: 'Light beam' },
    ],
  },
  {
    name: 'Digital Paper Cutter',
    code: 'HPM Digital',
    category: 'Paper Cutters',
    desc: 'High-speed digital control with memory storage for repeat jobs. Fast job changeover for packaging and label converters.',
    image: getMachineImage(['Sai & HPM'], ['HPM Digital Paper Cutter']),
    specs: [
      { k: 'Control', v: 'Digital display' },
      { k: 'Memory', v: '99 programs' },
      { k: 'Backgauge', v: 'Servo-driven' },
    ],
  },
  {
    name: 'HPM Lane Feeder',
    code: 'HPM Lane',
    category: 'Handling',
    desc: 'Automated lane feeding system for high-throughput paper cutting lines. Reduces manual handling and increases production efficiency.',
    image: getMachineImage(['Sai & HPM'], ['HPM Lane']),
    specs: [
      { k: 'Type', v: 'Auto Lane Feed' },
      { k: 'Integration', v: 'HPM Cutters' },
      { k: 'Control', v: 'PLC' },
    ],
  },
  {
    name: 'Pile Turner',
    code: 'HPM Pile Turner',
    category: 'Handling',
    desc: 'Precise pile turning and aeration for accurate sheet stacking before and after press. Essential for pre-press prep and quality output.',
    image: getMachineImage(['Sai & HPM'], ['Pile Turner']),
    specs: [
      { k: 'Max Load', v: '800 kg' },
      { k: 'Rotation', v: '180°' },
      { k: 'Control', v: 'Foot pedal' },
    ],
  },
  {
    name: 'Pile Lifter',
    code: 'HPM Lifter',
    category: 'Handling',
    desc: 'Heavy-duty pile lifting system for seamless paper stack transport between press stations. Reduces operator strain and production downtime.',
    image: getMachineImage(['Sai & HPM'], ['Pile Lifter']),
    specs: [
      { k: 'Capacity', v: '1000 kg' },
      { k: 'Platform', v: 'Hydraulic rise' },
      { k: 'Control', v: 'Pendant panel' },
    ],
  },
  {
    name: 'Three Knife Trimmer',
    code: 'HPM 3KT',
    category: 'Finishing',
    desc: 'High-speed three-knife trimmer for books, catalogues and brochures. Precision trimming on three sides in a single pass.',
    image: getMachineImage(['Sai & HPM'], ['Three Knife Trimmer']),
    specs: [
      { k: 'Knives', v: 'Top + 2 side' },
      { k: 'Application', v: 'Books / Catalogues' },
      { k: 'Control', v: 'PLC touchscreen' },
    ],
  },
  {
    name: 'Semi-Auto Three Knife Trimmer',
    code: 'HPM SA-3KT',
    category: 'Finishing',
    desc: 'Semi-automatic three-knife trimmer suited to medium-volume finishing lines. Cost-effective precision trimming for smaller binderies.',
    image: getMachineImage(['Sai & HPM'], ['Semi Automatic Three Knife Trimmer']),
    specs: [
      { k: 'Mode', v: 'Semi-automatic' },
      { k: 'Application', v: 'Books / Booklets' },
      { k: 'Throughput', v: 'Medium volume' },
    ],
  },
];

const whySai = [
  { num: '01', title: 'Exclusive India agent since 2000', desc: 'No middle layer. Direct line to HPM Taiwan. Sai is the only authorized source for HPM machines and genuine spares in India.' },
  { num: '02', title: 'Technical service included', desc: 'Every HPM machine placed by Sai comes with installation, commissioning, and ongoing service support across all Sai regional offices.' },
  { num: '03', title: 'Genuine spares in stock', desc: 'Critical HPM spare parts stocked at Hyderabad headquarters. Eliminates long import delays for essential components.' },
  { num: '04', title: 'Right-sizing consultation', desc: 'HPM models span 66 cm to 115 cm. Sai helps select the right cutter for production volume, sheet size, and budget without overselling.' },
];

const partnerProof = [
  { val: 'Since 2000', label: 'Exclusive India Agent' },
  { val: "India's #1", label: 'Paper Cutter Distributor' },
  { val: '90%', label: 'Fully Automatic Cutter Share' },
  { val: '490+', label: 'HPM Cutters Placed' },
];

/* ── product card ── */
const ProductCard = ({ p, i }: { p: typeof hpmProducts[0]; i: number }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#0D1421' : '#060A10',
        border: `1px solid ${hov ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.07)'}`,
        overflow: 'hidden', cursor: 'default',
        transition: 'background 0.4s ease, border-color 0.4s ease',
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
          <img src={p.image} alt={p.name} loading="lazy" decoding="async" style={{
            maxWidth: '100%', maxHeight: 170, objectFit: 'contain',
            filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.5))',
            transform: hov ? 'scale(1.06) translateY(-4px)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          }} />
        ) : (
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: 'rgba(255,255,255,0.1)' }}>{p.name}</div>
        )}
        {/* Badges */}
        <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 6 }}>
          <div style={{
            background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)',
            padding: '3px 10px',
            fontFamily: "'DM Sans', sans-serif", fontSize: 7.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#60A5FA',
          }}>
            {p.code}
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            padding: '3px 10px',
            fontFamily: "'DM Sans', sans-serif", fontSize: 7.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
          }}>
            {(p as typeof hpmProducts[0]).category}
          </div>
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
    </motion.div>
  );
};

/* ── Why Sai card ── */
const WhySaiCard = ({ w, wi }: { w: typeof whySai[0]; wi: number }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '40px 32px 36px',
        background: hov ? 'rgba(59,130,246,0.06)' : '#060A10',
        border: `1px solid ${hov ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.06)'}`,
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        cursor: 'default',
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 2,
        background: hov ? '#3B82F6' : 'rgba(59,130,246,0.15)',
        transition: 'background 0.3s',
      }} />
      {hov && <BorderBeam colorFrom="#3B82F6" colorTo="#60A5FA" duration={5} delay={wi * 0.5} borderWidth={1} size={160} />}

      {/* Number */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 52, fontWeight: 700,
        color: '#3B82F6',
        opacity: hov ? 0.2 : 0.1, lineHeight: 1, marginBottom: 20,
        letterSpacing: '-0.03em', transition: 'opacity 0.3s',
        userSelect: 'none',
      }}>
        {w.num}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.3 }}>
        {w.title}
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.8, margin: 0 }}>
        {w.desc}
      </p>
    </div>
  );
};

const HPM_CATS = ['All', 'Paper Cutters', 'Handling', 'Finishing'] as const;
type HpmCat = typeof HPM_CATS[number];

/* ── main ── */
const PartnersPage = () => {
  const [activeHistoryIdx, setActiveHistoryIdx] = useState(0);
  const [activeCat, setActiveCat] = useState<HpmCat>('All');
  const saiHpmReveal = useReveal(0.12);

  useEffect(() => {
    setPageMeta(
      'Partners & Brands | Sai Enterprises — HPM, Heidelberg, Komori & More',
      'Sai Enterprises is the sole authorized HPM agent in India. Partnered with Heidelberg, Komori, and 10+ global machinery brands.',
    );
  }, []);

  const filteredProducts = activeCat === 'All'
    ? hpmProducts
    : hpmProducts.filter((p) => p.category === activeCat);

  return (
    <PageTransition>
      <Header />

      {/* ── HERO ── */}
      <div style={{
        background: '#060A10', paddingTop: 0, paddingBottom: 0,
        position: 'relative', overflow: 'hidden', minHeight: '100dvh',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Dot-grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.055) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }} />

        {/* Left glow */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '55%',
          background: 'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* Thin horizontal accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6) 40%, transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto', padding: '160px 64px 100px', width: '100%', position: 'relative', zIndex: 2 }}
            className="max-lg:!px-10 max-lg:!pt-36 max-md:!px-6 max-md:!pt-28 max-md:!pb-12 max-[767px]:!pt-8"
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}
              className="max-lg:!grid-cols-1 max-lg:!gap-16"
            >
              {/* Left */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ marginBottom: 32 }}
                >
                  <BrandImage src={hpmLogo} alt="HPM" style={{ height: 40 }} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, letterSpacing: '0.3em',
                    textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700,
                  }}
                >
                  <div style={{ width: 24, height: 1, background: '#3B82F6' }} />
                  Exclusive India Partner · Since 2000
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(50px,7vw,100px)', fontWeight: 600,
                    lineHeight: 0.9, letterSpacing: '-0.03em',
                    color: '#fff', margin: 0,
                  }}
                >
                  The only HPM<br />
                  <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.38)' }}>source</span>{' '}
                  in India.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    marginTop: 36, fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14, fontWeight: 300,
                    color: 'rgba(255,255,255,0.42)', lineHeight: 1.85, maxWidth: 460,
                  }}
                >
                  Selection, import, installation, spares, and service — Sai is the sole authorised HPM path for every Indian print and packaging floor.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ marginTop: 44, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
                >
                  <Link to="/contact?ref=hpm" style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
                    padding: '13px 28px', background: '#3B82F6', color: '#fff',
                    textDecoration: 'none', transition: 'background 0.2s',
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
                  >
                    Enquire About HPM →
                  </Link>
                  <img src={largestSellingBadge} alt="India's Largest Paper Cutter Distributor" loading="lazy" decoding="async" style={{ height: 40, objectFit: 'contain' }} />
                </motion.div>
              </div>

              {/* Right — stats + identity panel */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                {partnerProof.map((s, i) => (
                  <div
                    key={s.label}
                    style={{
                      padding: '28px 32px',
                      background: i === 0 ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${i === 0 ? 'rgba(59,130,246,0.28)' : 'rgba(255,255,255,0.06)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      gap: 16, position: 'relative', overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0, width: 2,
                      background: i === 0 ? '#3B82F6' : 'rgba(255,255,255,0.07)',
                    }} />
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(26px,3vw,40px)', fontWeight: 700,
                      color: i === 0 ? '#fff' : '#60A5FA', lineHeight: 1, letterSpacing: '-0.02em',
                    }}>
                      {s.val}
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.22em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', fontWeight: 700,
                      textAlign: 'right',
                    }}>
                      {s.label}
                    </div>
                    {i === 0 && <BorderBeam colorFrom="#3B82F6" colorTo="#60A5FA" duration={6} borderWidth={1} size={160} />}
                  </div>
                ))}

                {/* Tags row */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '20px 0 0' }}>
                  {[
                    { label: 'Exclusive India Agent', color: '#3B82F6' },
                    { label: 'Since 2000', color: '#FACC15' },
                    { label: 'Genuine Spares', color: '#10B981' },
                    { label: 'India Service', color: '#6366F1' },
                  ].map((b) => (
                    <div key={b.label} style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase',
                      padding: '6px 14px',
                      border: `1px solid ${b.color}40`,
                      color: b.color, background: `${b.color}0D`,
                    }}>
                      {b.label}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom edge fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(to bottom, transparent, #060A10)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── HISTORY TIMELINE — white/light ── */}
      <div style={{ background: '#F8FAFC', borderTop: '1px solid rgba(0,0,0,0.06)', padding: 'clamp(48px,8vw,100px) 0' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }} className="max-md:!px-7 max-[767px]:!px-4">
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
            className="max-lg:!grid-cols-1"
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
            <div style={{ background: '#060A10', padding: 'clamp(24px,4vw,48px) clamp(20px,4vw,40px)', display: 'flex', alignItems: 'center' }}>
              <div key={activeHistoryIdx}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(52px,6vw,80px)', fontWeight: 700,
                  color: '#3B82F6', opacity: 0.18,
                  lineHeight: 1, marginBottom: 8,
                  animation: 'yearPulse 3s ease-in-out infinite',
                }}>
                  {hpmHistory[activeHistoryIdx].year}
                </div>
                <style>{`
                  @keyframes yearPulse {
                    0%, 100% { opacity: 0.18; }
                    50% { opacity: 0.32; }
                  }
                `}</style>
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

      {/* ── HPM MACHINE RANGE — filtered grid ── */}
      <div style={{ background: '#060A10', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }} className="max-md:!px-7 max-[767px]:!px-4">
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
              HPM Machine Range
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, margin: 0 }}>
                The complete HPM line.
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 380, margin: 0 }}>
                Cutters, pile handling, and finishing — every machine, exclusively through Sai.
              </p>
            </div>
          </div>

          {/* Category filter tabs */}
          <div style={{ display: 'flex', gap: 2, marginBottom: 40, flexWrap: 'wrap' }}>
            {HPM_CATS.map((cat) => {
              const count = cat === 'All' ? hpmProducts.length : hpmProducts.filter((p) => p.category === cat).length;
              const isActive = activeCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700,
                    padding: '10px 22px',
                    background: isActive ? '#3B82F6' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isActive ? '#3B82F6' : 'rgba(255,255,255,0.08)'}`,
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                  onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.4)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; } }}
                  onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; } }}
                >
                  {cat}
                  <span style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                    padding: '1px 7px', fontSize: 8,
                    borderRadius: 0, transition: 'background 0.25s',
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Animated grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.05)' }}
              className="max-lg:!grid-cols-2 max-[767px]:!grid-cols-1 max-sm:!grid-cols-1"
            >
              {filteredProducts.map((p, i) => (
                <ProductCard key={p.name} p={p} i={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── WHY SAI FOR HPM — dark, modern ── */}
      <div ref={saiHpmReveal.ref} style={{ background: '#060A10', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle center glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 800, height: 400,
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 65%)',
          pointerEvents: 'none', filter: 'blur(40px)',
        }} />

        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px', position: 'relative' }} className="max-md:!px-7 max-[767px]:!px-4">
          {/* Section header */}
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: 64, flexWrap: 'wrap', gap: 24,
            opacity: saiHpmReveal.on ? 1 : 0, transform: saiHpmReveal.on ? 'none' : 'translateY(16px)',
            transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
                Why Buy HPM Through Sai
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 600, lineHeight: 0.95,
                color: '#fff', letterSpacing: '-0.025em', margin: 0,
              }}>
                Authorized. Accountable.<br />
                <span style={{ color: '#3B82F6', fontStyle: 'italic', fontWeight: 300 }}>The only source you need.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/contact?ref=hpm" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
                padding: '13px 28px', background: '#3B82F6', color: '#fff',
                textDecoration: 'none', transition: 'background 0.2s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
              >
                Enquire About HPM →
              </Link>
            </div>
          </div>

          {/* 4 advantage cards in a horizontal row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
            background: 'rgba(255,255,255,0.05)',
            opacity: saiHpmReveal.on ? 1 : 0, transform: saiHpmReveal.on ? 'none' : 'translateY(24px)',
            transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
            className="max-lg:!grid-cols-2 max-[767px]:!grid-cols-2 max-sm:!grid-cols-1"
          >
            {whySai.map((w, wi) => (
              <WhySaiCard key={w.num} w={w} wi={wi} />
            ))}
          </div>
        </div>
      </div>

      {/* ── BROCHURE CTA ── */}
      <div style={{ background: '#060A10', padding: '80px 64px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        className="max-md:!px-7 max-[767px]:!px-4"
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

      <CinematicFooter />
    </PageTransition>
  );
};

export default PartnersPage;
