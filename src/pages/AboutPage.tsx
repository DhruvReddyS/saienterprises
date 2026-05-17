import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageMeta } from '@/lib/seo';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import PageTransition from '@/components/PageTransition';
import WorldPresenceMap, { LEGEND } from '@/components/presence/WorldPresenceMap';
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
      className="about-stats-grid max-lg:!grid-cols-2 max-sm:!grid-cols-2"
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

/* ── Scroll-driven progress spine ── */
const TimelineProgress = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.72', 'end 0.3'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 55, damping: 22 });
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div
        className="max-[767px]:!left-[18px]"
        style={{
          position: 'absolute',
          left: 'calc(clamp(0px, 2vw, 32px) + 110px)',
          top: 7, bottom: 7, width: 1.5,
          transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.06)',
          pointerEvents: 'none', zIndex: 0,
        }}
      >
        <motion.div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
          scaleY, transformOrigin: 'top',
          background: 'linear-gradient(to bottom, #3B82F6 0%, #6366F1 33%, #0EA5E9 66%, #10B981 100%)',
        }} />
      </div>
      {children}
    </div>
  );
};

/* ── Timeline — cinematic spine ── */
const TimelineItem = ({ ch, i, total }: { ch: typeof timeline[0]; i: number; total: number }) => {
  const isLast = i === total - 1;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '88px 44px 1fr' }}
      className="max-[767px]:!grid-cols-[36px_1fr]"
    >
      {/* Year — desktop */}
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ paddingTop: 4, paddingRight: 16, textAlign: 'right' }}
        className="max-[767px]:!hidden"
      >
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(18px,1.8vw,24px)', fontWeight: 700,
          color: ch.accent, letterSpacing: '-0.02em',
        }}>{ch.year}</span>
      </motion.div>

      {/* Spine — dot only */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.05 }}
          style={{
            width: 14, height: 14, borderRadius: '50%', marginTop: 2,
            background: ch.accent, flexShrink: 0,
            boxShadow: `0 0 0 5px ${ch.accent}30, 0 0 24px ${ch.accent}70`,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={{
          paddingLeft: 'clamp(20px,3vw,44px)',
          paddingBottom: isLast ? 0 : 'clamp(60px,8vw,100px)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Ghost year watermark */}
        <div style={{
          position: 'absolute', right: '-3%', top: '44%', transform: 'translateY(-50%)',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(80px,13vw,190px)', fontWeight: 700, fontStyle: 'italic',
          color: 'transparent', WebkitTextStroke: `1px ${ch.accent}12`,
          pointerEvents: 'none', userSelect: 'none', lineHeight: 1, zIndex: 0,
          letterSpacing: '-0.05em',
        }}>{ch.year}</div>

        {/* Mobile year */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: 10 }} className="min-[768px]:!hidden">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: ch.accent, fontWeight: 700 }}>{ch.year}</span>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(26px,3.6vw,50px)', fontWeight: 600,
            color: '#fff', lineHeight: 1.05, letterSpacing: '-0.025em',
            marginBottom: 16, position: 'relative', zIndex: 1,
          }}
        >{ch.title}</motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(13px,1.3vw,15px)', color: 'rgba(255,255,255,0.42)',
            lineHeight: 1.9, maxWidth: 580, margin: 0, position: 'relative', zIndex: 1,
          }}
        >{ch.body}</motion.p>
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
        style={{ width: '100%', padding: 'clamp(24px,4vw,44px) clamp(20px,4vw,36px)' }}
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
  const [heroOn, setHeroOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroOn(true), 650); return () => clearTimeout(t); }, []);
  const hc0 = useCounter(24, heroOn);
  const hc1 = useCounter(4000, heroOn);
  const hc2 = useCounter(2000, heroOn);
  const hc3 = useCounter(15, heroOn);

  useEffect(() => {
    setPageMeta(
      'About Us | Sai Enterprises — Graphic Machinery Since 2000',
      'Learn about Sai Enterprises — 24+ years of graphic machinery expertise. HPM sole agent in India, serving printers across India and East Africa.',
    );
  }, []);

  return (
    <PageTransition>
      <Header />

      {/* ── HERO — redesigned ── */}
      <div style={{
        background: '#060A10',
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(40px,6vw,80px) 0 0',
      }}>
        {/* Fine grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Big "24" ghost number — left bleed */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', left: '-2%', top: '50%', transform: 'translateY(-56%)',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(260px,38vw,560px)', fontWeight: 700,
            lineHeight: 1, letterSpacing: '-0.08em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(59,130,246,0.13)',
            pointerEvents: 'none', userSelect: 'none',
            zIndex: 1,
          }}
        >
          24
        </motion.div>

        {/* Blue glow behind the 24 */}
        <div style={{
          position: 'absolute', left: '-5%', top: '30%',
          width: '50%', height: '70%',
          background: 'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.55) 45%, transparent)',
          pointerEvents: 'none',
        }} />

        {/* Right-side vignette to keep ghost "24" from dominating */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '35%', height: '100%',
          background: 'linear-gradient(to left, rgba(6,10,16,0.55), transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(16px,5vw,64px)', position: 'relative', zIndex: 2 }}>

          {/* Top label row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(24px,4vw,48px)' }}
          >
            <div style={{ width: 28, height: 1.5, background: '#3B82F6' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700 }}>
              Est. 2000 · Hyderabad, India
            </span>
          </motion.div>

          {/* Headline — split typographic treatment */}
          <div style={{ maxWidth: 860, paddingLeft: 'clamp(0px,12vw,120px)' }} className="max-[767px]:!pl-0">
            {[
              { text: 'Graphic machinery', size: 'clamp(40px,6vw,80px)', weight: 300, color: 'rgba(255,255,255,0.45)', italic: true, delay: 0.08 },
              { text: 'trusted across', size: 'clamp(52px,8vw,108px)', weight: 700, color: '#fff', italic: false, delay: 0.16 },
              { text: 'India & beyond.', size: 'clamp(44px,7vw,94px)', weight: 600, color: '#3B82F6', italic: false, delay: 0.24 },
            ].map((line) => (
              <motion.div
                key={line.text}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: line.delay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: line.size, fontWeight: line.weight,
                  fontStyle: line.italic ? 'italic' : 'normal',
                  color: line.color,
                  lineHeight: 1.0, letterSpacing: '-0.03em',
                  display: 'block',
                }}
              >
                {line.text}
              </motion.div>
            ))}
          </div>

          {/* Sub-copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: 'clamp(28px,4vw,52px)',
              display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap',
            }}
          >
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, fontWeight: 300,
              color: 'rgba(255,255,255,0.38)', lineHeight: 1.85,
              maxWidth: 480, margin: 0,
            }}>
              24+ years supplying, installing and servicing graphic machinery across India, Gulf, Africa and Asia.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
                padding: '13px 28px', background: '#3B82F6', color: '#fff',
                textDecoration: 'none', borderRadius: 4, transition: 'background 0.2s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
              >Talk to us →</Link>
              <Link to="/machinery" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
                padding: '13px 28px', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none', borderRadius: 4, transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3B82F6'; el.style.color = '#3B82F6'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.12)'; el.style.color = 'rgba(255,255,255,0.5)'; }}
              >Machinery →</Link>
            </div>
          </motion.div>

          {/* Stats strip — animated count-up + glow */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: 'clamp(40px,6vw,72px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}
            className="max-[767px]:!grid-cols-2"
          >
            {[
              { count: hc0, suffix: '+', label: 'Years in business', accent: '#3B82F6' },
              { count: hc1, suffix: '+', label: 'Machines placed', accent: '#60A5FA' },
              { count: hc2, suffix: '+', label: 'Customers served', accent: '#3B82F6' },
              { count: hc3, suffix: '+', label: 'Countries reached', accent: '#60A5FA' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: 'clamp(20px,3vw,36px) clamp(16px,2vw,28px)',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  position: 'relative', overflow: 'hidden',
                }}
                className="max-[767px]:!border-r-0 max-[767px]:!border-b"
              >
                {/* Background glow */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse at 20% 50%, ${s.accent}1A 0%, transparent 68%)`,
                  pointerEvents: 'none',
                  opacity: heroOn ? 1 : 0, transition: 'opacity 1.4s ease',
                }} />
                {/* Top fill bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: heroOn ? 1 : 0 }}
                  transition={{ duration: 1.3, delay: 0.7 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, ${s.accent}, ${s.accent}50, transparent)`,
                    transformOrigin: 'left',
                  }}
                />
                {/* Ghost outlined number — depth layer */}
                <div style={{
                  position: 'absolute', bottom: -8, right: -4,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(72px,10vw,130px)', fontWeight: 700,
                  color: 'transparent', WebkitTextStroke: `1px ${s.accent}18`,
                  lineHeight: 1, letterSpacing: '-0.04em',
                  pointerEvents: 'none', userSelect: 'none', zIndex: 0,
                  opacity: heroOn ? 1 : 0, transition: 'opacity 1.2s ease 0.4s',
                }}>
                  {[24, 4000, 2000, 15][i]}{s.suffix}
                </div>
                {/* Live counter */}
                <div style={{ position: 'relative', zIndex: 1, lineHeight: 1, marginBottom: 6, display: 'inline-flex', alignItems: 'baseline', gap: 3 }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(46px,5.8vw,80px)', fontWeight: 700,
                    color: '#fff', letterSpacing: '-0.04em',
                    textShadow: `0 0 40px ${s.accent}65, 0 0 8px ${s.accent}35`,
                  }}>
                    {s.count.toLocaleString()}
                  </span>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(24px,3vw,40px)', fontWeight: 600,
                    color: s.accent, letterSpacing: '-0.02em',
                    textShadow: `0 0 20px ${s.accent}90`,
                  }}>
                    {s.suffix}
                  </span>
                </div>
                {/* Accent underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: heroOn ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.9 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: 1.5, width: '60%',
                    background: `linear-gradient(90deg, ${s.accent}, transparent)`,
                    transformOrigin: 'left', marginBottom: 10, position: 'relative', zIndex: 1,
                  }}
                />
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 8.5, letterSpacing: '0.26em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.32)', fontWeight: 700, position: 'relative', zIndex: 1,
                }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── QUOTE — light ── */}
      <div style={{
        background: '#F8FAFC',
        padding: 'clamp(64px,8vw,100px) 64px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        borderTop: '1px solid rgba(0,0,0,0.07)',
      }}
        className="max-md:!px-7 max-[767px]:!px-5"
      >
        {/* Subtle decorative lines */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 1, height: 48, background: 'linear-gradient(to bottom, transparent, #3B82F6)',
          opacity: quoteReveal.on ? 1 : 0, transition: 'opacity 0.6s',
        }} />
        <div ref={quoteReveal.ref} style={{ maxWidth: 820, margin: '48px auto 0' }}>
          <blockquote style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(28px,4vw,58px)', fontWeight: 300, fontStyle: 'italic',
            color: '#060A10', lineHeight: 1.2, letterSpacing: '-0.01em',
            opacity: quoteReveal.on ? 1 : 0, transform: quoteReveal.on ? 'none' : 'translateY(20px)',
            transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}>
            "We don't sell machines.<br />
            <span style={{ color: '#3B82F6' }}>We build print floors."</span>
          </blockquote>
          <div style={{
            marginTop: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
            opacity: quoteReveal.on ? 1 : 0, transition: 'opacity 0.6s 0.3s',
          }}>
            <div style={{ width: 32, height: 1, background: 'rgba(0,0,0,0.18)' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
              S. Dayaker Reddy · Founder
            </span>
            <div style={{ width: 32, height: 1, background: 'rgba(0,0,0,0.18)' }} />
          </div>
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: 1, height: 48, background: 'linear-gradient(to top, transparent, #3B82F6)',
          opacity: quoteReveal.on ? 1 : 0, transition: 'opacity 0.6s 0.1s',
        }} />
      </div>

      {/* ── TIMELINE — DARK CINEMATIC ── */}
      <div style={{
        background: '#060A10', padding: 'clamp(64px,8vw,100px) 0 clamp(64px,8vw,100px)',
        borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle ambient glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
          width: '80%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)',
          pointerEvents: 'none', filter: 'blur(80px)',
        }} />

        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(16px,5vw,64px)', position: 'relative' }}>
          {/* Section header */}
          <div style={{ marginBottom: 72 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
              Our Story
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 600, lineHeight: 1.0,
              letterSpacing: '-0.02em', color: '#fff',
            }}>
              25 years in the making.
            </h2>
          </div>

          <TimelineProgress>
            <div style={{ paddingLeft: 'clamp(0px,2vw,32px)' }} className="max-[767px]:!pl-0">
              {timeline.map((ch, i) => (
                <TimelineItem key={ch.year} ch={ch} i={i} total={timeline.length} />
              ))}
            </div>
          </TimelineProgress>
        </div>
      </div>

      {/* ── FOUNDERS — WHITE/LIGHT ── */}
      <div ref={foundersReveal.ref} style={{ background: '#fff', padding: '80px 0 100px', borderTop: '1px solid rgba(0,0,0,0.06)' }} className="max-[767px]:!py-12">
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }}
          className="max-md:!px-7 max-[767px]:!px-4"
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

      {/* ── WORLD MAP — full dark ── */}
      <div style={{ background: '#060A10', padding: 'clamp(32px,4vw,52px) 0 clamp(28px,3vw,44px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(16px,5vw,64px)' }}>

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
                Global Presence
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#fff', margin: 0 }}>
                Offices across India,<br />
                <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.38)' }}>Africa & Asia.</span>
              </h2>
            </div>
            {/* Quick stats */}
            <div style={{ display: 'flex', gap: 0, border: '1px solid rgba(255,255,255,0.08)' }}>
              {[{ val: '15+', label: 'Countries' }, { val: '8', label: 'Offices' }, { val: '3', label: 'Continents' }].map((s, si) => (
                <div key={s.label} style={{
                  padding: '16px 24px', textAlign: 'center',
                  borderRight: si < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  background: 'rgba(255,255,255,0.03)',
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div style={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
            <WorldPresenceMap />
          </div>

          {/* Legend row */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {LEGEND.map((l) => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: l.color, flexShrink: 0,
                  boxShadow: `0 0 6px ${l.color}70`,
                  border: l.color === '#ffffff' ? '1px solid rgba(255,255,255,0.3)' : 'none',
                }} />
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{l.label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.28)', marginTop: 1 }}>{l.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA — light ── */}
      <div style={{
        background: '#F8FAFC', padding: '100px 64px', textAlign: 'center',
        borderTop: '1px solid rgba(0,0,0,0.07)',
      }}
        className="max-md:!px-7 max-md:!py-16 max-[767px]:!px-5 max-[767px]:!py-12"
      >
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 22 }}>
            <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700 }}>
              Let's Talk
            </span>
            <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 300,
            color: '#060A10', lineHeight: 1.08, marginBottom: 44,
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
              border: '1px solid rgba(0,0,0,0.15)', color: 'rgba(0,0,0,0.5)',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3B82F6'; el.style.color = '#3B82F6'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,0,0,0.15)'; el.style.color = 'rgba(0,0,0,0.5)'; }}
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
