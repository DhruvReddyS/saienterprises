import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import { productCategories } from '@/data/products';
import { matchesMachineSearch } from '@/lib/machineSearch';

const categoryPalette: Record<string, string> = {
  'pre-press': 'from-sky-500/15 to-cyan-400/5',
  press: 'from-blue-500/15 to-indigo-400/5',
  'post-press': 'from-cyan-500/15 to-blue-400/5',
  corrugation: 'from-teal-500/15 to-sky-400/5',
  allied: 'from-sky-400/15 to-blue-400/5',
};

const MachineryHub = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchableMachines = useMemo(
    () =>
      productCategories.flatMap((category) =>
        category.products.map((product) => ({
          ...product,
          categoryName: category.name,
          categorySlug: category.slug,
          categoryHeroImage: category.heroImage,
        }))
      ),
    []
  );

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchableMachines
      .filter((machine) => matchesMachineSearch(machine, searchQuery, machine.categoryName))
      .slice(0, 18);
  }, [searchQuery, searchableMachines]);

  return (
    <PageTransition>
      <ScrollProgress />
      <Header />

      <main className="bg-background">
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-14 px-5 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-b from-primary/[0.08] via-background to-background border-b border-border/60">
          <div className="max-w-7xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-4"
            >
              <span className="h-px w-8 bg-primary" />
              Machinery Catalogue
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-serif text-[2.3rem] sm:text-[2.9rem] lg:text-[3.4rem] leading-[0.95] text-foreground max-w-4xl"
            >
              Find the right machine quickly,
              <span className="text-primary italic"> with clean category navigation.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed"
            >
              Browse pre-press, press, post-press, corrugation machinery, and allied consumables with brochure-aligned details.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="mt-7 relative max-w-2xl"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by machine, feature, size, or specification..."
                className="w-full rounded-full border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50"
              />
            </motion.div>

            {searchQuery.trim() && (
              <div className="mt-5">
                <p className="mb-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Found {searchResults.length} results
                </p>
                {searchResults.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {searchResults.map((machine) => (
                      <Link
                        key={`${machine.categorySlug}-${machine.id}`}
                        to={`/machinery/${machine.categorySlug}/${machine.id}`}
                        className="group overflow-hidden rounded-2xl border border-border bg-background hover:border-primary/40 transition-colors"
                      >
                        <div className="aspect-[16/10] overflow-hidden bg-secondary/30">
                          <img
                            src={machine.image || machine.categoryHeroImage}
                            alt={machine.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-primary mb-1">{machine.categoryName}</p>
                          <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors leading-tight">
                            {machine.name}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-border bg-background p-6 text-center">
                    <p className="font-serif text-2xl text-foreground">No machines found</p>
                    <p className="mt-2 text-sm text-muted-foreground">Try another keyword from size, feature, or machine name.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="py-12 sm:py-14 px-5 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/machinery/${category.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-background hover:border-primary/35 transition-colors"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-secondary/30">
                    <img
                      src={category.heroImage}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className={`bg-gradient-to-r ${categoryPalette[category.id] ?? 'from-primary/10 to-primary/0'} p-5`}>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h2 className="font-serif text-3xl leading-tight text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h2>
                      <span className="rounded-full border border-border bg-background px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {category.products.length}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{category.description}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-primary font-medium">
                      View Category
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default MachineryHub;
