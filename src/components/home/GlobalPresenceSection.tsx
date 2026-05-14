import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IndiaPresenceMap from '@/components/presence/IndiaPresenceMap';
import { indiaPresenceCities, presenceTypeLabels, type PresenceType } from '@/data/indiaPresence';

const TYPE_COLORS: Record<PresenceType, string> = {
  headquarters: '#FACC15',
  salesOffice:  '#EF4444',
  serviceCentre:'#22C55E',
  salesPartner: '#3B82F6',
};

const GLOBAL_REACH = [
  { region: 'South Asia',   countries: ['Sri Lanka', 'Nepal', 'Bangladesh'], color: '#3B82F6' },
  { region: 'Middle East',  countries: ['UAE', 'Oman', 'Qatar'],             color: '#0EA5E9' },
  { region: 'East Africa',  countries: ['Kenya', 'Ethiopia', 'Tanzania'],    color: '#10B981' },
  { region: 'West Africa',  countries: ['Nigeria', 'Ghana', 'Cameroon'],     color: '#F59E0B' },
  { region: 'SE Asia',      countries: ['Singapore', 'Malaysia'],            color: '#8B5CF6' },
];

const INTERNATIONAL_OFFICES = [
  { city: 'Nairobi', country: 'Kenya' },
  { city: 'Addis Ababa', country: 'Ethiopia' },
  { city: 'Colombo', country: 'Sri Lanka' },
];

