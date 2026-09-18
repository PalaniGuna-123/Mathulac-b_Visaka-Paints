import { CompanyStory, TrustSection, AboutLocationMap } from '../features/about';

export function AboutPage() {
  return (
    <div className="w-full pt-20">
      {/* 20-Year Heritage & Coimbatore Story */}
      <CompanyStory />

      {/* Trust Pillars & ISO Certification Showcase */}
      <TrustSection />

      {/* Manufacturing Facility Location & Factory Visit */}
      <AboutLocationMap />
    </div>
  );
}

export default AboutPage;
