import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-printing.jpg';
import largestSellingBadge from '@/assets/largest-selling-badge.png';
import badge24 from '@/assets/24-years-badge.png';
import hpmLogo from '@/assets/hpm-logo.png';
import BrandImage from '@/components/BrandImage';

const IcoGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IcoMachines = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="10" rx="2" />
    <path d="M7 7V4h10v3M8 17v3M16 17v3" />
  </svg>
);

const IcoUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IcoPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const stampItems: { badge: ReactNode; title: string; subtitle: string; accent: string }[] = [
  {
    badge: <img src={badge24} alt="24 Years" loading="lazy" decoding="async" style={{ width: 48, height: 48, objectFit: 'contain' }} />,
    title: '24 Years',
    subtitle: '24+ Years in Industry',
    accent: '#3B82F6',
  },
  {
    badge: <IcoMachines />,
    title: '4000+ Machines',
    subtitle: 'Machines Placed',
    accent: '#60A5FA',
  },
  {
    badge: <IcoUsers />,
    title: '2000+ Clients',
    subtitle: 'Clients Served',
    accent: '#38BDF8',
  },
  {
    badge: <img src={largestSellingBadge} alt="Largest Selling" loading="lazy" decoding="async" style={{ width: 48, height: 48, objectFit: 'contain' }} />,
    title: 'Largest Selling',
    subtitle: "India's Largest Paper Cutter Distributor",
    accent: '#FACC15',
  },
  {
    badge: <IcoGlobe />,
    title: 'Global Clients',
    subtitle: '15+ Countries',
    accent: '#22C55E',
  },
  {
    badge: <BrandImage src={hpmLogo} alt="HPM" style={{ height: 28, objectFit: 'contain' }} />,
    title: 'HPM',
    subtitle: 'Sole Agent in India',
    accent: '#EF4444',
  },
  {
    badge: <IcoPin />,
    title: 'Est. 2000',
    subtitle: 'Hyderabad, India',
    accent: '#A78BFA',
  },
];

const HeroSection = () => {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        setParallaxY(-rect.top * 0.25);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100dvh', minHeight: 760,
        background: '#060A10',
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        overflow: 'hidden',
        position: 'relative',
      }}
      className="max-[1024px]:!grid-cols-1 max-[767px]:!min-h-0 max-[767px]:!h-auto"
    >
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '124px 64px 168px',
        }}
        className="max-lg:!px-8 max-lg:!py-28 max-md:!px-6 max-md:!py-24 max-[767px]:!pt-24 max-[767px]:!pb-40 max-[767px]:!px-5"
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '40%',
            width: 500,
            height: 400,
            transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 65%)',
            pointerEvents: 'none',
            zIndex: 2,
            animation: 'hglow 8s ease-in-out infinite',
          }}
        />

        <div style={{ position: 'relative', zIndex: 3 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 44,
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'none' : 'translateY(12px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div style={{ width: 36, height: 1, background: '#3B82F6' }} />
            <span
              style={{
                fontSize: 10,
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.42)',
                fontWeight: 600,
              }}
            >
              Est. 2000 · Hyderabad, India
            </span>
          </div>

          <h1 style={{ marginBottom: 30 }}>
            {['GRAPHIC', 'MACHINERY', 'SUPPLIERS.'].map((word) => (
              <span key={word} className="ml" style={{ display: 'block' }}>
                <span
                  className="ml-inner"
                  style={{
                    display: 'block',
                    fontSize: 'clamp(38px,8.5vw,116px)',
                    fontWeight: 800,
                    lineHeight: 0.9,
                    letterSpacing: '-0.06em',
                    color: word === 'SUPPLIERS.' ? undefined : '#fff',
                  }}
                >
                  {word === 'SUPPLIERS.' ? (
                    <>
                      <span style={{ color: '#fff' }}>SUPPLIERS</span>
                      <span style={{ color: '#3B82F6' }}>.</span>
                    </>
                  ) : (
                    word
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.56)',
              lineHeight: 1.75,
              maxWidth: 420,
              marginBottom: 48,
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'none' : 'translateY(16px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.24s',
            }}
          >
            India&apos;s trusted name in graphic machinery since 2000, spanning pre-press, post-press,
            corrugation, and allied finishing systems for growing print floors.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginBottom: 24,
              flexWrap: 'wrap',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'none' : 'translateY(16px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s',
            }}
          >
            <Link
              to="/machinery"
              className="btn-primary"
              style={{
                fontSize: 11,
                minWidth: 220,
                justifyContent: 'center',
                boxShadow: '0 18px 44px rgba(59,130,246,0.28)',
              }}
            >
              Explore Machinery <span style={{ fontSize: 16 }}>→</span>
            </Link>
            <Link
              to="/contact"
              className="cta-blue"
              style={{
                padding: '14px 0 12px',
                borderBottom: '1px solid rgba(59,130,246,0.55)',
                color: '#93C5FD',
              }}
            >
              Get a Quote <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden' }} className="max-[900px]:hidden">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: 'polygon(13% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        >
          <img
            src={heroImage}
            alt="Graphic printing facility"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            style={{
              width: '100%',
              height: '120%',
              objectFit: 'cover',
              transform: `scale(1.05) translateY(${parallaxY * 0.3}px)`,
              transition: 'transform 0.05s linear',
              willChange: 'transform',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to left, transparent 60%, #060A10 100%), linear-gradient(to bottom, transparent 70%, rgba(6,10,16,0.5) 100%)',
            }}
          />
        </div>

        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4, overflow: 'hidden' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="diag-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="42%" stopColor="rgba(59,130,246,0.55)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <line x1="13%" y1="0" x2="0%" y2="100%" stroke="url(#diag-glow)" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 5,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(8,12,18,0.92) 0%, rgba(5,9,14,0.98) 100%)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(59,130,246,0.14)',
          padding: '16px 0',
          paddingBottom: 'clamp(16px, calc(16px + env(safe-area-inset-bottom, 0px)), 80px)',
          opacity: revealed ? 1 : 0,
          transition: 'opacity 0.6s 0.9s',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            animation: 'ticker-scroll 42s linear infinite',
            width: 'max-content',
            gap: 18,
          }}
        >
          {[...stampItems, ...stampItems].map((item, i) => (
            <div
              key={`stamp-${i < stampItems.length ? 'a' : 'b'}-${i % stampItems.length}`}
              style={{
                minWidth: 'clamp(200px, 28vw, 312px)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '18px 22px',
                whiteSpace: 'nowrap',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 30px ${item.accent}14`,
              }}
            >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.accent,
                    background: `${item.accent}12`,
                    border: `1px solid ${item.accent}22`,
                  }}
                >
                  {item.badge}
                </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: item.accent,
                  }}
                >
                  {item.title}
                </span>
                <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ml-inner {
          display: block;
          transform: translateY(108%);
          transition: transform 1s cubic-bezier(0.16,1,0.3,1);
        }
        ${revealed ? `
          .ml:nth-child(1) .ml-inner { transform: translateY(0); transition-delay: 0s; }
          .ml:nth-child(2) .ml-inner { transform: translateY(0); transition-delay: 0.06s; }
          .ml:nth-child(3) .ml-inner { transform: translateY(0); transition-delay: 0.12s; }
        ` : ''}
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
