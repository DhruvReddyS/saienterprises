import { useEffect, useState } from 'react';

const loaderWords = [
  'Sai Enterprises',
  'Machine Sourcing',
  'HPM Paper Cutters',
  'Print Floors',
  'Global Supply',
  'Service Ready',
];

const AnimatedScanLoader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % loaderWords.length);
    }, 760);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-fit text-center text-[clamp(34px,6vw,58px)] font-extrabold tracking-[-0.02em] text-white">
      <span className="animate-cut block transition-all duration-700 ease-out">
        {loaderWords[index]}
      </span>
      <div className="animate-scan absolute left-0 top-0 z-0 h-[7px] w-full rounded-full bg-[#60A5FA]/45 blur-[12px] transition-all duration-700 ease-out" />
      <div className="animate-scan absolute left-0 top-0 z-[1] h-[4px] w-full rounded-full bg-[#60A5FA] opacity-95 shadow-[0_0_24px_rgba(96,165,250,0.72)] transition-all duration-700 ease-out" />
    </div>
  );
};

export default AnimatedScanLoader;
