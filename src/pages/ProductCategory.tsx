import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Layers, Printer, Scissors } from 'lucide-react';
import Header from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { productCategories } from '@/data/products';
import { GlowCard } from '@/components/ui/spotlight-card';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'pre-press': Layers,
  'press': Printer,
  'post-press': Scissors,
  'corrugation': Package,
};

const categoryGlow: Record<string, 'blue' | 'purple' | 'green' | 'orange'> = {
  'pre-press': 'purple',
  press: 'blue',
  'post-press': 'blue',
  corrugation: 'green',
};

const ProductCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const category = productCategories.find((c) => c.slug === categorySlug);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-wide text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
            <Link to="/#products" className="text-primary hover:underline">
              Back to Products
            </Link>
          </div>
        </main>
        <CinematicFooter />
      </div>
    );
  }

  const Icon = categoryIcons[category.id] || Package;
  const glowColor = categoryGlow[category.id] || 'blue';

  // Group products by category
  const subcategories = category.products.reduce((acc, product) => {
    const sub = product.category || 'General';
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(product);
    return acc;
  }, {} as Record<string, typeof category.products>);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-primary-foreground"
            >
              <Link
                to="/machinery"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Products
              </Link>

              <div className="w-20 h-20 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
                <Icon className="w-10 h-10 text-primary-foreground" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                {category.description}
              </p>
              <p className="mt-4 text-primary-foreground/60">
                {category.products.length} products available
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products by Subcategory */}
        <section className="py-16">
          <div className="container-wide">
            {Object.entries(subcategories).map(([subcategory, products], subIndex) => (
              <motion.div
                key={subcategory}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: subIndex * 0.1 }}
                className="mb-12 last:mb-0"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                  {subcategory}
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product, prodIndex) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: prodIndex * 0.05 }}
                    >
                      <GlowCard
                        glowColor={glowColor}
                        customSize
                        className="h-full w-full rounded-[22px] border-white/70 bg-white/88 p-0 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.24)] backdrop-blur-[12px]"
                      >
                        <Link
                          to={`/machinery/${category.slug}?preview=${product.id}`}
                          className="group block h-full p-5 transition-all duration-300"
                        >
                          <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-secondary/50">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <Package className="h-12 w-12 text-muted-foreground/30 transition-transform duration-300 group-hover:scale-110" />
                              </div>
                            )}
                          </div>

                          <h3 className="mb-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                            {product.name}
                          </h3>

                          {product.description && (
                            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                              {product.description}
                            </p>
                          )}

                          {product.sizes && product.sizes.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {product.sizes.slice(0, 3).map((size) => (
                                <span
                                  key={size}
                                  className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary"
                                >
                                  {size}
                                </span>
                              ))}
                              {product.sizes.length > 3 && (
                                <span className="px-2 py-0.5 text-xs text-muted-foreground">
                                  +{product.sizes.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </Link>
                      </GlowCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Need Help Choosing?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our team provides expert consultancy to help you select the right machinery for your
                production requirements.
              </p>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Expert Consultation
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <CinematicFooter />
    </div>
  );
};

export default ProductCategory;
