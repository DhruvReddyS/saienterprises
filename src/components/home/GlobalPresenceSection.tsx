import { useEffect, useRef, useState } from 'react';
import IndiaPresenceMap from '@/components/presence/IndiaPresenceMap';
import { indiaPresenceCities, presenceTypeLabels, type PresenceType } from '@/data/indiaPresence';

const TYPE_COLORS: Record<PresenceType, string> = {
  headquarters: '#FACC15',
  salesOffice: '#EF4444',
  serviceCentre: '#22C55E',
  salesPartner: '#3B82F6',
};

const GlobalPresenceSection = () => {
  const [selectedId, setSelectedId] = useState('hyderabad');
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRevealed(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const city = indiaPresenceCities.find((c) => c.id === selectedId) ?? indiaPresenceCities[0];
  const primaryType = city.entries[0]?.type ?? 'salesPartner';
  const accent = TYPE_COLORS[primaryType];

  return (
    <section ref={sectionRef} style={{
      background: '#060A10', padding: '120px 0', overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: '30%', left: '30%',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 56px' }} className="max-md:!px-6">
        <div style={{
          marginBottom: 64,
          opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(24px)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            Operations
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px,5.5vw,72px)',
            fontWeight: 600, color: '#fff', lineHeight: 1, margin: 0,
          }}>
            Where We<br />
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.5)' }}>Operate</span>
          </h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 1.16fr) 392px', gap: 40, alignItems: 'center',
        }} className="max-[960px]:grid-cols-1">

          <div style={{
            opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateX(-24px)',
            transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.1s',
            display: 'flex',
            alignItems: 'center',
            minHeight: 640,
          }}>
            <IndiaPresenceMap selectedCityId={selectedId} onSelectCity={setSelectedId} />
          </div>

          <div style={{
            opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateX(24px)',
            transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.2s',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.04)', border: `1px solid ${accent}30`,
              padding: '24px', position: 'relative', overflow: 'hidden',
              transition: 'border-color 0.4s',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: accent, transition: 'background 0.4s' }} />
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: 8 }}>
                {city.city}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                  {city.state}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: accent, fontWeight: 700, padding: '2px 8px', background: `${accent}15`, border: `1px solid ${accent}30`,
                }}>
                  {presenceTypeLabels[primaryType]}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {city.entries.map((entry) => {
                const ec = TYPE_COLORS[entry.type];
                return (
                  <div key={entry.id} style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    padding: '16px 18px', transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${ec}30`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: ec, display: 'inline-block', flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: ec, fontWeight: 700 }}>
                        {presenceTypeLabels[entry.type]}
                      </span>
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                      {entry.company}
                    </div>
                    {entry.territory && (
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>
                        📍 {entry.territory}
                      </div>
                    )}
                    {entry.contacts.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 6 }}>
                        {entry.contacts.map((c) => (
                          <div key={c.name}>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
                              {c.name}
                            </div>
                            {c.phone && (
                              <a href={`tel:${c.phone.replace(/\s/g, '')}`} style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: ec,
                                textDecoration: 'none', fontWeight: 700, letterSpacing: '0.02em',
                                display: 'flex', alignItems: 'center', gap: 5,
                              }}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 9.6a19.79 19.79 0 01-3.07-8.68A2 2 0 012.6 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.57a16 16 0 006 6l.94-.94a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                                {c.phone}
                              </a>
                            )}
                            {c.email && (
                              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{c.email}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {entry.description && (
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.22)', lineHeight: 1.6, margin: '8px 0 0' }}>
                        {entry.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>Legend</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                {(Object.entries(TYPE_COLORS) as [PresenceType, string][]).map(([type, color]) => (
                  <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>
                      {presenceTypeLabels[type]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 48, opacity: revealed ? 1 : 0, transition: 'opacity 0.9s 0.4s' }}>
          {indiaPresenceCities.map((c) => {
            const isSel = selectedId === c.id;
            const cp = c.entries[0]?.type ?? 'salesPartner';
            const cc = TYPE_COLORS[cp];
            return (
              <button key={c.id} onClick={() => setSelectedId(c.id)} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.16em',
                textTransform: 'uppercase', fontWeight: 600, padding: '7px 14px', cursor: 'pointer',
                background: isSel ? cc : 'transparent', border: `1px solid ${isSel ? cc : 'rgba(255,255,255,0.1)'}`,
                color: isSel ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'all 0.25s',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
                onMouseEnter={(e) => { if (!isSel) { const el = e.currentTarget; el.style.borderColor = cc; el.style.color = cc; } }}
                onMouseLeave={(e) => { if (!isSel) { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.1)'; el.style.color = 'rgba(255,255,255,0.4)'; } }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: isSel ? '#fff' : cc, flexShrink: 0 }} />
                {c.city}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;
