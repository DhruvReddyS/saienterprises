import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageMeta } from '@/lib/seo';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import PageTransition from '@/components/PageTransition';
import WorldPresenceMap from '@/components/presence/WorldPresenceMap';
import BrandImage from '@/components/BrandImage';
import { BorderBeam } from '@/components/ui/border-beam';
import { GlowCard } from '@/components/ui/spotlight-card';
import saiLogo from '@/assets/sai-logo-cmyk.png';
import heroImage from '@/assets/hero-printing.jpg';

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
const timeline = [
  {
    year: '2000',
    title: 'Founded in Hyderabad',
    body: 'Operations began with a sharp focus on production-ready graphic machinery. From day one, Sai secured the exclusive HPM agency for India — making it the sole authorised source for HPM paper cutters in the country. Founded by Mr. S. Dayaker Reddy and Mr. G. Phani Kumar.',
    accent: '#3B82F6',
  },
  {
    year: '2010',
    title: 'National Presence Built',
    body: 'Regional support expanded to New Delhi, Pune, and Vijayawada. Sales partners were established in Kolkata, Mumbai, Ahmedabad, Jaipur, Bangalore, Coimbatore and Goa — shortening response time and deepening client relationships across India.',
    accent: '#6366F1',
  },
  {
    year: '2015',
    title: 'Nairobi Office — Africa Entry',
    body: 'A dedicated Nairobi office strengthened East Africa support. Export relationships to Sri Lanka, Nepal, UAE, Oman, and multiple African markets cemented Sai as a pan-world machinery supplier built from Hyderabad.',
    accent: '#0EA5E9',
  },
  {
    year: '2026',
    title: 'Complete Workflow Stack',
    body: '4000+ machines placed. 2000+ customers served across commercial printers, packaging converters, newspaper groups, and stationery manufacturers. 490+ programmable HPM paper cutters sold — 90% market share in fully automatic paper cutters across India. One supplier for the entire production chain.',
    accent: '#10B981',
  },
];

const stats = [
  { label: 'Years', value: 24, suffix: '+' },
  { label: 'Machines Placed', value: 4000, suffix: '+' },
  { label: 'Customers', value: 2000, suffix: '+' },
  { label: 'Countries', value: 15, suffix: '+' },
];

const team = [
  {
    name: 'S. Dayaker Reddy',
    role: 'Founder & Director',
    desc: 'Leads strategic vision and key commercial relationships. Built the HPM partnership from 2000 and continues to drive national expansion.',
  },
  {
    name: 'G. Phani Kumar',
    role: 'Co-Founder & Director',
    desc: 'Heads operations and service across all regions. Oversees technical machine placement, after-sales support, and partner network management.',
  },
];

/* ── Stats row ── */
const STAT_ACCENTS = ['#3B82F6', '#60A5FA', '#3B82F6', '#60A5FA'];

