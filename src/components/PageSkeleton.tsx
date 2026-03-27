import { motion } from 'framer-motion';

const PageSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      {/* Header skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="w-24 h-8 bg-muted/50 rounded-sm"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div className="hidden md:flex gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                className="w-16 h-4 bg-muted/50 rounded-sm"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="relative h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24">
        <div className="max-w-7xl mx-auto w-full">
          {/* Badge skeleton */}
          <motion.div 
            className="w-48 h-3 bg-muted/40 rounded-sm mb-8"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Title skeleton */}
          <div className="space-y-3 mb-8">
            <motion.div 
              className="w-3/4 max-w-xl h-10 md:h-14 bg-muted/50 rounded-sm"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
            />
            <motion.div 
              className="w-1/2 max-w-md h-10 md:h-14 bg-muted/50 rounded-sm"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
          </div>
          
          {/* Description skeleton */}
          <div className="space-y-2 mb-10">
            <motion.div 
              className="w-full max-w-lg h-4 bg-muted/40 rounded-sm"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div 
              className="w-3/4 max-w-md h-4 bg-muted/40 rounded-sm"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          
          {/* CTA skeleton */}
          <div className="flex gap-4">
            <motion.div 
              className="w-40 h-12 bg-primary/30 rounded-sm"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div 
              className="w-32 h-12 bg-muted/40 rounded-sm"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
          </div>
        </div>
      </div>

      {/* Section skeleton */}
      <div className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="w-24 h-3 bg-muted/40 rounded-sm mb-4"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div 
            className="w-1/2 max-w-md h-8 bg-muted/50 rounded-sm mb-12"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          />
          
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                className="h-64 bg-muted/30 rounded-sm"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PageSkeleton;
