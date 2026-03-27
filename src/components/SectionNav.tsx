import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionNavProps {
  sections: { id: string; label: string }[];
}

const SectionNav = ({ sections }: SectionNavProps) => {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero (100vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);

      // Find active section
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      })).filter(s => s.element);

      const viewportMiddle = window.scrollY + window.innerHeight / 2;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i];
        if (element && element.offsetTop <= viewportMiddle) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group flex items-center gap-3"
            >
              {/* Label - shows on hover */}
              <span 
                className={`text-[11px] uppercase tracking-wider font-medium transition-all duration-300 ${
                  activeSection === section.id 
                    ? 'opacity-100 text-primary' 
                    : 'opacity-0 group-hover:opacity-100 text-muted-foreground'
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
              >
                {section.label}
              </span>
              
              {/* Indicator dot */}
              <div className="relative">
                <div 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSection === section.id 
                      ? 'bg-primary scale-125' 
                      : 'bg-border group-hover:bg-muted-foreground'
                  }`}
                />
                {activeSection === section.id && (
                  <motion.div
                    layoutId="active-section"
                    className="absolute inset-0 w-2 h-2 rounded-full bg-primary/30"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{ transform: 'scale(2)' }}
                  />
                )}
              </div>
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default SectionNav;
