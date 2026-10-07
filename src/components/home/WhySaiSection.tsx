import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import badge24 from '@/assets/optimized/badge-24.webp';
import hpmLogo from '@/assets/optimized/hpm-logo.webp';
import largestSellingBadge from '@/assets/optimized/badge-largest.webp';

/* ── SVG icons ── */
const IcoMachines = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="10" rx="2"/>
    <path d="M7 7V4h10v3M8 17v3M16 17v3"/>
  </svg>
);
const IcoUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IcoGlobe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IcoPin = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11z"/>
    <circle cx="12" cy="10" r="2.5"/>
  </svg>
);

type Tile = {
  icon: React.ReactNode;
  kicker: string;
  title: string;
  subtitle: string;
  accent: string;
  col: string;
  featured?: boolean;
  stat?: string; // large centered stat (optional alternate layout)
};

const BRAND = '#2E90FF';

const tiles: Tile[] = [
  {
    icon: <img src={badge24} alt="24 Years" loading="lazy" decoding="async" style={{ width: 24, height: 24, objectFit: 'contain' }} />,
    kicker: 'Legacy',
    title: '24+ Years',
    subtitle: '24+ years of industry continuity, machine trust, and client relationships.',
    accent: BRAND,
    col: 'span 3',
    stat: '24+',
  },
  {
    icon: <IcoMachines />,
    kicker: 'Scale',
    title: '4000+ Machines',
    subtitle: 'Installed across print, finishing, and packaging floors nationwide.',
    accent: BRAND,
    col: 'span 3',
    stat: '4K+',
  },
  {
    icon: <IcoUsers />,
    kicker: 'Trust',
    title: '2000+ Customers',
    subtitle: 'Built through long-term service, supply, and responsive support.',
    accent: BRAND,
    col: 'span 3',
    stat: '4K+',
  },
  {
    icon: <img src={largestSellingBadge} alt="Largest Selling" loading="lazy" decoding="async" style={{ width: 24, height: 24, objectFit: 'contain' }} />,
    kicker: 'Market Lead',
    title: 'Largest Distributor',
    subtitle: "India's #1 paper cutter distributor. 90% market share.",
    accent: BRAND,
    col: 'span 3',
  },
  {
    icon: <IcoGlobe />,
    kicker: 'Global Reach',
    title: '15+ Countries',
    subtitle: 'Sri Lanka, Nepal, UAE, Oman and key markets across Africa.',
    accent: BRAND,
    col: 'span 4',
    featured: true,
  },
  {
    icon: <img src={hpmLogo} alt="HPM" loading="lazy" decoding="async" style={{ height: 16, objectFit: 'contain' }} />,
    kicker: 'Exclusive',
    title: 'HPM Sole Agent',
    subtitle: 'Only authorized HPM source in India for machines, spares, and service.',
    accent: BRAND,
    col: 'span 4',
  },
  {
    icon: <IcoPin />,
    kicker: 'Foundation',
    title: 'Est. 2000',
    subtitle: 'Founded in Hyderabad. National offices + Kenya, Ethiopia, Sri Lanka.',
    accent: BRAND,
    col: 'span 4',
  },
];

