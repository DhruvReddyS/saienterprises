import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import saiLogo from '@/assets/sai-logo-cmyk.png';
import BrandImage from '@/components/BrandImage';

const navLinks = [
  { label: 'Home',      to: '/' },
  { label: 'Machinery', to: '/machinery' },
  { label: 'About',     to: '/about' },
  { label: 'Partners',  to: '/partners' },
  { label: 'Brochure',  to: '/brochure' },
  { label: 'Contact',   to: '/contact' },
];

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const bg = scrolled
    ? 'rgba(6,10,16,0.97)'
    : 'rgba(6,10,16,0.85)';

  return (
    <>
      <header
        ref={headerRef}
        className="max-[767px]:!hidden"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          transition: 'background 0.4s, box-shadow 0.4s',
          background: bg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div style={{
          maxWidth: 1300, margin: '0 auto',
          padding: '0 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 72,
        }}
          className="max-[959px]:!px-5"
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <BrandImage
              src={saiLogo}
              alt="Sai Enterprises"
              style={{ height: 36 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17, fontWeight: 700, letterSpacing: '0.02em',
                color: '#fff', lineHeight: 1,
              }}>
                Sai Enterprises
              </span>
              <span style={{
                fontSize: 7.5, letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.38)', fontFamily: "'DM Sans', sans-serif",
              }}>
                Graphic Machinery
              </span>
            </div>
          </Link>

          {/* Desktop nav — 960px+ only */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hidden min-[960px]:!flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600,
                  textDecoration: 'none', padding: '8px 13px', position: 'relative',
                  color: isActive(link.to) ? '#fff' : 'rgba(255,255,255,0.5)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { if (!isActive(link.to)) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)'; }}
                onMouseLeave={(e) => { if (!isActive(link.to)) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
              >
                {link.label}
                {isActive(link.to) && (
                  <span style={{
                    position: 'absolute', bottom: 3, left: 13, right: 13,
                    height: 1.5, background: '#3B82F6', display: 'block',
                  }} />
                )}
              </Link>
            ))}
            <Link
              to="/contact"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700,
                textDecoration: 'none', padding: '9px 20px', marginLeft: 10,
                background: '#3B82F6',
                color: '#fff',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#3B82F6'; }}
            >
              Get Quote
            </Link>
          </nav>

          {/* Mobile burger — tablet 768-959px only; <768px uses bottom nav */}
          <button
            className="max-[767px]:!hidden min-[960px]:!hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none', border: 'none',
              cursor: 'pointer', color: '#fff',
              padding: '8px 4px',
              display: 'flex', alignItems: 'center',
            }}
            aria-label="Toggle menu"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4.5, width: 20 }}>
              <span style={{ display: 'block', height: 1.5, background: '#fff', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
              <span style={{ display: 'block', height: 1.5, background: '#fff', transition: 'all 0.3s', opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? 'translateX(-8px)' : 'none' }} />
              <span style={{ display: 'block', height: 1.5, background: '#fff', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu — tablet 768-959px only */}
      <div
        className="max-[767px]:!hidden min-[960px]:!hidden"
        style={{
          position: 'fixed', inset: 0, zIndex: 190,
          background: 'linear-gradient(160deg, #060A10 0%, #091525 50%, #060A10 100%)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.42s cubic-bezier(0.16,1,0.3,1)',
          overflowY: 'auto',
          paddingTop: 80,
          paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
        }}
      >
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '20%', right: '-10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ padding: '0 28px' }}>
          {/* Logo */}
          <div style={{ marginBottom: 36, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <BrandImage src={saiLogo} alt="Sai Enterprises" style={{ height: 32 }} />
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: '#fff' }}>Sai Enterprises</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Graphic Machinery · Est. 2000</div>
            </div>
          </div>

          {/* Nav links with stagger */}
          {navLinks.map((link, i) => (
            <div
              key={link.to}
              style={{
                transform: mobileOpen ? 'translateX(0)' : 'translateX(32px)',
                opacity: mobileOpen ? 1 : 0,
                transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${0.06 + i * 0.06}s`,
              }}
            >
              <Link
                to={link.to}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(30px,7vw,46px)', fontWeight: 700,
                  color: isActive(link.to) ? '#3B82F6' : '#fff',
                  textDecoration: 'none', padding: '11px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
              >
                <span>
                  {isActive(link.to) && (
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#3B82F6', marginRight: 10, verticalAlign: 'middle' }} />
                  )}
                  {link.label}
                </span>
                <span style={{ fontSize: 18, color: isActive(link.to) ? '#3B82F6' : 'rgba(255,255,255,0.2)' }}>→</span>
              </Link>
            </div>
          ))}

          {/* CTA & contact */}
          <div style={{
            marginTop: 32,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
            opacity: mobileOpen ? 1 : 0,
            transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1) 0.46s',
          }}>
            <Link to="/contact" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
              color: '#fff', textDecoration: 'none',
              background: 'linear-gradient(135deg, #2563EB, #3B82F6)',
              padding: '15px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
              borderRadius: 10,
              boxShadow: '0 8px 24px rgba(59,130,246,0.25)',
            }}>
              Get a Quote →
            </Link>

            <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <a href="tel:+919312175513" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                padding: '10px 12px', background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8,
                textAlign: 'center',
              }}>
                📞 Call India
              </a>
              <a href="mailto:msrao@saienterprises.info" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                padding: '10px 12px', background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8,
                textAlign: 'center',
              }}>
                ✉️ Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
