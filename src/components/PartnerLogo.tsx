interface PartnerLogoProps {
  name: string;
  variant?: 'light' | 'dark' | 'muted';
  size?: 'sm' | 'md' | 'lg';
}

const brandStyles: Record<string, string> = {
  Heidelberg: 'tracking-[-0.04em] font-black uppercase',
  Komori: 'tracking-[0.18em] font-semibold uppercase',
  manroland: 'tracking-[0.04em] font-semibold lowercase',
  'Mitsubishi Heavy Industries': 'tracking-[0.06em] font-semibold uppercase',
  'Muller Martini': 'tracking-[0.08em] font-semibold uppercase',
  MBO: 'tracking-[0.12em] font-black uppercase',
  Kolbus: 'tracking-[0.12em] font-semibold uppercase',
  HPM: 'tracking-[0.28em] font-black uppercase',
  Kanefusa: 'tracking-[0.12em] font-semibold uppercase',
};

const sizeStyles = {
  sm: 'text-lg sm:text-xl',
  md: 'text-2xl sm:text-3xl',
  lg: 'text-3xl sm:text-4xl md:text-5xl',
};

const colorStyles = {
  light: 'text-white',
  dark: 'text-white',
  muted: 'text-white/60',
};

const PartnerLogo = ({ name, variant = 'dark', size = 'md' }: PartnerLogoProps) => {
  return (
    <span
      className={`font-serif leading-none ${brandStyles[name] ?? 'tracking-[0.08em] font-semibold uppercase'} ${sizeStyles[size]} ${colorStyles[variant]}`}
      aria-label={`${name} logo`}
    >
      {name}
    </span>
  );
};

export default PartnerLogo;
