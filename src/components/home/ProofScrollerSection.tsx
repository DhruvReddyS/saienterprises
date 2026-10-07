import type { ReactNode } from 'react';
import { Gauge, Globe2, Headphones, MapPin } from 'lucide-react';
import largestSellingBadge from '@/assets/optimized/badge-largest.webp';
import badge24 from '@/assets/optimized/badge-24.webp';
import hpmLogo from '@/assets/optimized/hpm-logo.webp';
import BrandImage from '@/components/BrandImage';

const proofItems: { badge: ReactNode; title: string; subtitle: string; accent: string }[] = [
  {
    badge: <img src={badge24} alt="" loading="lazy" decoding="async" />,
    title: '24+ Years',
    subtitle: 'Industry experience',
    accent: '#2E90FF',
  },
  {
    badge: <Gauge size={20} />,
    title: '4000+ Machines',
    subtitle: 'Placed across markets',
    accent: '#60A5FA',
  },
  {
    badge: <Headphones size={20} />,
    title: '2000+ Clients',
    subtitle: 'Supported by Sai',
    accent: '#38BDF8',
  },
  {
    badge: <img src={largestSellingBadge} alt="" loading="lazy" decoding="async" />,
    title: 'India’s Largest',
    subtitle: 'Paper cutter distributor',
    accent: '#60A5FA',
  },
  {
    badge: <BrandImage src={hpmLogo} alt="HPM" />,
    title: 'HPM',
    subtitle: 'Sole agent in India',
    accent: '#2E90FF',
  },
  {
    badge: <Globe2 size={20} />,
    title: '15+ Countries',
    subtitle: 'Global client network',
    accent: '#38BDF8',
  },
  {
    badge: <MapPin size={20} />,
    title: 'Hyderabad',
    subtitle: 'India & East Africa',
    accent: '#7DD3FC',
  },
];

const ProofScrollerSection = () => (
  <section className="proof-conveyor" aria-label="Sai Enterprises achievements">
    <div className="proof-conveyor__edge" aria-hidden="true" />
    <div className="proof-conveyor__viewport">
      <div className="proof-conveyor__track">
        {[...proofItems, ...proofItems].map((item, index) => (
          <div className="proof-conveyor__card" key={`${item.title}-${index}`}>
            <span className="proof-conveyor__number">0{(index % proofItems.length) + 1}</span>
            <div
              className="proof-conveyor__badge"
              style={{ color: item.accent, background: `${item.accent}12`, boxShadow: `inset 0 0 0 1px ${item.accent}20` }}
            >
              {item.badge}
            </div>
            <div className="proof-conveyor__copy">
              <strong>{item.title}</strong>
              <span style={{ color: item.accent }}>{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      .proof-conveyor {
        position: relative;
        z-index: 12;
        height: 124px;
        overflow: hidden;
        background: linear-gradient(180deg, #080E18 0%, #05090F 100%);
        border-top: 1px solid rgba(255,255,255,.07);
        border-bottom: 1px solid rgba(255,255,255,.06);
      }
      .proof-conveyor::before {
        content: '';
        position: absolute;
        z-index: 4;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(90deg, #050a11 0%, transparent 7%, transparent 93%, #050a11 100%),
          linear-gradient(180deg, rgba(255,255,255,.025), transparent 30%);
      }
      .proof-conveyor__edge {
        position: absolute;
        z-index: 5;
        left: 0;
        right: 0;
        top: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(46,144,255,.55) 30%, rgba(27,214,242,.7) 50%, rgba(46,144,255,.55) 70%, transparent);
      }
      .proof-conveyor__viewport {
        height: 100%;
      }
      .proof-conveyor__track {
        display: flex;
        align-items: stretch;
        width: max-content;
        height: 100%;
        animation: proof-conveyor-move 52s linear infinite;
        will-change: transform;
        backface-visibility: hidden;
      }
      .proof-conveyor__card {
        position: relative;
        width: clamp(238px, 20vw, 300px);
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0 1.7rem;
        overflow: hidden;
        border-right: 1px solid rgba(255,255,255,.06);
        transition: background .3s ease;
      }
      .proof-conveyor__card:hover {
        background: linear-gradient(135deg, rgba(46,144,255,.14), rgba(255,255,255,.03));
      }
      .proof-conveyor__number {
        position: absolute;
        right: 14px;
        top: 12px;
        color: rgba(255,255,255,.1);
        font-size: .68rem;
        font-weight: 700;
        letter-spacing: .14em;
      }
      .proof-conveyor__badge {
        width: 44px;
        height: 44px;
        flex: 0 0 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 13px;
        box-shadow: 0 6px 16px rgba(2,6,14,.3), inset 0 1px 0 rgba(255,255,255,.08);
      }
      .proof-conveyor__badge img { width: 38px; height: 38px; object-fit: contain; }
      .proof-conveyor__badge img[alt="HPM"] { width: 40px; height: 24px; }
      .proof-conveyor__copy { display: flex; flex-direction: column; gap: .32rem; }
      .proof-conveyor__copy strong {
        font-family: var(--font-display);
        color: #fff;
        font-size: 1.12rem;
        font-weight: 600;
        letter-spacing: -.03em;
        white-space: nowrap;
      }
      .proof-conveyor__copy span {
        font-size: .56rem;
        font-weight: 500;
        letter-spacing: .16em;
        text-transform: uppercase;
        white-space: nowrap;
        opacity: .8;
      }
      @keyframes proof-conveyor-move { to { transform: translateX(-50%); } }
      @media (max-width: 600px) {
        .proof-conveyor { height: 112px; }
        .proof-conveyor__card { width: 230px; padding: 0 1.15rem; }
        .proof-conveyor__badge { width: 44px; height: 44px; flex-basis: 44px; }
        .proof-conveyor__badge img { width: 39px; height: 39px; }
        .proof-conveyor__copy strong { font-size: .88rem; }
      }
      @media (prefers-reduced-motion: reduce) {
        .proof-conveyor__track { animation-play-state: paused; }
      }
    `}</style>
  </section>
);

export default ProofScrollerSection;
