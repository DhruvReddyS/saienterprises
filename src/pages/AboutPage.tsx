import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Globe2, Handshake, MapPin, ShieldCheck, Trophy, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import { companyInfo } from '@/data/products';
import saiLogoHorizontal from '@/assets/sai-logo-horizontal.png';
import largestSellingBadge from '@/assets/largest-selling-badge.png';
import yearsBadge from '@/assets/24-years-badge.png';
import hpmLogo from '@/assets/hpm-logo.png';

const sectionClass = 'px-5 sm:px-8 md:px-14 lg:px-20 xl:px-24';
const shellClass = 'max-w-6xl mx-auto';

const proofStats = [
  {
    value: '5000+',
    label: 'Machines Sold',
    note: 'Across graphic, finishing, and corrugation workflows',
    image: largestSellingBadge,
  },
  {
    value: '#1',
    label: 'Paper Cutter Positioning',
    note: 'Strong market identity in the paper cutter segment',
    image: largestSellingBadge,
  },
  {
    value: 'HPM',
    label: 'Sole Agent',
    note: 'Authorized India representation for HPM paper cutters',
    image: hpmLogo,
  },
  {
    value: '24+',
    label: 'Years Experience',
    note: 'Long-running customer continuity and industry support',
    image: yearsBadge,
  },
  {
    value: '1000+',
    label: 'Trusted Clients',
    note: 'Commercial relationships built through repeat business',
    icon: Users,
  },
  {
    value: '10+',
    label: 'Global Collaborations',
    note: 'International sourcing and principal brand partnerships',
    icon: Handshake,
  },
];

const journey = [
  {
    year: '2003',
    title: 'Sai Enterprises Founded',
    description:
      'Operations began in Hyderabad with focus on practical, production-ready graphic machinery for printers and converters.',
  },
  {
    year: '2010',
    title: 'India Presence Expanded',
    description:
      'Regional support expanded across New Delhi, Pune, and Vijayawada to shorten response time for sales and service coordination.',
  },
  {
    year: '2015',
    title: 'Kenya Office Established',
    description:
      'Nairobi office strengthened East Africa support for packaging and print customers requiring faster commercial and technical response.',
  },
  {
    year: '2020',
    title: 'Workflow Portfolio Strengthened',
    description:
      'Portfolio deepened across pre-press, press, post-press, corrugation and allied consumables for end-to-end print finishing requirements.',
  },
  {
    year: '2026',
    title: 'Brochure-Led Complete Machinery Stack',
    description:
      'Current catalogue covers core production stages with category-wise machine options, practical consultation, and execution support.',
  },
];

