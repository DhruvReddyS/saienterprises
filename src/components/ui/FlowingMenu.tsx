import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

export type FlowingMenuItem = {
  text: string;
  image: string;
  link?: string;
};

type FlowingMenuProps = {
  items?: FlowingMenuItem[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
};

const distMetric = (x: number, y: number, x2: number, y2: number) => {
  const xDiff = x - x2;
  const yDiff = y - y2;
  return xDiff * xDiff + yDiff * yDiff;
};

const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
  const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
  const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
  return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
};

function FlowingMenu({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#120F17',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#120F17',
  borderColor = '#fff',
  activeIndex,
  onActiveChange,
}: FlowingMenuProps) {
  return (
    <div className="flowing-menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="flowing-menu" aria-label="HPM history timeline">
        {items.map((item, idx) => (
          <MenuItem
            key={`${item.text}-${idx}`}
            item={item}
            index={idx}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            active={idx === activeIndex}
            onActiveChange={onActiveChange}
          />
        ))}
      </nav>
    </div>
  );
}

type MenuItemProps = {
  item: FlowingMenuItem;
  index: number;
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  active?: boolean;
  onActiveChange?: (index: number) => void;
};

function MenuItem({
  item,
  index,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  active = false,
  onActiveChange,
}: MenuItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);

  useEffect(() => {
    const calculateRepetitions = () => {
      const marqueeContent = marqueeInnerRef.current?.querySelector<HTMLElement>('.flowing-marquee__part');
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      if (!contentWidth) return;

      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [item.text, item.image]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const marqueeContent = marqueeInnerRef.current?.querySelector<HTMLElement>('.flowing-marquee__part');
      if (!marqueeInnerRef.current || !marqueeContent || marqueeContent.offsetWidth === 0) return;

      animationRef.current?.kill();
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -marqueeContent.offsetWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    }, 50);

    return () => {
      window.clearTimeout(timer);
      animationRef.current?.kill();
    };
  }, [item.text, item.image, repetitions, speed]);

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    onActiveChange?.(index);
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: { duration: 0.58, ease: 'expo.out' } })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: { duration: 0.58, ease: 'expo.out' } })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <div className={`flowing-menu__item ${active ? 'is-active' : ''}`} ref={itemRef} style={{ borderColor }}>
      <a
        className="flowing-menu__item-link"
        href={item.link ?? '#'}
        onClick={(ev) => {
          ev.preventDefault();
          onActiveChange?.(index);
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor }}
      >
        {item.text}
      </a>
      <div className="flowing-marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="flowing-marquee__inner-wrap">
          <div className="flowing-marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="flowing-marquee__part" key={idx} style={{ color: marqueeTextColor }}>
                <span>{item.text}</span>
                <div className="flowing-marquee__img" style={{ backgroundImage: `url(${item.image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
