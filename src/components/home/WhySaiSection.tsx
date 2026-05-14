import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import badge24 from '@/assets/24-years-badge.png';
import hpmLogo from '@/assets/hpm-logo.png';
import largestSellingBadge from '@/assets/largest-selling-badge.png';

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

const tiles: Tile[] = [
  {
    icon: <img src={badge24} alt="24 Years" loading="lazy" decoding="async" style={{ width: 24, height: 24, objectFit: 'contain' }} />,
    kicker: 'Legacy',
    title: '24+ Years',
    subtitle: '24+ years of industry continuity, machine trust, and client relationships.',
    accent: '#2563EB',
    col: 'span 3',
    stat: '24+',
  },
  {
    icon: <IcoMachines />,
    kicker: 'Scale',
    title: '4000+ Machines',
    subtitle: 'Installed across print, finishing, and packaging floors nationwide.',
    accent: '#3B82F6',
    col: 'span 3',
    stat: '4K+',
  },
  {
    icon: <IcoUsers />,
    kicker: 'Trust',
    title: '2000+ Customers',
    subtitle: 'Built through long-term service, supply, and responsive support.',
    accent: '#0EA5E9',
    col: 'span 3',
    stat: '4K+',
  },
  {
    icon: <img src={largestSellingBadge} alt="Largest Selling" loading="lazy" decoding="async" style={{ width: 24, height: 24, objectFit: 'contain' }} />,
    kicker: 'Market Lead',
    title: 'Largest Distributor',
    subtitle: "India's #1 paper cutter distributor. 90% market share.",
    accent: '#F59E0B',
    col: 'span 3',
  },
  {
    icon: <IcoGlobe />,
    kicker: 'Global Reach',
    title: '15+ Countries',
    subtitle: 'Sri Lanka, Nepal, UAE, Oman and across Africa. Export-ready from Hyderabad.',
    accent: '#22C55E',
    col: 'span 5',
    featured: true,
  },
  {
    icon: <img src={hpmLogo} alt="HPM" loading="lazy" decoding="async" style={{ height: 16, objectFit: 'contain' }} />,
    kicker: 'Exclusive',
    title: 'HPM Sole Agent',
    subtitle: 'Only authorized HPM source in India for machines, spares, and service.',
    accent: '#EF4444',
    col: 'span 4',
  },
  {
    icon: <IcoPin />,
    kicker: 'Foundation',
    title: 'Est. 2000',
    subtitle: 'Founded in Hyderabad. National offices + Kenya, Ethiopia, Sri Lanka.',
    accent: '#8B5CF6',
    col: 'span 3',
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
        padding: item.featured ? '36px 32px' : '28px 24px',
        background: hov
          ? `linear-gradient(135deg, #fff 0%, ${item.accent}06 100%)`
          : 'rgba(255,255,255,0.97)',
        boxShadow: hov
          ? `0 28px 64px rgba(15,23,42,0.14), 0 0 0 1.5px ${item.accent}35, inset 0 1px 0 rgba(255,255,255,0.9)`
          : '0 2px 16px rgba(15,23,42,0.06)',
        border: `1px solid ${hov ? `${item.accent}20` : 'rgba(13,20,33,0.07)'}`,
        transition: 'box-shadow 0.35s, background 0.3s, border-color 0.3s',
        cursor: 'default', overflow: 'hidden', position: 'relative',
        borderRadius: 2,
      }}
      className="max-lg:!col-span-full"
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
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
          animate={{ scale: hov ? 1.18 : 1, rotate: hov ? 8 : 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 20 }}
          style={{ color: item.accent, display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          {item.icon}
        </motion.span>
        <span style={{
          fontSize: 8, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase',
          color: hov ? item.accent : `${item.accent}99`,
          transition: 'color 0.25s',
        }}>
          {item.kicker}
        </span>
      </div>

      {/* Title */}
      <div style={{
        fontSize: item.featured ? 24 : 19,
        fontWeight: 800,
        letterSpacing: '-0.025em',
        color: hov ? '#040810' : '#080E18',
        marginBottom: 10, lineHeight: 1.1, position: 'relative',
        fontFamily: "'Cormorant Garamond', serif",
        transition: 'color 0.2s',
      }}>
        {item.title}
      </div>

      {/* Subtitle */}
      <div style={{
        fontSize: item.featured ? 13.5 : 12.5, lineHeight: 1.68,
        color: hov ? 'rgba(13,20,33,0.6)' : 'rgba(13,20,33,0.42)',
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
      background: 'linear-gradient(180deg, #F4F8FE 0%, #ECF2FB 100%)',
      padding: 'clamp(60px,8vw,120px) 0 clamp(56px,7vw,112px)',
      position: 'relative', overflow: 'hidden',
    }}>
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

      <div ref={reveal.ref} style={{ maxWidth: 1300, margin: '0 auto', padding: '0 56px', position: 'relative' }}
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
              color: '#2563EB', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700,
            }}>
              <div style={{ width: 32, height: 1, background: '#2563EB' }} />
              Why Sai Enterprises
            </div>

            <h2 style={{
              fontSize: 'clamp(38px,4.6vw,68px)', fontWeight: 800,
              lineHeight: 0.96, color: '#060A10', margin: '0 0 16px',
            }}>
              Trusted by scale.<br />
              <span style={{ color: '#2563EB', fontWeight: 600 }}>Backed by consistency.</span>
            </h2>

            <p style={{
              fontSize: 15, color: 'rgba(13,20,33,0.52)', lineHeight: 1.8, maxWidth: 560, margin: 0,
            }}>
              Market continuity, installed volume, client confidence, global reach, and brand authority — in one clear proof grid.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }} className="max-[767px]:!w-full">
            <Link to="/contact" className="btn-primary max-[767px]:!flex-1 max-[767px]:!justify-center">
              Talk to Sales <span style={{ fontSize: 15 }}>→</span>
            </Link>
            <Link to="/about" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, padding: '13px 24px',
              border: '1px solid rgba(13,20,33,0.14)',
              color: '#060A10', textDecoration: 'none',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
              background: '#fff',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#2563EB'; el.style.color = '#2563EB'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(13,20,33,0.14)'; el.style.color = '#060A10'; }}
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Mosaic grid — 12 col */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 10,
        }} className="max-lg:!grid-cols-1 max-lg:!gap-3">
          {tiles.map((item, index) => (
            <TileCard key={item.title} item={item} delay={0.04 + index * 0.05} on={reveal.on} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySaiSection;
