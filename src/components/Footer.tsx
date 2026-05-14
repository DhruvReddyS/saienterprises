import { Link } from 'react-router-dom';
import { productCategories } from '@/data/products';
import saiLogo from '@/assets/sai-logo-cmyk.png';

const IcoPhone = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.95a16 16 0 0 0 6.29 6.29l1.41-1.41a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const IcoMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IcoChevron = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const Footer = () => (
  <footer style={{ background: '#040810', color: '#fff', overflow: 'hidden', position: 'relative' }}>
    {/* Top ambient glow */}
    <div style={{
      position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
      width: 600, height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)',
      pointerEvents: 'none',
    }} />

    {/* Main content */}
    <div style={{ maxWidth: 1300, margin: '0 auto', padding: '72px 56px 0' }} className="max-md:!px-6">
      <div style={{
        display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: 56,
        paddingBottom: 52, borderBottom: '1px solid rgba(255,255,255,0.06)',
      }} className="max-[900px]:!grid-cols-1 max-[900px]:!gap-10">

        {/* Brand column */}
        <div>
          {/* Logo block */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28,
            paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <img src={saiLogo} alt="Sai Enterprises" loading="lazy" decoding="async" style={{ height: 40, objectFit: 'contain', flexShrink: 0 }} />
            <div>
              <div style={{
                fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}>
                Sai Enterprises
              </div>
              <div style={{
                fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.32)', marginTop: 3,
              }}>
                Graphic Machinery · Est. 2000
              </div>
            </div>
          </div>

          <p style={{
            fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.85,
            maxWidth: 320, marginBottom: 28,
          }}>
            India's trusted graphic machinery supplier since 2000. Pre-press to post-press, corrugation, and allied finishing workflows — delivered end-to-end by one team.
          </p>

          {/* Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[
              { Icon: IcoPhone, label: '+91 931 217 5513', href: 'tel:+919312175513' },
              { Icon: IcoPhone, label: '+91 939 767 8950', href: 'tel:+919397678950' },
              { Icon: IcoMail, label: 'msrao@saienterprises.info', href: 'mailto:msrao@saienterprises.info' },
              { Icon: IcoMail, label: 'venkat@saienterprises.info', href: 'mailto:venkat@saienterprises.info' },
            ].map((c, i) => (
              <a key={i} href={c.href} style={{
                display: 'flex', alignItems: 'center', gap: 9,
                fontSize: 12.5, color: 'rgba(255,255,255,0.42)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#60A5FA'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.42)'; }}
              >
                <span style={{ color: 'rgba(255,255,255,0.22)', flexShrink: 0 }}><c.Icon /></span>
                {c.label}
              </a>
            ))}
          </div>

          {/* Offices */}
          <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 7 }}>
              Offices
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
              Hyderabad · Delhi · Pune · Vijayawada · Nairobi
            </div>
          </div>
        </div>

        {/* Navigate */}
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 22, fontWeight: 700 }}>
            Navigate
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Machinery', to: '/machinery' },
              { label: 'About Sai Enterprises', to: '/about' },
              { label: 'Partners', to: '/partners' },
              { label: 'E-Brochure', to: '/brochure' },
              { label: 'Contact Us', to: '/contact' },
            ].map((l) => (
              <Link key={l.to} to={l.to} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
              >
                <span style={{ color: 'rgba(255,255,255,0.15)', flexShrink: 0 }}><IcoChevron /></span>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Machinery */}
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 22, fontWeight: 700 }}>
            Machinery
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {productCategories.map((cat) => (
              <Link key={cat.slug} to={`/machinery/${cat.slug}`} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
              >
                <span style={{ color: 'rgba(255,255,255,0.15)', flexShrink: 0 }}><IcoChevron /></span>
                {cat.name}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 28, padding: '18px 20px', background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.18)' }}>
            <div style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#60A5FA', marginBottom: 5, fontWeight: 700 }}>
              Exclusive Partnership
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
              HPM Sole Agent<br />in India
            </div>
            <Link to="/partners" style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              marginTop: 10, fontSize: 10, color: '#60A5FA', textDecoration: 'none',
              letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
            }}>
              Learn More →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 0 24px', flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>
          © 2026 Sai Enterprises · All rights reserved · Hyderabad, India
        </span>
        <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)' }}>
          HPM · Graphic Machinery · Est. 2000
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
