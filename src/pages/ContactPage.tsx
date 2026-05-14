import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import PageTransition from '@/components/PageTransition';
import { productCategories } from '@/data/products';

/* ── inquiry data: categories + their machines ── */
const INQUIRY_CATS = [
  ...productCategories.map((c) => ({
    id: c.slug,
    name: c.name,
    machines: c.products.map((p) => p.name),
  })),
  {
    id: 'hpm',
    name: 'HPM Paper Cutters',
    machines: [
      'HPM 115 Programmable Cutter',
      'HPM 66 Paper Cutter',
      'HPM Cutting Machine',
      'Digital Paper Cutter',
      'HPM Lane Feeder',
      'Pile Turner',
      'Pile Lifter',
      'Three Knife Trimmer',
      'Semi-Auto Three Knife Trimmer',
    ],
  },
];

function normaliseCat(raw: string): string {
  if (!raw) return '';
  const bySlug = INQUIRY_CATS.find((c) => c.id === raw.toLowerCase().replace(/\s+/g, '-'));
  if (bySlug) return bySlug.id;
  const byName = INQUIRY_CATS.find((c) => c.name.toLowerCase() === raw.toLowerCase());
  return byName?.id ?? raw;
}

/* ── icons ── */
const IcoPhone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12 19.79 19.79 0 0 1 1.21 3.18 2 2 0 0 1 3.22 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.09a16 16 0 0 0 6 6l.56-.56a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IcoMail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IcoPin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11z"/><circle cx="12" cy="10" r="2.5"/>
  </svg>
);
const IcoArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const IcoCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);
const IcoChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

/* ── floating-label text input ── */
const FloatField = ({
  label, type = 'text', value, onChange, required = false,
}: {
  label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div style={{ position: 'relative', marginBottom: 28 }}>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        required={required} placeholder=" "
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', background: 'transparent', border: 'none',
          borderBottom: `1.5px solid ${focused ? '#3B82F6' : 'rgba(6,10,16,0.13)'}`,
          padding: '14px 0 9px', fontSize: 15, color: '#060A10',
          fontFamily: "'DM Sans', sans-serif", outline: 'none', transition: 'border-color 0.25s',
        }}
      />
      <label style={{
        position: 'absolute', top: active ? 0 : 14, left: 0,
        fontFamily: "'DM Sans', sans-serif", fontSize: active ? 9 : 13,
        letterSpacing: active ? '0.18em' : '0.04em', textTransform: 'uppercase',
        color: focused ? '#3B82F6' : 'rgba(6,10,16,0.35)',
        pointerEvents: 'none', transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)', fontWeight: 600,
      }}>
        {label}
      </label>
    </div>
  );
};

