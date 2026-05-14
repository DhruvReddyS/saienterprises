import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { productCategories } from '@/data/products';
import saiLogo from '@/assets/sai-logo-cmyk.png';

const MARQUEE = [
  'Production Ready', 'Machine Sourcing', 'Installation Support', 'HPM Authorized',
  'Global Exports', 'Service Backbone', 'Print Floor Planning', 'Genuine Spares',
  '4000+ Machines', '24+ Years', '2000+ Clients', 'Export Ready',
];

const NAV = [
  { label: 'Home',       to: '/' },
  { label: 'Machinery',  to: '/machinery' },
  { label: 'About Us',   to: '/about' },
  { label: 'Partners',   to: '/partners' },
  { label: 'E-Brochure', to: '/brochure' },
  { label: 'Contact',    to: '/contact' },
];

const IcoPhone = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12a19.79 19.79 0 01-3.07-8.68A2 2 0 013.58 1h3a2 2 0 012 1.72c.127.96.361 1.9.7 2.81a2 2 0 01-.45 2.11L7.91 8.95a16 16 0 006.29 6.29l1.41-1.41a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const IcoMail = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const STATS = [
  { val: '24+', label: 'Years' },
  { val: '4K+', label: 'Machines' },
  { val: '2K+', label: 'Clients' },
  { val: '15+', label: 'Countries' },
];

