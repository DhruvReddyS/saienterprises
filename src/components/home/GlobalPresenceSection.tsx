import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, MapPin, Phone } from 'lucide-react';
import IndiaPresenceMap from '@/components/presence/IndiaPresenceMap';
import {
  indiaPresenceCities,
  presenceTypeLabels,
  type PresenceType,
} from '@/data/indiaPresence';

const TYPE_COLORS: Record<PresenceType, string> = {
  headquarters: '#FACC15',
  salesOffice: '#F87171',
  serviceCentre: '#34D399',
  salesPartner: '#60A5FA',
};

const CityDetails = ({
  city,
}: {
  city: (typeof indiaPresenceCities)[number];
}) => {
  const primaryType = city.entries[0]?.type ?? 'salesPartner';
  const accent = TYPE_COLORS[primaryType];

  return (
    <motion.aside
      key={city.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="h-full rounded-[32px] bg-white/[0.045] p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="flex items-start justify-between gap-5 border-b border-white/[0.08] pb-6">
        <div>
          <p
            className="text-[9px] font-bold uppercase tracking-[0.25em]"
            style={{ color: accent }}
          >
            Selected location
          </p>
          <h3 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-white sm:text-4xl">
            {city.city}
          </h3>
          <p className="mt-2 text-xs font-medium text-white/40">{city.state}, India</p>
        </div>
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ background: `${accent}18`, color: accent }}
        >
          <MapPin className="h-5 w-5" />
        </span>
      </div>

      <div className="divide-y divide-white/[0.07]">
        {city.entries.map((entry) => {
          const entryAccent = TYPE_COLORS[entry.type];
          return (
            <article key={entry.id} className="py-6">
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: entryAccent, boxShadow: `0 0 10px ${entryAccent}` }}
                />
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: entryAccent }}
                >
                  {presenceTypeLabels[entry.type]}
                </p>
              </div>

              <h4 className="mt-3 text-base font-bold tracking-[-0.02em] text-white">
                {entry.company}
              </h4>
              {entry.territory && (
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                  {entry.territory}
                </p>
              )}
              <p className="mt-3 text-xs leading-6 text-white/52">{entry.description}</p>

              {entry.contacts.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {entry.contacts.map((contact) => (
                    <div key={`${entry.id}-${contact.name}`}>
                      <p className="text-xs font-semibold text-white/82">{contact.name}</p>
                      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-2">
                        {contact.phone && (
                          <a
                            href={`tel:${contact.phone.replace(/\s/g, '')}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                            style={{ color: entryAccent }}
                          >
                            <Phone className="h-3.5 w-3.5" />
                            {contact.phone}
                          </a>
                        )}
                        {contact.email && (
                          <a
                            href={`mailto:${contact.email}`}
                            className="inline-flex items-center gap-1.5 text-xs text-white/52 transition-colors hover:text-white"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            {contact.email}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-[11px] leading-5 text-white/34">
                  Contact is coordinated through Sai Enterprises.
                </p>
              )}
            </article>
          );
        })}
      </div>
    </motion.aside>
  );
};

const GlobalPresenceSection = () => {
  const [selectedId, setSelectedId] = useState('hyderabad');
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const city = indiaPresenceCities.find((item) => item.id === selectedId) ?? indiaPresenceCities[0];
  const totalEntries = indiaPresenceCities.reduce((sum, item) => sum + item.entries.length, 0);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#050810,#091321_52%,#050810)] py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_22%,rgba(59,130,246,0.1),transparent_28%),radial-gradient(circle_at_88%_75%,rgba(14,165,233,0.08),transparent_25%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(148,163,184,0.09)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-14">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid items-end gap-8 lg:grid-cols-[1fr_auto]"
        >
          <div>
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-blue-400">
              <span className="h-px w-7 bg-blue-400" />
              India Network
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl">
              Local teams. <span className="text-blue-600">National reach.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/48">
              Sales, service and machinery support connected across India from our Hyderabad headquarters.
            </p>
          </div>

          <div className="flex divide-x divide-white/10">
            {[
              { value: indiaPresenceCities.length, label: 'Cities' },
              { value: totalEntries, label: 'Support points' },
              { value: '30+', label: 'Export markets' },
            ].map((item) => (
              <div key={item.label} className="px-4 text-center sm:px-7">
                <p className="text-2xl font-extrabold tracking-[-0.04em] text-white sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.19em] text-blue-300/65">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 rounded-[38px] bg-[#07101d] p-4 shadow-[0_36px_100px_-54px_rgba(6,10,16,0.7)] sm:p-6"
        >
          <div className="flex gap-2 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {indiaPresenceCities.map((item) => {
              const active = item.id === selectedId;
              const type = item.entries[0]?.type ?? 'salesPartner';
              const color = TYPE_COLORS[type];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className="inline-flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-all"
                  style={{
                    color: active ? '#fff' : 'rgba(255,255,255,0.42)',
                    background: active ? `${color}25` : 'transparent',
                    boxShadow: active ? `inset 0 0 0 1px ${color}55` : 'none',
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                  {item.city}
                </button>
              );
            })}
          </div>

          <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.55fr)]">
            <div className="relative min-h-[430px] overflow-hidden rounded-[32px] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-3 sm:min-h-[600px] sm:p-5">
              <div className="absolute left-7 top-7 z-10 hidden items-center gap-2 rounded-full bg-[#07101d]/70 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white/58 backdrop-blur-md sm:flex">
                <Building2 className="h-3.5 w-3.5 text-blue-400" />
                Select a city or map pin
              </div>
              <IndiaPresenceMap selectedCityId={selectedId} onSelectCity={setSelectedId} />
            </div>

            <CityDetails city={city} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;