const AboutPage = () => {
  return (
    <PageTransition>
      <ScrollProgress />
      <Header />

      <main className="bg-gradient-to-b from-primary/[0.08] via-background to-background">
        <section className={`pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 ${sectionClass}`}>
          <div className={`${shellClass} grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center`}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-5">
                <span className="w-8 h-px bg-primary" />
                About Us
              </span>
              <h1 className="font-serif text-[2.3rem] sm:text-[2.9rem] lg:text-[3.3rem] leading-[0.95] text-foreground mb-5">
                Who We Are
              </h1>
              <p className="text-sm sm:text-base lg:text-[1.03rem] leading-relaxed text-muted-foreground max-w-2xl mb-4">
                Sai Enterprises is a graphic machinery supplier focused on practical production needs across pre-press, press, post-press, corrugation, and specialty converting workflows.
              </p>
              <p className="text-sm sm:text-base lg:text-[1.03rem] leading-relaxed text-muted-foreground max-w-2xl">
                With {companyInfo.experience} of market continuity, we support printers and packaging units with machine selection, commercial consultation, and execution guidance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="rounded-[28px] border border-primary/20 bg-gradient-to-br from-primary/[0.14] via-background to-background p-6 sm:p-8"
            >
              <div className="rounded-[22px] border border-border bg-white p-6 sm:p-8 shadow-[0_25px_70px_-45px_rgba(29,78,216,0.45)]">
                <img
                  src={saiLogoHorizontal}
                  alt="Sai Enterprises Graphic Machinery Suppliers"
                  className="w-full h-auto object-contain mix-blend-multiply"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl border border-border bg-background px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">HQ</p>
                  <p className="text-sm font-medium text-foreground">Hyderabad</p>
                </div>
                <div className="rounded-xl border border-border bg-background px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Global Office</p>
                  <p className="text-sm font-medium text-foreground">Nairobi</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className={`py-14 sm:py-16 ${sectionClass}`}>
          <div className={shellClass}>
            <div className="mb-10">
              <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-4">
                <span className="w-8 h-px bg-primary" />
                Why Choose Us
              </span>
              <h2 className="font-serif text-[2.1rem] sm:text-[2.6rem] text-foreground leading-[0.98]">
                Proven capability with visual proof points.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {proofStats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-[24px] border border-border/70 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.10),_transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,246,255,0.80))] p-5 shadow-[0_24px_50px_-42px_rgba(15,23,42,0.45)]"
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/10 bg-white shadow-sm">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.label}
                          className="h-8 w-8 object-contain"
                        />
                      ) : item.icon ? (
                        <item.icon className="h-6 w-6 text-primary" />
                      ) : null}
                    </div>
                    <span className="rounded-full border border-primary/10 bg-primary/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                      Verified highlight
                    </span>
                  </div>
                  <p className="font-serif text-[2.15rem] leading-none text-foreground sm:text-[2.4rem]">{item.value}</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/88">{item.label}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-2xl text-foreground">Market Position</h3>
                <p className="mt-2 text-sm text-muted-foreground">Brochure and brand material consistently position Sai Enterprises as a leading paper cutter supplier in its segment.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-2xl text-foreground">Execution Reliability</h3>
                <p className="mt-2 text-sm text-muted-foreground">Focus on practical machine matching, workflow continuity, and service-backed recommendations for production teams.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-2xl text-foreground">Partner Ecosystem</h3>
                <p className="mt-2 text-sm text-muted-foreground">Partnership-driven sourcing strategy across trusted global brands and machinery lines for print and packaging workflows.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={`border-y border-border/60 bg-primary/[0.05] py-14 sm:py-16 ${sectionClass}`}>
          <div className={`${shellClass} grid gap-8 lg:grid-cols-[0.38fr_0.62fr] items-start`}>
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-4">
                <span className="w-8 h-px bg-primary" />
                Our Journey
              </span>
              <h2 className="font-serif text-[2.15rem] sm:text-[2.6rem] text-foreground leading-[0.98] mb-4">
                Built over years, improved every stage.
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Category expansion and regional growth shaped a workflow-oriented machinery portfolio for commercial print and packaging units.
              </p>
            </div>

            <div className="space-y-4">
              {journey.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-[22px] border border-border bg-background p-5"
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-primary mb-2">{item.year}</p>
                  <h3 className="font-serif text-[1.6rem] leading-tight text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className={`py-14 sm:py-16 ${sectionClass}`}>
          <div className={shellClass}>
            <div className="mb-10">
              <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-4">
                <span className="w-8 h-px bg-primary" />
                Office Locations
              </span>
              <h2 className="font-serif text-[2.1rem] sm:text-[2.6rem] text-foreground leading-[0.98]">
                Headquarters-led network across India and Kenya.
              </h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background overflow-hidden">
                <div className="p-5 border-b border-border bg-primary/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-primary">Headquarters</p>
                      <h3 className="font-serif text-2xl text-foreground">Hyderabad, India</h3>
                    </div>
                  </div>
                </div>
                <iframe
                  title="Hyderabad Headquarters"
                  src="https://www.google.com/maps?q=Balkampet+Hyderabad&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>

              <div className="rounded-2xl border border-border bg-background overflow-hidden">
                <div className="p-5 border-b border-border bg-primary/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
                      <Globe2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-primary">Kenya Head Office</p>
                      <h3 className="font-serif text-2xl text-foreground">Nairobi, Kenya</h3>
                    </div>
                  </div>
                </div>
                <iframe
                  title="Nairobi Office"
                  src="https://www.google.com/maps?q=Nairobi+Kenya&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border bg-primary/[0.04] p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary mb-3">Other India Branches</p>
              <div className="flex flex-wrap gap-2.5">
                {companyInfo.locations.branches.map((branch) => (
                  <div key={branch.city} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm text-foreground">{branch.city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`pb-16 ${sectionClass}`}>
          <div className={`${shellClass} rounded-[28px] border border-primary/20 bg-gradient-to-r from-primary/[0.12] to-background p-8 sm:p-10`}>
            <h2 className="font-serif text-[2rem] sm:text-[2.4rem] text-foreground mb-4">Ready to discuss your machinery requirement?</h2>
            <p className="text-muted-foreground max-w-2xl mb-6">
              Share your production requirement and we will help you shortlist practical machine options with commercial and technical clarity.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Start Discussion
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/machinery"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground hover:border-primary/30 hover:text-primary transition-colors"
              >
                Explore Machinery
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default AboutPage;
