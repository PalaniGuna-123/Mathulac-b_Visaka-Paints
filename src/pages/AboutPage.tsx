import { CompanyStory, TrustSection, AboutLocationMap } from '../features/about';
import { ServicesSection } from '../features/services';
import { ContactSection } from '../features/contact';

export function AboutPage() {
  return (
    <div className="w-full pt-20">
      {/* 20-Year Heritage & Coimbatore Story */}
      <CompanyStory />

      {/* Trust Pillars */}
      <TrustSection />

      {/* Turnkey Services Overview */}
      <ServicesSection />

      {/* Google Map Location, Get In Touch & Free Consultation */}
      <AboutLocationMap />

      {/* Contact Hotline & Inquiry */}
      <ContactSection />
    </div>
  );
}

export default AboutPage;
