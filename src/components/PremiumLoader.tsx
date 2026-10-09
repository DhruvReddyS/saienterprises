import { useEffect, useRef, useState, useCallback } from 'react';
import saiLogo from '@/assets/sai-logo-cmyk.png';

interface PremiumLoaderProps {
  onComplete: () => void;
}

const HOLD_MS = 1250;
const EXIT_MS = 620;

/* Intro overlay. Deliberately bare: mark, wordmark, and a four-ink progress
   strip that picks up the CMYK of the logo. No background texture or framing
   devices — they competed with the mark instead of supporting it.

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
      // Decelerate into 100 rather than stopping dead.
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
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .pl {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          overflow: hidden;
          background: #05080E;
          transition:
            opacity ${EXIT_MS}ms cubic-bezier(0.7,0,0.3,1),
            transform ${EXIT_MS}ms cubic-bezier(0.7,0,0.3,1);
        }
        .pl[data-exiting='true'] {
          opacity: 0;
          transform: scale(1.02);
          pointer-events: none;
        }

        .pl__stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-inline: 24px;
          max-width: 100%;
        }

        .pl__mark {
          width: min(92px, 23vw);
          display: block;
          object-fit: contain;
          margin-bottom: 26px;
          animation: pl-mark .8s cubic-bezier(0.16,1,0.3,1) .05s both;
        }

        /* Wordmark rides up behind its own mask. */
        .pl__word { overflow: hidden; display: block; }
        .pl__word > span {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(24px, 4.6vw, 44px);
          font-weight: 700;
          letter-spacing: -0.035em;
          line-height: 1.06;
          color: #fff;
          white-space: nowrap;
          animation: pl-rise .9s cubic-bezier(0.16,1,0.3,1) both;
        }
        .pl__word:nth-of-type(1) > span { animation-delay: .22s; }
        .pl__word:nth-of-type(2) > span { animation-delay: .3s; }

        .pl__tag {
          margin-top: 14px;
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.34);
          animation: pl-fade .7s cubic-bezier(0.16,1,0.3,1) .52s both;
        }

        /* ── Four-ink progress strip ── */
        .pl__meter {
          margin-top: 42px;
          width: min(270px, 62vw);
          animation: pl-fade .6s ease .42s both;
        }
        .pl__bars {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px;
        }
        .pl__bar {
          position: relative;
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
        }
        .pl__bar i {
          position: absolute;
          inset: 0;
          transform-origin: left center;
          border-radius: 2px;
        }
        /* The logo's own four process inks. */
        .pl__bar:nth-child(1) i { background: #00AEEF; }
        .pl__bar:nth-child(2) i { background: #EC008C; }
        .pl__bar:nth-child(3) i { background: #FFF200; }
        .pl__bar:nth-child(4) i { background: #E8EDF5; }

        .pl__pct {
          margin-top: 12px;
          text-align: center;
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.46);
          font-variant-numeric: tabular-nums;
        }

        @media (prefers-reduced-motion: reduce) {
          .pl__mark, .pl__word > span, .pl__tag, .pl__meter { animation: none !important; }
          .pl__word > span { transform: none; }
        }
      `}</style>

      <div className="pl" data-exiting={exiting} role="status" aria-label="Loading Sai Enterprises">
        <div className="pl__stage">
          <img className="pl__mark" src={saiLogo} alt="" aria-hidden="true" />

          <span className="pl__word"><span>SAI</span></span>
          <span className="pl__word"><span>ENTERPRISES</span></span>

          <div className="pl__tag">Graphic Machinery</div>

          <div className="pl__meter">
            <div className="pl__bars">
              {[0, 1, 2, 3].map((i) => {
                /* Each ink fills across its own quarter of the run, so the
                   strip reads as a sequence rather than four identical bars. */
                const span = 1 / 4;
                const local = Math.min(Math.max((progress - i * span) / span, 0), 1);
                return (
                  <span className="pl__bar" key={i}>
                    <i style={{ transform: `scaleX(${local})` }} />
                  </span>
                );
              })}
            </div>
            <div className="pl__pct">{String(pct).padStart(3, '0')}%</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumLoader;
