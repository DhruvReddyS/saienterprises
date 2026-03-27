import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import InquiryModal from '@/components/InquiryModal';
import ScrollReveal from '@/components/ScrollReveal';

const services = [
  {
    title: "Trading & Export",
    description: "Complete range of graphic machinery for national and international markets.",
    stats: "50+ Countries",
  },
  {
    title: "Modernization",
    description: "Upgrading existing units to advanced multi-color presses.",
    stats: "200+ Upgrades",
  },
  {
    title: "Service & Support",
    description: "Continuous technical support, maintenance, and reliability assurance.",
    stats: "24/7 Support",
  },
  {
    title: "HPM Sole Agent",
    description: "Exclusive authorized agent in India for HPM packaging machines.",
    stats: "Exclusive",
    highlight: true,
  },
];

const ServicesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('General Inquiry');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section ref={containerRef} className="relative py-16 sm:py-20 md:py-24 bg-background overflow-hidden">
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Ambient glow */}
        <motion.div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <ScrollReveal animation="fadeUp" className="text-center mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-4">
                <span className="w-8 h-px bg-primary" />
                Services
                <span className="w-8 h-px bg-primary" />
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-4">
                What we <span className="text-primary italic">do.</span>
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto">
                Core capabilities driving success for over two decades.
              </p>
            </ScrollReveal>

            {/* Mobile Horizontal Scroll */}
            <div 
              ref={scrollRef}
              className="md:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
                {services.map((service, index) => (
                  <ScrollReveal key={service.title} animation="fadeUp" delay={index * 0.1}>
                    <div
                      onClick={() => {
                        setSelectedService(service.title);
                        setIsModalOpen(true);
                      }}
                      className={`flex-shrink-0 w-[260px] sm:w-[280px] cursor-pointer transition-all duration-500 overflow-hidden ${
                        service.highlight 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-card border border-border'
                      }`}
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      <div className="relative p-5 h-[230px] flex flex-col">
                        <span className={`text-[10px] uppercase tracking-[0.15em] mb-3 block ${
                          service.highlight ? 'text-primary-foreground/50' : 'text-muted-foreground'
                        }`}>
                          0{index + 1}
                        </span>

                        <h3 className={`font-serif text-xl sm:text-2xl mb-2 ${
                          service.highlight ? 'text-primary-foreground' : 'text-foreground'
                        }`}>
                          {service.title}
                        </h3>
                        
                        <p className={`text-sm leading-relaxed mb-auto ${
                          service.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {service.description}
                        </p>

                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mt-4 self-start ${
                          service.highlight 
                            ? 'bg-primary-foreground/10 text-primary-foreground' 
                            : 'bg-secondary text-foreground'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                          {service.stats}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service, index) => {
                const isHovered = hoveredIndex === index;
                
                return (
                  <ScrollReveal key={service.title} animation="fadeUp" delay={index * 0.1}>
                    <div
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => {
                        setSelectedService(service.title);
                        setIsModalOpen(true);
                      }}
                      className={`group relative cursor-pointer overflow-hidden transition-all duration-500 ${
                        service.highlight 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-card border border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="relative p-6 h-[290px] flex flex-col">
                        {/* Hover gradient overlay */}
                        {!service.highlight && (
                          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        )}

                        <span className={`text-[10px] uppercase tracking-[0.15em] mb-4 block relative ${
                          service.highlight ? 'text-primary-foreground/50' : 'text-muted-foreground'
                        }`}>
                          0{index + 1}
                        </span>

                        {service.highlight && (
                          <div className="absolute top-4 right-4">
                            <Sparkles className="w-4 h-4 text-primary-foreground/40" />
                          </div>
                        )}

                        <h3 className={`font-serif text-xl md:text-2xl mb-3 relative ${
                          service.highlight ? 'text-primary-foreground' : 'text-foreground group-hover:text-primary'
                        } transition-colors duration-300`}>
                          {service.title}
                        </h3>
                        
                        <p className={`text-sm leading-relaxed mb-auto relative ${
                          service.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {service.description}
                        </p>

                        <div className="flex items-center justify-between mt-6 relative">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                            service.highlight 
                              ? 'bg-primary-foreground/10 text-primary-foreground' 
                              : 'bg-secondary text-foreground'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                            {service.stats}
                          </div>
                          
                          <motion.div 
                            className={`${service.highlight ? 'text-primary-foreground' : 'text-primary'}`}
                            animate={isHovered ? { x: 3 } : { x: 0 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </div>

                        {/* Bottom accent line */}
                        {!service.highlight && (
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: isHovered ? '100%' : 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceType={selectedService}
      />
    </>
  );
};

export default ServicesSection;
