import { PaintStudio } from '../features/paint-studio';
import { BeforeAfter } from '../features/comparison';
import { ContactSection } from '../features/contact';

export function StudioPage() {
  return (
    <div className="w-full pt-16">
      {/* Interactive Paint Studio Feature */}
      <PaintStudio />

      {/* Real-World Before & After Slider */}
      <BeforeAfter />

      {/* Direct Spec / Free Consultation CTA */}
      <ContactSection />
    </div>
  );
}

export default StudioPage;