const StatsRow = () => {
  const { ref, on } = useReveal(0.3);
  const vals = [
    useCounter(stats[0].value, on),
    useCounter(stats[1].value, on),
    useCounter(stats[2].value, on),
    useCounter(stats[3].value, on),
  ];
  return (
    <div ref={ref} style={{
      display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
      gap: 12, marginTop: 72,
    }}
      className="max-lg:!grid-cols-2 max-sm:!grid-cols-2"
    >
      {stats.map((s, i) => (
        <div key={s.label} style={{
          opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(18px)',
          transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
        }}>
          <GlowCard
            glowColor="blue"
            customSize={true}
            width="100%"
            style={{ minHeight: 130, padding: '32px 24px', textAlign: 'center' }}
          >
            {/* Top color bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1.5,
              background: `linear-gradient(90deg, ${STAT_ACCENTS[i]}, transparent)`,
            }} />
            {/* Subtle glow */}
            <div style={{
              position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
              width: 80, height: 60,
              background: `radial-gradient(ellipse, ${STAT_ACCENTS[i]}18 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />
            {on && <BorderBeam colorFrom={STAT_ACCENTS[i]} colorTo="transparent" duration={8 + i * 2} delay={i * 1.5} borderWidth={1} size={120} />}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px,4.5vw,58px)', fontWeight: 700,
              color: '#060A10', lineHeight: 1, letterSpacing: '-0.025em',
              position: 'relative',
            }}>
              {vals[i].toLocaleString()}{s.suffix}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 8.5, letterSpacing: '0.26em', textTransform: 'uppercase',
              color: STAT_ACCENTS[i], marginTop: 10, fontWeight: 700,
              position: 'relative',
            }}>
              {s.label}
            </div>
          </GlowCard>
        </div>
      ))}
    </div>
  );
};

/* ── Timeline item ── */
const TimelineItem = ({ ch, i }: { ch: typeof timeline[0]; i: number }) => {
  const { ref, on } = useReveal(0.15);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} style={{ display: 'flex', gap: 0, position: 'relative', marginBottom: 16 }}>
      {/* Year column */}
      <div style={{
        width: 100, flexShrink: 0, paddingTop: 24,
        opacity: on ? 1 : 0, transform: on ? 'none' : 'translateX(-16px)',
        transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
      }}
        className="max-sm:hidden"
      >
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(18px,2vw,26px)', fontWeight: 700,
          color: ch.accent, letterSpacing: '-0.02em',
        }}>
          {ch.year}
        </div>
      </div>

      {/* Line + dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 28, flexShrink: 0 }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: ch.accent, flexShrink: 0, marginTop: 26,
          boxShadow: `0 0 14px ${ch.accent}60`,
          opacity: on ? 1 : 0, transition: `opacity 0.4s ${i * 0.1 + 0.2}s`,
        }} />
        {i < timeline.length - 1 && (
          <div style={{
            width: 1, flex: 1, marginTop: 8, minHeight: 40,
            background: `linear-gradient(to bottom, ${ch.accent}35, rgba(0,0,0,0.05))`,
          }} />
        )}
      </div>

      {/* Content card */}
      <motion.div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{ flex: 1, paddingBottom: 16 }}
      >
        <div style={{
          padding: '28px 32px', position: 'relative', overflow: 'hidden',
          background: hov ? 'rgba(6,10,16,0.04)' : '#fff',
          border: `1px solid ${hov ? ch.accent + '30' : 'rgba(0,0,0,0.07)'}`,
          transition: 'all 0.3s ease',
          boxShadow: hov ? `0 8px 32px rgba(0,0,0,0.07), 0 0 0 1px ${ch.accent}15` : '0 1px 6px rgba(0,0,0,0.04)',
        }}>
          {/* Top bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, ${ch.accent}, transparent)`,
            transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
            transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          }} />
          {/* Ghost year watermark */}
          <div style={{
            position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(56px,8vw,96px)', fontWeight: 700,
            color: ch.accent, opacity: 0.05, lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em',
          }}>
            {ch.year}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: ch.accent, marginBottom: 10, fontWeight: 700 }}
            className="sm:hidden"
          >{ch.year}</div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 600,
            color: '#060A10', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 12,
            position: 'relative',
          }}>
            {ch.title}
          </h3>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, color: 'rgba(0,0,0,0.50)', lineHeight: 1.85, maxWidth: 560,
            position: 'relative', margin: 0,
          }}>
            {ch.body}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

/* ── Team card ── */
const TeamCard = ({ person, i }: { person: typeof team[0]; i: number }) => {
  const { ref, on } = useReveal(0.2);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      style={{
        opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(24px)',
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
      }}
    >
      <GlowCard
        glowColor="blue"
        customSize={true}
        style={{ width: '100%', padding: '44px 36px' }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Animated top bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
          transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }} />
        {/* Corner number */}
        <div style={{
          position: 'absolute', top: 20, right: 28,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 64, fontWeight: 700, color: '#3B82F6',
          opacity: hov ? 0.06 : 0.03, lineHeight: 1,
          transition: 'opacity 0.4s', userSelect: 'none',
          letterSpacing: '-0.04em',
        }}>
          {String(i + 1).padStart(2, '0')}
        </div>
        {hov && <BorderBeam colorFrom="#3B82F6" colorTo="#60A5FA" duration={6} delay={0} borderWidth={1} size={160} />}
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 14, fontWeight: 700 }}>
          Co-Founder
        </div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 600, color: '#060A10', lineHeight: 1.1, marginBottom: 6,
        }}>
          {person.name}
        </h3>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)', marginBottom: 20 }}>
          {person.role}
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(0,0,0,0.50)', lineHeight: 1.85, margin: 0 }}>
          {person.desc}
        </p>
      </GlowCard>
    </div>
  );
};

