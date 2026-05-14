import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  text: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  city?: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Most trustworthy supplier. Their professionalism and reliability are unmatched in the industry.",
    name: "Nagulagam Jayendra",
    role: "Director",
    company: "Printfast Zambia Limited",
    rating: 5,
    city: "Lusaka",
  },
  {
    text: "Very happy with the HPM cutting machine. Really appreciate the proactive service — the team is always there when you need them.",
    name: "Varun Thomas",
    role: "Director",
    company: "Anaswara Offset Pvt Ltd",
    rating: 5,
    city: "Kochi",
  },
  {
    text: "Very good after sales service by Team Sai. They go above and beyond to ensure everything runs smoothly.",
    name: "Dayaker Reddy S",
    role: "MD",
    company: "Sai Enterprises",
    rating: 5,
    city: "Hyderabad",
  },
  {
    text: "Quick solution centre with exceptional response times. Sai Enterprises is our go-to partner for machinery support.",
    name: "Pranith Reddy",
    role: "MD",
    company: "Digiprint Systems (U) Ltd",
    rating: 5,
    city: "Kampala",
  },
  {
    text: "The HPM paper cutter is an industry benchmark. Sai Enterprises made the entire process seamless from selection to installation.",
    name: "Ravi Shankar",
    role: "Production Manager",
    company: "Offset Solutions",
    rating: 5,
    city: "Chennai",
  },
  {
    text: "24 years in the business shows in every interaction. Their knowledge of machinery and commitment to clients is second to none.",
    name: "Meena Kumari",
    role: "CEO",
    company: "PrintMaster India",
    rating: 5,
    city: "Bangalore",
  },
  {
    text: "From pre-press to post-press, Sai Enterprises has been our one-stop partner for all machinery needs across our plants.",
    name: "Arjun Mehta",
    role: "Operations Director",
    company: "Colour Graphics",
    rating: 5,
    city: "Mumbai",
  },
  {
    text: "Their corrugation machinery lineup is outstanding. We've scaled our packaging output 3× since partnering with Sai.",
    name: "Suresh Naidu",
    role: "Plant Head",
    company: "PackSmart",
    rating: 5,
    city: "Hyderabad",
  },
  {
    text: "Exclusive HPM agent in India — that says everything. Quality machines, genuine spares, and expert service every time.",
    name: "Deepika Rao",
    role: "Procurement Head",
    company: "Premier Print",
    rating: 5,
    city: "Delhi",
  },
];

