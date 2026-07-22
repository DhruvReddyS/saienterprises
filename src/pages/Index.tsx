import { useEffect } from 'react';
import Header from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import PageTransition from '@/components/PageTransition';
import HeroSection from '@/components/home/HeroSection';
import ProofScrollerSection from '@/components/home/ProofScrollerSection';
import OfferingsSection from '@/components/home/OfferingsSection';
import ServicesSection from '@/components/home/ServicesSection';
import BrandPartnersSection from '@/components/home/BrandPartnersSection';
import GlobalPresenceSection from '@/components/home/GlobalPresenceSection';
import WhySaiSection from '@/components/home/WhySaiSection';
import ClientsSection from '@/components/home/ClientsSection';
import CTAWithVerticalMarquee from '@/components/ui/cta-with-text-marquee';
import { setPageMeta } from '@/lib/seo';

const Index = () => {
  useEffect(() => {
    setPageMeta(
      'Sai Enterprises | Graphic Machinery Suppliers, India & East Africa',
      'Sai Enterprises supplies pre-press, press, post-press and corrugation machinery across India and East Africa. Sole authorized HPM agent in India with 4000+ machines placed.',
      'https://saienterprises.in/',
    );
  }, []);

  return (
    <PageTransition>
      <Header />

      <main>
        <HeroSection />
        <ProofScrollerSection />
        <OfferingsSection />
        <ServicesSection />
        <BrandPartnersSection />
        <GlobalPresenceSection />
        <WhySaiSection />
        <ClientsSection />
        <CTAWithVerticalMarquee />
      </main>

      <CinematicFooter />
    </PageTransition>
  );
};

export default Index;
