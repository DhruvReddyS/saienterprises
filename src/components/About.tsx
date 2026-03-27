import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Briefcase, Wrench, Users, HeartHandshake, Building2, Globe, ChevronRight } from 'lucide-react';
import { companyInfo } from '@/data/products';
import saiLogo from '@/assets/sai-logo.png';

const timelineEvents = [
  { year: '2000', title: 'Foundation', description: 'Established in Hyderabad with a vision for excellence', icon: Building2 },
  { year: '2005', title: 'National Expansion', description: 'Opened branches in New Delhi and Pune', icon: MapPin },
  { year: '2010', title: 'Southern Growth', description: 'Extended presence to Vijayawada, AP', icon: ChevronRight },
  { year: '2015', title: 'International Reach', description: 'Overseas branch launched in Nairobi, Kenya', icon: Globe },
  { year: '2024', title: 'Industry Leadership', description: '24+ years serving printing & packaging', icon: HeartHandshake },
];

const services = [
  { icon: Briefcase, title: 'Expert Consultancy', description: 'Thorough guidance before every purchase' },
  { icon: Wrench, title: 'Installation & Commissioning', description: 'Professional setup by experienced technicians' },
  { icon: Users, title: 'Ongoing Support', description: 'Dedicated service throughout machine lifecycle' },
  { icon: HeartHandshake, title: 'Long-term Partnership', description: 'We grow together with our clients' },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeEvent, setActiveEvent] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ['start end', 'end start'],
  });

  const logoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.03, 0.03, 0]);

  return (
    <section id="about" ref={ref} className="relative section-padding bg-background overflow-hidden">
      {/* Logo Watermark */}
      <motion.div
        style={{ opacity: logoOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <img src={saiLogo} alt="" className="w-[600px] h-auto grayscale" />
      </motion.div>

      {/* Blueprint Pattern */}
      <div className="absolute inset-0 blueprint-grid opacity-30" />

      <div ref={stickyRef} className="container-wide relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="micro-label text-primary mb-4 block">Our Story</span>
          <h2 className="text-foreground mb-6">
            Building Trust Since 2000
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey of excellence, reliability, and long-term partnerships in graphic machinery
          </p>
        </motion.div>

        {/* Main Content - Sticky Left / Scrolling Right */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-24">
          {/* Left - Company Story (Sticky on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="bg-card rounded-3xl border border-border p-8 md:p-10 shadow-industrial">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Sai Enterprises
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded with a commitment to building <span className="text-foreground font-medium">long-term relationships</span>, 
                  Sai Enterprises has grown to become a leading supplier of graphic and corrugation machinery 
                  across India and Africa.
                </p>
                <p>
                  We operate from <span className="text-foreground font-medium">New Delhi</span>, 
                  <span className="text-foreground font-medium"> Pune</span>, and 
                  <span className="text-foreground font-medium"> Vijayawada</span>, with 
                  <span className="text-foreground font-medium"> Hyderabad</span> as our Head Office. 
                  Our overseas branch in <span className="text-foreground font-medium">Nairobi, Kenya</span> extends 
                  our reach to the African market.
                </p>
                <p>
                  We undertake consultancy, installation of pre-owned and new printing machines, 
                  and supply of the latest post-press equipment from globally renowned brands.
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="group p-4 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-industrial transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{service.title}</h4>
                      <p className="text-xs text-muted-foreground">{service.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right - Animated Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Our Journey
            </h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-border to-transparent" />

              {/* Timeline Events */}
              <div className="space-y-6">
                {timelineEvents.map((event, index) => {
                  const Icon = event.icon;
                  const isActive = activeEvent === index;
                  
                  return (
                    <motion.div
                      key={event.year}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      onMouseEnter={() => setActiveEvent(index)}
                      className="relative pl-16 group cursor-pointer"
                    >
                      {/* Timeline Node */}
                      <motion.div
                        animate={{ 
                          scale: isActive ? 1.2 : 1,
                          backgroundColor: isActive ? 'hsl(var(--primary))' : 'hsl(var(--card))'
                        }}
                        className={`absolute left-3 top-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isActive ? 'border-primary' : 'border-border group-hover:border-primary/50'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeNode"
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </motion.div>

                      {/* Content Card */}
                      <motion.div
                        animate={{ 
                          backgroundColor: isActive ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                          scale: isActive ? 1.02 : 1,
                        }}
                        className={`p-5 rounded-xl border transition-all duration-300 ${
                          isActive 
                            ? 'border-primary shadow-industrial-lg' 
                            : 'border-border group-hover:border-primary/30 group-hover:shadow-industrial'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isActive ? 'bg-white/20' : 'bg-primary/10'
                          }`}>
                            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-primary'}`} />
                          </div>
                          <div>
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mb-2 ${
                              isActive ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                            }`}>
                              {event.year}
                            </span>
                            <h4 className={`font-bold mb-1 ${isActive ? 'text-white' : 'text-foreground'}`}>
                              {event.title}
                            </h4>
                            <p className={`text-sm ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Locations Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-industrial"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="font-bold text-foreground mb-1">Our Locations</h4>
              <p className="text-sm text-muted-foreground">Global reach with offices in India and Kenya</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {/* Head Office */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">{companyInfo.locations.headquarters.city}</span>
                <span className="text-xs opacity-70">(HQ)</span>
              </div>

              {/* Branches */}
              {companyInfo.locations.branches.map((branch) => (
                <div
                  key={branch.city}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{branch.city}</span>
                </div>
              ))}

              {/* Overseas */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{companyInfo.locations.overseas.city}</span>
                <span className="text-xs opacity-70">Kenya</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
