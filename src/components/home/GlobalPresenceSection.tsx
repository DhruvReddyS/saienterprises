import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Filter, MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import IndiaPresenceMap from '@/components/presence/IndiaPresenceMap';
import PresenceDesktopPanel from '@/components/presence/PresenceDesktopPanel';
import PresencePopup from '@/components/presence/PresencePopup';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  indiaPresenceCities,
  type PresenceCity,
  type PresenceFilter,
  presenceFilterOptions,
} from '@/data/indiaPresence';
import { cn } from '@/lib/utils';

const filterCityEntries = (
  cities: PresenceCity[],
  filter: PresenceFilter,
): PresenceCity[] => {
  if (filter === 'all') return cities;

  return cities
    .map((city) => ({
      ...city,
      entries: city.entries.filter((entry) => entry.type === filter),
    }))
    .filter((city) => city.entries.length > 0);
};

const getFilterCount = (filter: PresenceFilter) => {
  if (filter === 'all') {
    return indiaPresenceCities.reduce(
      (sum, city) => sum + city.entries.length,
      0,
    );
  }

  return indiaPresenceCities.reduce(
    (sum, city) =>
      sum + city.entries.filter((entry) => entry.type === filter).length,
    0,
  );
};

const GlobalPresenceSection = () => {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState<PresenceFilter>('all');
  const [selectedCityId, setSelectedCityId] = useState<string | null>('hyderabad');
  const [openCityId, setOpenCityId] = useState<string | null>(null);

  const filteredCities = useMemo(
    () => filterCityEntries(indiaPresenceCities, activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    if (filteredCities.length === 0) {
      setSelectedCityId(null);
      setOpenCityId(null);
      return;
    }

    const currentSelectionStillVisible = filteredCities.some(
      (city) => city.id === selectedCityId,
    );

    if (currentSelectionStillVisible) return;

    const fallbackCity =
      filteredCities.find((city) => city.id === 'hyderabad') ?? filteredCities[0];
    setSelectedCityId(fallbackCity.id);
  }, [filteredCities, selectedCityId]);

  useEffect(() => {
    if (!openCityId) return;

    const openCityStillVisible = filteredCities.some(
      (city) => city.id === openCityId,
    );

    if (!openCityStillVisible) {
      setOpenCityId(null);
    }
  }, [filteredCities, openCityId]);

  useEffect(() => {
    if (!isMobile && openCityId) {
      setOpenCityId(null);
    }
  }, [isMobile, openCityId]);

  const selectedCity =
    filteredCities.find((city) => city.id === selectedCityId) ?? null;
  const popupCity =
    filteredCities.find((city) => city.id === openCityId) ?? null;

  const handleSelectCity = (cityId: string) => {
    setSelectedCityId(cityId);
    if (isMobile) {
      setOpenCityId(cityId);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,249,0.94))] py-16 sm:py-20 md:py-24">
      <motion.div
        className="absolute right-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-primary/8 blur-[110px]"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal animation="fadeUp" className="mb-8 sm:mb-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
                <span className="h-px w-8 bg-primary" />
                India Presence
              </span>

              <h2 className="mt-4 text-4xl text-foreground sm:text-5xl md:text-6xl">
                Clean, location-based
                <span className="text-primary italic"> support visibility.</span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Select a city to view headquarters, sales office, service
                centre, and sales partner coverage. On desktop the details stay
                visible in the side panel, and on mobile they open in a popup.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.06} className="mb-6">
            <div className="rounded-[28px] border border-primary/10 bg-white/88 p-4 shadow-[0_24px_56px_-44px_rgba(15,23,42,0.45)] backdrop-blur sm:p-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                      <Filter className="h-3.5 w-3.5" />
                      Filter locations
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Showing {filteredCities.length}{' '}
                      {filteredCities.length === 1 ? 'city' : 'cities'} with{' '}
                      {getFilterCount(activeFilter)} matching entries.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {presenceFilterOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={activeFilter === option.value}
                        onClick={() => setActiveFilter(option.value)}
                        className={cn(
                          'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20',
                          activeFilter === option.value
                            ? 'border-primary/20 bg-primary text-primary-foreground'
                            : 'border-border/80 bg-background/96 text-foreground hover:border-primary/20 hover:text-primary',
                        )}
                      >
                        <span>{option.label}</span>
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                            activeFilter === option.value
                              ? 'bg-white/18 text-white'
                              : 'bg-secondary text-muted-foreground',
                          )}
                        >
                          {getFilterCount(option.value)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    Selected state and selected city stay highlighted on the map
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_360px] lg:items-start xl:grid-cols-[minmax(0,1.15fr)_380px]">
            <ScrollReveal animation="fadeUp" delay={0.1}>
              <IndiaPresenceMap
                cities={filteredCities}
                activeCityId={selectedCityId}
                onSelectCity={handleSelectCity}
              />
            </ScrollReveal>

            {!isMobile ? (
              <ScrollReveal
                animation="fadeUp"
                delay={0.14}
                className="lg:sticky lg:top-28"
              >
                <PresenceDesktopPanel city={selectedCity} />
              </ScrollReveal>
            ) : null}
          </div>

          <PresencePopup
            city={popupCity}
            open={isMobile && !!popupCity}
            onOpenChange={(open) => {
              if (!open) setOpenCityId(null);
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;
