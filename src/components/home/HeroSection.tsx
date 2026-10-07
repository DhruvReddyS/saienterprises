import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import hpmLane from '@/assets/machine_png/Sai & HPM/HPM Lane.png';
import hpm115 from '@/assets/machine_png/Sai & HPM/HPM 115.png';
import hpmDigital from '@/assets/machine_png/Sai & HPM/HPM Digital Paper Cutter.png';
import hpmThreeKnife from '@/assets/machine_png/Sai & HPM/Three Knife Trimmer.png';
import hpmPileTurner from '@/assets/machine_png/Sai & HPM/Pile Turner.png';
import hpmLogo from '@/assets/optimized/hpm-logo.webp';
import BrandImage from '@/components/BrandImage';
import { getCatalogueDocument } from '@/data/catalogueDocuments';

type HeroMachine = {
  detail: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  imageClass: string;
  productId: string;
  specs: [string, string, string];
  focusMetric: string;
};

const machines: HeroMachine[] = [
  {
    detail: 'SYSTEM 01',
    eyebrow: 'Automated cutting ecosystem',
    title: 'HPM Cutting Line',
    shortTitle: 'Cutting line',
    description: 'Connected loading, programmable cutting and unloading for high-output print floors.',
    image: hpmLane,
    imageClass: 'clean-machine--lane',
    productId: 'hpm-programmable-paper-cutter-system',
    specs: ['Automated handling', 'Modular workflow', 'High-output line'],
    focusMetric: '46 CUTS / MIN',
  },
  {
    detail: 'SYSTEM 02',
    eyebrow: 'Industrial programmable cutter',
    title: 'HPM 115 Series',
    shortTitle: '115 series',
    description: 'Heavy-duty programmable precision with touch-led control and production-grade stability.',
    image: hpm115,
    imageClass: 'clean-machine--115',
    productId: 'hpm-fully-automatic-paper-cutting-machine',
    specs: ['16-inch touch control', 'Hydraulic clamp', 'Servo backgauge'],
    focusMetric: '0.01 MM',
  },
  {
    detail: 'SYSTEM 03',
    eyebrow: 'Compact digital precision',
    title: 'HPM 66Y S16',
    shortTitle: '66Y digital',
    description: 'A compact hydraulic cutter engineered for accurate digital and short-run finishing.',
    image: hpmDigital,
    imageClass: 'clean-machine--digital',
    productId: 'hpm-heavy-duty-digital-programmable-paper-cutter',
    specs: ['670 mm format', 'Programmed cutting', 'Compact footprint'],
    focusMetric: '670 × 670 MM',
  },
  {
    detail: 'SYSTEM 04',
    eyebrow: 'Book-block finishing',
    title: 'HPM Three-Knife Trimmer',
    shortTitle: '3-knife trim',
    description: 'Controlled three-edge trimming for consistent book-block finishing in one production cycle.',
    image: hpmThreeKnife,
    imageClass: 'clean-machine--trimmer',
    productId: 'automatic-feeding-three-knife-trimmer',
    specs: ['Three-edge trim', 'Automated cycle', 'Book production'],
    focusMetric: '3-EDGE TRIM',
  },
  {
    detail: 'SYSTEM 05',
    eyebrow: 'Intelligent material handling',
    title: 'HPM Pile Turner',
    shortTitle: 'Pile turner',
    description: 'Automated pile turning, aeration and alignment for cleaner, more stable paper handling.',
    image: hpmPileTurner,
    imageClass: 'clean-machine--turner',
    productId: 'pile-turner',
    specs: ['Pile aeration', 'Stack alignment', 'Automated turning'],
    focusMetric: '2000 KG LOAD',
  },
];

const CYCLE_MS = 5600;

const precisionCurve = [
  { y: 8, rotate: -5.5, rotateY: 7, z: 0 },
  { y: 4, rotate: -4, rotateY: 5, z: 5 },
  { y: 1, rotate: -2.5, rotateY: 3, z: 10 },
  { y: -2, rotate: -1.25, rotateY: 1.5, z: 15 },
  { y: -4, rotate: 0, rotateY: 0, z: 18 },
  { y: -2, rotate: 1.25, rotateY: -1.5, z: 15 },
  { y: 1, rotate: 2.5, rotateY: -3, z: 10 },
  { y: 4, rotate: 4, rotateY: -5, z: 5 },
  { y: 8, rotate: 5.5, rotateY: -7, z: 0 },
];

const motionCurve = [
  { y: -4, rotate: 4.5, rotateY: 6, z: 2 },
  { y: -1, rotate: 3.25, rotateY: 4, z: 6 },
  { y: 2, rotate: 2, rotateY: 2, z: 10 },
  { y: 4, rotate: 1, rotateY: 1, z: 13 },
  { y: 6, rotate: 0, rotateY: 0, z: 15 },
  { y: 4, rotate: -1, rotateY: -1, z: 13 },
  { y: 2, rotate: -2, rotateY: -2, z: 10 },
  { y: -1, rotate: -3.25, rotateY: -4, z: 6 },
  { y: -4, rotate: -4.5, rotateY: -6, z: 2 },
];

const curvedLetterStyle = (
  curve: (typeof precisionCurve)[number],
  index: number,
) => ({
  '--letter-y': `${curve.y}px`,
  '--letter-r': `${curve.rotate}deg`,
  '--letter-ry': `${curve.rotateY}deg`,
  '--letter-z': `${curve.z}px`,
  '--letter-index': index,
}) as CSSProperties;

