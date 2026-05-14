import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestimonialsColumn, type Testimonial } from '@/components/ui/testimonials-columns';

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

const col1 = testimonials.slice(0, 3);
const col2 = testimonials.slice(3, 6);
const col3 = testimonials.slice(6, 9);

/* ── Mobile card ── */
const MobileCard = ({ t, isActive }: { t: Testimonial; isActive: boolean }) => (
  <motion.div
    animate={{ scale: isActive ? 1 : 0.92, opacity: isActive ? 1 : 0.45 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    style={{
      background: 'linear-gradient(135deg, #0D1B2E 0%, #111C2E 60%, #0A1628 100%)',
      border: '1px solid rgba(59,130,246,0.2)',
      borderRadius: 20,
      padding: '28px 24px 24px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: isActive
        ? '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.04)'
        : '0 8px 24px rgba(0,0,0,0.3)',
    }}
  >
    {/* Top accent */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 2,
      background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 50%, transparent 100%)',
    }} />

    {/* Quote watermark */}
    <div style={{
      position: 'absolute', top: 8, right: 16,
      fontSize: 80, lineHeight: 1,
      fontFamily: 'Georgia, serif',
      color: 'rgba(59,130,246,0.1)',
      userSelect: 'none', pointerEvents: 'none',
    }}>"</div>

    {/* Stars */}
    <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= t.rating ? '#FACC15' : 'rgba(255,255,255,0.08)'} stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>

    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 15, lineHeight: 1.75,
      color: 'rgba(255,255,255,0.82)',
      marginBottom: 24, fontStyle: 'italic', position: 'relative',
      minHeight: 80,
    }}>
      "{t.text}"
    </p>

    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      paddingTop: 18, borderTop: '1px solid rgba(59,130,246,0.12)',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: 'linear-gradient(135deg, #1E3A5F, #0D2035)',
        border: '2px solid rgba(59,130,246,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#60A5FA' }}>
          {t.name.charAt(0)}
        </span>
      </div>
      <div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>
          {t.name}
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.01em' }}>
          {t.role} · {t.company}
        </div>
        {t.city && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            marginTop: 5, fontSize: 9, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
            {t.city}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

/* ── Mobile carousel ── */
const MobileCarousel = ({ items }: { items: Testimonial[] }) => {
  const [current, setCurrent] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const next = () => setCurrent((c) => (c + 1) % items.length);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 5000);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Cards */}
      <div
        style={{ overflow: 'hidden', padding: '0 0 8px' }}
        onTouchStart={(e) => setDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const delta = dragStart - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 40) {
            delta > 0 ? next() : prev();
            resetTimer();
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.95 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <MobileCard t={items[current]} isActive={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20 }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); resetTimer(); }}
            style={{
              width: i === current ? 22 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? '#3B82F6' : 'rgba(255,255,255,0.15)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
        {[
          { fn: prev, d: 'M15 18l-6-6 6-6' },
          { fn: next, d: 'M9 18l6-6-6-6' },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={() => { btn.fn(); resetTimer(); }}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d={btn.d}/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

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
      background: 'linear-gradient(180deg, #060A10 0%, #0A1628 60%, #060A10 100%)',
      padding: 'clamp(60px, 8vw, 120px) 0 clamp(56px, 8vw, 112px)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }} />
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: 500,
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 56px', position: 'relative' }} className="max-md:!px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 24 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#3B82F6', fontWeight: 700, marginBottom: 20,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <div style={{ width: 24, height: 1.5, background: '#3B82F6' }} />
            Client Testimonials
            <div style={{ width: 24, height: 1.5, background: '#3B82F6' }} />
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px,4.5vw,64px)', fontWeight: 700,
            color: '#FFFFFF', lineHeight: 0.96, margin: '0 0 20px',
          }}>
            Trusted across<br />
            <span style={{ color: '#60A5FA', fontWeight: 600, fontStyle: 'italic' }}>borders & industries</span>
          </h2>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, color: 'rgba(255,255,255,0.44)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto',
          }}>
            From Hyderabad to Nairobi — hear from clients who rely on Sai Enterprises every day.
          </p>
        </motion.div>

        {/* Desktop: 3-column scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden min-[768px]:grid"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            maxHeight: 680,
            overflow: 'hidden',
            maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <TestimonialsColumn testimonials={col1} duration={18} startDark={false} />
          <TestimonialsColumn testimonials={col2} duration={22} startDark={true} />
          <TestimonialsColumn testimonials={col3} duration={20} startDark={false} className="max-lg:hidden" />
        </motion.div>

        {/* Mobile: swipe carousel */}
        <motion.div
          className="min-[768px]:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <MobileCarousel items={testimonials} />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
