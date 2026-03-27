import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { productCategories, Product } from '@/data/products';
import { machineSimilarityScore } from '@/lib/machineSearch';
import { getMachineProfile } from '@/lib/machineProfile';

const ProductDetail = () => {
  const { categorySlug, productId } = useParams<{ categorySlug: string; productId: string }>();

  // Find the product and category
  let foundProduct: Product | undefined;
  let foundCategory: typeof productCategories[0] | undefined;

  for (const category of productCategories) {
    const product = category.products.find((p) => p.id === productId);
    if (product) {
      foundProduct = product;
      foundCategory = category;
      break;
    }
  }

  if (!foundProduct || !foundCategory) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20 px-8 md:px-16 lg:px-24">
          <h1 className="text-3xl text-foreground mb-4">Product not found</h1>
          <Link to="/machinery" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Machinery
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const product = foundProduct;
  const category = foundCategory;
  const profile = getMachineProfile(product, category.name, category.slug);

  const relatedProducts = productCategories
    .flatMap((item) =>
      item.products.map((machine) => ({
        ...machine,
        categorySlug: item.slug,
        categoryName: item.name,
      }))
    )
    .filter((machine) => machine.id !== product.id)
    .map((machine) => ({
      ...machine,
      score: machineSimilarityScore(product, machine) + (machine.categorySlug === category.slug ? 4 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-primary/[0.1] via-background to-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ScrollProgress />
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <div className="pt-24 pb-8 px-8 md:px-16 lg:px-24 border-b border-border/70 bg-primary/[0.04]">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/machinery" className="hover:text-foreground transition-colors">Machinery</Link>
            <span>/</span>
            <Link to={`/machinery/${category.slug}`} className="hover:text-foreground transition-colors">{category.name}</Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{product.name}</span>
          </motion.nav>
        </div>

        {/* Product Hero */}
        <section className="py-14 md:py-20 px-8 md:px-16 lg:px-24">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden rounded-2xl border border-border bg-secondary/40 shadow-[0_20px_60px_-34px_rgba(21,65,140,0.35)]"
            >
              <img
                src={product.image || category.heroImage}
                alt={product.name}
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] to-background p-6 sm:p-7"
            >
              <p className="caption mb-6">{category.name}</p>

              <h1 className="text-foreground mb-6">
                {product.name}
              </h1>

              <div className="mb-6 grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-background/80 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Brand</p>
                  <p className="text-sm text-foreground font-medium">{profile.brand}</p>
                </div>
                <div className="rounded-xl border border-border bg-background/80 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Segment</p>
                  <p className="text-sm text-foreground font-medium">{profile.subcategory}</p>
                </div>
                <div className="rounded-xl border border-border bg-background/80 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Brochure</p>
                  <p className="text-sm text-foreground font-medium">{profile.brochureStatus}</p>
                </div>
              </div>

              {product.description && (
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
                  {product.description}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Specifications - Revealed on demand, clean layout */}
        <section className="border-y border-border/70 py-14 md:py-20 px-8 md:px-16 lg:px-24 bg-primary/[0.03]">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="caption mb-12">Specifications</p>

                <div className="space-y-12">
                  {/* Available Sizes */}
                  {product.sizes && product.sizes.length > 0 ? (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-6">Available Sizes</h4>
                      <div className="flex flex-wrap gap-2.5">
                        {product.sizes.map((size) => (
                          <span 
                            key={size} 
                            className="px-4 py-2 border border-border bg-primary/[0.05] rounded-full text-sm text-foreground"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-3">Available Sizes</h4>
                      <p className="text-sm text-muted-foreground rounded-xl border border-dashed border-border bg-background p-4">
                        Not specified in brochure.
                      </p>
                    </div>
                  )}

                  {/* Technical Specs */}
                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-6">Technical Details</h4>
                      <div className="rounded-2xl border border-border bg-background">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div 
                            key={key} 
                            className="flex justify-between py-4 px-4 border-b border-border last:border-b-0"
                          >
                            <span className="text-muted-foreground text-sm">{key}</span>
                            <span className="text-foreground text-sm font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-3">Technical Details</h4>
                      <p className="text-sm text-muted-foreground rounded-xl border border-dashed border-border bg-background p-4">
                        Not specified in brochure.
                      </p>
                    </div>
                  )}

                  {/* Features */}
                  {product.features && product.features.length > 0 ? (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-6">Features</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="text-muted-foreground text-sm flex items-start gap-3">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-3">Features</h4>
                      <p className="text-sm text-muted-foreground rounded-xl border border-dashed border-border bg-background p-4">
                        Not specified in brochure.
                      </p>
                    </div>
                  )}

                  {/* Applications */}
                  {product.applications && product.applications.length > 0 ? (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-6">Applications</h4>
                      <div className="flex flex-wrap gap-2.5">
                        {product.applications.map((app) => (
                          <span 
                            key={app} 
                            className="rounded-full bg-primary/[0.08] px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-3">Applications</h4>
                      <p className="text-sm text-muted-foreground rounded-xl border border-dashed border-border bg-background p-4">
                        Not specified in brochure.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

        {/* Request Quote - Calm CTA */}
        <section className="border-b border-border/70 py-14 md:py-20 px-8 md:px-16 lg:px-24 bg-gradient-to-r from-primary/[0.08] to-background">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-foreground mb-6">
                Interested in this machine?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Our team provides technical guidance and suitable solutions.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/90"
              >
                <span>Request quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Similar Machines */}
        {relatedProducts.length > 0 && (
          <section className="py-14 md:py-20 px-8 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto">
              <p className="caption mb-8">Recommended Machines</p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={`${relatedProduct.categorySlug}-${relatedProduct.id}`}
                    to={`/machinery/${relatedProduct.categorySlug}/${relatedProduct.id}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-background hover:border-primary/40 transition-colors"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-secondary/30">
                      <img
                        src={relatedProduct.image || category.heroImage}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-primary mb-1">
                        {relatedProduct.categoryName}
                      </p>
                      <h4 className="font-serif text-2xl leading-tight text-foreground group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h4>
                      <p className="mt-2 text-xs text-muted-foreground inline-flex items-center gap-1">
                        View details <ArrowRight className="w-3.5 h-3.5" />
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </motion.div>
  );
};

export default ProductDetail;
