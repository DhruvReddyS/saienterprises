import { ReactNode, memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import saiLogo from '@/assets/sai-logo-cmyk.png';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const WORDS = [
  'PRECISION',
  'HPM CUTTERS',
  'SINCE 2000',
  'OFFSET PRINT',
  '4000+ UNITS',
  'POST-PRESS',
  'CORRUGATION',
  'PACKAGING',
  'INDIA NO.1',
  'EXCELLENCE',
];

const pageVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: [0.55, 0, 1, 0.45] as [number, number, number, number] } },
};

const ScanLoader = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = () => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 160);
    };
    const id = setInterval(cycle, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#060A10',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Barcode lines bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(
          90deg,
          rgba(59,130,246,0.015) 0px, rgba(59,130,246,0.015) 1px,
          transparent 1px, transparent 12px
        )`,
        pointerEvents: 'none',
      }} />

      {/* Center glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 500, height: 180,
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{ marginBottom: 52, opacity: 0.5 }}>
        <img src={saiLogo} alt="Sai Enterprises" loading="eager" decoding="async" style={{ height: 22, objectFit: 'contain' }} />
      </div>

      {/* Scan word */}
      <div style={{ position: 'relative', display: 'inline-block', minWidth: 'min(280px, 80vw)', textAlign: 'center' }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(32px, 10vw, 54px)', fontWeight: 700, fontStyle: 'italic',
          color: '#FFFFFF',
          letterSpacing: '0.08em',
          display: 'block',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.16s ease, transform 0.16s ease',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>
          {WORDS[wordIdx]}
        </span>

        {/* Glow scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 8,
          background: 'rgba(59,130,246,0.45)',
          borderRadius: 4, filter: 'blur(8px)',
          animation: 'sai-scan 1.8s cubic-bezier(0.65,0,0.35,1) infinite',
          top: 0, pointerEvents: 'none',
        }} />
        {/* Sharp scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 1.5,
          background: '#3B82F6',
          animation: 'sai-scan 1.8s cubic-bezier(0.65,0,0.35,1) infinite',
          top: 0, zIndex: 1, pointerEvents: 'none',
          boxShadow: '0 0 6px rgba(59,130,246,0.8)',
        }} />
      </div>

      {/* Wordmark */}
      <div style={{ marginTop: 48, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.22)', fontWeight: 700,
        }}>
          SAI ENTERPRISES
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 7.5, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.10)',
        }}>
          Graphic Machinery · Est. 2000
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 100, height: 1, background: 'rgba(255,255,255,0.06)',
        overflow: 'hidden', position: 'absolute', bottom: 44, borderRadius: 1,
      }}>
        <div style={{
          height: '100%', background: '#3B82F6',
          animation: 'sai-progress 2.4s cubic-bezier(0.16,1,0.3,1) forwards',
          transformOrigin: 'left',
        }} />
      </div>

      <style>{`
        @keyframes sai-scan {
          0%   { top: 2px; }
          50%  { top: 56px; }
          100% { top: 2px; }
        }
        @keyframes sai-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

const PageTransition = memo(({ children, className = '' }: PageTransitionProps) => {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('sai-loaded')) return false;
    return true;
  });

  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('sai-loaded', '1');
    }, 2400);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScanLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`min-h-screen bg-background ${className}`}
        initial="initial" animate="enter" exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </>
  );
});

PageTransition.displayName = 'PageTransition';
export default PageTransition;
