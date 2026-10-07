import { useEffect, useRef, useState, useCallback } from 'react';
import saiLogo from '@/assets/sai-logo-cmyk.png';

interface PremiumLoaderProps {
  onComplete: () => void;
}

const HOLD_MS = 1150;
const EXIT_MS = 620;

/* Intro overlay.
   Everything that moves here is transform or opacity. The previous version
   animated `letter-spacing` and `width`, which re-run layout on every frame
   and made the first impression of the site a stutter. */
const PremiumLoader = ({ onComplete }: PremiumLoaderProps) => {
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();
  const go = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / HOLD_MS, 1);
      // Ease-out so the count decelerates into 100 rather than stopping dead.
      setProgress(1 - Math.pow(1 - t, 2.2));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const t0 = window.setTimeout(() => setExiting(true), HOLD_MS);
    const t1 = window.setTimeout(go, HOLD_MS + EXIT_MS);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.clearTimeout(t0);
      window.clearTimeout(t1);
    };
  }, [go]);

  return (
    <>
      <style>{`
        @keyframes pl-rise {
          from { transform: translateY(102%); }
          to   { transform: translateY(0); }
        }
        @keyframes pl-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pl-mark-in {
          from { opacity: 0; transform: translateY(14px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pl-rule {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes pl-sheen {
          from { transform: translateX(-130%); }
          to   { transform: translateX(130%); }
        }

        .pl-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          overflow: hidden;
          background:
            radial-gradient(ellipse 70% 55% at 50% 42%, #0C1526 0%, #070C16 46%, #04070E 100%);
          transition: opacity ${EXIT_MS}ms cubic-bezier(0.65,0,0.35,1),
                      transform ${EXIT_MS}ms cubic-bezier(0.65,0,0.35,1);
        }
        .pl-root[data-exiting='true'] {
          opacity: 0;
          transform: scale(1.03);
          pointer-events: none;
        }

        /* Measured grid: reads as engineering, not decoration. */
        .pl-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(46,144,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(46,144,255,0.07) 1px, transparent 1px);
          background-size: 68px 68px;
          mask-image: radial-gradient(ellipse 62% 58% at 50% 44%, #000 20%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse 62% 58% at 50% 44%, #000 20%, transparent 78%);
        }

        .pl-stage {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-inline: 24px;
          max-width: 100%;
        }

        .pl-mark {
          width: min(132px, 32vw);
          display: block;
          object-fit: contain;
          animation: pl-mark-in 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s both;
        }

        .pl-rule {
          width: min(420px, 78vw);
          height: 1px;
          margin: 26px 0 22px;
          transform-origin: center;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          animation: pl-rule 0.85s cubic-bezier(0.16,1,0.3,1) 0.28s both;
        }

        /* Each word rides up behind its own mask. */
        .pl-word { overflow: hidden; display: block; }
        .pl-word > span {
          display: block;
          font-size: clamp(26px, 5.4vw, 52px);
          font-weight: 780;
          letter-spacing: -0.03em;
          line-height: 1.06;
          color: #fff;
          white-space: nowrap;
          animation: pl-rise 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
        .pl-word:nth-of-type(1) > span { animation-delay: 0.3s; }
        .pl-word:nth-of-type(2) > span { animation-delay: 0.38s; }

        .pl-tag {
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.42);
          animation: pl-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.62s both;
        }
        .pl-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: #2E90FF;
          box-shadow: 0 0 8px rgba(46,144,255,0.9);
          flex-shrink: 0;
        }

        /* Progress rail: scaleX only, so it never triggers layout. */
        .pl-meter {
          position: absolute;
          left: 50%;
          bottom: clamp(44px, 9vh, 76px);
          transform: translateX(-50%);
          width: min(260px, 62vw);
          display: flex;
          align-items: center;
          gap: 14px;
          animation: pl-fade-up 0.6s ease 0.5s both;
        }
        .pl-rail {
          position: relative;
          flex: 1;
          height: 2px;
          border-radius: 2px;
          background: rgba(255,255,255,0.09);
          overflow: hidden;
        }
        .pl-fill {
          position: absolute;
          inset: 0;
          transform-origin: left center;
          border-radius: 2px;
          background: linear-gradient(90deg, #0D53D3, #2E90FF 55%, #66B5FF);
          box-shadow: 0 0 12px rgba(46,144,255,0.65);
        }
        .pl-sheen {
          position: absolute;
          inset: 0;
          width: 40%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          animation: pl-sheen 1.1s ease-in-out infinite;
        }
        .pl-count {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.5);
          font-variant-numeric: tabular-nums;
          min-width: 30px;
          text-align: right;
        }

        @media (prefers-reduced-motion: reduce) {
          .pl-mark, .pl-rule, .pl-word > span, .pl-tag, .pl-meter, .pl-sheen {
            animation: none !important;
          }
          .pl-word > span { transform: none; }
        }
      `}</style>

      <div className="pl-root" data-exiting={exiting} role="status" aria-label="Loading Sai Enterprises">
        <div className="pl-grid" aria-hidden="true" />

        <div className="pl-stage">
          <img className="pl-mark" src={saiLogo} alt="" aria-hidden="true" />

          <div className="pl-rule" aria-hidden="true" />

          <span className="pl-word"><span>SAI</span></span>
          <span className="pl-word"><span>ENTERPRISES</span></span>

          <div className="pl-tag">
            <span>Graphic Machinery</span>
            <span className="pl-dot" />
            <span>Est. 2000</span>
          </div>
        </div>

        <div className="pl-meter">
          <div className="pl-rail">
            <div className="pl-fill" style={{ transform: `scaleX(${progress})` }} />
            <div className="pl-sheen" aria-hidden="true" />
          </div>
          <span className="pl-count">{String(Math.round(progress * 100)).padStart(3, '0')}</span>
        </div>
      </div>
    </>
  );
};

export default PremiumLoader;
