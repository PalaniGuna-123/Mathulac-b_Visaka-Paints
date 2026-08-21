import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Phone,
  ArrowRight,
  CheckCircle2,
  CalendarCheck,
  Building2,
  Palette,
  Clock,
  Award,
  Wrench,
  Droplets,
  HardHat,
  Compass,
  FileCheck,
  Paintbrush,
  ShieldCheck,
  Home,
  Layers,
  ChevronRight,
  Calculator,
  Check,
  X,
  MapPin,
} from 'lucide-react';
import {
  turnkeyChecklist,
  legacyTurnkeyCopy,
  detailedServices,
  serviceProcessSteps,
  projectReferences,
  serviceGuarantees,
  propertyPresets,
  type DetailedService,
  type ProjectReferenceItem,
} from '../data/services';
import { phoneNumbers } from '../data';
import { Link } from '../routes/Router';
import { ContactSection } from '../features/contact';

const mathulacLogo = '/assets/brand/mathulac-logo-nav.webp';

export function ServicesPage() {
  // State for Service Category filtering
  const [selectedServiceCat, setSelectedServiceCat] = useState<'all' | 'residential' | 'commercial' | 'industrial' | 'specialized'>('all');
  const [activeServiceModal, setActiveServiceModal] = useState<DetailedService | null>(null);

  // State for Project References filtering & modal
  const [selectedProjectCat, setSelectedProjectCat] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectReferenceItem | null>(null);

  // State for Process Step
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // State for Interactive Estimator
  const [selectedPresetId, setSelectedPresetId] = useState<string>(propertyPresets[0].id);
  const [customArea, setCustomArea] = useState<number>(propertyPresets[0].defaultArea);
  const [urgencyMode, setUrgencyMode] = useState<'standard' | 'express'>('standard');

  // State for Quick Booking Form
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    city: 'Coimbatore',
    propertyType: 'Luxury Villa',
    serviceNeeded: 'Full Turnkey Painting (Interior & Exterior)',
    preferredDate: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const selectedPreset = useMemo(() => {
    return propertyPresets.find((p) => p.id === selectedPresetId) || propertyPresets[0];
  }, [selectedPresetId]);

  // Calculate estimated completion days
  const estimatedDays = useMemo(() => {
    const ratio = customArea / selectedPreset.defaultArea;
    const base = Math.max(3, Math.round(selectedPreset.baseDays * Math.sqrt(ratio)));
    return urgencyMode === 'express' ? Math.max(2, Math.round(base * 0.65)) : base;
  }, [customArea, selectedPreset, urgencyMode]);

  // Filter detailed services
  const filteredServices = useMemo(() => {
    if (selectedServiceCat === 'all') return detailedServices;
    return detailedServices.filter((s) => s.category === selectedServiceCat);
  }, [selectedServiceCat]);

  // Filter project references
  const filteredProjects = useMemo(() => {
    if (selectedProjectCat === 'all') return projectReferences;
    return projectReferences.filter((p) => p.categoryKey === selectedProjectCat);
  }, [selectedProjectCat]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // scroll to confirmation or keep status
    }, 500);
  };

  const activeStep = serviceProcessSteps[activeStepIndex];

  return (
    <div className="w-full pt-20 bg-ink min-h-screen text-white overflow-hidden">
      {/* ============================================================ */}
      {/* 1. TOP BREADCRUMB & ISO CERTIFICATION BAR */}
      {/* ============================================================ */}
      <div className="bg-[#050711] border-b border-white/10 px-4 md:px-8 py-3">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Link to="/" className="hover:text-cyan transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-magenta font-bold">Services &amp; Turnkey Painting Solutions</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-magenta uppercase tracking-wider bg-magenta/10 px-3 py-1 rounded-full border border-magenta/25 flex items-center gap-1.5 shadow-sm">
              <Award className="w-3.5 h-3.5 text-magenta" /> ISO 9001:2015 Certified Service Standard
            </span>
            <span className="hidden sm:inline-flex text-[10px] font-mono font-bold text-cyan uppercase tracking-wider bg-cyan/10 px-3 py-1 rounded-full border border-cyan/25 items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan" /> 100% Verified &amp; Insured Painters
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. HERO SECTION & BRAND BANNER (Unified Modern UI/UX) */}
      {/* ============================================================ */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 px-4 md:px-8 bg-gradient-to-b from-[#060814] via-[#0f081f] to-[#0A0D18] border-b border-white/10 overflow-hidden">
        {/* Dynamic Bokeh & Ambient Light Blobs (Inspired by legacy bokeh hero with modern glassmorphism) */}
        <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-magenta/25 rounded-full filter blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-cyan/20 rounded-full filter blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-violet/25 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-flame/15 rounded-full filter blur-[150px] pointer-events-none" />

        {/* Subtle dot-grid texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          {/* Top Brand & ISO Standard Capsule */}
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 backdrop-blur-xl shadow-xl shadow-magenta/10 mb-8 transition-all">
            <span className="w-2 h-2 rounded-full bg-magenta animate-ping" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-magenta via-pink-300 to-cyan">
              Quality Product From Visaka Paint
            </span>
            <span className="text-white/30 text-xs hidden sm:inline">•</span>
            <span className="text-[11px] sm:text-xs font-semibold text-white/70 hidden sm:inline">
              ISO 9001 Certified Quality
            </span>
          </div>

          {/* Main Services Page Title with Paint Gradient Accent */}
          <div className="max-w-4xl mx-auto mb-6">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.1] tracking-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1493] via-magenta to-[#FF7A00] font-serif">
                Our
              </span>{' '}
              <span className="text-white drop-shadow-md">Services</span>
            </h1>

            {/* Brand Emblem Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6">
              <img
                src={mathulacLogo}
                alt="Visaka Mathulac Paints"
                className="h-7 sm:h-8 w-auto object-contain"
              />
              <span className="h-4 w-[1px] bg-white/20" />
              <span className="text-xs sm:text-sm font-display italic text-[#ffd5e8]">
                “Exceeds Expectation”
              </span>
            </div>

            <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Complete turnkey painting and architectural coating solutions. From surface moisture diagnostics and
              shade visualization to expert application by verified master painters — transforming your property into a
              sparkling landmark.
            </p>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
            <a
              href="#turnkey-solutions"
              className="paint-button px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-magenta via-pink-500 to-violet text-white shadow-xl shadow-magenta/30 hover:scale-105 hover:shadow-magenta/50 transition-all inline-flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-yellow-300" /> Explore Turnkey Solutions
            </a>
            <a
              href="#scope-estimator"
              className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider bg-white/10 hover:bg-white/15 border border-white/20 text-white backdrop-blur-md hover:border-cyan/50 hover:text-cyan transition-all inline-flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-cyan" /> Cost &amp; Time Estimator
            </a>
            <a
              href="#book-consultation"
              className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider bg-cyan hover:bg-sky-400 text-ink shadow-lg shadow-cyan/20 font-bold hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" /> Book Free Site Visit
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-magenta/30 backdrop-blur-md text-center transition-all group">
              <div className="text-2xl sm:text-3xl font-display font-bold text-magenta group-hover:scale-105 transition-transform">
                20+
              </div>
              <div className="text-[11px] text-white/60 font-semibold uppercase tracking-wider mt-1">
                Years of Excellence
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-cyan/30 backdrop-blur-md text-center transition-all group">
              <div className="text-2xl sm:text-3xl font-display font-bold text-cyan group-hover:scale-105 transition-transform">
                100%
              </div>
              <div className="text-[11px] text-white/60 font-semibold uppercase tracking-wider mt-1">
                Verified &amp; Insured Painters
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-leaf/30 backdrop-blur-md text-center transition-all group">
              <div className="text-2xl sm:text-3xl font-display font-bold text-leaf group-hover:scale-105 transition-transform">
                ISO 9001
              </div>
              <div className="text-[11px] text-white/60 font-semibold uppercase tracking-wider mt-1">
                Standardized QA Audits
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-sun/30 backdrop-blur-md text-center transition-all group">
              <div className="text-2xl sm:text-3xl font-display font-bold text-sun group-hover:scale-105 transition-transform">
                78+
              </div>
              <div className="text-[11px] text-white/60 font-semibold uppercase tracking-wider mt-1">
                Curated Color Shades
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. TURNKEY PAINTING SOLUTIONS (Legacy 6 Core Points & Copy) */}
      {/* ============================================================ */}
      <section id="turnkey-solutions" className="relative py-20 px-4 md:px-8 bg-[#090D1A] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-magenta/20 text-magenta text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-magenta/30">
                <Sparkles className="w-3.5 h-3.5" /> End-to-End Execution
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
                Turnkey Painting Solutions
              </h2>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                {legacyTurnkeyCopy.infrastructureText}
              </p>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-magenta/15 via-violet/10 to-transparent border border-magenta/30 mb-8 backdrop-blur-sm">
                <p className="text-white/90 text-sm sm:text-base italic font-serif leading-relaxed">
                  “{legacyTurnkeyCopy.makeoverText}”
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-magenta uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-sun" /> Mathulac Signature Promise
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-cyan/20 border border-cyan/40 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Verified &amp; Insured Personnel</h4>
                    <p className="text-white/60 text-xs mt-0.5">
                      Strict background verification, on-site safety protocols, and full worker compensation coverage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-leaf/20 border border-leaf/40 flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5 text-leaf" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Latest Mechanized Technology</h4>
                    <p className="text-white/60 text-xs mt-0.5">
                      Airless spray guns, auto-sanding vacuum units, and digital pinless moisture meters for flawless finishes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-sun/20 border border-sun/40 flex items-center justify-center shrink-0">
                    <CalendarCheck className="w-5 h-5 text-sun" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Guaranteed Milestones</h4>
                    <p className="text-white/60 text-xs mt-0.5">
                      Clear start and finish dates with daily progress tracking so your plans never get stalled.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Call Us Button */}
              <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-ink via-[#180a24] to-ink border border-white/15 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-magenta/20 border border-magenta/40 flex items-center justify-center text-magenta">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Speak to an Engineer</div>
                    <a
                      href={`tel:${phoneNumbers[0].replace(/\s/g, '')}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-magenta transition-colors"
                    >
                      {phoneNumbers[0]}
                    </a>
                  </div>
                </div>
                <a
                  href={`tel:${phoneNumbers[1].replace(/\s/g, '')}`}
                  className="hidden sm:inline-block text-xs font-bold text-cyan hover:underline"
                >
                  Alt: {phoneNumbers[1]}
                </a>
              </div>
            </div>

            {/* Right 6 Turnkey Pillar Cards (The 6 exact bullet points from the legacy site) */}
            <div className="lg:col-span-7">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-white font-bold text-lg sm:text-xl flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-leaf" /> Our 6-Point Turnkey Standard
                </h3>
                <span className="text-xs text-white/50">Referenced from legacy Mathulac service standard</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {turnkeyChecklist.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="group relative p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-md"
                            style={{ background: `${item.color}22`, border: `1px solid ${item.color}55` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: item.color }} />
                          </div>
                          <span
                            className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full"
                            style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}40` }}
                          >
                            {item.badge}
                          </span>
                        </div>

                        <h4 className="text-white font-bold text-base mb-2 group-hover:text-white transition-colors">
                          {item.title}
                        </h4>

                        <p className="text-white/65 text-xs sm:text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-bold text-white/40 group-hover:text-white/80 transition-colors">
                        <Check className="w-3.5 h-3.5 text-leaf" /> Guaranteed Visaka Mathulac Standard
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Banner note under grid */}
              <div className="mt-6 p-4 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center gap-3 text-cyan text-xs">
                <Palette className="w-5 h-5 shrink-0" />
                <span>
                  <strong>Mathulac Color Visualizer Assistance Included:</strong> Every turnkey project includes free
                  digital shade simulation on your building photographs before color finalization.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. COMPREHENSIVE SERVICE CATALOG (8 Specialized Domains) */}
      {/* ============================================================ */}
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-[#0A0D18] via-[#0d091a] to-[#0A0D18] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan/20 text-cyan text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-cyan/30">
              <Layers className="w-3.5 h-3.5" /> Specialized Coating Domains
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              Specialized Painting &amp; Coating Catalog
            </h2>
            <p className="text-white/70 text-xs sm:text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Whatever your substrate — interior walls, exterior facade, fine furniture timber, or industrial steel —
              Mathulac engineers the exact chemical system for superior performance.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { id: 'all', label: 'All Services' },
                { id: 'residential', label: 'Residential & Villas' },
                { id: 'commercial', label: 'Commercial & Corporate' },
                { id: 'industrial', label: 'Industrial & Auto' },
                { id: 'specialized', label: 'Wood & Specialized' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedServiceCat(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedServiceCat === tab.id
                      ? 'bg-magenta text-white shadow-lg shadow-magenta/30 scale-105'
                      : 'bg-white/[0.05] hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="group relative rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col overflow-hidden shadow-xl"
                >
                  {/* Card Header Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-ink">
                    <img
                      src={srv.bannerImage}
                      alt={srv.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D18] via-[#0A0D18]/40 to-transparent" />
                    <div
                      className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md shadow-md"
                      style={{ background: `${srv.color}33`, border: `1px solid ${srv.color}66` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: srv.color }} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider mb-1" style={{ color: srv.color }}>
                        {srv.category}
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1 group-hover:text-white transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-white/50 text-xs italic mb-3">{srv.tagline}</p>
                      <p className="text-white/70 text-xs leading-relaxed line-clamp-3 mb-4">{srv.description}</p>
                    </div>

                    <div>
                      <div className="border-t border-white/10 pt-3 mb-4">
                        <div className="text-[10px] uppercase font-bold text-white/50 tracking-wider mb-1.5">
                          Key Deliverables:
                        </div>
                        <ul className="space-y-1">
                          {srv.deliverables.slice(0, 2).map((del, i) => (
                            <li key={i} className="text-white/80 text-[11px] flex items-center gap-1.5 truncate">
                              <CheckCircle2 className="w-3 h-3 text-leaf shrink-0" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => setActiveServiceModal(srv)}
                        className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/15"
                      >
                        <span>View Scope &amp; Specifications</span>
                        <ChevronRight className="w-3.5 h-3.5 text-cyan" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. INTERACTIVE 7-STEP EXECUTION JOURNEY */}
      {/* ============================================================ */}
      <section className="relative py-20 px-4 md:px-8 bg-[#060914] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-leaf/20 text-leaf text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-leaf/30">
              <Clock className="w-3.5 h-3.5" /> Systematic Workflow
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              The Mathulac Service Journey
            </h2>
            <p className="text-white/70 text-xs sm:text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Every turnkey contract adheres to our structured 7-stage workflow, providing complete visibility from initial
              moisture diagnosis to final certified handover.
            </p>
          </div>

          {/* ============================================================ */}
          {/* RESPONSIVE CONNECTED STEPPER (NO HORIZONTAL SCROLLBAR) */}
          {/* ============================================================ */}
          <div className="max-w-5xl mx-auto mb-10">
            {/* Desktop / Tablet: Connected 7-Node Stepper Track */}
            <div className="hidden md:block relative">
              {/* Connecting Background Line */}
              <div className="absolute top-6 left-8 right-8 h-1 bg-white/10 rounded-full" />
              {/* Connecting Active Progress Line */}
              <div
                className="absolute top-6 left-8 h-1 bg-gradient-to-r from-magenta via-pink-500 to-cyan rounded-full transition-all duration-500"
                style={{
                  width: `${(activeStepIndex / (serviceProcessSteps.length - 1)) * 100}%`,
                  maxWidth: 'calc(100% - 64px)',
                }}
              />

              {/* 7 Step Nodes Grid */}
              <div className="grid grid-cols-7 relative z-10">
                {serviceProcessSteps.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  const isCompleted = activeStepIndex > idx;
                  const Icon = step.icon;

                  return (
                    <button
                      key={step.step}
                      type="button"
                      onClick={() => setActiveStepIndex(idx)}
                      className="group flex flex-col items-center text-center cursor-pointer transition-all focus:outline-none"
                    >
                      {/* Step Circle Node */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
                          isActive
                            ? 'scale-110 shadow-magenta/40 ring-4 ring-magenta/30 bg-gradient-to-br from-magenta to-violet text-white'
                            : isCompleted
                            ? 'bg-ink border-2 border-magenta text-magenta hover:scale-105'
                            : 'bg-[#0e1222] border border-white/15 text-white/50 hover:border-white/40 hover:text-white hover:scale-105'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5 text-magenta" />
                        ) : (
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-current'}`} />
                        )}
                      </div>

                      {/* Step Label */}
                      <div className="mt-3 px-1">
                        <div
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider transition-colors ${
                            isActive ? 'text-cyan' : isCompleted ? 'text-white/80' : 'text-white/40'
                          }`}
                        >
                          Step {step.step}
                        </div>
                        <div
                          className={`text-xs font-bold mt-0.5 transition-colors line-clamp-1 ${
                            isActive ? 'text-white' : isCompleted ? 'text-white/80' : 'text-white/50'
                          }`}
                        >
                          {step.phase}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile View: Compact Step Chips & Step Counter */}
            <div className="md:hidden">
              {/* Step dots / small badges */}
              <div className="grid grid-cols-7 gap-1.5 p-2 rounded-2xl bg-white/[0.04] border border-white/10 mb-4">
                {serviceProcessSteps.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  const isCompleted = activeStepIndex > idx;
                  return (
                    <button
                      key={step.step}
                      type="button"
                      onClick={() => setActiveStepIndex(idx)}
                      className={`h-9 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-magenta to-violet text-white shadow-md'
                          : isCompleted
                          ? 'bg-magenta/20 text-magenta border border-magenta/40'
                          : 'bg-white/[0.04] text-white/40'
                      }`}
                    >
                      {isCompleted ? '✓' : step.step}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Active Step Info */}
              <div className="flex items-center justify-between text-xs text-white/70 px-1">
                <span>Phase {activeStep.step} of 7: <strong className="text-white">{activeStep.phase}</strong></span>
                <span className="text-cyan font-bold">{activeStep.title}</span>
              </div>
            </div>
          </div>

          {/* Active Step Feature Box */}
          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.06] via-[#150a24]/40 to-ink border border-white/15 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: `${activeStep.color}25`, border: `1px solid ${activeStep.color}60` }}
                >
                  {React.createElement(activeStep.icon, {
                    className: 'w-8 h-8',
                    style: { color: activeStep.color },
                  })}
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-white/50">
                    Phase {activeStep.step} of 7 • {activeStep.phase}
                  </div>
                  <h3 className="text-white font-display text-2xl sm:text-3xl font-bold mt-0.5">
                    {activeStep.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold"
                >
                  Previous
                </button>
                <button
                  disabled={activeStepIndex === serviceProcessSteps.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(serviceProcessSteps.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl bg-cyan text-ink hover:bg-sky-400 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold"
                >
                  Next Stage
                </button>
              </div>
            </div>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed my-6 font-medium">
              {activeStep.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-3.5">
              {activeStep.details.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-leaf shrink-0 mt-0.5" />
                  <span className="text-white/85 text-xs sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. PROJECT REFERENCES (From mathulac.com - Click to View our Project) */}
      {/* ============================================================ */}
      <section id="project-references" className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-[#060914] via-[#0b0f20] to-[#0A0D18] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          {/* Header and Legacy Statement */}
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-magenta/20 text-magenta text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-magenta/30">
                <Award className="w-3.5 h-3.5" /> Landmark Transformations
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
                Project References &amp; Regional Portfolio
              </h2>
              <p className="text-white/70 text-xs sm:text-sm mt-3 leading-relaxed">
                {legacyTurnkeyCopy.projectReferenceIntro}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-2">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'residential', label: 'Villas' },
                { id: 'commercial', label: 'Commercial' },
                { id: 'apartments', label: 'Apartments' },
                { id: 'industrial', label: 'Industrial' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedProjectCat(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedProjectCat === tab.id
                      ? 'bg-cyan text-ink font-bold shadow-md shadow-cyan/30 scale-105'
                      : 'bg-white/[0.05] hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Reference Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="group relative rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between cursor-pointer"
                onClick={() => setActiveProjectModal(proj)}
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-ink">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-ink/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-magenta uppercase">
                      {proj.category}
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-ink/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white/70">
                      {proj.year}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/80">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-magenta" /> {proj.location}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-cyan">{proj.area}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-cyan transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-white/60 text-xs mb-3 line-clamp-2">{proj.description}</p>

                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      <div className="text-[10px] font-mono text-white/40 uppercase font-bold">Scope &amp; Coating System:</div>
                      <div className="text-white/80 text-xs font-semibold truncate">{proj.systemUsed}</div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2">
                  <div className="w-full py-2 px-3 rounded-xl bg-white/10 group-hover:bg-cyan group-hover:text-ink text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all">
                    <span>Click to View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. INTERACTIVE TURNKEY SCOPE & TIMELINE ESTIMATOR */}
      {/* ============================================================ */}
      <section id="scope-estimator" className="relative py-20 px-4 md:px-8 bg-[#090D1A] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sun/20 text-sun text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-sun/30">
              <Calculator className="w-3.5 h-3.5" /> Instant Estimation Engine
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              Turnkey Scope &amp; Schedule Estimator
            </h2>
            <p className="text-white/70 text-xs sm:text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Estimate your project timeframe and get recommended Mathulac product systems customized for your
              property type and area.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.04] via-[#160b24]/50 to-ink border border-white/15 backdrop-blur-xl shadow-2xl">
            {/* Controls Side */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-3">
                  1. Select Property Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {propertyPresets.map((preset) => {
                    const Icon = preset.icon;
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setSelectedPresetId(preset.id);
                          setCustomArea(preset.defaultArea);
                        }}
                        className={`p-3.5 rounded-xl text-left transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-magenta/25 border-2 border-magenta text-white shadow-lg'
                            : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-white/70'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-magenta text-white' : 'bg-white/10 text-white/60'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-xs sm:text-sm text-white truncate">{preset.name}</div>
                          <div className="text-[10px] text-white/50 truncate mt-0.5">{preset.defaultArea} sq. ft typical</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/70">
                    2. Approximate Area (sq. ft)
                  </label>
                  <span className="text-sm font-mono font-bold text-cyan bg-cyan/10 px-2.5 py-0.5 rounded-md border border-cyan/30">
                    {customArea.toLocaleString()} sq. ft
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="250"
                  value={customArea}
                  onChange={(e) => setCustomArea(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-magenta"
                />
                <div className="flex justify-between text-[10px] text-white/40 font-mono mt-1">
                  <span>500 sq.ft</span>
                  <span>10,000 sq.ft</span>
                  <span>25,000 sq.ft</span>
                  <span>50,000+ sq.ft</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                  3. Execution Pace
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUrgencyMode('standard')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      urgencyMode === 'standard'
                        ? 'bg-white/20 border-white text-white'
                        : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    Standard Single Shift
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgencyMode('express')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      urgencyMode === 'express'
                        ? 'bg-cyan/30 border-cyan text-cyan'
                        : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    Express Multi-Shift (Faster)
                  </button>
                </div>
              </div>
            </div>

            {/* Results Side */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-black/40 border border-white/15 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-magenta mb-2">
                  Project Estimate Breakdown
                </div>
                <h3 className="text-white font-display text-xl font-bold mb-4">{selectedPreset.name}</h3>

                <div className="space-y-4 mb-6">
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-[10px] text-white/50 uppercase font-bold">Estimated Turnaround:</div>
                    <div className="text-2xl font-display font-bold text-leaf mt-0.5 flex items-baseline gap-2">
                      <span>{estimatedDays} Working Days</span>
                      {urgencyMode === 'express' && (
                        <span className="text-[10px] font-mono text-cyan bg-cyan/20 px-2 py-0.5 rounded">Express</span>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-[10px] text-white/50 uppercase font-bold">Recommended Paint System:</div>
                    <div className="text-xs font-bold text-white/90 mt-1 leading-relaxed">{selectedPreset.system}</div>
                  </div>

                  <div className="space-y-1.5 text-xs text-white/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-leaf" /> Free on-site moisture test included
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-leaf" /> Mathulac Color Visualizer simulation
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-leaf" /> Verified &amp; insured painter crew
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#book-consultation"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-magenta via-pink-500 to-violet text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xl shadow-magenta/20 hover:scale-105 transition-all"
              >
                <span>Request Site Inspection For This Area</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. PEACE-OF-MIND SERVICE GUARANTEES */}
      {/* ============================================================ */}
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-[#090D1A] to-ink border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-magenta/20 text-magenta text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-magenta/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Customer Peace of Mind
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              Why Homeowners &amp; Corporates Trust Visaka
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceGuarantees.map((g, i) => {
              const Icon = g.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all shadow-xl"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${g.color}22`, border: `1px solid ${g.color}50` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: g.color }} />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{g.title}</h3>
                  <p className="text-white/65 text-xs sm:text-sm leading-relaxed">{g.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. BOOKING FORM & INQUIRY HOTLINES (Direct from legacy site) */}
      {/* ============================================================ */}
      <section id="book-consultation" className="relative py-20 px-4 md:px-8 bg-[#060814] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Hotline Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan/20 text-cyan text-[11px] font-extrabold uppercase tracking-widest border border-cyan/30">
                <CalendarCheck className="w-3.5 h-3.5" /> Schedule Your Visit
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Schedule a Free Technical Site Visit
              </h2>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Our certified coatings engineer will visit your location, carry out surface moisture diagnostics, guide
                suitable paints, and prepare an itemized estimation.
              </p>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-white/50">Official Service Helplines:</div>
                {phoneNumbers.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.04] hover:bg-magenta/20 border border-white/10 hover:border-magenta transition-all text-white font-bold text-sm sm:text-base"
                  >
                    <Phone className="w-5 h-5 text-magenta" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs text-white/60">
                <MapPin className="w-4 h-4 text-leaf shrink-0" />
                <span>Serving Coimbatore, Tamil Nadu, and regional projects across South India.</span>
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.06] via-[#180d2b]/60 to-ink border border-white/15 shadow-2xl backdrop-blur-xl">
                {formSubmitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-leaf/20 border border-leaf text-leaf mx-auto flex items-center justify-center">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">Consultation Request Received!</h3>
                    <p className="text-white/70 text-sm max-w-md mx-auto">
                      Thank you, <strong>{formState.name}</strong>. Our senior technical supervisor will call you at{' '}
                      <strong>{formState.phone}</strong> to confirm your site visit slot.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white mt-4"
                    >
                      Book Another Visit
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Kumar"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-magenta transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-magenta transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                          Property Type
                        </label>
                        <select
                          value={formState.propertyType}
                          onChange={(e) => setFormState({ ...formState, propertyType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-ink border border-white/15 text-white text-sm focus:outline-none focus:border-magenta transition-colors"
                        >
                          <option value="Luxury Villa">Luxury Independent Villa</option>
                          <option value="Apartment Flat">Apartment (2BHK / 3BHK)</option>
                          <option value="Commercial Office">Commercial Office / IT Park</option>
                          <option value="Building Exterior Makeover">Building Exterior Makeover</option>
                          <option value="Industrial Factory">Industrial Factory / Warehouse</option>
                          <option value="Automotive Studio">Automotive / Specialized Studio</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                          City / Location
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Coimbatore / Pollachi / Tirupur"
                          value={formState.city}
                          onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-magenta transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Primary Service Required
                      </label>
                      <select
                        value={formState.serviceNeeded}
                        onChange={(e) => setFormState({ ...formState, serviceNeeded: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-ink border border-white/15 text-white text-sm focus:outline-none focus:border-magenta transition-colors"
                      >
                        <option value="Full Turnkey Painting (Interior & Exterior)">
                          Full Turnkey Painting (Interior &amp; Exterior)
                        </option>
                        <option value="Exterior Weather-Proof Facade Makeover">
                          Exterior Weather-Proof Facade Makeover
                        </option>
                        <option value="Architectural Wood & PU Lacquer">
                          Architectural Wood &amp; PU Lacquer
                        </option>
                        <option value="Commercial Fast-Track Repainting">
                          Commercial Fast-Track Repainting
                        </option>
                        <option value="Waterproofing & Moisture Diagnostic">
                          Waterproofing &amp; Moisture Diagnostic
                        </option>
                        <option value="Mathulac Color Visualizer Consultation">
                          Mathulac Color Visualizer Consultation
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Additional Notes / Special Instructions
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about the property size, current paint condition, or target move-in date..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-magenta transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-magenta via-pink-500 to-violet text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-magenta/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      <span>Confirm &amp; Schedule Site Inspection</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. MODAL: DETAILED SERVICE SPECIFICATIONS */}
      {/* ============================================================ */}
      {activeServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e111d] border border-white/20 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setActiveServiceModal(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${activeServiceModal.color}25`, border: `1px solid ${activeServiceModal.color}60` }}
              >
                {React.createElement(activeServiceModal.icon, {
                  className: 'w-6 h-6',
                  style: { color: activeServiceModal.color },
                })}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-white/50">
                  {activeServiceModal.category} Domain
                </span>
                <h3 className="text-white font-display text-2xl font-bold">{activeServiceModal.title}</h3>
              </div>
            </div>

            <p className="text-white/80 text-sm leading-relaxed mb-6">{activeServiceModal.description}</p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-magenta mb-2">Scope Deliverables:</div>
                <ul className="space-y-2">
                  {activeServiceModal.deliverables.map((del, i) => (
                    <li key={i} className="text-white/80 text-xs flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-leaf shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan mb-1.5">Recommended For:</div>
                <p className="text-white/80 text-xs">{activeServiceModal.recommendedFor}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-sun mb-1.5">Popular Finish Systems:</div>
                <div className="flex flex-wrap gap-2">
                  {activeServiceModal.popularFinishes.map((fin, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-white/10 text-white text-[11px] font-semibold">
                      {fin}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="#book-consultation"
                onClick={() => setActiveServiceModal(null)}
                className="flex-1 py-3 rounded-xl bg-magenta hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-wider text-center"
              >
                Inquire For This Service
              </a>
              <button
                onClick={() => setActiveServiceModal(null)}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 11. MODAL: PROJECT REFERENCE DETAIL */}
      {/* ============================================================ */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e111d] border border-white/20 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-56 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 overflow-hidden relative">
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e111d] via-transparent to-transparent" />
            </div>

            <span className="text-xs font-mono uppercase font-bold text-magenta bg-magenta/10 px-2.5 py-1 rounded-md border border-magenta/30">
              {activeProjectModal.category}
            </span>

            <h3 className="text-white font-display text-2xl font-bold mt-2 mb-1">{activeProjectModal.title}</h3>
            <p className="text-white/60 text-xs flex items-center gap-2 mb-4">
              <MapPin className="w-3.5 h-3.5 text-magenta" /> {activeProjectModal.location} • Completed {activeProjectModal.year}
            </p>

            <p className="text-white/80 text-sm leading-relaxed mb-6">{activeProjectModal.description}</p>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                <div className="text-[10px] text-white/50 uppercase font-bold">Total Coating Area:</div>
                <div className="text-sm font-bold text-cyan mt-0.5">{activeProjectModal.area}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                <div className="text-[10px] text-white/50 uppercase font-bold">Coating System:</div>
                <div className="text-sm font-bold text-sun mt-0.5">{activeProjectModal.systemUsed}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Project Highlights:</div>
              <div className="flex flex-wrap gap-2">
                {activeProjectModal.highlights.map((h, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-leaf/15 text-leaf border border-leaf/30 text-xs font-semibold">
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveProjectModal(null)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Back to Services
            </button>
          </div>
        </div>
      )}

      {/* Inquiry & Location Bottom Banner */}
      <ContactSection />
    </div>
  );
}

export default ServicesPage;
