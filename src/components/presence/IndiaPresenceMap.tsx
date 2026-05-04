import { useState, useEffect, useRef } from 'react';
import indiaMap from '@svg-maps/india';
import { indiaPresenceCities, type PresenceType } from '@/data/indiaPresence';

interface Props {
  selectedCityId?: string;
  onSelectCity?: (id: string) => void;
}

const VB_W = 612;
const VB_H = 696;

/* Pin colours by presence type */
const TYPE_COLORS: Record<PresenceType, string> = {
  headquarters: '#FACC15',   // gold
  salesOffice:  '#EF4444',   // red
  serviceCentre:'#22C55E',   // green
  salesPartner: '#3B82F6',   // blue
};

function getPrimaryType(cityId: string): PresenceType {
  const city = indiaPresenceCities.find((c) => c.id === cityId);
  if (!city) return 'salesPartner';
  const types = city.entries.map((e) => e.type);
  if (types.includes('headquarters')) return 'headquarters';
  if (types.includes('salesOffice')) return 'salesOffice';
  if (types.includes('serviceCentre')) return 'serviceCentre';
  return 'salesPartner';
}

const IndiaPresenceMap = ({ selectedCityId, onSelectCity }: Props) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const prevSelectedRef = useRef<string | undefined>(selectedCityId);

  /* Trigger connecting-line animation when selection changes */
  useEffect(() => {
    if (selectedCityId !== prevSelectedRef.current) {
      setAnimKey((k) => k + 1);
      prevSelectedRef.current = selectedCityId;
    }
  }, [selectedCityId]);

  /* Compute selected city SVG coords for animated elements */
  const selectedCity = indiaPresenceCities.find((c) => c.id === selectedCityId);
  const selCx = selectedCity?.mapPosition ? (selectedCity.mapPosition.x / 100) * VB_W : 0;
  const selCy = selectedCity?.mapPosition ? (selectedCity.mapPosition.y / 100) * VB_H : 0;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg
        viewBox={indiaMap.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxHeight: 660, margin: '0 auto' }}
        aria-label={indiaMap.label}
      >
        <defs>
          {/* Glow filter */}
          <filter id="pin-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Larger glow for selected */}
          <filter id="pin-glow-active" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* State fills */}
        {indiaMap.locations.map((loc) => {
          // Highlight state of selected city
          const cityInState = indiaPresenceCities.find((c) => c.stateId === loc.id && c.id === selectedCityId);
          return (
            <path
              key={loc.id}
              d={loc.path}
              fill={cityInState ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.03)'}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.6"
              style={{
                transition: 'fill 0.5s ease',
              }}
            />
          );
        })}

        {/* Animated ring around selected pin */}
        {selectedCity?.mapPosition && (
          <g key={`sel-ring-${animKey}`}>
            <circle
              cx={selCx} cy={selCy} r="6"
              fill="none"
              stroke={TYPE_COLORS[getPrimaryType(selectedCityId ?? '')]}
              strokeWidth="1.5"
              opacity="0"
              style={{
                animation: 'map-ping 1.5s cubic-bezier(0,0,0.2,1) forwards',
              }}
            />
            <circle
              cx={selCx} cy={selCy} r="6"
              fill="none"
              stroke={TYPE_COLORS[getPrimaryType(selectedCityId ?? '')]}
              strokeWidth="1"
              opacity="0"
              style={{
                animation: 'map-ping 1.5s cubic-bezier(0,0,0.2,1) 0.3s forwards',
              }}
            />
          </g>
        )}

        {/* City pins */}
        {indiaPresenceCities.map((city) => {
          if (!city.mapPosition) return null;
          const cx = (city.mapPosition.x / 100) * VB_W;
          const cy = (city.mapPosition.y / 100) * VB_H;
          const isHQ = city.id === 'hyderabad';
          const isSelected = selectedCityId === city.id;
          const isHov = hovered === city.id;
          const isActive = isSelected || isHov;
          const primaryType = getPrimaryType(city.id);
          const color = TYPE_COLORS[primaryType];

          return (
            <g
              key={city.id}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectCity?.(city.id)}
              onMouseEnter={() => setHovered(city.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Continuous pulse ring for HQ */}
              {isHQ && (
                <circle
                  cx={cx} cy={cy} r="5"
                  fill="none"
                  stroke={color}
                  strokeWidth="1.5"
                  opacity="0.5"
                  style={{ animation: 'pulse-ring-map 2.5s ease-out infinite' }}
                />
              )}

              {/* Active glow ring */}
              {isActive && (
                <circle
                  cx={cx} cy={cy}
                  r={isHQ ? 14 : 12}
                  fill={`${color}20`}
                  filter="url(#pin-glow-active)"
                  style={{
                    transition: 'r 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s',
                  }}
                />
              )}

              {/* Drop-pin marker shape */}
              <g
                style={{
                  transform: isActive
                    ? `translate(${cx}px, ${cy - 2}px) scale(1.15)`
                    : `translate(${cx}px, ${cy}px) scale(1)`,
                  transformOrigin: '0 0',
                  transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {/* Pin body */}
                <circle
                  cx={0} cy={0}
                  r={isHQ ? 5.5 : 4}
                  fill={color}
                  stroke={isActive ? '#fff' : `${color}88`}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  filter={isActive ? 'url(#pin-glow)' : undefined}
                />
                {/* Inner dot */}
                <circle
                  cx={0} cy={0}
                  r={isHQ ? 2 : 1.5}
                  fill="#fff"
                  opacity={isActive ? 0.9 : 0.6}
                />
              </g>

              {/* City label */}
              <text
                x={cx + (city.mapOffset?.x ?? 7)}
                y={cy + (city.mapOffset?.y ?? 4)}
                fill={isActive ? '#fff' : 'rgba(255,255,255,0.45)'}
                fontSize={isActive ? '8.5' : '7.5'}
                fontFamily="'DM Sans', sans-serif"
                fontWeight={isActive ? '700' : '500'}
                letterSpacing="0.04em"
                style={{
                  transition: 'fill 0.35s, font-size 0.35s, font-weight 0.35s',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  textShadow: isActive ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
                }}
              >
                {city.city}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(10, 18)">
          {([
            { type: 'headquarters' as PresenceType, label: 'Headquarters' },
            { type: 'salesOffice' as PresenceType, label: 'Sales Office' },
            { type: 'serviceCentre' as PresenceType, label: 'Service Centre' },
            { type: 'salesPartner' as PresenceType, label: 'Sales Partner' },
          ]).map((item, i) => (
            <g key={item.type} transform={`translate(0, ${i * 16})`}>
              <circle cx="5" cy="0" r="3.5" fill={TYPE_COLORS[item.type]} />
              <circle cx="5" cy="0" r="1.3" fill="#fff" opacity="0.7" />
              <text
                x="14" y="3.5"
                fill="rgba(255,255,255,0.5)"
                fontSize="7"
                fontFamily="'DM Sans', sans-serif"
                fontWeight="500"
                letterSpacing="0.03em"
              >
                {item.label}
              </text>
            </g>
          ))}
        </g>

        <style>{`
          @keyframes pulse-ring-map {
            0%   { r: 5;  opacity: 0.6; }
            100% { r: 22; opacity: 0; }
          }
          @keyframes map-ping {
            0%   { r: 6;  opacity: 0.7; }
            100% { r: 28; opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
};

export default IndiaPresenceMap;
