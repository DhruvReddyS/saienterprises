import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Eye, Search } from 'lucide-react';
import { useRef } from 'react';
import Header from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import MachinePreviewModal from '@/components/ui/MachinePreviewModal';
import { GlowCard } from '@/components/ui/spotlight-card';
import { productCategories, Product } from '@/data/products';
import { buildSearchableMachine, searchMachines } from '@/lib/machineSearch';

const postPressGroups = [
  {
    title: 'Cutting / Trimming / Handling',
    ids: [
      'hpm-programmable-paper-cutter-system',
      'hpm-heavy-duty-digital-programmable-paper-cutter',
      'pile-turner',
      'pile-lifter',
      'automatic-feeding-three-knife-trimmer',
      'semi-automatic-three-knife-trimmer',
      'knife-grinding-machine',
    ],
  },
  {
    title: 'Printing / Decorative / Specialty Finishing',
    ids: [
      'screen-printing-machine',
      'book-edge-gilding-machine',
      'cylindrical-round-box-making-machine',
    ],
  },
  {
    title: 'Rigid Box Machines',
    ids: [
      'automatic-rigid-box-making-machine',
      'automatic-notching-grooving-machine',
      'corner-pasting-machine',
      'box-forming-machine',
      'automatic-gluing-machine',
      'board-cutter',
      'spine-board-cutter',
      'board-to-board-pasting-machine',
    ],
  },
  {
    title: 'Book Binding / Case Making / Book Finishing',
    ids: [
      'twin-corner-cutting',
      'perfect-binder',
      'semi-automatic-case-maker',
      'paper-board-knurling-embossing-machine',
      'semi-automatic-case-maker-active-dual',
      'book-block-casing-in-plus',
      'joint-forming',
      'sewing-machine',
      'nipping-smashing-machine',
      'twin-book-press',
      'passport-sewing-machine',
      'passport-book-center-sewing-machine',
      'stitching',
      'book-back-glueing-and-drying-machine',
      'book-back-rounding',
    ],
  },
  {
    title: 'Lamination / Coating',
    ids: [
      'thermal-water-base-laminator-with-sheeter',
      'automatic-reel-to-sheet-separator',
      'strip-gumming-water-based-laminator',
      'water-base-double-side-laminator',
      'digital-heavy-duty-thermal-lamination-machine',
      'uv-aqua-coater-with-drier',
      'two-color-uv-conversion',
    ],
  },
  {
    title: 'Punching / Wire / Spiral / Miscellaneous',
    ids: [
      'power-punching-machine',
      'automatic-wire-o-binding-machine',
      'power-driven-wire-o-closing',
      'automatic-paper-punching-machine',
      'automatic-spiral-binding-machine',
      'drilling-machine',
      'paper-shredding-machine',
      'cardboard-shredding-machine',
      'paper-baling-machine',
      'automatic-eyelet-punching-machine',
      'envelope-punching-machine',
      'roller-pressing-machine',
      'label-punching-machine',
      'slant-die-cutting-machine',
      'sticky-memo-pad-gluing-machine',
    ],
  },
];

const CATEGORY_GLOW: Record<string, 'blue' | 'purple' | 'green' | 'orange'> = {
  'pre-press': 'purple',
  press: 'blue',
  'post-press': 'blue',
  corrugation: 'green',
  allied: 'orange',
};

const MachineryCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const heroRef = useRef<HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  const normalizedSlug = categorySlug === 'hlm' || categorySlug === 'hpm' ? 'post-press' : categorySlug;
  const category = productCategories.find(c => c.slug === normalizedSlug);
  const activeCategorySlug = category?.slug ?? normalizedSlug ?? '';

  const categorySearchMachines = useMemo(
    () =>
      category
        ? category.products.map((product) =>
            buildSearchableMachine(product, category.name, category.slug, category.heroImage),
          )
        : [],
    [category],
  );

  const activeProducts = useMemo(
    () =>
      !searchQuery.trim()
        ? categorySearchMachines
        : searchMachines(searchQuery, categorySearchMachines, categorySearchMachines.length).map((item) => item.machine),
    [categorySearchMachines, searchQuery],
  );

  useEffect(() => {
    const previewId = searchParams.get('preview');
    if (!previewId || !category) return;

    if (selectedProduct?.id === previewId && isModalOpen) return;

    const previewProduct = category.products.find((product) => product.id === previewId);
    if (!previewProduct) return;

    const previewIndex = activeProducts.findIndex((product) => product.id === previewId);
    setSelectedProduct(previewProduct);
    setSelectedIndex(previewIndex >= 0 ? previewIndex : 0);
    setIsModalOpen(true);
  }, [searchParams, category, activeProducts, selectedProduct, isModalOpen]);

  if (!category) {
    return (
      <PageTransition>
        <Header />
        <main className="pt-32 pb-20 px-8 md:px-16 lg:px-24 min-h-screen">
          <h1 className="text-3xl text-foreground mb-4 font-serif">Category not found</h1>
          <Link to="/machinery" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Machinery
          </Link>
        </main>
        <CinematicFooter />
      </PageTransition>
    );
  }

  const handleOpenPreview = (product: Product, index: number) => {
    setSelectedProduct(product);
    setSelectedIndex(index);
    setIsModalOpen(true);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('preview', product.id);
    setSearchParams(nextParams, { replace: true });
  };

  const handleNext = () => {
    if (activeProducts.length === 0) return;
    const nextIndex = (selectedIndex + 1) % activeProducts.length;
    setSelectedProduct(activeProducts[nextIndex]);
    setSelectedIndex(nextIndex);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('preview', activeProducts[nextIndex].id);
    setSearchParams(nextParams, { replace: true });
  };

  const handlePrev = () => {
    if (activeProducts.length === 0) return;
    const prevIndex = selectedIndex === 0 ? activeProducts.length - 1 : selectedIndex - 1;
    setSelectedProduct(activeProducts[prevIndex]);
    setSelectedIndex(prevIndex);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('preview', activeProducts[prevIndex].id);
    setSearchParams(nextParams, { replace: true });
  };

  const isPostPress = category.id === 'post-press';
  const groupedPostPress = isPostPress
    ? postPressGroups
        .map((group) => ({
          ...group,
          products: activeProducts.filter((product) => group.ids.includes(product.id)),
        }))
        .filter((group) => group.products.length > 0)
    : [];

  const groupedIds = new Set(groupedPostPress.flatMap((group) => group.products.map((product) => product.id)));
  const uncategorizedPostPress = isPostPress
    ? activeProducts.filter((product) => !groupedIds.has(product.id))
    : [];

  const productActiveIndex = (productId: string) =>
    Math.max(
      0,
      activeProducts.findIndex((product) => product.id === productId)
    );

  const renderProductCard = (product: Product, index: number) => {
    const sizeCount = product.sizes?.length ?? 0;
    const featureCount = product.features?.length ?? 0;
    const glowColor = CATEGORY_GLOW[activeCategorySlug] ?? 'blue';
    const quickStat =
      sizeCount > 0
        ? `${sizeCount} size${sizeCount > 1 ? 's' : ''} available`
        : featureCount > 0
          ? `${featureCount} feature${featureCount > 1 ? 's' : ''} listed`
          : 'Open the machine preview';

    return (
      <motion.article
        key={product.id}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: Math.min(index, 8) * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="group"
      >
        <GlowCard
          glowColor={glowColor}
          customSize
          className="h-full w-full gap-0 rounded-[28px] border-white/70 bg-white/85 p-0 shadow-[0_30px_70px_-48px_rgba(15,23,42,0.22)] backdrop-blur-[14px]"
        >
          <motion.div
            className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.02))]"
            onClick={() => handleOpenPreview(product, index)}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={product.image || category.heroImage}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/16 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-foreground/28 to-transparent" />

            <div className="absolute left-4 top-4 rounded-full border border-background/16 bg-background/10 px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-background/72 backdrop-blur-sm">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="absolute right-4 top-4 rounded-full border border-background/16 bg-background/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-background/78 backdrop-blur-sm">
              Preview
            </div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.div
                initial={{ scale: 0.84 }}
                whileHover={{ scale: 1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 shadow-lg"
              >
                <Eye className="h-7 w-7 text-primary-foreground" />
              </motion.div>
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-background/56">{category.name}</p>
              <motion.h3 className="mt-2 font-serif text-xl sm:text-2xl text-background leading-tight">
                {product.name}
              </motion.h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-background/68 line-clamp-2">
                {product.description}
              </p>
            </div>
          </motion.div>

          <div className="border-t border-border bg-[linear-gradient(180deg,rgba(15,23,42,0.01),rgba(15,23,42,0.06))] p-5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-border bg-background px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {quickStat}
              </span>
              {product.applications?.[0] && (
                <span className="rounded-full border border-border bg-background px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {product.applications[0]}
                </span>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">Open the quick machine preview</span>
              <button
                type="button"
                onClick={() => handleOpenPreview(product, index)}
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-primary/80"
              >
                Open preview
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </GlowCard>
      </motion.article>
    );
  };

  return (
    <PageTransition>
      <ScrollProgress />
      <Header />
      
      <main className="bg-background">
        {/* Hero */}
        <section ref={heroRef} className="relative min-h-[44vh] flex items-center justify-center border-b border-border/60 bg-[radial-gradient(circle_at_top_left,rgba(210,160,78,0.12),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.04),rgba(15,23,42,0))] overflow-hidden">
          {category.heroImage && (
            <div className="absolute inset-0 pointer-events-none">
              <img
                src={category.heroImage}
                alt={category.name}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover opacity-[0.12]"
              />
            </div>
          )}

          <motion.div 
            className="relative text-center px-6 sm:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16"
            style={{ opacity: heroOpacity, y: heroY }}
          >
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6"
            >
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link to="/machinery" className="hover:text-foreground transition-colors">Machinery</Link>
              <span>/</span>
              <span className="text-foreground">{category.name}</span>
            </motion.nav>

            <motion.span
              className="inline-flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-8 h-px bg-primary" />
              {category.products.length} Machines
              <span className="w-8 h-px bg-primary" />
            </motion.span>

            <motion.h1 
              className="text-foreground text-4xl sm:text-5xl md:text-6xl font-serif leading-tight mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {category.name}
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {category.description}
            </motion.p>
          </motion.div>
        </section>

        <section className="border-y border-border/60 bg-primary/[0.05] px-6 sm:px-8 md:px-16 lg:px-24 py-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="caption mb-1">Machinery Categories</p>
              <p className="text-sm text-muted-foreground">
                Switch categories quickly or continue through the complete machine listing below.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {productCategories.map((item) => (
                <Link
                  key={item.id}
                  to={`/machinery/${item.slug}`}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                    item.id === category.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-foreground hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className={item.id === category.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}>
                    {item.products.length}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-4">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by machine name, feature, size, specification, application..."
                className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus:border-primary/50"
              />
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Showing {activeProducts.length} of {category.products.length} machines
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 sm:py-28 px-6 sm:px-8 md:px-16 lg:px-24 bg-transparent">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                Machine previews.
              </h2>
            </motion.div>

            {isPostPress ? (
              <div className="space-y-10">
                {groupedPostPress.map((group, groupIndex) => (
                  <div key={group.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: groupIndex * 0.04 }}
                      className="mb-5 border-b border-border pb-3"
                    >
                      <h3 className="font-serif text-2xl sm:text-3xl text-foreground">{group.title}</h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {group.products.length} machines
                      </p>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {group.products.map((product) => renderProductCard(product, productActiveIndex(product.id)))}
                    </div>
                  </div>
                ))}

                {uncategorizedPostPress.length > 0 && (
                  <div>
                    <div className="mb-5 border-b border-border pb-3">
                      <h3 className="font-serif text-2xl sm:text-3xl text-foreground">Additional Machines</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {uncategorizedPostPress.map((product) => renderProductCard(product, productActiveIndex(product.id)))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {activeProducts.map((product, index) => renderProductCard(product, index))}
              </div>
            )}
            {activeProducts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-secondary/20 p-8 text-center">
                <p className="font-serif text-2xl text-foreground">No machines found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try a different keyword, feature, size, or specification term.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 px-6 sm:px-8 md:px-16 lg:px-24 bg-primary/[0.06]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-foreground mb-4 text-2xl sm:text-3xl font-serif">
              Need help selecting the right machine?
            </h3>
            <p className="text-muted-foreground mb-8">
              Contact our team for technical and commercial guidance on {category.name.toLowerCase()} machinery.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 hover:bg-primary/90 transition-colors group rounded-full"
              >
                <span className="font-medium">Request Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <CinematicFooter />

      {/* Preview Modal */}
      <MachinePreviewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
          const nextParams = new URLSearchParams(searchParams);
          nextParams.delete('preview');
          setSearchParams(nextParams, { replace: true });
        }}
        product={selectedProduct}
        categorySlug={activeCategorySlug}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={activeProducts.length > 1}
        hasPrev={activeProducts.length > 1}
      />
    </PageTransition>
  );
};

export default MachineryCategory;
