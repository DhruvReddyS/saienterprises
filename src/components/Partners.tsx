import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { partnerBrands } from '@/data/products';
import { CheckCircle2, Award, Globe, Sparkles } from 'lucide-react';
import PartnerLogo from '@/components/PartnerLogo';

const brandAttributes: Record<string, { trait: string; color: string }> = {
  'Heidelberg': { trait: 'Reliability', color: 'hsl(205 100% 40%)' },
  'Komori': { trait: 'Precision', color: 'hsl(160 70% 40%)' },
  'Manroland': { trait: 'Innovation', color: 'hsl(280 70% 50%)' },
  'Muller Martini': { trait: 'Excellence', color: 'hsl(340 70% 50%)' },
  'MBO': { trait: 'Engineering', color: 'hsl(200 70% 50%)' },
  'HPM': { trait: 'Performance', color: 'hsl(30 80% 50%)' },
  'Kanefusa': { trait: 'Quality', color: 'hsl(0 70% 50%)' },
  'Mitsubishi': { trait: 'Global Standard', color: 'hsl(220 70% 50%)' },
};

const Partners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  return (
    <section id="partners" ref={ref} className="relative section-padding bg-background overflow-hidden">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-30" />

      {/* Scanline Effect */}
      <div className="absolute inset-0 scanline pointer-events-none" />

      <div className="container-wide relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="micro-label text-primary mb-4 block">Trusted Partnerships</span>
          <h2 className="text-foreground mb-6">
            Global Partners
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We work with the world's leading manufacturers of printing and finishing machinery
          </p>
        </motion.div>

        {/* Partner Brands Grid - Credibility Wall */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {partnerBrands.map((brand, index) => {
            const isHovered = hoveredBrand === brand.name;
            const attributes = brandAttributes[brand.name] || { trait: 'Excellence', color: 'hsl(var(--primary))' };
            
            return (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                onMouseEnter={() => setHoveredBrand(brand.name)}
                onMouseLeave={() => setHoveredBrand(null)}
                className="group relative"
              >
                <motion.div
                  animate={{ 
                    scale: isHovered ? 1.03 : 1,
                    y: isHovered ? -4 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`relative h-full p-6 md:p-8 rounded-2xl border transition-all duration-500 overflow-hidden ${
                    isHovered
                      ? 'bg-primary border-primary shadow-industrial-lg'
                      : 'bg-card border-border hover:border-primary/30'
                  }`}
                >
                  {/* Sheen Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: '-100%' }}
                    animate={{ x: isHovered ? '200%' : '-100%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </motion.div>

                  {/* Brand Name */}
                  <div className="text-center mb-4 relative">
                    <div className={isHovered ? 'text-primary-foreground' : 'text-foreground'}>
                      <PartnerLogo name={brand.name} variant={isHovered ? 'light' : 'dark'} size="sm" />
                    </div>
                  </div>

                  {/* Country */}
                  <div className={`text-center mb-3 transition-colors ${
                    isHovered ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}>
                    <span className="text-sm flex items-center justify-center gap-2">
                      <Globe className="w-4 h-4" />
                      {brand.country}
                    </span>
                  </div>

                  {/* Trait Badge - Revealed on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      {attributes.trait}
                    </span>
                  </motion.div>

                  {/* Specialty - on expand */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      height: isHovered ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-primary-foreground/20 text-center">
                      <p className="text-sm text-primary-foreground/80">{brand.specialty}</p>
                    </div>
                  </motion.div>

                  {/* Monochrome indicator - shows color on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: attributes.color }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-industrial"
        >
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <motion.div 
              className="flex items-start gap-5 group"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2 text-lg">Authorized Dealers</h4>
                <p className="text-muted-foreground">
                  Official partners for printing and finishing machinery brands
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start gap-5 group"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                <CheckCircle2 className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2 text-lg">Genuine Parts</h4>
                <p className="text-muted-foreground">
                  All machinery and spare parts sourced directly from manufacturers
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start gap-5 group"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                <Globe className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2 text-lg">Global Standards</h4>
                <p className="text-muted-foreground">
                  European and Japanese engineering excellence for your production
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground italic">
            "We work with the best in the industry."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
