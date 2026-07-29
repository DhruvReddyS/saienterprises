import { useEffect, useState, useCallback } from 'react';
import saiLogo from '@/assets/sai-logo-cmyk.png';

interface PremiumLoaderProps {
  onComplete: () => void;
}

const PremiumLoader = ({ onComplete }: PremiumLoaderProps) => {
  const [exiting, setExiting] = useState(false);
  const go = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    const t0 = setTimeout(() => setExiting(true), 650);
    const t1 = setTimeout(go, 950);
    return () => [t0, t1].forEach(clearTimeout);
  }, [go]);

  return (
    <>
      <style>{`
        @keyframes pl-logo-in {
          0%   { opacity: 0; transform: translateY(16px) scale(0.94); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pl-letters-in {
          0%   { opacity: 0; transform: translateY(28px); letter-spacing: 0.4em; }
          100% { opacity: 1; transform: translateY(0); letter-spacing: 0.05em; }
        }
        @keyframes pl-barcode-pulse {
          0%, 100% { opacity: 0.16; }
          50%      { opacity: 0.32; }
        }
        @keyframes pl-rule-in {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes pl-progress {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes pl-tag-in {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'radial-gradient(ellipse at center, #0A1220 0%, #04070D 60%, #02040A 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.02)' : 'scale(1)',
        transition: exiting ? 'opacity 0.55s ease, transform 0.55s ease' : 'none',
        pointerEvents: exiting ? 'none' : 'all',
        overflow: 'hidden',
      }}>
        {/* Barcode lines background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `repeating-linear-gradient(
            90deg,
            rgba(59,130,246,0.08) 0px,
            rgba(59,130,246,0.08) 1px,
            transparent 1px,
            transparent 12px
          )`,
          animation: 'pl-barcode-pulse 3.2s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Center radial glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(720px, 92vw)', height: 280,
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }} />

        {/* Logo */}
        <div style={{
          animation: 'pl-logo-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both',
          marginBottom: 36,
          position: 'relative', zIndex: 2,
        }}>
          <img
            src={saiLogo}
            alt="Sai Enterprises"
            style={{ width: 'min(180px, 40vw)', objectFit: 'contain', display: 'block', filter: 'brightness(1.06)' }}
          />
        </div>

        {/* Wordmark with barcode scanner sweep */}
        <div style={{
          position: 'relative',
          padding: '12px 4px',
          maxWidth: '92vw',
          overflow: 'hidden',
        }}>
          {/* Top hairline */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: 1, background: 'rgba(255,255,255,0.14)',
            transformOrigin: 'center',
            animation: 'pl-rule-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both',
          }} />
          {/* Bottom hairline */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 1, background: 'rgba(255,255,255,0.14)',
            transformOrigin: 'center',
            animation: 'pl-rule-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both',
          }} />

          <h1 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(32px, 6.4vw, 64px)',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '0.05em',
            margin: 0,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            userSelect: 'none',
            animation: 'pl-letters-in 0.95s cubic-bezier(0.16,1,0.3,1) 0.35s both',
            textShadow: '0 0 60px rgba(59,130,246,0.32)',
          }}>
            SAI ENTERPRISES
          </h1>

        </div>

        {/* Tagline */}
        <div style={{
          marginTop: 36,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 8,
          textAlign: 'center',
          opacity: 0,
          animation: 'pl-tag-in 0.7s ease 0.85s forwards',
        }}>
          <div style={{
            fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', fontWeight: 700,
            fontFamily: "'Manrope', sans-serif",
          }}>
            Graphic Machinery Suppliers
          </div>
          <div style={{
            fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.32)',
            fontFamily: "'Manrope', sans-serif",
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <span>Est. 2000</span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(96,165,250,0.5)' }} />
            <span>24+ Years</span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(96,165,250,0.5)' }} />
            <span>India · East Africa</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 52,
          width: 'min(140px, 30vw)', height: 1,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0,
            height: '100%', background: '#60A5FA',
            animation: 'pl-progress 2.2s cubic-bezier(0.16,1,0.3,1) forwards',
            boxShadow: '0 0 12px rgba(96,165,250,0.6)',
          }} />
        </div>
      </div>
    </>
  );
};

export default PremiumLoader;
