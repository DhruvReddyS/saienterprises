import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { productCategories } from '@/data/products';

/* ── inline icons ── */
const IcoPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12 19.79 19.79 0 0 1 1.21 3.18 2 2 0 0 1 3.22 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.09a16 16 0 0 0 6 6l.56-.56a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IcoMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IcoPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11z"/>
    <circle cx="12" cy="10" r="2.5"/>
  </svg>
);
const IcoArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

function useReveal(threshold = 0.1) {
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

/* ── floating-label field ── */
const FormField = ({
  label, type, value, onChange, required = false,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void; required?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  return (
    <div style={{ position: 'relative', marginBottom: 32 }}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', background: 'transparent', border: 'none',
          borderBottom: `1px solid ${focused ? '#3B82F6' : 'rgba(13,20,33,0.15)'}`,
          padding: '14px 0 8px', fontSize: 15, color: '#060A10',
          fontFamily: "'DM Sans', sans-serif",
          outline: 'none', transition: 'border-color 0.25s',
        }}
      />
      <label style={{
        position: 'absolute',
        top: focused || filled ? -2 : 14,
        left: 0,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: focused || filled ? 9.5 : 11,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: focused ? '#3B82F6' : 'rgba(13,20,33,0.38)',
        pointerEvents: 'none',
        transition: 'all 0.25s', fontWeight: 600,
      }}>
        {label}
      </label>
    </div>
  );
};

/* ── contact method card ── */
const MethodCard = ({
  icon, label, lines, href, delay, on,
}: {
  icon: React.ReactNode; label: string; lines: string[]; href?: string; delay: number; on: boolean;
}) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', flexDirection: 'column', gap: 14, padding: '28px 26px',
        background: hov ? '#fff' : 'rgba(255,255,255,0.96)',
        border: `1px solid ${hov ? 'rgba(59,130,246,0.25)' : 'rgba(0,0,0,0.07)'}`,
        boxShadow: hov ? '0 16px 48px rgba(13,20,33,0.1), 0 0 0 1px rgba(59,130,246,0.15)' : '0 2px 10px rgba(13,20,33,0.04)',
        textDecoration: 'none', cursor: 'default',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        opacity: on ? 1 : 0, transform: on ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}s`,
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
        transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }} />
      <div style={{
        width: 40, height: 40, background: hov ? '#3B82F6' : '#EFF6FF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? '#fff' : '#3B82F6',
        transition: 'all 0.3s', flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: hov ? '#3B82F6' : 'rgba(13,20,33,0.4)',
          marginBottom: 8, fontWeight: 700, transition: 'color 0.2s',
        }}>
          {label}
        </div>
        {lines.map((line) => (
          <div key={line} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#060A10',
            lineHeight: 1.6, fontWeight: 400,
          }}>
            {line}
          </div>
        ))}
      </div>
    </a>
  );
};

/* ── office card ── */
const OfficeCard = ({
  city, person, role, phone, email, address, isHQ, delay, on,
}: {
  city: string; person: string; role: string; phone: string; email: string;
  address: string; isHQ?: boolean; delay: number; on: boolean;
}) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '36px 32px',
        background: isHQ ? '#060A10' : '#fff',
        border: `1px solid ${isHQ ? 'rgba(59,130,246,0.2)' : hov ? 'rgba(59,130,246,0.2)' : 'rgba(0,0,0,0.07)'}`,
        position: 'relative', overflow: 'hidden',
        boxShadow: hov ? '0 12px 36px rgba(13,20,33,0.1)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(24px)',
        transitionDelay: `${delay}s`,
      }}
    >
      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: isHQ ? 'linear-gradient(90deg, #3B82F6, #60A5FA, transparent)' : `linear-gradient(90deg, #3B82F6, transparent)`,
        transform: hov || isHQ ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }} />

      {isHQ && (
        <div style={{
          position: 'absolute', top: 20, right: 24,
          fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#FACC15', background: 'rgba(250,204,21,0.1)',
          border: '1px solid rgba(250,204,21,0.25)', padding: '3px 10px',
        }}>
          Headquarters
        </div>
      )}

      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 28, fontWeight: 600, color: isHQ ? '#fff' : '#060A10',
        lineHeight: 1, marginBottom: 6, letterSpacing: '-0.02em',
      }}>
        {city}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, fontWeight: 600,
        color: '#3B82F6', marginBottom: 20,
      }}>
        {person} · {role}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <a href={`tel:${phone.replace(/\s/g, '')}`} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: "'DM Sans', sans-serif", fontSize: 13.5,
          color: isHQ ? 'rgba(255,255,255,0.7)' : 'rgba(13,20,33,0.65)',
          textDecoration: 'none', transition: 'color 0.2s',
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#3B82F6'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isHQ ? 'rgba(255,255,255,0.7)' : 'rgba(13,20,33,0.65)'; }}
        >
          <span style={{ color: '#3B82F6', flexShrink: 0 }}><IcoPhone /></span>
          {phone}
        </a>
        <a href={`mailto:${email}`} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: isHQ ? 'rgba(255,255,255,0.6)' : 'rgba(13,20,33,0.55)',
          textDecoration: 'none', transition: 'color 0.2s',
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#3B82F6'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isHQ ? 'rgba(255,255,255,0.6)' : 'rgba(13,20,33,0.55)'; }}
        >
          <span style={{ color: '#3B82F6', flexShrink: 0 }}><IcoMail /></span>
          {email}
        </a>
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 4,
          fontFamily: "'DM Sans', sans-serif", fontSize: 12.5,
          color: isHQ ? 'rgba(255,255,255,0.38)' : 'rgba(13,20,33,0.38)', lineHeight: 1.55,
        }}>
          <span style={{ color: '#3B82F6', flexShrink: 0, marginTop: 1 }}><IcoPin /></span>
          {address}
        </div>
      </div>
    </div>
  );
};

