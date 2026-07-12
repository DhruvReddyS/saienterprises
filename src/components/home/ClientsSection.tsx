import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import logoAnyGraphics from '@/assets/company logos/client-any-graphics.jpg';
import logoCanpac      from '@/assets/company logos/client-canpac.jpg';
import logoCDC         from '@/assets/company logos/client-cdc-printers.jpg';
import logoNAP         from '@/assets/company logos/client-nap-kolkata.jpg';
import logoParksons    from '@/assets/company logos/client-parksons.jpg';
import logoReplika     from '@/assets/company logos/client-replika.jpg';
import logoVSHitech    from '@/assets/company logos/client-vs-hitech.jpg';
import logoVikas       from '@/assets/company logos/client-vikas-nasik.jpg';
import logoPragati     from '@/assets/company logos/client-pragati.png';
import logoKalaJyothi  from '@/assets/company logos/client-kala-jyothi.png';
import logoHitech      from '@/assets/company logos/client-hitech.png';

interface Client {
  name: string;
  city: string;
  initials: string;
  color: string;
  logo?: string;
  category: string;
  since: string;
}

const CLIENTS: Client[] = [
  { name: 'Pragati Offset',         city: 'Hyderabad',     initials: 'PO',  color: '#60A5FA', logo: logoPragati,    category: 'Premium Print',    since: '2003' },
  { name: 'Kala Jyothi',            city: 'Hyderabad',     initials: 'KJ',  color: '#34D399', logo: logoKalaJyothi, category: 'Commercial Print', since: '2005' },
  { name: 'Canpac Trends',          city: 'Ahmedabad',     initials: 'CT',  color: '#38BDF8', logo: logoCanpac,     category: 'Packaging',        since: '2008' },
  { name: 'Parksons Packaging',     city: 'Mumbai',        initials: 'PP',  color: '#A78BFA', logo: logoParksons,   category: 'Packaging',        since: '2006' },
  { name: 'Replika Press',          city: 'Sonipat',       initials: 'RP',  color: '#FB923C', logo: logoReplika,    category: 'Book Print',       since: '2010' },
  { name: 'Any Graphics',           city: 'Greater Noida', initials: 'AG',  color: '#4ADE80', logo: logoAnyGraphics, category: 'Commercial Print', since: '2007' },
  { name: 'Hi-Tech Print Systems',  city: 'Hyderabad',     initials: 'HT',  color: '#60A5FA', logo: logoHitech,     category: 'Security Print',   since: '2002' },
  { name: 'VS Hitech Secure Print', city: 'Hyderabad',     initials: 'VS',  color: '#67E8F9', logo: logoVSHitech,   category: 'Security Print',   since: '2009' },
  { name: 'CDC Printers',           city: 'Ahmedabad',     initials: 'CDC', color: '#C4B5FD', logo: logoCDC,        category: 'Commercial Print', since: '2011' },
  { name: 'Vikas Printers',         city: 'Nasik',         initials: 'VP',  color: '#FCA5A5', logo: logoVikas,      category: 'Commercial Print', since: '2012' },
  { name: 'National & Printers',    city: 'Kolkata',       initials: 'NAP', color: '#FCD34D', logo: logoNAP,        category: 'Commercial Print', since: '2008' },
];

const ROW1 = CLIENTS.slice(0, 6);
const ROW2 = CLIENTS.slice(5);
const ROW1_LOOP = [...ROW1, ...ROW1, ...ROW1];
const ROW2_LOOP = [...ROW2, ...ROW2, ...ROW2];

