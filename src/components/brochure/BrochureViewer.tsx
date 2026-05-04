import { useState, useCallback, useEffect, useRef } from 'react';
import { productCategories, type Product, type ProductCategory } from '@/data/products';

/* ── Build pages from product data ── */
interface BrochurePage {
  id: string;
  type: 'cover' | 'toc' | 'category-intro' | 'machine' | 'back';
  category?: ProductCategory;
  product?: Product;
  index: number;
}

function buildPages(): BrochurePage[] {
  const pages: BrochurePage[] = [];
  let index = 0;

  pages.push({ id: 'cover', type: 'cover', index: index++ });
  pages.push({ id: 'toc', type: 'toc', index: index++ });

  for (const cat of productCategories) {
    pages.push({ id: `cat-${cat.id}`, type: 'category-intro', category: cat, index: index++ });
    for (const product of cat.products) {
      pages.push({ id: `p-${product.id}`, type: 'machine', category: cat, product, index: index++ });
    }
  }

  pages.push({ id: 'back', type: 'back', index: index++ });
  return pages;
}

const ALL_PAGES = buildPages();
const TOTAL = ALL_PAGES.length;

/* ── Category accent colors ── */
const ACCENT: Record<string, string> = {
  'pre-press': '#6366F1',
  press: '#3B82F6',
  'post-press': '#0EA5E9',
  corrugation: '#10B981',
  allied: '#F59E0B',
};

/* ── Page content renderers ── */
const CoverPage = () => (
  <div style={{
    height: '100%', background: 'linear-gradient(135deg, #060A10 0%, #0D1F3C 60%, #060A10 100%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: 48, textAlign: 'center', position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', inset: 0, opacity: 0.05,
      backgroundImage: 'radial-gradient(circle at 50% 50%, #3B82F6 1px, transparent 1px)',
      backgroundSize: '28px 28px',
    }} />
    <div style={{
      position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
      width: '60%', height: '2px',
      background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)',
    }} />
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em', color: '#3B82F6', marginBottom: 24, textTransform: 'uppercase' }}>
      Established 2000 · Hyderabad
    </div>
    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, color: '#fff', lineHeight: 0.9, marginBottom: 8 }}>
      SAI
    </div>
    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 300, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 40 }}>
      Enterprises
    </div>
    <div style={{ width: 48, height: 1, background: '#3B82F6', marginBottom: 32 }} />
    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', lineHeight: 1.3 }}>
      Graphic Machinery<br />Catalogue 2026
    </div>
    <div style={{
      position: 'absolute', bottom: 32,
      fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em',
      color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
    }}>
      4000+ Machines · 2000+ Clients · 24 Years
    </div>
  </div>
);

