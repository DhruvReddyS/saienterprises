import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import saiLogo from '@/assets/sai-logo-cmyk.png';
import BrandImage from '@/components/BrandImage';
import { productCategories } from '@/data/products';

const navLinks = [
  { label: 'Home',      to: '/' },
  { label: 'Machinery', to: '/machinery' },
  { label: 'About',     to: '/about' },
  { label: 'Partners',  to: '/partners' },
  { label: 'Brochure',  to: '/brochure' },
  { label: 'Contact Us', shortLabel: 'Contact', to: '/contact' },
];

/* Category glyphs for the Machinery panel. Drawn here rather than imported so
   the whole set shares one stroke weight and optical size. */
const CAT_ICON: Record<string, JSX.Element> = {
  'pre-press': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" /><path d="m3 12.5 9 4.5 9-4.5" /><path d="m3 17 9 4.5 9-4.5" />
    </svg>
  ),
  press: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="9" width="18" height="8" rx="2" /><path d="M7 9V4h10v5M7 17v3h10v-3" /><circle cx="17.5" cy="13" r="1" />
    </svg>
  ),
  'post-press': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4v16h16" /><path d="M8 16V9M12 16v-4M16 16v-7" /><circle cx="19" cy="5" r="2" />
    </svg>
  ),
  corrugation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9c1.5 0 1.5-3 3-3s1.5 3 3 3 1.5-3 3-3 1.5 3 3 3 1.5-3 3-3 1.5 3 3 3" />
      <path d="M3 12v7h18v-7" /><path d="M9 19v-7M15 19v-7" />
    </svg>
  ),
  allied: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a4 4 0 0 1-5 5L5 16v3h3l4.7-4.7a4 4 0 0 0 5-5l-2.3 2.3-2-2 2.3-2.3Z" />
    </svg>
  ),
};

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<number>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMegaOpen(false); setMobileOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const openMega = () => { window.clearTimeout(closeTimer.current); setMegaOpen(true); };
  /* Grace period so the pointer can travel from the trigger down into the panel. */
  const closeMega = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 150);
  };

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const totalMachines = productCategories.reduce((n, c) => n + c.products.length, 0);

  return (
    <>
      {/* ══ PHONE BOTTOM NAV (<768px) ══ */}
      <nav className="pnav min-[768px]:!hidden" aria-label="Primary">
        {navLinks.map((link) => {
          const active = isActive(link.to);
          const icons: Record<string, JSX.Element> = {
            '/':          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
            '/machinery': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
            '/about':     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
            '/partners':  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
            '/brochure':  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
            '/contact':   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.58 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.62-.62a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.27 16.92z"/></svg>,
          };
          return (
            <Link key={link.to} to={link.to} className={`pnav__item${active ? ' is-active' : ''}`}>
              <span className="pnav__ico">{icons[link.to]}</span>
              <span className="pnav__label">{'shortLabel' in link ? link.shortLabel : link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ══ DESKTOP / TABLET HEADER ══ */}
      <header className={`hdr max-[767px]:!hidden${scrolled ? ' is-scrolled' : ''}`}>
        <div className="hdr__main">
          <div className="hdr__main-in">
            <Link to="/" className="hdr__brand">
              <BrandImage src={saiLogo} alt="Sai Enterprises" style={{ height: 34 }} />
              <span className="hdr__brand-tx">
                <strong>Sai Enterprises</strong>
                <small>Graphic Machinery · Est. 2000</small>
              </span>
            </Link>

            <nav className="hdr__nav !hidden min-[960px]:!flex" aria-label="Main">
              {navLinks.filter((l) => l.to !== '/contact').map((link) => {
                const isMachinery = link.to === '/machinery';
                return (
                  <div
                    key={link.to}
                    className="hdr__nav-slot"
                    onMouseEnter={isMachinery ? openMega : closeMega}
                    onMouseLeave={isMachinery ? closeMega : undefined}
                  >
                    <Link
                      to={link.to}
                      className={`hdr__link${isActive(link.to) ? ' is-active' : ''}${isMachinery && megaOpen ? ' is-open' : ''}`}
                      aria-expanded={isMachinery ? megaOpen : undefined}
                    >
                      {link.label}
                      {isMachinery && (
                        <svg className="hdr__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div className="hdr__actions">
              <Link to="/contact" className="hdr__cta !hidden min-[960px]:!inline-flex">
                Request a quote
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </Link>

              <button
                className="hdr__burger min-[960px]:!hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
                <span style={{ opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? 'translateX(-8px)' : 'none' }} />
                <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
              </button>
            </div>
          </div>
        </div>

        {/* ── MACHINERY PANEL ── */}
        <div
          className={`mega${megaOpen ? ' is-open' : ''}`}
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          aria-hidden={!megaOpen}
        >
          <div className="mega__in">
            <div className="mega__grid">
              {productCategories.map((cat, i) => (
                <Link
                  key={cat.id}
                  to={`/machinery?category=${cat.slug}`}
                  className="mega__card"
                  style={{ transitionDelay: megaOpen ? `${40 + i * 35}ms` : '0ms' }}
                >
                  <span className="mega__ico">{CAT_ICON[cat.id]}</span>
                  <span className="mega__name">{cat.name}</span>
                  <span className="mega__count">{cat.products.length} machines</span>
                  <span className="mega__desc">{cat.description}</span>
                  <span className="mega__go">
                    Browse
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </Link>
              ))}
            </div>

            <div className="mega__foot">
              <span>Not sure which machine fits your floor?</span>
              <div className="mega__foot-links">
                <Link to="/machinery">All {totalMachines} machines</Link>
                <Link to="/brochure">E-brochure</Link>
                <Link to="/contact">Talk to an engineer</Link>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          /* ══ HEADER ══════════════════════════════════════════════ */
          .hdr {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 200;
          }
          .hdr::before {
            content: '';
            position: absolute;
            inset: 0;
            background: hsl(var(--s-0) / 0.74);
            backdrop-filter: blur(20px) saturate(165%);
            -webkit-backdrop-filter: blur(20px) saturate(165%);
            border-bottom: 1px solid transparent;
            transition: background .4s ease, border-color .4s ease, box-shadow .4s ease;
          }
          .hdr.is-scrolled::before {
            background: hsl(var(--s-0) / 0.92);
            border-bottom-color: rgb(var(--line-1));
            box-shadow: 0 10px 30px -12px rgb(2 6 14 / 0.8);
          }

          .hdr__main { position: relative; }
          .hdr__main-in {
            max-width: 1340px; margin: 0 auto;
            height: 70px;
            padding: 0 clamp(18px, 3vw, 40px);
            display: flex; align-items: center; justify-content: space-between;
            gap: 26px;
            transition: height .42s var(--ease-out-expo);
          }
          .hdr.is-scrolled .hdr__main-in { height: 62px; }

          .hdr__brand { display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0; }
          .hdr__brand-tx { display: flex; flex-direction: column; gap: 3px; }
          .hdr__brand-tx strong {
            font-family: var(--font-display);
            font-size: 17px; font-weight: 700; letter-spacing: -0.03em;
            color: #fff; line-height: 1;
          }
          .hdr__brand-tx small {
            font-family: var(--font-mono);
            font-size: 8.5px; font-weight: 500; line-height: 1;
            letter-spacing: 0.16em; text-transform: uppercase;
            color: rgb(var(--fg-4));
          }

          .hdr__nav { align-items: center; gap: 4px; }
          .hdr__nav-slot { position: relative; }
          .hdr__link {
            position: relative;
            display: inline-flex; align-items: center; gap: 5px;
            padding: 9px 13px;
            border-radius: var(--r-sm);
            font-family: var(--font-mono);
            font-size: 10.5px; font-weight: 500;
            letter-spacing: 0.1em; text-transform: uppercase;
            text-decoration: none; color: rgb(var(--fg-3));
            white-space: nowrap;
            transition: color .22s ease, background .22s ease;
          }
          .hdr__link.is-active,
          .hdr__link.is-open { font-weight: 700; }
          .hdr__link:hover,
          .hdr__link.is-open { color: #fff; background: rgb(255 255 255 / 0.06); }
          .hdr__link.is-active { color: #fff; }
          /* A measured tick, not a generic underline. */
          .hdr__link.is-active::after {
            content: '';
            position: absolute; left: 50%; bottom: 1px;
            width: 14px; height: 2px; margin-left: -7px;
            border-radius: 2px;
            background: linear-gradient(90deg, hsl(var(--brand)), hsl(var(--accent-cy)));
            box-shadow: 0 0 10px hsl(var(--brand) / 0.8);
          }
          .hdr__caret { width: 11px; height: 11px; transition: transform .28s var(--ease-out-expo); }
          .hdr__link.is-open .hdr__caret { transform: rotate(180deg); }

          .hdr__actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
          .hdr__cta {
            align-items: center; gap: 8px;
            padding: 11px 19px;
            font-family: var(--font-mono);
            border-radius: var(--r-pill);
            border: 1px solid hsl(var(--brand) / 0.9);
            background: linear-gradient(180deg, hsl(var(--brand-lift)) -25%, hsl(var(--brand)) 48%, hsl(var(--brand-deep)) 155%);
            color: #fff;
            font-size: 10px; font-weight: 700;
            letter-spacing: 0.1em; text-transform: uppercase;
            text-decoration: none; white-space: nowrap;
            box-shadow: var(--rim-strong), 0 6px 18px -7px hsl(var(--brand) / 0.6);
            transition: transform .3s var(--ease-out-expo), box-shadow .3s ease, filter .3s ease;
          }
          .hdr__cta svg { width: 13px; height: 13px; transition: transform .3s var(--ease-out-expo); }
          .hdr__cta:hover {
            transform: translateY(-2px); filter: brightness(1.08);
            box-shadow: var(--rim-strong), 0 14px 30px -9px hsl(var(--brand) / 0.75);
          }
          .hdr__cta:hover svg { transform: translate(2px, -2px); }
          .hdr__cta:active { transform: translateY(0); }

          .hdr__burger {
            background: none; border: none; cursor: pointer;
            display: flex; flex-direction: column; gap: 4.5px;
            width: 42px; height: 42px;
            align-items: center; justify-content: center; padding: 0;
          }
          .hdr__burger span {
            display: block; width: 20px; height: 1.5px;
            background: #fff; border-radius: 2px;
            transition: transform .3s var(--ease-out-expo), opacity .3s ease;
          }

          /* ══ MACHINERY PANEL ════════════════════════════════════ */
          .mega {
            position: absolute;
            top: 100%; left: 0; right: 0;
            opacity: 0; visibility: hidden;
            transform: translateY(-8px);
            transition: opacity .26s ease, transform .34s var(--ease-out-expo), visibility .26s;
            pointer-events: none;
          }
          .mega.is-open { opacity: 1; visibility: visible; transform: translateY(0); pointer-events: auto; }
          .mega__in {
            max-width: 1340px; margin: 0 auto;
            padding: 22px clamp(18px, 3vw, 40px) 18px;
            border-radius: 0 0 var(--r-xl) var(--r-xl);
            border: 1px solid rgb(var(--line-1));
            border-top: 0;
            background: linear-gradient(180deg, hsl(var(--s-1) / 0.97), hsl(var(--s-0) / 0.98));
            backdrop-filter: blur(22px);
            -webkit-backdrop-filter: blur(22px);
            box-shadow: var(--e-4);
          }
          .mega__grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
          @media (max-width: 1180px) { .mega__grid { grid-template-columns: repeat(3, 1fr); } }

          .mega__card {
            display: flex; flex-direction: column; gap: 7px;
            padding: 18px 16px 16px;
            border-radius: var(--r-md);
            border: 1px solid rgb(var(--line-1));
            background: linear-gradient(180deg, hsl(var(--s-2)), hsl(var(--s-1)));
            box-shadow: var(--rim);
            text-decoration: none;
            opacity: 0; transform: translateY(10px);
            transition: opacity .4s ease, transform .45s var(--ease-out-expo),
                        border-color .25s ease, background .25s ease;
          }
          .mega.is-open .mega__card { opacity: 1; transform: translateY(0); }
          .mega__card:hover {
            border-color: hsl(var(--brand) / 0.42);
            background: linear-gradient(180deg, hsl(var(--s-3)), hsl(var(--s-2)));
          }
          .mega__ico {
            width: 34px; height: 34px;
            display: inline-flex; align-items: center; justify-content: center;
            border-radius: 10px;
            color: hsl(var(--brand-lift));
            background: hsl(var(--brand) / 0.1);
            border: 1px solid hsl(var(--brand) / 0.2);
            margin-bottom: 3px;
          }
          .mega__ico svg { width: 18px; height: 18px; }
          .mega__name { font-family: var(--font-display); font-size: 14px; font-weight: 600; letter-spacing: -0.025em; color: #fff; line-height: 1.2; }
          .mega__count {
            font-family: var(--font-mono);
            font-size: 9px; font-weight: 700;
            letter-spacing: 0.16em; text-transform: uppercase;
            color: hsl(var(--brand-lift));
            font-variant-numeric: tabular-nums;
          }
          .mega__desc {
            font-size: 11.5px; line-height: 1.5; color: rgb(var(--fg-4));
            display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
          }
          .mega__go {
            font-family: var(--font-mono);
            margin-top: auto; padding-top: 10px;
            display: inline-flex; align-items: center; gap: 6px;
            font-size: 9.5px; font-weight: 700;
            letter-spacing: 0.14em; text-transform: uppercase;
            color: rgb(var(--fg-3));
            transition: color .25s ease, gap .25s ease;
          }
          .mega__go svg { width: 12px; height: 12px; }
          .mega__card:hover .mega__go { color: #fff; gap: 10px; }

          .mega__foot {
            margin-top: 16px; padding-top: 14px;
            border-top: 1px solid rgb(var(--line-1));
            display: flex; align-items: center; justify-content: space-between;
            gap: 18px; flex-wrap: wrap;
            font-size: 11.5px; color: rgb(var(--fg-4));
          }
          .mega__foot-links { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
          .mega__foot-links a {
            font-family: var(--font-mono);
            font-size: 10px; font-weight: 700;
            letter-spacing: 0.14em; text-transform: uppercase;
            color: rgb(var(--fg-3)); text-decoration: none;
            padding-bottom: 2px;
            border-bottom: 1px solid transparent;
            transition: color .25s ease, border-color .25s ease;
          }
          .mega__foot-links a:hover { color: #fff; border-bottom-color: hsl(var(--brand)); }

          /* ══ PHONE BOTTOM NAV ══════════════════════════════════ */
          .pnav {
            position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
            display: flex; align-items: stretch;
            background: hsl(var(--s-0) / 0.94);
            backdrop-filter: blur(22px) saturate(160%);
            -webkit-backdrop-filter: blur(22px) saturate(160%);
            border-top: 1px solid rgb(var(--line-1));
            padding-bottom: env(safe-area-inset-bottom, 0px);
          }
          .pnav__item {
            flex: 1; position: relative;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 4px;
            padding: 9px 3px 7px;
            text-decoration: none; color: rgb(var(--fg-4));
            transition: color .22s ease;
          }
          .pnav__item.is-active { color: hsl(var(--brand-lift)); }
          .pnav__item.is-active::before {
            content: '';
            position: absolute; top: 0; left: 50%;
            width: 22px; height: 2px; margin-left: -11px;
            border-radius: 0 0 2px 2px;
            background: linear-gradient(90deg, hsl(var(--brand)), hsl(var(--accent-cy)));
            box-shadow: 0 0 10px hsl(var(--brand) / 0.8);
          }
          .pnav__ico, .pnav__ico svg { display: block; width: 20px; height: 20px; }
          .pnav__label { font-size: 8.5px; font-weight: 650; letter-spacing: 0.08em; line-height: 1; }
          .pnav__item.is-active .pnav__label { font-weight: 750; }

          @media (prefers-reduced-motion: reduce) {
            .hdr__main-in, .mega, .mega__card { transition: none !important; }
          }
        `}</style>
      </header>

      {/* ══ TABLET DRAWER (768–959px) ══ */}
      <div
        className="drawer max-[767px]:!hidden min-[960px]:!hidden"
        data-open={mobileOpen}
        aria-hidden={!mobileOpen}
      >
        <div className="drawer__in">
          <div className="drawer__head">
            <BrandImage src={saiLogo} alt="Sai Enterprises" style={{ height: 32 }} />
            <div>
              <div className="drawer__name">Sai Enterprises</div>
              <div className="drawer__sub">Graphic Machinery · Est. 2000</div>
            </div>
          </div>

          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`drawer__link${isActive(link.to) ? ' is-active' : ''}`}
              style={{ transitionDelay: mobileOpen ? `${70 + i * 55}ms` : '0ms' }}
            >
              <span className="drawer__idx">0{i + 1}</span>
              <span className="drawer__label">{link.label}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          ))}

          <div className="drawer__contact" style={{ transitionDelay: mobileOpen ? '420ms' : '0ms' }}>
            <Link to="/contact">Request a quote</Link>
            <Link to="/machinery">Browse machinery</Link>
          </div>
        </div>

        <style>{`
          .drawer {
            position: fixed; inset: 0; z-index: 190;
            background: linear-gradient(165deg, hsl(var(--s-1)) 0%, hsl(var(--s-0)) 60%);
            transform: translateX(100%);
            transition: transform .5s var(--ease-out-expo);
            overflow-y: auto;
            padding: 118px 34px calc(40px + env(safe-area-inset-bottom, 0px));
          }
          .drawer[data-open='true'] { transform: translateX(0); }
          .drawer__in { max-width: 620px; margin: 0 auto; }
          .drawer__head {
            display: flex; align-items: center; gap: 13px;
            padding-bottom: 22px; margin-bottom: 14px;
            border-bottom: 1px solid rgb(var(--line-1));
          }
          .drawer__name { font-size: 18px; font-weight: 760; color: #fff; letter-spacing: -0.02em; }
          .drawer__sub {
            font-size: 8.5px; letter-spacing: 0.2em; text-transform: uppercase;
            color: rgb(var(--fg-4)); margin-top: 3px;
          }
          .drawer__link {
            display: flex; align-items: center; gap: 16px;
            padding: 18px 2px;
            border-bottom: 1px solid rgb(var(--line-1));
            text-decoration: none; color: #fff;
            opacity: 0; transform: translateX(26px);
            transition: opacity .45s ease, transform .5s var(--ease-out-expo), color .22s ease;
          }
          .drawer[data-open='true'] .drawer__link { opacity: 1; transform: translateX(0); }
          .drawer__idx {
            font-family: var(--font-mono);
            font-size: 9.5px; font-weight: 700; letter-spacing: 0.16em;
            color: hsl(var(--brand-lift)); font-variant-numeric: tabular-nums;
            width: 20px; flex-shrink: 0;
          }
          .drawer__label { font-family: var(--font-display); font-size: clamp(26px, 5vw, 38px); font-weight: 700; letter-spacing: -0.035em; flex: 1; }
          .drawer__link.is-active .drawer__label { color: hsl(var(--brand-lift)); }
          .drawer__link svg { width: 19px; height: 19px; color: rgb(var(--fg-4)); transition: transform .3s var(--ease-out-expo); }
          .drawer__link:hover svg { transform: translateX(4px); color: #fff; }
          .drawer__contact {
            margin-top: 26px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
            opacity: 0; transform: translateY(16px);
            transition: opacity .45s ease, transform .5s var(--ease-out-expo);
          }
          .drawer[data-open='true'] .drawer__contact { opacity: 1; transform: translateY(0); }
          .drawer__contact a, .drawer__contact a:link {
            padding: 14px 16px; text-align: center;
            border-radius: var(--r-pill);
            border: 1px solid rgb(var(--line-2));
            background: hsl(var(--s-2));
            box-shadow: var(--rim);
            color: rgb(var(--fg-2)); text-decoration: none;
            font-size: 10.5px; font-weight: 700;
            letter-spacing: 0.1em; text-transform: uppercase;
          }
          .drawer__contact a:hover { color: #fff; border-color: hsl(var(--brand) / 0.5); }
        `}</style>
      </div>
    </>
  );
};

export default Header;
