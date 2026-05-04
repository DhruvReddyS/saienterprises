import { useState, useEffect, useCallback } from 'react';
import saiLogo from '@/assets/sai-logo-cmyk.png';

interface PremiumLoaderProps {
  onComplete: () => void;
}

/**
 * "The Blade" — thematic to HPM paper cutters.
 * 1. Logo + name reveal on solid dark screen
 * 2. A single bright vertical blade descends centre-to-bottom
 * 3. Both halves slide apart, revealing the site behind
 */
const PremiumLoader = ({ onComplete }: PremiumLoaderProps) => {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  // 0: content fade-in  1: blade descends  2: panels split  3: done

  const go = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    const t0 = setTimeout(() => setPhase(1), 600);   // content visible → blade
    const t1 = setTimeout(() => setPhase(2), 1200);  // blade done → split
    const t2 = setTimeout(() => setPhase(3), 1850);  // panels gone → done
    const t3 = setTimeout(go, 1900);
    return () => [t0, t1, t2, t3].forEach(clearTimeout);
  }, [go]);

  const splitting = phase >= 2;
  const done = phase >= 3;

  return (
    <>
      <style>{`
        @keyframes pl-logo-in {
          from { opacity:0; transform:translateY(14px) scale(0.94); }
          to   { opacity:1; transform:translateY(0)    scale(1);    }
        }
        @keyframes pl-text-in {
          from { opacity:0; letter-spacing:0.12em; }
          to   { opacity:1; letter-spacing:0.38em;  }
        }
        @keyframes pl-sub-in {
          from { opacity:0; }
          to   { opacity:0.35; }
        }
        @keyframes pl-blade-drop {
          from { height:0%;   opacity:1; }
          to   { height:100%; opacity:1; }
        }
        @keyframes pl-blade-glow {
          0%,100% { box-shadow: 0 0 6px 1px rgba(96,165,250,0.8); }
          50%      { box-shadow: 0 0 18px 3px rgba(59,130,246,1);  }
        }
      `}</style>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        overflow: 'hidden',
        pointerEvents: done ? 'none' : 'all',
      }}>

        {/* ── Content (logo + text) — always above panels ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 4,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 0,
          opacity: splitting ? 0 : 1,
          transition: splitting ? 'opacity 0.3s ease' : 'none',
          pointerEvents: 'none',
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

          {/* Brand name */}
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10.5, fontWeight: 800,
            color: '#fff',
            animation: 'pl-text-in 1s cubic-bezier(0.16,1,0.3,1) 0.18s both',
          }}>
            SAI ENTERPRISES
          </div>

          {/* Tagline */}
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 8.5, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            animation: 'pl-sub-in 0.8s ease 0.55s both',
            marginTop: 10,
          }}>
            Graphic Machinery · Est. 2000
          </div>
        </div>

        {/* ── Blade — vertical line that drops ── */}
        <div style={{
          position: 'absolute',
          left: '50%', top: 0,
          width: 1, transform: 'translateX(-50%)',
          background: 'linear-gradient(to bottom, transparent 0%, #60A5FA 15%, #fff 50%, #60A5FA 85%, transparent 100%)',
          animation: phase >= 1 ? 'pl-blade-drop 0.55s cubic-bezier(0.76,0,0.24,1) forwards, pl-blade-glow 0.55s ease infinite' : 'none',
          height: phase >= 1 ? undefined : 0,
          zIndex: 5,
          opacity: splitting ? 0 : 1,
          transition: splitting ? 'opacity 0.15s ease' : 'none',
        }} />

        {/* ── Left panel ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '50%', height: '100%',
          background: '#060A10',
          zIndex: 2,
          transform: splitting ? 'translateX(-100%)' : 'translateX(0)',
          transition: splitting
            ? 'transform 0.65s cubic-bezier(0.76,0,0.24,1)'
            : 'none',
        }} />

        {/* ── Right panel ── */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '50%', height: '100%',
          background: '#060A10',
          zIndex: 2,
          transform: splitting ? 'translateX(100%)' : 'translateX(0)',
          transition: splitting
            ? 'transform 0.65s cubic-bezier(0.76,0,0.24,1)'
            : 'none',
        }} />

        {/* ── Ambient glow behind panels (visible as they split) ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: '#060A10',
        }} />
      </div>
    </>
  );
};

export default PremiumLoader;
