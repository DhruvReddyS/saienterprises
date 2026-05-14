import React from 'react';
import { motion } from 'framer-motion';

export type Testimonial = {
  text: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  city?: string;
};

export const TestimonialsColumn = ({
  testimonials,
  duration = 15,
  className = '',
  startDark = false,
}: {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
  startDark?: boolean;
}) => (
  <div className={`overflow-hidden ${className}`} style={{ height: '100%' }}>
    <motion.div
      animate={{ translateY: '-50%' }}
      transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
      style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 14 }}
    >
      {[...Array(2)].map((_, rep) => (
        <React.Fragment key={rep}>
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={`${rep}-${i}`}
              t={t}
              dark={startDark ? i % 2 === 0 : i % 2 !== 0}
            />
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} width="11" height="11" viewBox="0 0 24 24"
        fill={s <= rating ? '#FACC15' : 'rgba(255,255,255,0.10)'} stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ t, dark }: { t: Testimonial; dark: boolean }) => (
  <div style={{
    background: dark
      ? 'linear-gradient(135deg, #1A3A4E 0%, #0D2035 100%)'
      : 'linear-gradient(135deg, #0D1B2E 0%, #111C2E 100%)',
    border: dark
      ? '1px solid rgba(59,130,246,0.22)'
      : '1px solid rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: '22px 20px 18px',
    boxShadow: dark
      ? '0 8px 32px rgba(10,20,40,0.4), 0 0 0 1px rgba(59,130,246,0.10)'
      : '0 4px 24px rgba(2,6,20,0.3)',
    maxWidth: 300,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,
  }}>
    {/* Top accent bar */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 2,
      background: dark
        ? 'linear-gradient(90deg, #3B82F6, rgba(59,130,246,0))'
        : 'linear-gradient(90deg, rgba(255,255,255,0.12), transparent)',
    }} />

    {/* Quote watermark */}
    <div style={{
      position: 'absolute', top: 10, right: 14,
      fontSize: 56, lineHeight: 1, fontFamily: 'Georgia, serif',
      color: dark ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.05)',
      userSelect: 'none', pointerEvents: 'none',
    }}>
      "
    </div>

    <StarRating rating={t.rating} />

    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 13, lineHeight: 1.75,
      color: dark ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.52)',
      marginBottom: 18, fontStyle: 'italic', position: 'relative',
    }}>
      "{t.text}"
    </p>

    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      paddingTop: 14,
      borderTop: dark
        ? '1px solid rgba(59,130,246,0.12)'
        : '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Avatar */}
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: dark
          ? 'linear-gradient(135deg, #2D5F7C, #1A3A4E)'
          : 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(45,95,124,0.4))',
        border: dark
          ? '1.5px solid rgba(59,130,246,0.3)'
          : '1.5px solid rgba(255,255,255,0.10)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
          {t.name.charAt(0)}
        </span>
      </div>
      <div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, lineHeight: 1.2,
          color: '#FFFFFF',
        }}>
          {t.name}
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 10, lineHeight: 1.4,
          color: dark ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.30)',
          letterSpacing: '0.01em',
        }}>
          {t.role}{t.company ? ` · ${t.company}` : ''}{t.city ? ` · ${t.city}` : ''}
        </div>
      </div>
    </div>
  </div>
);
