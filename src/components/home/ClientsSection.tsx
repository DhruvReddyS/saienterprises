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

/* Logo card.
   Client marks arrive as artwork on white, so each sits on a neutral plate
   rather than a raw white tile. A single brand accent replaces the previous
   per-client colours, which read as a rainbow against the dark section. */
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
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        width: 236,
        padding: 12,
        overflow: 'hidden',
        borderRadius: 18,
        background: hovered
          ? 'linear-gradient(180deg, hsl(215 27% 12%), hsl(216 32% 8.5%))'
          : 'linear-gradient(180deg, hsl(216 32% 8.5%), hsl(217 38% 6%))',
        border: `1px solid ${hovered ? 'hsl(212 100% 58% / 0.38)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered
          ? 'inset 0 1px 0 rgba(255,255,255,0.12), 0 32px 76px -18px rgba(2,6,14,0.75), 0 0 0 1px hsl(212 100% 58% / 0.12)'
          : 'inset 0 1px 0 rgba(255,255,255,0.07), 0 4px 14px -3px rgba(2,6,14,0.55)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition:
          'transform 0.32s cubic-bezier(0.16,1,0.3,1), border-color 0.32s ease, box-shadow 0.32s ease, background 0.32s ease',
      }}
    >
      {/* Logo plate */}
      <div className="logo-plate" style={{ height: 112, width: '100%' }}>
        {hasLogo ? (
          <img
            src={client.logo}
            alt={client.name}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            style={{ padding: '20px 24px' }}
          />
        ) : (
          <span style={{
            fontSize: client.initials.length >= 3 ? 24 : 34,
            fontWeight: 800,
            color: 'hsl(219 88% 44%)',
            letterSpacing: '-0.03em',
            userSelect: 'none',
          }}>
            {client.initials}
          </span>
        )}
      </div>

      {/* Meta */}
      <div style={{ padding: '14px 6px 4px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 7,
        }}>
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '-0.015em',
            color: '#fff',
            lineHeight: 1.25,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {client.name}
          </span>
          <span style={{
            flexShrink: 0,
            fontSize: 10,
            fontWeight: 600,
            color: hovered ? 'hsl(207 100% 70%)' : 'rgba(255,255,255,0.34)',
            transition: 'color 0.3s',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {client.since}
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          minWidth: 0,
          fontSize: 9.5,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.4)',
        }}>
          <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>{client.city}</span>
          <span style={{
            width: 3, height: 3, borderRadius: '50%',
            background: 'rgba(255,255,255,0.26)', flexShrink: 0,
          }} />
          <span style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {client.category}
          </span>
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
      background: 'linear-gradient(180deg, hsl(218 46% 3.5%) 0%, hsl(217 38% 6%) 50%, hsl(218 46% 3.5%) 100%)',
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
        width: 860, height: 860,
        background: 'radial-gradient(circle, rgba(46,144,255,0.10) 0%, rgba(46,144,255,0.04) 38%, transparent 68%)',
        pointerEvents: 'none',
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
          <div className="chip" style={{ marginBottom: 22 }}>Our Clients</div>

          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(40px, 5.2vw, 76px)',
            fontWeight: 600, color: '#fff',
            lineHeight: 0.98, margin: 0, letterSpacing: '-0.02em',
          }}>
            Trusted by India's
            <br />
            <span className="text-gradient-brand" style={{ fontStyle: 'italic', fontWeight: 400 }}>
              finest print houses.
            </span>
          </h2>

          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 15, color: 'rgba(255,255,255,0.56)',
            marginTop: 22, maxWidth: 540, lineHeight: 1.75,
            marginLeft: 'auto', marginRight: 'auto',
          }}>
            From packaging giants to security printers, India's leading operations have built their machinery floors with Sai Enterprises.
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
          background: 'linear-gradient(90deg, hsl(218 46% 3.5%) 0%, hsl(218 46% 3.5% / 0) 11%, hsl(218 46% 3.5% / 0) 89%, hsl(218 46% 3.5%) 100%)',
        }} />

        {/* Row 1 → left */}
        <div className="clients-row clients-row--primary" style={{ overflow: 'hidden', marginBottom: 16 }}
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
        <div className="clients-row clients-row--secondary" style={{ overflow: 'hidden' }}
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
        @media (max-width: 767px) {
          .clients-row--secondary { display: none; }
          .clients-row--primary { margin-bottom: 0 !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .clients-row > div { animation-play-state: paused !important; }
        }
      `}</style>
    </section>
  );
};

export default ClientsSection;