// City detail panel content — shared between desktop sidebar and mobile bottom sheet
const CityDetailContent = ({
  city,
  accent,
  primaryType,
  cityContactCount,
  totalContacts,
}: {
  city: (typeof indiaPresenceCities)[number];
  accent: string;
  primaryType: PresenceType;
  cityContactCount: number;
  totalContacts: number;
}) => (
  <>
    <div style={{
      background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}30`,
      padding: '20px 20px 18px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, letterSpacing: '0.24em', textTransform: 'uppercase', color: accent, fontWeight: 700, marginBottom: 10 }}>
        Selected Location
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: '#fff', lineHeight: 1, marginBottom: 10 }}>
        {city.city}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.36)', fontWeight: 700 }}>
          {city.state}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.18)' }}>·</span>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: accent, fontWeight: 700, padding: '4px 9px', background: `${accent}14`, border: `1px solid ${accent}30`,
        }}>
          {presenceTypeLabels[primaryType]}
        </span>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
      {[
        { value: `${city.entries.length}`, label: 'Entries' },
        { value: `${cityContactCount}`, label: 'Contacts' },
        { value: `${totalContacts}+`, label: 'Network calls' },
      ].map((item) => (
        <div
          key={item.label}
          style={{
            padding: '16px 14px',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.025)',
          }}
        >
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
            {item.value}
          </div>
          <div style={{ marginTop: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.46)', fontWeight: 700 }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {city.entries.map((entry) => {
        const ec = TYPE_COLORS[entry.type];
        return (
          <div
            key={entry.id}
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '16px 16px 14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: ec, display: 'inline-block', flexShrink: 0, boxShadow: `0 0 10px ${ec}55` }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: ec, fontWeight: 700 }}>
                {presenceTypeLabels[entry.type]}
              </span>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              {entry.company}
            </div>
            {entry.territory ? (
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.34)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                {entry.territory}
              </div>
            ) : null}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: 'rgba(255,255,255,0.56)', lineHeight: 1.75, margin: 0 }}>
              {entry.description}
            </p>

            {entry.contacts.length > 0 ? (
              <div style={{
                display: 'grid',
                gap: 8,
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}>
                {entry.contacts.map((contact) => (
                  <div key={`${entry.id}-${contact.name}`} style={{
                    padding: '10px 12px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.03)',
                  }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: '#fff', fontWeight: 600, marginBottom: 4 }}>
                      {contact.name}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {contact.phone ? (
                        <a
                          href={`tel:${contact.phone.replace(/\s/g, '')}`}
                          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: ec, textDecoration: 'none', fontWeight: 700 }}
                        >
                          {contact.phone}
                        </a>
                      ) : null}
                      {contact.email ? (
                        <a
                          href={`mailto:${contact.email}`}
                          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: 'rgba(255,255,255,0.64)', textDecoration: 'none' }}
                        >
                          {contact.email}
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid rgba(255,255,255,0.06)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11.5,
                color: 'rgba(255,255,255,0.42)',
              }}>
                Direct contact is coordinated through Sai Enterprises for this support point.
              </div>
            )}
          </div>
        );
      })}
    </div>
  </>
);

const GlobalPresenceSection = () => {
  const [selectedId, setSelectedId] = useState('hyderabad');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRevealed(true); obs.disconnect(); }
    }, { threshold: 0.06 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Prevent body scroll when bottom sheet is open
  useEffect(() => {
    if (isMobile && sheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, sheetOpen]);

  const city = indiaPresenceCities.find((c) => c.id === selectedId) ?? indiaPresenceCities[0];
  const primaryType = city.entries[0]?.type ?? 'salesPartner';
  const accent = TYPE_COLORS[primaryType];
  const totalCities = indiaPresenceCities.length;
  const totalEntries = indiaPresenceCities.reduce((sum, item) => sum + item.entries.length, 0);
  const totalContacts = indiaPresenceCities.reduce(
    (sum, item) => sum + item.entries.reduce((entrySum, entry) => entrySum + entry.contacts.length, 0),
    0,
  );
  const cityContactCount = city.entries.reduce((sum, entry) => sum + entry.contacts.length, 0);

  const handleCitySelect = (id: string) => {
    setSelectedId(id);
    if (isMobile) setSheetOpen(true);
  };

  return (
    <section ref={sectionRef} style={{
      background: 'linear-gradient(180deg, #060A10 0%, #09121F 52%, #060A10 100%)',
      padding: 'clamp(60px,8vw,120px) 0 clamp(56px,7vw,100px)', overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.85), transparent 96%)',
      }} />
      <div style={{
        position: 'absolute', top: '28%', left: '12%',
        width: 420, height: 420,
        background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.03) 45%, transparent 72%)',
        filter: 'blur(54px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: '8%', bottom: '16%',
        width: 360, height: 320,
        background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, rgba(14,165,233,0.02) 48%, transparent 76%)',
        filter: 'blur(58px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 56px', position: 'relative' }} className="max-md:!px-6 max-[767px]:!px-4">
        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 24 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 40 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 28, height: 1, background: '#3B82F6' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700 }}>
              India Network
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'end' }}
            className="max-lg:!grid-cols-1"
          >
            <div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(36px,5vw,66px)',
                fontWeight: 600, color: '#fff', lineHeight: 0.96, margin: 0,
              }}>
                Presence, simplified.
                <br />
                <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.36)' }}>
                  explore city by city.
                </span>
              </h2>
              <p style={{
                marginTop: 18, maxWidth: 520,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, lineHeight: 1.85,
                color: 'rgba(255,255,255,0.52)',
              }}>
                Headquarters in Hyderabad, with sales offices, service centres and partners across India — tap any city to see who to reach.
              </p>
            </div>

            {/* Quick stats */}
            <div style={{ display: 'flex', gap: 0, border: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}
              className="max-lg:!w-full max-lg:!grid max-lg:!grid-cols-3 max-[767px]:!grid-cols-3"
            >
              {[
                { value: `${totalCities}`, label: 'Cities' },
                { value: `${totalEntries}`, label: 'Support pts' },
                { value: '30+',   label: 'Export markets' },
              ].map((item) => (
                <div key={item.label} style={{
                  padding: '20px 22px', textAlign: 'center',
                  borderRight: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                    {item.value}
                  </div>
                  <div style={{ marginTop: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#60A5FA', fontWeight: 700 }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: 28 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11z"/><circle cx="12" cy="10" r="2.5"/>
              </svg>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700 }}>
                Select a city to explore
              </span>
            </div>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          </div>
        </motion.div>

        {/* ── DESKTOP LAYOUT ── */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.16fr) minmax(320px, 0.84fr)', gap: 26, alignItems: 'stretch', marginBottom: 30 }}
            className="max-[980px]:!grid-cols-1"
          >
            {/* Map panel */}
            <div style={{
              opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateX(-24px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.08s',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.02))',
              backdropFilter: 'blur(14px)',
              padding: 20,
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 18, alignItems: 'start', marginBottom: 18 }}
                className="max-md:!grid-cols-1"
              >
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#93C5FD', fontWeight: 700, marginBottom: 10 }}>
                    India Network Map
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 0 }}>
                    Select a city to explore.
                  </h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}
                  className="max-md:!justify-start"
                >
                  {([
                    {
                      type: 'headquarters' as PresenceType, label: 'HQ',
                      icon: (c: string) => (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }} className="legend-icon">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ),
                    },
                    {
                      type: 'salesOffice' as PresenceType, label: 'Sales',
                      icon: (c: string) => (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }} className="legend-icon">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
                        </svg>
                      ),
                    },
                    {
                      type: 'serviceCentre' as PresenceType, label: 'Service',
                      icon: (c: string) => (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }} className="legend-icon">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                        </svg>
                      ),
                    },
                    {
                      type: 'salesPartner' as PresenceType, label: 'Partner',
                      icon: (c: string) => (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }} className="legend-icon">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      ),
                    },
                  ]).map((item) => (
                    <div
                      key={item.type}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 7,
                        padding: '8px 10px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(255,255,255,0.025)',
                        transition: 'background 0.2s, border-color 0.2s',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = `${TYPE_COLORS[item.type]}15`;
                        el.style.borderColor = `${TYPE_COLORS[item.type]}40`;
                        const icon = el.querySelector('.legend-icon') as SVGElement | null;
                        if (icon) icon.style.transform = 'scale(1.35) rotate(-8deg)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background = 'rgba(255,255,255,0.025)';
                        el.style.borderColor = 'rgba(255,255,255,0.08)';
                        const icon = el.querySelector('.legend-icon') as SVGElement | null;
                        if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
                      }}
                    >
                      {item.icon(TYPE_COLORS[item.type])}
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.58)', fontWeight: 700 }}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* City chips */}
              <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, marginBottom: 18 }}>
                {indiaPresenceCities.map((c) => {
                  const isSel = selectedId === c.id;
                  const cp = c.entries[0]?.type ?? 'salesPartner';
                  const cc = TYPE_COLORS[cp];
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleCitySelect(c.id)}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 9,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        padding: '10px 14px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        background: isSel ? `${cc}22` : 'rgba(255,255,255,0.025)',
                        border: `1px solid ${isSel ? `${cc}60` : 'rgba(255,255,255,0.08)'}`,
                        color: isSel ? '#fff' : 'rgba(255,255,255,0.45)',
                        transition: 'all 0.22s',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSel) {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = `${cc}50`;
                          el.style.color = '#fff';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSel) {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = 'rgba(255,255,255,0.08)';
                          el.style.color = 'rgba(255,255,255,0.45)';
                        }
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cc, flexShrink: 0 }} />
                      {c.city}
                    </button>
                  );
                })}
              </div>

              <div style={{
                minHeight: 'clamp(260px, 42vw, 580px)',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'linear-gradient(180deg, rgba(7,12,22,0.72), rgba(7,12,22,0.44))',
                padding: '16px 16px 10px',
              }}>
                <IndiaPresenceMap selectedCityId={selectedId} onSelectCity={handleCitySelect} />
              </div>
            </div>

            {/* Desktop right panel */}
            <div style={{
              opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateX(24px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.16s',
              display: 'flex', flexDirection: 'column', gap: 14,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.02))',
              backdropFilter: 'blur(14px)',
              padding: 20,
              maxHeight: 'clamp(400px, 60vw, 9999px)',
              overflowY: 'auto',
            }}>
              <CityDetailContent
                city={city}
                accent={accent}
                primaryType={primaryType}
                cityContactCount={cityContactCount}
                totalContacts={totalContacts}
              />
            </div>
          </motion.div>
        )}

        {/* ── MOBILE LAYOUT ── */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: 30 }}
          >
            <div style={{
              opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(16px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.08s',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.02))',
              backdropFilter: 'blur(14px)',
              padding: 16,
            }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#93C5FD', fontWeight: 700, marginBottom: 8 }}>
                  India Network Map
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 0 }}>
                  Tap a city to explore.
                </h3>
              </div>

              {/* City selector chips — horizontal scroll */}
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 14 }}>
                {indiaPresenceCities.map((c) => {
                  const isSel = selectedId === c.id;
                  const cp = c.entries[0]?.type ?? 'salesPartner';
                  const cc = TYPE_COLORS[cp];
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleCitySelect(c.id)}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 9,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        padding: '10px 12px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        background: isSel ? `${cc}22` : 'rgba(255,255,255,0.025)',
                        border: `1px solid ${isSel ? `${cc}60` : 'rgba(255,255,255,0.08)'}`,
                        color: isSel ? '#fff' : 'rgba(255,255,255,0.45)',
                        transition: 'all 0.22s',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cc, flexShrink: 0 }} />
                      {c.city}
                    </button>
                  );
                })}
              </div>

              {/* Map — full width, at least 300px tall */}
              <div style={{
                minHeight: 300,
                width: '100%',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'linear-gradient(180deg, rgba(7,12,22,0.72), rgba(7,12,22,0.44))',
                padding: '12px 12px 8px',
              }}>
                <IndiaPresenceMap selectedCityId={selectedId} onSelectCity={handleCitySelect} />
              </div>

              {/* Hint to tap a city */}
              {!sheetOpen && (
                <div style={{
                  marginTop: 12, textAlign: 'center',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.08em',
                }}>
                  Tap a city chip or pin to see details
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* ── MOBILE BOTTOM SHEET ── */}
      <AnimatePresence>
        {isMobile && sheetOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSheetOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 499,
              }}
            />

            {/* Sheet */}
            <motion.div
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                zIndex: 500,
                background: '#0A1220',
                borderRadius: '20px 20px 0 0',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                padding: '24px 20px calc(env(safe-area-inset-bottom, 0px) + 80px)',
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              {/* Handle bar */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <div style={{
                  width: 40, height: 4,
                  borderRadius: 9999,
                  background: 'rgba(255,255,255,0.2)',
                }} />
              </div>

              {/* Close button */}
              <button
                onClick={() => setSheetOpen(false)}
                style={{
                  position: 'absolute', top: 20, right: 20,
                  width: 32, height: 32,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
                aria-label="Close"
              >
                ×
              </button>

              {/* City detail content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <CityDetailContent
                  city={city}
                  accent={accent}
                  primaryType={primaryType}
                  cityContactCount={cityContactCount}
                  totalContacts={totalContacts}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GlobalPresenceSection;
