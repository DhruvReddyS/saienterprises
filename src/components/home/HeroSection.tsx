import { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-industrial.jpg';
import hpmMachine from '@/assets/hpm-machine.png';
import hpmLogo from '@/assets/hpm-logo.png';
import yearsBadge from '@/assets/24-years-badge.png';
import largestSellingBadge from '@/assets/largest-selling-badge.png';

/* ── Floating grid dots ── */
const GridOverlay = () => (
  <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-[0.07]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hero-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="hsl(var(--background))" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
    </svg>
  </div>
);

/* ── Floating particles ── */
const Particles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        dur: 14 + Math.random() * 20,
        delay: Math.random() * -20,
      })),
    []
  );

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

/* ── Trust badges data ── */
const badges = [
  { src: hpmLogo, alt: 'HPM Sole Agent India', label: 'HPM Agent' },
  { src: largestSellingBadge, alt: "India's largest selling paper cutter", label: '#1 Selling' },
  { src: yearsBadge, alt: '24 years of excellence', label: '24+ Years' },
];

const heroFacts = [
  { value: '5000+', label: 'Machines Supplied' },
  { value: '24+', label: 'Years Experience' },
  { value: 'Pan India', label: 'Sales + Service Reach' },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  // Delayed parallax — badges stay fully visible longer
  const machineY = useTransform(scrollYProgress, [0.4, 1], [0, 40]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-foreground"
    >
      {/* BG image + overlays */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <img src={heroImage} alt="Industrial printing facility" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/70 to-foreground" />
      </motion.div>

      <GridOverlay />
      <Particles />

      {/* Ambient glows */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none z-[3]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-primary/5 blur-[80px] pointer-events-none z-[3]"
        animate={{ x: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute top-1/2 right-0 w-[300px] h-[400px] rounded-full bg-accent/4 blur-[100px] pointer-events-none z-[3]" />

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-screen min-h-[100dvh] flex flex-col"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-5 sm:px-8 lg:px-16 xl:px-24 pt-24 sm:pt-28 pb-16 sm:pb-8 gap-8 lg:gap-14 xl:gap-20">

          {/* Left: Copy */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            {/* HPM pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-3 rounded-full border border-background/15 bg-background/[0.07] backdrop-blur-sm px-4 py-2 mb-5 sm:mb-7"
            >
              <img src={hpmLogo} alt="HPM" className="h-5 sm:h-6 w-auto" />
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-background/70">
                Sole HPM Agent in India
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-background text-[clamp(2rem,7vw,5.8rem)] leading-[0.96] tracking-[-0.03em] mb-4 sm:mb-6"
            >
              <span className="block text-primary italic font-semibold">#1 in India.</span>
              The Largest Paper Cutter
              <span className="block">Distribution House.</span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-background/55 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-7 sm:mb-9"
            >
              India’s largest HPM paper cutter distribution house, with 24+ years of machinery supply
              and service support across graphic and corrugation workflows.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-3"
            >
              <Link
                to="/machinery"
                className="group inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground px-7 sm:px-8 py-3.5 rounded-sm text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
              >
                Explore Machinery
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 border border-background/20 bg-background/[0.06] text-background/85 px-7 sm:px-8 py-3.5 rounded-sm text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:bg-background/12 hover:text-background"
              >
                Request Quote
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              className="mt-6 grid w-full max-w-xl grid-cols-3 gap-2.5 sm:gap-3"
            >
              {heroFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-background/12 bg-background/[0.06] px-3 py-3 text-center backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold text-background sm:text-base">
                    {fact.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-background/55 sm:text-[11px]">
                    {fact.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Mobile Machine + Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex lg:hidden flex-col items-center gap-6 mt-8"
            >
              {/* Machine image on mobile — gentle float */}
              <div className="relative w-full max-w-[220px] sm:max-w-[270px]">
                <motion.div
                  className="absolute inset-0 -m-8 bg-primary/15 rounded-full blur-[60px] pointer-events-none"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.img
                  src={hpmMachine}
                  alt="HPM Paper Cutting Machine"
                  className="relative w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                  transition={{
                    opacity: { duration: 0.8, delay: 0.7 },
                    scale: { duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] },
                    y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
                  }}
                />
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-3">
                {badges.map((badge, i) => (
                  <motion.div
                    key={badge.alt}
                    className="w-[68px] h-[68px] sm:w-[82px] sm:h-[82px] flex items-center justify-center rounded-lg bg-background/[0.08] border border-background/15 backdrop-blur-sm p-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                  >
                    <img src={badge.src} alt={badge.alt} className="w-full h-full object-contain" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Machine + Trust Badges (desktop only) */}
          <motion.div
            className="hidden lg:flex flex-1 max-w-md xl:max-w-lg flex-col items-center justify-center gap-8"
            style={{ y: machineY }}
          >
            {/* Glow behind machine — breathing */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 -m-12 bg-primary/12 rounded-full blur-[80px] pointer-events-none"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.img
                src={hpmMachine}
                alt="HPM Paper Cutting Machine"
                className="relative w-full max-w-[380px] xl:max-w-[440px] h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { duration: 1, delay: 0.45 },
                  scale: { duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
                }}
              />
            </div>

            {/* 3 Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="grid grid-cols-3 gap-3.5 w-full max-w-sm"
            >
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.alt}
                  className="aspect-square flex flex-col items-center justify-center rounded-lg bg-background/[0.08] border border-background/15 backdrop-blur-sm shadow-lg p-3 xl:p-4 group cursor-default"
                  initial={{ opacity: 0, scale: 0.85, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.72 + i * 0.12 }}
                  whileHover={{ scale: 1.08, y: -6, borderColor: 'hsl(var(--primary) / 0.5)' }}
                >
                  <img
                    src={badge.src}
                    alt={badge.alt}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Caption */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-background/35 text-[10px] uppercase tracking-[0.22em] text-center"
            >
              HPM Programmable Paper Cutter · German Engineered
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1 text-background/35 hover:text-background/60 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] uppercase tracking-[0.24em]">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
