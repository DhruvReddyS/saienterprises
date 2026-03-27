import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

// Animated counter component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const floatY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="relative bg-background overflow-hidden">
      {/* Ambient glows */}
      <motion.div 
        className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/6 blur-[100px] pointer-events-none"
        style={{ y: floatY }}
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-accent/5 blur-[80px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Top divider line */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative px-5 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-28">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto">
          
          {/* Main Statement - Large card spanning left */}
          <ScrollReveal animation="fadeUp" className="md:col-span-7 md:row-span-2">
            <div className="relative bg-gradient-to-br from-primary/[0.06] via-primary/[0.03] to-transparent border border-border/50 p-5 sm:p-7 md:p-9 lg:p-11 flex flex-col justify-between h-full min-h-[280px] sm:min-h-[320px] md:min-h-[400px] group hover:border-primary/25 transition-all duration-700 overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-primary/10 pointer-events-none" />
              
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-5 sm:mb-7">
                  <span className="w-10 h-px bg-primary/60" />
                  About Us
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.08] mb-4 sm:mb-5">
                  More than<br />
                  <span className="text-primary italic">machinery</span> suppliers.
                </h2>
              </div>
              
              <div className="space-y-4 sm:space-y-5">
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
                  With over 24 years of expertise in graphic and corrugation machinery, 
                  we've built trust across India and East Africa through genuine partnership.
                </p>
                <div className="w-16 h-px bg-gradient-to-r from-primary/60 to-transparent" />
              </div>
            </div>
          </ScrollReveal>

          {/* Years Counter - Top right */}
          <ScrollReveal animation="scaleUp" delay={0.1} className="md:col-span-5">
            <div className="relative bg-primary text-primary-foreground p-5 sm:p-7 md:p-9 flex flex-col justify-center items-center text-center h-full min-h-[150px] sm:min-h-[170px] md:min-h-[190px] overflow-hidden">
              {/* Subtle diagonal shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/[0.07] to-white/0 pointer-events-none"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
              />
              <motion.div 
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedCounter end={24} suffix="+" />
              </motion.div>
              <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary-foreground/60 mt-2 relative">
                Years Experience
              </span>
            </div>
          </ScrollReveal>

          {/* Philosophy Card - Bottom right */}
          <ScrollReveal animation="slideRight" delay={0.2} className="md:col-span-5">
            <div className="relative bg-secondary/40 border border-border/50 p-5 sm:p-7 md:p-9 flex flex-col justify-center h-full min-h-[150px] sm:min-h-[170px] md:min-h-[190px] group hover:bg-secondary/60 transition-all duration-700 overflow-hidden">
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <blockquote className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-foreground leading-snug italic">
                "We believe in long-term relationships, growing together as trusted partners."
              </blockquote>
              <div className="mt-3 sm:mt-4 md:mt-5 flex items-center gap-3">
                <div className="w-10 h-px bg-primary/40" />
                <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground">
                  Our Philosophy
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Stats Row */}
          <ScrollReveal animation="fadeUp" delay={0.3} className="md:col-span-12">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {[
                { number: 500, suffix: '+', label: 'Clients' },
                { number: 2, suffix: '', label: 'Continents' },
                { number: 100, suffix: '%', label: 'Committed' },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="relative bg-background border border-border/50 p-4 sm:p-5 md:p-7 text-center hover:border-primary/30 transition-all duration-500 overflow-hidden flex flex-col justify-center min-h-[110px] sm:min-h-[130px] group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground mb-1 relative">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} duration={1.5 + index * 0.3} />
                  </div>
                  <span className="text-[8px] sm:text-[9px] md:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] text-muted-foreground relative">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default AboutSection;
