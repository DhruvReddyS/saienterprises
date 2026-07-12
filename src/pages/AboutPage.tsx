import { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageMeta } from '@/lib/seo';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import PageTransition from '@/components/PageTransition';
import { LEGEND } from '@/components/presence/WorldPresenceMap';
import RotatingEarth from '@/components/ui/wireframe-dotted-globe';
import BrandImage from '@/components/BrandImage';
import { BorderBeam } from '@/components/ui/border-beam';
import { GlowCard } from '@/components/ui/spotlight-card';
import saiLogo from '@/assets/sai-logo-cmyk.png';
import heroImage from '@/assets/hero-printing.jpg';
import dayakerPhoto from '@/assets/founders/dayaker-reddy.jpg';
import phaniPhoto from '@/assets/founders/phani-kumar.png';

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

const SmoothCounter = memo(({ target, started }: { target: number; started: boolean }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) {
      setValue(0);
      return;
    }
    setValue(0);
    let frame = 0;
    const totalFrames = 70;
    const timer = window.setInterval(() => {
      frame = Math.min(totalFrames, frame + 1);
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.max(0, Math.min(target, Math.round(target * eased)));
      setValue(nextValue);
      if (frame >= totalFrames) {
        setValue(target);
        window.clearInterval(timer);
      }
    }, 18);
    return () => window.clearInterval(timer);
  }, [started, target]);
  return <>{value.toLocaleString()}</>;
});
SmoothCounter.displayName = 'SmoothCounter';

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
    body: 'Operations began with a sharp focus on production-ready graphic machinery. From day one, Sai secured the exclusive HPM agency for India, making it the sole authorised source for HPM paper cutters in the country. Founded by Mr. S. Dayaker Reddy and Mr. G. Phani Kumar.',
    accent: '#3B82F6',
  },
  {
    year: '2010',
    title: 'National Presence Built',
    body: 'Regional support expanded to New Delhi, Pune, and Vijayawada. Sales partners were established in Kolkata, Mumbai, Ahmedabad, Jaipur, Bangalore, Coimbatore and Goa, shortening response time and deepening client relationships across India.',
    accent: '#6366F1',
  },
  {
    year: '2015',
    title: 'Nairobi Office, Africa Entry',
    body: 'A dedicated Nairobi office strengthened East Africa support. Export relationships to Sri Lanka, Nepal, UAE, Oman, and multiple African markets cemented Sai as a pan-world machinery supplier built from Hyderabad.',
    accent: '#0EA5E9',
  },
  {
    year: '2026',
    title: 'One Partner, Every Production Stage',
    body: '4000+ machines placed. 2000+ customers served across commercial printers, packaging converters, newspaper groups, and stationery manufacturers. 490+ programmable HPM paper cutters sold, 90% market share in fully automatic paper cutters across India. One supplier for the entire production chain.',
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
    image: dayakerPhoto,
    imagePosition: 'center 8%',
    desc: 'Leads strategic vision and key commercial relationships. Built the HPM partnership from 2000 and continues to drive national expansion.',
  },
  {
    name: 'G. Phani Kumar',
    role: 'Co-Founder & Director',
    image: phaniPhoto,
    imagePosition: 'center 12%',
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
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(36px,4.5vw,58px)', fontWeight: 700,
              color: '#060A10', lineHeight: 1, letterSpacing: '-0.025em',
              position: 'relative',
            }}>
              {vals[i].toLocaleString()}{s.suffix}
            </div>
            <div style={{
              fontFamily: "'Manrope', sans-serif",
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

/* ── Timeline, cinematic spine ── */
const TimelineItem = ({ ch, i, total }: { ch: typeof timeline[0]; i: number; total: number }) => {
  const isLast = i === total - 1;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '88px 44px 1fr' }}
      className="max-[767px]:!grid-cols-[36px_1fr]"
    >
      {/* Year, desktop */}
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ paddingTop: 4, paddingRight: 16, textAlign: 'right' }}
        className="max-[767px]:!hidden"
      >
        <span style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(18px,1.8vw,24px)', fontWeight: 700,
          color: ch.accent, letterSpacing: '-0.02em',
        }}>{ch.year}</span>
      </motion.div>

      {/* Spine, dot only */}
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
          paddingBottom: isLast ? 0 : 'clamp(44px,6vw,72px)',
          position: 'relative',
        }}
      >
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: 'clamp(20px,2.8vw,32px)',
            borderRadius: 22,
            background: `linear-gradient(135deg, ${ch.accent}12 0%, rgba(255,255,255,0.045) 42%, rgba(255,255,255,0.018) 100%)`,
            border: `1px solid ${ch.accent}24`,
            boxShadow: '0 26px 80px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.055)',
          }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '42%',
              height: 2,
              background: `linear-gradient(90deg, ${ch.accent}, transparent)`,
              transformOrigin: 'left',
            }}
          />

          {/* Ghost year watermark */}
          <div style={{
            position: 'absolute', right: 18, top: 14,
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(54px,8vw,112px)', fontWeight: 800, fontStyle: 'italic',
            color: `${ch.accent}09`, WebkitTextStroke: `1px ${ch.accent}10`,
            pointerEvents: 'none', userSelect: 'none', lineHeight: 1, zIndex: 0,
            letterSpacing: '-0.05em',
          }}>{ch.year}</div>

          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 12px',
            marginBottom: 18,
            borderRadius: 999,
            background: `${ch.accent}14`,
            border: `1px solid ${ch.accent}26`,
            color: ch.accent,
            fontFamily: "'Manrope', sans-serif",
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 800,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: ch.accent, boxShadow: `0 0 14px ${ch.accent}` }} />
            {ch.year} · Milestone {String(i + 1).padStart(2, '0')}
          </div>

          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(24px,3vw,40px)', fontWeight: 700,
              color: '#fff', lineHeight: 1.05, letterSpacing: '-0.025em',
              marginBottom: 16, position: 'relative', zIndex: 1,
              maxWidth: 680,
            }}
          >{ch.title}</motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(13px,1.3vw,15px)', color: 'rgba(255,255,255,0.58)',
              lineHeight: 1.9, maxWidth: 650, margin: 0, position: 'relative', zIndex: 1,
            }}
          >{ch.body}</motion.p>
        </motion.div>
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
        style={{ width: '100%', padding: 0, overflow: 'hidden' }}
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
          fontFamily: "'Manrope', sans-serif",
          fontSize: 64, fontWeight: 700, color: '#3B82F6',
          opacity: hov ? 0.06 : 0.03, lineHeight: 1,
          transition: 'opacity 0.4s', userSelect: 'none',
          letterSpacing: '-0.04em',
        }}>
          {String(i + 1).padStart(2, '0')}
        </div>
        {hov && <BorderBeam colorFrom="#3B82F6" colorTo="#60A5FA" duration={6} delay={0} borderWidth={1} size={160} />}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(210px, 0.72fr) 1.28fr', minHeight: 320 }} className="max-[700px]:!grid-cols-1">
          <div style={{ minHeight: 320, overflow: 'hidden', background: '#E9EEF5', position: 'relative' }} className="max-[700px]:!min-h-[370px]">
            <img
              src={person.image}
              alt={`${person.name}, ${person.role} at Sai Enterprises`}
              loading="lazy"
              style={{
                width: '100%', height: '100%', display: 'block', objectFit: 'cover',
                objectPosition: person.imagePosition,
                filter: hov ? 'saturate(1.03) contrast(1.02)' : 'saturate(0.94)',
                transform: hov ? 'scale(1.09)' : 'scale(1.065)', transformOrigin: i === 0 ? '50% 8%' : '50% 12%',
                transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 68%,rgba(6,10,16,0.18))', pointerEvents: 'none' }} />
          </div>
          <div style={{ padding: 'clamp(26px,4vw,44px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 8.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 18, fontWeight: 700 }}>
              {i === 0 ? 'Founder' : 'Co-Founder'} · Leadership
            </div>
            <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(26px,2.7vw,36px)', fontWeight: 650, color: '#060A10', lineHeight: 1.05, marginBottom: 10, letterSpacing: '-0.025em' }}>
              {person.name}
            </h3>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9, letterSpacing: '0.17em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)', marginBottom: 26 }}>
              {person.role}
            </div>
            <div style={{ width: 34, height: 2, background: '#3B82F6', marginBottom: 24 }} />
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: 'rgba(0,0,0,0.52)', lineHeight: 1.9, margin: 0, maxWidth: 520 }}>
              {person.desc}
            </p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
};

