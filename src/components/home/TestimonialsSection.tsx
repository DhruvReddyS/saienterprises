import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const testimonials = [
  {
    quote: "Their machinery transformed our production line completely. Quality equipment and exceptional after-sales support that we've never experienced before.",
    author: "Rajesh Kumar",
    designation: "Production Director",
    company: "PrintPro Industries",
    location: "Hyderabad, India",
    rating: 5,
  },
  {
    quote: "We've partnered with Sai Enterprises for over 15 years. Their commitment to quality and service is unmatched in the industry.",
    author: "Mohammed Ali",
    designation: "Managing Director",
    company: "Graphic Solutions Ltd",
    location: "Nairobi, Kenya",
    rating: 5,
  },
  {
    quote: "From consultation to installation, every step was handled with professionalism. Our Heidelberg press runs flawlessly thanks to their expertise.",
    author: "Priya Sharma",
    designation: "Operations Manager",
    company: "Sharma Print Works",
    location: "New Delhi, India",
    rating: 5,
  },
  {
    quote: "The team understood our requirements perfectly and delivered exactly what we needed. Highly recommend their services to anyone in the printing industry.",
    author: "David Ochieng",
    designation: "CEO",
    company: "East Africa Press",
    location: "Mombasa, Kenya",
    rating: 5,
  },
  {
    quote: "Exceptional service and genuine parts. They've been our trusted partner for all our post-press equipment needs.",
    author: "Vikram Patel",
    designation: "Technical Head",
    company: "Patel Packaging",
    location: "Pune, India",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  return (
    <section ref={containerRef} className="relative py-20 sm:py-28 md:py-36 bg-background overflow-hidden">
      {/* Ambient glows */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[400px] rounded-full bg-primary/4 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/3 blur-[100px] pointer-events-none"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <ScrollReveal animation="fadeUp" className="text-center mb-14 sm:mb-18">
            <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-4">
              <span className="w-8 h-px bg-primary" />
              Testimonials
              <span className="w-8 h-px bg-primary" />
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
              What our <span className="text-primary italic">clients</span> say
            </h2>
          </ScrollReveal>

          {/* Testimonial Slider */}
          <ScrollReveal animation="scaleUp" delay={0.1}>
            <div className="relative">
              {/* Main testimonial card */}
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-card border border-border p-8 sm:p-12 md:p-16 shadow-sm overflow-hidden"
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/15 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/15 pointer-events-none" />

                {/* Quote icon */}
                <div className="absolute top-8 right-8 sm:top-12 sm:right-12">
                  <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-primary/8" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6 sm:mb-8">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed mb-8 sm:mb-12 max-w-4xl">
                  "{testimonials[activeIndex].quote}"
                </blockquote>

                {/* Author info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 sm:pt-8 border-t border-border">
                  <div>
                    <p className="font-serif text-xl sm:text-2xl text-foreground mb-1">
                      {testimonials[activeIndex].author}
                    </p>
                    <p className="text-sm text-primary font-medium mb-1">
                      {testimonials[activeIndex].designation}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[activeIndex].company}, {testimonials[activeIndex].location}
                    </p>
                  </div>

                  {/* Navigation arrows */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={handlePrev}
                      className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={handleNext}
                      className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className="relative group p-1"
                  >
                    <span className={`block h-2 rounded-full transition-all duration-500 ${
                      index === activeIndex 
                        ? 'bg-primary w-8' 
                        : 'bg-border hover:bg-muted-foreground w-2'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Auto-play indicator */}
              <motion.p 
                className="text-center text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {isAutoPlaying ? 'Auto-scrolling' : 'Paused'} · {activeIndex + 1} of {testimonials.length}
              </motion.p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
