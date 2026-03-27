import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import brochurePdf from '@/assets/Sai Enterprises-2026.pdf';
import { productCategories } from '@/data/products';
import { Link } from 'react-router-dom';
import { getAllMachineImages } from '@/data/machineAssets';

const BrochurePage = () => {
  const brochureImages = getAllMachineImages();

  return (
    <PageTransition>
      <ScrollProgress />
      <Header />

      <main className="bg-gradient-to-b from-primary/[0.08] via-background to-background">
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-10 px-5 sm:px-8 md:px-14 lg:px-20 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-5"
            >
              <span className="w-8 h-px bg-primary" />
              E-Brochure
              <span className="w-8 h-px bg-primary" />
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="font-serif text-[2.2rem] sm:text-[2.8rem] lg:text-[3.3rem] leading-[0.95] text-foreground mb-4"
            >
              Sai Enterprises Full Catalogue
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-6"
            >
              View the complete brochure in full-screen style and jump directly into category pages for faster machine discovery.
            </motion.p>

            <div className="flex flex-wrap gap-3">
              <a
                href={brochurePdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Open Full Brochure
              </a>
              <a
                href={brochurePdf}
                download="Sai-Enterprises-Catalogue-2026.pdf"
                className="inline-flex items-center rounded-full border border-border bg-background px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground hover:border-primary/30 hover:text-primary transition-colors"
              >
                Download PDF
              </a>
            </div>
          </div>
        </section>

        <section className="px-5 sm:px-8 md:px-14 lg:px-20 xl:px-24 pb-8">
          <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden border border-border bg-background shadow-[0_20px_70px_-45px_rgba(19,72,160,0.35)]">
            <iframe
              src={brochurePdf}
              title="Sai Enterprises E-Brochure"
              className="w-full h-[72vh] sm:h-[78vh] lg:h-[82vh]"
            />
          </div>
        </section>

        <section className="px-5 sm:px-8 md:px-14 lg:px-20 xl:px-24 pb-16">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Explore By Category</p>
            <div className="flex flex-wrap gap-2.5">
              {productCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/machinery/${category.slug}`}
                  className="rounded-full border border-border bg-background px-4 py-2 text-xs uppercase tracking-[0.14em] text-foreground hover:border-primary/30 hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 sm:px-8 md:px-14 lg:px-20 xl:px-24 pb-20">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Machine Image Archive</p>
            <h2 className="font-serif text-[1.9rem] sm:text-[2.3rem] text-foreground leading-[0.98] mb-4">
              All brochure machine visuals in one place.
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              This archive includes all machine images from the brochure assets for quick visual browsing.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {brochureImages.map((image) => (
                <div key={`${image.folder}-${image.name}-${image.src}`} className="rounded-2xl border border-border bg-background overflow-hidden">
                  <div className="aspect-[4/3] bg-secondary/20">
                    <img src={image.src} alt={image.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1">{image.folder}</p>
                    <p className="text-sm text-foreground line-clamp-2">{image.name.replace(/-/g, ' ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default BrochurePage;