/* ── main ── */
const ContactPage = () => {
  const [params] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [heroOn, setHeroOn] = useState(false);
  const officesReveal = useReveal(0.1);
  const formReveal = useReveal(0.05);

  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '',
    category: params.get('category') ?? '',
    machine: params.get('machine') ?? '',
    message: params.get('message') ?? '',
  });

  useEffect(() => {
    const t = setTimeout(() => setHeroOn(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', company: '', phone: '', category: '', machine: '', message: '' });
    }, 5000);
  };

  return (
    <PageTransition>
      <Header />

      {/* ── HERO ── */}
      <div style={{
        background: '#060A10', paddingTop: 140, paddingBottom: 100,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Radial glows */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 15% 40%, rgba(59,130,246,0.09) 0%, transparent 35%), radial-gradient(circle at 85% 20%, rgba(59,130,246,0.05) 0%, transparent 25%)',
        }} />
        {/* Watermark text */}
        <div style={{
          position: 'absolute', right: -20, bottom: -10,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(80px,14vw,180px)', fontWeight: 700,
          color: 'rgba(255,255,255,0.018)', lineHeight: 0.9,
          pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.04em',
        }}>
          CONTACT
        </div>

        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 2 }}
          className="max-md:!px-7"
        >
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: '#3B82F6', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 12,
            opacity: heroOn ? 1 : 0, transition: 'all 0.7s',
          }}>
            <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
            Reach Sai Enterprises
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(52px,7.5vw,110px)', fontWeight: 600,
            lineHeight: 0.92, letterSpacing: '-0.025em',
            color: '#fff', maxWidth: 800, marginBottom: 0,
            opacity: heroOn ? 1 : 0, transform: heroOn ? 'none' : 'translateY(28px)',
            transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.08s',
          }}>
            Let's talk<br />
            <span style={{ color: '#3B82F6', fontStyle: 'italic', fontWeight: 300 }}>machinery.</span>
          </h1>

          <p style={{
            marginTop: 36, fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.85,
            maxWidth: 500,
            opacity: heroOn ? 1 : 0, transform: heroOn ? 'none' : 'translateY(14px)',
            transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.16s',
          }}>
            Whether it's a new machine inquiry, spares, service request, or a quote — we respond within 24 hours.
          </p>

          {/* Method cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 60,
            opacity: heroOn ? 1 : 0, transition: 'all 0.7s 0.24s',
          }}
            className="max-md:!grid-cols-1"
          >
            <MethodCard
              icon={<IcoPhone />}
              label="Call Us"
              lines={['+91 939 767 8950', '+91 931 217 5513']}
              href="tel:+919397678950"
              delay={0.1}
              on={heroOn}
            />
            <MethodCard
              icon={<IcoMail />}
              label="Email"
              lines={['venkat@saienterprises.info', 'msrao@saienterprises.info']}
              href="mailto:venkat@saienterprises.info"
              delay={0.16}
              on={heroOn}
            />
            <MethodCard
              icon={<IcoPin />}
              label="Visit Us"
              lines={['Balkampet, Hyderabad HQ', 'Janakpuri, Delhi Branch']}
              delay={0.22}
              on={heroOn}
            />
          </div>
        </div>
      </div>

      {/* ── OFFICES ── */}
      <div ref={officesReveal.ref} style={{ background: '#F4F6FB', padding: '100px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }}
          className="max-md:!px-7"
        >
          <div style={{ marginBottom: 52 }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#3B82F6', marginBottom: 14,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
              Our Offices
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600,
              color: '#060A10', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 14,
            }}>
              Two offices. One call away.
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(13,20,33,0.48)', lineHeight: 1.75, maxWidth: 440 }}>
              Hyderabad HQ handles machines, spares, service, and export. Delhi branch covers North India sales and customer support.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
            className="max-md:grid-cols-1"
          >
            <OfficeCard
              city="Hyderabad"
              person="Venkat"
              role="General Manager"
              phone="+91 939 767 8950"
              email="venkat@saienterprises.info"
              address="SAI ARCADE, Plot No 99, Lingaiah Nagar, Balkampet, Hyderabad — 500018"
              isHQ
              delay={0.05}
              on={officesReveal.on}
            />
            <OfficeCard
              city="New Delhi"
              person="M.S. Rao"
              role="Delhi Branch"
              phone="+91 931 217 5513"
              email="msrao@saienterprises.info"
              address="G-20, Vikas Surya Janak Plaza, Janakpuri, New Delhi — 110058"
              delay={0.12}
              on={officesReveal.on}
            />
          </div>

          {/* Overseas strip */}
          <div style={{
            marginTop: 16, display: 'flex', gap: 1, background: 'rgba(0,0,0,0.07)', flexWrap: 'wrap',
            opacity: officesReveal.on ? 1 : 0,
            transform: officesReveal.on ? 'none' : 'translateY(16px)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}>
            {[
              { city: 'Mumbai', role: 'Sales Office', country: 'India' },
              { city: 'Meerut', role: 'Sales Office', country: 'India (UP)' },
              { city: 'Pune', role: 'Sales Office', country: 'India' },
              { city: 'Vijayawada', role: 'Sales Office', country: 'India' },
              { city: 'Nairobi', role: 'Overseas', country: 'Kenya' },
              { city: 'Addis Ababa', role: 'Overseas', country: 'Ethiopia' },
              { city: 'Colombo', role: 'Overseas', country: 'Sri Lanka' },
            ].map((o) => (
              <div key={o.city} style={{
                flex: '1 1 120px', padding: '20px 18px',
                background: '#fff',
                borderTop: `2px solid ${o.role === 'Overseas' ? '#3B82F6' : 'rgba(0,0,0,0.08)'}`,
              }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: '#060A10', marginBottom: 3 }}>
                  {o.city}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: o.role === 'Overseas' ? '#2563EB' : 'rgba(0,0,0,0.38)' }}>
                  {o.role}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(0,0,0,0.3)', marginTop: 2 }}>
                  {o.country}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FORM ── */}
      <div ref={formReveal.ref} style={{ background: '#fff', padding: '100px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 64px' }}
          className="max-md:!px-7"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}
            className="max-lg:!grid-cols-1 max-lg:!gap-12"
          >
            {/* Left: context */}
            <div style={{
              opacity: formReveal.on ? 1 : 0, transform: formReveal.on ? 'none' : 'translateX(-20px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#3B82F6', marginBottom: 16,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
                Send an Inquiry
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(36px,4.5vw,58px)', fontWeight: 600, lineHeight: 1.0,
                color: '#060A10', letterSpacing: '-0.02em', marginBottom: 24,
              }}>
                Start a machinery<br />
                <span style={{ color: '#3B82F6', fontStyle: 'italic', fontWeight: 300 }}>conversation.</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: 'rgba(0,0,0,0.5)', lineHeight: 1.85, maxWidth: 340, marginBottom: 40 }}>
                Fill in your details and we'll match you with the right machine, size, and budget. No long waits — we respond fast.
              </p>

              {/* Trust signals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  '24-hour response guarantee',
                  '24+ years of machinery experience',
                  'Genuine HPM machines & spares',
                  'Installation + service included',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 20, height: 20, background: '#EFF6FF', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l4 4 6-6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div style={{
              position: 'relative',
              opacity: formReveal.on ? 1 : 0, transform: formReveal.on ? 'none' : 'translateX(20px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}>
              {/* Success state */}
              {submitted && (
                <div style={{
                  position: 'absolute', inset: -24, background: '#fff', zIndex: 20,
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
                  padding: 24,
                }}>
                  <div style={{
                    width: 48, height: 48, background: '#EFF6FF', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12l6 6 10-10" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(36px,5vw,56px)', fontWeight: 600, color: '#060A10', lineHeight: 1,
                    marginBottom: 16,
                  }}>
                    Message sent.
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(13,20,33,0.5)', marginBottom: 32, lineHeight: 1.75 }}>
                    Our team will get back to you<br />within 24–48 business hours.
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: '#3B82F6', padding: 0, display: 'flex', alignItems: 'center', gap: 8,
                    }}
                  >
                    Send another <IcoArrow />
                  </button>
                </div>
              )}

              <div style={{ background: '#F8FAFC', padding: '48px 44px', border: '1px solid rgba(0,0,0,0.06)' }}
                className="max-sm:!px-6 max-sm:!py-8"
              >
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
                    className="max-sm:grid-cols-1"
                  >
                    <FormField label="Your Name" type="text" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                    <FormField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
                    className="max-sm:grid-cols-1"
                  >
                    <FormField label="Company" type="text" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                    <FormField label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  </div>

                  {/* Category */}
                  <div style={{ position: 'relative', marginBottom: 32 }}>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      style={{
                        width: '100%', background: 'transparent', border: 'none',
                        borderBottom: '1px solid rgba(13,20,33,0.15)',
                        padding: '14px 0 8px', fontSize: 15,
                        color: form.category ? '#060A10' : 'rgba(13,20,33,0.35)',
                        fontFamily: "'DM Sans', sans-serif",
                        outline: 'none', appearance: 'none', cursor: 'pointer',
                        transition: 'border-color 0.25s',
                      }}
                      onFocus={(e) => { e.target.style.borderBottomColor = '#3B82F6'; }}
                      onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(13,20,33,0.15)'; }}
                    >
                      <option value="">— Machinery Category —</option>
                      {productCategories.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                      <option value="hpm">HPM Paper Cutters</option>
                    </select>
                    <label style={{
                      position: 'absolute', top: -2, left: 0,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: 'rgba(13,20,33,0.38)', pointerEvents: 'none', fontWeight: 600,
                    }}>
                      Category
                    </label>
                  </div>

                  <FormField label="Machine of Interest" type="text" value={form.machine} onChange={(v) => setForm({ ...form, machine: v })} />

                  {/* Message */}
                  <div style={{ position: 'relative', marginBottom: 40 }}>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={3}
                      style={{
                        width: '100%', background: 'transparent', border: 'none',
                        borderBottom: '1px solid rgba(13,20,33,0.15)',
                        padding: '14px 0 8px', fontSize: 15, color: '#060A10',
                        fontFamily: "'DM Sans', sans-serif",
                        outline: 'none', resize: 'none',
                        transition: 'border-color 0.25s',
                      }}
                      onFocus={(e) => { e.target.style.borderBottomColor = '#3B82F6'; }}
                      onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(13,20,33,0.15)'; }}
                    />
                    <label style={{
                      position: 'absolute', top: form.message ? -2 : 14, left: 0,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: form.message ? 9.5 : 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: form.message ? '#3B82F6' : 'rgba(13,20,33,0.38)',
                      pointerEvents: 'none', transition: 'all 0.25s', fontWeight: 600,
                    }}>
                      Your Requirement
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    style={{
                      background: '#060A10', border: 'none', cursor: 'pointer',
                      padding: '16px 32px',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                      color: '#fff',
                      transition: 'background 0.25s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#060A10'; }}
                  >
                    Send Inquiry
                    <span style={{ marginLeft: 16 }}><IcoArrow /></span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </PageTransition>
  );
};

export default ContactPage;
