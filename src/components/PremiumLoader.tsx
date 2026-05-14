import { useState, useEffect, useCallback } from 'react';
import saiLogo from '@/assets/sai-logo-cmyk.png';
import AnimatedScanLoader from '@/components/ui/animated-scan-loader';

interface PremiumLoaderProps {
  onComplete: () => void;
}

const PremiumLoader = ({ onComplete }: PremiumLoaderProps) => {
  const [exiting, setExiting] = useState(false);
  const go = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    const t0 = setTimeout(() => setExiting(true), 1800);
    const t1 = setTimeout(go, 2320);
    return () => [t0, t1].forEach(clearTimeout);
  }, [go]);

  return (
    <>
      <style>{`
        @keyframes pl-logo-in {
          from { opacity:0; transform:translateY(14px) scale(0.94); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes pl-sub-in {
          from { opacity:0; }
          to   { opacity:0.35; }
        }
      `}</style>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#060A10',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 0,
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 0.5s ease' : 'none',
        pointerEvents: exiting ? 'none' : 'all',
      }}>
        {/* Logo */}
        <div style={{
          animation: 'pl-logo-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.05s both',
          marginBottom: 28,
        }}>
          <img
            src={saiLogo}
            alt="Sai Enterprises"
            style={{ width: 200, objectFit: 'contain', display: 'block' }}
          />
        </div>

        <AnimatedScanLoader />

        {/* Tagline */}
        <div style={{
          fontSize: 8.5, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          animation: 'pl-sub-in 0.8s ease 0.55s both',
          marginTop: 10,
        }}>
          Graphic Machinery · Est. 2000
        </div>
      </div>
    </>
  );
};

export default PremiumLoader;
