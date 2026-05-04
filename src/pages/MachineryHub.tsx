import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { productCategories, type Product } from '@/data/products';
import corrugationHero from '@/assets/corrugation-hero.jpg';
import MachinePreviewModal from '@/components/ui/MachinePreviewModal';

const ALL_CATS = [
  { id: 'all', label: 'All Machines' },
  ...productCategories.map((c) => ({ id: c.slug, label: c.name })),
];

const CATEGORY_COLORS: Record<string, string> = {
  'pre-press': '#6366F1',
  press: '#3B82F6',
  'post-press': '#0EA5E9',
  corrugation: '#10B981',
  allied: '#F59E0B',
};

const IcoSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const IcoX = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const MachineryHub = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedMachine, setSelectedMachine] = useState<Product | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);

  const allMachines = productCategories.flatMap((c) =>
    c.products.map((p) => ({ ...p, categoryName: c.name, categorySlug: c.slug }))
  );

  const machineCountByCat = Object.fromEntries(
    productCategories.map((c) => [c.slug, c.products.length])
  );

  const filtered = allMachines.filter((m) => {
    const matchesCat = filter === 'all' || m.categorySlug === filter;
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || m.name.toLowerCase().includes(q) ||
      (m.categoryName as string).toLowerCase().includes(q) ||
      (m.description ?? '').toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  /* Parallax */
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setParallax(-rect.top * 0.3);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMachine(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <PageTransition>
      <Header />

      {/* Hero */}
      <div ref={heroRef} style={{
        background: '#060A10', padding: '140px 64px 72px',
        position: 'relative', overflow: 'hidden', minHeight: '68vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }} className="max-md:!px-7 max-md:!pt-24 max-md:min-h-0">
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src={corrugationHero}
            alt="Machinery"
            style={{
              width: '100%', height: '110%', objectFit: 'cover', opacity: 0.15,
              transform: `translateY(${parallax}px)`,
              transition: 'transform 0.05s linear',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, #060A10 30%, rgba(6,10,16,0.75) 65%, rgba(6,10,16,0.5) 100%)',
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
          }}>
            <div style={{ width: 32, height: 1, background: '#3B82F6' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700 }}>
              Sai Enterprises — Machinery Catalogue
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(56px,9vw,132px)',
            fontWeight: 700, lineHeight: 0.86,
            color: '#fff', letterSpacing: '-0.04em', marginBottom: 20,
          }}>
            THE MACHINES
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 700,
              color: '#3B82F6', letterSpacing: '-0.02em', lineHeight: 1,
            }}>
              4000+
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)', lineHeight: 1.4,
            }}>
              machines placed<br />across India
            </div>
          </div>

          {/* Category stat pills */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
            {productCategories.map((cat) => {
              const accent = CATEGORY_COLORS[cat.id] ?? '#3B82F6';
              const isActive = filter === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(isActive ? 'all' : cat.slug)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '7px 14px',
                    background: isActive ? accent : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${isActive ? accent : 'rgba(255,255,255,0.12)'}`,
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.borderColor = accent; (e.currentTarget as HTMLElement).style.color = '#fff'; } }}
                  onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; } }}
                >
                  {cat.name}
                  <span style={{
                    fontSize: 9, fontWeight: 800, padding: '1px 6px',
                    background: isActive ? 'rgba(255,255,255,0.2)' : `${accent}25`,
                    color: isActive ? '#fff' : accent,
                  }}>
                    {cat.products.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search input */}
          <div style={{ maxWidth: 560, position: 'relative' }}>
            <span style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.35)', pointerEvents: 'none', display: 'flex',
            }}>
              <IcoSearch />
            </span>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search machines by name, category, or use case…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.14)',
                padding: '14px 48px 14px 44px',
                fontSize: 14, color: '#fff',
                outline: 'none', transition: 'border-color 0.25s, background 0.25s',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#3B82F6'; e.target.style.background = 'rgba(59,130,246,0.06)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.14)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.5)', padding: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', width: 22, height: 22, transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
              >
                <IcoX />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter bar — sticky */}
      <div style={{
        background: '#0A1220',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky', top: 72, zIndex: 100,
        padding: '0 64px',
      }} className="max-md:!px-5">
        <div style={{ overflowX: 'auto', display: 'flex', alignItems: 'center', gap: 0 }}>
          {ALL_CATS.map((cat) => {
            const accent = cat.id !== 'all' ? (CATEGORY_COLORS[cat.id] ?? '#3B82F6') : '#3B82F6';
            const isActive = filter === cat.id;
            const count = cat.id === 'all' ? allMachines.length : (machineCountByCat[cat.id] ?? 0);
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.35)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '15px 18px', transition: 'color 0.2s', whiteSpace: 'nowrap',
                  borderBottom: isActive ? `2px solid ${accent}` : '2px solid transparent',
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
              >
                {cat.label}
                <span style={{
                  fontSize: 9, fontWeight: 800, padding: '1px 5px',
                  background: isActive ? `${accent}22` : 'rgba(255,255,255,0.06)',
                  color: isActive ? accent : 'rgba(255,255,255,0.28)',
                  transition: 'all 0.2s',
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Machine grid */}
      <div style={{ background: '#F0F4FF', padding: '48px 48px 80px' }} className="max-md:!px-5 max-md:!py-8">
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Result count + active filters */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 28, flexWrap: 'wrap', gap: 10,
          }}>
            <div style={{
              fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.35)',
            }}>
              {filtered.length} machine{filtered.length !== 1 ? 's' : ''}
              {filter !== 'all' && ` in ${ALL_CATS.find(c => c.id === filter)?.label}`}
              {search && ` matching "${search}"`}
            </div>
            {(filter !== 'all' || search) && (
              <button
                onClick={() => { setFilter('all'); setSearch(''); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: '#3B82F6', background: 'none', border: 'none',
                  cursor: 'pointer', fontWeight: 700, padding: '4px 8px',
                  transition: 'opacity 0.2s',
                }}
              >
                Clear filters <IcoX />
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div style={{
              padding: '80px 0', textAlign: 'center',
              fontSize: 40, color: 'rgba(0,0,0,0.12)',
            }}>
              No machines found.
            </div>
          ) : (
            <MachineGrid machines={filtered} onSelect={setSelectedMachine} />
          )}
        </div>
      </div>

      {/* Machine modal */}
      {selectedMachine && (
        <MachinePreviewModal
          product={selectedMachine}
          onClose={() => setSelectedMachine(null)}
        />
      )}

      <Footer />
    </PageTransition>
  );
};

/* ── Machine Grid ── */
const MachineGrid = ({ machines, onSelect }: {
  machines: (Product & { categoryName: string; categorySlug: string })[];
  onSelect: (m: Product) => void;
}) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
  }}
    className="max-xl:!grid-cols-3 max-lg:!grid-cols-2 max-sm:!grid-cols-1"
  >
    {machines.map((m) => (
      <MachineCard key={m.id} m={m} onSelect={onSelect} />
    ))}
  </div>
);

const MachineCard = ({
  m, onSelect,
}: {
  m: Product & { categoryName: string; categorySlug: string };
  onSelect: (m: Product) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const accent = CATEGORY_COLORS[m.categorySlug] ?? '#3B82F6';

  return (
    <div
      onClick={() => onSelect(m)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.12), 0 0 0 1px ${accent}33`
          : '0 2px 10px rgba(0,0,0,0.05)',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        transition: 'box-shadow 0.25s, transform 0.25s',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 2, background: accent,
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
      }} />

      {/* Image */}
      <div style={{
        aspectRatio: '4/3', overflow: 'hidden',
        background: '#F8FAFE',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {m.image ? (
          <img
            src={m.image}
            alt={m.name}
            loading="lazy"
            style={{
              width: '100%', height: '100%',
              objectFit: m.image.endsWith('.png') ? 'contain' : 'cover',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
              padding: m.image.endsWith('.png') ? '12px' : undefined,
            }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 20 }}>
            <div style={{ width: 36, height: 36, background: `${accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
              <div style={{ width: 14, height: 14, border: `1.5px solid ${accent}`, borderRadius: '50%' }} />
            </div>
            <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.25)', letterSpacing: '0.1em', textAlign: 'center' }}>
              Image on request
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px 20px' }}>
        {/* Category tag */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: accent, background: `${accent}0F`,
          padding: '3px 8px', marginBottom: 9,
        }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: accent, flexShrink: 0, display: 'inline-block' }} />
          {m.categoryName}
        </div>

        {/* Machine name */}
        <div style={{
          fontSize: 17, fontWeight: 700, color: '#060A10', lineHeight: 1.25,
          marginBottom: 8, letterSpacing: '-0.01em',
        }}>
          {m.name}
        </div>

        {/* Description */}
        {m.description && (
          <p style={{
            fontSize: 11.5, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
            margin: '0 0 10px',
          }}>
            {m.description}
          </p>
        )}

        {/* Sizes */}
        {m.sizes && m.sizes.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
            {m.sizes.slice(0, 3).map((s) => (
              <span key={s} style={{
                fontSize: 9, padding: '2px 7px',
                border: `1px solid ${accent}30`,
                color: '#060A10', background: `${accent}07`,
              }}>
                {s}
              </span>
            ))}
            {m.sizes.length > 3 && (
              <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.35)' }}>
                +{m.sizes.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* View detail */}
        <div style={{
          fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: accent, display: 'flex', alignItems: 'center', gap: 6,
          opacity: hovered ? 1 : 0.55, transition: 'opacity 0.2s',
          fontWeight: 700,
        }}>
          View details
          <span style={{
            display: 'inline-block',
            transform: hovered ? 'translateX(4px)' : 'none',
            transition: 'transform 0.2s',
          }}>→</span>
        </div>
      </div>
    </div>
  );
};

export default MachineryHub;
