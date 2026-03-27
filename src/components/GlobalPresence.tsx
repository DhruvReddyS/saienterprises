import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Building2, Globe } from 'lucide-react';
import { companyInfo } from '@/data/products';

const GlobalPresence = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const allLocations = [
    { ...companyInfo.locations.headquarters, type: 'Head Office' as const },
    ...companyInfo.locations.branches.map((b) => ({ ...b, type: 'Branch' as const })),
    { ...companyInfo.locations.overseas, type: 'Overseas' as const },
  ];

  return (
    <section id="global" ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Globe className="w-[600px] h-[600px] text-primary" />
        </div>
      </div>

      <div className="container-wide relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Global Presence
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Serving the printing and packaging industry across India and Africa
          </p>
        </motion.div>

        {/* Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-16"
        >
          <div className="bg-card rounded-3xl border border-border p-8 md:p-12 overflow-hidden">
            {/* Simple World Map Representation */}
            <div className="relative h-[300px] md:h-[400px] flex items-center justify-center">
              {/* India Region */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute left-1/3 top-1/3 -translate-x-1/2"
              >
                <div className="relative">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-3xl md:text-5xl font-bold text-primary">4</span>
                      <p className="text-sm text-muted-foreground mt-1">Locations</p>
                      <p className="text-xs text-primary font-medium">INDIA</p>
                    </div>
                  </div>

                  {/* Location Dots */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 right-4 w-4 h-4 bg-primary rounded-full shadow-lg"
                    title="New Delhi"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    className="absolute top-4 -right-2 w-4 h-4 bg-primary rounded-full shadow-lg"
                    title="Pune"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    className="absolute bottom-8 right-0 w-6 h-6 bg-primary rounded-full shadow-lg border-2 border-primary-foreground"
                    title="Hyderabad (HQ)"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                    className="absolute bottom-0 right-8 w-4 h-4 bg-primary rounded-full shadow-lg"
                    title="Vijayawada"
                  />
                </div>
              </motion.div>

              {/* Connection Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  d="M 35% 40% Q 50% 30% 65% 50%"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  fill="none"
                />
              </svg>

              {/* Kenya Region */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute right-1/4 top-1/2 translate-x-1/2"
              >
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-2xl md:text-3xl font-bold text-accent">1</span>
                      <p className="text-xs text-muted-foreground mt-1">Location</p>
                      <p className="text-xs text-accent font-medium">KENYA</p>
                    </div>
                  </div>

                  {/* Location Dot */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full shadow-lg"
                    title="Nairobi"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Location Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {allLocations.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className={`p-5 rounded-xl border text-center transition-all duration-300 hover:shadow-lg ${
                location.type === 'Head Office'
                  ? 'bg-primary text-primary-foreground border-primary col-span-2 sm:col-span-1'
                  : location.type === 'Overseas'
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'bg-card border-border hover:border-primary/30'
              }`}
            >
              {location.type === 'Head Office' ? (
                <Building2 className="w-8 h-8 mx-auto mb-3" />
              ) : location.type === 'Overseas' ? (
                <Globe className="w-8 h-8 mx-auto mb-3" />
              ) : (
                <MapPin className="w-6 h-6 mx-auto mb-3 text-primary" />
              )}
              <h4 className={`font-bold mb-1 ${
                location.type === 'Head Office' || location.type === 'Overseas'
                  ? ''
                  : 'text-foreground'
              }`}>
                {location.city}
              </h4>
              <p className={`text-sm ${
                location.type === 'Head Office'
                  ? 'opacity-80'
                  : location.type === 'Overseas'
                  ? 'opacity-80'
                  : 'text-muted-foreground'
              }`}>
                {'state' in location ? location.state : location.country}
              </p>
              {location.type === 'Head Office' && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-primary-foreground/20 rounded text-xs">
                  Head Office
                </span>
              )}
              {location.type === 'Overseas' && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-accent-foreground/20 rounded text-xs">
                  Overseas
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;
