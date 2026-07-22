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
    accent: '#3B82F6',
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
    accent: '#FACC15',
  },
  {
    badge: <BrandImage src={hpmLogo} alt="HPM" />,
    title: 'HPM',
    subtitle: 'Sole agent in India',
    accent: '#EF4444',
  },
  {
    badge: <Globe2 size={20} />,
    title: '15+ Countries',
    subtitle: 'Global client network',
    accent: '#22C55E',
  },
  {
    badge: <MapPin size={20} />,
    title: 'Hyderabad',
    subtitle: 'India & East Africa',
    accent: '#A78BFA',
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
        height: 142px;
        overflow: hidden;
        perspective: 900px;
        background: linear-gradient(180deg, #070d16 0%, #04080e 72%);
        border-top: 1px solid rgba(147,197,253,.16);
        border-bottom: 1px solid rgba(255,255,255,.07);
        box-shadow: 0 -26px 70px rgba(0,0,0,.34), 0 30px 65px rgba(0,0,0,.24);
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
        height: 4px;
        background: linear-gradient(90deg, transparent, rgba(59,130,246,.7) 35%, rgba(147,197,253,.9) 50%, rgba(59,130,246,.7) 65%, transparent);
        box-shadow: 0 2px 18px rgba(59,130,246,.25);
        opacity: .7;
      }
      .proof-conveyor__viewport {
        height: 100%;
        transform: rotateX(2.5deg);
        transform-origin: top center;
      }
      .proof-conveyor__track {
        display: flex;
        align-items: stretch;
        width: max-content;
        height: 100%;
        animation: proof-conveyor-move 44s linear infinite;
        will-change: transform;
      }
      .proof-conveyor__card {
        position: relative;
        width: clamp(245px, 21vw, 320px);
        display: flex;
        align-items: center;
        gap: .9rem;
        padding: 0 1.65rem;
        overflow: hidden;
        border-right: 1px solid rgba(255,255,255,.075);
        background: linear-gradient(135deg, rgba(255,255,255,.025), transparent 62%);
        box-shadow: inset 0 1px rgba(255,255,255,.025), inset 0 -18px 30px rgba(0,0,0,.1);
        transform: translateZ(0);
        transition: background .3s ease, transform .3s ease;
      }
      .proof-conveyor__card:hover {
        background: linear-gradient(135deg, rgba(59,130,246,.12), rgba(255,255,255,.02));
        transform: translateZ(24px) translateY(-3px);
      }
      .proof-conveyor__number {
        position: absolute;
        right: 10px;
        top: 8px;
        color: rgba(255,255,255,.085);
        font-size: 1.65rem;
        font-weight: 800;
        letter-spacing: -.07em;
      }
      .proof-conveyor__badge {
        width: 49px;
        height: 49px;
        flex: 0 0 49px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
        transform: perspective(160px) rotateY(-9deg);
        box-shadow: 8px 10px 24px rgba(0,0,0,.22);
      }
      .proof-conveyor__badge img { width: 44px; height: 44px; object-fit: contain; }
      .proof-conveyor__badge img[alt="HPM"] { width: 40px; height: 24px; }
      .proof-conveyor__copy { display: flex; flex-direction: column; gap: .32rem; }
      .proof-conveyor__copy strong {
        color: rgba(255,255,255,.95);
        font-size: 1rem;
        letter-spacing: -.025em;
        white-space: nowrap;
      }
      .proof-conveyor__copy span {
        font-size: .5rem;
        font-weight: 800;
        letter-spacing: .14em;
        text-transform: uppercase;
        white-space: nowrap;
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
