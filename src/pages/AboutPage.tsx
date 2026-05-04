import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import WorldPresenceMap from '@/components/presence/WorldPresenceMap';
import BrandImage from '@/components/BrandImage';
import saiLogo from '@/assets/sai-logo-cmyk.png';
import heroImage from '@/assets/hero-industrial.jpg';

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
    body: '4000+ machines placed. 4100+ customers served across commercial printers, packaging converters, newspaper groups, and stationery manufacturers. 490+ programmable HPM paper cutters sold — 90% market share in fully automatic paper cutters across India. One supplier for the entire production chain.',
    accent: '#10B981',
  },
];

const stats = [
  { label: 'Years', value: 24, suffix: '+' },
  { label: 'Machines Placed', value: 4000, suffix: '+' },
  { label: 'Customers', value: 4100, suffix: '+' },
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
      gap: 1, background: 'rgba(255,255,255,0.04)',
      marginTop: 72,
    }}
      className="max-sm:grid-cols-2"
    >
      {stats.map((s, i) => (
        <div key={s.label} style={{
          padding: '36px 24px', background: '#060A10', textAlign: 'center',
          opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(18px)',
          transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700,
            color: '#fff', lineHeight: 1, letterSpacing: '-0.02em',
          }}>
            {vals[i]}{s.suffix}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)', marginTop: 8,
          }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Timeline item (white section) ── */
const TimelineItem = ({ ch, i }: { ch: typeof timeline[0]; i: number }) => {
  const { ref, on } = useReveal(0.15);
  return (
    <div ref={ref} style={{ display: 'flex', gap: 0, position: 'relative' }}>
      {/* Year column */}
      <div style={{
        width: 100, flexShrink: 0, paddingTop: 3,
        opacity: on ? 1 : 0, transform: on ? 'none' : 'translateX(-16px)',
        transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
      }}
        className="max-sm:hidden"
      >
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(18px,2vw,28px)', fontWeight: 700,
          color: ch.accent, letterSpacing: '-0.02em',
        }}>
          {ch.year}
        </div>
      </div>

      {/* Line + dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 28, flexShrink: 0 }}>
        <div style={{
          width: 11, height: 11, borderRadius: '50%',
          background: ch.accent, flexShrink: 0, marginTop: 5,
          boxShadow: `0 0 12px ${ch.accent}50`,
          opacity: on ? 1 : 0, transition: `opacity 0.4s ${i * 0.1 + 0.2}s`,
        }} />
        {i < timeline.length - 1 && (
          <div style={{
            width: 1, flex: 1, marginTop: 8, minHeight: 48,
            background: `linear-gradient(to bottom, ${ch.accent}40, rgba(0,0,0,0.08))`,
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{
        paddingBottom: 60,
        opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(20px)',
        transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1 + 0.05}s`,
      }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: ch.accent, marginBottom: 8 }}
          className="sm:hidden"
        >{ch.year}</div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 600,
          color: '#060A10', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 12,
        }}>
          {ch.title}
        </h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13.5, color: 'rgba(0,0,0,0.52)', lineHeight: 1.85, maxWidth: 520,
        }}>
          {ch.body}
        </p>
      </div>
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
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '44px 36px',
        background: hov ? 'rgba(59,130,246,0.04)' : '#fff',
        border: `1px solid ${hov ? 'rgba(59,130,246,0.2)' : 'rgba(0,0,0,0.07)'}`,
        position: 'relative', overflow: 'hidden', cursor: 'default',
        transition: 'all 0.4s ease',
        boxShadow: hov ? '0 8px 28px rgba(59,130,246,0.08)' : '0 1px 6px rgba(0,0,0,0.04)',
        opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(24px)',
        transitionDelay: `${i * 0.12}s`,
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: '#3B82F6',
        transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
      }} />
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 14 }}>
        Co-Founder
      </div>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 600, color: '#060A10', lineHeight: 1.1, marginBottom: 6,
      }}>
        {person.name}
      </h3>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 18 }}>
        {person.role}
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(0,0,0,0.52)', lineHeight: 1.8 }}>
        {person.desc}
      </p>
    </div>
  );
};

/* ── Main page ── */
const AboutPage = () => {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const quoteReveal = useReveal(0.2);
  const foundersReveal = useReveal(0.1);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageTransition>
      <Header />

      {/* ── HERO — dark ── */}
      <div style={{
        background: '#060A10', paddingTop: 140, paddingBottom: 80,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <img src={heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.04, filter: 'grayscale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, #060A10)' }} />
        </div>

        <div style={{
          position: 'absolute', top: 30, left: -10,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(80px,14vw,200px)', fontWeight: 700,
          color: 'rgba(255,255,255,0.018)', lineHeight: 0.9,
          pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.04em',
        }}>
          SAI
        </div>

        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 2 }}
          className="max-md:!px-7"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}
            className="max-md:grid-cols-1 max-md:gap-12"
          >
            {/* Left: text */}
            <div>
              {/* Logo */}
              <div style={{
                marginBottom: 44,
                opacity: heroRevealed ? 1 : 0, transform: heroRevealed ? 'none' : 'translateY(12px)',
                transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
              }}>
                <BrandImage src={saiLogo} alt="Sai Enterprises" style={{ height: 30, opacity: 0.65 }} />
              </div>

              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
                color: '#3B82F6', marginBottom: 22,
                display: 'flex', alignItems: 'center', gap: 12,
                opacity: heroRevealed ? 1 : 0, transition: 'all 0.7s 0.05s',
              }}>
                <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
                Est. 2000 · Hyderabad
              </div>

              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(48px,7vw,96px)', fontWeight: 600,
                lineHeight: 0.92, letterSpacing: '-0.025em',
                color: '#fff', maxWidth: 680,
                opacity: heroRevealed ? 1 : 0, transform: heroRevealed ? 'none' : 'translateY(24px)',
                transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.08s',
              }}>
                Machinery supply<br />
                <span style={{ color: '#3B82F6', fontStyle: 'italic', fontWeight: 300 }}>built around</span><br />
                execution.
              </h1>

              <p style={{
                marginTop: 36, fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.85,
                maxWidth: 480,
                opacity: heroRevealed ? 1 : 0, transform: heroRevealed ? 'none' : 'translateY(14px)',
                transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.16s',
              }}>
                Sai Enterprises is a graphic machinery supplier with 24+ years of unbroken market continuity. We support 4100+ customers — printers and packaging units — across India, Gulf, Africa and Asia. Sister concern: Gutenberg (est. 2008, Hyderabad & Nairobi).
              </p>
            </div>

            {/* Right: logo + visual panel */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 24,
              opacity: heroRevealed ? 1 : 0, transform: heroRevealed ? 'none' : 'translateX(20px)',
              transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
              className="max-md:items-start"
            >
              {/* Large logo display */}
              <div style={{
                width: '100%', maxWidth: 400,
                padding: '24px 0 10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <BrandImage src={saiLogo} alt="Sai Enterprises" style={{
                  width: '100%', maxWidth: 200, opacity: 0.85,
                  position: 'relative', zIndex: 1,
                }} />
              </div>

              {/* Tagline card */}
              <div style={{
                background: '#3B82F6',
                padding: '20px 28px', maxWidth: 400, width: '100%',
              }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                  Our Mission
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 500, color: '#fff', lineHeight: 1.3 }}>
                  One trusted partner for the entire print production chain.
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <StatsRow />
        </div>
      </div>

      {/* ── QUOTE — dark ── */}
      <div style={{
        background: '#060A10', padding: '100px 64px',
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
            className="max-md:grid-cols-1"
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
              className="max-md:grid-cols-1 max-md:gap-4"
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

      {/* ── OFFICES — white/light ── */}
      <OfficesStrip />

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

      <Footer />
    </PageTransition>
  );
};

