import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import BrochureViewer from '@/components/brochure/BrochureViewer';
import brochurePdf from '@/assets/Sai Enterprises-2026.pdf';
import { productCategories } from '@/data/products';
import { useEffect, useState } from 'react';

const BrochurePage = () => {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { setTimeout(() => setRevealed(true), 80); }, []);

  return (
    <PageTransition>
      <Header />

      {/* Hero header */}
      <div style={{
        background: '#060A10', padding: '140px 64px 72px',
        position: 'relative', overflow: 'hidden',
      }} className="max-md:!px-7 max-md:!pt-28 max-md:!pb-12">
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 70% 40%, rgba(59,130,246,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: 1300, margin: '0 auto',
          opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#3B82F6', marginBottom: 16,
          }}>
            E-Brochure 2026
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(44px,6vw,80px)', fontWeight: 700,
            lineHeight: 0.9, letterSpacing: '-0.02em',
            color: '#fff', marginBottom: 24,
          }}>
            Full Catalogue<br />
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}>
              — Page by Page
            </span>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, maxWidth: 560, marginBottom: 32,
          }}>
            Browse every machine in our portfolio — flip through categories, search by name,
            and jump directly to the machine you need.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <a
              href={brochurePdf}
              download="Sai-Enterprises-Catalogue-2026.pdf"
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', fontWeight: 600,
                padding: '12px 28px', background: '#3B82F6',
                border: 'none', color: '#fff', cursor: 'pointer',
                textDecoration: 'none', display: 'inline-block',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            >
              Download PDF
            </a>
            <Link
              to="/contact"
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', fontWeight: 600,
                padding: '12px 28px', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none', display: 'inline-block',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3B82F6'; el.style.color = '#3B82F6'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.18)'; el.style.color = 'rgba(255,255,255,0.7)'; }}
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Brochure viewer */}
      <BrochureViewer />

      {/* Category quick links */}
      <div style={{ background: '#F0F4FF', padding: '64px 64px' }} className="max-md:!px-7 max-md:!py-12">
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: '#3B82F6', marginBottom: 16,
          }}>
            Explore by Category
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {productCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/machinery/${cat.slug}`}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.16em',
                  textTransform: 'uppercase', fontWeight: 600,
                  padding: '10px 20px',
                  border: '1px solid rgba(0,0,0,0.12)', color: '#060A10',
                  background: '#fff', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3B82F6'; el.style.color = '#3B82F6'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,0,0,0.12)'; el.style.color = '#060A10'; }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </PageTransition>
  );
};

export default BrochurePage;