const Stars = ({ n, size = 13 }: { n: number; size?: number }) => (
  <div style={{ display: 'flex', gap: 3 }}>
    {[1,2,3,4,5].map(s => (
      <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill={s<=n?'#FACC15':'rgba(255,255,255,0.1)'} stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

/* ── Desktop card — 3 at a time ── */
const Card = ({
  t, variant, onClick,
}: {
  t: Testimonial;
  variant: 'center' | 'side';
  onClick?: () => void;
}) => {
  const [hov, setHov] = useState(false);
  const isCenter = variant === 'center';

  return (
    <motion.div
      layout
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={!isCenter ? { scale: 1.02, y: -4 } : { y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        cursor: !isCenter ? 'pointer' : 'default',
        position: 'relative',
      }}
    >
      <div style={{
        background: isCenter
          ? 'linear-gradient(145deg, rgba(14,26,52,0.98) 0%, rgba(10,18,40,1) 100%)'
          : hov
          ? 'rgba(255,255,255,0.04)'
          : 'rgba(255,255,255,0.025)',
        border: isCenter
          ? '1px solid rgba(59,130,246,0.35)'
          : `1px solid ${hov ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 18,
        padding: isCenter ? '36px 38px 30px' : '28px 28px 24px',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isCenter
          ? '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.06)'
          : hov ? '0 20px 50px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.2)',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Accent top bar */}
        {isCenter && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, #3B82F6, #60A5FA 60%, transparent)',
          }} />
        )}

        {/* Watermark quote */}
        <div style={{
          position: 'absolute', top: -4, right: 18,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: isCenter ? 120 : 80, lineHeight: 1,
          color: isCenter ? 'rgba(59,130,246,0.07)' : 'rgba(255,255,255,0.03)',
          userSelect: 'none', pointerEvents: 'none',
        }}>"</div>

        <Stars n={t.rating} size={isCenter ? 13 : 11} />

        <p style={{
          fontFamily: isCenter ? "'Cormorant Garamond', serif" : "'DM Sans', sans-serif",
          fontSize: isCenter ? 17 : 13,
          fontStyle: isCenter ? 'italic' : 'normal',
          lineHeight: isCenter ? 1.76 : 1.65,
          color: isCenter ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.48)',
          marginTop: 14, flexGrow: 1,
          display: '-webkit-box',
          WebkitLineClamp: isCenter ? 5 : 4,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden',
        }}>
          "{t.text}"
        </p>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 11,
          paddingTop: 16, marginTop: 20,
          borderTop: `1px solid ${isCenter ? 'rgba(59,130,246,0.14)' : 'rgba(255,255,255,0.06)'}`,
        }}>
          <div style={{
            width: isCenter ? 42 : 34, height: isCenter ? 42 : 34,
            borderRadius: '50%',
            background: isCenter ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.06)',
            border: `2px solid ${isCenter ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.1)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            fontSize: isCenter ? 16 : 13, fontWeight: 700,
            color: isCenter ? '#60A5FA' : 'rgba(255,255,255,0.4)',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {t.name.charAt(0)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isCenter ? 13.5 : 11.5, fontWeight: 700,
              color: isCenter ? '#fff' : 'rgba(255,255,255,0.5)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{t.name}</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isCenter ? 11 : 9.5,
              color: 'rgba(255,255,255,0.28)', marginTop: 2,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{t.role} · {t.company}</div>
            {t.city && isCenter && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 3,
                marginTop: 5, fontSize: 9, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                </svg>
                {t.city}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Desktop 3-card sliding carousel ── */
const DesktopCarousel = ({ revealed }: { revealed: boolean }) => {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const n = testimonials.length;

  const go = (idx: number, direction?: number) => {
    const next = ((idx % n) + n) % n;
    setDir(direction ?? (next > active ? 1 : -1));
    setActive(next);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDir(1);
      setActive(c => (c + 1) % n);
    }, 5000);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDir(1);
      setActive(c => (c + 1) % n);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [n]);

  const left  = ((active - 1 + n) % n);
  const right = ((active + 1) % n);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 40 }}
      transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.2 }}
      style={{ maxWidth: 1300, margin: '0 auto', padding: '0 40px' }}
    >
      {/* 3-card grid with overflow clip */}
      <div style={{ overflow: 'hidden', padding: '8px 0 12px', borderRadius: 4 }}>
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? '30%' : '-30%', opacity: 0, scale: 0.96 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit:  (d: number) => ({ x: d > 0 ? '-30%' : '30%', opacity: 0, scale: 0.96 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.18fr 1fr',
              gap: 20,
              alignItems: 'stretch',
            }}
          >
            <Card t={testimonials[left]}  variant="side"   onClick={() => go(left, -1)} />
            <Card t={testimonials[active]} variant="center" />
            <Card t={testimonials[right]} variant="side"   onClick={() => go(right, 1)} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 20, marginTop: 28,
      }}>
        <button
          onClick={() => go(active - 1, -1)}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.4)'; (e.currentTarget as HTMLElement).style.color = '#60A5FA'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > active ? 1 : -1)}
              style={{
                width: i === active ? 22 : 6, height: 6, borderRadius: 3,
                background: i === active ? '#3B82F6' : 'rgba(255,255,255,0.2)',
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'all 0.38s cubic-bezier(0.34,1.56,0.64,1)',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => go(active + 1, 1)}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.4)'; (e.currentTarget as HTMLElement).style.color = '#60A5FA'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
          {String(active + 1).padStart(2,'0')} / {String(n).padStart(2,'0')}
        </span>
      </div>
    </motion.div>
  );
};

/* ── Mobile card component ── */
const MobileCard = ({ t }: { t: Testimonial }) => (
  <div style={{
    background: 'linear-gradient(145deg, #0D1B2E 0%, #0A1628 100%)',
    border: '1px solid rgba(59,130,246,0.18)',
    borderRadius: 20,
    padding: '28px 24px 24px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
  }}>
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 2,
      background: 'linear-gradient(90deg, #3B82F6, #60A5FA 50%, transparent)',
    }} />
    <div style={{
      position: 'absolute', top: 8, right: 16,
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 88, lineHeight: 1,
      color: 'rgba(59,130,246,0.09)', userSelect: 'none', pointerEvents: 'none',
    }}>"</div>

    <Stars n={t.rating} size={13} />

    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 15, lineHeight: 1.75,
      color: 'rgba(255,255,255,0.82)',
      marginTop: 16, marginBottom: 22,
    }}>"{t.text}"</p>

    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(59,130,246,0.1)' }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: 'linear-gradient(135deg, #1E3A5F, #0D2035)',
        border: '2px solid rgba(59,130,246,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontSize: 16, fontWeight: 700, color: '#60A5FA',
        fontFamily: "'DM Sans', sans-serif",
      }}>{t.name.charAt(0)}</div>
      <div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{t.name}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>{t.role} · {t.company}</div>
        {t.city && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, marginTop: 5, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
            {t.city}
          </div>
        )}
      </div>
    </div>
  </div>
);

