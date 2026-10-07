import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { productCategories } from '@/data/products';
import saiLogo from '@/assets/sai-logo-cmyk.png';
import hpmLogo from '@/assets/optimized/hpm-logo.webp';

const NAV = [
  { label: 'Home',       to: '/' },
  { label: 'Machinery',  to: '/machinery' },
  { label: 'About Us',   to: '/about' },
  { label: 'Partners',   to: '/partners' },
  { label: 'E-Brochure', to: '/brochure' },
  { label: 'Contact',    to: '/contact' },
];

const OFFICES = [
  { city: 'Hyderabad',  role: 'Head office', detail: 'Sai Arcade, Balkampet' },
  { city: 'New Delhi',  role: 'Branch',      detail: 'Janakpuri' },
  { city: 'Pune',       role: 'Regional',    detail: 'Maharashtra' },
  { city: 'Vijayawada', role: 'Regional',    detail: 'Andhra Pradesh' },
  { city: 'Nairobi',    role: 'East Africa', detail: 'Kenya' },
];

/* Phone numbers live on the contact page only. */
const CONTACTS = [
  { label: 'msrao@saienterprises.info',  href: 'mailto:msrao@saienterprises.info',  kind: 'mail' as const, note: 'Sales' },
  { label: 'venkat@saienterprises.info', href: 'mailto:venkat@saienterprises.info', kind: 'mail' as const, note: 'Service' },
];

const IcoMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const CinematicFooter = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const frame = useRef<number>();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.04 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => () => { if (frame.current) cancelAnimationFrame(frame.current); }, []);

  /* Pointer glow, driven by transform and coalesced to one write per frame. */
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node || frame.current) return;
    const x = e.clientX;
    const y = e.clientY;
    frame.current = requestAnimationFrame(() => {
      frame.current = undefined;
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--fx', `${x - rect.left}px`);
      node.style.setProperty('--fy', `${y - rect.top}px`);
    });
  };

  return (
    <footer ref={ref} onMouseMove={handleMouseMove} className={`ftr${visible ? ' is-in' : ''}`}>
      <div className="ftr__grid-bg" aria-hidden="true" />
      <div className="ftr__glow" aria-hidden="true" />

      {/* ══ CLOSING CTA ══ */}
      <section className="ftr__cta">
        <div className="ftr__cta-in">
          <div className="ftr__cta-copy">
            <span className="ftr__eyebrow"><i />Let's talk machinery</span>
            <h2 className="ftr__cta-title">
              Tell us your output.<br />
              <span>We'll spec the floor.</span>
            </h2>
            <p className="ftr__cta-sub">
              Share your volume, floor space and budget. You get a straight
              recommendation from the people who install and service these machines.
            </p>
          </div>

          <div className="ftr__cta-actions">
            <Link to="/contact" className="ftr__btn ftr__btn--solid">
              Request a quote
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
            </Link>
            <Link to="/machinery" className="ftr__btn ftr__btn--ghost">
              Browse machinery
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <span className="ftr__cta-note">Replies within 24 hours · Mon–Sat</span>
          </div>
        </div>
      </section>

      {/* ══ DIRECTORY ══ */}
      <div className="ftr__body">
        <div className="ftr__cols">
          <div className="ftr__col ftr__col--brand">
            <Link to="/" className="ftr__brand">
              <img src={saiLogo} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <span>
                <strong>Sai Enterprises</strong>
                <small>Graphic Machinery · Est. 2000</small>
              </span>
            </Link>

            <p className="ftr__blurb">
              India's trusted graphic machinery supplier — pre-press to post-press,
              corrugation and allied finishing, handled end to end by one team.
            </p>

            <div className="ftr__contacts">
              {CONTACTS.map((c) => (
                <a key={c.href} href={c.href} className="ftr__contact">
                  <span className="ftr__contact-ico"><IcoMail /></span>
                  <span className="ftr__contact-tx">
                    {c.label}
                    {c.note && <em>{c.note}</em>}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="ftr__col">
            <h3 className="ftr__h">Navigate</h3>
            <ul className="ftr__list">
              {NAV.map((l) => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="ftr__col">
            <h3 className="ftr__h">Machinery</h3>
            <ul className="ftr__list">
              {productCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/machinery?category=${cat.slug}`}>
                    {cat.name}
                    <b>{cat.products.length}</b>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ftr__col">
            <h3 className="ftr__h">Partnership</h3>
            <Link to="/partners" className="ftr__hpm">
              <img src={hpmLogo} alt="HPM" loading="lazy" decoding="async" />
              <strong>Sole agent in India</strong>
              <span>Machines, spares and service — direct from the manufacturer.</span>
              <em>
                View partnership
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </em>
            </Link>
          </div>
        </div>

        <div className="ftr__offices">
          <h3 className="ftr__h">Offices</h3>
          <div className="ftr__offices-grid">
            {OFFICES.map((o) => (
              <div key={o.city} className="ftr__office">
                <span className="ftr__office-city">{o.city}</span>
                <span className="ftr__office-role">{o.role}</span>
                <span className="ftr__office-detail">{o.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ WORDMARK ══ */}
      <div className="ftr__mark" aria-hidden="true">
        <span>SAI ENTERPRISES</span>
      </div>

      {/* ══ LEGAL ══ */}
      <div className="ftr__legal">
        <span>© {new Date().getFullYear()} Sai Enterprises · Hyderabad, India</span>
        <span className="ftr__legal-mid">Graphic machinery · India &amp; East Africa</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
        </button>
      </div>

      <style>{`
        .ftr {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background: linear-gradient(180deg, hsl(var(--s-1)) 0%, hsl(var(--s-0)) 42%, #02050B 100%);
          color: rgb(var(--fg-2));
        }
        .ftr__grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(46,144,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(46,144,255,0.045) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, #000 10%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, #000 10%, transparent 75%);
        }
        .ftr__glow {
          position: absolute; left: 0; top: 0; z-index: 0;
          width: 640px; height: 640px;
          margin: -320px 0 0 -320px;
          pointer-events: none;
          transform: translate3d(var(--fx, 50%), var(--fy, 30%), 0);
          background: radial-gradient(circle, rgba(46,144,255,0.1) 0%, rgba(46,144,255,0.03) 36%, transparent 68%);
          transition: transform .45s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }
        @media (max-width: 767px) { .ftr__glow { display: none; } }

        .ftr > *:not(.ftr__grid-bg):not(.ftr__glow) { position: relative; z-index: 1; }

        /* ══ CTA ══════════════════════════════════════════════ */
        .ftr__cta {
          border-bottom: 1px solid rgb(var(--line-1));
          background: radial-gradient(ellipse 70% 120% at 15% 0%, hsl(var(--brand) / 0.1), transparent 62%);
        }
        .ftr__cta-in {
          max-width: 1300px; margin: 0 auto;
          padding: clamp(56px, 7vw, 96px) clamp(18px, 4vw, 56px);
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: end;
        }
        @media (max-width: 900px) { .ftr__cta-in { grid-template-columns: 1fr; align-items: start; } }

        .ftr__eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: hsl(var(--brand-lift));
          margin-bottom: 20px;
        }
        .ftr__eyebrow i {
          width: 22px; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, hsl(var(--brand)), hsl(var(--accent-cy)));
        }
        .ftr__cta-title {
          font-size: clamp(32px, 4.6vw, 62px);
          font-weight: 760; line-height: 1.02; letter-spacing: -0.038em;
          color: #fff; margin: 0 0 18px;
        }
        .ftr__cta-title span {
          background: linear-gradient(100deg, hsl(var(--brand-lift)), hsl(var(--accent-cy)));
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ftr__cta-sub {
          font-size: 14.5px; line-height: 1.72;
          color: rgb(var(--fg-3)); max-width: 460px; margin: 0;
        }

        .ftr__cta-actions { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
        .ftr__btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 9px;
          padding: 15px 26px;
          border-radius: var(--r-pill);
          font-size: 11.5px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none; white-space: nowrap;
          transition: transform .3s var(--ease-out-expo), box-shadow .3s ease,
                      filter .3s ease, border-color .3s ease, background .3s ease, color .3s ease;
        }
        .ftr__btn svg { width: 14px; height: 14px; transition: transform .3s var(--ease-out-expo); }
        .ftr__btn--solid {
          color: #fff;
          border: 1px solid hsl(var(--brand) / 0.9);
          background: linear-gradient(180deg, hsl(var(--brand-lift)) -25%, hsl(var(--brand)) 48%, hsl(var(--brand-deep)) 155%);
          box-shadow: var(--rim-strong), 0 10px 26px -9px hsl(var(--brand) / 0.65);
        }
        .ftr__btn--solid:hover {
          transform: translateY(-2px); filter: brightness(1.08);
          box-shadow: var(--rim-strong), 0 18px 38px -10px hsl(var(--brand) / 0.8);
        }
        .ftr__btn--solid:hover svg { transform: translate(2px, -2px); }
        .ftr__btn--ghost {
          color: rgb(var(--fg-2));
          border: 1px solid rgb(var(--line-2));
          background: hsl(var(--s-2) / 0.7);
          box-shadow: var(--rim);
        }
        .ftr__btn--ghost:hover { color: #fff; border-color: hsl(var(--brand) / 0.5); transform: translateY(-2px); }
        .ftr__cta-note {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgb(var(--fg-4)); margin-top: 2px;
        }

        /* ══ DIRECTORY ════════════════════════════════════════ */
        .ftr__body {
          max-width: 1300px; margin: 0 auto;
          padding: clamp(44px, 5vw, 68px) clamp(18px, 4vw, 56px) 0;
        }
        .ftr__cols {
          display: grid;
          grid-template-columns: 1.7fr 1fr 1.15fr 1.25fr;
          gap: clamp(26px, 3.4vw, 52px);
        }
        @media (max-width: 1000px) { .ftr__cols { grid-template-columns: 1fr 1fr; gap: 36px; } }
        @media (max-width: 560px)  { .ftr__cols { grid-template-columns: 1fr; gap: 32px; } }

        .ftr__col { opacity: 0; transform: translateY(16px); transition: opacity .7s ease, transform .7s var(--ease-out-expo); }
        .ftr.is-in .ftr__col { opacity: 1; transform: none; }
        .ftr.is-in .ftr__col:nth-child(2) { transition-delay: .07s; }
        .ftr.is-in .ftr__col:nth-child(3) { transition-delay: .14s; }
        .ftr.is-in .ftr__col:nth-child(4) { transition-delay: .21s; }

        .ftr__brand { display: flex; align-items: center; gap: 12px; text-decoration: none; margin-bottom: 18px; }
        .ftr__brand img { height: 34px; width: auto; object-fit: contain; }
        .ftr__brand strong { display: block; font-size: 15.5px; font-weight: 760; color: #fff; letter-spacing: -0.022em; line-height: 1; }
        .ftr__brand small {
          display: block; margin-top: 4px;
          font-size: 8px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgb(var(--fg-4));
        }
        .ftr__blurb { font-size: 13px; line-height: 1.75; color: rgb(var(--fg-3)); max-width: 350px; margin: 0 0 22px; }

        .ftr__contacts { display: flex; flex-direction: column; gap: 10px; }
        .ftr__contact {
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none; color: rgb(var(--fg-2));
          font-size: 13px;
          transition: color .22s ease, transform .22s var(--ease-out-expo);
          width: fit-content;
        }
        .ftr__contact-ico {
          width: 28px; height: 28px; flex-shrink: 0;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 8px;
          color: hsl(var(--brand-lift));
          background: hsl(var(--brand) / 0.09);
          border: 1px solid hsl(var(--brand) / 0.18);
          transition: background .22s ease, border-color .22s ease;
        }
        .ftr__contact-ico svg { width: 13px; height: 13px; }
        .ftr__contact-tx em { font-style: normal; color: rgb(var(--fg-4)); font-size: 11px; margin-left: 7px; }
        .ftr__contact:hover { color: #fff; transform: translateX(3px); }
        .ftr__contact:hover .ftr__contact-ico { background: hsl(var(--brand) / 0.18); border-color: hsl(var(--brand) / 0.4); }

        .ftr__h {
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: hsl(var(--brand-lift));
          margin: 0 0 18px;
        }

        .ftr__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1px; }
        .ftr__list a {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 8px 0;
          font-size: 13.5px;
          color: rgb(var(--fg-3));
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: color .22s ease, padding-left .28s var(--ease-out-expo), border-color .22s ease;
        }
        .ftr__list a:hover { color: #fff; padding-left: 8px; border-bottom-color: rgb(var(--line-1)); }
        .ftr__list b {
          font-size: 10px; font-weight: 700;
          color: rgb(var(--fg-4));
          font-variant-numeric: tabular-nums;
          padding: 2px 7px;
          border-radius: var(--r-pill);
          background: rgb(255 255 255 / 0.05);
          transition: background .22s ease, color .22s ease;
        }
        .ftr__list a:hover b { background: hsl(var(--brand) / 0.2); color: hsl(var(--brand-lift)); }

        .ftr__hpm {
          display: flex; flex-direction: column; align-items: flex-start; gap: 9px;
          padding: 20px 18px;
          border-radius: var(--r-lg);
          border: 1px solid rgb(var(--line-1));
          background: linear-gradient(170deg, hsl(var(--s-2)), hsl(var(--s-1)));
          box-shadow: var(--rim), var(--e-1);
          text-decoration: none;
          transition: transform .3s var(--ease-out-expo), border-color .3s ease, box-shadow .3s ease;
        }
        .ftr__hpm:hover {
          transform: translateY(-3px);
          border-color: hsl(var(--brand) / 0.35);
          box-shadow: var(--rim-strong), var(--e-3);
        }
        .ftr__hpm img { width: 58px; height: auto; object-fit: contain; }
        .ftr__hpm strong { font-size: 14px; font-weight: 740; color: #fff; letter-spacing: -0.02em; }
        .ftr__hpm span { font-size: 12.5px; line-height: 1.6; color: rgb(var(--fg-4)); }
        .ftr__hpm em {
          font-style: normal; margin-top: 4px;
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: hsl(var(--brand-lift));
          transition: gap .25s ease;
        }
        .ftr__hpm em svg { width: 12px; height: 12px; }
        .ftr__hpm:hover em { gap: 11px; }

        .ftr__offices { margin-top: clamp(38px, 4vw, 56px); }
        .ftr__offices-grid {
          display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px;
          border: 1px solid rgb(var(--line-1));
          border-radius: var(--r-lg);
          overflow: hidden;
          background: rgb(var(--line-1));
        }
        @media (max-width: 900px) { .ftr__offices-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 460px) { .ftr__offices-grid { grid-template-columns: 1fr; } }
        .ftr__office {
          display: flex; flex-direction: column; gap: 5px;
          padding: 18px 16px;
          background: hsl(var(--s-1));
          transition: background .25s ease;
        }
        .ftr__office:hover { background: hsl(var(--s-2)); }
        .ftr__office-city { font-size: 14px; font-weight: 720; color: #fff; letter-spacing: -0.02em; }
        .ftr__office-role {
          font-size: 8.5px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: hsl(var(--brand-lift));
        }
        .ftr__office-detail { font-size: 11.5px; color: rgb(var(--fg-4)); }

        /* ══ WORDMARK ═════════════════════════════════════════ */
        .ftr__mark {
          margin-top: clamp(40px, 5vw, 64px);
          padding: 0 clamp(18px, 4vw, 56px);
          overflow: hidden;
          text-align: center;
          line-height: 0.8;
        }
        .ftr__mark span {
          display: block;
          font-size: clamp(42px, 11.4vw, 176px);
          font-weight: 780;
          letter-spacing: -0.045em;
          white-space: nowrap;
          user-select: none;
          color: transparent;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.2) 0%,
            rgba(46,144,255,0.15) 46%,
            rgba(255,255,255,0) 92%);
          -webkit-background-clip: text;
          background-clip: text;
          opacity: 0;
          transform: translateY(18%);
          transition: opacity 1s ease .15s, transform 1.1s var(--ease-out-expo) .15s;
        }
        .ftr.is-in .ftr__mark span { opacity: 1; transform: translateY(8%); }

        /* ══ LEGAL ════════════════════════════════════════════ */
        .ftr__legal {
          max-width: 1300px; margin: 0 auto;
          padding: 22px clamp(18px, 4vw, 56px) 30px;
          border-top: 1px solid rgb(var(--line-1));
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
          font-size: 10.5px;
          color: rgb(var(--fg-4));
        }
        .ftr__legal button {
          display: inline-flex; align-items: center; gap: 8px;
          background: none; border: none; cursor: pointer;
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgb(var(--fg-3));
          transition: color .22s ease;
        }
        .ftr__legal button svg { width: 13px; height: 13px; transition: transform .28s var(--ease-out-expo); }
        .ftr__legal button:hover { color: #fff; }
        .ftr__legal button:hover svg { transform: translateY(-3px); }
        @media (max-width: 680px) {
          .ftr__legal { flex-direction: column; align-items: flex-start; gap: 12px; }
          .ftr__legal-mid { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ftr__col, .ftr__mark span, .ftr__glow { transition: none !important; }
        }
      `}</style>
    </footer>
  );
};

export default CinematicFooter;
