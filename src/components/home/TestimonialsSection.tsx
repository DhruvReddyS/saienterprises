import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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

const TestimonialsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRevealed(true); obs.disconnect(); }
    }, { threshold: 0.08 });
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
      {/* Radial blue glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: 500,
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 56px', position: 'relative' }} className="max-md:!px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 24 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 64 }}
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
            From Hyderabad to Nairobi, offset presses to corrugation lines — hear from the clients who rely on Sai Enterprises every day.
          </p>
        </motion.div>

        {/* Scrolling columns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            maxHeight: 680,
            overflow: 'hidden',
            maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
          }}
          className="max-lg:!grid-cols-2 max-sm:!grid-cols-1"
        >
          <TestimonialsColumn testimonials={col1} duration={18} startDark={false} />
          <TestimonialsColumn testimonials={col2} duration={22} startDark={true} className="max-sm:hidden" />
          <TestimonialsColumn testimonials={col3} duration={20} startDark={false} className="max-lg:hidden" />
        </motion.div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