export const CinematicFooter = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  return (
    <footer
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{
        background: 'linear-gradient(180deg, #05070B 0%, #060A10 48%, #02040A 100%)',
        color: '#fff',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes footer-top-scan {
          0%   { transform: translateX(-100%) }
          100% { transform: translateX(100vw) }
        }
        @keyframes footer-marquee {
          0%   { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
      `}</style>

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
      }} />
      {/* Mouse-following glow orb */}
      <div style={{
        position: 'absolute',
        left: `${mouse.x * 100}%`,
        top: `${mouse.y * 100}%`,
        width: 600,
        height: 600,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
        transition: 'left 0.18s ease-out, top 0.18s ease-out',
        zIndex: 1,
      }} />
      {/* Top border + scan line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.75), transparent)',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, width: 120, height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
          animation: 'footer-top-scan 6s ease-in-out infinite 2s',
        }} />
      </div>

      {/* ── Scrolling marquee strip ── */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '10px 0',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{
          display: 'flex',
          width: 'max-content',
          animation: 'footer-marquee 40s linear infinite',
        }}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} style={{
              fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.18)', fontWeight: 700,
              padding: '0 20px', whiteSpace: 'nowrap',
              display: 'inline-flex', alignItems: 'center', gap: 20,
            }}>
              {item}
              <span style={{ color: 'rgba(59,130,246,0.4)', fontSize: 3 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{
          display: 'flex', justifyContent: 'center', gap: 0,
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          position: 'relative', zIndex: 2,
        }}
      >
        {STATS.map((s, i) => (
          <div key={i} style={{
            flex: 1, maxWidth: 200,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '22px 16px',
            borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            position: 'relative',
            cursor: 'default',
          }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(59,130,246,0.04)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'transparent';
            }}
          >
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(22px, 3.5vw, 36px)',
              fontWeight: 700,
              lineHeight: 1,
              color: '#fff',
              letterSpacing: '-0.02em',
            }}>
              {s.val}
            </span>
            <span style={{
              fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(59,130,246,0.55)', fontWeight: 700, marginTop: 5,
            }}>
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── Giant wordmark ── */}
      <div style={{ position: 'relative', zIndex: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            textAlign: 'center',
            padding: '52px 24px 0',
            position: 'relative',
          }}
        >
          {/* Thin top rule with dot */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 16, marginBottom: 36,
          }}>
            <div style={{ flex: 1, maxWidth: 200, height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08))' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(59,130,246,0.5)', boxShadow: '0 0 8px rgba(59,130,246,0.4)' }} />
            <div style={{ flex: 1, maxWidth: 200, height: 1, background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.08))' }} />
          </div>

          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 9vw, 130px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.07)',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              cursor: 'default',
              transition: 'WebkitTextStroke 0.4s, text-shadow 0.4s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.WebkitTextStroke = '1px rgba(96,165,250,0.35)';
              el.style.textShadow = '0 0 80px rgba(59,130,246,0.12), 0 0 160px rgba(59,130,246,0.06)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.WebkitTextStroke = '1px rgba(255,255,255,0.07)';
              el.style.textShadow = 'none';
            }}
          >
            SAI ENTERPRISES
          </div>
        </motion.div>
      </div>

      {/* ── Main grid ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        style={{
          maxWidth: 1300,
          margin: '0 auto',
          padding: '48px 56px 0',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: 48,
          position: 'relative',
          zIndex: 2,
        }}
        className="max-[900px]:!grid-cols-1 max-[900px]:!gap-10 max-md:!px-6 max-[767px]:!px-4 max-[767px]:!pt-8"
      >
        {/* Col 1 — Brand */}
        <motion.div variants={fadeUp}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <img src={saiLogo} alt="Sai Enterprises" loading="lazy" decoding="async" style={{ height: 32, objectFit: 'contain' }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
                Sai Enterprises
              </div>
              <div style={{ fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginTop: 2 }}>
                Graphic Machinery · Est. 2000
              </div>
            </div>
          </div>

          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.28)', lineHeight: 1.85, maxWidth: 320, marginBottom: 20 }}>
            India's trusted graphic machinery supplier. Pre-press to post-press, corrugation, and allied finishing — end-to-end, one team.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { Icon: IcoPhone, label: '+91 931 217 5513', href: 'tel:+919312175513' },
              { Icon: IcoPhone, label: '+91 939 767 8950', href: 'tel:+919397678950' },
              { Icon: IcoMail,  label: 'msrao@saienterprises.info',  href: 'mailto:msrao@saienterprises.info' },
              { Icon: IcoMail,  label: 'venkat@saienterprises.info', href: 'mailto:venkat@saienterprises.info' },
            ].map((c, i) => (
              <a key={i} href={c.href} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 11.5, color: 'rgba(255,255,255,0.28)', textDecoration: 'none',
                transition: 'color 0.2s, transform 0.2s',
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = '#93C5FD';
                  el.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'rgba(255,255,255,0.28)';
                  el.style.transform = 'translateX(0)';
                }}
              >
                <span style={{ opacity: 0.5 }}><c.Icon /></span>
                {c.label}
              </a>
            ))}
          </div>

          <div style={{ marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.04em' }}>
            Hyderabad · Delhi · Pune · Vijayawada · Nairobi
          </div>
        </motion.div>

        {/* Col 2 — Navigate */}
        <motion.div variants={fadeUp}>
          <div style={{ fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(59,130,246,0.6)', marginBottom: 16, fontWeight: 700 }}>
            Navigate
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {NAV.map((l) => (
              <Link key={l.to} to={l.to} style={{
                fontSize: 12.5, color: 'rgba(255,255,255,0.32)', textDecoration: 'none',
                transition: 'color 0.2s, transform 0.2s',
                letterSpacing: '0.01em',
                display: 'inline-block',
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = '#93C5FD';
                  el.style.transform = 'translateX(6px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'rgba(255,255,255,0.32)';
                  el.style.transform = 'translateX(0)';
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Col 3 — Machinery + HPM */}
        <motion.div variants={fadeUp}>
          <div style={{ fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(59,130,246,0.6)', marginBottom: 16, fontWeight: 700 }}>
            Machinery
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {productCategories.map((cat) => (
              <Link key={cat.slug} to={`/machinery/${cat.slug}`} style={{
                fontSize: 12.5, color: 'rgba(255,255,255,0.32)', textDecoration: 'none',
                transition: 'color 0.2s, transform 0.2s',
                letterSpacing: '0.01em',
                display: 'inline-block',
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = '#93C5FD';
                  el.style.transform = 'translateX(6px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'rgba(255,255,255,0.32)';
                  el.style.transform = 'translateX(0)';
                }}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* HPM badge */}
          <div style={{
            padding: '12px 14px',
            background: 'rgba(59,130,246,0.05)',
            border: '1px solid rgba(59,130,246,0.14)',
            borderLeft: '2px solid rgba(59,130,246,0.5)',
            transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, background 0.25s',
          }}>
            <div style={{ fontSize: 7.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(59,130,246,0.7)', marginBottom: 4, fontWeight: 700 }}>
              Exclusive
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>HPM Sole Agent — India</div>
            <Link to="/partners" style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              marginTop: 6, fontSize: 9, color: 'rgba(59,130,246,0.7)', textDecoration: 'none',
              letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
              transition: 'color 0.2s',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#60A5FA'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(59,130,246,0.7)'; }}
            >
              Learn More →
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          maxWidth: 1300, margin: '0 auto',
          padding: '28px 56px 32px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
          borderTop: '1px solid rgba(255,255,255,0.04)',
          marginTop: 40,
          position: 'relative', zIndex: 2,
        }}
        className="max-md:!px-6 max-[767px]:!px-4 max-[767px]:!flex-col max-[767px]:!items-start max-[767px]:!gap-3 max-[767px]:!pb-20"
      >
        <span style={{ fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.14)' }}>
          © 2026 Sai Enterprises · Hyderabad, India
        </span>

        <span style={{ fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', gap: 6 }}>
          Production-ready digital presence
        </span>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700,
            color: 'rgba(255,255,255,0.28)', background: 'none', border: 'none', cursor: 'pointer',
            transition: 'color 0.2s', padding: 0,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.28)'; }}
        >
          Back to top
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </motion.div>
    </footer>
  );
};

export default CinematicFooter;
