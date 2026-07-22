import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
} from 'lucide-react';
import hpmLane from '@/assets/machine_png/Sai & HPM/HPM Lane.png';
import hpm115 from '@/assets/machine_png/Sai & HPM/HPM 115.png';
import hpmDigital from '@/assets/machine_png/Sai & HPM/HPM Digital Paper Cutter.png';
import hpmThreeKnife from '@/assets/machine_png/Sai & HPM/Three Knife Trimmer.png';
import hpmPileTurner from '@/assets/machine_png/Sai & HPM/Pile Turner.png';
import hpmLogo from '@/assets/optimized/hpm-logo.webp';
import saiCmykMark from '@/assets/sai-logo-cmyk.png';
import BrandImage from '@/components/BrandImage';

type Machine = {
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  detail: string;
  scaleClass: string;
  specs: [string, string, string];
};

const machines: Machine[] = [
  {
    eyebrow: 'Automated cutting ecosystem',
    title: 'HPM Cutting Line',
    shortTitle: 'Cutting line',
    description: 'A connected handling and cutting workflow built for intelligent, high-output print floors.',
    image: hpmLane,
    detail: 'SYSTEM / 01',
    scaleClass: 'machine-visual--lane',
    specs: ['Automated handling', 'Modular workflow', 'High-output line'],
  },
  {
    eyebrow: 'Industrial programmable cutter',
    title: 'HPM 115 Series',
    shortTitle: '115 series',
    description: 'Heavy-duty programmable precision with an LCD touch panel and production-grade control.',
    image: hpm115,
    detail: 'SYSTEM / 02',
    scaleClass: 'machine-visual--115',
    specs: ['LCD touch panel', 'Hydraulic clamp', 'Siemens control'],
  },
  {
    eyebrow: 'Compact digital precision',
    title: 'HPM S66 Digital',
    shortTitle: 'S66 digital',
    description: 'A compact programmable paper cutter engineered for accurate everyday finishing work.',
    image: hpmDigital,
    detail: 'SYSTEM / 03',
    scaleClass: 'machine-visual--digital',
    specs: ['660 mm format', 'Programmable cut', 'Compact footprint'],
  },
  {
    eyebrow: 'Automated book-block finishing',
    title: 'HPM Three-Knife Trimmer',
    shortTitle: '3-knife trimmer',
    description: 'A production finishing system engineered to trim three book-block edges in one controlled cycle.',
    image: hpmThreeKnife,
    detail: 'SYSTEM / 04',
    scaleClass: 'machine-visual--trimmer',
    specs: ['Three-edge trimming', 'Automated trim cycle', 'Book-block production'],
  },
  {
    eyebrow: 'Intelligent material handling',
    title: 'HPM Pile Turner',
    shortTitle: 'Pile turner',
    description: 'Automated pile preparation engineered to aerate, align and turn production stacks efficiently.',
    image: hpmPileTurner,
    detail: 'SYSTEM / 05',
    scaleClass: 'machine-visual--turner',
    specs: ['Automated turning', 'Pile aeration', 'Stack alignment'],
  },
];

