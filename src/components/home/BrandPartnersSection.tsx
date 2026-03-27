import { useRef } from 'react';
import { motion } from 'framer-motion';
import { partnerBrands } from '@/data/products';
import ScrollReveal from '@/components/ScrollReveal';
import hpmLogo from '@/assets/hpm-logo.png';
import largestSellingBadge from '@/assets/largest-selling-badge.png';
import hpmMachine from '@/assets/hpm-machine.png';
import PartnerLogo from '@/components/PartnerLogo';

const BrandPartnersSection = () => {
  const containerRef = useRef(null);

  // Duplicate for seamless loop
  const duplicatedBrands = [...partnerBrands, ...partnerBrands, ...partnerBrands];

  return (
    <section id="partners" ref={containerRef} className="py-16 sm:py-20 md:py-24 bg-secondary/30 overflow-hidden">
      <div className="px-6 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <ScrollReveal animation="fadeUp" className="text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-4">
              <span className="w-8 h-px bg-primary" />
              Partners
              <span className="w-8 h-px bg-primary" />
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
              Global <span className="text-primary italic">partners.</span>
            </h2>
          </ScrollReveal>
        </div>
      </div>

      {/* Scrolling Marquee - Row 1 */}
      <div className="relative mb-6 sm:mb-8">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-secondary/100 via-secondary/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-secondary/100 via-secondary/60 to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-10 sm:gap-16"
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <motion.div
              key={`row1-${brand.name}-${index}`}
              className="flex-shrink-0 flex flex-col items-center group cursor-default"
              whileHover={{ scale: 1.05 }}
            >
              <div className="whitespace-nowrap group-hover:text-primary transition-colors duration-300">
                <PartnerLogo name={brand.name} variant="dark" size="md" />
              </div>
              <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-2 whitespace-nowrap">
                <span className="w-1 h-1 rounded-full bg-primary/60" />
                {brand.country}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scrolling Marquee - Row 2 (Reverse, slightly faster) */}
      <div className="relative mb-8 sm:mb-10">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-secondary/100 via-secondary/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-secondary/100 via-secondary/60 to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-10 sm:gap-16"
          animate={{ x: ['-33.33%', '0%'] }}
          transition={{
            x: {
              duration: 22,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <motion.div
              key={`row2-${brand.name}-${index}`}
              className="flex-shrink-0 flex flex-col items-center group cursor-default"
              whileHover={{ scale: 1.05 }}
            >
              <div className="whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <PartnerLogo name={brand.name} variant="muted" size="md" />
              </div>
              <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 mt-2 whitespace-nowrap">
                <span className="w-1 h-1 rounded-full bg-primary/40" />
                {brand.country}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* HPM Exclusive Partnership */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal animation="scaleUp" delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative border border-primary/20 bg-background overflow-hidden"
            >
              {/* Subtle corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/30" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/30" />

              <div className="grid md:grid-cols-2 gap-0">
                {/* Left - HPM branding */}
                <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-center">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-primary font-medium mb-6 block">
                    Exclusive Partnership
                  </span>
                  
                  <img 
                    src={hpmLogo} 
                    alt="HPM Paper Cutter" 
                    className="w-48 sm:w-56 md:w-64 h-auto object-contain mb-6"
                  />
                  
                  <p className="text-foreground font-serif text-lg sm:text-xl mb-2">
                    Sole Agent for HPM in India
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Authorized exclusive distributor of HPM paper cutting machines across the Indian subcontinent.
                  </p>

                  {/* Largest Selling Badge */}
                  <div className="flex items-center gap-4">
                    <img 
                      src={largestSellingBadge} 
                      alt="India's Largest Selling Paper Cutter" 
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                    />
                    <div>
                      <p className="text-xs font-semibold text-foreground">India's Largest Selling</p>
                      <p className="text-[10px] text-muted-foreground">Paper Cutting Machine</p>
                    </div>
                  </div>
                </div>

                {/* Right - Machine image */}
                <div className="relative bg-secondary/20 flex items-center justify-center p-6 sm:p-8 min-h-[280px]">
                  <motion.img 
                    src={hpmMachine}
                    alt="HPM Paper Cutting Machine"
                    className="w-full max-w-md h-auto object-contain"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default BrandPartnersSection;
