import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { productCategories } from '@/data/products';
import ScrollReveal from '@/components/ScrollReveal';

const OfferingsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className="relative py-16 sm:py-20 md:py-24 bg-foreground overflow-hidden">
      {/* Subtle ambient glow */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <ScrollReveal animation="fadeUp" className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-4">
              <span className="w-8 h-px bg-primary" />
              Machinery
              <span className="w-8 h-px bg-primary" />
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-background leading-tight">
              Complete print<br />
              <span className="text-primary">workflow</span> coverage.
            </h2>
          </ScrollReveal>

          {/* Category Cards Grid - Equal height cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {productCategories.map((category, index) => {
              const isActive = activeIndex === index;
              
              return (
                <ScrollReveal key={category.id} animation="fadeUp" delay={index * 0.1}>
                  <Link
                    to={`/machinery/${category.slug}`}
                    className={`group relative block h-full transition-all duration-500 overflow-hidden ${
                      isActive 
                        ? 'bg-primary' 
                        : 'bg-background/5 hover:bg-background/10 border border-background/10'
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    {/* Fixed height container with flex */}
                    <div className="p-4 sm:p-5 md:p-6 min-h-[240px] sm:min-h-[260px] md:min-h-[280px] flex flex-col relative">
                      {category.heroImage && (
                        <>
                          <img
                            src={category.heroImage}
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/55 to-foreground/35" />
                        </>
                      )}

                      {/* Large Number */}
                      <span className={`absolute top-3 right-3 sm:top-4 sm:right-4 text-5xl sm:text-6xl md:text-7xl font-serif transition-colors duration-300 ${
                        isActive ? 'text-primary-foreground/10' : 'text-background/5'
                      }`}>
                        0{index + 1}
                      </span>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full pt-10 sm:pt-12 md:pt-14">
                        <h3 className={`font-serif text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 transition-colors duration-300 ${
                          isActive ? 'text-primary-foreground' : 'text-background'
                        }`}>
                          {category.name}
                        </h3>
                        
                        <p className={`text-xs sm:text-sm leading-relaxed mb-auto line-clamp-3 transition-colors duration-300 ${
                          isActive ? 'text-primary-foreground/70' : 'text-background/50'
                        }`}>
                          {category.description}
                        </p>

                        {/* Products count */}
                        <div className={`flex items-center justify-between pt-3 sm:pt-4 mt-4 border-t transition-colors duration-300 ${
                          isActive ? 'border-primary-foreground/20' : 'border-background/10'
                        }`}>
                          <span className={`text-[10px] sm:text-xs uppercase tracking-wider transition-colors duration-300 ${
                            isActive ? 'text-primary-foreground/60' : 'text-background/40'
                          }`}>
                            {category.products.length} Products
                          </span>
                          
                          <motion.div 
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isActive 
                                ? 'bg-primary-foreground text-primary' 
                                : 'bg-background/10 text-background/50 group-hover:bg-primary group-hover:text-primary-foreground'
                            }`}
                            whileHover={{ scale: 1.1 }}
                          >
                            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Bottom accent line */}
                      <motion.div
                        className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${
                          isActive ? 'bg-primary-foreground/20' : 'bg-primary'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? '100%' : '0%' }}
                        whileHover={{ width: '100%' }}
                      />
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {/* View All Link */}
          <ScrollReveal animation="fadeUp" delay={0.4} className="text-center mt-8 sm:mt-12">
            <Link
              to="/machinery"
              className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors"
            >
              <span className="text-sm font-medium tracking-wide">Explore all machinery</span>
              <motion.div
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                whileHover={{ x: 5 }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
