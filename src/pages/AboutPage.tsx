import { CompanyStory, TrustSection } from '../features/about';

export function AboutPage() {
  return (
    <div className="w-full pt-20">
      {/* 20-Year Heritage & Coimbatore Story */}
      <CompanyStory />

      {/* Trust Pillars & Certifications */}
      <TrustSection />
    </div>
  );
}

export default AboutPage;
