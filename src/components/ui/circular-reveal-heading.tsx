import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CircularRevealHeadingProps {
  items: string[];
  centerText: ReactNode;
  className?: string;
}

export const CircularRevealHeading = ({ items, centerText, className }: CircularRevealHeadingProps) => {
  const segment = 100 / items.length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.86, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -5, 0] }}
      transition={{
        opacity: { duration: 0.8 },
        scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        rotate: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
      }}
      whileHover={{ scale: 1.035 }}
      className={cn('relative aspect-square w-full rounded-full', className)}
    >
      <div className="absolute inset-[-16%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_68%)] blur-xl" />
      <div className="absolute inset-0 rounded-full border border-blue-400/25 bg-[radial-gradient(circle_at_42%_35%,rgba(30,64,108,0.86),rgba(6,10,16,0.96)_68%)] shadow-[0_24px_70px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)]" />
      <div className="absolute inset-[10%] rounded-full border border-white/[0.07]" />
      <div className="absolute inset-[21%] rounded-full border border-blue-400/15 bg-[#07101b]/88 shadow-[inset_0_0_35px_rgba(59,130,246,0.1)]" />

      <div className="absolute inset-[25%] z-10 flex items-center justify-center rounded-full">
        {centerText}
      </div>

      <motion.svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <linearGradient id="sai-ring-text" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="55%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
          <path id="sai-brand-curve" d="M 200,200 m -158,0 a 158,158 0 1,1 316,0 a 158,158 0 1,1 -316,0" />
        </defs>
        {items.map((item, index) => (
          <text key={item} fill="url(#sai-ring-text)" fontSize="18" fontWeight="700" letterSpacing="4.6">
            <textPath href="#sai-brand-curve" startOffset={`${index * segment}%`} textLength={segment * 2.72} lengthAdjust="spacingAndGlyphs">
              {item.toUpperCase()}
            </textPath>
          </text>
        ))}
      </motion.svg>

      <span className="absolute left-1/2 top-[1.5%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
      <span className="absolute bottom-[1.5%] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
      <span className="absolute left-[1.5%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
      <span className="absolute right-[1.5%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
    </motion.div>
  );
};
