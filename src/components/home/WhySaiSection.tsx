import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import yearsBadge from '@/assets/24-years-badge.png';

type CounterProps = {
  end: number;
  suffix?: string;
  start: boolean;
  durationMs?: number;
};

const Counter = ({ end, suffix = '', start, durationMs = 1400 }: CounterProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frameId = 0;
    const startedAt = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startedAt;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [durationMs, end, start]);

  return <span>{value}{suffix}</span>;
};

const WhySaiSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.35 });

  const pillars = [
    { end: 24, suffix: '+', label: 'Years of Trust', description: 'Building relationships since 2000' },
    { end: 500, suffix: '+', label: 'Clients Served', description: 'Across India and East Africa' },
    { end: 100, suffix: '%', label: 'Genuine Products', description: 'Only authentic machinery' },
    { end: 2, suffix: '', label: 'Office Countries', description: 'India and Kenya office presence with global reach' },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-background overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/4 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fadeUp" className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-4">
              <span className="w-8 h-px bg-primary" />
              Why Us
              <span className="w-8 h-px bg-primary" />
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-6">
              Trust built over <span className="text-primary italic">two decades.</span>
            </h2>
            {/* Badge below the heading, properly centered */}
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src={yearsBadge}
                alt="24 Years of Excellence in Industry"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain mx-auto drop-shadow-lg"
                loading="lazy"
              />
            </motion.div>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 mb-10 sm:mb-14">
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.label}
                  className="relative bg-background p-5 sm:p-7 md:p-9 group hover:bg-secondary/20 transition-all duration-500 text-center flex flex-col justify-center min-h-[170px] sm:min-h-[190px] overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <motion.span
                    className="block font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary mb-2 sm:mb-3 relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Counter end={pillar.end} suffix={pillar.suffix} start={statsInView} />
                  </motion.span>
                  <h4 className="font-medium text-foreground mb-1 text-xs sm:text-sm relative">{pillar.label}</h4>
                  <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed relative">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.2} className="max-w-xl mx-auto text-center">
            <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-6 leading-relaxed">
              We don't just sell machinery.
              <br />
              We build <span className="text-primary italic">partnerships.</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Every client relationship begins with understanding your needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-foreground text-background px-7 py-3.5 hover:bg-foreground/90 transition-all duration-300 group hover:shadow-lg"
            >
              <span className="text-sm font-medium tracking-wide">Start a conversation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhySaiSection;
