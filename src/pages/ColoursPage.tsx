import { PaintStudio } from '../features/paint-studio';
import { ShadeLibrary, ColorScrollSection } from '../features/palette';
import { DecorSection } from '../features/surfaces';
import { BeforeAfter } from '../features/comparison';
import { ContactSection } from '../features/contact';

export function ColoursPage() {
  return (
    <div className="w-full pt-16">
      {/* Interactive Paint Studio & Live Architectural Visualizer */}
      <PaintStudio />

      {/* Complete Interactive 1,000+ Shade Library Experience */}
      <ShadeLibrary />

      {/* Decorative & Textures — Walls Are Your Canvas */}
      <DecorSection />

      {/* Real-World Before & After Finish Slider */}
      <BeforeAfter />

      {/* Cinematic Color Scroll Transition */}
      <ColorScrollSection />

      {/* Direct Spec / Consultation Form */}
      <ContactSection />
    </div>
  );
}

export default ColoursPage;
