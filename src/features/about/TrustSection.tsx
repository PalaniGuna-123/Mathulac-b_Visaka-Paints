import { useState, useEffect } from 'react';
import { trustPillars } from '../../data';
import { Award, ShieldCheck, CheckCircle2, FileCheck, Maximize2, X } from 'lucide-react';
import certificateImg from '../../assets/certificate.jpeg';

export function TrustSection() {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Close certificate modal on Escape key & prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCertModalOpen(false);
    };
    if (isCertModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCertModalOpen]);

  return (
    <section className="relative py-16 md:py-20 px-4 md:px-8 bg-surface-deep border-t border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-leaf/20 text-leaf text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-leaf/30">
            Quality Commitment
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
            Why India Chooses Mathulac
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
            Engineered with high solid content and UV-resistant binders to outlast harsh weather.
          </p>
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                data-reveal
                className="group p-5 sm:p-6 rounded-xl glass text-center border border-white/10 shadow-xl hover:bg-white/10 transition-all"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5 transition-transform group-hover:scale-110 shadow-lg"
                  style={{ background: `${p.color}22`, border: `1px solid ${p.color}55` }}
                >
                  <Icon className="w-8 h-8" style={{ color: p.color }} />
                </div>
                <h3 className="text-white font-bold text-lg">{p.label}</h3>
                <p className="text-white/65 text-sm mt-2.5 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>

        {/* ISO 9001 Official Certification Showcase */}
        <div
          data-reveal
          className="mt-14 rounded-3xl bg-gradient-to-br from-white/[0.06] via-ink to-[#090f1d] border border-white/15 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl"
        >
          {/* Ambient Glows */}
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-magenta/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content & Accreditation Details */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan/15 text-cyan text-[11px] font-bold uppercase tracking-wider border border-cyan/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Audited Quality Management System</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
                ISO 9001 Certified Manufacturing Standards
              </h3>

              <p className="text-white/75 text-xs sm:text-sm md:text-base leading-relaxed">
                Visaka Paints &amp; Chemicals India is officially certified under international Quality Management System standards for the design, manufacture, and supply of premium paints and allied surface coatings.
              </p>

              {/* Verified Certificate Audit Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan/15 border border-cyan/30 flex items-center justify-center shrink-0 text-cyan mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase font-bold text-white/50 tracking-wider">Certified Standard</div>
                    <div className="text-white font-bold text-sm">ISO 9001:2008 Compliance</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-magenta/15 border border-magenta/30 flex items-center justify-center shrink-0 text-magenta mt-0.5">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase font-bold text-white/50 tracking-wider">Certificate Number</div>
                    <div className="text-white font-bold text-sm font-mono">No. 687069</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-leaf/15 border border-leaf/30 flex items-center justify-center shrink-0 text-leaf mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase font-bold text-white/50 tracking-wider">Audited Scope</div>
                    <div className="text-white font-bold text-xs sm:text-sm">Design, Manufacture &amp; Supply of Paints</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sun/15 border border-sun/30 flex items-center justify-center shrink-0 text-sun mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase font-bold text-white/50 tracking-wider">Accreditation Body</div>
                    <div className="text-white font-bold text-xs sm:text-sm">GIC (UKAS &amp; IAF Accredited)</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(true)}
                  className="paint-button inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan text-ink font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View Full Certificate</span>
                </button>
                <span className="text-[11px] text-white/50 flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" /> Verified Official GIC Registration
                </span>
              </div>
            </div>

            {/* Right Certificate Frame / Preview */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                onClick={() => setIsCertModalOpen(true)}
                className="group relative max-w-xs sm:max-w-sm w-full rounded-2xl p-2.5 sm:p-3.5 bg-gradient-to-b from-white/20 via-white/5 to-white/10 border border-white/25 shadow-2xl backdrop-blur-xl cursor-pointer transition-all duration-500 hover:border-cyan hover:shadow-cyan/20 hover:-translate-y-1"
              >
                {/* Official Stamp / Badge */}
                <div className="absolute -top-3 -right-2 sm:-right-3 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-magenta to-cyan text-white text-[10px] font-bold uppercase tracking-wider shadow-xl flex items-center gap-1.5 border border-white/30">
                  <Award className="w-3 h-3" />
                  <span>ISO 9001 Registered</span>
                </div>

                {/* Certificate Image Container */}
                <div className="relative rounded-xl overflow-hidden bg-white shadow-inner aspect-[3/4.2]">
                  <img
                    src={certificateImg}
                    alt="Visaka Paints ISO 9001:2008 Certificate of Registration No. 687069"
                    className="w-full h-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {/* Subtle Hover Overlay with Magnifying Prompt */}
                  <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2 backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-cyan text-ink flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider">Click to Enlarge</span>
                  </div>
                </div>

                {/* Bottom Caption Bar */}
                <div className="mt-2.5 px-1.5 flex items-center justify-between text-[11px] text-white/70">
                  <span className="font-semibold text-white truncate">Certificate of Registration</span>
                  <span className="font-mono text-cyan shrink-0">GIC No. 687069</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Certificate Lightbox Modal */}
      {isCertModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCertModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-2xl max-h-[95vh] rounded-3xl bg-[#0b101d] border border-white/20 p-4 sm:p-6 shadow-2xl flex flex-col items-center overflow-hidden">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsCertModalOpen(false)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-ink/80 hover:bg-magenta text-white border border-white/30 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Close certificate preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="w-full pr-12 mb-3 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan/15 text-cyan text-[10px] font-bold uppercase tracking-wider border border-cyan/30 mb-1">
                <Award className="w-3 h-3" /> Official Registration Document
              </div>
              <h4 className="text-white font-display text-lg sm:text-xl font-bold truncate">
                Visaka Paints &amp; Chemicals India — ISO 9001:2008
              </h4>
            </div>

            {/* Image Scroller Container */}
            <div className="w-full overflow-y-auto max-h-[calc(90vh-120px)] rounded-xl bg-white p-2 shadow-inner flex items-center justify-center">
              <img
                src={certificateImg}
                alt="Visaka Paints ISO 9001:2008 Certificate of Registration No. 687069"
                className="w-full h-auto object-contain max-h-[75vh]"
              />
            </div>

            {/* Modal Footer */}
            <div className="w-full mt-3 flex items-center justify-between text-xs text-white/70">
              <span className="font-mono text-[11px] text-white/50">Guardian Independent Certification Ltd</span>
              <button
                type="button"
                onClick={() => setIsCertModalOpen(false)}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default TrustSection;