/* ── Category picker (panel) ── */
const CategoryPicker = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [open, setOpen] = useState(false);
  const selected = INQUIRY_CATS.find((c) => c.id === value);

  return (
    <div style={{ marginBottom: 24, position: 'relative' }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: value ? '#3B82F6' : 'rgba(6,10,16,0.38)',
        fontWeight: 700, marginBottom: 8, transition: 'color 0.2s',
      }}>
        Category {value && <span style={{ color: 'rgba(6,10,16,0.3)' }}>· selected</span>}
      </div>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%', background: open ? 'rgba(59,130,246,0.04)' : '#fff',
          border: `1.5px solid ${open ? '#3B82F6' : selected ? 'rgba(59,130,246,0.4)' : 'rgba(6,10,16,0.12)'}`,
          padding: '13px 16px', cursor: 'pointer', textAlign: 'left',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all 0.22s',
        }}
      >
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 14,
          color: selected ? '#060A10' : 'rgba(6,10,16,0.35)',
        }}>
          {selected ? selected.name : 'Select a category'}
        </span>
        <span style={{
          color: '#3B82F6', transition: 'transform 0.25s',
          transform: open ? 'rotate(180deg)' : 'none', display: 'flex',
        }}>
          <IcoChevron />
        </span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 40,
              background: '#fff', border: '1.5px solid rgba(59,130,246,0.2)',
              borderTop: 'none', boxShadow: '0 12px 40px rgba(6,10,16,0.1)',
              transformOrigin: 'top',
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1,
              background: 'rgba(6,10,16,0.05)',
            } as React.CSSProperties}
            className="max-sm:!grid-cols-1"
          >
            {INQUIRY_CATS.map((cat) => {
              const isSel = cat.id === value;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => { onChange(cat.id); setOpen(false); }}
                  style={{
                    padding: '14px 18px', background: isSel ? 'rgba(59,130,246,0.08)' : '#fff',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: 8, transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { if (!isSel) (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.04)'; }}
                  onMouseLeave={(e) => { if (!isSel) (e.currentTarget as HTMLElement).style.background = '#fff'; }}
                >
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 12.5,
                    color: isSel ? '#3B82F6' : '#060A10', fontWeight: isSel ? 700 : 400,
                  }}>
                    {cat.name}
                  </span>
                  {isSel && (
                    <span style={{ color: '#3B82F6', flexShrink: 0 }}>
                      <IcoCheck />
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Machine picker (pills grid, filtered by category) ── */
const MachinePicker = ({
  categoryId, value, onChange,
}: {
  categoryId: string; value: string; onChange: (v: string) => void;
}) => {
  const cat = INQUIRY_CATS.find((c) => c.id === categoryId);
  const machines = cat?.machines ?? [];

  if (!categoryId) {
    return (
      <div style={{ marginBottom: 28 }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'rgba(6,10,16,0.3)', fontWeight: 700, marginBottom: 10,
        }}>
          Machine of Interest
        </div>
        <div style={{
          padding: '14px 16px', border: '1.5px dashed rgba(6,10,16,0.1)',
          fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(6,10,16,0.3)',
        }}>
          Select a category above to see machines
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: value ? '#3B82F6' : 'rgba(6,10,16,0.38)',
        fontWeight: 700, marginBottom: 10, transition: 'color 0.2s',
      }}>
        Machine of Interest {value && <span style={{ color: 'rgba(6,10,16,0.3)' }}>· selected</span>}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {machines.map((m) => {
          const isSel = value === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => onChange(isSel ? '' : m)}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 11.5,
                padding: '8px 14px',
                background: isSel ? '#3B82F6' : '#fff',
                border: `1.5px solid ${isSel ? '#3B82F6' : 'rgba(6,10,16,0.11)'}`,
                color: isSel ? '#fff' : '#060A10',
                cursor: 'pointer', transition: 'all 0.18s cubic-bezier(0.16,1,0.3,1)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
              onMouseEnter={(e) => { if (!isSel) { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3B82F6'; el.style.color = '#3B82F6'; } }}
              onMouseLeave={(e) => { if (!isSel) { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(6,10,16,0.11)'; el.style.color = '#060A10'; } }}
            >
              {isSel && <IcoCheck />}
              {m}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ── Message field ── */
const MessageField = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div style={{ position: 'relative', marginBottom: 40 }}>
      <textarea
        value={value} onChange={(e) => onChange(e.target.value)}
        required rows={3}
        style={{
          width: '100%', background: 'transparent', border: 'none',
          borderBottom: `1.5px solid ${focused ? '#3B82F6' : 'rgba(6,10,16,0.13)'}`,
          padding: '22px 0 9px', fontSize: 15, color: '#060A10',
          fontFamily: "'DM Sans', sans-serif", outline: 'none', resize: 'none',
          transition: 'border-color 0.25s',
        }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      />
      <label style={{
        position: 'absolute', top: active ? 0 : 22, left: 0,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: active ? 9 : 13, letterSpacing: active ? '0.18em' : '0.04em',
        textTransform: 'uppercase',
        color: focused ? '#3B82F6' : 'rgba(6,10,16,0.35)',
        pointerEvents: 'none', transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)', fontWeight: 600,
      }}>
        Your Requirement
      </label>
    </div>
  );
};

/* ── Submit button ── */
const SubmitButton = () => {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="submit"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#2563EB' : '#060A10', border: 'none', cursor: 'pointer',
        padding: '16px 36px', display: 'inline-flex', alignItems: 'center', gap: 12,
        fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 800,
        letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff',
        transition: 'all 0.28s cubic-bezier(0.16,1,0.3,1)',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? '0 20px 48px rgba(37,99,235,0.28)' : '0 8px 28px rgba(6,10,16,0.18)',
      }}
    >
      Send Inquiry
      <span style={{ transform: hov ? 'translateX(3px)' : 'none', transition: 'transform 0.2s' }}>
        <IcoArrow />
      </span>
    </button>
  );
};

/* ── Success state ── */
const SuccessState = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    style={{
      padding: '60px 40px', background: '#060A10',
      border: '1px solid rgba(59,130,246,0.2)', textAlign: 'left',
    }}
  >
    <style>{`
      @keyframes draw-check { from { stroke-dashoffset: 60 } to { stroke-dashoffset: 0 } }
      @keyframes pop-ring { from { transform: scale(0.6); opacity: 0 } to { transform: scale(1); opacity: 1 } }
    `}</style>
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ marginBottom: 28, display: 'block' }}>
      <circle cx="28" cy="28" r="25" stroke="#3B82F6" strokeWidth="1.5" fill="none"
        style={{ animation: 'pop-ring 0.4s ease forwards' }} />
      <path d="M16 28l9 9 16-16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        fill="none" strokeDasharray="60"
        style={{ animation: 'draw-check 0.5s ease 0.35s forwards', strokeDashoffset: 60 }} />
    </svg>
    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 600, color: '#fff', lineHeight: 1, marginBottom: 14 }}>
      Inquiry sent.
    </div>
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, marginBottom: 40 }}>
      We'll respond within 24 business hours.
    </p>
    <button onClick={onReset} style={{
      background: 'none', border: '1px solid rgba(59,130,246,0.4)',
      color: '#60A5FA', cursor: 'pointer', padding: '11px 22px',
      fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.18em',
      textTransform: 'uppercase', fontWeight: 700, transition: 'all 0.2s',
    }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(59,130,246,0.1)'; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'none'; }}
    >
      Send another →
    </button>
  </motion.div>
);

/* ── Contact method row ── */
const ContactRow = ({ icon, label, lines, href, delay, on }: {
  icon: React.ReactNode; label: string; lines: string[]; href?: string; delay: number; on: boolean;
}) => {
  const [hov, setHov] = useState(false);
  const Tag = href ? 'a' : 'div';
  return (
    <Tag href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        textDecoration: 'none', cursor: href ? 'pointer' : 'default',
        opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(10px)',
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      } as React.CSSProperties}
    >
      <div style={{
        width: 34, height: 34, flexShrink: 0,
        background: hov ? '#3B82F6' : 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? '#fff' : '#60A5FA', transition: 'all 0.25s', marginTop: 2,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 4, fontWeight: 700 }}>
          {label}
        </div>
        {lines.map((l) => (
          <div key={l} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: hov ? '#fff' : 'rgba(255,255,255,0.62)', lineHeight: 1.55, transition: 'color 0.2s' }}>
            {l}
          </div>
        ))}
      </div>
    </Tag>
  );
};

