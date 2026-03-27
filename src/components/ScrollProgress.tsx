import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  showOnShortPages?: boolean;
}

const ScrollProgress = ({ showOnShortPages = false }: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Don't show on short pages unless explicitly enabled
  if (!showOnShortPages) {
    return (
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
        style={{ scaleX }}
      />
    );
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
