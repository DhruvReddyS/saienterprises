import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StaggerTestimonial = {
  id: number;
  testimonial: string;
  name: string;
  role: string;
  company: string;
  city?: string;
  imgSrc: string;
};

type TestimonialCardProps = {
  position: number;
  testimonial: StaggerTestimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
};

const TestimonialCard = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}: TestimonialCardProps) => {
  const isCenter = position === 0;
  const horizontalStep = cardSize + 28;

  return (
    <article
      aria-hidden={!isCenter}
      onClick={() => handleMove(position)}
      className={cn(
        'absolute left-1/2 top-1/2 cursor-pointer overflow-hidden rounded-[28px] border p-7 transition-all duration-500 ease-out sm:p-9',
        isCenter
          ? 'z-20 border-blue-400/45 bg-[#101d33] text-white'
          : 'z-0 border-white/10 bg-[#0b121f] text-white/80 hover:border-blue-400/35',
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `
          translate(-50%, -50%)
          translateX(${horizontalStep * position}px)
          translateY(${isCenter ? -38 : 12}px)
          scale(${isCenter ? 1 : 0.86})
        `,
        boxShadow: isCenter
          ? '0 32px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(96,165,250,0.1)'
          : '0 20px 50px rgba(0,0,0,0.28)',
        pointerEvents: Math.abs(position) <= 1 ? 'auto' : 'none',
        opacity: Math.abs(position) > 1 ? 0 : isCenter ? 1 : 0.48,
      }}
    >
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <img
          src={testimonial.imgSrc}
          alt={testimonial.name}
          className="h-16 w-14 border border-white/10 bg-white/5 object-cover object-top shadow-[5px_5px_0_rgba(59,130,246,0.2)]"
          loading="lazy"
          decoding="async"
        />
        <div className="flex gap-1 pt-1 text-amber-300">
          {[0, 1, 2, 3, 4].map((star) => (
            <Star key={star} className="h-3.5 w-3.5 fill-current" />
          ))}
        </div>
      </div>

      <span className="mt-6 block font-serif text-6xl leading-none text-blue-400/25">“</span>
      <blockquote
        className={cn(
          '-mt-4 font-serif font-medium leading-snug',
          isCenter ? 'text-xl text-white sm:text-2xl' : 'text-lg text-white/74 sm:text-xl',
        )}
      >
        {testimonial.testimonial}
      </blockquote>

      <footer className="absolute bottom-7 left-7 right-7 border-t border-white/10 pt-4 sm:bottom-9 sm:left-9 sm:right-9">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">
          {testimonial.name}
        </p>
        <p className="mt-1 text-[11px] leading-5 text-white/45">
          {testimonial.role} · {testimonial.company}
        </p>
        {testimonial.city && (
          <p className="mt-2 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-300/70">
            <MapPin className="h-3 w-3" />
            {testimonial.city}
          </p>
        )}
      </footer>
    </article>
  );
};

type StaggerTestimonialsProps = {
  testimonials: StaggerTestimonial[];
};

export const StaggerTestimonials = ({ testimonials }: StaggerTestimonialsProps) => {
  const [cardSize, setCardSize] = useState(370);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    if (!steps) return;
    const next = [...testimonialsList];

    if (steps > 0) {
      for (let index = steps; index > 0; index -= 1) {
        const item = next.shift();
        if (item) next.push(item);
      }
    } else {
      for (let index = steps; index < 0; index += 1) {
        const item = next.pop();
        if (item) next.unshift(item);
      }
    }
    setTestimonialsList(next);
  };

  useEffect(() => {
    const updateSize = () => setCardSize(window.innerWidth >= 640 ? 370 : 292);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="relative h-[560px] w-full overflow-hidden sm:h-[650px]">
      {testimonialsList.map((testimonial, index) => {
        const position = index - Math.floor(testimonialsList.length / 2);
        return (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:bottom-5">
        <button
          type="button"
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center border border-white/15 bg-[#0b121f] text-white transition-colors hover:border-blue-400/60 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center border border-white/15 bg-[#0b121f] text-white transition-colors hover:border-blue-400/60 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
