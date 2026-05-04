import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, FileText, MessageSquareMore } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import { productCategories } from '@/data/products';
import {
  getMachineCommercialTags,
  getMachineEnquiryMessage,
  getMachineHighlights,
  getMachineNarrative,
  getMachinePreviewNote,
  getMachinePrimaryStats,
  getRecommendationReason,
} from '@/lib/machineContent';
import { buildSearchableMachine, flattenMachines, recommendMachines } from '@/lib/machineSearch';
import { getMachineProfile } from '@/lib/machineProfile';

const ProductDetail = () => {
  const { categorySlug, productId } = useParams<{ categorySlug: string; productId: string }>();

  const category = productCategories.find((item) => item.slug === categorySlug);
  const product = category?.products.find((item) => item.id === productId);

  if (!category || !product) {
    return (
      <PageTransition>
        <Header />
        <main className="min-h-screen bg-background pt-32 pb-20 px-8 md:px-16 lg:px-24">
          <h1 className="mb-4 text-3xl text-foreground">Machine not found</h1>
          <Link
            to="/machinery"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Machinery
          </Link>
        </main>
        <Footer />
      </PageTransition>
    );
  }

  const profile = getMachineProfile(product, category.name, category.slug);
  const searchableProduct = buildSearchableMachine(product, category.name, category.slug, category.heroImage);
  const relatedProducts = recommendMachines(searchableProduct, flattenMachines(productCategories), 6);
  const primaryStats = getMachinePrimaryStats(product, category.name, category.slug);
  const narrative = getMachineNarrative(product, category.name, category.slug);
  const highlights = getMachineHighlights(product, category.name, category.slug);
  const commercialTags = getMachineCommercialTags(product, category.name, category.slug);
  const enquiryHref = `/contact?${new URLSearchParams({
    category: category.name,
    machine: product.name,
    message: getMachineEnquiryMessage(product, category.name),
  }).toString()}`;

  const informationSections = [
    product.specifications && Object.keys(product.specifications).length > 0
      ? {
          title: 'Technical Details',
          content: (
            <div className="grid gap-3">
              {Object.entries(product.specifications).map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-1 rounded-2xl bg-background px-4 py-3 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-center"
                >
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
          ),
        }
      : null,
    product.sizes?.length
      ? {
          title: 'Available Sizes',
          content: (
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground"
                >
                  {size}
                </span>
              ))}
            </div>
          ),
        }
      : null,
    product.applications?.length
      ? {
          title: 'Applications',
          content: (
            <div className="flex flex-wrap gap-2.5">
              {product.applications.map((application) => (
                <span
                  key={application}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {application}
                </span>
              ))}
            </div>
          ),
        }
      : null,
  ].filter(Boolean) as Array<{ title: string; content: JSX.Element }>;

  return (
    <PageTransition>
      <ScrollProgress />
      <Header />

      <main className="bg-background">
        <section className="border-b border-border/60 bg-primary/[0.04] pt-24 sm:pt-28">
          <div className="container-editorial pb-6">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-foreground">Home</Link>
              <span>/</span>
              <Link to="/machinery" className="transition-colors hover:text-foreground">Machinery</Link>
              <span>/</span>
              <Link to={`/machinery/${category.slug}`} className="transition-colors hover:text-foreground">
                {category.name}
              </Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </section>

        <section className="px-6 py-12 sm:px-8 md:px-12 lg:px-16 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div className="overflow-hidden rounded-[28px] bg-secondary/40 p-3 shadow-[0_28px_72px_-44px_rgba(13,22,40,0.32)]">
                <div className="overflow-hidden rounded-[22px] bg-background">
                  <img
                    src={product.image || category.heroImage}
                    alt={product.name}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[22px] bg-secondary/35 px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Brand Family</p>
                  <p className="mt-2 text-base font-semibold text-foreground">{profile.brand}</p>
                </div>
                <div className="rounded-[22px] bg-secondary/35 px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Best Fit</p>
                  <p className="mt-2 text-base font-semibold text-foreground">{profile.subcategory}</p>
                </div>
                <div className="rounded-[22px] bg-secondary/35 px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Brochure Status</p>
                  <p className="mt-2 text-base font-semibold text-foreground">{profile.brochureStatus}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex flex-col rounded-[28px] bg-secondary/25 p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {category.name}
                  </span>
                  <span className="rounded-full bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {profile.subcategory}
                  </span>
                </div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/45">
                  {profile.brand}
                </span>
              </div>

              <h1 className="mt-5 text-foreground">{product.name}</h1>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {product.description}
              </p>

              <div className="mt-7 grid gap-px overflow-hidden rounded-[22px] bg-border/70 sm:grid-cols-2">
                {primaryStats.map((stat) => (
                  <div key={stat.label} className="bg-background px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 text-xl font-semibold text-foreground">{stat.value}</p>
                    {stat.meta ? <p className="mt-1 text-xs text-muted-foreground">{stat.meta}</p> : null}
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <p className="caption">Machine Overview</p>
                {narrative.map((line) => (
                  <div key={line} className="flex items-start gap-3 rounded-[20px] bg-background px-4 py-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{line}</p>
                  </div>
                ))}
              </div>

              {highlights.length > 0 ? (
                <div className="mt-8">
                  <p className="caption mb-3">Industrial Advantages</p>
                  <div className="flex flex-wrap gap-2.5">
                    {highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <Link
                  to={enquiryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-[18px] bg-primary px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Enquire Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/brochure"
                  className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-border bg-background px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:border-primary/35 hover:text-primary"
                >
                  Open Brochure
                  <FileText className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-12 sm:px-8 md:px-12 lg:px-16 lg:pb-16">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-6">
              {informationSections.length > 0 ? (
                informationSections.map((section) => (
                  <div key={section.title} className="rounded-[28px] bg-secondary/25 p-6 sm:p-7">
                    <p className="caption mb-4">{section.title}</p>
                    {section.content}
                  </div>
                ))
              ) : (
                <div className="rounded-[28px] bg-secondary/25 p-6 sm:p-7">
                  <p className="caption mb-4">Brochure Context</p>
                  <div className="space-y-3">
                    {narrative.slice(0, 4).map((line) => (
                      <p key={line} className="text-sm leading-relaxed text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="rounded-[28px] bg-foreground px-6 py-7 text-background">
              <p className="text-[10px] uppercase tracking-[0.18em] text-background/55">Commercial Summary</p>
              <h3 className="mt-3 text-3xl text-background">Talk to Sai Enterprises about the right configuration.</h3>
              <p className="mt-4 text-sm leading-relaxed text-background/72">
                Use the enquiry route to confirm suitable sizes, line compatibility, support expectations, and commercial guidance for this machine.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {commercialTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-background/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-background/78"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={enquiryHref}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-[18px] bg-background px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-background/90"
              >
                Contact for This Machine
                <MessageSquareMore className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </section>

        {relatedProducts.length > 0 ? (
          <section className="bg-primary/[0.05] px-6 py-12 sm:px-8 md:px-12 lg:px-16 lg:py-16">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="caption mb-2">Recommended Machines</p>
                  <h2 className="text-foreground">Related options with closer workflow fit.</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    These recommendations are based on category proximity, subcategory alignment, shared brochure details, and adjacent production use cases.
                  </p>
                </div>
                <Link to="/machinery" className="btn-quiet text-sm">
                  Browse catalogue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {relatedProducts.map(({ machine }) => (
                  <Link
                    key={`${machine.categorySlug}-${machine.id}`}
                    to={`/machinery/${machine.categorySlug}/${machine.id}`}
                    className="group overflow-hidden rounded-[26px] bg-background p-3 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <div className="overflow-hidden rounded-[20px] bg-secondary/35">
                      <img
                        src={machine.image || machine.categoryHeroImage}
                        alt={machine.name}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="px-2 pb-2 pt-5">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-secondary px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-primary">
                          {machine.categoryName}
                        </span>
                        <span className="rounded-full bg-secondary px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          {getRecommendationReason(
                            product,
                            category.name,
                            category.slug,
                            machine,
                            machine.categoryName,
                            machine.categorySlug,
                          )}
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl leading-tight text-foreground transition-colors group-hover:text-primary">
                        {machine.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {getMachinePreviewNote(machine, machine.categoryName, machine.categorySlug)}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {getMachineCommercialTags(machine, machine.categoryName, machine.categorySlug)
                          .slice(0, 2)
                          .map((tag) => (
                            <span key={tag} className="rounded-full bg-primary/[0.08] px-3 py-1.5 text-xs text-foreground">
                              {tag}
                            </span>
                          ))}
                      </div>

                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        View machine
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </PageTransition>
  );
};

export default ProductDetail;
