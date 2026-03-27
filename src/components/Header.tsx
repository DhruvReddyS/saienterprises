import { useState, useEffect, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import saiLogoCmyk from '@/assets/sai-logo-cmyk.png';
import { productCategories } from '@/data/products';

const primaryLinks = [
  { name: 'About', href: '/about' },
  { name: 'Partners', href: '/partners' },
  { name: 'Brochure', href: '/brochure' },
  { name: 'Contact', href: '/contact' },
];

const Header = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeroSection, setIsHeroSection] = useState(true);
  const [isMachineryMenuOpen, setIsMachineryMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          setIsHeroSection(window.scrollY < window.innerHeight * 0.6);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMachineryMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isHomepage = location.pathname === '/';
  const isInHero = isHomepage && isHeroSection && !isScrolled;
  const isMachineryActive = location.pathname.startsWith('/machinery');

  const isActive = useCallback(
    (href: string) => {
      if (href === '/machinery') return isMachineryActive;
      return location.pathname === href;
    },
    [isMachineryActive, location.pathname]
  );

  const toggleMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), []);

  const baseNavText = isInHero ? 'text-white/65 hover:text-white' : 'text-muted-foreground hover:text-foreground';
  const activeNavText = isInHero ? 'text-white' : 'text-primary';

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          isMobileMenuOpen
            ? 'z-[201] bg-foreground'
            : isInHero
              ? 'z-[100] bg-transparent'
              : 'z-[100] bg-background/90 backdrop-blur-xl border-b border-border/20 shadow-[0_1px_20px_-6px_hsl(var(--foreground)/0.08)]'
        }`}
      >
        <div className="px-5 sm:px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2.5 relative z-10">
              <motion.img
                src={saiLogoCmyk}
                alt="Sai Enterprises"
                className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain"
                whileHover={{ scale: 1.05 }}
                loading="eager"
              />
              <div className="flex flex-col">
                <span
                  className={`font-serif text-[15px] sm:text-[17px] font-bold tracking-wide leading-tight transition-colors duration-300 ${
                    isInHero || isMobileMenuOpen ? 'text-white' : 'text-foreground'
                  }`}
                >
                  Sai Enterprises
                </span>
                <span
                  className={`text-[8px] sm:text-[9px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isInHero || isMobileMenuOpen ? 'text-white/50' : 'text-muted-foreground'
                  }`}
                >
                  Graphic Machinery Suppliers
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative"
                onMouseEnter={() => setIsMachineryMenuOpen(true)}
                onMouseLeave={() => setIsMachineryMenuOpen(false)}
              >
                <Link
                  to="/machinery"
                  className={`relative inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-[0.14em] font-medium transition-all duration-300 ${
                    isMachineryActive ? activeNavText : baseNavText
                  }`}
                >
                  Machinery
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMachineryMenuOpen ? 'rotate-180' : ''}`} />
                  {isMachineryActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute bottom-0 left-4 right-4 h-[2px] ${isInHero ? 'bg-white' : 'bg-primary'}`}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {isMachineryMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 pt-4"
                    >
                      <div className="w-[min(92vw,860px)] rounded-2xl border border-border/60 bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
                        <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] gap-4">
                          <div className="grid grid-cols-2 gap-3">
                            {productCategories.map((category) => (
                              <Link
                                key={category.id}
                                to={`/machinery/${category.slug}`}
                                className="group overflow-hidden rounded-2xl border border-border/70 bg-secondary/20 hover:border-primary/25 hover:bg-secondary/40 transition-all duration-300"
                              >
                                <div className="aspect-[16/10] overflow-hidden bg-secondary/40">
                                  <img
                                    src={category.heroImage}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                </div>
                                <div className="p-4">
                                  <div className="flex items-center justify-between gap-3 mb-2">
                                    <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
                                      {category.name}
                                    </h3>
                                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                                      {category.products.length} machines
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {category.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>

                          <div className="rounded-2xl bg-foreground p-5 text-background flex flex-col">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
                              Quick Access
                            </p>
                            <h3 className="font-serif text-2xl mb-3">
                              Explore the full machinery catalogue.
                            </h3>
                            <p className="text-sm text-background/60 leading-relaxed mb-5">
                              Browse by workflow stage, compare machine lines, and move directly into detailed pages.
                            </p>
                            <div className="space-y-2 mb-6">
                              {productCategories.map((category) => (
                                <Link
                                  key={category.id}
                                  to={`/machinery/${category.slug}`}
                                  className="flex items-center justify-between rounded-xl border border-background/10 px-3 py-2 text-sm text-background/75 hover:text-background hover:border-primary/40 transition-colors"
                                >
                                  <span>{category.name}</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              ))}
                            </div>
                            <div className="mt-auto flex gap-2">
                              <Link
                                to="/machinery"
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/90 transition-colors"
                              >
                                All Machinery
                              </Link>
                              <Link
                                to="/contact"
                                className="inline-flex items-center justify-center rounded-xl border border-background/15 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-background/80 hover:text-background hover:border-background/30 transition-colors"
                              >
                                Contact
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {primaryLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * (i + 1), duration: 0.4 }}
                >
                  <Link
                    to={link.href}
                    className={`relative px-4 py-2 text-[11px] uppercase tracking-[0.14em] font-medium transition-all duration-300 ${
                      isActive(link.href) ? activeNavText : baseNavText
                    }`}
                  >
                    {link.name}
                    {isActive(link.href) && (
                      <motion.span
                        layoutId={`nav-underline-${link.href}`}
                        className={`absolute bottom-0 left-4 right-4 h-[2px] ${isInHero ? 'bg-white' : 'bg-primary'}`}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <Link
                  to="/contact"
                  className={`ml-3 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-sm text-[11px] uppercase tracking-[0.12em] font-semibold transition-all duration-300 ${
                    isInHero
                      ? 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md'
                  }`}
                >
                  Get Quote
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            </nav>

            <motion.button
              onClick={toggleMenu}
              whileTap={{ scale: 0.92 }}
              className={`md:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                isMobileMenuOpen
                  ? 'text-white bg-white/10'
                  : isInHero
                    ? 'text-white bg-white/10 hover:bg-white/20'
                    : 'text-foreground bg-foreground/5 hover:bg-foreground/10'
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] md:hidden bg-foreground/55 backdrop-blur-sm">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="ml-auto h-full w-full max-w-[420px] overflow-y-auto border-l border-white/10 bg-foreground text-white shadow-2xl"
          >
          <div className="px-5 pt-20 pb-10">
            <nav className="space-y-3">
              {[{ name: 'Home', href: '/' }, { name: 'Machinery', href: '/machinery' }, ...primaryLinks].map((link) => {
                const active = link.href === '/machinery' ? isMachineryActive : location.pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={`font-serif text-3xl ${active ? 'text-primary' : 'text-white'}`}>
                        {link.name}
                      </span>
                      <ArrowRight className={`w-4 h-4 ${active ? 'text-primary' : 'text-white/30'}`} />
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/35 mb-4">
                Machinery Categories
              </p>
              <div className="space-y-3">
                {productCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/machinery/${category.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 hover:bg-white/[0.06] transition-colors"
                  >
                    <img
                      src={category.heroImage}
                      alt={category.name}
                      className="h-16 w-20 rounded-xl object-cover flex-shrink-0 opacity-85"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className="font-serif text-xl text-white">{category.name}</span>
                        <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
                          {category.products.length}
                        </span>
                      </div>
                      <p className="text-sm text-white/55 line-clamp-2">{category.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start gap-4">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-7 py-3.5 rounded-sm text-xs font-semibold uppercase tracking-[0.14em] transition-all hover:bg-primary/90"
              >
                Request a Quote
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                Since 2000 · Global reach
              </span>
            </div>
          </div>
          </motion.div>
        </div>
      )}
    </>
  );
});

Header.displayName = 'Header';

export default Header;
