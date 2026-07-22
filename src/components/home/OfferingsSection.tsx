import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import prepressImage from '@/assets/optimized/offering-prepress.webp';
import pressImage from '@/assets/optimized/offering-press.webp';
import postpressImage from '@/assets/optimized/offering-postpress.webp';
import corrugationImage from '@/assets/optimized/offering-corrugation.webp';

const categories = [
  {
    id: 'pre-press',
    number: '01',
    name: 'Pre-Press',
    kicker: 'Prepare with precision',
    description: 'Plate imaging, exposure and processing systems that make every production run press-ready.',
    image: prepressImage,
    accent: '#8B5CF6',
    glow: 'rgba(139,92,246,0.24)',
  },
  {
    id: 'press',
    number: '02',
    name: 'Press',
    kicker: 'Put ideas into production',
    description: 'Offset and variable-data machinery engineered for dependable commercial print output at scale.',
    image: pressImage,
    accent: '#3B82F6',
    glow: 'rgba(59,130,246,0.26)',
  },
  {
    id: 'post-press',
    number: '03',
    name: 'Post-Press',
    kicker: 'Finish every detail',
    description: 'Cutting, binding, lamination, card processing and finishing solutions that turn print into a finished product.',
    image: postpressImage,
    accent: '#06B6D4',
    glow: 'rgba(6,182,212,0.24)',
  },
  {
    id: 'corrugation',
    number: '04',
    name: 'Corrugation',
    kicker: 'Built for packaging volume',
    description: 'Corrugating, laminating, cutting and handling equipment for consistent packaging production.',
    image: corrugationImage,
    accent: '#22C55E',
    glow: 'rgba(34,197,94,0.22)',
  },
];

const OfferingsSection = () => (
  <section id="offerings" className="relative overflow-clip bg-[#050810]">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.14),transparent_28%)]" />

    <div className="relative mx-auto max-w-7xl px-6 pt-16 text-center sm:px-8 sm:pt-20">
      <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-blue-400">
        Complete print workflow
      </p>
      <h2 className="mx-auto mt-5 max-w-4xl font-serif text-4xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
        Your complete print floor. One trusted partner.
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
        Scroll through the production journey, from plate preparation to packaging.
      </p>
    </div>

    <ScrollStack
      className="scroll-stack-window mx-auto max-w-[1500px]"
      itemDistance={105}
      itemScale={0.03}
      itemStackDistance={24}
      stackPosition="11%"
      scaleEndPosition="5%"
      baseScale={0.9}
      rotationAmount={0}
      blurAmount={0.2}
      useWindowScroll
    >
      {categories.map((category) => (
        <ScrollStackItem key={category.id}>
          <article
            className="group relative grid min-h-[min(700px,76vh)] grid-cols-1 overflow-hidden rounded-[36px] border border-white/[0.08] bg-[#0a101b] lg:grid-cols-[0.86fr_1.14fr]"
            style={{
              backgroundImage: `radial-gradient(circle at 16% 20%, ${category.glow}, transparent 34%)`,
            }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[0.16em] -left-[0.03em] select-none text-[clamp(11rem,26vw,25rem)] font-extrabold leading-none tracking-[-0.1em] text-white/[0.025]"
            >
              {category.number}
            </span>

            <div className="relative z-10 flex flex-col justify-between p-7 sm:p-12 lg:p-16">
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-[0.3em]"
                  style={{ color: category.accent }}
                >
                  {category.kicker}
                </span>
              </div>

              <div className="py-10 lg:py-0">
                <h3 className="text-5xl font-extrabold leading-[0.88] tracking-[-0.065em] text-white sm:text-7xl xl:text-8xl">
                  {category.name}
                </h3>
                <p className="mt-6 max-w-lg text-sm leading-7 text-white/58 sm:text-base">
                  {category.description}
                </p>
              </div>

              <Link
                to={`/machinery?category=${category.id}`}
                className="inline-flex w-fit items-center gap-3 border border-white/15 bg-white/[0.06] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-white/35 hover:bg-white hover:text-[#07101d]"
              >
                Explore machinery
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative min-h-[340px] overflow-hidden p-3 lg:min-h-full lg:p-5">
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{ background: `radial-gradient(circle at 50% 50%, ${category.glow}, transparent 62%)` }}
              />
              <div className="relative z-[1] h-full overflow-hidden rounded-[28px] bg-[linear-gradient(145deg,#ffffff,#f2f5fa)] shadow-[0_35px_90px_-45px_rgba(0,0,0,0.75)]">
                {category.image && (
                  <img
                    src={category.image}
                    alt={`${category.name} machinery`}
                    className="h-full w-full object-contain p-6 transition-transform group-hover:scale-[1.035] sm:p-10 lg:p-12"
                    style={{
                      transitionDuration: '900ms',
                      transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-24 bg-gradient-to-r from-[#0a101b]/35 to-transparent" />
            </div>
          </article>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  </section>
);

export default OfferingsSection;
