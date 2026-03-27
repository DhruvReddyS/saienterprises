import { motion } from 'framer-motion';
import { BookOpen, Boxes, Factory, ShieldCheck, Wrench } from 'lucide-react';

const proofMetrics = [
  {
    value: '5000+',
    label: 'Machines delivered',
    description: 'Installed and supplied across print, finishing, and packaging workflows.',
  },
  {
    value: '24+',
    label: 'Years of continuity',
    description: 'Long-running industry presence with commercial and service support experience.',
  },
  {
    value: 'HPM',
    label: 'Sole agency in India',
    description: 'Strong paper cutter positioning backed by principal distribution authority.',
  },
];

const categoryCoverage = [
  { label: 'Pre-Press', value: '6', icon: BookOpen },
  { label: 'Press', value: '6', icon: Factory },
  { label: 'Post-Press', value: '55+', icon: Wrench },
  { label: 'Corrugation', value: '11+', icon: Boxes },
  { label: 'Allied', value: '5', icon: ShieldCheck },
];

const workflowPoints = [
  'Complete machinery coverage from plate preparation to finishing and corrugation.',
  'Structured catalogue built for commercial printers, book finishers, and packaging units.',
  'Website inventory now follows the brochure classification for easier navigation.',
];

const BrochureHighlightsSection = () => {
  return (
    <section className="border-y border-border/60 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.08),_transparent_22%),linear-gradient(180deg,rgba(248,250,252,0.98),rgba(255,255,255,0.96))] px-5 py-14 sm:px-8 sm:py-16 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[30px] border border-primary/10 bg-white/88 p-6 shadow-[0_30px_70px_-48px_rgba(14,116,144,0.58)] backdrop-blur sm:p-8"
          >
            <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
              <span className="h-px w-8 bg-primary" />
              At a Glance
            </span>

            <h2 className="mt-5 text-[2rem] leading-[0.96] text-foreground sm:text-[2.6rem]">
              A complete machinery portfolio,
              <span className="text-primary italic"> clearly organised.</span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              This section summarises what the brochure actually represents:
              Sai Enterprises covers the full production chain with machines for
              pre-press, press, post-press, corrugation, and allied requirements.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {proofMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-[24px] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,246,255,0.76))] p-4 sm:p-5"
                >
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Key proof
                  </p>
                  <p className="mt-2 text-3xl text-foreground sm:text-4xl">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {metric.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-[30px] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(239,246,255,0.82))] p-6 shadow-[0_30px_70px_-48px_rgba(15,23,42,0.5)] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/80">
                  Portfolio structure
                </p>
                <h3 className="mt-3 text-3xl leading-[0.98] text-foreground sm:text-[2.2rem]">
                  What visitors can explore on the website.
                </h3>
              </div>
              <div className="hidden rounded-2xl border border-primary/10 bg-primary/8 p-3 sm:block">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {categoryCoverage.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="flex items-center justify-between gap-3 rounded-[22px] border border-border/70 bg-background/90 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/10 bg-primary/8">
                        <Icon className="h-4 w-4 text-primary" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {item.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Brochure-classified machinery range
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-primary/10 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                      {item.value}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 rounded-[24px] border border-border/70 bg-white/88 p-4 sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                Why it matters
              </p>
              <div className="mt-3 space-y-3">
                {workflowPoints.map((point) => (
                  <div key={point} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrochureHighlightsSection;
