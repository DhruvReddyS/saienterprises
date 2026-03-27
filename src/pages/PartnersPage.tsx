import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Globe2, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import PartnerLogo from '@/components/PartnerLogo';
import { partnerBrands } from '@/data/products';
import hpmLogo from '@/assets/hpm-logo.png';
import largestSellingBadge from '@/assets/largest-selling-badge.png';
import yearsBadge from '@/assets/24-years-badge.png';

const beltBrands = [...partnerBrands, ...partnerBrands, ...partnerBrands];

const PartnersPage = () => {
  return (
    <PageTransition>
      <ScrollProgress />
      <Header />

      <main className="bg-gradient-to-b from-primary/[0.1] via-background to-background overflow-hidden">
        <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-6 sm:px-8 md:px-16 lg:px-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute top-24 right-[15%] h-52 w-52 rounded-full bg-cyan-400/15 blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-6"
            >
              <span className="w-8 h-px bg-primary" />
              Global Partnerships
              <span className="w-8 h-px bg-primary" />
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="font-serif text-[2.3rem] sm:text-[3rem] lg:text-[3.8rem] leading-[0.94] text-foreground"
            >
              Built on trusted alliances,
              <span className="text-primary italic"> delivered with global coverage.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 max-w-3xl mx-auto text-sm sm:text-base text-muted-foreground"
            >
              We work with globally recognized machinery brands and support customers across regions through practical, workflow-first recommendations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-xs uppercase tracking-[0.14em] text-foreground">
                <Globe2 className="w-3.5 h-3.5 text-primary" />
                Global Collaborations
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-xs uppercase tracking-[0.14em] text-foreground">
                <Award className="w-3.5 h-3.5 text-primary" />
                HPM Sole Agent India
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-xs uppercase tracking-[0.14em] text-foreground">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                24+ Years in Machinery
              </span>
            </motion.div>

            <div className="mt-10 relative h-24">
              <motion.div
                animate={{ x: [0, -900] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 top-0 flex items-center gap-3"
              >
                {beltBrands.map((brand, i) => (
                  <div
                    key={`${brand.name}-${i}`}
                    className="shrink-0 rounded-full border border-border bg-background/90 px-5 py-3 min-w-[180px] text-center"
                  >
                    <PartnerLogo name={brand.name} variant="dark" size="sm" />
                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{brand.country}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12 px-6 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-[30px] border border-primary/20 bg-gradient-to-r from-primary/[0.1] via-background to-cyan-400/[0.08] p-6 sm:p-8">
              <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-primary mb-2">Featured Alliance</p>
                  <h2 className="font-serif text-[2rem] sm:text-[2.5rem] text-foreground leading-[0.95] mb-3">HPM Partnership</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Exclusive representation in India for HPM paper cutting systems with market-backed deployment continuity.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs uppercase tracking-[0.14em] text-foreground">
                    Sole Authorized Agent
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <img src={hpmLogo} alt="HPM logo" className="h-12 w-auto object-contain" />
                  <img src={largestSellingBadge} alt="Largest selling badge" className="h-14 w-auto object-contain" />
                  <img src={yearsBadge} alt="24 years badge" className="h-14 w-auto object-contain" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-14 px-6 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="font-serif text-[2rem] sm:text-[2.4rem] text-foreground mb-3">Awards & Recognition Badges</h3>
            <p className="text-sm text-muted-foreground mb-6">Proof-first highlights, presented as visual badges for fast credibility scan.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['5000+ Machines Sold', 'No.1 Paper Cutter Seller', 'HPM Sole Agent', '24+ Years Experience', '1000+ Trusted Clients', '10+ Global Collaborations'].map((badge) => (
                <span key={badge} className="rounded-full border border-primary/30 bg-primary/[0.08] px-5 py-2 text-xs uppercase tracking-[0.14em] text-foreground">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 px-6 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-primary/90 transition-colors"
            >
              Discuss Partnership or Requirement
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default PartnersPage;
