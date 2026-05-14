import { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
  shimmerColor?: string;
  baseColor?: string;
  duration?: number;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

export function ShimmerText({
  children,
  className,
  shimmerWidth = 200,
  shimmerColor = 'rgba(255,255,255,0.7)',
  baseColor = 'rgba(255,255,255,0.55)',
  duration = 3,
  style,
  as: Tag = 'span',
}: ShimmerTextProps) {
  return (
    <>
      <style>{`
        @keyframes shimmer-sweep {
          0%   { background-position: -${shimmerWidth * 2}px 0 }
          100% { background-position: calc(100% + ${shimmerWidth * 2}px) 0 }
        }
      `}</style>
      <Tag
        className={cn('inline', className)}
        style={{
          backgroundImage: `linear-gradient(
            90deg,
            ${baseColor} 0%,
            ${baseColor} 40%,
            ${shimmerColor} 50%,
            ${baseColor} 60%,
            ${baseColor} 100%
          )`,
          backgroundSize: `${shimmerWidth}px 100%`,
          backgroundRepeat: 'no-repeat',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          animation: `shimmer-sweep ${duration}s linear infinite`,
          ...style,
        }}
      >
        {children}
      </Tag>
    </>
  );
}

/* Blue shimmer variant for hero italic spans */
export function BlueShimmerText({
  children,
  className,
  duration = 3.5,
  style,
}: Pick<ShimmerTextProps, 'children' | 'className' | 'duration' | 'style'>) {
  return (
    <ShimmerText
      shimmerColor="rgba(147,197,253,0.95)"
      baseColor="rgba(96,165,250,0.8)"
      shimmerWidth={160}
      duration={duration}
      className={className}
      style={style}
    >
      {children}
    </ShimmerText>
  );
}
