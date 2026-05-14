import { useState, useEffect, useCallback, useRef } from 'react';

/* ── Load all brochure images in order ── */
const imageModules = import.meta.glob(
  '../../assets/brochure_images/*.jpg',
  { eager: true }
);
const PAGES: string[] = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, m]) => (m as { default: string }).default);

const TOTAL = PAGES.length; // 36
// Spreads: 0 = cover alone, 1..17 = pairs, 18 = back alone
const TOTAL_SPREADS = Math.floor(TOTAL / 2) + 1;

function getSpread(s: number): { left: string | null; right: string | null; leftNum: number | null; rightNum: number | null } {
  if (s === 0) return { left: null, right: PAGES[0], leftNum: null, rightNum: 1 };
  if (s === TOTAL_SPREADS - 1) return { left: PAGES[TOTAL - 1], right: null, leftNum: TOTAL, rightNum: null };
  return { left: PAGES[2 * s - 1], right: PAGES[2 * s], leftNum: 2 * s, rightNum: 2 * s + 1 };
}

/* ── Prev/Next icons ── */
const ChevLeft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const ChevRight = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const FullscreenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);
const ExitFullscreenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
  </svg>
);
const ThumbsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);

/* ── FLIP DURATION ── */
const FLIP_MS = 700;

export default function BookViewer() {
  const [spread, setSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<'fwd' | 'bwd'>('fwd');
  // During animation: from/to spreads
  const [fromSpread, setFromSpread] = useState(0);
  const [toSpread, setToSpread] = useState(0);
  const [showThumbs, setShowThumbs] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobilePage, setMobilePage] = useState(0); // 0-indexed page for mobile single view
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const canGoFwd = spread < TOTAL_SPREADS - 1;
  const canGoBwd = spread > 0;

  const flipTo = useCallback((target: number) => {
    if (isFlipping || target === spread) return;
    const dir = target > spread ? 'fwd' : 'bwd';
    setFlipDir(dir);
    setFromSpread(spread);
    setToSpread(target);
    setIsFlipping(true);
    setTimeout(() => {
      setSpread(target);
      setIsFlipping(false);
    }, FLIP_MS);
  }, [isFlipping, spread]);

  const goFwd = useCallback(() => { if (canGoFwd) flipTo(spread + 1); }, [canGoFwd, flipTo, spread]);
  const goBwd = useCallback(() => { if (canGoBwd) flipTo(spread - 1); }, [canGoBwd, flipTo, spread]);

  // Mobile page nav
  const mobileGoFwd = useCallback(() => {
    if (mobilePage < TOTAL - 1) setMobilePage(p => p + 1);
  }, [mobilePage]);
  const mobileGoBwd = useCallback(() => {
    if (mobilePage > 0) setMobilePage(p => p - 1);
  }, [mobilePage]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') isMobile ? mobileGoFwd() : goFwd();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') isMobile ? mobileGoBwd() : goBwd();
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goFwd, goBwd, isMobile, mobileGoFwd, mobileGoBwd]);

  // Touch swipe (mobile)
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) dx > 0 ? mobileGoFwd() : mobileGoBwd();
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };
  useEffect(() => {
    const handler = () => { if (!document.fullscreenElement) setIsFullscreen(false); };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Scroll active thumb into view
  useEffect(() => {
    if (showThumbs && thumbsRef.current) {
      const active = thumbsRef.current.querySelector('[data-active="true"]') as HTMLElement;
      active?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    }
  }, [spread, showThumbs]);

  const current = getSpread(spread);
  const from = getSpread(fromSpread);
  const to = getSpread(toSpread);

  /* ── Spread display helpers ── */
  // What the left static panel shows right now (settled state + during anim)
  const staticLeft = isFlipping ? (flipDir === 'fwd' ? from.left : to.left) : current.left;
  const staticRight = isFlipping ? (flipDir === 'fwd' ? to.right : from.right) : current.right;
  // The flip leaf content
  const flipFrontPage = flipDir === 'fwd' ? from.right : from.left;
  const flipBackPage = flipDir === 'fwd' ? to.left : to.right;

  const leftPageNum = isFlipping
    ? (flipDir === 'fwd' ? from.leftNum : to.leftNum)
    : current.leftNum;
  const rightPageNum = isFlipping
    ? (flipDir === 'fwd' ? to.rightNum : from.rightNum)
    : current.rightNum;

  /* ── MOBILE view ── */
  if (isMobile) {
    return (
      <div style={{
        background: '#060A10', minHeight: '100dvh',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '24px 0 calc(140px + env(safe-area-inset-bottom, 0px))', position: 'relative',
      }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Page */}
        <div style={{
          width: '92vw', maxWidth: 420,
          boxShadow: '0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)',
          position: 'relative',
        }}>
          <img src={PAGES[mobilePage]} alt={`Page ${mobilePage + 1}`} loading="lazy" decoding="async" style={{ width: '100%', display: 'block' }} />
          {/* Page number */}
          <div style={{
            position: 'absolute', bottom: 10, right: 12,
            fontFamily: "'DM Sans', sans-serif", fontSize: 9,
            letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)',
            background: 'rgba(0,0,0,0.5)', padding: '3px 8px',
          }}>
            {mobilePage + 1} / {TOTAL}
          </div>
        </div>

        {/* Controls — sits above the site's mobile bottom nav bar */}
        <div style={{
          position: 'fixed', bottom: 'calc(60px + env(safe-area-inset-bottom, 0px))', left: 0, right: 0,
          background: 'rgba(6,10,16,0.96)', backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '14px 24px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', zIndex: 205,
        }}>
          <button onClick={mobileGoBwd} disabled={mobilePage === 0} style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.12)',
            color: mobilePage === 0 ? 'rgba(255,255,255,0.2)' : '#fff',
            width: 42, height: 42, cursor: mobilePage === 0 ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ChevLeft />
          </button>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            Page <strong style={{ color: '#fff' }}>{mobilePage + 1}</strong> of {TOTAL}
          </span>
          <button onClick={mobileGoFwd} disabled={mobilePage === TOTAL - 1} style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.12)',
            color: mobilePage === TOTAL - 1 ? 'rgba(255,255,255,0.2)' : '#fff',
            width: 42, height: 42, cursor: mobilePage === TOTAL - 1 ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ChevRight />
          </button>
        </div>
      </div>
    );
  }

  /* ── DESKTOP book view ── */
  return (
    <div
      ref={containerRef}
      style={{
        background: isFullscreen ? '#060A10' : 'linear-gradient(180deg, #0A1220 0%, #060A10 100%)',
        padding: isFullscreen ? '0' : '48px 0 0',
        minHeight: isFullscreen ? '100vh' : undefined,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(59,130,246,0.05) 0%, transparent 70%)',
      }} />

      {/* Book stage */}
      <div style={{
        width: '100%', maxWidth: isFullscreen ? '100vw' : 1260,
        padding: isFullscreen ? '40px 40px 0' : '0 40px',
        flex: 1, display: 'flex', flexDirection: 'column',
      }}>

        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 24, paddingBottom: 16,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
            Sai Enterprises · Catalogue 2026
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              onClick={() => setShowThumbs(v => !v)}
              title="Toggle thumbnails"
              style={{
                background: showThumbs ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${showThumbs ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.1)'}`,
                color: showThumbs ? '#60A5FA' : 'rgba(255,255,255,0.5)',
                width: 34, height: 34, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <ThumbsIcon />
            </button>
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
                width: 34, height: 34, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
            >
              {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
            </button>
          </div>
        </div>

        {/* THE BOOK */}
        <div style={{
          position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center',
          perspective: '2400px', perspectiveOrigin: '50% 50%',
          flex: 1,
        }}>
          {/* Desk shadow / ambient */}
          <div style={{
            position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
            width: '90%', height: 40,
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: 0,
          }} />

          {/* Book body */}
          <div style={{
            position: 'relative',
            width: '100%', maxWidth: isFullscreen ? '84vw' : 1100,
            aspectRatio: '2 / 1.42',
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.7))',
          }}>

            {/* ─── LEFT HALF ─── */}
            <div
              style={{
                position: 'absolute', top: 0, left: 0, width: '50%', height: '100%',
                overflow: 'hidden',
                background: staticLeft ? '#F7F4EE' : '#0A1220',
                cursor: canGoBwd && !isFlipping ? 'pointer' : 'default',
              }}
              onMouseEnter={() => setHoverSide('left')}
              onMouseLeave={() => setHoverSide(null)}
              onClick={() => !isFlipping && canGoBwd && goBwd()}
            >
              {staticLeft ? (
                <img src={staticLeft} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              ) : (
                /* Empty left page — back cover side */
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, #0A1220 0%, #060A10 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: 'rgba(255,255,255,0.03)', fontWeight: 700 }}>SAI</div>
                </div>
              )}
              {/* Left page edge shadow (right edge of left page) */}
              <div style={{
                position: 'absolute', top: 0, right: 0, width: 32, height: '100%',
                background: 'linear-gradient(to left, rgba(0,0,0,0.25), transparent)',
                pointerEvents: 'none',
              }} />
              {/* Left page number */}
              {leftPageNum && (
                <div style={{
                  position: 'absolute', bottom: 10, left: 14,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 8,
                  letterSpacing: '0.1em', color: 'rgba(0,0,0,0.3)',
                }}>
                  {leftPageNum}
                </div>
              )}
              {/* Hover hint for bwd */}
              {hoverSide === 'left' && canGoBwd && !isFlipping && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                  paddingLeft: 24, pointerEvents: 'none',
                  transition: 'opacity 0.2s',
                }}>
                  <div style={{
                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', width: 44, height: 44,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ChevLeft />
                  </div>
                </div>
              )}
            </div>

            {/* ─── RIGHT HALF ─── */}
            <div
              style={{
                position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
                overflow: 'hidden',
                background: staticRight ? '#F7F4EE' : '#0A1220',
                cursor: canGoFwd && !isFlipping ? 'pointer' : 'default',
              }}
              onMouseEnter={() => setHoverSide('right')}
              onMouseLeave={() => setHoverSide(null)}
              onClick={() => !isFlipping && canGoFwd && goFwd()}
            >
              {staticRight ? (
                <img src={staticRight} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#F7F4EE' }} />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, #060A10 0%, #0A1220 100%)',
                }} />
              )}
              {/* Right page edge shadow (left edge of right page) */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: 32, height: '100%',
                background: 'linear-gradient(to right, rgba(0,0,0,0.25), transparent)',
                pointerEvents: 'none',
              }} />
              {/* Right page number */}
              {rightPageNum && (
                <div style={{
                  position: 'absolute', bottom: 10, right: 14,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 8,
                  letterSpacing: '0.1em', color: 'rgba(0,0,0,0.3)',
                }}>
                  {rightPageNum}
                </div>
              )}
              {/* Hover hint for fwd */}
              {hoverSide === 'right' && canGoFwd && !isFlipping && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                  paddingRight: 24, pointerEvents: 'none',
                }}>
                  <div style={{
                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', width: 44, height: 44,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ChevRight />
                  </div>
                </div>
              )}
            </div>

            {/* ─── FLIP LEAF ─── (only rendered during animation) */}
            {isFlipping && (
              <div style={{
                position: 'absolute',
                top: 0,
                ...(flipDir === 'fwd' ? { right: 0 } : { left: 0 }),
                width: '50%', height: '100%',
                transformStyle: 'preserve-3d' as const,
                transformOrigin: flipDir === 'fwd' ? 'left center' : 'right center',
                animation: `flipLeaf${flipDir === 'fwd' ? 'Fwd' : 'Bwd'} ${FLIP_MS}ms cubic-bezier(0.645,0.045,0.355,1.000) forwards`,
                zIndex: 10,
                pointerEvents: 'none' as const,
              }}
              >
                {/* Front face */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backfaceVisibility: 'hidden',
                  overflow: 'hidden',
                  background: '#F7F4EE',
                }}>
                  {flipFrontPage && <img src={flipFrontPage} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />}
                  {/* Gradient shadow on spine side */}
                  <div style={{
                    position: 'absolute', top: 0,
                    [flipDir === 'fwd' ? 'left' : 'right']: 0,
                    width: '40%', height: '100%',
                    background: flipDir === 'fwd'
                      ? 'linear-gradient(to right, rgba(0,0,0,0.35), transparent)'
                      : 'linear-gradient(to left, rgba(0,0,0,0.35), transparent)',
                    pointerEvents: 'none',
                  }} />
                </div>
                {/* Back face */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backfaceVisibility: 'hidden',
                  transform: flipDir === 'fwd' ? 'rotateY(-180deg)' : 'rotateY(180deg)',
                  overflow: 'hidden',
                  background: '#F7F4EE',
                }}>
                  {flipBackPage && <img src={flipBackPage} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />}
                  {/* Gradient shadow on spine side */}
                  <div style={{
                    position: 'absolute', top: 0,
                    [flipDir === 'fwd' ? 'right' : 'left']: 0,
                    width: '40%', height: '100%',
                    background: flipDir === 'fwd'
                      ? 'linear-gradient(to left, rgba(0,0,0,0.28), transparent)'
                      : 'linear-gradient(to right, rgba(0,0,0,0.28), transparent)',
                    pointerEvents: 'none',
                  }} />
                </div>
              </div>
            )}

            {/* ─── SPINE ─── */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: 6, height: '100%',
              background: 'linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.5))',
              zIndex: 20, pointerEvents: 'none',
            }} />
            {/* Spine highlight */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: 1, height: '100%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0.12))',
              zIndex: 21, pointerEvents: 'none',
            }} />

            {/* ─── PAGE CURL SHADOW (bottom right corner) ─── */}
            {!isFlipping && staticRight && hoverSide === 'right' && canGoFwd && (
              <div style={{
                position: 'absolute', bottom: 0, right: 0,
                width: 60, height: 60,
                background: 'radial-gradient(circle at 100% 100%, rgba(0,0,0,0.35) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 5,
              }} />
            )}
          </div>
        </div>

        {/* ─── CONTROLS ─── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 20, padding: '28px 0 24px',
        }}>
          {/* Prev button */}
          <button
            onClick={goBwd}
            disabled={!canGoBwd || isFlipping}
            style={{
              background: canGoBwd && !isFlipping ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${canGoBwd && !isFlipping ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.05)'}`,
              color: canGoBwd && !isFlipping ? '#fff' : 'rgba(255,255,255,0.18)',
              width: 48, height: 48, cursor: canGoBwd && !isFlipping ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', borderRadius: 0,
            }}
            onMouseEnter={(e) => { if (canGoBwd && !isFlipping) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; }}
            onMouseLeave={(e) => { if (canGoBwd && !isFlipping) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
          >
            <ChevLeft />
          </button>

          {/* Page counter */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18, fontWeight: 600, color: '#fff',
              letterSpacing: '0.04em', lineHeight: 1,
            }}>
              {spread === 0
                ? '1'
                : spread === TOTAL_SPREADS - 1
                  ? `${TOTAL}`
                  : `${2 * spread} – ${2 * spread + 1}`}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)', marginTop: 4,
            }}>
              of {TOTAL} pages
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={goFwd}
            disabled={!canGoFwd || isFlipping}
            style={{
              background: canGoFwd && !isFlipping ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${canGoFwd && !isFlipping ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.05)'}`,
              color: canGoFwd && !isFlipping ? '#60A5FA' : 'rgba(255,255,255,0.18)',
              width: 48, height: 48, cursor: canGoFwd && !isFlipping ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', borderRadius: 0,
            }}
            onMouseEnter={(e) => { if (canGoFwd && !isFlipping) (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.25)'; }}
            onMouseLeave={(e) => { if (canGoFwd && !isFlipping) (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.15)'; }}
          >
            <ChevRight />
          </button>
        </div>

        {/* ─── PROGRESS BAR ─── */}
        <div style={{
          height: 2, background: 'rgba(255,255,255,0.06)',
          position: 'relative', marginBottom: 0,
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: `${(spread / (TOTAL_SPREADS - 1)) * 100}%`,
            background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
            transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
          }} />
        </div>
      </div>

      {/* ─── THUMBNAIL STRIP ─── */}
      {showThumbs && (
        <div style={{
          width: '100%',
          background: 'rgba(6,10,16,0.96)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '16px 0',
        }}>
          <div
            ref={thumbsRef}
            style={{
              display: 'flex', gap: 8, overflowX: 'auto', padding: '0 40px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.12) transparent',
            }}
          >
            {Array.from({ length: TOTAL_SPREADS }, (_, i) => {
              const sp = getSpread(i);
              const isActive = i === spread;
              return (
                <div
                  key={i}
                  data-active={String(isActive)}
                  onClick={() => !isFlipping && flipTo(i)}
                  style={{
                    display: 'flex', gap: 2, flexShrink: 0,
                    cursor: isActive ? 'default' : 'pointer',
                    opacity: isActive ? 1 : 0.55,
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.2s',
                    outline: isActive ? '2px solid #3B82F6' : 'none',
                    outlineOffset: 2,
                  }}
                >
                  {sp.left ? (
                    <img src={sp.left} alt="" loading="lazy" decoding="async" style={{ height: 72, width: 'auto', display: 'block' }} />
                  ) : (
                    <div style={{ height: 72, width: 50, background: 'rgba(255,255,255,0.03)' }} />
                  )}
                  {sp.right ? (
                    <img src={sp.right} alt="" loading="lazy" decoding="async" style={{ height: 72, width: 'auto', display: 'block' }} />
                  ) : (
                    <div style={{ height: 72, width: 50, background: 'rgba(255,255,255,0.03)' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Keyframe styles */}
      <style>{`
        @keyframes flipLeafFwd {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(-180deg); }
        }
        @keyframes flipLeafBwd {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(180deg); }
        }
      `}</style>
    </div>
  );
}