/* ── Main page ── */
const AboutPage = () => {
  const quoteReveal = useReveal(0.2);
  const foundersReveal = useReveal(0.1);

  useEffect(() => {
    setPageMeta(
      'About Us | Sai Enterprises — Graphic Machinery Since 2000',
      'Learn about Sai Enterprises — 24+ years of graphic machinery expertise. HPM sole agent in India, serving printers across India and East Africa.',
    );
  }, []);

  return (
    <PageTransition>
      <Header />

      {/* ── HERO — dark ── */}
      <div style={{
        background: '#060A10', paddingTop: 'clamp(100px,12vw,160px)', paddingBottom: 'clamp(60px,8vw,100px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Dot-grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.055) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }} />

        {/* Deep blue glow */}
        <div style={{
          position: 'absolute', top: '0%', left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 500,
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.11) 0%, transparent 68%)',
          pointerEvents: 'none', filter: 'blur(60px)',
        }} />

        {/* Year watermark — thin and elegant */}
        <div style={{
          position: 'absolute', bottom: -30, right: -10,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(200px,32vw,440px)', fontWeight: 700,
          lineHeight: 0.8, letterSpacing: '-0.07em',
          pointerEvents: 'none', userSelect: 'none',
          color: 'rgba(255,255,255,0.022)',
        }}>
          SAI
        </div>

        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 2 }}
          className="max-lg:!px-10 max-md:!px-6"
        >
          {/* Est. label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 40,
              fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700,
            }}
          >
            <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
            Est. 2000 · Hyderabad, India
          </motion.div>

          {/* H1 — bold, confident */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(52px,8.5vw,120px)', fontWeight: 600,
              lineHeight: 0.9, letterSpacing: '-0.03em',
              color: '#fff', margin: 0, maxWidth: 920,
            }}
          >
            India's print industry<br />
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.38)' }}>runs on our</span>{' '}
            <span style={{ color: '#3B82F6' }}>machines.</span>
          </motion.h1>

          {/* Divider + sub-copy grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: 52, display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 48, alignItems: 'end',
            }}
            className="max-md:!grid-cols-1 max-md:!gap-8"
          >
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.8,
              maxWidth: 560, margin: 0,
            }}>
              24+ years supplying, installing and servicing graphic machinery for commercial printers, packaging converters, and newspaper groups — across India, Gulf, Africa and Asia.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}
              className="max-md:!justify-start"
            >
              <Link to="/contact" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
                padding: '13px 28px', background: '#3B82F6', color: '#fff',
                textDecoration: 'none', transition: 'background 0.2s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
              >
                Talk to us →
              </Link>
              <Link to="/machinery" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
                padding: '13px 28px', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3B82F6'; el.style.color = '#3B82F6'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.14)'; el.style.color = 'rgba(255,255,255,0.55)'; }}
              >
                Machinery →
              </Link>
            </div>
          </motion.div>

          {/* Horizontal rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 1, background: 'linear-gradient(90deg, rgba(59,130,246,0.5), rgba(255,255,255,0.06) 60%, transparent)', transformOrigin: 'left', marginTop: 56 }}
          />

          {/* Stats */}
          <StatsRow />
        </div>
      </div>

      {/* ── QUOTE — dark ── */}
      <div style={{
        background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(59,130,246,0.07) 0%, #060A10 100%)',
        padding: '100px 64px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
        className="max-md:!px-7 max-md:!py-16"
      >
        <div ref={quoteReveal.ref} style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ width: 48, height: 1, background: '#3B82F6', margin: '0 auto 44px', opacity: quoteReveal.on ? 1 : 0, transition: 'opacity 0.6s' }} />
          <blockquote style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(26px,3.8vw,54px)', fontWeight: 300, fontStyle: 'italic',
            color: '#fff', lineHeight: 1.22, letterSpacing: '-0.01em',
            opacity: quoteReveal.on ? 1 : 0, transform: quoteReveal.on ? 'none' : 'translateY(18px)',
            transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}>
            "We don't sell machines.<br />
            <span style={{ color: '#3B82F6' }}>We build print floors."</span>
          </blockquote>
          <div style={{ marginTop: 32, fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', opacity: quoteReveal.on ? 1 : 0, transition: 'opacity 0.6s 0.3s' }}>
            S. Dayaker Reddy · Founder
          </div>
          <div style={{ width: 48, height: 1, background: '#3B82F6', margin: '32px auto 0', opacity: quoteReveal.on ? 1 : 0, transition: 'opacity 0.6s 0.1s' }} />
        </div>
      </div>

      {/* ── TIMELINE — WHITE/LIGHT ── */}
      <div style={{ background: '#F8FAFC', padding: '100px 0 60px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }}
          className="max-md:!px-7"
        >
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
              Our Story
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 600, lineHeight: 1.0,
              letterSpacing: '-0.02em', color: '#060A10',
            }}>
              25 years in the making.
            </h2>
          </div>

          <div style={{ paddingLeft: 100 }} className="max-sm:!pl-0">
            {timeline.map((ch, i) => (
              <TimelineItem key={ch.year} ch={ch} i={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── FOUNDERS — WHITE/LIGHT ── */}
      <div ref={foundersReveal.ref} style={{ background: '#fff', padding: '80px 0 100px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }}
          className="max-md:!px-7"
        >
          <div style={{ marginBottom: 52 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
              Leadership
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#060A10' }}>
              The people behind Sai.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
            className="max-lg:!grid-cols-1"
          >
            {team.map((person, i) => (
              <TeamCard key={person.name} person={person} i={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── WORLD MAP — dark ── */}
      <div style={{ background: '#060A10', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }}
          className="max-md:!px-7"
        >
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
              Global Presence
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end' }}
              className="max-lg:!grid-cols-1 max-lg:!gap-4"
            >
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(30px,4vw,52px)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#fff', margin: 0 }}>
                Offices across<br />
                <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#3B82F6' }}>India, Africa & Asia.</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.8, maxWidth: 380 }}>
                Hyderabad HQ with sales offices in Delhi, Mumbai, Meerut, Pune and Vijayawada. Overseas offices in Nairobi (Kenya), Addis Ababa (Ethiopia), and Colombo (Sri Lanka). Buyers across 15+ countries.
              </p>
            </div>
          </div>

          {/* World Map */}
          <div style={{
            border: '1px solid rgba(255,255,255,0.07)',
            background: '#060A10',
            overflow: 'hidden',
          }}>
            <WorldPresenceMap />
          </div>

          {/* Quick stats */}
          <div style={{ display: 'flex', gap: 32, marginTop: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'India Offices', val: '6' },
              { label: 'Overseas Offices', val: 'Kenya · Ethiopia · Sri Lanka' },
              { label: 'Countries Served', val: '15+' },
              { label: 'Export Markets', val: 'Africa, Gulf, Nepal, Sri Lanka' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B82F6', flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>
                  <strong style={{ color: '#fff', fontWeight: 600 }}>{item.val}</strong>
                  {' '}{item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA — dark ── */}
      <div style={{
        background: '#060A10', padding: '100px 64px', textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
        className="max-md:!px-7 max-md:!py-20"
      >
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 22 }}>
            Let's Talk
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 300,
            color: '#fff', lineHeight: 1.08, marginBottom: 44,
            letterSpacing: '-0.02em',
          }}>
            Discuss your machinery<br />requirement with us.
          </h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
              padding: '14px 36px', background: '#3B82F6', color: '#fff',
              textDecoration: 'none', transition: 'background 0.2s',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
            >
              Start a Conversation →
            </Link>
            <Link to="/machinery" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
              padding: '14px 36px', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3B82F6'; el.style.color = '#3B82F6'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.15)'; el.style.color = 'rgba(255,255,255,0.6)'; }}
            >
              Browse Machinery →
            </Link>
          </div>
        </div>
      </div>

      <CinematicFooter />
    </PageTransition>
  );
};

export default AboutPage;
