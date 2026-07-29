import { memo, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: { opacity: 0.84, y: 5 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.14, ease: [0.55, 0, 1, 0.45] as [number, number, number, number] },
  },
};

const PageTransition = memo(({ children, className = '' }: PageTransitionProps) => (
  <motion.div
    className={`sai-page-shell min-h-screen bg-background ${className}`}
    initial="initial"
    animate="enter"
    exit="exit"
    variants={pageVariants}
  >
    {children}
  </motion.div>
));

PageTransition.displayName = 'PageTransition';
export default PageTransition;
