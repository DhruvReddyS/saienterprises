import Header from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import PageTransition from '@/components/PageTransition';
import HeroSection from '@/components/home/HeroSection';
import OfferingsSection from '@/components/home/OfferingsSection';
import ServicesSection from '@/components/home/ServicesSection';
import BrandPartnersSection from '@/components/home/BrandPartnersSection';
import GlobalPresenceSection from '@/components/home/GlobalPresenceSection';
import WhySaiSection from '@/components/home/WhySaiSection';
import ClientsSection from '@/components/home/ClientsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTAWithVerticalMarquee from '@/components/ui/cta-with-text-marquee';

const Index = () => {
  return (
    <PageTransition>
      <Header />

      <main>
        <HeroSection />
        <OfferingsSection />
        <ServicesSection />
        <BrandPartnersSection />
        <GlobalPresenceSection />
        <WhySaiSection />
        <ClientsSection />
        <TestimonialsSection />
        <CTAWithVerticalMarquee />
      </main>

      <CinematicFooter />
    </PageTransition>
  );
};

export default Index;
