import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, ArrowRight, MapPin, Shield, Settings, Calendar } from 'lucide-react';
import saiLogo from '@/assets/sai-logo.png';

const trustChips = [
  { icon: Calendar, label: '24+ Years', sublabel: 'Industry Excellence' },
  { icon: MapPin, label: 'Global Reach', sublabel: 'Offices in India & Kenya' },
  { icon: Settings, label: 'New + Refurbished', sublabel: 'Complete Range' },
  { icon: Shield, label: 'Installation + Support', sublabel: 'End-to-End Service' },
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Premium Gradient Background */}
      <motion.div 
        className="absolute inset-0 gradient-premium"
        style={{ y: backgroundY }}
      >
        {/* Blueprint Grid */}
        <div className="absolute inset-0 blueprint-grid opacity-40" />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/20" />
        
        {/* Moving Lines - Subtle Industrial Feel */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Horizontal Lines */}
          <motion.line
            x1="0"
            y1="30%"
            x2="100%"
            y2="30%"
            stroke="hsl(192 85% 50% / 0.08)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 1 }}
          />
          <motion.line
            x1="0"
            y1="70%"
            x2="100%"
            y2="70%"
            stroke="hsl(192 85% 50% / 0.08)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 1.2 }}
          />
          
          {/* Vertical Lines */}
          <motion.line
            x1="20%"
            y1="0"
            x2="20%"
            y2="100%"
            stroke="hsl(192 85% 50% / 0.05)"
            strokeWidth="1"
            strokeDasharray="8 16"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 0.5 }}
          />
          <motion.line
            x1="80%"
            y1="0"
            x2="80%"
            y2="100%"
            stroke="hsl(192 85% 50% / 0.05)"
            strokeWidth="1"
            strokeDasharray="8 16"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 0.7 }}
          />
        </svg>

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 right-[15%] w-72 h-72 border border-white/5 rounded-full"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-[10%] w-48 h-48 border border-accent/10"
          style={{ rotate: 45 }}
          animate={{ 
            rotate: [45, 90, 45],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"
          animate={{ 
            x: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 container-wide text-center pt-24 pb-32"
        style={{ y: contentY, opacity, scale }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.img
              src={saiLogo}
              alt="Sai Enterprises"
              className="h-20 md:h-28 lg:h-32 mx-auto"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </motion.div>

          {/* Micro Label */}
          <motion.div 
            variants={itemVariants}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium">
                Graphic Machinery Suppliers
              </span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-white mb-6 max-w-5xl mx-auto"
          >
            <span className="block text-white/90">We Believe in</span>
            <span className="block text-gradient-gold mt-2">
              Long-Term Relationships
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl text-white/70 max-w-3xl mx-auto mb-4 font-light"
          >
            24+ Years of Excellence in Graphic & Corrugation Machinery
          </motion.p>

          {/* Supporting Text */}
          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-12"
          >
            Your trusted partner for Pre-Press, Press, Post-Press & Corrugation solutions
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.a
              href="#products"
              className="group relative px-8 py-4 bg-white text-primary font-semibold rounded-lg overflow-hidden shadow-industrial-lg"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Machinery
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-10 transition-opacity"
              />
            </motion.a>

            <motion.a
              href="#contact"
              className="group px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                Request Consultation
              </span>
            </motion.a>
          </motion.div>

          {/* Trust Chips */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
          >
            {trustChips.map((chip, index) => {
              const Icon = chip.icon;
              return (
                <motion.div
                  key={chip.label}
                  className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">{chip.label}</p>
                    <p className="text-xs text-white/50">{chip.sublabel}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.a
          href="#trust"
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
};

export default Hero;
