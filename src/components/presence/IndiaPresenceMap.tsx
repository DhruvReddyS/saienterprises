import { motion, useReducedMotion } from 'framer-motion';
import indiaMap from '@svg-maps/india';
import { Building2, Briefcase, Handshake, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  type PresenceCity,
  type PresenceType,
  presenceTypeLabels,
  presenceTypePriority,
} from '@/data/indiaPresence';

interface IndiaPresenceMapProps {
  cities: PresenceCity[];
  activeCityId: string | null;
  onSelectCity: (cityId: string) => void;
}

const viewBoxParts = indiaMap.viewBox.split(' ').map(Number);
const MAP_WIDTH = viewBoxParts[2] ?? 612;
const MAP_HEIGHT = viewBoxParts[3] ?? 696;

const typeMeta: Record<
  PresenceType,
  {
    markerClass: string;
    badgeClass: string;
    icon: typeof Building2;
  }
> = {
  headquarters: {
    markerClass: 'bg-primary border-primary/35',
    badgeClass:
      'border-[hsl(var(--primary)/0.18)] bg-[hsl(var(--primary)/0.1)] text-primary',
    icon: Building2,
  },
  salesOffice: {
    markerClass:
      'bg-[hsl(195_82%_31%)] border-[hsl(195_82%_31%/0.35)]',
    badgeClass:
      'border-[hsl(195_82%_31%/0.18)] bg-[hsl(195_82%_31%/0.1)] text-[hsl(195_82%_31%)]',
    icon: Briefcase,
  },
  serviceCentre: {
    markerClass:
      'bg-[hsl(var(--yellow))] border-[hsl(var(--yellow)/0.35)]',
    badgeClass:
      'border-[hsl(var(--yellow)/0.24)] bg-[hsl(var(--yellow)/0.14)] text-[hsl(var(--yellow-foreground))]',
    icon: Wrench,
  },
  salesPartner: {
    markerClass:
      'bg-[hsl(var(--accent))] border-[hsl(var(--accent)/0.35)]',
    badgeClass:
      'border-[hsl(var(--accent)/0.18)] bg-[hsl(var(--accent)/0.1)] text-[hsl(var(--accent))]',
    icon: Handshake,
  },
};

const projectCityToMap = (city: PresenceCity) => {
  const x = 92 + (city.lng - 68) * 16.6 + (city.mapOffset?.x ?? 0);
  const y = 8 + (37 - city.lat) * 20.7 + (city.mapOffset?.y ?? 0);

  return {
    x: Math.max(28, Math.min(MAP_WIDTH - 24, x)),
    y: Math.max(34, Math.min(MAP_HEIGHT - 36, y)),
  };
};

const getPrimaryType = (city: PresenceCity) =>
  presenceTypePriority.find((type) =>
    city.entries.some((entry) => entry.type === type),
  ) ?? city.entries[0]?.type;

const IndiaPresenceMap = ({
  cities,
  activeCityId,
  onSelectCity,
}: IndiaPresenceMapProps) => {
  const reduceMotion = useReducedMotion();
  const activeStates = new Set(cities.map((city) => city.stateId));
  const selectedCity = cities.find((city) => city.id === activeCityId) ?? null;

  return (
    <div className="rounded-[30px] border border-primary/10 bg-white p-4 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.42)] sm:p-5">
      <div className="rounded-[24px] border border-border/70 bg-white p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {(
            [
              'headquarters',
              'salesOffice',
              'serviceCentre',
              'salesPartner',
            ] as PresenceType[]
          ).map((type) => {
            const Icon = typeMeta[type].icon;

            return (
              <span
                key={type}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/92 px-3 py-1.5 text-xs text-foreground"
              >
                <span
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full border',
                    typeMeta[type].badgeClass,
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="font-medium">{presenceTypeLabels[type]}</span>
              </span>
            );
          })}
        </div>

        <div className="relative overflow-hidden rounded-[22px] border border-primary/10 bg-[hsl(var(--secondary)/0.18)] p-2 sm:p-4">
          <div className="relative aspect-[0.9/1] w-full">
            <svg
              viewBox={indiaMap.viewBox}
              role="img"
              aria-label="Map of India showing Sai Enterprises presence locations"
              className="h-full w-full"
            >
              <title>India Presence Map</title>
              {indiaMap.locations.map((location) => {
                const isSelectedState = selectedCity?.stateId === location.id;
                const isActiveState = activeStates.has(location.id);

                return (
                  <motion.path
                    key={location.id}
                    d={location.path}
                    initial={false}
                    animate={{
                      fill: isSelectedState
                        ? 'hsl(var(--primary) / 0.16)'
                        : isActiveState
                          ? 'hsl(var(--primary) / 0.07)'
                          : 'hsl(var(--secondary) / 0.92)',
                      stroke: isSelectedState
                        ? 'hsl(var(--primary))'
                        : isActiveState
                          ? 'hsl(var(--primary) / 0.3)'
                          : 'hsl(var(--border))',
                    }}
                    transition={{ duration: 0.24, ease: 'easeOut' }}
                    strokeWidth={isSelectedState ? 1.5 : 1}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>

            {cities.map((city) => {
              const { x, y } = projectCityToMap(city);
              const primaryType = getPrimaryType(city);
              if (!primaryType) return null;

              const isSelected = city.id === activeCityId;
              const markerMeta = typeMeta[primaryType];

              return (
                <div
                  key={city.id}
                  className="absolute z-20"
                  style={{
                    left: `${(x / MAP_WIDTH) * 100}%`,
                    top: `${(y / MAP_HEIGHT) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <motion.button
                    type="button"
                    aria-label={`${city.city}, ${city.state}. ${city.entries.length} presence ${city.entries.length === 1 ? 'entry' : 'entries'} available.`}
                    aria-pressed={isSelected}
                    onClick={() => onSelectCity(city.id)}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="relative flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                  >
                    {isSelected ? (
                      <span
                        className={cn(
                          'absolute size-10 rounded-full opacity-25',
                          markerMeta.markerClass,
                        )}
                      />
                    ) : null}

                    <span
                      className={cn(
                        'relative flex size-6 items-center justify-center rounded-full border-[3px] bg-white shadow-[0_16px_30px_-20px_rgba(15,23,42,0.9)] sm:size-7',
                        markerMeta.markerClass,
                      )}
                    >
                      <span className="size-2 rounded-full bg-white" />
                    </span>

                    {city.entries.length > 1 ? (
                      <span className="absolute -right-2 -top-2 rounded-full border border-background bg-foreground px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow-sm">
                        {city.entries.length}
                      </span>
                    ) : null}
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaPresenceMap;
