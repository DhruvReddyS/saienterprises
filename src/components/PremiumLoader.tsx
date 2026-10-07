import { useEffect, useRef, useState, useCallback } from 'react';
import saiLogo from '@/assets/sai-logo-cmyk.png';

interface PremiumLoaderProps {
  onComplete: () => void;
}

const HOLD_MS = 1250;
const EXIT_MS = 680;

/* Intro overlay, built as a press calibration screen: crop marks, a CMYK
   control strip and a registration crosshair. The company sells printing
   machinery and its mark is already CMYK, so this is the house language
   rather than a generic spinner.

   Everything animates on transform or opacity only. */
const PremiumLoader = ({ onComplete }: PremiumLoaderProps) => {
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();
  const go = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / HOLD_MS, 1);
      // Decelerate into 100 instead of stopping dead.
      setProgress(1 - Math.pow(1 - t, 2.4));
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

  const pct = Math.round(progress * 100);
  const stage = pct < 34 ? 'Loading plates' : pct < 72 ? 'Registering' : 'Ready';

  return (
    <>
      <style>{`
        @keyframes pl-rise {
          from { transform: translateY(104%); }
          to   { transform: translateY(0); }
        }
        @keyframes pl-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pl-mark {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pl-rule-x {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes pl-cross {
          from { opacity: 0; transform: rotate(-24deg) scale(0.8); }
          to   { opacity: 1; transform: rotate(0deg) scale(1); }
        }
        @keyframes pl-crop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .pl {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          overflow: hidden;
          background:
            radial-gradient(ellipse 68% 54% at 50% 44%, #0B1423 0%, #070C16 46%, #03060C 100%);
          transition:
            opacity ${EXIT_MS}ms cubic-bezier(0.7,0,0.3,1),
            transform ${EXIT_MS}ms cubic-bezier(0.7,0,0.3,1);
        }
        .pl[data-exiting='true'] {
          opacity: 0;
          transform: scale(1.025);
          pointer-events: none;
        }

        /* Plate grid */
        .pl__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(46,144,255,0.065) 1px, transparent 1px),
            linear-gradient(90deg, rgba(46,144,255,0.065) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 58% 54% at 50% 46%, #000 18%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 58% 54% at 50% 46%, #000 18%, transparent 80%);
        }

        /* Crop marks, as they sit on a press sheet */
        .pl__crop {
          position: absolute;
          width: 26px; height: 26px;
          border-color: rgba(255,255,255,0.22);
          animation: pl-crop .7s ease .15s both;
          pointer-events: none;
        }
        .pl__crop--tl { top: 30px; left: 30px;  border-top: 1px solid; border-left: 1px solid; }
        .pl__crop--tr { top: 30px; right: 30px; border-top: 1px solid; border-right: 1px solid; }
        .pl__crop--bl { bottom: 30px; left: 30px;  border-bottom: 1px solid; border-left: 1px solid; }
        .pl__crop--br { bottom: 30px; right: 30px; border-bottom: 1px solid; border-right: 1px solid; }

        .pl__stage {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
          padding-inline: 24px; max-width: 100%;
        }

        /* Registration crosshair sitting behind the mark */
        .pl__reg {
          position: absolute;
          top: 50%; left: 50%;
          width: 196px; height: 196px;
          margin: -98px 0 0 -98px;
          pointer-events: none;
          animation: pl-cross 1.1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .pl__reg::before,
        .pl__reg::after {
          content: '';
          position: absolute;
          background: rgba(102,181,255,0.3);
        }
        .pl__reg::before { left: 0; right: 0; top: 50%; height: 1px; }
        .pl__reg::after  { top: 0; bottom: 0; left: 50%; width: 1px; }
        .pl__reg i {
          position: absolute; inset: 34px;
          border: 1px solid rgba(102,181,255,0.22);
          border-radius: 50%;
        }
        .pl__reg i + i { inset: 62px; border-color: rgba(102,181,255,0.14); }

        .pl__mark-wrap { position: relative; display: grid; place-items: center; height: 196px; width: 196px; }
        .pl__mark {
          position: relative; z-index: 1;
          width: min(104px, 26vw);
          display: block; object-fit: contain;
          animation: pl-mark .85s cubic-bezier(0.16,1,0.3,1) .1s both;
        }

        .pl__rule {
          width: min(380px, 76vw);
          height: 1px;
          margin: 14px 0 20px;
          transform-origin: center;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: pl-rule-x .8s cubic-bezier(0.16,1,0.3,1) .3s both;
        }

        /* Wordmark rides up behind its own mask */
        .pl__word { overflow: hidden; display: block; }
        .pl__word > span {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(25px, 5.2vw, 50px);
          font-weight: 700;
          letter-spacing: -0.035em;
          line-height: 1.04;
          color: #fff;
          white-space: nowrap;
          animation: pl-rise .95s cubic-bezier(0.16,1,0.3,1) both;
        }
        .pl__word:nth-of-type(1) > span { animation-delay: .32s; }
        .pl__word:nth-of-type(2) > span { animation-delay: .40s; }

        .pl__tag {
          margin-top: 18px;
          display: flex; align-items: center; gap: 11px;
          font-family: var(--font-mono);
          font-size: 9.5px; font-weight: 500;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          animation: pl-fade .7s cubic-bezier(0.16,1,0.3,1) .66s both;
        }
        .pl__tag i {
          width: 3px; height: 3px; border-radius: 50%;
          background: #2E90FF; box-shadow: 0 0 8px rgba(46,144,255,0.9);
          flex-shrink: 0;
        }

        /* ── CMYK control strip ── */
        .pl__meter {
          position: absolute;
          left: 50%; bottom: clamp(40px, 8vh, 72px);
          transform: translateX(-50%);
          width: min(300px, 66vw);
          animation: pl-fade .6s ease .5s both;
        }
        .pl__readout {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 9px;
          font-family: var(--font-mono);
          font-size: 9px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.42);
        }
        .pl__readout b {
          font-weight: 700;
          color: #fff;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.08em;
        }
        .pl__bars {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 3px;
        }
        .pl__bar {
          position: relative;
          height: 4px;
          border-radius: 1px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
        }
        .pl__bar i {
          position: absolute; inset: 0;
          transform-origin: left center;
          border-radius: 1px;
        }
        /* The four process inks, filling in sequence. */
        .pl__bar:nth-child(1) i { background: #00AEEF; }
        .pl__bar:nth-child(2) i { background: #EC008C; }
        .pl__bar:nth-child(3) i { background: #FFF200; }
        .pl__bar:nth-child(4) i { background: #D9DEE7; }

        @media (prefers-reduced-motion: reduce) {
          .pl__mark, .pl__rule, .pl__word > span, .pl__tag,
          .pl__meter, .pl__reg, .pl__crop {
            animation: none !important;
          }
          .pl__word > span { transform: none; }
        }
      `}</style>

      <div className="pl" data-exiting={exiting} role="status" aria-label="Loading Sai Enterprises">
        <div className="pl__grid" aria-hidden="true" />
        <span className="pl__crop pl__crop--tl" aria-hidden="true" />
        <span className="pl__crop pl__crop--tr" aria-hidden="true" />
        <span className="pl__crop pl__crop--bl" aria-hidden="true" />
        <span className="pl__crop pl__crop--br" aria-hidden="true" />

        <div className="pl__stage">
          <div className="pl__mark-wrap">
            <div className="pl__reg" aria-hidden="true"><i /><i /></div>
            <img className="pl__mark" src={saiLogo} alt="" aria-hidden="true" />
          </div>

          <div className="pl__rule" aria-hidden="true" />

          <span className="pl__word"><span>SAI</span></span>
          <span className="pl__word"><span>ENTERPRISES</span></span>

          <div className="pl__tag">
            <span>Graphic Machinery</span>
            <i />
            <span>Est. 2000</span>
          </div>
        </div>

        <div className="pl__meter">
          <div className="pl__readout">
            <span>{stage}</span>
            <b>{String(pct).padStart(3, '0')}%</b>
          </div>
          <div className="pl__bars">
            {[0, 1, 2, 3].map((i) => {
              /* Each ink fills over its own quarter of the run, so the strip
                 reads as a sequence rather than four identical bars. */
              const span = 1 / 4;
              const local = Math.min(Math.max((progress - i * span) / span, 0), 1);
              return (
                <span className="pl__bar" key={i}>
                  <i style={{ transform: `scaleX(${local})` }} />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumLoader;
