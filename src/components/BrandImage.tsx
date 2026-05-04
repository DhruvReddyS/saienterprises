import type { CSSProperties, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BrandImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  tone?: 'default' | 'white';
  framed?: boolean;
  frameClassName?: string;
  wrapperStyle?: CSSProperties;
}

const BrandImage = ({
  tone = 'default',
  framed = false,
  className,
  frameClassName,
  style,
  wrapperStyle,
  ...props
}: BrandImageProps) => {
  const image = (
    <img
      {...props}
      className={cn('brand-logo', tone === 'white' && 'brand-logo--white', className)}
      style={style}
    />
  );

  if (!framed) {
    return image;
  }

  return (
    <span className={cn('brand-logo-frame', frameClassName)} style={wrapperStyle}>
      {image}
    </span>
  );
};

export default BrandImage;
