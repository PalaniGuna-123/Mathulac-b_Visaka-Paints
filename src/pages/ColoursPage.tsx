import { ShadeLibrary, ColorScrollSection } from '../features/palette';
import { ContactSection } from '../features/contact';

export function ColoursPage() {
  return (
    <div className="w-full pt-16">
      {/* Complete Interactive 1,000+ Shade Library Experience */}
      <ShadeLibrary />

      {/* Cinematic Color Scroll Transition */}
      <ColorScrollSection />

      {/* Direct Spec / Consultation Form */}
      <ContactSection />
    </div>
  );
}

export default ColoursPage;
