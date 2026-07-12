import {
  StaggerTestimonials,
  type StaggerTestimonial,
} from '@/components/ui/stagger-testimonials';

const testimonials: StaggerTestimonial[] = [
  {
    id: 1,
    testimonial:
      'Most trustworthy supplier. Their professionalism and reliability are unmatched in the industry.',
    name: 'Nagulagam Jayendra',
    role: 'Director',
    company: 'Printfast Zambia Limited',
    city: 'Lusaka',
    imgSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300',
  },
  {
    id: 2,
    testimonial:
      'Very happy with the HPM cutting machine. The proactive service team is always there when we need them.',
    name: 'Varun Thomas',
    role: 'Director',
    company: 'Anaswara Offset Pvt Ltd',
    city: 'Kochi',
    imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
  },
  {
    id: 3,
    testimonial:
      'Very good after-sales service by Team Sai. They go beyond expectations to keep production running smoothly.',
    name: 'Dayaker Reddy S',
    role: 'Managing Director',
    company: 'Sai Enterprises',
    city: 'Hyderabad',
    imgSrc: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300',
  },
  {
    id: 4,
    testimonial:
      'A quick solution centre with exceptional response times, our go-to partner for machinery support.',
    name: 'Pranith Reddy',
    role: 'Managing Director',
    company: 'Digiprint Systems (U) Ltd',
    city: 'Kampala',
    imgSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300',
  },
  {
    id: 5,
    testimonial:
      'The HPM paper cutter is an industry benchmark. Everything was seamless, from selection to installation.',
    name: 'Ravi Shankar',
    role: 'Production Manager',
    company: 'Offset Solutions',
    city: 'Chennai',
    imgSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300',
  },
  {
    id: 6,
    testimonial:
      'Their experience shows in every interaction. The machinery knowledge and long-term commitment are second to none.',
    name: 'Meena Kumari',
    role: 'CEO',
    company: 'PrintMaster India',
    city: 'Bengaluru',
    imgSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300',
  },
  {
    id: 7,
    testimonial:
      'From pre-press to post-press, Sai is our one-stop partner for machinery requirements across our plants.',
    name: 'Arjun Mehta',
    role: 'Operations Director',
    company: 'Colour Graphics',
    city: 'Mumbai',
    imgSrc: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300',
  },
];

const TestimonialsSection = () => (
  <section className="relative overflow-hidden bg-[linear-gradient(180deg,#050810,#091426_48%,#050810)] py-16 sm:py-20">
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_70%_at_center,black,transparent)]" />
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[110px]" />

    <header className="relative z-10 mx-auto max-w-3xl px-6 text-center">
      <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-blue-300">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
        Client stories
      </div>
      <h2 className="mt-6 font-serif text-4xl leading-[0.95] text-white sm:text-6xl">
        Trusted on the production floor.
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
        Partnerships measured in uptime, dependable machinery and support that stays after installation.
      </p>
    </header>

    <div className="relative mx-auto mt-4 max-w-[1500px]">
      <StaggerTestimonials testimonials={testimonials} />
    </div>
  </section>
);

export default TestimonialsSection;
