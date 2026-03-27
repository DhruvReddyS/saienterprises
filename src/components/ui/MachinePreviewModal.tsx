import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ChevronLeft, ChevronRight, Zap, Settings, Maximize } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { getMachineProfile } from '@/lib/machineProfile';

interface MachinePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  categorySlug: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const formatCategoryName = (categorySlug: string) =>
  categorySlug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const MachinePreviewModal = ({ 
  isOpen, 
  onClose, 
  product, 
  categorySlug,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}: MachinePreviewModalProps) => {
  if (!product) return null;
  const profile = getMachineProfile(product, formatCategoryName(categorySlug), categorySlug);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          onClick={onClose}
        >
          {/* Soft blue backdrop */}
          <motion.div 
            className="absolute inset-0 bg-primary/20"
            style={{ backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-background overflow-hidden rounded-2xl border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/95 border border-border flex items-center justify-center text-foreground hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Navigation arrows - positioned outside modal on desktop, inside on mobile */}
            {hasPrev && onPrev && (
              <motion.button
                onClick={onPrev}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary sm:bg-background/95 border border-border flex items-center justify-center text-primary-foreground sm:text-foreground sm:hover:text-primary transition-colors shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            )}
            {hasNext && onNext && (
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary sm:bg-background/95 border border-border flex items-center justify-center text-primary-foreground sm:text-foreground sm:hover:text-primary transition-colors shadow-lg"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            )}

            <div className="grid md:grid-cols-2 max-h-[90vh] overflow-auto">
              {/* Image Section */}
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px] bg-secondary overflow-hidden">
                <motion.img 
                  key={product.id}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/5 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
                
                {/* Category badge */}
                <motion.div 
                  className="absolute top-4 left-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="px-3 py-1.5 bg-primary text-primary-foreground text-[9px] uppercase tracking-[0.15em] font-medium rounded-full">
                    {formatCategoryName(categorySlug)}
                  </span>
                </motion.div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-6 md:p-8 flex flex-col overflow-y-auto">
                <div className="flex-1">
                  <motion.h2 
                    className="font-serif text-2xl sm:text-3xl text-foreground mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {product.name}
                  </motion.h2>
                  
                  {product.description && (
                    <motion.p 
                      className="text-muted-foreground mb-5 leading-relaxed text-sm sm:text-base"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      {product.description}
                    </motion.p>
                  )}

                  <motion.div
                    className="mb-5 grid gap-2 sm:grid-cols-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                  >
                    <div className="rounded-xl border border-border bg-primary/[0.04] px-3 py-2">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Brand</p>
                      <p className="text-sm text-foreground font-medium">{profile.brand}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-primary/[0.04] px-3 py-2">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Segment</p>
                      <p className="text-sm text-foreground font-medium">{profile.subcategory}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-primary/[0.04] px-3 py-2">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Brochure</p>
                      <p className="text-sm text-foreground font-medium">{profile.brochureStatus}</p>
                    </div>
                  </motion.div>

                  {/* Specifications */}
                  {product.specifications && Object.keys(product.specifications).length > 0 && (
                    <motion.div 
                      className="mb-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Settings className="w-3.5 h-3.5 text-primary" />
                        <h4 className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
                          Specifications
                        </h4>
                      </div>
                      <div className="space-y-2 bg-secondary/30 p-3 rounded-lg">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center text-xs sm:text-sm">
                            <span className="text-muted-foreground">{key}</span>
                            <span className="text-foreground font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {(!product.specifications || Object.keys(product.specifications).length === 0) && (
                    <motion.div
                      className="mb-5 rounded-lg border border-dashed border-border bg-secondary/20 p-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-xs text-muted-foreground">
                        Detailed technical specifications are not listed in the brochure for this model.
                      </p>
                    </motion.div>
                  )}

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <motion.div 
                      className="mb-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        <h4 className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
                          Key Features
                        </h4>
                      </div>
                      <ul className="space-y-1.5">
                        {product.features.slice(0, 4).map((feature, i) => (
                          <motion.li 
                            key={i} 
                            className="text-xs sm:text-sm text-foreground flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                          >
                            <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                  {(!product.features || product.features.length === 0) && (
                    <motion.p
                      className="mb-5 text-xs text-muted-foreground rounded-lg border border-dashed border-border bg-secondary/20 p-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      Key features are not specified in the brochure for this model.
                    </motion.p>
                  )}

                  {product.applications && product.applications.length > 0 && (
                    <motion.div
                      className="mb-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-medium mb-2">
                        Use Cases
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {product.applications.slice(0, 6).map((item) => (
                          <span key={item} className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-foreground">
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {(!product.applications || product.applications.length === 0) && (
                    <motion.p
                      className="mb-5 text-xs text-muted-foreground rounded-lg border border-dashed border-border bg-secondary/20 p-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Application/use-case details are not specified in the brochure for this model.
                    </motion.p>
                  )}

                  {/* Sizes */}
                  {product.sizes && product.sizes.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Maximize className="w-3.5 h-3.5 text-primary" />
                        <h4 className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
                          Available Sizes
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {product.sizes.map((size, i) => (
                          <span key={i} className="px-3 py-1.5 bg-secondary text-xs text-foreground rounded-full border border-border">
                            {size}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {(!product.sizes || product.sizes.length === 0) && (
                    <motion.p
                      className="text-xs text-muted-foreground rounded-lg border border-dashed border-border bg-secondary/20 p-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Size/capacity details are not specified in the brochure for this model.
                    </motion.p>
                  )}
                </div>

                {/* CTA */}
                <motion.div 
                  className="pt-5 mt-4 border-t border-border"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={`/machinery/${categorySlug}/${product.id}`}
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 hover:bg-primary/90 transition-colors group w-full justify-center rounded-full text-sm"
                      onClick={onClose}
                    >
                      <span className="font-medium">View Full Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MachinePreviewModal;
