import {
  Children,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

type ScrollStackItemProps = {
  children: ReactNode;
  itemClassName?: string;
};

export const ScrollStackItem = ({ children, itemClassName = '' }: ScrollStackItemProps) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
};

type CardTransform = {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
};

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number>();
  const lenisRef = useRef<Lenis>();
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, CardTransform>());
  const isUpdatingRef = useRef(false);
  const childCount = Children.count(children);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / Math.max(1, end - start);
  }, []);

  const parsePercentage = useCallback((value: string, containerHeight: number) => {
    if (value.includes('%')) return (Number.parseFloat(value) / 100) * containerHeight;
    return Number.parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return { scrollTop: window.scrollY, containerHeight: window.innerHeight };
    }
    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller?.scrollTop ?? 0,
      containerHeight: scroller?.clientHeight ?? window.innerHeight,
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      }
      return element.offsetTop;
    },
    [useWindowScroll],
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElement = scrollerRef.current?.querySelector<HTMLElement>('.scroll-stack-end');
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    let topCardIndex = 0;
    if (blurAmount) {
      cardsRef.current.forEach((card, index) => {
        const trigger = getElementOffset(card) - stackPositionPx - itemStackDistance * index;
        if (scrollTop >= trigger) topCardIndex = index;
      });
    }

    cardsRef.current.forEach((card, index) => {
      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * index;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinEnd = endElementTop - containerHeight / 2;
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + index * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? index * rotationAmount * scaleProgress : 0;
      const blur = blurAmount && index < topCardIndex ? (topCardIndex - index) * blurAmount : 0;

      let translateY = 0;
      if (scrollTop >= triggerStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * index;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * index;
      }

      const next = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };
      const previous = lastTransformsRef.current.get(index);
      const changed =
        !previous ||
        Math.abs(previous.translateY - next.translateY) > 0.1 ||
        Math.abs(previous.scale - next.scale) > 0.001 ||
        Math.abs(previous.rotation - next.rotation) > 0.1 ||
        Math.abs(previous.blur - next.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${next.translateY}px, 0) scale(${next.scale}) rotate(${next.rotation}deg)`;
        card.style.filter = next.blur > 0 ? `blur(${next.blur}px)` : '';
        lastTransformsRef.current.set(index, next);
      }

      if (index === cardsRef.current.length - 1) {
        const isInView = scrollTop >= triggerStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    baseScale,
    blurAmount,
    calculateProgress,
    getElementOffset,
    getScrollData,
    itemScale,
    itemStackDistance,
    onStackComplete,
    parsePercentage,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>('.scroll-stack-card'));
    const transformsCache = lastTransformsRef.current;
    cardsRef.current = cards;
    cards.forEach((card, index) => {
      if (index < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.transition = `filter ${scaleDuration}s ease`;
    });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = useWindowScroll
      ? new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.5, lerp: 0.1 })
      : new Lenis({
          wrapper: scroller,
          content: scroller.querySelector<HTMLElement>('.scroll-stack-inner') ?? undefined,
          duration: 1.15,
          smoothWheel: true,
          touchMultiplier: 1.5,
          lerp: 0.1,
        });

    lenis.on('scroll', updateCardTransforms);
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);
    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lenis.destroy();
      lenisRef.current = undefined;
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    scaleDuration,
    updateCardTransforms,
    useWindowScroll,
    childCount,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
