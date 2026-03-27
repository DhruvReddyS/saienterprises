import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import SectionNav from '@/components/SectionNav';
import HeroSection from '@/components/home/HeroSection';
import BrochureHighlightsSection from '@/components/home/BrochureHighlightsSection';
import AboutSection from '@/components/home/AboutSection';
import OfferingsSection from '@/components/home/OfferingsSection';
import ServicesSection from '@/components/home/ServicesSection';
import BrandPartnersSection from '@/components/home/BrandPartnersSection';
import GlobalPresenceSection from '@/components/home/GlobalPresenceSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WhySaiSection from '@/components/home/WhySaiSection';
import ContactSection from '@/components/home/ContactSection';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'offerings', label: 'Offerings' },
  { id: 'services', label: 'Services' },
  { id: 'partners', label: 'Partners' },
  { id: 'presence', label: 'Presence' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'contact', label: 'Contact' },
];

const Index = () => {
  return (
    <PageTransition>
      <Header />
      <SectionNav sections={sections} />
      
      <main>
        <HeroSection />
        <BrochureHighlightsSection />
        <div id="about"><AboutSection /></div>
        <div id="offerings"><OfferingsSection /></div>
        <div id="services"><ServicesSection /></div>
        <div id="partners"><BrandPartnersSection /></div>
        <div id="presence"><GlobalPresenceSection /></div>
        <div id="testimonials"><TestimonialsSection /></div>
        <div id="why-us"><WhySaiSection /></div>
        <div id="contact"><ContactSection /></div>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default Index;
