import React, { useEffect, useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 214, spread: 86 },
  purple: { base: 250, spread: 92 },
  green: { base: 178, spread: 54 },
  red: { base: 8, spread: 60 },
  orange: { base: 28, spread: 48 },
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

const spotlightStyles = `
  [data-glow-card]::before,
  [data-glow-card]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius) * 1px);
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
  }

  [data-glow-card]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.72) calc(var(--spotlight-size) * 0.72) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) 92% 62% / var(--border-spot-opacity, 0.85)),
      transparent 100%
    );
    filter: brightness(1.35);
  }

  [data-glow-card]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.46) calc(var(--spotlight-size) * 0.46) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(0 0% 100% / var(--border-light-opacity, 0.7)),
      transparent 100%
    );
  }

  [data-glow-card] [data-glow-card-inner] {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: var(--outer, 0.9);
    border-radius: calc(var(--radius) * 1px);
    border-width: calc(var(--border-size) * 18);
    filter: blur(calc(var(--border-size) * 9));
    background: none;
    pointer-events: none;
    border: none;
  }

  [data-glow-card] > [data-glow-card-inner]::before {
    inset: -10px;
    border-width: 10px;
  }
`;

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false,
  style,
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;

      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', y.toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };

    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const sizeClasses = customSize ? '' : sizeMap[size];

  const inlineStyles: CSSProperties & Record<string, string> = {
    '--base': String(base),
    '--spread': String(spread),
    '--radius': '24',
    '--border': '1.4',
    '--backdrop': 'hsla(210, 45%, 96%, 0.76)',
    '--backup-border': 'rgba(148, 163, 184, 0.24)',
    '--size': '180',
    '--outer': '0.95',
    '--border-size': 'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 150) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) 92% 68% / 0.11),
      transparent
    )`,
    backgroundColor: 'var(--backdrop)',
    backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
    backgroundPosition: '50% 50%',
    backgroundAttachment: 'fixed',
    border: 'var(--border-size) solid var(--backup-border)',
    position: 'relative',
    touchAction: 'none',
  };

  if (width !== undefined) {
    inlineStyles.width = typeof width === 'number' ? `${width}px` : width;
  }

  if (height !== undefined) {
    inlineStyles.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: spotlightStyles }} />
      <div
        ref={cardRef}
        data-glow-card
        style={{ ...inlineStyles, ...style }}
        {...rest}
        className={`
          ${sizeClasses}
          ${!customSize ? 'aspect-[3/4]' : ''}
          relative
          grid
          grid-rows-[1fr_auto]
          overflow-hidden
          rounded-2xl
          p-4
          gap-4
          shadow-[0_1rem_2rem_-1rem_rgba(15,23,42,0.28)]
          backdrop-blur-[10px]
          ${className}
        `}
      >
        <div data-glow-card-inner />
        {children}
      </div>
    </>
  );
};

export { GlowCard };