function useReveal(threshold = 0.08) {
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

const TileCard = ({ item, delay, on }: { item: Tile; delay: number; on: boolean }) => {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015, transition: { type: 'spring', stiffness: 280, damping: 22 } }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 28 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        gridColumn: item.col,
        padding: item.featured ? '30px 26px' : '26px 24px',
        background: hov
          ? `linear-gradient(165deg, #ffffff 0%, ${item.accent}0A 100%)`
          : 'linear-gradient(165deg, #ffffff 0%, #F7F9FD 100%)',
        boxShadow: hov
          ? `0 30px 64px -18px rgba(10,20,40,0.22), 0 6px 16px -6px rgba(10,20,40,0.12), inset 0 1px 0 #fff`
          : '0 2px 4px rgba(10,20,40,0.04), 0 10px 26px -14px rgba(10,20,40,0.14), inset 0 1px 0 #fff',
        border: `1px solid ${hov ? `${item.accent}33` : 'rgba(13,20,33,0.08)'}`,
        transition: 'box-shadow 0.35s, background 0.3s, border-color 0.3s',
        cursor: 'default', overflow: 'hidden', position: 'relative',
        borderRadius: 14,
      }}
      className="max-lg:!col-span-full"
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 10, bottom: 10, width: 3,
        borderRadius: '0 3px 3px 0',
        background: `linear-gradient(180deg, ${item.accent}, ${item.accent}44)`,
        transform: hov ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }} />

      {/* Top shimmer line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${item.accent}, ${item.accent}66, transparent)`,
        transform: hov ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
      }} />

      {/* Diagonal shimmer on hover */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(115deg, transparent 30%, ${item.accent}07 50%, transparent 70%)`,
        transform: hov ? 'translateX(0%)' : 'translateX(-100%)',
        transition: 'transform 0.6s ease',
      }} />

      {/* Icon + kicker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, position: 'relative' }}>
        <motion.span
          animate={{ scale: hov ? 1.07 : 1 }}
          transition={{ type: 'spring', stiffness: 340, damping: 20 }}
          style={{
            color: item.accent,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 38, height: 38, flexShrink: 0,
            borderRadius: 11,
            background: hov ? `${item.accent}1A` : `${item.accent}0F`,
            border: `1px solid ${item.accent}22`,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
            transition: 'background 0.3s, border-color 0.3s',
          }}
        >
          {item.icon}
        </motion.span>
        <span style={{
          fontSize: 9.5, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: hov ? item.accent : `${item.accent}B0`,
          transition: 'color 0.25s',
        }}>
          {item.kicker}
        </span>
      </div>

      {/* Title */}
      <div style={{
        fontSize: item.featured ? 26 : 21,
        fontWeight: 800,
        letterSpacing: '-0.032em',
        color: '#070C16',
        marginBottom: 9, lineHeight: 1.08, position: 'relative',
        fontFamily: "'Manrope', sans-serif",
        transition: 'color 0.2s',
      }}>
        {item.title}
      </div>

      {/* Subtitle */}
      <div style={{
        fontSize: item.featured ? 13.5 : 13, lineHeight: 1.62,
        color: hov ? 'rgba(13,20,33,0.74)' : 'rgba(13,20,33,0.58)',
        transition: 'color 0.25s', position: 'relative',
      }}>
        {item.subtitle}
      </div>

      {/* Featured: globe dotted graphic */}
      {item.featured && (
        <div style={{
          position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
          opacity: hov ? 0.18 : 0.08, transition: 'opacity 0.4s', pointerEvents: 'none',
        }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" stroke={item.accent} strokeWidth="1" strokeDasharray="3 4"/>
            <circle cx="40" cy="40" r="24" stroke={item.accent} strokeWidth="0.8" strokeDasharray="2 5"/>
            <circle cx="40" cy="40" r="12" stroke={item.accent} strokeWidth="0.6"/>
            <line x1="4" y1="40" x2="76" y2="40" stroke={item.accent} strokeWidth="0.5"/>
            <line x1="40" y1="4" x2="40" y2="76" stroke={item.accent} strokeWidth="0.5"/>
          </svg>
        </div>
      )}
    </motion.div>
  );
};

const WhySaiSection = () => {
  const reveal = useReveal(0.06);

  return (
    <section style={{
      background: 'linear-gradient(180deg, #F6F9FE 0%, #EDF2FA 62%, #E6EDF8 100%)',
      padding: 'clamp(76px,8.5vw,128px) 0 clamp(76px,8vw,124px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* A crisp edge, not a fade. Fading dark over light produced a grey
          smear across the top of the band; a defined rule reads intentional. */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3, pointerEvents: 'none', zIndex: 3,
        background: 'linear-gradient(90deg, transparent, #2E90FF 22%, #1BD6F2 50%, #2E90FF 78%, transparent)',
        opacity: 0.85,
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: 3, left: 0, right: 0, height: 56, pointerEvents: 'none', zIndex: 1,
        background: 'linear-gradient(180deg, rgba(46,144,255,0.1), transparent)',
      }} />
      {/* Dot grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.06) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 8% 18%, rgba(59,130,246,0.08) 0%, transparent 30%), radial-gradient(circle at 90% 8%, rgba(59,130,246,0.05) 0%, transparent 22%)',
      }} />

      <div ref={reveal.ref} style={{ maxWidth: 1300, margin: '0 auto', padding: '0 56px', position: 'relative', zIndex: 2 }}
        className="max-md:!px-6 max-[767px]:!px-4"
      >
        {/* Header */}
        <div style={{
          marginBottom: 52,
          opacity: reveal.on ? 1 : 0,
          transform: reveal.on ? 'none' : 'translateY(24px)',
          transition: 'all 1.05s cubic-bezier(0.16,1,0.3,1)',
          display: 'grid', gridTemplateColumns: '1fr auto',
          gap: 32, alignItems: 'flex-end',
        }}
          className="max-lg:!grid-cols-1 max-lg:!gap-5"
        >
          <div>
            <div style={{
              fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#1565E0', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700,
            }}>
              <div style={{ width: 32, height: 2, borderRadius: 2, background: 'linear-gradient(90deg,#2E90FF,#1BD6F2)' }} />
              Why Sai Enterprises
            </div>

            <h2 style={{
              fontSize: 'clamp(38px,4.6vw,68px)', fontWeight: 800,
              lineHeight: 0.96, color: '#060A10', margin: '0 0 16px',
            }}>
              Trusted by scale.<br />
              <span style={{ color: '#1565E0', fontWeight: 600 }}>Backed by consistency.</span>
            </h2>

            <p style={{
              fontSize: 15.5, color: 'rgba(13,20,33,0.62)', lineHeight: 1.75, maxWidth: 560, margin: 0,
            }}>
              Built through 24+ years of dependable machines, responsive service and partnerships that keep growing.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }} className="max-[767px]:!w-full">
            <Link to="/contact" className="btn-primary max-[767px]:!flex-1 max-[767px]:!justify-center">
              Talk to Sales <span style={{ fontSize: 15 }}>→</span>
            </Link>
            <Link to="/about" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, padding: '14px 26px',
              border: '1px solid rgba(13,20,33,0.12)',
              borderRadius: 999,
              color: '#070C16', textDecoration: 'none',
              fontSize: 11.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              background: '#fff',
              boxShadow: '0 1px 2px rgba(10,20,40,0.06), 0 6px 16px -10px rgba(10,20,40,0.2)',
              transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
            }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#2E90FF'; el.style.color = '#1565E0'; el.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(13,20,33,0.12)'; el.style.color = '#070C16'; el.style.transform = 'translateY(0)'; }}
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Mosaic grid, 12 col */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 6,
        }} className="max-lg:!grid-cols-1 max-lg:!gap-2">
          {tiles.map((item, index) => (
            <TileCard key={item.title} item={item} delay={0.04 + index * 0.05} on={reveal.on} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySaiSection;
