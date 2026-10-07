import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import saiLogo from "@/assets/sai-logo-cmyk.png";
import { BorderBeam } from "@/components/ui/border-beam";

interface VerticalMarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

function VerticalMarquee({ children, reverse = false, className, speed = 28 }: VerticalMarqueeProps) {
  return (
    <div
      className={cn("flex flex-col overflow-hidden", className)}
      style={{ "--duration": `${speed}s` } as React.CSSProperties}
    >
      <div className={cn("flex shrink-0 flex-col animate-marquee-vertical", reverse && "[animation-direction:reverse]")}>
        {children}
      </div>
      <div
        className={cn("flex shrink-0 flex-col animate-marquee-vertical", reverse && "[animation-direction:reverse]")}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const SERVICES = [
  "Choose the right machine",
  "Match output and budget",
  "Plan the production line",
  "Source trusted brands",
  "Coordinate import and delivery",
  "Install production-ready",
  "Train the operating team",
  "Support after purchase",
];

export default function CTAWithVerticalMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRevealed(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const container = marqueeRef.current;
    if (!container || !revealed || !window.matchMedia('(min-width: 1024px)').matches) return;

    let frame = 0;
    let running = true;
    const tick = () => {
      if (!running) return;
      const items = container.querySelectorAll(".marquee-item");
      const rect = container.getBoundingClientRect();
      const cy = rect.top + rect.height / 2;
      items.forEach((item) => {
        const ir = item.getBoundingClientRect();
        const d = Math.abs(cy - (ir.top + ir.height / 2));
        const opacity = Math.max(0.08, 1 - (d / (rect.height / 2)) * 0.88);
        (item as HTMLElement).style.opacity = String(opacity);
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
    };
  }, [revealed]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, #FAFBFE 0%, #F4F7FD 100%)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '4px solid #060A10',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(circle at 12% 18%, rgba(59,130,246,0.11), transparent 30%), radial-gradient(circle at 82% 62%, rgba(13,20,33,0.06), transparent 34%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(13,20,33,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(13,20,33,0.025) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
        pointerEvents: 'none',
      }} />

      <div
        style={{ maxWidth: 1300, margin: '0 auto', padding: '0 56px', position: 'relative' }}
        className="max-md:!px-6 max-[767px]:!px-4"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            minHeight: '68vh',
          }}
          className="max-lg:!grid-cols-1"
        >
          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ padding: '80px 0' }}
            className="max-lg:!pt-16 max-lg:!pb-0"
          >
            {/* Logo + eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
              <img src={saiLogo} alt="Sai Enterprises" loading="lazy" decoding="async" style={{ height: 28, objectFit: 'contain' }} />
              <div style={{ width: 1, height: 22, background: 'rgba(13,20,33,0.12)' }} />
              <span className="font-mono" style={{
                fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase',
                color: '#1565E0', fontWeight: 700,
              }}>
                Machinery Guidance
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(38px, 4.6vw, 66px)',
              fontWeight: 700,
              lineHeight: 0.96,
              color: '#070C16',
              margin: '0 0 26px',
              letterSpacing: '-0.035em',
            }}>
              Get the machine<br />
              <span style={{
                background: 'linear-gradient(100deg, #1565E0, #0EA5E9)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>without the guesswork.</span>
            </h2>

            <p style={{
              fontSize: 15.5,
              lineHeight: 1.75,
              color: 'rgba(13,20,33,0.62)',
              maxWidth: 450,
              marginBottom: 30,
            }}>
              Tell us your output, floor space and budget. We'll point you at the
              right machine for your print floor — and say so if you don't need one.
            </p>

            {/* What the next step actually involves, so the CTA is not a leap. */}
            <ul style={{
              listStyle: 'none', margin: '0 0 34px', padding: 0,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              {[
                'Match output and budget',
                'Plan the floor layout',
                'Installation and operator training',
              ].map((step, i) => (
                <li key={step} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="font-mono" style={{
                    fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em',
                    color: '#1565E0', minWidth: 20,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ width: 18, height: 1, background: 'rgba(13,20,33,0.16)' }} />
                  <span style={{ fontSize: 13.5, color: 'rgba(13,20,33,0.74)', fontWeight: 500 }}>
                    {step}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link
                to="/machinery"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  padding: '15px 30px',
                  background: '#060A10',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  borderRadius: 999,
                  boxShadow: '0 4px 24px rgba(13,20,33,0.18), 0 0 0 1px rgba(255,255,255,0.06) inset',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#1D4ED8';
                  el.style.transform = 'translateY(-2px)';
                  el.style.boxShadow = '0 16px 42px rgba(29,78,216,0.32), 0 0 0 1px rgba(255,255,255,0.08) inset';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#060A10';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = '0 4px 24px rgba(13,20,33,0.18), 0 0 0 1px rgba(255,255,255,0.06) inset';
                }}
              >
                Explore Machinery
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>

              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  padding: '15px 28px',
                  background: 'transparent',
                  color: '#060A10',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: '1.5px solid rgba(13,20,33,0.15)',
                  transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                  borderRadius: 999,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = '#1D4ED8';
                  el.style.color = '#1D4ED8';
                  el.style.transform = 'translateY(-2px)';
                  el.style.background = 'rgba(29,78,216,0.04)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(13,20,33,0.15)';
                  el.style.color = '#060A10';
                  el.style.transform = 'translateY(0)';
                  el.style.background = 'transparent';
                }}
              >
                Contact Us
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </motion.div>

          {/* ── Right, marquee ── */}
          <motion.div
            ref={marqueeRef}
            initial={{ opacity: 0 }}
            animate={revealed ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              position: 'relative',
              height: '68vh',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              borderLeft: '1px solid rgba(13,20,33,0.08)',
              paddingLeft: 56,
            }}
            className="max-lg:!hidden"
          >
            <VerticalMarquee speed={26} className="h-full w-full">
              {SERVICES.map((item, i) => (
                <div
                  key={i}
                  className="marquee-item"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 'clamp(24px, 2.7vw, 40px)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: '#111827',
                    padding: '15px 0',
                    lineHeight: 1.1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item}
                </div>
              ))}
            </VerticalMarquee>

            {/* Vignettes */}
            <div style={{
              pointerEvents: 'none', position: 'absolute',
              top: 0, left: 0, right: 0, height: '25%',
              background: 'linear-gradient(to bottom, #F8FAFC, transparent)',
              zIndex: 10,
            }} />
            <div style={{
              pointerEvents: 'none', position: 'absolute',
              bottom: 0, left: 0, right: 0, height: '25%',
              background: 'linear-gradient(to top, #F8FAFC, transparent)',
              zIndex: 10,
            }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