/* ── Main page ── */
const AboutPage = () => {
  const quoteReveal = useReveal(0.2);
  const foundersReveal = useReveal(0.1);
  const heroOn = true;

  useEffect(() => {
    setPageMeta(
      'About Us | Sai Enterprises, Graphic Machinery Since 2000',
      'Learn about Sai Enterprises, 24+ years of graphic machinery expertise. HPM sole agent in India, serving printers across India and East Africa.',
    );
  }, []);

  return (
    <PageTransition>
      <Header />

      {/* ── HERO, premium redesign ── */}
      <div style={{
        background: '#060A10',
        position: 'relative', overflow: 'hidden',
        height: '100dvh', minHeight: 680, display: 'flex', flexDirection: 'column',
      }} className="max-[767px]:!h-auto max-[767px]:!min-h-0">
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.045) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Center radial glow */}
        <div style={{
          position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '85vw', height: '60vw', maxWidth: 1200, maxHeight: 760,
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.10) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Ghost brand watermark, right bleed */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', right: '-5%', top: '46%', transform: 'translateY(-52%)',
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(180px,25vw,380px)', fontWeight: 700, fontStyle: 'italic',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(59,130,246,0.065)',
            pointerEvents: 'none', userSelect: 'none', zIndex: 1,
            letterSpacing: '-0.06em', lineHeight: 1,
          }}
        >SAI</motion.div>

        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.55) 45%, transparent)',
          pointerEvents: 'none',
        }} />

        {/* Main content, vertically centered */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', width: '100%', padding: 'clamp(74px,8.5vh,88px) clamp(16px,5vw,80px) clamp(18px,3vh,32px)', position: 'relative', zIndex: 2 }}
          className="max-[767px]:!pt-16 max-[767px]:!pb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 'clamp(16px,2.5vh,26px)' }}
          >
            <div style={{ width: 30, height: 1, background: '#3B82F6' }} />
            <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#60A5FA' }}>
              About Sai Enterprises
            </div>
          </motion.div>

          {/* Brand mark + headline */}
          <div
            style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) clamp(135px,16vw,215px)', alignItems: 'center', gap: 'clamp(28px,5vw,72px)' }}
            className="max-[700px]:!grid-cols-[minmax(0,1fr)_90px] max-[700px]:!gap-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 28 }} animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="order-2 justify-self-end"
              style={{ width: '100%', position: 'relative', padding: '12px 0' }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: '72%', height: 1, background: 'linear-gradient(90deg,transparent,#3B82F6)' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '42%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(96,165,250,0.45))' }} />
              <div style={{ position: 'absolute', inset: '-25%', background: 'radial-gradient(circle,rgba(59,130,246,0.12),transparent 64%)', pointerEvents: 'none' }} />
              <img src={saiLogo} alt="Sai Enterprises" style={{ width: '100%', height: 'auto', display: 'block', position: 'relative', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.42))' }} />
            </motion.div>

          {/* Headline, premium stacked treatment */}
          <div style={{ maxWidth: 1100, position: 'relative', order: 1 }}>
            {/* Vertical accent bar */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', left: 'clamp(-20px,-2vw,-30px)', top: 8, bottom: 8,
                width: 2,
                background: 'linear-gradient(to bottom, transparent, #3B82F6 30%, #60A5FA 70%, transparent)',
                transformOrigin: 'top',
              }}
              className="max-md:!hidden"
            />

            {[
              { text: 'Machines move production.', size: 'clamp(28px,3.8vw,50px)', weight: 300, color: 'rgba(255,255,255,0.58)', italic: true, delay: 0.08 },
              { text: 'Relationships move', size: 'clamp(46px,7vw,90px)', weight: 700, color: '#fff', italic: false, delay: 0.16 },
              { text: 'business.', size: 'clamp(42px,6.4vw,82px)', weight: 600, color: '#3B82F6', italic: false, delay: 0.24, glow: true },
            ].map((line) => (
              <motion.div
                key={line.text}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: line.delay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: line.size, fontWeight: line.weight,
                  fontStyle: line.italic ? 'italic' : 'normal',
                  color: line.color,
                  lineHeight: 1.0, letterSpacing: '-0.03em',
                  display: 'block',
                  textShadow: line.glow ? '0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(59,130,246,0.18)' : 'none',
                }}
              >
                {line.text}
              </motion.div>
            ))}
          </div>
          </div>

          {/* Sub-copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: 'clamp(14px,2.4vh,22px)',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16,
            }}
          >
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 13, fontWeight: 300,
              color: 'rgba(255,255,255,0.42)', lineHeight: 1.65,
              maxWidth: 520, margin: 0,
            }}>
              One trusted machinery partner, from the first production-floor conversation to installation, service and long-term growth across India and global markets.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{
                fontFamily: "'Manrope', sans-serif", fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
                padding: '13px 28px', background: '#3B82F6', color: '#fff',
                textDecoration: 'none', borderRadius: 4, transition: 'background 0.2s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
              >Talk to us →</Link>
              <Link to="/machinery" style={{
                fontFamily: "'Manrope', sans-serif", fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
                padding: '13px 28px', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none', borderRadius: 4, transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3B82F6'; el.style.color = '#3B82F6'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.12)'; el.style.color = 'rgba(255,255,255,0.5)'; }}
              >Machinery →</Link>
            </div>
          </motion.div>

          {/* Stats strip, premium card grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: 'clamp(18px,2.8vh,30px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
            }}
            className="max-[767px]:!grid-cols-2"
          >
            {[
              { suffix: '+', label: 'Years in business', hint: 'Since the year 2000', accent: '#3B82F6', target: 24 },
              { suffix: '+', label: 'Machines placed', hint: 'Pre-press to packaging', accent: '#60A5FA', target: 4000 },
              { suffix: '+', label: 'Customers served', hint: 'Across every print floor', accent: '#A78BFA', target: 2000 },
              { suffix: '+', label: 'Countries reached', hint: 'India · Gulf · Africa · Asia', accent: '#34D399', target: 15 },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: 'clamp(14px,2vh,20px) clamp(15px,1.9vw,24px)',
                  position: 'relative', overflow: 'hidden',
                  background: `${s.accent}0A`,
                  border: `1px solid ${s.accent}22`,
                  borderRadius: 0,
                  cursor: 'default',
                }}
              >
                {/* Background glow */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse at 30% 50%, ${s.accent}1F 0%, transparent 70%)`,
                  pointerEvents: 'none',
                  opacity: 1,
                }} />
                {/* Top fill bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: heroOn ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, ${s.accent}, ${s.accent}60, transparent)`,
                    transformOrigin: 'left',
                  }}
                />
                {/* Ghost outlined number, depth layer */}
                <div style={{
                  position: 'absolute', bottom: -4, right: 8,
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 'clamp(34px,4vw,56px)', fontWeight: 800,
                  color: `${s.accent}0C`, WebkitTextStroke: `1px ${s.accent}10`,
                  lineHeight: 1, letterSpacing: '-0.04em',
                  pointerEvents: 'none', userSelect: 'none', zIndex: 0,
                  opacity: heroOn ? 1 : 0, transition: 'opacity 0.7s ease 0.15s',
                }}>
                  {s.target.toLocaleString()}{s.suffix}
                </div>

                {/* Small dot indicator */}
                <div style={{
                  position: 'absolute', top: 14, right: 16,
                  width: 6, height: 6, borderRadius: '50%',
                  background: s.accent,
                  boxShadow: `0 0 12px ${s.accent}AA`,
                  opacity: heroOn ? 1 : 0, transition: 'opacity 0.5s ease 0.25s',
                }} />

                {/* Eyebrow label */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 8.5, letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: `${s.accent}DD`, fontWeight: 700,
                  marginBottom: 7,
                }}>
                  0{i + 1}
                </div>

                {/* Live counter */}
                <div style={{ position: 'relative', zIndex: 1, lineHeight: 1, marginBottom: 12, display: 'inline-flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 'clamp(34px,4vw,56px)', fontWeight: 700,
                    color: '#fff', letterSpacing: '-0.04em',
                    textShadow: `0 0 40px ${s.accent}75, 0 0 12px ${s.accent}45`,
                  }}>
                    <SmoothCounter target={s.target} started={heroOn} />
                  </span>
                  <span style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 'clamp(19px,2.3vw,29px)', fontWeight: 600,
                    color: s.accent, letterSpacing: '-0.02em',
                    textShadow: `0 0 24px ${s.accent}`,
                  }}>
                    {s.suffix}
                  </span>
                </div>

                {/* Accent underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: heroOn ? 1 : 0 }}
                  transition={{ duration: 0.65, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: 1.5, width: '50%',
                    background: `linear-gradient(90deg, ${s.accent}, transparent)`,
                    transformOrigin: 'left', marginBottom: 7, position: 'relative', zIndex: 1,
                  }}
                />

                {/* Label */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: '#fff', fontWeight: 700,
                  marginBottom: 2,
                }}>
                  {s.label}
                </div>

                {/* Hint */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 10.5, color: 'rgba(255,255,255,0.4)',
                  fontStyle: 'italic', lineHeight: 1.4,
                }}>
                  {s.hint}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
        </div>
      </div>

      {/* ── QUOTE, light ── */}
      <div style={{
        background: '#F8FAFC',
        padding: 'clamp(48px,6vw,72px) 64px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        borderTop: '1px solid rgba(0,0,0,0.07)',
      }}
        className="about-deferred max-md:!px-7 max-[767px]:!px-5"
      >
        {/* Subtle decorative lines */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 1, height: 48, background: 'linear-gradient(to bottom, transparent, #3B82F6)',
          opacity: quoteReveal.on ? 1 : 0, transition: 'opacity 0.6s',
        }} />
        <div ref={quoteReveal.ref} style={{ maxWidth: 820, margin: '48px auto 0' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24,
            fontFamily: "'Manrope', sans-serif", fontSize: 9, fontWeight: 800,
            letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3B82F6',
            opacity: quoteReveal.on ? 1 : 0, transition: 'opacity 0.6s 0.05s',
          }}>
            <span style={{ width: 28, height: 1, background: '#3B82F6', display: 'inline-block' }} />
            What We Stand For
            <span style={{ width: 28, height: 1, background: '#3B82F6', display: 'inline-block' }} />
          </div>
          <motion.blockquote
            initial={false}
            animate={{ opacity: quoteReveal.on ? 1 : 0, y: quoteReveal.on ? 0 : 20 }}
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(30px,4.4vw,62px)', fontWeight: 500,
            color: '#060A10', lineHeight: 1.2, letterSpacing: '-0.01em',
            cursor: 'default',
          }}>
            “We believe in<br />
            <span style={{
              display: 'inline-block', color: '#fff', background: '#3B82F6',
              padding: '0.04em 0.22em 0.1em', marginTop: 8,
              boxShadow: '0 14px 42px rgba(59,130,246,0.22)',
            }}>long-term relationships.</span>”
          </motion.blockquote>
          <div style={{
            marginTop: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
            opacity: quoteReveal.on ? 1 : 0, transition: 'opacity 0.6s 0.3s',
          }}>
            <div style={{ width: 32, height: 1, background: 'rgba(0,0,0,0.18)' }} />
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
              Sai Enterprises · Our Guiding Principle
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

      {/* ── TIMELINE, DARK CINEMATIC ── */}
      <div className="about-deferred" style={{
        background: '#060A10', padding: 'clamp(48px,6vw,72px) 0',
        borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle ambient glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
          width: '80%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(16px,5vw,64px)', position: 'relative' }}>
          {/* Section header */}
          <div style={{ marginBottom: 72 }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
              Our Story
            </div>
            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
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

      {/* ── FOUNDERS, WHITE/LIGHT ── */}
      <div ref={foundersReveal.ref} style={{ background: '#fff', padding: 'clamp(48px,6vw,72px) 0', borderTop: '1px solid rgba(0,0,0,0.06)' }} className="about-deferred max-[767px]:!py-12">
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }}
          className="max-md:!px-7 max-[767px]:!px-4"
        >
          <div style={{ marginBottom: 52 }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
              Leadership
            </div>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#060A10' }}>
              The people behind Sai.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20, maxWidth: 960, margin: '0 auto' }}>
            {team.map((person, i) => (
              <TeamCard key={person.name} person={person} i={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── WORLD MAP, full dark ── */}
      <div style={{ background: '#060A10', padding: 'clamp(32px,4vw,52px) 0 clamp(28px,3vw,44px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(16px,5vw,64px)' }}>

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
                Global Presence
              </div>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#fff', margin: 0 }}>
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
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive globe, adapted to the Sai visual system */}
          <div style={{
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 28,
            maxWidth: 980,
            margin: '0 auto',
            background: 'radial-gradient(circle at 50% 45%, rgba(59,130,246,0.10), transparent 65%)',
            boxShadow: '0 32px 90px rgba(0,0,0,0.28)',
          }}>
            <RotatingEarth />
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
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{l.label}</div>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.28)', marginTop: 1 }}>{l.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA, light ── */}
      <div style={{
        background: '#F8FAFC', padding: 'clamp(48px,6vw,72px) 64px', textAlign: 'center',
        borderTop: '1px solid rgba(0,0,0,0.07)',
      }}
        className="max-md:!px-7 max-md:!py-16 max-[767px]:!px-5 max-[767px]:!py-12"
      >
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 22 }}>
            <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700 }}>
              Let's Talk
            </span>
            <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
          </div>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 300,
            color: '#060A10', lineHeight: 1.08, marginBottom: 44,
            letterSpacing: '-0.02em',
          }}>
            Discuss your machinery<br />requirement with us.
          </h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              fontFamily: "'Manrope', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
              padding: '14px 36px', background: '#3B82F6', color: '#fff',
              textDecoration: 'none', transition: 'background 0.2s',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
            >
              Start a Conversation →
            </Link>
            <Link to="/machinery" style={{
              fontFamily: "'Manrope', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
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