const renderCurvedText = (
  text: string,
  curve: typeof precisionCurve,
) => (
  <>
    {[...text].map((letter, index) => (
      <b
        key={`${letter}-${index}`}
        aria-hidden="true"
        data-letter={letter === ' ' ? '\u00A0' : letter}
        style={curvedLetterStyle(curve[index], index)}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </b>
    ))}
  </>
);

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const current = machines[active];
  const currentCatalogue = getCatalogueDocument(current.productId);

  /* Park the hero while it is off screen: no carousel re-renders and no CSS
     animation, so scrolling the rest of the page has the main thread to itself. */
  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '120px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(
      () => setActive((value) => (value + 1) % machines.length),
      CYCLE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, visible]);

  const selectMachine = (index: number) => {
    setActive((index + machines.length) % machines.length);
  };

  /* Each of these custom properties invalidates style for the whole hero
     subtree, so a raw pointermove handler recalculated it dozens of times a
     second. One coalesced write per frame is plenty for a parallax this subtle. */
  const pointerFrame = useRef<number>();
  const moveMachine = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    const node = event.currentTarget;
    const clientX = event.clientX;
    const clientY = event.clientY;
    if (pointerFrame.current) return;
    pointerFrame.current = requestAnimationFrame(() => {
      pointerFrame.current = undefined;
      const bounds = node.getBoundingClientRect();
      const x = (clientX - bounds.left) / bounds.width - 0.5;
      const y = (clientY - bounds.top) / bounds.height - 0.5;
      node.style.setProperty('--hero-shift-x', `${(x * 18).toFixed(2)}px`);
      node.style.setProperty('--hero-shift-y', `${(y * 12).toFixed(2)}px`);
      node.style.setProperty('--hero-rotate-x', `${(y * -3).toFixed(2)}deg`);
      node.style.setProperty('--hero-rotate-y', `${(x * 5).toFixed(2)}deg`);
      node.style.setProperty('--hero-pointer-x', `${((x + 0.5) * 100).toFixed(1)}%`);
      node.style.setProperty('--hero-pointer-y', `${((y + 0.5) * 100).toFixed(1)}%`);
    });
  };

  const resetMachine = () => {
    if (pointerFrame.current) {
      cancelAnimationFrame(pointerFrame.current);
      pointerFrame.current = undefined;
    }
    const hero = heroRef.current;
    if (!hero) return;
    hero.style.setProperty('--hero-shift-x', '0px');
    hero.style.setProperty('--hero-shift-y', '0px');
    hero.style.setProperty('--hero-rotate-x', '0deg');
    hero.style.setProperty('--hero-rotate-y', '0deg');
    hero.style.setProperty('--hero-pointer-x', '50%');
    hero.style.setProperty('--hero-pointer-y', '42%');
  };

  return (
    <section
      ref={heroRef}
      className={`clean-hero${visible ? '' : ' is-dormant'}`}
      onPointerMove={moveMachine}
      onPointerLeave={resetMachine}
    >
      <div className="clean-hero__glow" aria-hidden="true" />
      <div className="clean-hero__grid" aria-hidden="true" />

      <div className="clean-hero__top">
        <div className="clean-partnership">
          <BrandImage src={hpmLogo} alt="HPM" />
          <i />
          <p>Exclusive Indian partner <strong>Sai Enterprises</strong></p>
        </div>
      </div>

      <h1 className="clean-headline" aria-label="Precision in motion">
        <span data-text="PRECISION">{renderCurvedText('PRECISION', precisionCurve)}</span>
        <strong data-text="IN MOTION">{renderCurvedText('IN MOTION', motionCurve)}</strong>
      </h1>

      <div className="clean-machine-stage" key={current.title}>
        <div className="clean-machine-halo" aria-hidden="true" />
        <div className="clean-machine-sweep" aria-hidden="true" />
        <div className="clean-focus-frame" aria-hidden="true">
          <i /><i /><i /><i />
          <span className="clean-focus-frame__status">
            Calibrated <b>{current.focusMetric}</b>
          </span>
          <span className="clean-focus-frame__system">{current.detail} · HPM</span>
          <div className="clean-focus-frame__scale" />
        </div>
        <img
          className={`clean-machine ${current.imageClass}`}
          src={current.image}
          alt={current.title}
          loading="eager"
          decoding="async"
        />
        <div className="clean-machine-shadow" aria-hidden="true" />
      </div>

      <div className="clean-intro">
        <span>Graphic machinery · Est. 2000</span>
        <p>Production systems selected, installed and supported by one experienced partner.</p>
        <Link to="/machinery?category=post-press">
          Explore HPM machinery <ArrowUpRight size={15} />
        </Link>
      </div>

      <article className="clean-system-card">
        <div className="clean-system-card__head">
          <span>{current.detail}</span>
          <div>
            <button type="button" onClick={() => selectMachine(active - 1)} aria-label="Previous HPM machine">
              <ChevronLeft size={15} />
            </button>
            <button type="button" onClick={() => selectMachine(active + 1)} aria-label="Next HPM machine">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        <div className="clean-system-card__progress">
          <i key={active} />
        </div>

        <p>{current.eyebrow}</p>
        <h2>{current.title}</h2>
        <span>{current.description}</span>

        <div className="clean-system-card__specs">
          {current.specs.map((spec, index) => (
            <div key={spec}>
              <b>0{index + 1}</b>
              <span>{spec}</span>
            </div>
          ))}
        </div>

        <div className="clean-system-card__actions">
          <Link
            className="clean-system-card__link"
            to={`/machinery?category=post-press&preview=${current.productId}`}
          >
            View details <ArrowUpRight size={14} />
          </Link>
          {currentCatalogue && (
            <a
              className="clean-system-card__download"
              href={currentCatalogue.url}
              download={currentCatalogue.file}
              aria-label={`Download technical PDF for ${current.title}`}
            >
              <Download size={13} />
              Download PDF
            </a>
          )}
        </div>
      </article>

      <div className="clean-selector" role="tablist" aria-label="Choose an HPM system">
        {machines.map((machine, index) => (
          <button
            key={machine.title}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={active === index ? 'is-active' : ''}
            onClick={() => selectMachine(index)}
          >
            <span>0{index + 1}</span>
            <p>{machine.shortTitle}</p>
          </button>
        ))}
      </div>

      <style>{`
        /* The hero animates continuously. Once it is off screen that work is
           pure cost, and it was competing with scrolling further down the page. */
        .clean-hero.is-dormant,
        .clean-hero.is-dormant * {
          animation-play-state: paused !important;
        }

        .clean-hero {
          --hero-shift-x: 0px;
          --hero-shift-y: 0px;
          --hero-rotate-x: 0deg;
          --hero-rotate-y: 0deg;
          --hero-pointer-x: 50%;
          --hero-pointer-y: 42%;
          position: relative;
          height: 100svh;
          min-height: 800px;
          overflow: hidden;
          isolation: isolate;
          color: #fff;
          background:
            radial-gradient(circle at 50% 41%, rgba(37,99,235,.13), transparent 31%),
            linear-gradient(135deg, #04070c 0%, #08111d 52%, #03060a 100%);
        }

        .clean-hero::after {
          content: '';
          position: absolute;
          z-index: 0;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          background: radial-gradient(
            330px circle at var(--hero-pointer-x) var(--hero-pointer-y),
            rgba(96,165,250,.075),
            transparent 68%
          );
          transition: opacity .45s ease;
        }

        .clean-hero__glow {
          position: absolute;
          z-index: 0;
          left: 50%;
          top: 43%;
          width: min(760px, 62vw);
          height: 430px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse, rgba(59,130,246,.13), rgba(24,53,86,.045) 48%, transparent 72%);
          filter: blur(14px);
          pointer-events: none;
          animation: clean-ambient-breathe 9s ease-in-out infinite;
        }

        .clean-hero__grid {
          position: absolute;
          z-index: 0;
          left: 14%;
          right: 14%;
          bottom: -20%;
          height: 46%;
          opacity: .18;
          background-image:
            linear-gradient(rgba(147,197,253,.17) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147,197,253,.17) 1px, transparent 1px);
          background-size: 68px 48px;
          transform: perspective(650px) rotateX(64deg);
          mask-image: linear-gradient(to bottom, transparent 4%, #000 44%, transparent 88%);
          pointer-events: none;
          animation: clean-grid-drift 18s linear infinite;
          transition: opacity .4s ease;
        }

        .clean-hero__top {
          position: absolute;
          z-index: 8;
          top: 132px;
          left: clamp(24px, 5vw, 78px);
          right: clamp(24px, 5vw, 78px);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .clean-partnership {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .clean-partnership img {
          width: 64px;
          height: 27px;
          object-fit: contain;
        }

        .clean-partnership > i {
          width: 1px;
          height: 28px;
          background: rgba(255,255,255,.16);
        }

        .clean-partnership p {
          color: rgba(255,255,255,.38);
          font-size: 8px;
          font-weight: 650;
          line-height: 1.5;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .clean-partnership strong {
          display: block;
          color: rgba(255,255,255,.78);
          font-size: 9px;
        }

        .clean-sequence {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,.4);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .clean-sequence > i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px rgba(34,197,94,.8);
        }

        .clean-sequence b {
          padding-left: 10px;
          color: #93c5fd;
          border-left: 1px solid rgba(255,255,255,.12);
        }

        .clean-headline {
          position: absolute;
          z-index: 1;
          left: 0;
          right: 0;
          top: max(13.5%, 176px);
          text-align: center;
          perspective: 900px;
          pointer-events: none;
          user-select: none;
        }

        .clean-headline span,
        .clean-headline strong {
          position: relative;
          display: block;
          transform-style: preserve-3d;
          font-family: 'Manrope', sans-serif;
          font-size: clamp(42px, 9.5vw, 176px);
          font-weight: 820;
          line-height: .78;
          letter-spacing: -.067em;
          white-space: nowrap;
        }

        .clean-headline span > b,
        .clean-headline strong > b {
          position: relative;
          z-index: 1;
          display: inline-block;
          isolation: isolate;
          transform:
            translate3d(0, var(--letter-y), var(--letter-z))
            rotateZ(var(--letter-r))
            rotateY(var(--letter-ry));
          transform-origin: 50% 78%;
          transform-style: preserve-3d;
          font: inherit;
          font-style: normal;
          transition: transform .7s cubic-bezier(.16,1,.3,1);
          will-change: transform;
        }

        .clean-headline span > b {
          color: transparent;
          background:
            linear-gradient(
              112deg,
              #fff 4%,
              #fff 42%,
              #dbeafe 51%,
              #fff 61%,
              #fff 100%
            );
          background-size: 220% 100%;
          background-position: 120% center;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,.18);
          text-shadow:
            0 1px rgba(255,255,255,.25),
            0 10px 22px rgba(0,0,0,.28);
          animation: clean-type-shimmer 8.5s ease-in-out -1.1s infinite;
        }

        .clean-headline strong > b {
          color: rgba(255,255,255,.025);
          -webkit-text-fill-color: rgba(255,255,255,.025);
          -webkit-text-stroke: inherit;
          text-shadow: inherit;
        }

        .clean-headline span > b::after,
        .clean-headline strong > b::after {
          content: attr(data-letter);
          position: absolute;
          z-index: -1;
          inset: 0;
          color: transparent;
          pointer-events: none;
          transform: translate3d(0, 7px, -4px);
        }

        .clean-headline span > b::after {
          -webkit-text-stroke: 1.35px rgba(96,165,250,.32);
          text-shadow:
            0 2px 0 rgba(59,130,246,.14),
            0 7px 13px rgba(0,0,0,.3);
        }

        .clean-headline strong > b::after {
          -webkit-text-stroke: 1.2px rgba(96,165,250,.42);
          transform: translate3d(4px, 7px, -4px);
          filter: blur(.15px);
        }

        /* The scan sweep is drawn per letter. A single full-string ghost
           cannot line up with the individually curved <b> glyphs, and its
           overhang used to bleed past the left edge of the viewport. */
        .clean-headline span > b::before,
        .clean-headline strong > b::before {
          content: attr(data-letter);
          position: absolute;
          z-index: 2;
          inset: 0;
          color: transparent;
          -webkit-text-stroke: 1px rgba(191,219,254,.72);
          filter: drop-shadow(0 0 8px rgba(59,130,246,.38));
          clip-path: inset(0 0 94% 0);
          opacity: .72;
          animation: clean-type-scan 5.6s cubic-bezier(.4,0,.2,1) infinite;
        }

        .clean-headline span {
          font-size: clamp(46px, 9.7vw, 184px);
          letter-spacing: -.045em;
          animation: clean-precision-depth 7.2s ease-in-out infinite;
        }

        .clean-headline strong {
          margin-top: .12em;
          font-size: clamp(44px, 9.3vw, 166px);
          font-weight: 760;
          letter-spacing: .035em;
          color: rgba(255,255,255,.025);
          background: none;
          -webkit-background-clip: border-box;
          background-clip: border-box;
          -webkit-text-fill-color: rgba(255,255,255,.025);
          -webkit-text-stroke: clamp(2px, .18vw, 3px) rgba(255,255,255,.96);
          opacity: 1;
          text-shadow:
            0 0 2px rgba(255,255,255,.42),
            0 16px 30px rgba(0,0,0,.58),
            0 0 22px rgba(96,165,250,.15);
          animation: clean-motion-drift 6.2s cubic-bezier(.45,0,.55,1) infinite;
          transition: -webkit-text-stroke-color .35s ease, text-shadow .35s ease;
        }

        .clean-headline strong > b::before {
          animation-delay: .34s;
        }

        .clean-machine-stage {
          position: absolute;
          z-index: 3;
          left: 50%;
          top: max(38%, 352px);
          width: min(940px, 66vw);
          height: 52%;
          display: grid;
          place-items: center;
          transform: translateX(-50%);
          animation: clean-machine-enter .72s cubic-bezier(.16,1,.3,1) both;
          perspective: 1200px;
          pointer-events: none;
        }

        .clean-focus-frame {
          position: absolute;
          z-index: 1;
          left: 50%;
          top: 50%;
          width: 78%;
          height: 65%;
          color: rgba(191,219,254,.45);
          transform:
            translate3d(
              calc(-50% + var(--hero-shift-x)),
              calc(-50% + var(--hero-shift-y)),
              -30px
            )
            rotateX(var(--hero-rotate-x))
            rotateY(var(--hero-rotate-y));
          transform-style: preserve-3d;
          transition: transform .28s cubic-bezier(.16,1,.3,1);
          will-change: transform;
        }

        .clean-focus-frame > i {
          position: absolute;
          width: 27px;
          height: 27px;
          opacity: .55;
          filter: drop-shadow(0 0 5px rgba(96,165,250,.16));
          transition: width .35s ease, height .35s ease, opacity .35s ease, filter .35s ease;
        }

        .clean-focus-frame > i:nth-child(1) {
          top: 0;
          left: 0;
          border-top: 1px solid currentColor;
          border-left: 1px solid currentColor;
        }

        .clean-focus-frame > i:nth-child(2) {
          top: 0;
          right: 0;
          border-top: 1px solid currentColor;
          border-right: 1px solid currentColor;
        }

        .clean-focus-frame > i:nth-child(3) {
          right: 0;
          bottom: 0;
          border-right: 1px solid currentColor;
          border-bottom: 1px solid currentColor;
        }

        .clean-focus-frame > i:nth-child(4) {
          bottom: 0;
          left: 0;
          border-bottom: 1px solid currentColor;
          border-left: 1px solid currentColor;
        }

        .clean-focus-frame__status,
        .clean-focus-frame__system {
          position: absolute;
          top: 50%;
          color: rgba(255,255,255,.26);
          font-size: 6px;
          font-weight: 750;
          letter-spacing: .16em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .clean-focus-frame__status {
          left: -8px;
          transform: translate(-100%, -50%) rotate(-90deg);
          transform-origin: right center;
        }

        .clean-focus-frame__status b {
          margin-left: 7px;
          color: rgba(147,197,253,.78);
        }

        .clean-focus-frame__system {
          right: -8px;
          transform: translate(100%, -50%) rotate(90deg);
          transform-origin: left center;
        }

        .clean-focus-frame__scale {
          position: absolute;
          left: 16%;
          right: 16%;
          bottom: -7px;
          height: 7px;
          opacity: .38;
          border-top: 1px solid rgba(147,197,253,.32);
          background: repeating-linear-gradient(
            90deg,
            rgba(147,197,253,.5) 0 1px,
            transparent 1px 19px
          );
          mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
        }

        .clean-hero:hover .clean-focus-frame > i {
          width: 35px;
          height: 35px;
          opacity: .9;
          filter: drop-shadow(0 0 7px rgba(96,165,250,.34));
        }

        .clean-machine {
          position: relative;
          z-index: 2;
          width: 94%;
          height: 94%;
          object-fit: contain;
          filter: drop-shadow(0 30px 30px rgba(0,0,0,.5));
          animation: clean-machine-float 6.4s ease-in-out infinite;
          transform-style: preserve-3d;
          will-change: transform, filter;
          transition: filter .35s ease;
        }

        .clean-machine--lane { width: 106%; }
        .clean-machine--115 { width: 82%; }
        .clean-machine--digital { width: 64%; }
        .clean-machine--trimmer { width: 92%; }
        .clean-machine--turner { width: 58%; }

        .clean-hero:hover .clean-machine {
          filter:
            drop-shadow(0 34px 36px rgba(0,0,0,.54))
            drop-shadow(0 0 16px rgba(96,165,250,.08))
            brightness(1.035)
            saturate(1.035);
        }

        .clean-machine-halo {
          position: absolute;
          z-index: 0;
          width: 70%;
          height: 54%;
          border: 1px solid rgba(96,165,250,.13);
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(59,130,246,.12), transparent 68%);
          transform: perspective(600px) rotateX(63deg);
          box-shadow: 0 0 80px rgba(37,99,235,.08);
          animation: clean-halo-breathe 5.6s ease-in-out infinite;
        }

        .clean-machine-sweep {
          position: absolute;
          z-index: 3;
          top: 12%;
          bottom: 16%;
          width: 18%;
          opacity: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(191,219,254,.1),
            transparent
          );
          filter: blur(12px);
          transform: translateX(-280%) skewX(-10deg);
          mix-blend-mode: screen;
          animation: clean-machine-sweep 5.6s cubic-bezier(.4,0,.2,1) infinite;
          pointer-events: none;
        }

        .clean-machine-shadow {
          position: absolute;
          z-index: 1;
          left: 24%;
          right: 24%;
          bottom: 9%;
          height: 28px;
          border-radius: 50%;
          background: rgba(0,0,0,.58);
          filter: blur(18px);
        }

        .clean-intro {
          position: absolute;
          z-index: 6;
          left: clamp(24px, 5vw, 78px);
          bottom: 112px;
          width: 324px;
          padding: 22px 24px 24px;
          border: 1px solid rgba(255,255,255,.08);
          border-top-color: rgba(191,219,254,.2);
          border-radius: 18px;
          background: linear-gradient(160deg, rgba(14,20,31,.72), rgba(5,8,14,.62));
          box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 24px 54px rgba(2,6,14,.5);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
        }

        .clean-intro > span,
        .clean-system-card > p {
          color: #7fb4ff;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .clean-intro > span { display: block; white-space: nowrap; font-size: 9px; }
        .clean-intro a { white-space: nowrap; }

        .clean-intro p {
          margin: 13px 0 18px;
          color: rgba(255,255,255,.74);
          font-size: 13.5px;
          line-height: 1.62;
        }

        .clean-intro a,
        .clean-system-card__link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #fff;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: .12em;
          text-transform: uppercase;
          transition: color .2s ease, gap .2s ease;
        }

        .clean-intro a:hover,
        .clean-system-card__link:hover {
          gap: 12px;
          color: #93c5fd;
        }

        .clean-system-card {
          position: absolute;
          z-index: 7;
          right: clamp(24px, 5vw, 78px);
          bottom: 104px;
          width: min(372px, 30vw);
          padding: 22px 22px 20px;
          border: 1px solid rgba(255,255,255,.09);
          border-top-color: rgba(191,219,254,.22);
          border-radius: 22px;
          background: linear-gradient(160deg, rgba(16,24,38,.9), rgba(6,10,18,.94));
          box-shadow: 0 32px 76px -18px rgba(2,6,14,.75), inset 0 1px 0 rgba(255,255,255,.08);
          backdrop-filter: blur(22px) saturate(150%);
          -webkit-backdrop-filter: blur(22px) saturate(150%);
          transition: transform .35s cubic-bezier(.16,1,.3,1), border-color .35s ease, box-shadow .35s ease;
        }

        .clean-system-card:hover {
          transform: translateY(-5px);
          border-color: rgba(147,197,253,.3);
          box-shadow:
            0 34px 74px rgba(0,0,0,.46),
            0 0 34px rgba(37,99,235,.07),
            inset 0 1px rgba(255,255,255,.075);
        }

        .clean-system-card__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: rgba(255,255,255,.42);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .clean-system-card__head > div {
          display: flex;
          gap: 5px;
        }

        .clean-system-card__head button {
          width: 28px;
          min-width: 28px;
          height: 28px;
          min-height: 28px;
          display: grid;
          place-items: center;
          padding: 0;
          color: rgba(255,255,255,.5);
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 8px;
          background: rgba(255,255,255,.025);
          cursor: pointer;
          transition: color .2s ease, border-color .2s ease, background .2s ease, transform .2s ease;
        }

        .clean-system-card__head button:hover {
          color: #fff;
          border-color: rgba(96,165,250,.45);
          background: rgba(59,130,246,.1);
          transform: translateY(-2px);
        }

        .clean-system-card__progress {
          height: 2px;
          margin: 15px 0 18px;
          overflow: hidden;
          border-radius: 2px;
          background: rgba(255,255,255,.08);
        }

        .clean-system-card__progress i {
          display: block;
          height: 100%;
          transform-origin: left;
          background: linear-gradient(90deg, #2563eb, #93c5fd);
          box-shadow: 0 0 8px rgba(59,130,246,.75);
          animation: clean-progress ${CYCLE_MS}ms linear forwards;
        }

        .clean-system-card h2 {
          margin: 8px 0 10px;
          color: #fff;
          font-size: clamp(23px, 2vw, 30px);
          font-weight: 740;
          line-height: 1.04;
          letter-spacing: -.035em;
        }

        .clean-system-card > span {
          display: block;
          color: rgba(255,255,255,.62);
          font-size: 12px;
          line-height: 1.6;
        }

        .clean-schematic {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 54px;
          gap: 7px;
          margin-top: 14px;
          padding: 6px;
          overflow: hidden;
          border: 1px solid rgba(125,177,255,.13);
          border-radius: 12px;
          background:
            linear-gradient(135deg, rgba(37,99,235,.075), transparent 55%),
            rgba(0,6,14,.58);
          box-shadow: inset 0 1px rgba(255,255,255,.035);
          animation: clean-schematic-enter .55s cubic-bezier(.16,1,.3,1) both;
        }

        .clean-schematic::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(105deg, transparent 30%, rgba(147,197,253,.055) 50%, transparent 70%);
          transform: translateX(-100%);
          animation: clean-schematic-glint 5.6s ease-in-out infinite;
        }

        .clean-schematic__screen {
          position: relative;
          min-width: 0;
          overflow: hidden;
          border: 1px solid rgba(147,197,253,.14);
          border-radius: 8px 10px 10px 8px / 10px 8px 8px 10px;
          background:
            radial-gradient(circle at 50% 45%, rgba(37,99,235,.105), transparent 68%),
            #020810;
          box-shadow:
            inset 0 0 18px rgba(0,0,0,.68),
            inset 0 0 20px rgba(37,99,235,.045);
        }

        .clean-schematic__screen::after {
          content: '';
          position: absolute;
          z-index: 6;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 3px,
            rgba(191,219,254,.018) 4px
          );
        }

        .clean-schematic__label {
          position: absolute;
          z-index: 5;
          top: 9px;
          left: 10px;
          right: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          pointer-events: none;
        }

        .clean-schematic__label span,
        .clean-schematic__label b {
          color: rgba(255,255,255,.43);
          font-size: 6px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .clean-schematic__label b {
          color: #8bbcff;
        }

        .clean-schematic__canvas {
          position: relative;
          height: 78px;
          overflow: hidden;
          background-image:
            linear-gradient(rgba(147,197,253,.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147,197,253,.055) 1px, transparent 1px);
          background-size: 14px 14px;
          mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
        }

        .clean-schematic__controls {
          position: relative;
          z-index: 7;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 8px 4px 5px;
          border: 1px solid rgba(147,197,253,.1);
          border-radius: 9px;
          background: linear-gradient(160deg, rgba(21,37,58,.84), rgba(4,10,17,.88));
          box-shadow: inset 0 1px rgba(255,255,255,.04);
        }

        .clean-schematic__signal {
          display: flex;
          gap: 4px;
        }

        .clean-schematic__signal i {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,.14);
        }

        .clean-schematic__signal i:first-child {
          background: #60a5fa;
          box-shadow: 0 0 6px rgba(96,165,250,.8);
          animation: clean-signal-pulse 1.8s ease-in-out infinite;
        }

        .clean-schematic__dial {
          position: relative;
          width: 32px;
          min-width: 32px;
          height: 32px;
          min-height: 32px;
          padding: 0;
          border: 1px solid rgba(191,219,254,.28);
          border-radius: 50%;
          background:
            radial-gradient(circle at 38% 34%, rgba(255,255,255,.16), transparent 24%),
            linear-gradient(145deg, #1c314b, #07111e);
          box-shadow:
            0 5px 10px rgba(0,0,0,.4),
            inset 0 1px rgba(255,255,255,.1),
            0 0 0 3px rgba(96,165,250,.035);
          cursor: pointer;
          transition: transform .45s cubic-bezier(.16,1,.3,1), border-color .2s ease, box-shadow .2s ease;
        }

        .clean-schematic__dial:hover {
          border-color: rgba(191,219,254,.65);
          box-shadow:
            0 5px 12px rgba(0,0,0,.45),
            inset 0 1px rgba(255,255,255,.14),
            0 0 14px rgba(59,130,246,.18);
        }

        .clean-schematic__dial i {
          position: absolute;
          top: 4px;
          left: 50%;
          width: 2px;
          height: 7px;
          border-radius: 2px;
          background: #bfdbfe;
          box-shadow: 0 0 5px rgba(96,165,250,.8);
          transform: translateX(-50%);
        }

        .clean-schematic__controls > span {
          color: rgba(255,255,255,.28);
          font-size: 5px;
          font-weight: 800;
          letter-spacing: .14em;
        }

        .clean-schematic__axis {
          position: absolute;
          z-index: 4;
          color: rgba(147,197,253,.35);
          font-size: 6px;
          font-weight: 800;
        }

        .clean-schematic__axis--x {
          right: 8px;
          bottom: 5px;
        }

        .clean-schematic__axis--y {
          left: 7px;
          top: 30px;
        }

        .clean-schematic__track {
          position: absolute;
          left: 11%;
          right: 9%;
          bottom: 18px;
          height: 1px;
          background: rgba(147,197,253,.24);
        }

        .clean-schematic__track i {
          position: absolute;
          top: 50%;
          width: 20px;
          height: 20px;
          border: 1px solid rgba(147,197,253,.28);
          border-radius: 5px;
          background: rgba(18,43,73,.9);
          box-shadow: 0 0 14px rgba(59,130,246,.08);
          transform: translate(-50%, -50%);
        }

        .clean-schematic__track i:nth-child(1) { left: 5%; }
        .clean-schematic__track i:nth-child(2) { left: 50%; }
        .clean-schematic__track i:nth-child(3) { left: 95%; }

        .clean-schematic__paper {
          position: absolute;
          z-index: 2;
          left: 50%;
          top: 32px;
          width: 74px;
          height: 31px;
          border: 1px solid rgba(219,234,254,.44);
          border-radius: 3px;
          background: linear-gradient(145deg, rgba(219,234,254,.13), rgba(96,165,250,.035));
          transform: translateX(-50%) perspective(100px) rotateX(7deg);
          box-shadow: 5px 5px 0 rgba(96,165,250,.045);
        }

        .clean-schematic__paper i {
          position: absolute;
          background: rgba(147,197,253,.25);
        }

        .clean-schematic__paper i:nth-child(1) {
          left: 24%;
          top: 0;
          bottom: 0;
          width: 1px;
        }

        .clean-schematic__paper i:nth-child(2) {
          right: 22%;
          top: 0;
          bottom: 0;
          width: 1px;
        }

        .clean-schematic__paper i:nth-child(3) {
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
        }

        .clean-schematic__blade {
          position: absolute;
          z-index: 3;
          left: 50%;
          top: 27px;
          width: 2px;
          height: 42px;
          background: #bfdbfe;
          box-shadow: 0 0 10px #3b82f6;
          animation: clean-blade-travel 3.2s cubic-bezier(.4,0,.2,1) infinite;
        }

        .clean-schematic__blade i {
          display: none;
        }

        .clean-schematic__pulse {
          position: absolute;
          z-index: 4;
          left: 10%;
          bottom: 15px;
          width: 7px;
          height: 7px;
          border: 1px solid #93c5fd;
          border-radius: 50%;
          background: #2563eb;
          box-shadow: 0 0 12px rgba(59,130,246,.85);
          animation: clean-flow-pulse 3.5s ease-in-out infinite;
        }

        /* Cutting line: three connected production stations. */
        .clean-schematic--1 .clean-schematic__paper,
        .clean-schematic--1 .clean-schematic__blade {
          display: none;
        }

        .clean-schematic--1 .clean-schematic__track i {
          animation: clean-station-live 3.5s ease-in-out infinite;
        }

        .clean-schematic--1 .clean-schematic__track i:nth-child(2) { animation-delay: .55s; }
        .clean-schematic--1 .clean-schematic__track i:nth-child(3) { animation-delay: 1.1s; }

        /* Programmable cutters: coordinate sheet and travelling blade. */
        .clean-schematic--2 .clean-schematic__track,
        .clean-schematic--2 .clean-schematic__pulse,
        .clean-schematic--3 .clean-schematic__track,
        .clean-schematic--3 .clean-schematic__pulse {
          display: none;
        }

        .clean-schematic--3 .clean-schematic__paper {
          width: 92px;
        }

        .clean-schematic--3 .clean-schematic__blade {
          animation-duration: 2.7s;
        }

        /* Three-knife trimmer: one top blade and two side blades. */
        .clean-schematic--4 .clean-schematic__track,
        .clean-schematic--4 .clean-schematic__pulse {
          display: none;
        }

        .clean-schematic--4 .clean-schematic__blade {
          left: 50%;
          top: 48px;
          width: 68px;
          height: 1px;
          animation: clean-trim-top 2.8s ease-in-out infinite;
        }

        .clean-schematic--4 .clean-schematic__blade i {
          position: absolute;
          top: -19px;
          display: block;
          width: 1px;
          height: 38px;
          background: #bfdbfe;
          box-shadow: 0 0 9px #3b82f6;
        }

        .clean-schematic--4 .clean-schematic__blade i:first-child { left: 8px; }
        .clean-schematic--4 .clean-schematic__blade i:nth-child(2) { right: 8px; }

        /* Pile turner: the sheet stack rotates through its handling cycle. */
        .clean-schematic--5 .clean-schematic__track,
        .clean-schematic--5 .clean-schematic__blade {
          display: none;
        }

        .clean-schematic--5 .clean-schematic__paper {
          height: 25px;
          border-width: 1px 3px 3px 1px;
          animation: clean-pile-turn 3.8s cubic-bezier(.65,0,.35,1) infinite;
        }

        .clean-schematic--5 .clean-schematic__pulse {
          left: calc(50% - 50px);
          bottom: 28px;
          animation: clean-pile-orbit 3.8s cubic-bezier(.65,0,.35,1) infinite;
        }

        .clean-system-card__specs {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0;
          margin: 18px 0;
          padding: 14px 0;
          border-top: 1px solid rgba(255,255,255,.08);
          border-bottom: 1px solid rgba(255,255,255,.08);
        }

        .clean-system-card__specs > div {
          position: relative;
          min-width: 0;
          padding: 0 12px;
        }

        .clean-system-card__specs > div + div {
          border-left: 1px solid rgba(255,255,255,.08);
        }

        .clean-system-card__specs > div:first-child { padding-left: 0; }
        .clean-system-card__specs > div:last-child  { padding-right: 0; }

        .clean-system-card__specs b {
          display: block;
          color: #7fb4ff;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: .18em;
          font-variant-numeric: tabular-nums;
        }

        .clean-system-card__specs span {
          display: block;
          margin-top: 6px;
          color: rgba(255,255,255,.78);
          font-size: 10.5px;
          font-weight: 500;
          line-height: 1.35;
        }

        .clean-system-card__actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .clean-system-card__download {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 14px;
          color: #dbeafe;
          border: 1px solid rgba(96,165,250,.26);
          border-radius: 999px;
          background: rgba(46,144,255,.1);
          font-size: 8.5px;
          font-weight: 750;
          letter-spacing: .1em;
          text-transform: uppercase;
          transition: color .2s ease, border-color .2s ease, background .2s ease, transform .25s cubic-bezier(.16,1,.3,1);
        }

        .clean-system-card__download:hover { transform: translateY(-2px); }

        .clean-system-card__download:hover {
          color: #fff;
          border-color: rgba(147,197,253,.42);
          background: rgba(37,99,235,.14);
        }

        .clean-selector {
          position: absolute;
          z-index: 8;
          left: 50%;
          bottom: 24px;
          display: flex;
          gap: 4px;
          padding: 5px;
          border: 1px solid rgba(255,255,255,.075);
          border-radius: 14px;
          background: rgba(3,7,12,.64);
          backdrop-filter: blur(18px);
          transform: translateX(-50%);
          box-shadow: 0 15px 34px rgba(0,0,0,.26);
        }

        .clean-selector button {
          position: relative;
          width: 102px;
          height: 42px;
          min-height: 42px;
          padding: 0 10px;
          color: rgba(255,255,255,.38);
          border: 0;
          border-radius: 9px;
          background: transparent;
          cursor: pointer;
          text-align: left;
          transition: color .22s ease, background .22s ease, transform .25s cubic-bezier(.16,1,.3,1);
        }

        .clean-selector button::after {
          content: '';
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 4px;
          height: 1px;
          border-radius: 1px;
          background: #60a5fa;
          box-shadow: 0 0 8px rgba(96,165,250,.7);
          transform: scaleX(0);
          transition: transform .24s ease;
        }

        .clean-selector button.is-active {
          color: #fff;
          background: rgba(59,130,246,.1);
        }

        .clean-selector button.is-active::after {
          transform: scaleX(1);
        }

        .clean-selector button span {
          display: block;
          color: #60a5fa;
          font-size: 7px;
          font-weight: 800;
          letter-spacing: .12em;
        }

        .clean-selector button p {
          margin-top: 3px;
          overflow: hidden;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .06em;
          text-overflow: ellipsis;
          text-transform: uppercase;
          white-space: nowrap;
        }

        @keyframes clean-machine-enter {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px) scale(.97);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%);
            filter: none;
          }
        }

        @keyframes clean-type-shimmer {
          0%, 27% { background-position: 120% center; }
          50%, 100% { background-position: -115% center; }
        }

        @keyframes clean-precision-depth {
          0%, 100% { transform: translateZ(-8px) scaleX(1.035) scaleY(.992); }
          50%      { transform: translateZ(12px) scaleX(1.052) scaleY(1.012); }
        }

        @keyframes clean-motion-drift {
          0%, 100% { transform: translateX(-.65%) translateZ(-3px) scaleX(.97); }
          50%      { transform: translateX(.65%) translateZ(7px) scaleX(.985); }
        }

        @keyframes clean-type-scan {
          0%, 8% {
            clip-path: inset(0 0 94% 0);
            opacity: 0;
          }
          14% { opacity: .75; }
          48% {
            clip-path: inset(92% 0 0 0);
            opacity: .42;
          }
          54%, 100% {
            clip-path: inset(100% 0 0 0);
            opacity: 0;
          }
        }

        @keyframes clean-signal-pulse {
          0%, 100% { opacity: .45; }
          50% { opacity: 1; }
        }

        @keyframes clean-machine-float {
          0%, 100% {
            transform:
              translate3d(var(--hero-shift-x), var(--hero-shift-y), 0)
              rotateX(var(--hero-rotate-x))
              rotateY(var(--hero-rotate-y));
          }
          50% {
            transform:
              translate3d(var(--hero-shift-x), calc(var(--hero-shift-y) - 8px), 14px)
              rotateX(var(--hero-rotate-x))
              rotateY(var(--hero-rotate-y));
          }
        }

        @keyframes clean-halo-breathe {
          0%, 100% {
            opacity: .72;
            transform: perspective(600px) rotateX(63deg) scale(.96);
          }
          50% {
            opacity: 1;
            transform: perspective(600px) rotateX(63deg) scale(1.035);
          }
        }

        @keyframes clean-machine-sweep {
          0%, 61% {
            opacity: 0;
            transform: translateX(-280%) skewX(-10deg);
          }
          70% { opacity: .85; }
          84% {
            opacity: 0;
            transform: translateX(280%) skewX(-10deg);
          }
          100% { opacity: 0; }
        }

        @keyframes clean-ambient-breathe {
          0%, 100% {
            opacity: .75;
            transform: translate(-50%, -50%) scale(.94);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.04);
          }
        }

        @keyframes clean-grid-drift {
          from {
            background-position: 0 0, 0 0;
            transform: perspective(650px) rotateX(64deg) translateY(0);
          }
          to {
            background-position: 0 48px, 68px 0;
            transform: perspective(650px) rotateX(64deg) translateY(4px);
          }
        }

        @keyframes clean-schematic-enter {
          from {
            opacity: 0;
            transform: translateY(7px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes clean-schematic-glint {
          0%, 62% { transform: translateX(-100%); }
          82%, 100% { transform: translateX(100%); }
        }

        @keyframes clean-blade-travel {
          0%, 16%, 100% { transform: translateX(-34px); opacity: .45; }
          50% { transform: translateX(32px); opacity: 1; }
          78% { transform: translateX(-34px); opacity: .7; }
        }

        @keyframes clean-flow-pulse {
          0% { left: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 88%; opacity: 0; }
        }

        @keyframes clean-station-live {
          0%, 22%, 100% {
            border-color: rgba(147,197,253,.24);
            box-shadow: 0 0 14px rgba(59,130,246,.05);
          }
          42% {
            border-color: rgba(191,219,254,.72);
            box-shadow: 0 0 18px rgba(59,130,246,.28);
          }
        }

        @keyframes clean-trim-top {
          0%, 20%, 100% { transform: translateY(-8px); opacity: .55; }
          48%, 68% { transform: translateY(3px); opacity: 1; }
        }

        @keyframes clean-pile-turn {
          0%, 18%, 100% {
            transform: translateX(-50%) perspective(100px) rotateX(7deg) rotateZ(0);
          }
          52%, 66% {
            transform: translateX(-50%) perspective(100px) rotateX(7deg) rotateZ(180deg);
          }
        }

        @keyframes clean-pile-orbit {
          0%, 18%, 100% { transform: translate(0, 0); }
          52%, 66% { transform: translate(94px, 0); }
        }

        @keyframes clean-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @media (hover: hover) and (pointer: fine) {
          .clean-hero:hover::after {
            opacity: 1;
          }

          .clean-hero:hover .clean-hero__grid {
            opacity: .25;
          }

          .clean-hero:hover .clean-headline span::after {
            transform: translateY(11px) scaleX(1.024);
            opacity: .94;
          }

          .clean-hero:hover .clean-headline span > b {
            transform:
              translate3d(0, calc(var(--letter-y) - 3px), calc(var(--letter-z) + 13px))
              rotateZ(var(--letter-r))
              rotateY(var(--letter-ry));
            filter:
              drop-shadow(0 1px 0 rgba(255,255,255,.3))
              drop-shadow(0 18px 20px rgba(0,0,0,.28))
              drop-shadow(0 0 8px rgba(147,197,253,.1));
          }

          .clean-hero:hover .clean-headline strong {
            -webkit-text-stroke-color: #fff;
            text-shadow:
              0 0 2px rgba(255,255,255,.48),
              0 16px 30px rgba(0,0,0,.58),
              0 0 28px rgba(96,165,250,.23);
          }

          .clean-hero:hover .clean-headline strong::after {
            transform: translate(7px, 12px) scaleX(.995);
            opacity: 1;
          }

          .clean-hero:hover .clean-headline strong > b {
            transform:
              translate3d(0, calc(var(--letter-y) + 2px), calc(var(--letter-z) + 9px))
              rotateZ(var(--letter-r))
              rotateY(var(--letter-ry));
            filter:
              drop-shadow(0 16px 20px rgba(0,0,0,.32))
              drop-shadow(0 0 10px rgba(96,165,250,.13));
          }

          .clean-selector button:not(.is-active):hover {
            color: rgba(255,255,255,.82);
            background: rgba(255,255,255,.045);
            transform: translateY(-3px);
          }

          .clean-selector button:not(.is-active):hover::after {
            transform: scaleX(.35);
          }

          .clean-intro a:hover svg,
          .clean-system-card__link:hover svg,
          .clean-system-card__download:hover svg {
            transform: translate(2px, -2px);
          }

          .clean-intro a svg,
          .clean-system-card__link svg,
          .clean-system-card__download svg {
            transition: transform .22s ease;
          }
        }

        @media (max-width: 1100px) {
          .clean-machine-stage { width: 70vw; }
          .clean-system-card { width: 330px; padding: 18px; }
          /* Below this the eyebrow clipped inside the panel, so it may wrap. */
          .clean-intro { width: 274px; }
          .clean-intro > span { white-space: normal; }
          .clean-selector button { width: 88px; }
        }

        @media (max-width: 820px) {
          .clean-hero {
            height: 810px;
            min-height: 810px;
          }

          .clean-hero__grid,
          .clean-hero__glow {
            animation: none;
          }

          .clean-machine-sweep {
            display: none;
          }

          .clean-hero__top {
            top: 94px;
            left: 20px;
            right: 20px;
          }

          .clean-sequence span,
          .clean-sequence > i {
            display: none;
          }

          .clean-sequence b {
            padding-left: 0;
            border-left: 0;
          }

          .clean-headline {
            top: max(14.5%, 132px);
          }

          .clean-headline span,
          .clean-headline strong {
            font-size: clamp(42px, 13vw, 100px);
          }

          .clean-headline span {
            font-size: clamp(46px, 13.6vw, 108px);
          }

          .clean-headline strong {
            margin-top: .1em;
            font-size: clamp(41px, 12.6vw, 96px);
            letter-spacing: .028em;
          }

          .clean-machine-stage {
            top: 32%;
            width: min(790px, 116vw);
            height: 44%;
          }

          .clean-machine--lane { width: 99%; }
          .clean-machine--115 { width: 72%; }
          .clean-machine--digital { width: 57%; }
          .clean-machine--trimmer { width: 82%; }
          .clean-machine--turner { width: 50%; }

          .clean-focus-frame {
            width: 76%;
            height: 58%;
          }

          .clean-focus-frame__status,
          .clean-focus-frame__system {
            display: none;
          }

          .clean-intro {
            display: none;
          }

          .clean-system-card {
            left: 16px;
            right: 16px;
            bottom: 78px;
            width: auto;
            padding: 15px;
          }

          .clean-system-card h2 {
            font-size: 23px;
          }

          .clean-system-card__specs {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .clean-schematic__canvas {
            height: 65px;
          }

          .clean-schematic__paper {
            top: 29px;
            height: 26px;
          }

          .clean-schematic__blade {
            top: 25px;
            height: 35px;
          }

          .clean-system-card__specs > div {
            min-width: 0;
          }

          .clean-system-card__specs span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .clean-selector {
            bottom: 16px;
            gap: 7px;
            padding: 7px 10px;
            border-radius: 999px;
          }

          .clean-selector button {
            width: 28px;
            min-width: 28px;
            height: 8px;
            min-height: 8px;
            padding: 0;
            border-radius: 999px;
            background: rgba(255,255,255,.13);
          }

          .clean-selector button span,
          .clean-selector button p,
          .clean-selector button::after {
            display: none;
          }

          .clean-selector button.is-active {
            width: 48px;
            background: #60a5fa;
            box-shadow: 0 0 10px rgba(96,165,250,.58);
          }
        }

        @media (max-width: 560px) {
          .clean-hero {
            height: 780px;
            min-height: 780px;
          }

          .clean-hero__top {
            top: 70px;
            left: 16px;
            right: 16px;
          }

          .clean-partnership img {
            width: 53px;
            height: 23px;
          }

          .clean-partnership > i {
            height: 23px;
          }

          .clean-partnership p {
            font-size: 6px;
          }

          .clean-partnership strong {
            font-size: 7px;
          }

          .clean-headline {
            top: max(11.5%, 104px);
          }

          .clean-headline span,
          .clean-headline strong {
            font-size: 14vw;
            line-height: .82;
          }

          .clean-headline span {
            font-size: 15vw;
          }

          .clean-headline strong {
            margin-top: .1em;
            font-size: 13.4vw;
            letter-spacing: .024em;
          }

          .clean-machine-stage {
            top: 31%;
            width: 122vw;
            height: 40%;
          }

          .clean-focus-frame {
            width: 72%;
            height: 55%;
          }

          .clean-focus-frame__scale {
            left: 22%;
            right: 22%;
            opacity: .24;
          }

          .clean-system-card {
            left: 12px;
            right: 12px;
            bottom: 70px;
          }

          .clean-system-card > span {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }

          .clean-system-card__specs {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .clean-schematic {
            margin-top: 11px;
          }

          .clean-schematic__controls {
            padding-inline: 3px;
          }

          .clean-system-card__specs > div {
            min-height: 52px;
            padding: 7px;
          }

          .clean-system-card__specs span {
            white-space: normal;
          }
        }

        @media (max-width: 360px) {
          .clean-hero {
            height: max(690px, calc(100svh - 58px));
            min-height: 690px;
          }

          .clean-hero__top {
            top: 62px;
            left: 12px;
            right: 12px;
          }

          .clean-headline {
            top: 11%;
          }

          .clean-headline strong {
            margin-top: .08em;
          }

          .clean-machine-stage {
            top: 30%;
            width: 120vw;
            height: 36%;
          }

          .clean-system-card {
            left: 10px;
            right: 10px;
            bottom: 58px;
            padding: 12px;
          }

          .clean-system-card h2 {
            font-size: 19px;
          }

          .clean-system-card__progress {
            margin: 9px 0 11px;
          }

          .clean-system-card__specs {
            margin: 10px 0 12px;
          }

          .clean-schematic__canvas {
            height: 54px;
          }

          .clean-schematic__paper {
            top: 26px;
            height: 21px;
          }

          .clean-schematic__blade {
            top: 23px;
            height: 29px;
          }

          .clean-schematic__axis {
            display: none;
          }

          .clean-system-card__link {
            font-size: 8px;
          }

          .clean-system-card__download {
            padding-inline: 7px;
            font-size: 6px;
          }

          .clean-selector {
            bottom: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .clean-machine-stage,
          .clean-machine,
          .clean-machine-halo,
          .clean-machine-sweep,
          .clean-schematic,
          .clean-schematic::after,
          .clean-schematic__track i,
          .clean-schematic__blade,
          .clean-schematic__pulse,
          .clean-schematic__paper,
          .clean-headline span,
          .clean-headline strong,
          .clean-headline span::before,
          .clean-headline strong::before,
          .clean-schematic__signal i,
          .clean-hero__glow,
          .clean-hero__grid {
            animation: none;
          }

          .clean-system-card__progress i {
            animation: none;
          }

          .clean-headline span {
            transform: scaleX(1.04);
          }

          .clean-headline strong {
            transform: scaleX(.98);
          }

          .clean-headline span > b,
          .clean-headline strong > b {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