/* Premium logo card with hover detail reveal */
const LogoCard = ({ client }: { client: Client }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [hovered, setHovered]     = useState(false);
  const hasLogo = !!client.logo && !imgFailed;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        background: hovered
          ? `linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))`
          : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? `${client.color}55` : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 16,
        width: 220,
        overflow: 'hidden',
        transition: 'background 0.35s, border-color 0.35s, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 56px ${client.color}26, 0 0 0 1px ${client.color}24, inset 0 1px 0 rgba(255,255,255,0.06)`
          : '0 4px 14px rgba(0,0,0,0.18)',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${client.color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s',
      }} />

      {/* Category chip — top right */}
      <div style={{
        position: 'absolute', top: 12, right: 12, zIndex: 2,
        fontFamily: "'Manrope', sans-serif",
        fontSize: 7.5, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: hovered ? client.color : 'rgba(255,255,255,0.32)',
        fontWeight: 700,
        padding: '4px 8px',
        background: hovered ? `${client.color}14` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? `${client.color}40` : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 4,
        transition: 'all 0.35s',
      }}>
        {client.category}
      </div>

      {/* Logo area */}
      <div style={{
        width: '100%', height: 132,
        background: hasLogo ? '#fff' : `${client.color}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* shimmer overlay on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)`,
          transform: hovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: 'none',
        }} />

        {hasLogo ? (
          <img
            src={client.logo}
            alt={client.name}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain', padding: 22,
              transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />
        ) : (
          <span style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: client.initials.length >= 3 ? 22 : 36,
            fontWeight: 700,
            color: client.color,
            letterSpacing: '-0.02em',
            userSelect: 'none',
          }}>
            {client.initials}
          </span>
        )}
      </div>

      {/* Name + city + since */}
      <div style={{ padding: '14px 16px 16px', textAlign: 'left', position: 'relative' }}>
        <div style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 12.5, fontWeight: 700,
          color: '#fff',
          lineHeight: 1.3,
          marginBottom: 4,
          transition: 'color 0.3s',
        }}>
          {client.name}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 9, color: 'rgba(255,255,255,0.34)',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="7" height="7" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            {client.city}
          </div>
          <div style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 11,
            color: hovered ? client.color : 'rgba(255,255,255,0.5)',
            fontStyle: 'italic',
            transition: 'color 0.3s',
          }}>
            since {client.since}
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRevealed(true); obs.disconnect(); }
    }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      background: 'linear-gradient(180deg, #060A10 0%, #0A1322 50%, #060A10 100%)',
      padding: 'clamp(80px,10vw,140px) 0 clamp(72px,9vw,120px)',
      overflow: 'hidden', position: 'relative',
    }}>
      {/* Subtle grid + central glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(96,165,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.04) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 60% at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at center, black 30%, transparent 80%)',
      }} />
      <div style={{
        position: 'absolute', top: '32%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 720, height: 720,
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      {/* ── HEADER ── */}
      <div style={{
        maxWidth: 1300, margin: '0 auto', padding: '0 56px',
        position: 'relative', marginBottom: 'clamp(48px,6vw,80px)',
      }} className="max-md:!px-6 max-[767px]:!px-4">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 22 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}
        >
          {/* Tag chip */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '7px 16px', marginBottom: 22,
            background: 'rgba(59,130,246,0.08)',
            border: '1px solid rgba(59,130,246,0.22)',
            borderRadius: 24,
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 10px rgba(96,165,250,0.7)' }} />
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#93C5FD', fontWeight: 700,
            }}>
              Our Clients
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(40px, 5.2vw, 76px)',
            fontWeight: 600, color: '#fff',
            lineHeight: 0.98, margin: 0, letterSpacing: '-0.02em',
          }}>
            Trusted by India's
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#60A5FA' }}>
              finest print houses.
            </span>
          </h2>

          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 15, color: 'rgba(255,255,255,0.45)',
            marginTop: 22, maxWidth: 540, lineHeight: 1.75,
            marginLeft: 'auto', marginRight: 'auto',
          }}>
            From packaging giants to security printers — India's leading operations have built their machinery floors with Sai Enterprises.
          </p>
        </motion.div>

      </div>

      {/* ── DUAL MARQUEE ROWS ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ position: 'relative', marginTop: 16 }}
      >
        {/* Edge fade masks */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(90deg, #060A10 0%, rgba(6,10,16,0) 10%, rgba(6,10,16,0) 90%, #060A10 100%)',
        }} />

        {/* Row 1 → left */}
        <div style={{ overflow: 'hidden', marginBottom: 16 }}
          onMouseEnter={e => { const el = e.currentTarget.querySelector('div') as HTMLDivElement; if (el) el.style.animationPlayState = 'paused'; }}
          onMouseLeave={e => { const el = e.currentTarget.querySelector('div') as HTMLDivElement; if (el) el.style.animationPlayState = 'running'; }}
        >
          <div style={{
            display: 'flex', gap: 14, width: 'max-content',
            animation: 'clients-left 48s linear infinite',
            willChange: 'transform',
            padding: '12px 0',
          }}>
            {ROW1_LOOP.map((c, i) => <LogoCard key={`r1-${i}-${c.name}`} client={c} />)}
          </div>
        </div>

        {/* Row 2 → right */}
        <div style={{ overflow: 'hidden' }}
          onMouseEnter={e => { const el = e.currentTarget.querySelector('div') as HTMLDivElement; if (el) el.style.animationPlayState = 'paused'; }}
          onMouseLeave={e => { const el = e.currentTarget.querySelector('div') as HTMLDivElement; if (el) el.style.animationPlayState = 'running'; }}
        >
          <div style={{
            display: 'flex', gap: 14, width: 'max-content',
            animation: 'clients-right 60s linear infinite',
            willChange: 'transform',
            padding: '12px 0',
          }}>
            {ROW2_LOOP.map((c, i) => <LogoCard key={`r2-${i}-${c.name}`} client={c} />)}
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes clients-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes clients-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default ClientsSection;