const HeroSection = () => {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % machines.length);
    }, 5400);
    return () => window.clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
        sectionRef.current?.style.setProperty('--scroll-shift', `${Math.max(0, -top) * 0.1}px`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const setMachine = (index: number) => {
    setActive((index + machines.length) % machines.length);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!sectionRef.current || window.innerWidth < 900) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    sectionRef.current.style.setProperty('--pointer-x', `${x * 100}%`);
    sectionRef.current.style.setProperty('--pointer-y', `${y * 100}%`);
    sectionRef.current.style.setProperty('--tilt-x', `${(x - 0.5) * 18}px`);
    sectionRef.current.style.setProperty('--tilt-y', `${(y - 0.5) * 10}px`);
    sectionRef.current.style.setProperty('--rotate-x', `${(0.5 - y) * 2.5}deg`);
    sectionRef.current.style.setProperty('--rotate-y', `${(x - 0.5) * 3.5}deg`);
  };

  const style = {
    '--pointer-x': '68%',
    '--pointer-y': '42%',
    '--tilt-x': '0px',
    '--tilt-y': '0px',
    '--rotate-x': '0deg',
    '--rotate-y': '0deg',
    '--scroll-shift': '0px',
  } as CSSProperties;

  const current = machines[active];

  return (
    <section
      ref={sectionRef}
      className={`kinetic-hero ${revealed ? 'is-ready' : ''}`}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        sectionRef.current?.style.setProperty('--tilt-x', '0px');
        sectionRef.current?.style.setProperty('--tilt-y', '0px');
        sectionRef.current?.style.setProperty('--rotate-x', '0deg');
        sectionRef.current?.style.setProperty('--rotate-y', '0deg');
      }}
    >
      <div className="hero-light" aria-hidden="true" />
      <div className="hero-floor-grid" aria-hidden="true" />
      <div className="cutting-scale" aria-label="Available HPM cutting widths">
        <small>HPM CUTTING WIDTHS</small>
        <span>660</span><i /><span>920</span><i /><span>1150</span><i /><span>1370</span><i /><span>1680</span><i /><span>1880</span><b>MM</b>
      </div>
      <div className="format-range" aria-label="HPM cutting range from 660 to 1880 millimetres">
        <div className="format-range__head">
          <span>HPM / cut width array</span>
          <b>08 formats</b>
        </div>
        <div className="format-range__readout">
          <strong><span>660</span><i>—</i><span>1880</span><b>mm</b></strong>
        </div>
        <div className="format-range__track" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, index) => <i key={index} />)}
          <em />
        </div>
        <div className="format-range__foot">
          <span>Compact</span><small>Programmed knife span</small><span>Industrial</span>
        </div>
      </div>

      <div className="kinetic-topline">
        <div className="kinetic-brand">
          <BrandImage src={hpmLogo} alt="HPM" />
          <span />
          <p>Exclusive Indian partner<br /><strong>Sai Enterprises</strong></p>
        </div>
        <div className="kinetic-live">
          <i />
          <span>Machine floor live</span>
          <b>HYD / IND</b>
        </div>
      </div>

      <div className="hero-statement" aria-label="Precision in motion">
        <span className="statement-row statement-row--solid"><b data-text="PRECISION">PRECISION</b></span>
        <span className="statement-row statement-row--motion">
          <em data-text="IN">IN</em>
          <span className="statement-axis" aria-hidden="true" />
          <b data-text="MOTION.">MOTION.</b>
        </span>
      </div>

      <div className="machine-scene">
        <div className="sai-folds" aria-hidden="true">
          <img src={saiCmykMark} alt="" />
          <span className="sai-folds__crease" />
          <i>SAI SIGNATURE / CMYK</i>
        </div>
        <div className="machine-aura" aria-hidden="true" />
        <div className="machine-core" aria-hidden="true"><i /><i /><span>ACTIVE HPM SYSTEM</span></div>
        <div className="machine-floor" aria-hidden="true" />
        <div className="machine-depth-plane machine-depth-plane--back" aria-hidden="true" />
        <div className="machine-depth-plane machine-depth-plane--mid" aria-hidden="true" />

        <div className="machine-visual-wrap" key={current.title}>
          <img
            className={`machine-blueprint ${current.scaleClass}`}
            src={current.image}
            alt=""
            aria-hidden="true"
          />
          <img
            className={`machine-visual ${current.scaleClass}`}
            src={current.image}
            alt={current.title}
            loading="eager"
            decoding="async"
          />
          <div className="machine-calibration" aria-hidden="true">
            <span>{current.detail} / calibrating</span>
            <div><i /><i /><i /></div>
            <b>Axis lock</b>
          </div>
        </div>
      </div>

      <div className="machine-console">
        <div className="terminal-screen">
          <div className="console-heading">
            <div className="console-blade" aria-hidden="true"><i /></div>
            <span>{current.detail}</span>
            <div className="console-progress"><i key={active} /></div>
            <b><i /> Live</b>
          </div>
          <div className="console-body">
            <div className="console-kicker"><p>{current.eyebrow}</p><Play size={10} fill="currentColor" /></div>
            <h2>{current.title}</h2>
            <span>{current.description}</span>
            <div className="console-specs">
              {current.specs.map((spec, index) => (
                <i key={spec}><b>0{index + 1}</b><em /><span>{spec}</span><small>●</small></i>
              ))}
            </div>
          </div>
          <div className="console-actions">
            <Link to="/machinery/post-press">Open machine profile <ArrowUpRight size={14} /></Link>
          </div>
        </div>
        <div className="terminal-controls">
          <span>Program<br />selector</span>
          <button className="console-dial" type="button" onClick={() => setMachine(active + 1)} aria-label="Select next HPM machine">
            <i /><b>0{active + 1}</b><small>SELECT</small>
          </button>
          <div className="cut-cycle" aria-hidden="true">
            <span>Cut cycle</span>
            <div><i /><i /><i /><i /></div>
          </div>
          <div className="terminal-nav">
            <button type="button" onClick={() => setMachine(active - 1)} aria-label="Previous HPM machine">
              <ChevronLeft size={16} />
            </button>
            <button type="button" onClick={() => setMachine(active + 1)} aria-label="Next HPM machine">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <i className="terminal-screw terminal-screw--one" aria-hidden="true" />
        <i className="terminal-screw terminal-screw--two" aria-hidden="true" />
        <i className="terminal-screw terminal-screw--three" aria-hidden="true" />
      </div>

      <div className="hero-intro-block">
        <span>Since 2000 / Hyderabad</span>
        <p>We don’t just supply machines.<br />We power print floors.</p>
        <Link to="/contact">Build your next production line <ArrowUpRight size={15} /></Link>
      </div>

      <div className="model-dock" role="tablist" aria-label="Choose an HPM system">
        {machines.map((machine, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === index}
            className={active === index ? 'is-active' : ''}
            onClick={() => setMachine(index)}
            key={machine.title}
          >
            <span>0{index + 1}</span>
            <img src={machine.image} alt="" />
            <p>{machine.shortTitle}</p>
          </button>
        ))}
        <Link to="/machinery" className="model-dock__all">
          <Maximize2 size={15} />
          <span>View all<br />machinery</span>
        </Link>
      </div>

      <style>{`
        .kinetic-hero {
          --blue: #3b82f6;
          position: relative;
          min-height: 850px;
          height: 100dvh;
          overflow: hidden;
          isolation: isolate;
          color: #fff;
          background:
            radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(37,99,235,.14), transparent 28%),
            linear-gradient(120deg, #03060a 0%, #08111d 54%, #04070c 100%);
        }
        .hero-light {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(255,255,255,.018), transparent 25%, transparent 75%, rgba(255,255,255,.012)),
            radial-gradient(ellipse at 50% 42%, rgba(59,130,246,.09), transparent 52%);
          pointer-events: none;
        }
        .hero-floor-grid {
          position: absolute;
          z-index: 0;
          left: -10%;
          right: -10%;
          bottom: -29%;
          height: 58%;
          background-image:
            linear-gradient(rgba(96,165,250,.065) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96,165,250,.065) 1px, transparent 1px);
          background-size: 70px 48px;
          transform: perspective(650px) rotateX(67deg) translateY(var(--scroll-shift));
          mask-image: linear-gradient(to bottom, transparent, #000 42%, transparent 88%);
          opacity: .42;
        }
        .cutting-scale {
          position: absolute;
          z-index: 2;
          left: 27%;
          right: 27%;
          bottom: 123px;
          height: 28px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          color: rgba(147,197,253,.22);
          border-bottom: 1px solid rgba(96,165,250,.11);
          font-size: .42rem;
          font-weight: 800;
          letter-spacing: .14em;
          pointer-events: none;
        }
        .cutting-scale > small {
          position: absolute;
          left: 0;
          bottom: 18px;
          color: rgba(147,197,253,.32);
          font-size: .42rem;
          white-space: nowrap;
        }
        .cutting-scale > b {
          color: rgba(147,197,253,.32);
          font-size: .4rem;
        }
        .cutting-scale i {
          width: 1px;
          height: 9px;
          background: rgba(96,165,250,.15);
          box-shadow: -10px 3px 0 -0.5px rgba(96,165,250,.09), 10px 3px 0 -0.5px rgba(96,165,250,.09);
        }
        .format-range {
          position: absolute;
          z-index: 11;
          top: 140px;
          right: clamp(4.5rem, 7vw, 7rem);
          width: 244px;
          padding: .72rem .82rem .68rem;
          overflow: hidden;
          border: 1px solid rgba(96,165,250,.2);
          border-top-color: rgba(147,197,253,.5);
          background:
            linear-gradient(135deg, rgba(22,41,67,.94), rgba(4,10,19,.92) 58%),
            rgba(4,9,16,.9);
          clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px));
          backdrop-filter: blur(22px);
          box-shadow: 0 22px 55px rgba(0,0,0,.36), inset 0 1px rgba(255,255,255,.07);
        }
        .format-range::after {
          content: '';
          position: relative;
          display: block;
          width: 62%;
          height: 1px;
          margin: .65rem 0 -.68rem auto;
          background: linear-gradient(90deg, transparent, #3b82f6);
          box-shadow: 0 0 14px rgba(59,130,246,.6);
        }
        .format-range__head,
        .format-range__foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-transform: uppercase;
        }
        .format-range__head span {
          color: #93c5fd;
          font-size: .42rem;
          font-weight: 800;
          letter-spacing: .15em;
        }
        .format-range__head b {
          color: rgba(255,255,255,.42);
          font-size: .39rem;
          letter-spacing: .1em;
        }
        .format-range__readout { margin: .48rem 0 .38rem; }
        .format-range__readout strong {
          display: flex;
          align-items: baseline;
          color: #fff;
          font-size: 1.38rem;
          line-height: 1;
          font-weight: 750;
          letter-spacing: -.065em;
          text-shadow: 0 8px 22px rgba(0,0,0,.4);
        }
        .format-range__readout strong i {
          margin: 0 .28rem;
          color: #3b82f6;
          font-style: normal;
          font-weight: 400;
        }
        .format-range__readout strong b {
          margin-left: .3rem;
          color: rgba(255,255,255,.48);
          font-size: .48rem;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .format-range__track {
          position: relative;
          height: 13px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid rgba(147,197,253,.22);
        }
        .format-range__track i { width: 1px; height: 6px; background: rgba(191,219,254,.5); }
        .format-range__track i:first-child,
        .format-range__track i:last-of-type { height: 10px; background: #93c5fd; }
        .format-range__track em {
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 56%;
          height: 2px;
          background: linear-gradient(90deg, #60a5fa, #2563eb);
          box-shadow: 0 0 10px rgba(59,130,246,.8);
          animation: range-scan 3.8s ease-in-out infinite alternate;
        }
        .format-range__foot { margin-top: .42rem; }
        .format-range__foot span { color: rgba(255,255,255,.42); font-size: .37rem; font-weight: 700; letter-spacing: .09em; }
        .format-range__foot small { color: rgba(147,197,253,.45); font-size: .34rem; letter-spacing: .06em; }
        .kinetic-topline {
          position: absolute;
          z-index: 10;
          left: clamp(1.5rem, 4.8vw, 5.5rem);
          right: clamp(1.5rem, 4.8vw, 5.5rem);
          top: 108px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          opacity: 0;
          transform: translateY(-10px);
          transition: .8s .1s cubic-bezier(.16,1,.3,1);
        }
        .is-ready .kinetic-topline { opacity: 1; transform: none; }
        .kinetic-brand { display: flex; align-items: center; gap: .8rem; }
        .kinetic-brand img { width: 68px; height: 26px; object-fit: contain; }
        .kinetic-brand > span { width: 1px; height: 28px; background: rgba(255,255,255,.16); }
        .kinetic-brand p {
          color: rgba(255,255,255,.35);
          font-size: .48rem;
          line-height: 1.45;
          letter-spacing: .13em;
          text-transform: uppercase;
        }
        .kinetic-brand strong { color: rgba(255,255,255,.75); font-size: .56rem; }
        .kinetic-live {
          display: flex;
          align-items: center;
          gap: .7rem;
          font-size: .5rem;
          font-weight: 750;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,255,255,.45);
        }
        .kinetic-live i { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 12px #22c55e; }
        .kinetic-live b { color: #93c5fd; padding-left: .7rem; border-left: 1px solid rgba(255,255,255,.12); }
        .hero-statement {
          position: absolute;
          z-index: auto;
          left: 0;
          right: 0;
          top: 18.5%;
          pointer-events: none;
          user-select: none;
        }
        .statement-row {
          display: block;
          overflow: hidden;
          padding: 0 clamp(1.5rem, 4.8vw, 5.5rem);
        }
        .statement-row b {
          display: block;
          font-family: 'Manrope', sans-serif !important;
          font-size: clamp(5.2rem, 11.9vw, 13rem);
          line-height: .8;
          letter-spacing: -.064em;
          font-weight: 800;
          white-space: nowrap;
          transform: translateY(112%);
          transition: transform 1.2s cubic-bezier(.16,1,.3,1);
        }
        .statement-row--solid b {
          position: relative;
          z-index: 2;
          color: #fff;
          -webkit-text-fill-color: #fff;
          background: none;
          text-shadow: 0 1px 0 rgba(255,255,255,.65);
          filter: drop-shadow(0 18px 18px rgba(0,0,0,.35));
        }
        .statement-row--solid b::before,
        .statement-row--solid b::after,
        .statement-row--motion b::before,
        .statement-row--motion b::after,
        .statement-row--motion em::before,
        .statement-row--motion em::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .statement-row--solid b::before {
          z-index: -2;
          color: rgba(4,12,24,.9);
          -webkit-text-stroke: 1px rgba(96,165,250,.16);
          transform: translate(4px, 6px);
          text-shadow: 5px 8px 20px rgba(0,0,0,.52);
        }
        .statement-row--solid b::after {
          display: none;
        }
        .statement-row--motion {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: start;
          gap: clamp(.65rem, 1.2vw, 1.25rem);
          padding-top: .08em;
        }
        .statement-axis {
          position: relative;
          z-index: 1;
          min-width: 0;
          height: 18px;
          margin: 0 clamp(.35rem, 1vw, 1rem);
          align-self: center;
          overflow: hidden;
          border-bottom: 1px solid rgba(147,197,253,.22);
          background: repeating-linear-gradient(90deg, rgba(147,197,253,.2) 0 1px, transparent 1px 42px) bottom / auto 7px no-repeat;
          transform: translateY(-.08em);
        }
        .statement-axis::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(96,165,250,.25) 18%, rgba(96,165,250,.25) 82%, transparent);
        }
        .statement-axis::after {
          content: '';
          position: absolute;
          left: -14%;
          bottom: -1px;
          width: 14%;
          height: 2px;
          background: #bfdbfe;
          box-shadow: 0 0 9px #60a5fa, 0 0 20px rgba(59,130,246,.65);
          animation: motion-rail 3.4s cubic-bezier(.55,0,.45,1) infinite;
        }
        .statement-row--motion em {
          position: relative;
          z-index: 2;
          display: block;
          color: rgba(255,255,255,.035);
          font-family: 'Manrope', sans-serif !important;
          -webkit-text-stroke: 1.8px rgba(255,255,255,.94);
          font-size: clamp(4rem, 8.8vw, 9.65rem);
          line-height: .8;
          font-style: normal;
          font-weight: 800;
          letter-spacing: -.052em;
          text-shadow: 0 0 18px rgba(255,255,255,.1), 0 0 42px rgba(59,130,246,.1);
          filter: drop-shadow(0 10px 14px rgba(0,0,0,.3));
          transform: translateY(115%);
          transition: transform 1.1s .16s cubic-bezier(.16,1,.3,1), text-shadow .45s ease, -webkit-text-stroke-color .45s ease;
        }
        .statement-row--motion em::before {
          z-index: -1;
          color: transparent;
          -webkit-text-stroke: 1.2px rgba(59,130,246,.38);
          transform: translate(3px, 4px);
        }
        .statement-row--motion em::after {
          z-index: 1;
          color: transparent;
          display: none;
        }
        .statement-row--motion b {
          position: relative;
          z-index: 2;
          font-size: clamp(4rem, 8.8vw, 9.65rem);
          color: rgba(255,255,255,.035);
          -webkit-text-stroke: 1.8px rgba(255,255,255,.94);
          letter-spacing: -.052em;
          line-height: .8;
          text-shadow: 0 0 18px rgba(255,255,255,.1), 0 0 42px rgba(59,130,246,.1);
          filter: drop-shadow(0 11px 15px rgba(0,0,0,.3));
          transition: transform 1.2s cubic-bezier(.16,1,.3,1), text-shadow .45s ease, -webkit-text-stroke-color .45s ease;
        }
        .kinetic-hero:hover .statement-row--motion em,
        .kinetic-hero:hover .statement-row--motion b {
          -webkit-text-stroke-color: #fff;
          text-shadow: 0 0 20px rgba(255,255,255,.13), 0 0 46px rgba(59,130,246,.18);
        }
        .kinetic-hero:hover .statement-axis { border-bottom-color: rgba(147,197,253,.38); }
        .statement-row--motion b::before {
          z-index: -1;
          color: transparent;
          -webkit-text-stroke: 1.2px rgba(59,130,246,.38);
          transform: translate(3px, 4px);
        }
        .statement-row--motion b::after {
          z-index: 1;
          color: transparent;
          display: none;
        }
        .is-ready .statement-row--solid b { transform: none; transition-delay: .1s; }
        .is-ready .statement-row--motion b { transform: none; transition-delay: .18s; }
        .is-ready .statement-row--motion em { transform: none; }
        .machine-scene {
          position: absolute;
          z-index: 5;
          width: min(72vw, 1120px);
          height: 64%;
          left: 49%;
          top: 19%;
          transform:
            perspective(1200px)
            translate3d(calc(-50% + var(--tilt-x)), var(--tilt-y), 0)
            rotateX(var(--rotate-x))
            rotateY(var(--rotate-y));
          transform-style: preserve-3d;
          transition: transform 1s cubic-bezier(.16,1,.3,1);
          pointer-events: none;
        }
        .sai-folds {
          position: absolute;
          z-index: 0;
          width: 70%;
          height: 66%;
          left: 15%;
          top: 5%;
          transform-style: preserve-3d;
          filter: drop-shadow(0 34px 50px rgba(0,0,0,.24));
        }
        .sai-folds img {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          inset: 0;
          object-fit: contain;
          transform: translateZ(-95px) scaleX(1.08) rotateX(5deg);
          mix-blend-mode: screen;
          opacity: .18;
          filter: saturate(.82) contrast(1.12);
        }
        .sai-folds__crease {
          position: absolute;
          left: 50%;
          top: 25%;
          width: 1px;
          height: 49%;
          background: linear-gradient(transparent, rgba(255,255,255,.32), transparent);
          transform: translateZ(-70px);
          box-shadow: 0 0 26px rgba(96,165,250,.28);
          opacity: .55;
        }
        .sai-folds i {
          position: absolute;
          left: 50%;
          bottom: 2%;
          transform: translateX(-50%) translateZ(-30px);
          color: rgba(255,255,255,.14);
          font-size: .5rem;
          font-style: normal;
          font-weight: 800;
          letter-spacing: .34em;
          white-space: nowrap;
        }
        .machine-aura {
          position: absolute;
          width: 70%;
          aspect-ratio: 1;
          left: 15%;
          top: -12%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,.18), rgba(37,99,235,.035) 48%, transparent 70%);
          filter: blur(16px);
        }
        .machine-core {
          position: absolute;
          z-index: 1;
          width: min(52%, 540px);
          aspect-ratio: 1;
          left: 50%;
          top: 1%;
          border: 1px solid rgba(96,165,250,.1);
          border-radius: 50%;
          transform: translateX(-50%) translateZ(-70px);
          box-shadow:
            0 0 0 34px rgba(59,130,246,.018),
            0 0 0 35px rgba(96,165,250,.04),
            inset 0 0 85px rgba(37,99,235,.06);
        }
        .machine-core::before,
        .machine-core::after {
          content: '';
          position: absolute;
          inset: 8%;
          border-radius: 50%;
          border-top: 1px solid rgba(147,197,253,.38);
          border-right: 1px solid transparent;
          border-bottom: 1px solid rgba(59,130,246,.08);
          border-left: 1px solid transparent;
          animation: core-orbit 16s linear infinite;
        }
        .machine-core::after { inset: 19%; animation-direction: reverse; animation-duration: 11s; opacity: .62; }
        .machine-core > i { position: absolute; background: linear-gradient(transparent, rgba(96,165,250,.22), transparent); }
        .machine-core > i:first-child { width: 1px; height: 124%; left: 50%; top: -12%; }
        .machine-core > i:nth-child(2) { width: 124%; height: 1px; left: -12%; top: 50%; }
        .machine-core > span {
          position: absolute;
          left: 50%;
          bottom: 8%;
          transform: translateX(-50%);
          color: rgba(147,197,253,.2);
          font-size: .38rem;
          font-weight: 800;
          letter-spacing: .22em;
          white-space: nowrap;
        }
        .machine-floor {
          position: absolute;
          width: 78%;
          height: 32%;
          left: 11%;
          bottom: 1%;
          border: 1px solid rgba(96,165,250,.17);
          border-radius: 50%;
          background:
            repeating-radial-gradient(ellipse, transparent 0 35px, rgba(96,165,250,.08) 36px 37px),
            radial-gradient(ellipse, rgba(37,99,235,.15), transparent 66%);
          transform: perspective(650px) rotateX(68deg);
          box-shadow: 0 0 70px rgba(37,99,235,.13);
        }
        .machine-depth-plane {
          position: absolute;
          left: 14%;
          right: 14%;
          bottom: 5%;
          height: 52%;
          border: 1px solid rgba(96,165,250,.08);
          background: linear-gradient(135deg, rgba(59,130,246,.025), rgba(255,255,255,.012));
          transform-style: preserve-3d;
        }
        .machine-depth-plane--back {
          transform: translateZ(-90px) translateY(-18px);
          opacity: .38;
        }
        .machine-depth-plane--mid {
          transform: translateZ(-45px) translateY(-9px);
          opacity: .55;
        }
        .machine-visual-wrap {
          position: absolute;
          z-index: 3;
          inset: 0;
          transform: translateZ(55px);
          transform-style: preserve-3d;
          animation: machine-enter .9s cubic-bezier(.16,1,.3,1) both;
        }
        .machine-visual {
          position: absolute;
          max-width: none;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 42px 48px rgba(0,0,0,.7)) drop-shadow(0 0 24px rgba(59,130,246,.11));
          transform: translateX(-50%);
        }
        .machine-blueprint {
          position: absolute;
          z-index: -1;
          max-width: none;
          height: auto;
          object-fit: contain;
          opacity: .09;
          filter: brightness(0) saturate(100%) invert(48%) sepia(97%) saturate(1700%) hue-rotate(199deg) brightness(102%);
          transform: translate3d(calc(-50% - 22px),-18px,-60px) scale(1.035);
          mix-blend-mode: screen;
        }
        .machine-calibration {
          position: absolute;
          z-index: 5;
          inset: 8% 8% 4%;
          overflow: hidden;
          border-top: 1px solid rgba(147,197,253,.32);
          border-bottom: 1px solid rgba(59,130,246,.12);
          color: #93c5fd;
          opacity: 0;
          animation: calibration-shell 1.35s cubic-bezier(.16,1,.3,1) both;
          pointer-events: none;
        }
        .machine-calibration::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: -9%;
          width: 2px;
          background: #bfdbfe;
          box-shadow: 0 0 12px #60a5fa, 0 0 34px rgba(59,130,246,.82), 22px 0 44px rgba(59,130,246,.12);
          animation: blade-scan 1.05s .08s cubic-bezier(.55,0,.25,1) both;
        }
        .machine-calibration::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(96,165,250,.24) 1px, transparent 1px),
            linear-gradient(rgba(96,165,250,.16) 1px, transparent 1px);
          background-size: 25% 100%, 100% 25%;
          mask-image: radial-gradient(circle, #000, transparent 72%);
          opacity: .22;
        }
        .machine-calibration > span,
        .machine-calibration > b {
          position: absolute;
          z-index: 2;
          top: .5rem;
          font-size: .38rem;
          font-weight: 800;
          letter-spacing: .15em;
          text-transform: uppercase;
        }
        .machine-calibration > span { left: .55rem; }
        .machine-calibration > b { right: .55rem; color: rgba(255,255,255,.62); }
        .machine-calibration > div {
          position: absolute;
          z-index: 2;
          left: 50%;
          bottom: .55rem;
          display: flex;
          gap: 4px;
          transform: translateX(-50%);
        }
        .machine-calibration > div i { width: 18px; height: 2px; background: rgba(96,165,250,.18); animation: calibration-bars .65s ease-in-out infinite alternate; }
        .machine-calibration > div i:nth-child(2) { animation-delay: .12s; }
        .machine-calibration > div i:nth-child(3) { animation-delay: .24s; }
        .machine-visual--lane { width: 90%; left: 56%; bottom: 0; }
        .machine-visual--115 { width: 68%; left: 50%; bottom: 0; }
        .machine-visual--digital { width: 55%; left: 50%; bottom: -2%; }
        .machine-visual--trimmer { width: 72%; left: 50%; bottom: 0; }
        .machine-visual--turner { width: 46%; left: 50%; bottom: 0; }
        .machine-console {
          position: absolute;
          z-index: 12;
          right: clamp(4.5rem, 7vw, 7rem);
          top: 52.5%;
          width: min(29vw, 414px);
          padding: 8px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 78px;
          gap: 7px;
          background:
            linear-gradient(145deg, rgba(145,163,184,.36), rgba(23,37,56,.88) 20%, rgba(5,11,19,.98) 72%),
            #09121e;
          border: 1px solid rgba(191,219,254,.27);
          border-left-color: rgba(255,255,255,.5);
          clip-path: polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 20px 100%, 0 calc(100% - 20px));
          box-shadow:
            0 38px 90px rgba(0,0,0,.52),
            12px 18px 0 -8px rgba(2,7,13,.72),
            inset 0 1px rgba(255,255,255,.2),
            inset 9px 0 22px rgba(255,255,255,.025);
          opacity: 0;
          transform: perspective(900px) translateX(26px) rotateY(-3deg);
          transform-origin: right center;
          transition: .8s .55s cubic-bezier(.16,1,.3,1);
        }
        .machine-console::before {
          content: '';
          position: absolute;
          z-index: 2;
          left: 8px;
          top: 0;
          width: 52%;
          height: 2px;
          background: linear-gradient(90deg, #dbeafe, #3b82f6 62%, transparent);
          box-shadow: 0 0 17px rgba(59,130,246,.7);
        }
        .machine-console::after {
          content: '';
          position: absolute;
          z-index: -1;
          inset: -7px 11px 7px -7px;
          border: 1px solid rgba(59,130,246,.12);
          clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%);
          pointer-events: none;
        }
        .is-ready .machine-console { opacity: 1; transform: perspective(900px) rotateY(-3deg); }
        .terminal-screen {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(96,165,250,.22);
          background:
            linear-gradient(rgba(96,165,250,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96,165,250,.018) 1px, transparent 1px),
            linear-gradient(145deg, rgba(8,23,40,.98), rgba(2,7,13,.98));
          background-size: 14px 14px, 14px 14px, auto;
          box-shadow: inset 0 0 28px rgba(0,0,0,.6), 0 0 0 2px rgba(0,0,0,.42);
        }
        .terminal-screen::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,.035) 42%, transparent 58%);
          transform: translateX(-120%);
          animation: lcd-sheen 5.4s 1.4s ease-in-out infinite;
          pointer-events: none;
        }
        .console-heading {
          height: 39px;
          padding: 0 .65rem;
          display: grid;
          grid-template-columns: 22px auto 1fr auto;
          align-items: center;
          gap: .52rem;
          color: #60a5fa;
          border-bottom: 1px solid rgba(255,255,255,.08);
          font-size: .46rem;
          font-weight: 800;
          letter-spacing: .12em;
        }
        .console-blade {
          position: relative;
          width: 20px;
          height: 20px;
          border: 1px solid rgba(96,165,250,.22);
          background: rgba(59,130,246,.05);
        }
        .console-blade::before,
        .console-blade::after { content: ''; position: absolute; background: rgba(147,197,253,.48); }
        .console-blade::before { width: 12px; height: 1px; left: 4px; top: 6px; transform: rotate(-18deg); }
        .console-blade::after { width: 1px; height: 12px; left: 10px; top: 5px; }
        .console-blade i { position: absolute; width: 4px; height: 4px; right: 2px; bottom: 2px; background: #3b82f6; box-shadow: 0 0 7px #3b82f6; animation: status-pulse 1.5s ease-in-out infinite; }
        .console-progress { height: 1px; background: rgba(255,255,255,.1); overflow: hidden; }
        .console-progress i { display: block; height: 100%; background: #3b82f6; animation: console-progress 5.4s linear both; }
        .console-heading > b { display: flex; align-items: center; gap: .32rem; color: rgba(255,255,255,.58); font-size: .41rem; letter-spacing: .08em; text-transform: uppercase; }
        .console-heading > b i { width: 5px; height: 5px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e; }
        .console-body { position: relative; padding: .82rem .78rem .72rem; }
        .console-body::before {
          content: '';
          position: absolute;
          left: 0;
          top: 1rem;
          width: 2px;
          height: 64px;
          background: linear-gradient(#3b82f6, transparent);
        }
        .console-kicker { display: flex; align-items: center; justify-content: space-between; color: #60a5fa; }
        .console-kicker p { font-size: .47rem; font-weight: 800; letter-spacing: .105em; text-transform: uppercase; }
        .console-kicker p,
        .console-heading > span { transition: color .3s ease, text-shadow .3s ease; }
        .machine-console:hover .console-kicker p,
        .machine-console:hover .console-heading > span { color: #bfdbfe; text-shadow: 0 0 12px rgba(96,165,250,.5); }
        .console-kicker svg { opacity: .7; }
        .console-body h2 {
          margin: .45rem 0 .48rem;
          font-size: clamp(1.12rem, 1.65vw, 1.58rem);
          letter-spacing: -.055em;
          text-shadow: 0 10px 26px rgba(0,0,0,.34);
          transition: transform .4s cubic-bezier(.16,1,.3,1), letter-spacing .4s ease;
        }
        .machine-console:hover .console-body h2 {
          color: transparent;
          background: linear-gradient(90deg, #fff 0%, #fff 34%, #93c5fd 50%, #fff 66%, #fff 100%);
          background-size: 220% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          transform: translateX(4px);
          letter-spacing: -.045em;
          animation: terminal-title-scan 1.65s linear infinite;
        }
        .console-body > span { display: block; color: rgba(255,255,255,.54); font-size: .64rem; line-height: 1.5; }
        .console-specs {
          display: flex;
          flex-direction: column;
          gap: .25rem;
          margin-top: .7rem;
        }
        .console-specs i {
          position: relative;
          height: 22px;
          padding: 0 .34rem;
          display: grid;
          grid-template-columns: 20px 1fr auto 8px;
          align-items: center;
          gap: .35rem;
          color: rgba(191,219,254,.74);
          border-left: 1px solid rgba(96,165,250,.4);
          background: linear-gradient(90deg, rgba(59,130,246,.11), rgba(59,130,246,.015));
          font-style: normal;
          font-weight: 700;
          letter-spacing: .045em;
          text-transform: uppercase;
          transition: .25s ease;
        }
        .console-specs i:hover { color: #fff; background: linear-gradient(90deg, rgba(59,130,246,.23), rgba(59,130,246,.03)); transform: translateX(3px); }
        .console-specs i b { color: #3b82f6; font-size: .34rem; letter-spacing: .12em; }
        .console-specs i span { font-size: .41rem; line-height: 1.2; letter-spacing: .025em; }
        .console-specs i em { height: 1px; background: linear-gradient(90deg, rgba(96,165,250,.45), transparent); }
        .console-specs i small { color: #22c55e; font-size: .32rem; text-shadow: 0 0 6px #22c55e; }
        .console-actions {
          min-height: 38px;
          padding: 0 .78rem;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.015);
        }
        .console-actions > a {
          display: flex;
          align-items: center;
          gap: .4rem;
          color: #bfdbfe;
          font-size: .52rem;
          font-weight: 750;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .terminal-controls {
          position: relative;
          padding: .6rem .4rem .48rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(165deg, rgba(47,65,87,.72), rgba(7,14,24,.95) 52%);
          border: 1px solid rgba(255,255,255,.1);
          box-shadow: inset 1px 1px rgba(255,255,255,.08), inset -5px -8px 18px rgba(0,0,0,.3);
        }
        .terminal-controls > span { color: rgba(255,255,255,.34); font-size: .35rem; font-weight: 800; line-height: 1.35; letter-spacing: .12em; text-align: center; text-transform: uppercase; }
        .console-dial {
          position: relative;
          width: 54px;
          height: 54px;
          margin: .7rem 0 .55rem;
          display: grid;
          place-items: center;
          color: #fff;
          border: 1px solid rgba(191,219,254,.36);
          border-radius: 50%;
          background:
            repeating-conic-gradient(from -3deg, rgba(191,219,254,.5) 0 1deg, transparent 1deg 15deg),
            radial-gradient(circle at 38% 32%, #344861, #0a1524 55%, #02060b 70%);
          box-shadow: 0 8px 15px rgba(0,0,0,.45), inset 0 1px rgba(255,255,255,.2), 0 0 0 4px rgba(0,0,0,.2);
          cursor: pointer;
          transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease;
        }
        .console-dial:hover { transform: rotate(18deg) scale(1.05); box-shadow: 0 10px 22px rgba(0,0,0,.5), 0 0 22px rgba(59,130,246,.18), inset 0 1px rgba(255,255,255,.25); }
        .console-dial > i { position: absolute; top: 4px; width: 2px; height: 10px; background: #60a5fa; box-shadow: 0 0 7px #3b82f6; }
        .console-dial b { font-size: .72rem; }
        .console-dial small { position: absolute; bottom: -14px; color: #60a5fa; font-size: .28rem; font-weight: 800; letter-spacing: .12em; }
        .cut-cycle { width: 100%; margin-top: .65rem; }
        .cut-cycle > span { display: block; margin-bottom: .28rem; color: rgba(255,255,255,.3); font-size: .31rem; font-weight: 800; letter-spacing: .1em; text-align: center; text-transform: uppercase; }
        .cut-cycle > div { display: flex; justify-content: center; gap: 3px; }
        .cut-cycle i { width: 7px; height: 3px; background: rgba(96,165,250,.18); animation: cut-cycle 1.2s ease-in-out infinite; }
        .cut-cycle i:nth-child(2) { animation-delay: .15s; }
        .cut-cycle i:nth-child(3) { animation-delay: .3s; }
        .cut-cycle i:nth-child(4) { animation-delay: .45s; }
        .terminal-nav { display: flex; width: calc(100% + .8rem); margin-top: auto; border-top: 1px solid rgba(255,255,255,.08); }
        .terminal-nav button { flex: 1; height: 32px; display: grid; place-items: center; color: rgba(255,255,255,.48); border: 0; background: transparent; cursor: pointer; }
        .terminal-nav button + button { border-left: 1px solid rgba(255,255,255,.08); }
        .terminal-nav button:hover { color: #fff; background: #2563eb; }
        .terminal-screw { position: absolute; z-index: 3; width: 4px; height: 4px; border-radius: 50%; background: #9cacbd; box-shadow: inset 1px 1px rgba(255,255,255,.5), 0 1px 2px #000; }
        .terminal-screw--one { left: 2px; top: 8px; }
        .terminal-screw--two { right: 8px; top: 29px; }
        .terminal-screw--three { left: 9px; bottom: 5px; }
        @keyframes lcd-sheen { 0%, 55% { transform: translateX(-120%); } 80%, 100% { transform: translateX(120%); } }
        @keyframes status-pulse { 50% { opacity: .35; } }
        @keyframes cut-cycle { 0%, 100% { background: rgba(96,165,250,.16); } 45% { background: #60a5fa; box-shadow: 0 0 8px #3b82f6; } }
        @keyframes terminal-title-scan { from { background-position: 110% 0; } to { background-position: -110% 0; } }
        @keyframes range-scan { from { width: 18%; } to { width: 100%; } }
        .hero-intro-block {
          position: absolute;
          z-index: 11;
          left: clamp(1.5rem, 4.8vw, 5.5rem);
          bottom: 52px;
          opacity: 0;
          transform: translateY(15px);
          transition: .8s .62s cubic-bezier(.16,1,.3,1);
        }
        .is-ready .hero-intro-block { opacity: 1; transform: none; }
        .hero-intro-block > span {
          color: #60a5fa;
          font-size: .48rem;
          font-weight: 800;
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .hero-intro-block p {
          margin: .5rem 0 .7rem;
          color: rgba(255,255,255,.76);
          font-size: clamp(.85rem, 1vw, 1rem);
          line-height: 1.45;
          font-weight: 600;
        }
        .hero-intro-block a {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          min-height: 38px;
          color: #fff;
          border-bottom: 1px solid rgba(96,165,250,.45);
          font-size: .57rem;
          font-weight: 750;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .hero-intro-block a:hover { color: #93c5fd; }
        .model-dock {
          position: absolute;
          z-index: 13;
          left: 50%;
          bottom: 24px;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px;
          transform: perspective(800px) translateX(-50%) rotateX(3deg);
          transform-origin: bottom center;
          border: 1px solid rgba(147,197,253,.13);
          border-radius: 22px;
          background: linear-gradient(145deg, rgba(17,28,44,.9), rgba(3,8,15,.88));
          backdrop-filter: blur(22px);
          box-shadow:
            0 24px 55px rgba(0,0,0,.38),
            inset 0 1px rgba(255,255,255,.06),
            inset 0 -8px 18px rgba(0,0,0,.18);
          opacity: 0;
          transition: opacity .7s .75s ease;
        }
        .is-ready .model-dock { opacity: 1; }
        .model-dock button {
          position: relative;
          width: 128px;
          height: 58px;
          overflow: hidden;
          color: rgba(255,255,255,.42);
          border: 0;
          border-radius: 15px;
          background: transparent;
          cursor: pointer;
          box-shadow: inset 0 0 0 1px transparent;
        }
        .model-dock button::after {
          content: '';
          position: absolute;
          left: 8px;
          top: 12px;
          bottom: 12px;
          width: 2px;
          border-radius: 2px;
          background: linear-gradient(#93c5fd, #2563eb);
          box-shadow: 0 0 12px #3b82f6;
          transform: scaleY(0);
          transition: transform .35s ease;
        }
        .model-dock button::before {
          content: '';
          position: absolute;
          z-index: 3;
          left: 13px;
          right: 13px;
          bottom: 5px;
          height: 1px;
          background: linear-gradient(90deg, #60a5fa, #dbeafe);
          box-shadow: 0 0 8px rgba(96,165,250,.7);
          transform: scaleX(0);
          transform-origin: left;
          opacity: 0;
        }
        .model-dock button:hover { color: rgba(255,255,255,.8); background: rgba(255,255,255,.035); }
        .model-dock button.is-active {
          color: #fff;
          background: linear-gradient(135deg, rgba(59,130,246,.2), rgba(59,130,246,.07));
          box-shadow: inset 0 0 0 1px rgba(96,165,250,.15), 0 8px 20px rgba(0,0,0,.14);
        }
        .model-dock button.is-active::after { transform: scaleY(1); }
        .model-dock button.is-active::before { opacity: 1; animation: dock-cycle 5.4s linear forwards; }
        .model-dock button > span {
          position: absolute;
          top: 9px;
          right: 9px;
          z-index: 2;
          font-size: .42rem;
          font-weight: 800;
          letter-spacing: .12em;
          opacity: .5;
        }
        .model-dock button img {
          position: absolute;
          width: 60px;
          height: 48px;
          left: 8px;
          top: 5px;
          object-fit: contain;
          filter: grayscale(1);
          opacity: .32;
          transition: .35s ease;
        }
        .model-dock button:hover img,
        .model-dock button.is-active img { filter: none; opacity: .92; transform: scale(1.06) translateX(2px); }
        .model-dock button p {
          position: absolute;
          left: 66px;
          bottom: 11px;
          font-size: .44rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .model-dock__all {
          width: 86px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .55rem;
          color: #93c5fd;
          border-radius: 15px;
          background: rgba(59,130,246,.075);
          font-size: .47rem;
          font-weight: 750;
          line-height: 1.4;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .model-dock__all:hover { background: #3b82f6; color: #fff; transform: translateY(-2px); }
        @keyframes machine-enter {
          from { opacity: 0; transform: translateZ(55px) translateY(26px) scale(.96); filter: blur(8px); }
          to { opacity: 1; transform: translateZ(55px); filter: none; }
        }
        @keyframes console-progress { from { width: 0; } to { width: 100%; } }
        @keyframes dock-cycle { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes core-orbit { to { transform: rotate(360deg); } }
        @keyframes motion-edge { from { transform: translateX(1px); opacity: .55; } to { transform: translateX(5px); opacity: 1; } }
        @keyframes motion-rail { 0% { left: -14%; opacity: 0; } 12%, 88% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
        @keyframes calibration-shell { 0% { opacity: 0; transform: scale(.96); } 14%, 72% { opacity: 1; transform: none; } 100% { opacity: 0; transform: scale(1.015); } }
        @keyframes blade-scan { from { left: -9%; opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } to { left: 109%; opacity: 0; } }
        @keyframes calibration-bars { to { background: #60a5fa; box-shadow: 0 0 8px #3b82f6; } }

        @media (max-width: 1100px) {
          .hero-statement { top: 21%; }
          .statement-row b { font-size: 12vw; }
          .machine-scene { width: 78vw; left: 48%; }
          .machine-console { width: 320px; }
          .model-dock { left: 53%; }
          .model-dock button { width: 95px; }
          .model-dock__all { width: 85px; }
          .format-range { display: none; }
        }
        @media (max-width: 820px) {
          .kinetic-hero { height: auto; min-height: 880px; }
          .kinetic-topline { top: 92px; left: 1.3rem; right: 1.3rem; }
          .kinetic-live { display: none; }
          .hero-statement { top: 18%; }
          .statement-row { padding: 0 1.3rem; }
          .statement-row b { font-size: 15vw; line-height: .78; }
          .statement-row--motion { display: flex; justify-content: space-between; }
          .statement-axis { display: none; }
          .machine-scene { width: 112vw; height: 49%; left: 49%; top: 25%; }
          .machine-visual--lane { width: 100%; left: 54%; bottom: 7%; }
          .machine-visual--115 { width: 78%; left: 50%; bottom: 7%; }
          .machine-visual--digital { width: 61%; left: 50%; bottom: 7%; }
          .machine-visual--trimmer { width: 82%; left: 50%; bottom: 7%; }
          .machine-visual--turner { width: 54%; left: 50%; bottom: 7%; }
          .machine-console { top: 55%; right: 1.2rem; width: 310px; }
          .hero-intro-block { left: 1.3rem; bottom: 116px; }
          .model-dock { left: 1.3rem; right: 1.3rem; bottom: 20px; transform: none; }
          .model-dock button { flex: 1; width: auto; }
          .model-dock__all { width: 90px; }
        }
        @media (max-width: 560px) {
          .kinetic-hero { min-height: 880px; }
          .kinetic-topline { top: 72px; left: 1rem; }
          .kinetic-brand img { width: 52px; }
          .kinetic-brand p { font-size: .4rem; }
          .kinetic-brand strong { font-size: .48rem; }
          .hero-statement { top: 15.5%; }
          .statement-row { padding: 0 1rem; }
          .statement-row b { font-size: 17.2vw; line-height: .8; -webkit-text-stroke-width: 1px; }
          .statement-row--motion { gap: .6rem; }
          .statement-row--motion b { font-size: 15vw; }
          .statement-row--motion em {
            min-width: 0;
            height: auto;
            font-size: 15vw;
            line-height: .8;
          }
          .cutting-scale { display: none; }
          .sai-folds { width: 92%; left: 4%; opacity: .78; }
          .machine-scene { width: 128vw; height: 42%; top: 24%; }
          .machine-visual--lane { width: 108%; left: 53%; bottom: 5%; }
          .machine-visual--115 { width: 83%; left: 50%; bottom: 5%; }
          .machine-visual--digital { width: 66%; left: 50%; bottom: 5%; }
          .machine-visual--trimmer { width: 90%; left: 50%; bottom: 6%; }
          .machine-visual--turner { width: 58%; left: 50%; bottom: 6%; }
          .machine-floor { bottom: 2%; }
          .machine-console { top: 48%; right: .55rem; width: 302px; grid-template-columns: minmax(0, 1fr) 64px; padding: 6px; gap: 5px; }
          .console-body { padding: .68rem; }
          .console-body h2 { font-size: 1.08rem; margin: .4rem 0; }
          .console-body > span { font-size: .58rem; line-height: 1.45; }
          .console-specs { margin-top: .55rem; gap: .25rem; }
          .console-specs i { padding: 0 .26rem; }
          .console-actions { min-height: 40px; padding-left: .75rem; }
          .console-dial { width: 46px; height: 46px; }
          .terminal-controls { padding-left: .25rem; padding-right: .25rem; }
          .hero-intro-block { display: none; }
          .hero-intro-block p { font-size: .78rem; }
          .hero-intro-block a { font-size: .49rem; }
          .model-dock { left: .75rem; right: 4.25rem; bottom: 95px; }
          .model-dock button { height: 68px; }
          .model-dock button img { width: 90%; height: 44px; left: 5%; }
          .model-dock button p { display: none; }
          .model-dock button > span { top: 7px; right: 7px; }
          .model-dock__all { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .console-progress i { animation: none !important; }
          .machine-scene { transform: perspective(1200px) translateX(-50%) !important; }
          .machine-calibration { display: none; }
          .machine-core::before,
          .machine-core::after,
          .statement-row--motion em::after,
          .statement-row--motion b::after,
          .statement-axis::after { animation: none !important; }
          .model-dock button::before { display: none; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
