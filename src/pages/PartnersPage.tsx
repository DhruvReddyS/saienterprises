import { useEffect, useRef, useState } from 'react';
import { setPageMeta } from '@/lib/seo';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import PageTransition from '@/components/PageTransition';
import { BorderBeam } from '@/components/ui/border-beam';
import { GlowCard } from '@/components/ui/spotlight-card';
import hpmLogo from '@/assets/optimized/hpm-logo.webp';
import saiLogo from '@/assets/sai-logo-cmyk.png';
import largestSellingBadge from '@/assets/optimized/badge-largest.webp';
import { getMachineImage } from '@/data/machineAssets';
import BrandImage from '@/components/BrandImage';
import PlugConnectedIcon from '@/components/ui/icons/plug-connected-icon';
import WrenchIcon from '@/components/ui/icons/wrench-icon';
import PackageIcon from '@/components/ui/icons/package-icon';
import RulerIcon from '@/components/ui/icons/ruler-icon';

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

function useCounter(target: number, started: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 70;
    const timer = setInterval(() => {
      frame++;
      const eased = 1 - Math.pow(1 - frame / total, 3);
      setVal(Math.round(target * eased));
      if (frame >= total) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, [started, target]);
  return val;
}

/* ── data ── */
const hpmHistory = [
  { year: '1983', event: 'Paper cutter manufacturing begins', detail: 'Rui\'an Longshan General Machinery Factory starts producing paper cutters, the seed of what HPM becomes.' },
  { year: '1997', event: 'Huayue identity formed', detail: 'Business evolves into Ruian Huayue Packaging Machinery. The HPM brand name is established with a tightened focus on cutting systems.' },
  { year: '2000', event: 'Sai becomes sole India agent', detail: 'Sai Enterprises, founded in Hyderabad, secures the exclusive HPM distribution and service mandate for India from day one.' },
  { year: '2005+', event: 'Programmable cutters advanced', detail: 'The HPM line expands into fully hydraulic and program-controlled cutter systems, bringing precision and automation to production floors.' },
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

const WHY_SAI_ICONS = [PlugConnectedIcon, WrenchIcon, PackageIcon, RulerIcon];
const WHY_SAI_ACCENTS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

/* ── Why Sai Card ── */
const WhySaiCard = ({ w, wi, on }: { w: typeof whySai[0]; wi: number; on: boolean }) => {
  const [hov, setHov] = useState(false);
  const Icon = WHY_SAI_ICONS[wi];
  const accent = WHY_SAI_ACCENTS[wi];
  const iconRef = useRef<{ startAnimation: () => void; stopAnimation: () => void }>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={on ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: wi * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { setHov(true); iconRef.current?.startAnimation(); }}
      onMouseLeave={() => { setHov(false); iconRef.current?.stopAnimation(); }}
      style={{
        background: hov ? '#FFFFFF' : '#F0F4FF',
        border: `1px solid ${hov ? `${accent}35` : 'rgba(0,0,0,0.07)'}`,
        padding: 'clamp(28px,4vw,48px)',
        display: 'flex', flexDirection: 'column', gap: 20,
        cursor: 'default', position: 'relative', overflow: 'hidden',
        transition: 'background 0.4s ease, border-color 0.4s ease',
        boxShadow: hov ? `0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px ${accent}20` : '0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      {/* Ghost number watermark */}
      <div style={{
        position: 'absolute', top: -16, right: 20,
        fontFamily: "'Manrope', sans-serif",
        fontSize: 120, fontWeight: 700, lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: `1px ${accent}22`,
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {w.num}
      </div>

      {/* Accent line top */}
      <motion.div
        animate={hov ? { scaleX: 1 } : { scaleX: 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(to right, ${accent}, transparent)`,
          transformOrigin: 'left',
        }}
      />

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 12,
        background: `${accent}12`,
        border: `1px solid ${accent}28`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        <Icon
          ref={iconRef}
          size={24}
          color={accent}
          strokeWidth={1.8}
        />
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
        <div style={{
          fontFamily: "'Manrope', sans-serif", fontSize: 15, fontWeight: 700,
          color: '#060A10', lineHeight: 1.3, letterSpacing: '-0.01em',
        }}>
          {w.title}
        </div>
        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: 13.5,
          color: 'rgba(6,10,16,0.52)', lineHeight: 1.8, margin: 0,
        }}>
          {w.desc}
        </p>
      </div>

      {/* Bottom accent tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}80` }} />
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, fontWeight: 700 }}>
          {['Authorized Dealer', 'Full Support', 'Stock Ready', 'Free Sizing'][wi]}
        </span>
      </div>
    </motion.div>
  );
};

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
        background: hov
          ? 'linear-gradient(180deg, #0D1A2D 0%, #070C14 100%)'
          : 'linear-gradient(180deg, #0A101B 0%, #05080D 100%)',
        border: `1px solid ${hov ? 'rgba(96,165,250,0.32)' : 'rgba(255,255,255,0.08)'}`,
        overflow: 'visible',
        cursor: 'default',
        transition: 'background 0.4s ease, border-color 0.4s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: hov ? '0 28px 70px rgba(0,0,0,0.28)' : 'none',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Image */}
      <div style={{
        background: 'radial-gradient(circle at 50% 38%, rgba(96,165,250,0.16), transparent 58%), linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))',
        height: 235,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        overflow: 'hidden',
        position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          position: 'absolute',
          inset: 18,
          border: '1px solid rgba(255,255,255,0.055)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          right: 18,
          bottom: 12,
          fontFamily: "'Manrope', sans-serif",
          fontSize: 46,
          fontWeight: 900,
          letterSpacing: '-0.08em',
          lineHeight: 1,
          color: 'rgba(255,255,255,0.035)',
          pointerEvents: 'none',
        }}>
          {String(i + 1).padStart(2, '0')}
        </div>
        {p.image ? (
          <img src={p.image} alt={p.name} loading="lazy" decoding="async" style={{
            maxWidth: '100%', maxHeight: 176, objectFit: 'contain',
            filter: 'drop-shadow(0 18px 34px rgba(0,0,0,0.56))',
            transform: hov ? 'scale(1.07) translateY(-7px)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
            position: 'relative',
            zIndex: 1,
          }} />
        ) : (
          <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, color: 'rgba(255,255,255,0.1)' }}>{p.name}</div>
        )}
        {/* Badges */}
        <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', gap: 6, zIndex: 2, flexWrap: 'wrap' }}>
          <div style={{
            background: '#3B82F6', border: '1px solid rgba(96,165,250,0.35)',
            padding: '5px 9px',
            fontFamily: "'Manrope', sans-serif", fontSize: 7.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff',
            fontWeight: 800,
          }}>
            {p.code}
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            padding: '5px 9px',
            fontFamily: "'Manrope', sans-serif", fontSize: 7.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
            fontWeight: 800,
          }}>
            {(p as typeof hpmProducts[0]).category}
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '28px 28px 26px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h3 style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(21px,2vw,25px)', fontWeight: 800, color: '#fff', lineHeight: 1.14, letterSpacing: '-0.025em',
          overflowWrap: 'anywhere',
        }}>
          {p.name}
        </h3>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
          {p.desc}
        </p>

        {/* Specs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))',
          gap: 8,
          paddingTop: 8,
          marginTop: 'auto',
        }}>
          {p.specs.map((s) => (
            <div key={s.k} style={{
              padding: '11px 10px',
              background: 'rgba(255,255,255,0.045)',
              border: '1px solid rgba(255,255,255,0.07)',
              minHeight: 64,
            }}>
              <span style={{ display: 'block', fontFamily: "'Manrope', sans-serif", fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(96,165,250,0.78)', fontWeight: 800 }}>{s.k}</span>
              <span style={{ display: 'block', marginTop: 8, fontFamily: "'Manrope', sans-serif", fontSize: 11.5, color: 'rgba(255,255,255,0.86)', fontWeight: 800, lineHeight: 1.25, overflowWrap: 'anywhere' }}>{s.v}</span>
            </div>
          ))}
        </div>
        <Link
          to={`/contact?machine=${encodeURIComponent(p.name)}&category=${encodeURIComponent(p.category)}`}
          style={{
            marginTop: 10,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            padding: '13px 0 0',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            color: hov ? '#93C5FD' : 'rgba(255,255,255,0.56)',
            textDecoration: 'none',
            fontFamily: "'Manrope', sans-serif",
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 900,
            transition: 'color 0.25s',
          }}
        >
          Contact Us <span>→</span>
        </Link>
      </div>
    </motion.div>
  );
};


const HPM_CATS = ['All', 'Paper Cutters', 'Handling', 'Finishing'] as const;
type HpmCat = typeof HPM_CATS[number];

/* ── main ── */
const PartnersPage = () => {
  const [activeHistoryIdx, setActiveHistoryIdx] = useState(0);
  const [activeCat, setActiveCat] = useState<HpmCat>('All');
  const saiHpmReveal = useReveal(0.12);
  const [proofOn, setProofOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setProofOn(true), 700); return () => clearTimeout(t); }, []);
  const pCount90 = useCounter(90, proofOn);
  const pCount490 = useCounter(490, proofOn);

  useEffect(() => {
    setPageMeta(
      'Machinery Partners & Brands | Sai Enterprises',
      'Explore Sai Enterprises machinery partners and brands, including HPM paper cutters, Heidelberg, Komori and global print-finishing manufacturers.',
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
        background: '#060A10', position: 'relative', overflow: 'hidden',
        minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      }}>
        {/* Fine grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Centre radial glow */}
        <div style={{
          position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '80vw', height: '60vw', maxWidth: 1100, maxHeight: 700,
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.09) 0%, transparent 65%)',
          pointerEvents: 'none', filter: 'blur(60px)',
        }} />

        {/* Ghost "HPM" watermark, right-bleed */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', right: '-4%', top: '50%', transform: 'translateY(-52%)',
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(200px,28vw,440px)', fontWeight: 700, fontStyle: 'italic',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(59,130,246,0.11)',
            pointerEvents: 'none', zIndex: 1,
            letterSpacing: '-0.04em', lineHeight: 1,
            userSelect: 'none',
          }}
        >HPM</motion.div>

        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.55) 45%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1300, margin: '0 auto', width: '100%', padding: '160px 80px 60px' }}
            className="max-lg:!px-10 max-lg:!pt-36 max-md:!px-6 max-md:!pt-28 max-[767px]:!pt-10 max-[767px]:!px-5"
          >
            {/* Eyebrow, HPM logo + tag */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40, flexWrap: 'wrap' }}
            >
              <BrandImage src={hpmLogo} alt="HPM" style={{ height: 36, opacity: 0.98 }} />
              <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.12)' }} />
              <div style={{
                fontFamily: "'Manrope', sans-serif", fontSize: 9, letterSpacing: '0.32em',
                textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#3B82F6' }} />
                Exclusive India Partner Since 2000
              </div>
            </motion.div>

            {/* Headline + badge, side by side */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 32, marginBottom: 40 }}
              className="max-lg:!flex-col max-lg:!gap-6"
            >
              {/* Staggered headline */}
              <div style={{ flex: '1 1 auto' }}>
                {[
                  { text: 'The only authorized', size: 'clamp(22px,4.2vw,62px)', weight: 300, color: 'rgba(255,255,255,0.38)', italic: true, delay: 0.08 },
                  { text: 'HPM source', size: 'clamp(42px,8.5vw,130px)', weight: 700, color: '#fff', italic: false, delay: 0.16 },
                  { text: 'in India.', size: 'clamp(32px,6.5vw,98px)', weight: 600, color: '#3B82F6', italic: false, delay: 0.24 },
                ].map((line) => (
                  <motion.div
                    key={line.text}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.1, delay: line.delay, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: line.size, fontWeight: line.weight, color: line.color,
                      fontStyle: line.italic ? 'italic' : 'normal',
                      lineHeight: 1.0, letterSpacing: '-0.03em', display: 'block',
                    }}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </div>

              {/* Large badge, right of title */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ flexShrink: 0, display: 'flex', alignItems: 'center', paddingTop: 8 }}
              >
                <img
                  src={largestSellingBadge}
                  alt="India's Largest Paper Cutter Distributor"
                  loading="lazy" decoding="async"
                  style={{ height: 'clamp(100px,12vw,160px)', width: 'auto', objectFit: 'contain', opacity: 0.92 }}
                />
              </motion.div>
            </div>

            {/* Sub copy + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', marginBottom: 80 }}
              className="max-[767px]:!mb-10"
            >
              <p style={{
                fontFamily: "'Manrope', sans-serif", fontSize: 14, fontWeight: 300,
                color: 'rgba(255,255,255,0.4)', lineHeight: 1.85,
                maxWidth: 420, margin: 0,
              }}>
                Selection, import, installation, spares, and service, Sai is the sole authorised HPM path for every Indian print floor.
              </p>
              <Link to="/contact?ref=hpm" style={{
                fontFamily: "'Manrope', sans-serif", fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
                padding: '13px 30px', background: '#3B82F6', color: '#fff',
                textDecoration: 'none', transition: 'background 0.2s', flexShrink: 0,
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
              >
                Enquire About HPM →
              </Link>
            </motion.div>

            {/* Proof strip, 4 highlighted cards */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}
              className="max-[767px]:!grid-cols-2"
            >
              {[
                { primary: 'Since', primary2: '2000', label: 'Exclusive India Agent', accent: '#3B82F6', ghost: '2000', isText: true },
                { primary: "India's", primary2: '#1', label: 'Paper Cutter Distributor', accent: '#FACC15', ghost: '#1', isText: true },
                { primary: null, counter: pCount90, suffix: '%', label: 'Fully Automatic Cutter Share', accent: '#10B981', ghost: '90%', isText: false },
                { primary: null, counter: pCount490, suffix: '+', label: 'HPM Cutters Placed', accent: '#6366F1', ghost: '490', isText: false },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: 'clamp(18px,2.5vw,28px) clamp(14px,2vw,24px)',
                    background: `${s.accent}0A`,
                    border: `1px solid ${s.accent}22`,
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* Top accent bar, animated */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: proofOn ? 1 : 0 }}
                    transition={{ duration: 1.1, delay: 0.8 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(90deg, ${s.accent}, ${s.accent}50, transparent)`,
                      transformOrigin: 'left',
                    }}
                  />
                  {/* Ghost value, watermark */}
                  <div style={{
                    position: 'absolute', bottom: -10, right: -4,
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 'clamp(52px,8vw,100px)', fontWeight: 700,
                    color: 'transparent', WebkitTextStroke: `1px ${s.accent}18`,
                    lineHeight: 1, letterSpacing: '-0.03em',
                    pointerEvents: 'none', userSelect: 'none', zIndex: 0,
                    opacity: proofOn ? 1 : 0, transition: 'opacity 1.2s ease 0.5s',
                  }}>{s.ghost}</div>

                  {/* Primary value */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {s.isText ? (
                      <div style={{ lineHeight: 1, marginBottom: 8 }}>
                        <div style={{
                          fontFamily: "'Manrope', sans-serif", fontSize: 9, letterSpacing: '0.2em',
                          textTransform: 'uppercase', color: `${s.accent}CC`, fontWeight: 700, marginBottom: 3,
                        }}>{s.primary}</div>
                        <div style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: 'clamp(30px,4vw,52px)', fontWeight: 700,
                          color: '#fff', letterSpacing: '-0.03em', lineHeight: 1,
                          textShadow: `0 0 32px ${s.accent}55`,
                        }}>{s.primary2}</div>
                      </div>
                    ) : (
                      <div style={{ lineHeight: 1, marginBottom: 8, display: 'inline-flex', alignItems: 'baseline', gap: 2 }}>
                        <span style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: 'clamp(36px,5vw,62px)', fontWeight: 700,
                          color: '#fff', letterSpacing: '-0.04em',
                          textShadow: `0 0 40px ${s.accent}65, 0 0 8px ${s.accent}35`,
                        }}>{s.counter}</span>
                        <span style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: 'clamp(20px,2.8vw,34px)', fontWeight: 600,
                          color: s.accent, textShadow: `0 0 18px ${s.accent}80`,
                        }}>{s.suffix}</span>
                      </div>
                    )}
                    {/* Underline */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: proofOn ? 1 : 0 }}
                      transition={{ duration: 0.8, delay: 1.0 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        height: 1.5, width: '55%', marginBottom: 10,
                        background: `linear-gradient(90deg, ${s.accent}90, transparent)`,
                        transformOrigin: 'left',
                      }}
                    />
                    <div style={{
                      fontFamily: "'Manrope', sans-serif", fontSize: 8, letterSpacing: '0.22em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', fontWeight: 700,
                    }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(to bottom, transparent, #060A10)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── HISTORY TIMELINE, light / dark alternation ── */}
      <div style={{ background: '#F5F8FF', borderTop: '1px solid rgba(13,20,33,0.08)', padding: 'clamp(56px,8vw,110px) 0' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }} className="max-md:!px-7 max-[767px]:!px-4">
          <div style={{ marginBottom: 60 }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
              HPM History
            </div>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(34px,4.8vw,68px)', fontWeight: 800, color: '#060A10', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
              A precision timeline,<br />
              <span style={{ color: '#3B82F6', fontStyle: 'italic', fontWeight: 500 }}>built for print floors.</span>
            </h2>
          </div>

          {/* HPM archive timeline */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(145deg, #FFFFFF 0%, #EEF5FF 52%, #F8FBFF 100%)',
            border: '1px solid rgba(59,130,246,0.16)',
            boxShadow: '0 34px 110px rgba(13,20,33,0.10), inset 0 1px 0 rgba(255,255,255,0.88)',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 78% 28%, rgba(59,130,246,0.13) 0%, transparent 42%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              right: -30,
              top: -30,
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(76px,10vw,140px)',
              fontWeight: 800,
              fontStyle: 'italic',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(59,130,246,0.11)',
              lineHeight: 1,
              pointerEvents: 'none',
            }}>
              HPM
            </div>
            <div style={{
              position: 'absolute',
              left: 34,
              bottom: 34,
              width: 170,
              height: 170,
              border: '1px solid rgba(59,130,246,0.12)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              left: 76,
              bottom: 76,
              width: 104,
              height: 104,
              border: '1px solid rgba(59,130,246,0.16)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(26px,4vw,48px)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
                marginBottom: 28,
                flexWrap: 'wrap',
              }}>
                <BrandImage src={hpmLogo} alt="HPM" style={{ height: 30 }} />
                <div style={{
                  flex: '1 1 220px',
                  maxWidth: 420,
                  height: 2,
                  background: 'rgba(13,20,33,0.08)',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    animate={{ width: `${((activeHistoryIdx + 1) / hpmHistory.length) * 100}%` }}
                    transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #2563EB, #60A5FA)',
                    }}
                  />
                </div>
                <div style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(13,20,33,0.42)',
                  fontWeight: 900,
                }}>
                  {String(activeHistoryIdx + 1).padStart(2, '0')} / {String(hpmHistory.length).padStart(2, '0')}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(230px, 0.42fr) minmax(0, 1.1fr) minmax(250px, 0.62fr)',
                gap: 'clamp(18px,2.4vw,30px)',
                alignItems: 'stretch',
              }} className="max-xl:!grid-cols-[260px_1fr] max-lg:!grid-cols-1">
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  paddingLeft: 18,
                }}>
                  <div style={{
                    position: 'absolute',
                    left: 1,
                    top: 18,
                    bottom: 18,
                    width: 1,
                    background: 'linear-gradient(to bottom, rgba(59,130,246,0.28), rgba(13,20,33,0.06))',
                  }} />
                  {hpmHistory.map((h, i) => {
                    const active = activeHistoryIdx === i;
                    return (
                      <motion.button
                        key={h.year}
                        type="button"
                        onClick={() => setActiveHistoryIdx(i)}
                        whileHover={{ x: 6 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '14px 16px',
                          background: active ? '#060A10' : 'rgba(255,255,255,0.72)',
                          color: active ? '#fff' : '#060A10',
                          boxShadow: active ? '0 18px 44px rgba(6,10,16,0.18)' : '0 12px 30px rgba(13,20,33,0.045)',
                          transition: 'background 0.25s, color 0.25s, box-shadow 0.25s',
                          position: 'relative',
                          overflow: 'visible',
                        }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: -24,
                          top: 25,
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: active ? '#3B82F6' : '#D8E6FF',
                          border: '2px solid #F5F8FF',
                          boxShadow: active ? '0 0 0 6px rgba(59,130,246,0.12)' : 'none',
                        }} />
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 3,
                          background: active ? '#3B82F6' : 'rgba(59,130,246,0.18)',
                        }} />
                        <span style={{
                          display: 'block',
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: 20,
                          fontWeight: 900,
                          color: active ? '#60A5FA' : '#2563EB',
                          lineHeight: 1,
                          marginBottom: 8,
                        }}>
                          {h.year}
                        </span>
                        <span style={{
                          display: 'block',
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: 11,
                          fontWeight: 800,
                          lineHeight: 1.35,
                          color: active ? 'rgba(255,255,255,0.78)' : 'rgba(13,20,33,0.54)',
                          overflowWrap: 'anywhere',
                        }}>
                          {h.event}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHistoryIdx}
                    initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'relative',
                      minHeight: 360,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(239,246,255,0.84))',
                      border: '1px solid rgba(59,130,246,0.16)',
                      boxShadow: '0 22px 70px rgba(13,20,33,0.09)',
                      padding: 'clamp(26px,4vw,50px)',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 5,
                      background: 'linear-gradient(to bottom, #3B82F6, #60A5FA, transparent)',
                    }} />
                    <BrandImage src={hpmLogo} alt="HPM" style={{ position: 'absolute', right: 28, top: 28, height: 26, opacity: 0.9 }} />
                    <div style={{
                      position: 'absolute',
                      right: 16,
                      bottom: -8,
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 'clamp(54px,7vw,96px)',
                      fontWeight: 900,
                      color: 'rgba(59,130,246,0.09)',
                      lineHeight: 1,
                      letterSpacing: '-0.05em',
                    }}>
                      {hpmHistory[activeHistoryIdx].year}
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 'clamp(48px,8vw,92px)',
                        fontWeight: 900,
                        letterSpacing: '-0.08em',
                        lineHeight: 0.9,
                        color: '#060A10',
                        marginBottom: 24,
                      }}>
                        {hpmHistory[activeHistoryIdx].year}
                      </div>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '8px 12px',
                        borderRadius: 999,
                        background: 'rgba(59,130,246,0.08)',
                        border: '1px solid rgba(59,130,246,0.18)',
                        color: '#2563EB',
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 9,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        fontWeight: 800,
                        marginBottom: 22,
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 12px #60A5FA' }} />
                        HPM Evolution
                      </div>
                      <h3 style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 'clamp(25px,3.1vw,38px)',
                        fontWeight: 800,
                        color: '#060A10',
                        lineHeight: 1.12,
                        letterSpacing: '-0.03em',
                        marginBottom: 18,
                        maxWidth: 620,
                        overflowWrap: 'anywhere',
                      }}>
                        {hpmHistory[activeHistoryIdx].event}
                      </h3>
                      <p style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 14,
                        color: 'rgba(13,20,33,0.58)',
                        lineHeight: 1.75,
                        maxWidth: 540,
                      }}>
                        {hpmHistory[activeHistoryIdx].detail}
                      </p>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: 10,
                        marginTop: 28,
                        maxWidth: 560,
                      }} className="max-sm:!grid-cols-1">
                        {[
                          ['Focus', activeHistoryIdx < 2 ? 'Manufacturing' : activeHistoryIdx === 2 ? 'India agency' : 'Automation'],
                          ['Impact', activeHistoryIdx === 2 ? 'Sai + HPM' : 'Precision systems'],
                          ['Stage', hpmHistory[activeHistoryIdx].year],
                        ].map(([k, v]) => (
                          <div key={k} style={{
                            padding: '13px 14px',
                            background: 'rgba(59,130,246,0.055)',
                            border: '1px solid rgba(59,130,246,0.12)',
                          }}>
                            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#2563EB', fontWeight: 900 }}>{k}</div>
                            <div style={{ marginTop: 6, fontFamily: "'Manrope', sans-serif", fontSize: 12, color: '#060A10', fontWeight: 800 }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      {hpmHistory[activeHistoryIdx].year === '2000' && (
                        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
                          <BrandImage src={saiLogo} alt="Sai Enterprises" style={{ height: 22, opacity: 0.78 }} />
                          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2563EB', fontWeight: 800 }}>× HPM Partnership</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeHistoryIdx}-visual`}
                    initial={{ opacity: 0, scale: 0.96, x: 18 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.96, x: -18 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      minHeight: 360,
                      position: 'relative',
                      overflow: 'hidden',
                      background: '#060A10',
                      border: '1px solid rgba(13,20,33,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className="max-xl:!hidden"
                  >
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at 50% 45%, rgba(59,130,246,0.20), transparent 58%)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      inset: 18,
                      border: '1px solid rgba(255,255,255,0.08)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      right: 20,
                      top: 18,
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      fontWeight: 900,
                      color: '#60A5FA',
                    }}>
                      {hpmProducts[activeHistoryIdx % hpmProducts.length].code}
                    </div>
                    <img
                      src={hpmProducts[activeHistoryIdx % hpmProducts.length].image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{
                        position: 'relative',
                        width: '86%',
                        height: '76%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 28px 50px rgba(0,0,0,0.45))',
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      left: 22,
                      bottom: 20,
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 9,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      fontWeight: 800,
                      color: 'rgba(255,255,255,0.46)',
                    }}>
                      HPM archive visual
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── HPM MACHINE RANGE, filtered grid ── */}
      <div style={{
        background: 'linear-gradient(180deg, #060A10 0%, #08111F 54%, #060A10 100%)',
        padding: '100px 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
          backgroundSize: '58px 58px',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 1 }} className="max-md:!px-7 max-[767px]:!px-4">
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
              HPM Machine Range
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(36px,5vw,68px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.045em', lineHeight: 0.95, margin: 0 }}>
                Built around the cut.
              </h2>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 380, margin: 0 }}>
                Paper cutters, handling systems, and finishing support, curated for production floors that need speed, accuracy and uptime.
              </p>
            </div>
          </div>

          {/* Category filter tabs */}
          <div style={{
            display: 'inline-flex',
            gap: 6,
            marginBottom: 40,
            flexWrap: 'wrap',
            padding: 6,
            background: 'rgba(255,255,255,0.045)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {HPM_CATS.map((cat) => {
              const count = cat === 'All' ? hpmProducts.length : hpmProducts.filter((p) => p.category === cat).length;
              const isActive = activeCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700,
                    padding: '11px 22px',
                    background: isActive ? '#3B82F6' : 'transparent',
                    border: `1px solid ${isActive ? '#3B82F6' : 'transparent'}`,
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
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, background: 'transparent' }}
              className="max-lg:!grid-cols-2 max-[767px]:!grid-cols-1 max-sm:!grid-cols-1"
            >
              {filteredProducts.map((p, i) => (
                <ProductCard key={p.name} p={p} i={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── WHY SAI FOR HPM, light theme cards ── */}
      <div ref={saiHpmReveal.ref} style={{ background: '#F8FAFC', padding: 'clamp(64px,8vw,100px) 0', borderTop: '1px solid rgba(0,0,0,0.07)', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '15%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(20px,5vw,64px)', position: 'relative', zIndex: 1 }}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={saiHpmReveal.on ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(40px,6vw,72px)', flexWrap: 'wrap', gap: 24 }}
          >
            <div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 1, background: '#2563EB' }} />
                Why Buy HPM Through Sai
              </div>
              <h2 style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 600, lineHeight: 0.95,
                color: '#060A10', letterSpacing: '-0.025em', margin: 0,
              }}>
                Authorized. Accountable.<br />
                <span style={{ color: '#2563EB', fontStyle: 'italic', fontWeight: 300 }}>The only source you need.</span>
              </h2>
            </div>
            <Link to="/contact?ref=hpm" style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
              padding: '13px 28px', background: '#3B82F6', color: '#fff',
              textDecoration: 'none', transition: 'background 0.2s', whiteSpace: 'nowrap', alignSelf: 'flex-end',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
            >
              Enquire About HPM →
            </Link>
          </motion.div>

          {/* 2×2 animated cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }} className="max-[767px]:!grid-cols-1">
            {whySai.map((w, wi) => (
              <WhySaiCard key={w.num} w={w} wi={wi} on={saiHpmReveal.on} />
            ))}
          </div>
        </div>
      </div>

      {/* ── BROCHURE CTA ── */}
      <div style={{ background: '#060A10', padding: '80px 64px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        className="max-md:!px-7 max-[767px]:!px-4 max-[767px]:!py-12"
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 36 }}>
            Need HPM pricing or sizing guidance?
          </h2>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact?ref=hpm" style={{
              fontFamily: "'Manrope', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
              padding: '13px 28px', background: '#3B82F6', color: '#fff', textDecoration: 'none', transition: 'background 0.2s',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
            >
              Contact for HPM →
            </Link>
            <Link to="/brochure" style={{
              fontFamily: "'Manrope', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
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