/* ── Mobile swipe carousel with throw physics ── */
const MobileCarousel = ({ items }: { items: Testimonial[] }) => {
  const [idx, setIdx] = useState(0);
  const [throwing, setThrowing] = useState(false);
  const [throwDir, setThrowDir] = useState<1 | -1>(1);
  const touchStartX = useRef(0);
  const [dragX, setDragX] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const n = items.length;

  const throwTo = (d: 1 | -1) => {
    if (throwing) return;
    setThrowDir(d);
    setThrowing(true);
    clearInterval(intervalRef.current);
    setTimeout(() => {
      setIdx(i => ((i + d + n) % n));
      setDragX(0);
      setThrowing(false);
      intervalRef.current = setInterval(() => throwTo(1), 4800);
    }, 400);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => throwTo(1), 4800);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      <div
        style={{ position: 'relative', overflow: 'hidden', paddingBottom: 8 }}
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
        onTouchMove={e => { if (!throwing) setDragX(e.touches[0].clientX - touchStartX.current); }}
        onTouchEnd={() => { if (Math.abs(dragX) > 50) throwTo(dragX < 0 ? 1 : -1); else setDragX(0); }}
      >
        {/* Back stack cards */}
        <div style={{
          position: 'absolute', inset: '14px 20px 0',
          transform: 'scale(0.84) translateY(22px)',
          transformOrigin: 'top center',
          opacity: 0.25, filter: 'blur(2px)', zIndex: 1,
        }}>
          <MobileCard t={items[((idx + 2) % n)]} />
        </div>
        <div style={{
          position: 'absolute', inset: '7px 10px 0',
          transform: 'scale(0.92) translateY(11px)',
          transformOrigin: 'top center',
          opacity: 0.5, filter: 'blur(0.5px)', zIndex: 2,
        }}>
          <MobileCard t={items[((idx + 1) % n)]} />
        </div>

        {/* Active card */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={idx}
            initial={{ x: throwDir * -340, opacity: 0, rotate: throwDir * -8, scale: 0.88 }}
            animate={throwing
              ? { x: throwDir * 360, opacity: 0, rotate: throwDir * 12, scale: 0.9 }
              : { x: dragX, opacity: 1, rotate: dragX * 0.04, scale: 1 }
            }
            exit={{ x: throwDir * 360, opacity: 0, rotate: throwDir * 12 }}
            transition={throwing
              ? { duration: 0.38, ease: [0.36, 0, 0.66, 0] }
              : { duration: 0.46, ease: [0.34, 1.56, 0.64, 1] }
            }
            style={{ position: 'relative', zIndex: 3, transformOrigin: 'center center' }}
          >
            <MobileCard t={items[idx]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 22 }}>
        <button onClick={() => throwTo(-1)} style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ display: 'flex', gap: 5 }}>
          {items.map((_, i) => (
            <div key={i} style={{ width: i===idx?22:5, height: 5, borderRadius: 3, background: i===idx?'#3B82F6':'rgba(255,255,255,0.18)', transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)' }} />
          ))}
        </div>
        <button onClick={() => throwTo(1)} style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
};

/* ── Main section ── */
const TestimonialsSection = () => {
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
      background: 'linear-gradient(180deg, #060A10 0%, #08111F 60%, #060A10 100%)',
      padding: 'clamp(80px,10vw,130px) 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
      <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: 500, background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 56px', position: 'relative' }} className="max-md:!px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 24 }}
          transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
            <div style={{ width: 24, height: 1.5, background: '#3B82F6' }} />
            Client Testimonials
            <div style={{ width: 24, height: 1.5, background: '#3B82F6' }} />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px,5vw,60px)', fontWeight: 600, color: '#fff', lineHeight: 1.05, margin: 0, letterSpacing: '-0.02em' }}>
            What our clients say
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.42)', marginTop: 14, lineHeight: 1.7 }}>
            Trusted by 2000+ clients across India and 15+ countries
          </p>
        </motion.div>
      </div>

      {/* Desktop 3-card slider */}
      <div className="hidden min-[768px]:block">
        <DesktopCarousel revealed={revealed} />
      </div>

      {/* Mobile throw carousel */}
      <div className="min-[768px]:hidden" style={{ padding: '0 20px' }}>
        <MobileCarousel items={testimonials} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
