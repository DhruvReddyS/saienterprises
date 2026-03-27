import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import saiLogoFull from '@/assets/sai-logo-full.png';

// Critical images to preload
const criticalImages = [
  '/src/assets/hero-industrial.jpg',
  '/src/assets/sai-logo-full.png',
  '/src/assets/machinery-corrugation.jpg',
  '/src/assets/machinery-prepress.jpg',
];

interface PremiumLoaderProps {
  onComplete: () => void;
}

const PremiumLoader = ({ onComplete }: PremiumLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [loadedImages, setLoadedImages] = useState(0);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onComplete(), 500);
  }, [onComplete]);

  useEffect(() => {
    const totalImages = criticalImages.length;
    let imagesLoaded = 0;
    
    criticalImages.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        imagesLoaded++;
        setLoadedImages(imagesLoaded);
        const imageProgress = (imagesLoaded / totalImages) * 70;
        setProgress(prev => Math.max(prev, Math.round(imageProgress)));
      };
      img.onerror = () => {
        imagesLoaded++;
        setLoadedImages(imagesLoaded);
        const imageProgress = (imagesLoaded / totalImages) * 70;
        setProgress(prev => Math.max(prev, Math.round(imageProgress)));
      };
      img.src = src;
    });

    const minDuration = 2500;
    const startTime = Date.now();
    
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const timeProgress = Math.min((elapsed / minDuration) * 30, 30);
      
      setProgress(prev => {
        const newProgress = Math.min(prev + 1, 70 + timeProgress);
        return Math.round(newProgress);
      });
      
      if (elapsed < minDuration) {
        requestAnimationFrame(animateProgress);
      }
    };
    
    requestAnimationFrame(animateProgress);

    const checkComplete = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= minDuration && imagesLoaded >= totalImages) {
        setProgress(100);
        setTimeout(() => handleComplete(), 300);
        clearInterval(checkComplete);
      }
    }, 100);

    const timeout = setTimeout(() => {
      setProgress(100);
      handleComplete();
    }, 4000);

    return () => {
      clearTimeout(timeout);
      clearInterval(checkComplete);
    };
  }, [handleComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: '#0d1117',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 0.4s ease-out',
        pointerEvents: isExiting ? 'none' : 'auto'
      }}
    >
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,156,204,0.12), transparent 70%)' }}
      />

      {/* Center content */}
      <div className="relative flex flex-col items-center px-6">
        {/* Full Sai Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <img 
            src={saiLogoFull} 
            alt="Sai Enterprises - Graphic Machinery Suppliers" 
            className="w-64 sm:w-80 md:w-96 h-auto object-contain"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl font-serif italic text-center mb-10"
          style={{ color: '#9aa0a6' }}
        >
          We believe in long-term relationships.
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-40 sm:w-48">
            <div 
              className="w-full h-[3px] rounded-full overflow-hidden"
              style={{ backgroundColor: '#2d3139' }}
            >
              <div 
                className="h-full rounded-full transition-all duration-100"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00bcd4, #e91e63)'
                }}
              />
            </div>
          </div>
          
          <span 
            className="text-[10px] sm:text-xs mt-3 tabular-nums tracking-wider"
            style={{ color: '#5f6368' }}
          >
            {progress}%
          </span>
        </motion.div>
      </div>

      {/* Corner info */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 left-4 text-[8px] tracking-[0.12em] uppercase hidden sm:block"
        style={{ color: '#5f6368' }}
      >
        Est. 2000
      </motion.span>
      
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 right-4 text-[8px] tracking-[0.12em] uppercase hidden sm:block"
        style={{ color: '#5f6368' }}
      >
        Global Reach
      </motion.span>
    </div>
  );
};

export default PremiumLoader;