const TocPage = () => (
  <div style={{
    height: '100%', background: '#F8FAFE',
    display: 'flex', flexDirection: 'column', padding: '40px 36px', overflow: 'hidden',
  }}>
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.28em', color: '#3B82F6', marginBottom: 8, textTransform: 'uppercase' }}>
      Contents
    </div>
    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: '#060A10', marginBottom: 32 }}>
      Categories
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {productCategories.map((cat) => (
        <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12, borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <div style={{ width: 4, height: 28, background: ACCENT[cat.id] ?? '#3B82F6', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: '#060A10' }}>{cat.name}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(0,0,0,0.4)', marginTop: 1 }}>{cat.products.length} machines</div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'rgba(0,0,0,0.3)', marginTop: 16, letterSpacing: '0.15em' }}>
      SAI ENTERPRISES · CATALOGUE 2026
    </div>
  </div>
);

const CategoryIntroPage = ({ category }: { category: ProductCategory }) => {
  const accent = ACCENT[category.id] ?? '#3B82F6';
  return (
    <div style={{
      height: '100%', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, #060A10 0%, #0D1421 100%)`,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px 36px',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0,
        width: '40%', opacity: 0.06,
        background: `radial-gradient(circle at 80% 50%, ${accent}, transparent 70%)`,
      }} />
      {category.heroImage && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={category.heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #060A10 40%, rgba(6,10,16,0.6))' }} />
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.28em', color: accent, marginBottom: 12, textTransform: 'uppercase' }}>
          Section
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, color: '#fff', lineHeight: 0.9, marginBottom: 20 }}>
          {category.name}
        </div>
        <div style={{ width: 32, height: 2, background: accent, marginBottom: 20 }} />
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 280 }}>
          {category.description}
        </div>
        <div style={{ marginTop: 24, fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>
          {category.products.length} MACHINES IN THIS SECTION
        </div>
      </div>
    </div>
  );
};

const MachinePage = ({ product, category }: { product: Product; category: ProductCategory }) => {
  const accent = ACCENT[category.id] ?? '#3B82F6';
  const hasImage = !!product.image;

  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top accent bar */}
      <div style={{ height: 3, background: accent, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ padding: '16px 24px 12px', borderBottom: '1px solid rgba(0,0,0,0.06)', flexShrink: 0 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.24em', textTransform: 'uppercase', color: accent, marginBottom: 4 }}>
          {category.name}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: '#060A10', lineHeight: 1.1 }}>
          {product.name}
        </div>
      </div>

      {/* Image */}
      {hasImage ? (
        <div style={{ height: 140, background: '#F0F4FF', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', padding: '8px' }}
          />
        </div>
      ) : (
        <div style={{
          height: 80, background: '#F8FAFE', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
        }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'rgba(0,0,0,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Image on request
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, padding: '12px 24px 16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {product.description && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, color: 'rgba(0,0,0,0.55)', lineHeight: 1.65, margin: 0 }}>
            {product.description}
          </p>
        )}

        {product.sizes && product.sizes.length > 0 && (
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, marginBottom: 5 }}>
              Available Sizes
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {product.sizes.map((s) => (
                <span key={s} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 9,
                  padding: '2px 8px', border: `1px solid ${accent}33`,
                  color: '#060A10', background: `${accent}0A`,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {product.features && product.features.length > 0 && (
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, marginBottom: 5 }}>
              Key Features
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
              {product.features.slice(0, 4).map((f) => (
                <li key={f} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(0,0,0,0.6)', display: 'flex', gap: 6 }}>
                  <span style={{ color: accent, flexShrink: 0, marginTop: 1 }}>◆</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div>
            {Object.entries(product.specifications).slice(0, 3).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 8, paddingBottom: 3, borderBottom: '1px solid rgba(0,0,0,0.05)', marginBottom: 3 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'rgba(0,0,0,0.4)', minWidth: 80, flexShrink: 0 }}>{k}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: '#060A10', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '8px 24px', borderTop: '1px solid rgba(0,0,0,0.06)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.15em', color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase' }}>
          Sai Enterprises · 2026
        </div>
        {product.brand && (
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.12em', color: accent }}>
            {product.brand}
          </div>
        )}
      </div>
    </div>
  );
};

const BackPage = () => (
  <div style={{
    height: '100%',
    background: 'linear-gradient(135deg, #060A10 0%, #0D1F3C 100%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: 48, textAlign: 'center', position: 'relative',
  }}>
    <div style={{ width: 48, height: 1, background: '#3B82F6', marginBottom: 32 }} />
    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,4vw,40px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.3, marginBottom: 32 }}>
      "We Believe in<br /><em style={{ color: '#3B82F6' }}>Long-Term Relationships"</em>
    </div>
    <div style={{ width: 48, height: 1, background: '#3B82F6', marginBottom: 40 }} />
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', lineHeight: 2 }}>
      Sai Enterprises, Hyderabad<br />
      +91-9312175513 · +91-9397678950<br />
      msrao@saienterprises.info
    </div>
  </div>
);

function renderPage(page: BrochurePage) {
  if (page.type === 'cover') return <CoverPage />;
  if (page.type === 'toc') return <TocPage />;
  if (page.type === 'back') return <BackPage />;
  if (page.type === 'category-intro' && page.category) return <CategoryIntroPage category={page.category} />;
  if (page.type === 'machine' && page.product && page.category) {
    return <MachinePage product={page.product} category={page.category} />;
  }
  return null;
}

/* ── Main Book Component ── */
const BrochureViewer = () => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<'forward' | 'back'>('forward');
  const [query, setQuery] = useState('');
  const bookRef = useRef<HTMLDivElement>(null);

  /* Each spread shows 2 pages (left + right) */
  const spreadCount = Math.ceil(TOTAL / 2);

  const leftPageIndex = currentSpread * 2;
  const rightPageIndex = currentSpread * 2 + 1;
  const leftPage = ALL_PAGES[leftPageIndex];
  const rightPage = ALL_PAGES[rightPageIndex];

  const canGoBack = currentSpread > 0;
  const canGoForward = currentSpread < spreadCount - 1;

  const goForward = useCallback(() => {
    if (flipping || !canGoForward) return;
    setFlipDir('forward');
    setFlipping(true);
    setTimeout(() => {
      setCurrentSpread((s) => s + 1);
      setFlipping(false);
    }, 500);
  }, [flipping, canGoForward]);

  const goBack = useCallback(() => {
    if (flipping || !canGoBack) return;
    setFlipDir('back');
    setFlipping(true);
    setTimeout(() => {
      setCurrentSpread((s) => s - 1);
      setFlipping(false);
    }, 500);
  }, [flipping, canGoBack]);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goForward();
      if (e.key === 'ArrowLeft') goBack();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goForward, goBack]);

  /* Search: find first page matching query */
  const matchingSpread = (() => {
    if (!query.trim()) return -1;
    const q = query.toLowerCase();
    const idx = ALL_PAGES.findIndex((p) => {
      if (p.product) return p.product.name.toLowerCase().includes(q) || (p.product.description ?? '').toLowerCase().includes(q);
      if (p.category) return p.category.name.toLowerCase().includes(q);
      return false;
    });
    return idx === -1 ? -1 : Math.floor(idx / 2);
  })();

  const jumpToSpread = (s: number) => {
    if (s === currentSpread) return;
    setFlipDir(s > currentSpread ? 'forward' : 'back');
    setFlipping(true);
    setTimeout(() => {
      setCurrentSpread(s);
      setFlipping(false);
    }, 400);
  };

  /* Category quick-jump */
  const categoryJumps = productCategories.map((cat) => {
    const pageIdx = ALL_PAGES.findIndex((p) => p.type === 'category-intro' && p.category?.id === cat.id);
    return { cat, spread: Math.floor(pageIdx / 2) };
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div style={{ background: '#060A10', minHeight: '80vh', padding: '0', position: 'relative' }}>
      {/* Toolbar */}
      <div style={{
        background: 'rgba(13,20,33,0.95)', borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '14px 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12,
        backdropFilter: 'blur(8px)', position: 'sticky', top: 72, zIndex: 50,
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>⌕</span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim()) {
                const s = (() => {
                  const q = e.target.value.toLowerCase();
                  const idx = ALL_PAGES.findIndex((p) => {
                    if (p.product) return p.product.name.toLowerCase().includes(q);
                    if (p.category) return p.category.name.toLowerCase().includes(q);
                    return false;
                  });
                  return idx === -1 ? -1 : Math.floor(idx / 2);
                })();
                if (s !== -1) jumpToSpread(s);
              }
            }}
            placeholder="Search machines, categories…"
            style={{
              width: '100%', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '9px 12px 9px 34px',
              fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              color: '#fff', outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#3B82F6'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          />
        </div>

        {/* Category jumps */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {categoryJumps.map(({ cat, spread }) => (
            <button
              key={cat.id}
              onClick={() => jumpToSpread(spread)}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.16em',
                textTransform: 'uppercase', padding: '6px 12px',
                background: currentSpread >= spread ? `${ACCENT[cat.id] ?? '#3B82F6'}22` : 'transparent',
                border: `1px solid ${currentSpread >= spread ? (ACCENT[cat.id] ?? '#3B82F6') + '55' : 'rgba(255,255,255,0.12)'}`,
                color: currentSpread >= spread ? (ACCENT[cat.id] ?? '#3B82F6') : 'rgba(255,255,255,0.45)',
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Page counter */}
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
          Spread {currentSpread + 1} / {spreadCount}
        </div>
      </div>

      {/* Book */}
      <div style={{ padding: '48px 24px 64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        {/* Keyboard hint */}
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
          Use ← → arrow keys or click the arrows to turn pages
        </div>

        {/* Book container */}
        <div ref={bookRef} style={{ position: 'relative', perspective: '2000px', width: '100%', maxWidth: 900 }}>
          {/* Shadow */}
          <div style={{
            position: 'absolute', bottom: -20, left: '15%', right: '15%', height: 40,
            background: 'rgba(0,0,0,0.5)', filter: 'blur(20px)', borderRadius: '50%',
          }} />

          {/* Book spread */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
            position: 'relative',
          }}>
            {/* Left page */}
            <div style={{
              height: 'clamp(400px, 60vh, 600px)',
              position: 'relative', overflow: 'hidden',
              borderRight: '2px solid rgba(0,0,0,0.2)',
              boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.3)',
            }}>
              {leftPage ? renderPage(leftPage) : (
                <div style={{ height: '100%', background: '#F8FAFE' }} />
              )}
            </div>

            {/* Spine */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: 4, transform: 'translateX(-50%)', zIndex: 10,
              background: 'linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.3))',
            }} />

            {/* Right page */}
            <div style={{
              height: 'clamp(400px, 60vh, 600px)',
              position: 'relative', overflow: 'hidden',
              boxShadow: 'inset 4px 0 12px rgba(0,0,0,0.15)',
            }}>
              {rightPage ? renderPage(rightPage) : (
                <div style={{ height: '100%', background: '#F8FAFE' }} />
              )}
            </div>

            {/* Flip animation overlay */}
            {flipping && (
              <div style={{
                position: 'absolute',
                top: 0, bottom: 0,
                width: '50%',
                left: flipDir === 'forward' ? '50%' : 0,
                transformOrigin: flipDir === 'forward' ? 'left center' : 'right center',
                animation: flipDir === 'forward' ? 'flip-forward 0.5s cubic-bezier(0.4,0,0.2,1)' : 'flip-back 0.5s cubic-bezier(0.4,0,0.2,1)',
                background: '#fff',
                zIndex: 20,
                boxShadow: flipDir === 'forward' ? '-8px 0 32px rgba(0,0,0,0.4)' : '8px 0 32px rgba(0,0,0,0.4)',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to right, rgba(0,0,0,0.08), transparent)',
                }} />
              </div>
            )}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goBack}
            disabled={!canGoBack}
            style={{
              position: 'absolute', left: -56, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, background: canGoBack ? '#3B82F6' : 'rgba(255,255,255,0.06)',
              border: 'none', cursor: canGoBack ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: '#fff',
              transition: 'all 0.2s', opacity: canGoBack ? 1 : 0.3,
            }}
          >
            ←
          </button>
          <button
            onClick={goForward}
            disabled={!canGoForward}
            style={{
              position: 'absolute', right: -56, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, background: canGoForward ? '#3B82F6' : 'rgba(255,255,255,0.06)',
              border: 'none', cursor: canGoForward ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: '#fff',
              transition: 'all 0.2s', opacity: canGoForward ? 1 : 0.3,
            }}
          >
            →
          </button>
        </div>

        {/* Page strip navigation */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 640 }}>
          {Array.from({ length: Math.min(spreadCount, 40) }, (_, i) => {
            const isActive = i === currentSpread;
            const page = ALL_PAGES[i * 2];
            const isCatIntro = page?.type === 'category-intro';
            const accent = isCatIntro && page.category ? ACCENT[page.category.id] : undefined;
            return (
              <button
                key={i}
                onClick={() => jumpToSpread(i)}
                title={isCatIntro ? page.category?.name : `Spread ${i + 1}`}
                style={{
                  width: isActive ? 24 : isCatIntro ? 14 : 8,
                  height: 8,
                  background: isActive ? '#3B82F6' : isCatIntro ? (accent ?? 'rgba(255,255,255,0.25)') : 'rgba(255,255,255,0.12)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.25s', flexShrink: 0,
                }}
              />
            );
          })}
          {spreadCount > 40 && (
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
              +{spreadCount - 40} more
            </span>
          )}
        </div>
      </div>

      {/* Inline CSS for flip animation */}
      <style>{`
        @keyframes flip-forward {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(-180deg); }
        }
        @keyframes flip-back {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(180deg); }
        }
      `}</style>
    </div>
  );
};

export default BrochureViewer;
