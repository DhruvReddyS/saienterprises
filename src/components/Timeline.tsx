import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    year: '2000',
    title: 'Foundation',
    description: 'Sai Enterprises established in Hyderabad with a vision to become a trusted partner in the printing industry.',
  },
  {
    year: '2005',
    title: 'First Major Partnership',
    description: 'Became authorized dealers for leading European and Asian machinery brands.',
  },
  {
    year: '2010',
    title: 'National Expansion',
    description: 'Opened branch offices in New Delhi and Pune to serve clients across North and West India.',
  },
  {
    year: '2015',
    title: 'East Africa Entry',
    description: 'Expanded internationally with our Nairobi office, bringing quality machinery to the African market.',
  },
  {
    year: '2018',
    title: 'Corrugation Division',
    description: 'Launched dedicated corrugation machinery division to meet growing packaging industry demands.',
  },
  {
    year: '2022',
    title: 'Digital Transformation',
    description: 'Modernized operations with digital service tracking and enhanced customer support systems.',
  },
  {
    year: 'Today',
    title: '24+ Years Strong',
    description: 'Serving 500+ satisfied clients across two continents with the same commitment to excellence.',
  },
];

const Timeline = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-14 sm:py-20 md:py-28 px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-8 sm:mb-12">
          <motion.span 
            className="w-8 h-px bg-primary"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
          />
          Our Journey
        </span>
        
        <div className="relative max-w-4xl">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-border"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Progress line */}
          <motion.div 
            className="absolute left-4 sm:left-8 top-0 w-px bg-primary"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />

          {/* Milestones */}
          <div className="space-y-8 sm:space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="relative pl-12 sm:pl-20"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-0 sm:left-4 top-1 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.5 + index * 0.15,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    milestone.year === 'Today' 
                      ? 'bg-primary' 
                      : 'bg-card border-2 border-border'
                  }`}>
                    <motion.div 
                      className={`w-2 h-2 rounded-full ${
                        milestone.year === 'Today' 
                          ? 'bg-primary-foreground' 
                          : 'bg-primary'
                      }`}
                      animate={milestone.year === 'Today' ? { 
                        scale: [1, 1.5, 1],
                      } : {}}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div 
                  className="group"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Year badge */}
                  <span className={`inline-block text-xs sm:text-sm font-medium tracking-wider mb-2 ${
                    milestone.year === 'Today' 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  }`}>
                    {milestone.year}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {milestone.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg">
                    {milestone.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Timeline;
