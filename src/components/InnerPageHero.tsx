import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HeroMetric {
  label: string;
  value: string;
}

interface HeroAction {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
}

interface InnerPageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  metrics?: HeroMetric[];
  actions?: HeroAction[];
  media?: ReactNode;
  theme?: 'light' | 'dark';
}

const InnerPageHero = ({
  eyebrow,
  title,
  description,
  metrics = [],
  actions = [],
  media,
  theme = 'light',
}: InnerPageHeroProps) => {
  const dark = theme === 'dark';

  return (
    <section
      className={`relative overflow-hidden ${dark ? 'bg-foreground text-background' : 'bg-secondary/30 text-foreground'}`}
    >
      <motion.div
        className={`absolute top-10 right-[12%] h-72 w-72 rounded-full blur-[120px] ${dark ? 'bg-primary/20' : 'bg-primary/12'}`}
        animate={{ scale: [1, 1.1, 1], opacity: [0.28, 0.42, 0.28] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className={`absolute bottom-0 left-[8%] h-64 w-64 rounded-full blur-[110px] ${dark ? 'bg-accent/15' : 'bg-accent/10'}`}
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.2, 0.32, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, delay: 1 }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative px-6 sm:px-8 md:px-16 lg:px-24 pt-24 sm:pt-28 pb-12 sm:pb-14 md:pb-16">
        <div className="max-w-7xl mx-auto grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)] xl:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 mb-6 ${
              dark ? 'border-background/10 bg-background/[0.04] text-primary' : 'border-border/70 bg-background/80 text-primary'
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-primary' : 'bg-primary'}`} />
              <span className="text-[10px] uppercase tracking-[0.28em] font-semibold">
                {eyebrow}
              </span>
            </div>

            <div className={`relative max-w-3xl rounded-[30px] border px-5 py-6 sm:px-7 sm:py-8 ${
              dark
                ? 'border-background/10 bg-background/[0.04] shadow-[0_25px_90px_-45px_rgba(0,0,0,0.55)]'
                : 'border-border/70 bg-background/88 shadow-[0_25px_80px_-45px_rgba(0,0,0,0.25)]'
            }`}>
              <div className={`absolute left-0 top-8 bottom-8 w-px ${dark ? 'bg-primary/35' : 'bg-primary/30'}`} />
              <div className={`pl-4 sm:pl-6 ${dark ? 'text-background' : 'text-foreground'}`}>
                <div className="font-serif text-[clamp(2.2rem,4.8vw,4.6rem)] leading-[0.94] tracking-[-0.02em]">
                  {title}
                </div>
                <p
                  className={`mt-4 max-w-2xl text-[0.95rem] sm:text-base md:text-[1.02rem] leading-relaxed ${
                    dark ? 'text-background/68' : 'text-muted-foreground'
                  }`}
                >
                  {description}
                </p>

                {actions.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {actions.map((action) => (
                      <a
                        key={`${action.href}-${action.label}`}
                        href={action.href}
                        className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                          action.variant === 'secondary'
                            ? dark
                              ? 'border border-background/15 bg-background/[0.04] text-background/80 hover:text-background hover:border-background/30'
                              : 'border border-border bg-background text-foreground hover:border-primary/30 hover:text-primary'
                            : dark
                              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                              : 'bg-foreground text-background hover:bg-foreground/90'
                        }`}
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {metrics.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-3 max-w-3xl">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className={`rounded-2xl border px-4 py-4 ${
                      dark
                        ? 'border-background/10 bg-background/[0.04]'
                        : 'border-border/70 bg-background/75'
                    }`}
                  >
                    <p className={`text-[10px] uppercase tracking-[0.18em] ${dark ? 'text-background/35' : 'text-muted-foreground'}`}>
                      {metric.label}
                    </p>
                    <p className="mt-1.5 font-serif text-xl sm:text-[1.7rem] leading-none">{metric.value}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="min-w-0 h-full lg:pl-1 xl:pl-2"
          >
            <div className={`h-full rounded-[30px] border p-4 sm:p-5 ${
              dark
                ? 'border-background/10 bg-background/[0.04] shadow-[0_28px_90px_-50px_rgba(0,0,0,0.6)]'
                : 'border-border/70 bg-background/82 shadow-[0_25px_80px_-45px_rgba(0,0,0,0.18)]'
            }`}>
              {media}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InnerPageHero;
