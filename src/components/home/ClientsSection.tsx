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
}

const CLIENTS: Client[] = [
  { name: 'Pragati Offset',         city: 'Hyderabad',     initials: 'PO',  color: '#60A5FA', logo: logoPragati    },
  { name: 'Kala Jyothi',            city: 'Hyderabad',     initials: 'KJ',  color: '#34D399', logo: logoKalaJyothi },
  { name: 'Canpac Trends',          city: 'Ahmedabad',     initials: 'CT',  color: '#38BDF8', logo: logoCanpac      },
  { name: 'Parksons Packaging',     city: 'Mumbai',        initials: 'PP',  color: '#A78BFA', logo: logoParksons    },
  { name: 'Replika Press',          city: 'Sonipat',       initials: 'RP',  color: '#FB923C', logo: logoReplika     },
  { name: 'Any Graphics',           city: 'Greater Noida', initials: 'AG',  color: '#4ADE80', logo: logoAnyGraphics },
  { name: 'Hi-Tech Print Systems',  city: 'Hyderabad',     initials: 'HT',  color: '#60A5FA', logo: logoHitech     },
  { name: 'VS Hitech Secure Print', city: 'Hyderabad',     initials: 'VS',  color: '#67E8F9', logo: logoVSHitech    },
  { name: 'CDC Printers',           city: 'Ahmedabad',     initials: 'CDC', color: '#C4B5FD', logo: logoCDC         },
  { name: 'Vikas Printers',         city: 'Nasik',         initials: 'VP',  color: '#FCA5A5', logo: logoVikas       },
  { name: 'National & Printers',    city: 'Kolkata',       initials: 'NAP', color: '#FCD34D', logo: logoNAP         },
];

const ROW1 = CLIENTS.slice(0, 7);
const ROW2 = CLIENTS.slice(5);
const ROW1_LOOP = [...ROW1, ...ROW1, ...ROW1];
const ROW2_LOOP = [...ROW2, ...ROW2, ...ROW2];

const LogoCard = ({ client }: { client: Client }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const hasLogo = !!client.logo && !imgFailed;

  return (
    <div
      style={{
        flexShrink: 0,
        display: 'flex', flexDirection: 'column',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        width: 180,
        overflow: 'hidden',
        transition: 'background 0.25s, border-color 0.25s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.065)';
        (e.currentTarget as HTMLDivElement).style.borderColor = `${client.color}45`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
      }}
    >
      {/* Logo area — full width, white bg */}
      <div style={{
        width: '100%', height: 100,
        background: hasLogo ? '#fff' : `${client.color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `1px solid ${hasLogo ? 'rgba(0,0,0,0.06)' : `${client.color}20`}`,
      }}>
        {client.logo && !imgFailed ? (
          <img
            src={client.logo}
            alt={client.name}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain', padding: 14,
            }}
          />
        ) : (
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: client.initials.length >= 3 ? 14 : 22,
            fontWeight: 800,
            color: client.color,
            letterSpacing: '0.04em',
            userSelect: 'none',
          }}>
            {client.initials}
          </span>
        )}
      </div>

      {/* Name + city */}
      <div style={{ padding: '12px 14px 14px', textAlign: 'center' }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12, fontWeight: 600,
          color: 'rgba(255,255,255,0.88)',
          lineHeight: 1.4,
        }}>
          {client.name}
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 9.5, color: 'rgba(255,255,255,0.28)',
          marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          {client.city}
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
    <section ref={ref} style={{ background: '#060A10', padding: 'clamp(56px,7vw,100px) 0 clamp(48px,6vw,90px)', overflow: 'hidden', position: 'relative' }}>
      {/* Subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(96,165,250,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Header */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 56px', position: 'relative', marginBottom: 56 }} className="max-md:!px-6 max-[767px]:!px-4">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 22 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#3B82F6', fontWeight: 700,
            }}>
              Our Clients
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 4.5vw, 62px)',
            fontWeight: 600, color: '#fff',
            lineHeight: 0.98, margin: 0,
          }}>
            Trusted by India's
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.38)' }}>
              finest print houses.
            </span>
          </h2>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, color: 'rgba(255,255,255,0.35)',
            marginTop: 18, maxWidth: 440, lineHeight: 1.7,
          }}>
            From packaging giants to security printers — India's leading operations rely on Sai Enterprises.
          </p>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.7, delay: 0.18 }}
        style={{ position: 'relative' }}
      >
        {/* Edge fade masks */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(90deg, #060A10 0%, transparent 12%, transparent 88%, #060A10 100%)',
        }} />

        {/* Row 1 → left */}
        <div style={{ overflow: 'hidden', marginBottom: 12 }}
          onMouseEnter={e => { const el = e.currentTarget.querySelector('div') as HTMLDivElement; if (el) el.style.animationPlayState = 'paused'; }}
          onMouseLeave={e => { const el = e.currentTarget.querySelector('div') as HTMLDivElement; if (el) el.style.animationPlayState = 'running'; }}
        >
          <div style={{
            display: 'flex', gap: 10, width: 'max-content',
            animation: 'clients-left 44s linear infinite',
            willChange: 'transform',
          }}>
            {ROW1_LOOP.map((c, i) => <LogoCard key={`r1-${i < ROW1.length ? 'a' : i < ROW1.length * 2 ? 'b' : 'c'}-${i % ROW1.length}-${c.name}`} client={c} />)}
          </div>
        </div>

        {/* Row 2 → right */}
        <div style={{ overflow: 'hidden' }}
          onMouseEnter={e => { const el = e.currentTarget.querySelector('div') as HTMLDivElement; if (el) el.style.animationPlayState = 'paused'; }}
          onMouseLeave={e => { const el = e.currentTarget.querySelector('div') as HTMLDivElement; if (el) el.style.animationPlayState = 'running'; }}
        >
          <div style={{
            display: 'flex', gap: 10, width: 'max-content',
            animation: 'clients-right 56s linear infinite',
            willChange: 'transform',
          }}>
            {ROW2_LOOP.map((c, i) => <LogoCard key={`r2-${i < ROW2.length ? 'a' : i < ROW2.length * 2 ? 'b' : 'c'}-${i % ROW2.length}-${c.name}`} client={c} />)}
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
