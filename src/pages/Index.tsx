import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import HeroSection from '@/components/home/HeroSection';
import OfferingsSection from '@/components/home/OfferingsSection';
import ServicesSection from '@/components/home/ServicesSection';
import BrandPartnersSection from '@/components/home/BrandPartnersSection';
import GlobalPresenceSection from '@/components/home/GlobalPresenceSection';
import WhySaiSection from '@/components/home/WhySaiSection';
import FinalCtaSection from '@/components/home/FinalCtaSection';

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
        <FinalCtaSection />
      </main>

      <Footer />
    </PageTransition>
  );
};

export default Index;