/* ── Offices strip ── */
const OfficesStrip = () => {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const offices = [
    { name: 'Hyderabad', role: 'HQ', country: 'India', accent: '#FACC15', isHQ: true },
    { name: 'New Delhi', role: 'Sales', country: 'India', accent: null, isHQ: false },
    { name: 'Mumbai', role: 'Sales', country: 'India', accent: null, isHQ: false },
    { name: 'Meerut', role: 'Sales', country: 'India', accent: null, isHQ: false },
    { name: 'Pune', role: 'Sales', country: 'India', accent: null, isHQ: false },
    { name: 'Vijayawada', role: 'Sales', country: 'India', accent: null, isHQ: false },
    { name: 'Nairobi', role: 'Overseas', country: 'Kenya', accent: '#3B82F6', isHQ: false },
    { name: 'Addis Ababa', role: 'Overseas', country: 'Ethiopia', accent: '#3B82F6', isHQ: false },
    { name: 'Colombo', role: 'Overseas', country: 'Sri Lanka', accent: '#3B82F6', isHQ: false },
  ];

  return (
    <div ref={ref} style={{
      background: '#060A10', padding: '60px 64px',
      borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden',
    }} className="max-md:!px-7 max-md:!py-10">
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3) 40%, transparent)', pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28,
          fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', fontWeight: 700,
        }}>
          <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          9 Offices · 15+ Countries
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 1, background: 'rgba(255,255,255,0.04)' }}
          className="max-xl:!grid-cols-5 max-md:!grid-cols-3 max-sm:!grid-cols-2"
        >
          {offices.map((o, i) => (
            <div key={o.name} style={{
              padding: '22px 18px', background: '#060A10',
              borderBottom: `2px solid ${o.isHQ ? '#FACC15' : o.accent === '#3B82F6' ? '#3B82F6' : 'rgba(255,255,255,0.06)'}`,
              opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(14px)',
              transition: `all 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s`,
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: o.isHQ ? '#fff' : 'rgba(255,255,255,0.7)', marginBottom: 4, lineHeight: 1.1 }}>
                {o.name}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 7.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: o.isHQ ? '#FACC15' : o.accent === '#3B82F6' ? '#60A5FA' : 'rgba(255,255,255,0.28)', marginBottom: 2 }}>
                {o.role}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.18)' }}>
                {o.country}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── main page ── */
