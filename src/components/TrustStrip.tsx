import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Globe2, Handshake, Settings, CheckCircle } from 'lucide-react';

const trustPoints = [
  {
    icon: Award,
    value: '24+',
    label: 'Years',
    description: 'Industry expertise since 2000',
    highlight: true,
  },
  {
    icon: Globe2,
    value: '5',
    label: 'Locations',
    description: 'Global reach with offices in India and Kenya',
  },
  {
    icon: Handshake,
    value: '8+',
    label: 'Global Partners',
    description: 'Heidelberg, Komori & more',
  },
  {
    icon: Settings,
    value: '100+',
    label: 'Machines',
    description: 'New & refurbished solutions',
  },
];

const TrustStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      id="trust"
      ref={ref}
      className="relative py-16 md:py-20 bg-card overflow-hidden"
    >
      {/* Subtle Pattern */}
      <div className="absolute inset-0 blueprint-grid-dense opacity-50" />
      
      {/* Top Border Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      {/* Bottom Border Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-wide relative">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="micro-label text-primary">Why Industry Leaders Trust Us</span>
        </motion.div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`relative h-full p-6 md:p-8 rounded-2xl transition-all duration-500 ${
                    point.highlight 
                      ? 'bg-primary text-primary-foreground shadow-industrial-lg'
                      : 'bg-background border border-border hover:border-primary/30 hover:shadow-industrial'
                  }`}
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-5 ${
                      point.highlight 
                        ? 'bg-white/20' 
                        : 'bg-primary/10 group-hover:bg-primary/15'
                    }`}
                  >
                    <Icon className={`w-6 h-6 md:w-7 md:h-7 ${
                      point.highlight ? 'text-white' : 'text-primary'
                    }`} />
                  </motion.div>

                  {/* Value */}
                  <div className="mb-2">
                    <span className={`text-4xl md:text-5xl font-bold tracking-tight ${
                      point.highlight ? 'text-white' : 'text-foreground'
                    }`}>
                      {point.value}
                    </span>
                    <span className={`text-lg md:text-xl font-medium ml-1 ${
                      point.highlight ? 'text-white/80' : 'text-muted-foreground'
                    }`}>
                      {point.label}
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`text-sm ${
                    point.highlight ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {point.description}
                  </p>

                  {/* Highlight Badge */}
                  {point.highlight && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-5 h-5 text-accent" />
                    </div>
                  )}

                  {/* Hover Glow Effect */}
                  {!point.highlight && (
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5" />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Calibration Marks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-2 mt-12"
        >
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full ${
                i === 3 ? 'w-8 bg-primary' : 'w-2 bg-border'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStrip;
