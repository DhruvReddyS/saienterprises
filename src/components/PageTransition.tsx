import { ReactNode, memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import saiLogo from '@/assets/sai-logo-cmyk.png';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: { opacity: 0.72, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.2, ease: [0.55, 0, 1, 0.45] as [number, number, number, number] } },
};

const ScanLoader = () => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 9999,
    background: 'radial-gradient(ellipse at center, #0A1220 0%, #04070D 60%, #02040A 100%)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
  }}>
    {/* Barcode lines bg */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `repeating-linear-gradient(
        90deg,
        rgba(59,130,246,0.06) 0px, rgba(59,130,246,0.06) 1px,
        transparent 1px, transparent 12px
      )`,
      animation: 'sai-bar-pulse 3.2s ease-in-out infinite',
      pointerEvents: 'none',
    }} />

    {/* Center glow */}
    <div style={{
      position: 'absolute',
      top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      width: 540, height: 220,
      background: 'radial-gradient(ellipse, rgba(59,130,246,0.14) 0%, transparent 70%)',
      filter: 'blur(40px)',
      pointerEvents: 'none',
    }} />

    {/* Logo */}
    <div style={{ marginBottom: 30, animation: 'sai-logo-in 0.7s cubic-bezier(0.16,1,0.3,1) both' }}>
      <img src={saiLogo} alt="Sai Enterprises" loading="eager" decoding="async"
        style={{ width: 'min(120px, 32vw)', objectFit: 'contain', display: 'block', filter: 'brightness(1.06)' }} />
    </div>

    {/* Wordmark with scanner sweep */}
    <div style={{ position: 'relative', padding: '12px 4px', maxWidth: '92vw', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'rgba(255,255,255,0.14)',
        transformOrigin: 'center', animation: 'sai-rule-in 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'rgba(255,255,255,0.14)',
        transformOrigin: 'center', animation: 'sai-rule-in 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both',
      }} />

      <h1 style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: 'clamp(26px, 5.6vw, 52px)', fontWeight: 700,
        color: '#FFFFFF', letterSpacing: '0.05em',
        margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', userSelect: 'none',
        animation: 'sai-letters-in 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both',
        textShadow: '0 0 60px rgba(59,130,246,0.32)',
      }}>
        SAI ENTERPRISES
      </h1>

      {/* Scanner glow sweep */}
      <div style={{
        position: 'absolute', top: 4, bottom: 4, width: 80,
        background: 'linear-gradient(to right, transparent, rgba(96,165,250,0.55), transparent)',
        filter: 'blur(14px)',
        animation: 'sai-scan-x 2.1s cubic-bezier(0.55,0,0.45,1) 0.4s infinite',
        pointerEvents: 'none',
      }} />
      {/* Scanner sharp line */}
      <div style={{
        position: 'absolute', top: 4, bottom: 4, width: 2,
        background: '#60A5FA',
        boxShadow: '0 0 16px rgba(96,165,250,0.85), 0 0 36px rgba(59,130,246,0.55)',
        animation: 'sai-scan-x 2.1s cubic-bezier(0.55,0,0.45,1) 0.4s infinite',
        pointerEvents: 'none',
      }} />
    </div>

    {/* Tagline */}
    <div style={{
      marginTop: 30, display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 6, textAlign: 'center',
      animation: 'sai-tag-in 0.6s ease 0.7s both',
    }}>
      <div style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)', fontWeight: 700,
      }}>
        Graphic Machinery · Est. 2000
      </div>
    </div>

    {/* Progress bar */}
    <div style={{
      width: 'min(120px, 28vw)', height: 1,
      background: 'rgba(255,255,255,0.08)',
      overflow: 'hidden', position: 'absolute', bottom: 44,
    }}>
      <div style={{
        height: '100%', background: '#60A5FA',
        animation: 'sai-progress 2.2s cubic-bezier(0.16,1,0.3,1) forwards',
        transformOrigin: 'left',
        boxShadow: '0 0 12px rgba(96,165,250,0.6)',
      }} />
    </div>

    <style>{`
      @keyframes sai-logo-in { from { opacity:0; transform: translateY(12px) scale(0.94);} to { opacity:1; transform:none;} }
      @keyframes sai-letters-in { from { opacity:0; transform: translateY(20px); letter-spacing:0.32em;} to { opacity:1; transform: translateY(0); letter-spacing:0.05em;} }
      @keyframes sai-rule-in { from { transform: scaleX(0);} to { transform: scaleX(1);} }
      @keyframes sai-tag-in { from { opacity:0;} to { opacity:1;} }
      @keyframes sai-bar-pulse { 0%,100% { opacity:0.16;} 50% { opacity:0.32;} }
      @keyframes sai-scan-x {
        0%   { left: -8%; opacity: 0; }
        12%  { opacity: 1; }
        88%  { opacity: 1; }
        100% { left: 108%; opacity: 0; }
      }
      @keyframes sai-progress { from { transform: scaleX(0);} to { transform: scaleX(1);} }
    `}</style>
  </div>
);

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
        className={`sai-page-shell min-h-screen bg-background ${className}`}
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
