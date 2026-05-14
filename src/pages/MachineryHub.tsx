import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { setPageMeta } from '@/lib/seo';
import Header from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import PageTransition from '@/components/PageTransition';
import { productCategories, type Product } from '@/data/products';
import MachinePreviewModal from '@/components/ui/MachinePreviewModal';

const CATS = [
  { id: 'all', label: 'All', icon: '⊞', color: '#3B82F6', desc: 'Browse everything' },
  { id: 'pre-press',  label: 'Pre-Press',   icon: '◈', color: '#6366F1', desc: 'Plate & exposure' },
  { id: 'press',      label: 'Press',        icon: '◉', color: '#3B82F6', desc: 'Offset & printing' },
  { id: 'post-press', label: 'Post-Press',   icon: '◧', color: '#0EA5E9', desc: 'Cutting & finishing' },
  { id: 'corrugation',label: 'Corrugation',  icon: '▦', color: '#10B981', desc: 'Board & packaging' },
  { id: 'allied',     label: 'Allied',       icon: '◈', color: '#F59E0B', desc: 'Accessories' },
];

const MachineryHub = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedMachine, setSelectedMachine] = useState<Product | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPageMeta(
      'Machinery Catalogue | Sai Enterprises',
      'Browse graphic machines — pre-press, press, post-press, corrugation and allied.',
    );
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedMachine(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const allMachines = productCategories.flatMap((c) =>
    c.products.map((p) => ({ ...p, categoryName: c.name, categorySlug: c.slug }))
  );

  const countByCat = Object.fromEntries(productCategories.map((c) => [c.slug, c.products.length]));

  const filtered = allMachines.filter((m) => {
    const matchesCat = filter === 'all' || m.categorySlug === filter;
    const q = search.toLowerCase().trim();
    const matchesSearch = !q
      || m.name.toLowerCase().includes(q)
      || m.categoryName.toLowerCase().includes(q)
      || (m.description ?? '').toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const activeCat = CATS.find((c) => c.id === filter) ?? CATS[0];

  return (
    <PageTransition>
      <Header />

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(160deg, #060A10 0%, #0A1628 60%, #060A10 100%)',
        padding: 'clamp(40px,8vw,110px) clamp(16px,5vw,64px) clamp(32px,5vw,64px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div style={{
          position: 'absolute', top: '20%', right: '-5%', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1300, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 24, height: 1.5, background: '#3B82F6' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
              Machinery Catalogue
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(42px,8vw,96px)',
            fontWeight: 700, lineHeight: 0.92, color: '#fff',
            letterSpacing: '-0.03em', marginBottom: 24,
          }}>
            Find your<br />
            <span style={{ color: '#60A5FA', fontStyle: 'italic' }}>machine.</span>
          </h1>

          {/* Search bar */}
          <div style={{ maxWidth: 560, position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search by name, type or use case…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                padding: '14px 44px 14px 44px',
                fontSize: 14, color: '#fff',
                fontFamily: "'DM Sans', sans-serif",
                outline: 'none', transition: 'all 0.25s',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#3B82F6'; e.target.style.background = 'rgba(59,130,246,0.07)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%', width: 22, height: 22,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ── CATEGORY SELECTOR ── */}
      <div style={{ background: '#0D1421', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(12px,2vw,20px) clamp(16px,5vw,64px)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 8,
          }} className="max-lg:!grid-cols-3 max-[767px]:!grid-cols-3 max-[400px]:!grid-cols-2">
            {CATS.map((cat) => {
              const isActive = filter === cat.id;
              const count = cat.id === 'all' ? allMachines.length : (countByCat[cat.id] ?? 0);
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                    padding: 'clamp(10px,1.5vw,14px) clamp(10px,1.5vw,16px)',
                    background: isActive ? `${cat.color}18` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isActive ? cat.color + '55' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 8, cursor: 'pointer',
                    transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                    textAlign: 'left',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="cat-active-bar"
                      style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                        background: cat.color, borderRadius: '0 0 2px 2px',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 4 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: isActive ? cat.color : 'rgba(255,255,255,0.35)', fontFamily: "'DM Sans', sans-serif", transition: 'color 0.2s' }}>
                      {cat.label}
                    </span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: isActive ? cat.color : 'rgba(255,255,255,0.2)', fontFamily: "'DM Sans', sans-serif" }}>
                      {count}
                    </span>
                  </div>
                  <span className="max-[767px]:hidden" style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.04em' }}>
                    {cat.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MACHINE GRID ── */}
      <div style={{ background: '#F4F7FF', padding: 'clamp(20px,3vw,48px) clamp(16px,5vw,48px) clamp(48px,6vw,80px)' }} className="max-[767px]:!pb-24">
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* Result bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 3, height: 16, background: activeCat.color, borderRadius: 2 }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(6,10,16,0.45)', fontWeight: 700 }}>
                {filtered.length} {filter !== 'all' ? activeCat.label : 'machines'}
                {search && ` · "${search}"`}
              </span>
            </div>
            {(filter !== 'all' || search) && (
              <button onClick={() => { setFilter('all'); setSearch(''); }} style={{
                display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'DM Sans', sans-serif",
                fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#2563EB', background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.18)',
                cursor: 'pointer', fontWeight: 700, padding: '6px 12px', borderRadius: 6,
              }}>
                Clear ×
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ padding: '80px 0', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, color: 'rgba(6,10,16,0.18)', marginBottom: 12 }}>
                  No machines found.
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(6,10,16,0.3)' }}>
                  Try a different search or category
                </div>
              </motion.div>
            ) : (
              <motion.div key={`${filter}-${search}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 16,
                }}
                className="max-xl:!grid-cols-3 max-lg:!grid-cols-2 max-[767px]:!grid-cols-2 max-[767px]:!gap-3 max-[420px]:!grid-cols-1"
              >
                {filtered.map((m, i) => (
                  <MachineCard key={m.id} m={m} i={i} onSelect={setSelectedMachine} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {selectedMachine && (
        <MachinePreviewModal product={selectedMachine} onClose={() => setSelectedMachine(null)} />
      )}

      <CinematicFooter />
    </PageTransition>
  );
};

/* ── Card ── */
const CAT_COLORS: Record<string, string> = {
  'pre-press': '#6366F1', press: '#3B82F6', 'post-press': '#0EA5E9',
  corrugation: '#10B981', allied: '#F59E0B',
};

const MachineCard = ({
  m, i, onSelect,
}: {
  m: Product & { categoryName: string; categorySlug: string };
  i: number;
  onSelect: (m: Product) => void;
}) => {
  const [hov, setHov] = useState(false);
  const accent = CAT_COLORS[m.categorySlug] ?? '#3B82F6';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3), ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(m)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        border: `1px solid ${hov ? accent + '40' : 'rgba(6,10,16,0.08)'}`,
        borderRadius: 12,
        overflow: 'hidden', cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov
          ? `0 16px 40px rgba(6,10,16,0.12), 0 0 0 1px ${accent}18`
          : '0 2px 8px rgba(6,10,16,0.05)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Top color bar */}
      <div style={{
        height: 3,
        background: accent,
        opacity: hov ? 1 : 0.35,
        transition: 'opacity 0.25s',
        flexShrink: 0,
      }} />

      {/* Image */}
      <div style={{
        aspectRatio: '4/3', overflow: 'hidden',
        background: '#F8F9FE',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        borderBottom: '1px solid rgba(6,10,16,0.05)',
      }}>
        {m.image ? (
          <img
            src={m.image} alt={m.name} loading="lazy"
            style={{
              width: '100%', height: '100%',
              objectFit: m.image.endsWith('.png') ? 'contain' : 'cover',
              padding: m.image.endsWith('.png') ? '12px' : undefined,
              transform: hov ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${accent}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>
              </svg>
            </div>
            <span style={{ fontSize: 8, color: 'rgba(6,10,16,0.25)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
              On request
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, width: 'fit-content',
          fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: accent, background: `${accent}12`, borderRadius: 4,
          padding: '3px 8px', marginBottom: 8,
          fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
        }}>
          {m.categoryName}
        </div>

        {/* Name */}
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(12px,2.5vw,14px)', fontWeight: 700,
          color: '#060A10', lineHeight: 1.3, marginBottom: 6,
          letterSpacing: '-0.01em',
        }}>
          {m.name}
        </div>

        {/* Description — 2 lines */}
        {m.description && (
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, color: 'rgba(6,10,16,0.44)', lineHeight: 1.55,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden', margin: '0 0 8px', flex: 1,
          }}>
            {m.description}
          </p>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 8, borderTop: '1px solid rgba(6,10,16,0.06)' }}>
          {m.sizes && m.sizes.length > 0 ? (
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'rgba(6,10,16,0.35)', letterSpacing: '0.08em' }}>
              {m.sizes.length} size{m.sizes.length > 1 ? 's' : ''}
            </span>
          ) : <span />}
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: accent, opacity: hov ? 1 : 0.5, transition: 'opacity 0.2s',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            View <span style={{ transform: hov ? 'translateX(3px)' : 'none', transition: 'transform 0.2s', display: 'inline-block' }}>→</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MachineryHub;
