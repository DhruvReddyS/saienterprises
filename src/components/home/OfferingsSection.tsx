import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import { productCategories } from '@/data/products';
import prepressImage from '@/assets/optimized/offering-prepress.webp';
import pressImage from '@/assets/optimized/offering-press.webp';
import postpressImage from '@/assets/optimized/offering-postpress.webp';
import corrugationImage from '@/assets/optimized/offering-corrugation.webp';

const countFor = (slug: string) =>
  productCategories.find((c) => c.slug === slug)?.products.length ?? 0;

const categories = [
  {
    id: 'pre-press',
    count: countFor('pre-press'),
    number: '01',
    name: 'Pre-Press',
    kicker: 'Prepare with precision',
    description: 'Plate imaging, exposure and processing systems that make every production run press-ready.',
    image: prepressImage,
    accent: '#6366F1',
    glow: 'rgba(99,102,241,0.24)',
  },
  {
    id: 'press',
    count: countFor('press'),
    number: '02',
    name: 'Press',
    kicker: 'Put ideas into production',
    description: 'Offset and variable-data machinery engineered for dependable commercial print output at scale.',
    image: pressImage,
    accent: '#2E90FF',
    glow: 'rgba(46,144,255,0.26)',
  },
  {
    id: 'post-press',
    count: countFor('post-press'),
    number: '03',
    name: 'Post-Press',
    kicker: 'Finish every detail',
    description: 'Cutting, binding, lamination, card processing and finishing solutions that turn print into a finished product.',
    image: postpressImage,
    accent: '#0EA5E9',
    glow: 'rgba(14,165,233,0.24)',
  },
  {
    id: 'corrugation',
    count: countFor('corrugation'),
    number: '04',
    name: 'Corrugation',
    kicker: 'Built for packaging volume',
    description: 'Corrugating, laminating, cutting and handling equipment for consistent packaging production.',
    image: corrugationImage,
    accent: '#14B8A6',
    glow: 'rgba(20,184,166,0.22)',
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
      blurAmount={0}
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
              className="pointer-events-none absolute -bottom-[0.16em] -left-[0.03em] select-none text-[clamp(11rem,26vw,25rem)] font-extrabold leading-none tracking-[-0.06em] text-white/[0.03]"
            >
              {category.number}
            </span>

            <div className="relative z-10 flex flex-col justify-between p-7 sm:p-12 lg:p-16">
              <div>
                <span
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.26em]"
                  style={{ color: category.accent }}
                >
                  {category.kicker}
                </span>
              </div>

              <div className="py-10 lg:py-0">
                <h3 className="whitespace-nowrap font-serif text-[2.6rem] font-bold leading-[0.9] tracking-[-0.045em] text-white sm:text-6xl xl:text-7xl">
                  {category.name}
                </h3>
                <p className="mt-6 max-w-md text-sm leading-7 text-white/60 sm:text-[15px]">
                  {category.description}
                </p>
                {/* Category count: the catalogue's own number, not a claim. */}
                <div className="mt-7 flex items-center gap-3">
                  <span
                    className="font-mono text-[11px] font-bold tracking-[0.18em]"
                    style={{ color: category.accent }}
                  >
                    {String(category.count).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 max-w-[70px] bg-white/15" />
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/40">
                    machines in range
                  </span>
                </div>
              </div>

              <Link
                to={`/machinery?category=${category.id}`}
                className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/[0.07] px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white hover:text-[#07101d]"
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
              <div className="relative z-[1] h-full overflow-hidden rounded-[26px] bg-[linear-gradient(160deg,#fbfcfe_0%,#eceff6_55%,#dfe4ee_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_35px_90px_-45px_rgba(2,6,14,0.85)]">
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
                {/* Vignette: settles the bright plate into the dark card. */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[26px]"
                  style={{
                    background:
                      'radial-gradient(ellipse 78% 68% at 50% 46%, transparent 52%, rgba(14,22,38,0.1) 82%, rgba(14,22,38,0.2) 100%)',
                    boxShadow: 'inset 0 0 0 1px rgba(13,20,33,0.07)',
                  }}
                />
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
