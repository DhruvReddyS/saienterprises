import { useRef } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxOptions {
  offset?: [string, string];
  speed?: number;
}

interface ParallaxReturn {
  ref: React.RefObject<HTMLElement>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

export const useParallaxScroll = (options: ParallaxOptions = {}): ParallaxReturn => {
  const { offset = ["start end", "end start"], speed = 0.15 } = options;
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  return { ref, y, opacity, scale };
};

// Lighter parallax for decorative elements
export const useDecoParallax = (speed: number = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60 * speed, -60 * speed]);
  const x = useTransform(scrollYProgress, [0, 1], [20 * speed, -20 * speed]);
  const rotate = useTransform(scrollYProgress, [0, 1], [2, -2]);

  return { ref, y, x, rotate };
};

export default useParallaxScroll;