/* ── Offices strip — white/light ── */
const offices = [
  { city: 'Hyderabad', role: 'Headquarters', country: 'India', accent: '#FACC15' },
  { city: 'New Delhi', role: 'Sales Office', country: 'India', accent: null },
  { city: 'Mumbai', role: 'Sales Office', country: 'India', accent: null },
  { city: 'Meerut', role: 'Sales Office', country: 'India (UP)', accent: null },
  { city: 'Pune', role: 'Sales Office', country: 'India', accent: null },
  { city: 'Vijayawada', role: 'Sales Office', country: 'India', accent: null },
  { city: 'Nairobi', role: 'Overseas Office', country: 'Kenya', accent: '#3B82F6' },
  { city: 'Addis Ababa', role: 'Overseas Office', country: 'Ethiopia', accent: '#3B82F6' },
  { city: 'Colombo', role: 'Overseas Office', country: 'Sri Lanka', accent: '#3B82F6' },
];

const OfficesStrip = () => {
  const { ref, on } = useReveal(0.15);
  return (
    <div ref={ref} style={{ background: '#F4F6FB', padding: '80px 64px', borderTop: '1px solid rgba(0,0,0,0.06)' }}
      className="max-md:!px-7"
    >
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
            Where We Operate
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 600, color: '#060A10', letterSpacing: '-0.02em', lineHeight: 1 }}>
            6 India offices. 3 overseas.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: 'rgba(0,0,0,0.45)', lineHeight: 1.7, marginTop: 10, maxWidth: 520 }}>
            Sister concern <strong style={{ color: '#060A10' }}>Gutenberg</strong> (est. 2008) operates from Hyderabad and Nairobi, extending our print ecosystem reach across East Africa.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 1, background: 'rgba(0,0,0,0.08)' }}>
          {offices.map((o, i) => (
            <div key={o.city} style={{
              padding: '24px 20px',
              background: '#fff', position: 'relative', overflow: 'hidden',
              opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(16px)',
              transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
              borderTop: `2px solid ${o.accent ?? 'rgba(0,0,0,0.08)'}`,
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: '#060A10', marginBottom: 4 }}>
                {o.city}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: o.accent === '#FACC15' ? '#B45309' : o.accent === '#3B82F6' ? '#2563EB' : 'rgba(0,0,0,0.4)', marginBottom: 4 }}>
                {o.role}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(0,0,0,0.35)' }}>
                {o.country}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