const ContactPage = () => {
  const [params] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [on, setOn] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState(() => {
    const catRaw = params.get('category') ?? '';
    const catId = normaliseCat(catRaw);
    return {
      name: '',
      email: '',
      company: '',
      phone: '',
      category: catId,
      machine: params.get('machine') ?? '',
      message: params.get('message') ?? '',
    };
  });

  useEffect(() => {
    const t = setTimeout(() => setOn(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* when category changes, clear machine selection if it's not in the new category */
  const setCategory = (id: string) => {
    const newCat = INQUIRY_CATS.find((c) => c.id === id);
    const machineStillValid = newCat?.machines.includes(form.machine);
    setForm((f) => ({ ...f, category: id, machine: machineStillValid ? f.machine : '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', company: '', phone: '', category: '', machine: '', message: '' });
    }, 5000);
  };

  /* if arriving from a machine page, scroll form into view */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (params.get('machine') && formRef.current) {
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }, [params]);

  const isFromMachine = !!(params.get('machine'));

  return (
    <PageTransition>
      <Header />

      {/* ── MAIN SPLIT ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100dvh' }}
        className="max-lg:!grid-cols-1"
      >
        {/* ── LEFT — dark info panel ── */}
        <div style={{
          background: '#060A10', padding: '140px 64px 80px',
          position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }} className="max-lg:!px-10 max-lg:!pt-28 max-md:!px-6 max-md:!pt-24 max-md:!pb-10">
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 10% 40%, rgba(59,130,246,0.12) 0%, transparent 55%)' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.2) 30%, rgba(59,130,246,0.08) 70%, transparent)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -30, right: -10, fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(120px,18vw,260px)', fontWeight: 700, color: 'rgba(255,255,255,0.018)', lineHeight: 0.85, letterSpacing: '-0.05em', pointerEvents: 'none', userSelect: 'none' }}>
            SAI
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700 }}>
              <div style={{ width: 24, height: 1, background: '#3B82F6' }} />
              Reach Sai Enterprises
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(52px,7vw,96px)', fontWeight: 600, lineHeight: 0.9, letterSpacing: '-0.03em', color: '#fff', marginBottom: 36 }}>
              Let's talk<br />
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#3B82F6' }}>machinery.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.38)', lineHeight: 1.85, maxWidth: 380, marginBottom: 56 }}>
              Machine inquiry, spares request, installation, or service — we respond within 24 hours, every time.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.22 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { icon: <IcoPhone />, label: 'Call', lines: ['+91 939 767 8950', '+91 931 217 5513'], href: 'tel:+919397678950' },
                { icon: <IcoMail />, label: 'Email', lines: ['venkat@saienterprises.info', 'msrao@saienterprises.info'], href: 'mailto:venkat@saienterprises.info' },
                { icon: <IcoPin />, label: 'Visit', lines: ['SAI ARCADE, Balkampet,', 'Hyderabad — 500018'], href: undefined },
              ].map((m, mi) => (
                <ContactRow key={m.label} {...m} delay={0.24 + mi * 0.07} on={on} />
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.44 }}
            style={{ position: 'relative', zIndex: 1, marginTop: 48 }}>
            <style>{`@keyframes ctc-pulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:0.4; transform:scale(1.8) } }`}</style>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22C55E', animation: 'ctc-pulse 2.2s ease-in-out infinite' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.32)', letterSpacing: '0.06em' }}>
                Available Mon–Sat · Response within 24 hrs
              </span>
            </div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {[{ label: 'South Asia', time: 'IST +5:30' }, { label: 'East Africa', time: 'EAT +3:00' }, { label: 'Middle East', time: 'GST +4:00' }].map((z) => (
                <div key={z.label} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, letterSpacing: '0.1em', padding: '5px 12px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.28)', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ color: '#3B82F6', fontWeight: 700 }}>{z.label}</span>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  {z.time}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT — form panel ── */}
        <div ref={formRef} style={{
          background: '#F8FAFD', padding: '140px 64px 80px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative',
        }} className="max-md:!px-8 max-md:!pt-12 max-md:!pb-16">
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(6,10,16,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(6,10,16,0.02) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4) 40%, transparent)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', maxWidth: 520, width: '100%' }}>
            <motion.div initial={{ opacity: 0, x: 16 }} animate={on ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ width: 22, height: 1, background: '#3B82F6' }} />
              Send an Inquiry
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 18 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, lineHeight: 1.0, color: '#060A10', letterSpacing: '-0.025em', marginBottom: 28 }}>
              Start a machinery<br />
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(6,10,16,0.38)' }}>conversation.</span>
            </motion.h2>

            {/* Pre-fill notice when arriving from machine page */}
            <AnimatePresence>
              {isFromMachine && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    marginBottom: 24, padding: '12px 16px',
                    background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                >
                  <IcoCheck />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: '#3B82F6', fontWeight: 600 }}>
                    Machine details pre-filled from your selection
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trust tags */}
            <motion.div initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.46 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 36 }}>
              {['24-hr response', 'Genuine HPM spares', 'Install + service'].map((t) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, color: 'rgba(6,10,16,0.48)', background: '#fff', border: '1px solid rgba(6,10,16,0.07)', padding: '5px 12px', boxShadow: '0 1px 3px rgba(6,10,16,0.04)' }}>
                  <IcoCheck />
                  {t}
                </div>
              ))}
            </motion.div>

            {/* FORM */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessState key="success" onReset={() => setSubmitted(false)} />
              ) : (
                <motion.form key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, delay: 0.5 }} onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="max-sm:!grid-cols-1">
                    <FloatField label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                    <FloatField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="max-sm:!grid-cols-1">
                    <FloatField label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                    <FloatField label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  </div>

                  {/* Smart category picker */}
                  <CategoryPicker value={form.category} onChange={setCategory} />

                  {/* Smart machine picker — filtered by category */}
                  <MachinePicker
                    categoryId={form.category}
                    value={form.machine}
                    onChange={(v) => setForm({ ...form, machine: v })}
                  />

                  <MessageField value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
                  <SubmitButton />
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <OfficesStrip />
      <CinematicFooter />
    </PageTransition>
  );
};

export default ContactPage;
