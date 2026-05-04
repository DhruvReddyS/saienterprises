import { ReactNode, memo, useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import saiLogo from '@/assets/sai-logo-full.png';
import BrandImage from '@/components/BrandImage';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const pageVariants: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: [0.55, 0, 1, 0.45] },
  },
};

const PageTransition = memo(({ children, className = '' }: PageTransitionProps) => {
  const [loading, setLoading] = useState(() => {
    // Only show loader on the very first visit per session
    if (typeof window !== 'undefined' && sessionStorage.getItem('sai-loaded')) return false;
    return true;
  });

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('sai-loaded', '1');
    }, 1600);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <>
      {/* ── Loading overlay ── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: '#060A10',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 32,
            }}
          >
            {/* Animated ring */}
            <div style={{ position: 'relative', width: 100, height: 100 }}>
              {/* Outer ring */}
              <svg
                width="100" height="100" viewBox="0 0 100 100"
                style={{
                  position: 'absolute', inset: 0,
                  animation: 'loader-ring-spin 2.5s linear infinite',
                }}
              >
                <circle
                  cx="50" cy="50" r="44"
                  fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1.5"
                />
                <circle
                  cx="50" cy="50" r="44"
                  fill="none" stroke="#3B82F6" strokeWidth="1.5"
                  strokeDasharray="276.46"
                  strokeDashoffset="207.35"
                  strokeLinecap="round"
                />
              </svg>
              {/* Inner ring */}
              <svg
                width="100" height="100" viewBox="0 0 100 100"
                style={{
                  position: 'absolute', inset: 0,
                  animation: 'loader-ring-spin 1.8s linear infinite reverse',
                }}
              >
                <circle
                  cx="50" cy="50" r="34"
                  fill="none" stroke="rgba(59,130,246,0.04)" strokeWidth="1"
                />
                <circle
                  cx="50" cy="50" r="34"
                  fill="none" stroke="rgba(96,165,250,0.5)" strokeWidth="1"
                  strokeDasharray="213.63"
                  strokeDashoffset="160.22"
                  strokeLinecap="round"
                />
              </svg>
              {/* Center logo */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <BrandImage
                  src={saiLogo}
                  alt="Sai Enterprises"
                  tone="white"
                  style={{
                    width: 48, height: 48,
                  }}
                />
              </motion.div>
            </div>

            {/* Brand text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22, fontWeight: 600, color: '#fff',
                letterSpacing: '0.08em', marginBottom: 6,
              }}>
                SAI ENTERPRISES
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}>
                Graphic Machinery Suppliers
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                width: 140, height: 2,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 1, overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '100%',
                background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                animation: 'loader-progress 1.4s cubic-bezier(0.16,1,0.3,1) forwards',
                transformOrigin: 'left',
              }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page content ── */}
      <motion.div
        className={`min-h-screen bg-background ${className}`}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>

      <style>{`
        @keyframes loader-ring-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes loader-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </>
  );
});

PageTransition.displayName = 'PageTransition';

export default PageTransition;
