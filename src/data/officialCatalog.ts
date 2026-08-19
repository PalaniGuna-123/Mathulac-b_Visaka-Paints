import type { OfficialProductSpec, SyntheticEnamelShade, ProblemSolverItem } from '../types';

/* ==========================================================================
   VISAKA MATHULAC OFFICIAL PRODUCT CATALOG SPECIFICATIONS
   Extracted directly from official technical datasheets and specifications.
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. AUTO FINISHES
// --------------------------------------------------------------------------

export const autoPrimersProducts: OfficialProductSpec[] = [
  {
    id: 'zinc-chrome-metal',
    mainCategory: 'Auto Finishes',
    subcategory: 'Auto Primers',
    productName: 'Zinc Chrome Metal',
    color: 'Yellow / Golden Swatch',
    colorSwatchHex: '#EAB308',
    usageFeatures:
      'Single pack, modified alkyd based, air drying solvent based anti-corrosive primer with Zinc chrome content. Compatible with NC, Stoving & PU coatings.',
    specs: {
      mixingRatio: 'Dilute with 30% of Enamel or NC Thinner V-13 x',
      applicationMethod: 'By Spray / Brush',
      noOfCoats: '1 - 2 coats',
      potLife: 'Not Applicable',
      dryingTime: '20 mins / 8 hours',
      flashOff: '10 - 15 mins',
      sandPaper: 'P-180 / P-240',
      methodOfSanding: 'Dry Sanding',
      background: 'Not Required',
      hardenerInduction: 'Bare M.S. metal thoroughly cleaned from rust, grease etc., and scrub with 100 no emery paper.',
      buffing: '70 ± 5 sec / 4 cup',
      supplyViscosity: '120 ± 5 sec / 4 cup',
      sprayViscosity: 'Not Applicable',
      coverage: '110 - 120 sq.ft',
    },
  },
  {
    id: 'oil-primer-brown',
    mainCategory: 'Auto Finishes',
    subcategory: 'Auto Primers',
    productName: 'Oil Primer Brown',
    color: 'Brown Swatch',
    colorSwatchHex: '#78350F',
    usageFeatures:
      'Single pack, modified alkyd based, air drying solvent based anti-corrosive primer with syn. Red oxide and Zinc chrome Pigments. Compatible with NC, Stoving & PU coatings.',
    specs: {
      mixingRatio: 'Dilute with 30% of Enamel or NC Thinner V-13 x',
      applicationMethod: 'By Spray / Brush',
      noOfCoats: '1 - 2 coats',
      potLife: 'Not Applicable',
      dryingTime: '20 mins / 8 hours',
      flashOff: '10 - 15 mins',
      sandPaper: 'P-180 / P-240',
      methodOfSanding: 'Dry Sanding',
      background: 'Bare M.S. metal thoroughly cleaned from rust, grease etc., and scrub with 100 no emery papers.',
      hardenerInduction: 'Not Applicable',
      buffing: 'Not Required',
      supplyViscosity: '120 ± 5 sec / 4 cup',
      sprayViscosity: '22 ± 2 sec / 4 cup',
      coverage: '110 - 120 sq.ft',
    },
  },
];

export const autoUnderCoatSurfaces: OfficialProductSpec[] = [
  {
    id: 'speed-kote-primer-surfaces',
    mainCategory: 'Auto Finishes',
    subcategory: 'Auto Under Coat Surfaces',
    productName: 'Speed Kote Primer Surfaces',
    color: 'Grey Swatch',
    colorSwatchHex: '#64748B',
    usageFeatures:
      'A versatile single pack, Hi-build, air drying primer surface having good adhesion to Oil & Etch primers. Compatible with NC, Stoving & PU coatings.',
    specs: {
      mixingRatio: 'Dilute with 30% of Enamel or NC Thinner V-13 x',
      applicationMethod: 'By Spray / Brush',
      noOfCoats: '2 - 3 coats',
      potLife: 'Not Applicable',
      dryingTime: '20 mins / 8 hours',
      flashOff: '10 - 15 mins',
      sandPaper: 'P-240 / P-320',
      methodOfSanding: 'Wet or Dry',
      background: 'Anti-corrosive primer applied and scrubbed surface',
      hardenerInduction: 'Not Applicable',
      buffing: 'Not Required',
      supplyViscosity: '130 ± 5 sec / 4 cup',
      sprayViscosity: '22 ± 2 sec / 4 cup',
    },
  },
];

export const puttyAutoBodyFillers: OfficialProductSpec[] = [
  {
    id: 'nc-putty-grey',
    mainCategory: 'Auto Finishes',
    subcategory: 'Putty / Auto Body Fillers',
    productName: 'NC Putty - Grey',
    color: 'Grey Swatch',
    colorSwatchHex: '#94A3B8',
    usageFeatures:
      'Fast drying, NC based Hi-solid filler to seal micro dents and yields better adhesion to Surfaces. Highly suitable for Industrial purpose.',
    specs: {
      mixingRatio: 'Dilute with NC Thinner as required',
      applicationMethod: 'By Putty knife',
      noOfCoats: 'As required',
      potLife: 'Not Applicable',
      dryingTime: '4 hours',
      flashOff: '10 - 15 mins',
      sandPaper: 'P-50 / P-80',
      methodOfSanding: 'Wet Sanding',
      background: 'Oil / NC / PU base surface primer applied and scrubbed panels',
      hardenerInduction: 'Not Applicable',
      buffing: 'Not Required',
      supplyViscosity: 'Semi - Solid',
      sprayViscosity: 'Not Applicable',
      flashPoint: 'Above 20° deg C',
    },
  },
  {
    id: 'og-putty',
    mainCategory: 'Auto Finishes',
    subcategory: 'Putty / Auto Body Fillers',
    productName: 'OG Putty',
    color: 'Grey Swatch',
    colorSwatchHex: '#9CA3AF',
    usageFeatures:
      'Alkyd resin base hi-solid putty with medium drying property. Has good compatible with air dry & industrial stoving.',
    specs: {
      mixingRatio: 'Dilute with NC Thinner as required',
      applicationMethod: 'By Putty knife',
      noOfCoats: 'As required',
      potLife: 'Not Applicable',
      dryingTime: '4 hours',
      flashOff: '10 - 15 mins',
      sandPaper: 'P-150 / P-180',
      methodOfSanding: 'Wet Sanding',
      background: 'Speed kote Primer Surfaces applied area.',
      hardenerInduction: 'Not Applicable',
      buffing: 'Not Required',
      supplyViscosity: 'Semi - Solid',
      sprayViscosity: 'Not Applicable',
      coverage: '-',
      flashPoint: 'Above 20° deg C',
    },
  },
];

export const autoTopCoatSolidColors: OfficialProductSpec[] = [
  {
    id: 'synthetic-enamel',
    mainCategory: 'Auto Finishes',
    subcategory: 'Auto Top Coat - Solid Colors',
    productName: 'Synthetic Enamel',
    usageFeatures:
      'long oil alkyd resin based enamel has better outdoor exposure on all types of metal and Auto body. Recommended for economical auto refinish due to its excellent gloss level.',
    specs: {
      mixingRatio: 'Dilute with 30% of Enamel or NC Thinner V-13 x',
      applicationMethod: 'By Spray',
      noOfCoats: '1 Coat',
      potLife: 'Not Applicable',
      dryingTime: '3-4 hrs / 24 hours',
      sandPaper: 'P-400 / P-600',
      methodOfSanding: 'Dry or wet Sanding',
      background: 'Well scrubbed Speed kote surface primer applied area',
      hardenerInduction: 'Not Applicable',
      buffing: 'Not Required',
      supplyViscosity: '120 ± 5 sec / 4 cup',
      sprayViscosity: '20 ± 2 sec / 4 cup',
      coverage: '120 - 130 sq.ft',
      flashPoint: 'Above 27° deg C',
    },
  },
  {
    id: 'general-purpose-enamel',
    mainCategory: 'Auto Finishes',
    subcategory: 'Auto Top Coat - Solid Colors',
    productName: 'General Purpose Enamel',
    usageFeatures:
      'Medium oil alkyd resin based enamel has better indoor and base coat hiding on all types of metal and Auto body. Recommended for economical auto refinish due to its excellent gloss level.',
    specs: {
      mixingRatio: 'Dilute with 30% of mathulac Thinner V27',
      applicationMethod: 'By Spray',
      noOfCoats: '1 Coat',
      potLife: 'Not Applicable',
      dryingTime: '2-3 hrs / 24 hours',
      sandPaper: '-',
      methodOfSanding: '-',
      background: 'Well scrubbed Speed kote primer surface applied area',
      hardenerInduction: 'Not Applicable',
      buffing: 'Not Required',
      supplyViscosity: '120 ± 5 sec / 6 cup',
      sprayViscosity: '20 ± 2 sec / 4 cup',
      coverage: '110 - 120 sq.ft',
      flashPoint: 'Above 27° deg C',
    },
  },
];

export const syntheticEnamelColorShades: SyntheticEnamelShade[] = [
  { id: '1', name: 'WildPurple', code: 'VP 0718', hex: '#6B21A8' },
  { id: '2', name: 'WildLilac', code: 'VP 0712', hex: '#9333EA' },
  { id: '3', name: 'WaterGreen', code: 'VP 0246', hex: '#10B981' },
  { id: '4', name: 'Suede', code: 'VP 0N01', hex: '#D4B996' },
  { id: '5', name: 'TeakBrown', code: 'VP 4244', hex: '#5B3A29' },
  { id: '6', name: 'SmokeGrey', code: 'VP G - VP 0...', hex: '#64748B' },
  { id: '7', name: 'SkyBlue', code: 'VP 0125', hex: '#38BDF8' },
  { id: '8', name: 'SignalRed', code: 'VP 0520', hex: '#EF4444' },
  { id: '9', name: 'SatinBlue', code: 'VP 0124', hex: '#2563EB' },
  { id: '10', name: 'Sandstone', code: 'VP G - VP 0333', hex: '#D6C0A4' },
  { id: '11', name: 'SandalWood', code: 'VP 0485', hex: '#C29B7F' },
  { id: '12', name: 'RoyalIvory', code: 'VP 0331', hex: '#FDF6E2' },
  { id: '13', name: 'RoyalBlue', code: 'VP 0123', hex: '#1D4ED8' },
  { id: '14', name: 'RawSilk', code: 'VP 0351', hex: '#EBE3D5' },
  { id: '15', name: 'Pista', code: 'VP 0292', hex: '#A7F3D0' },
  { id: '16', name: 'Phirozi', code: 'VP 0121', hex: '#06B6D4' },
  { id: '17', name: 'Petal', code: 'VP 0P05', hex: '#FCE7F3' },
  { id: '18', name: 'PaleRose', code: 'VP G - VP 0421', hex: '#FBCFE8' },
  { id: '19', name: 'PaleCream', code: 'VP 0328', hex: '#FEF9C3' },
  { id: '20', name: 'PoRed', code: 'VP 0518', hex: '#DC2626' },
  { id: '21', name: 'OxfordBlue', code: 'VP 0119', hex: '#1E3A8A' },
  { id: '22', name: 'Offwhite', code: 'VP 0905', hex: '#F8FAFC' },
  { id: '23', name: 'Mushroom', code: 'VP 0422', hex: '#A89F91' },
  { id: '24', name: 'MintGreen', code: 'VP 0253', hex: '#6EE7B7' },
];

export const autoTopCoatMetallicFinishes: OfficialProductSpec[] = [
  {
    id: 'synthetic-fast-drying-aluminum',
    mainCategory: 'Auto Finishes',
    subcategory: 'Auto Top Coat Metallic Finishes',
    productName: 'Synthetic Fast Drying Aluminum',
    usageFeatures:
      'Single pack, Heat (up to 225 deg C) & Corrosion resistant metal coating has very fast air drying mechanism. Both flat and sparkle finishes are available.',
    specs: {
      mixingRatio: 'Dilute with 30% of Mathulac Thinner Sk - 58.',
      applicationMethod: 'By Spray',
      noOfCoats: '1 Coat',
      potLife: 'Not Applicable',
      dryingTime: '10 mins / 24 hours',
      flashOff: '10- 15 mins',
      sandPaper: '-',
      methodOfSanding: 'Blank / not specified',
      background: 'Well scrubbed Speed kote primer surface applied area.',
      hardenerInduction: 'Not Applicable',
      buffing: 'Not Required',
      supplyViscosity: '80 ± 5sec/4cup',
      sprayViscosity: '22 ± 2 sec / 4 cup',
      coverage: '100 - 110 sq.ft',
      flashPoint: 'Above 27° deg C',
    },
  },
  {
    id: 'nc-based-lacquer-aluminum',
    mainCategory: 'Auto Finishes',
    subcategory: 'Auto Top Coat Metallic Finishes',
    productName: 'NC Based Lacquer Aluminum',
    usageFeatures:
      'Nitrocellulose base top coat Aluminum for Auto and general Industrial purpose. Flat metallic finish is available.',
    specs: {
      mixingRatio: 'Dilute with 100% of Mathulac Thinner Sk - 58.',
      applicationMethod: 'By Spray',
      noOfCoats: '1 Coat',
      potLife: 'Not Applicable',
      dryingTime: '10 mins / 24 hours',
      flashOff: '-',
      sandPaper: '5 - 10 mins',
      methodOfSanding: 'Blank / not specified',
      background: 'Well scrubbed Speed kote primer surface applied area.',
      hardenerInduction: 'Not Applicable',
      buffing: 'Not Required',
      supplyViscosity: '90 ± 5 sec / 6 cup',
      sprayViscosity: '20 ± 2 sec /4 cup',
      coverage: '100 - 110 sq.ft',
      flashPoint: 'Above 20° deg C',
    },
  },
];

export const autoTopCoatClears: OfficialProductSpec[] = [
  {
    id: 'synthetic-enamel-clear',
    mainCategory: 'Auto Finishes',
    subcategory: 'Auto Top Coat Clears',
    productName: 'Synthetic Enamel Clear',
    usageFeatures:
      'Long oil alkyd resin based enamel has better outdoor exposure Top coat clear for Industrial / Auto refinish sector.',
    specs: {
      mixingRatio: 'Dilute with 30% of Enamel or NC Thinner V-13 x',
      applicationMethod: 'By Spray',
      noOfCoats: '1 Coat',
      potLife: 'Not Applicable',
      dryingTime: '3-4 hrs / 24 hours',
      sandPaper: 'P-400 / P-600',
      methodOfSanding: 'Dry or wet Sanding',
      background: 'Synthetic based Solid color applied smooth surface.',
      hardenerInduction: 'Not Applicable',
      buffing: 'Not Required',
      supplyViscosity: '120 ± 5 sec/4 cup',
      sprayViscosity: '20 ± 2 sec/4 cup',
      coverage: '120 - 130 sq.ft',
      flashPoint: 'Above 27° deg C',
    },
  },
  {
    id: 'nc-auto-lacquer-clear',
    mainCategory: 'Auto Finishes',
    subcategory: 'Auto Top Coat Clears',
    productName: 'NC Auto Lacquer Clear',
    usageFeatures:
      'Nitro cellulose based buffable top coat clear for Industrial / Auto refinish sector. Due to fast drying, high productivity possible. Buffable grade.',
    specs: {
      mixingRatio: 'Dilute with 50% of Mathulac Thinner Sk - 58.',
      applicationMethod: 'By Spray',
      noOfCoats: '1 - 2 Coats',
      potLife: 'Not Applicable',
      dryingTime: '20 mins 4 hours',
      flashOff: '5-10 mins',
      sandPaper: 'P-600 / P-1000',
      methodOfSanding: 'Wet Sanding',
      background: 'NC Base Metallic or Solid color applied smooth surface.',
      hardenerInduction: 'Not Applicable',
      buffing: 'Wax buffing recommended',
      supplyViscosity: '70 ± 5sec/6cup',
      sprayViscosity: '20m ± 2 sec/4 cup',
      coverage: '80 - 90 sq.ft',
      flashPoint: 'Above 20° deg C',
    },
  },
];

// --------------------------------------------------------------------------
// 2. WOOD FINISHES
// --------------------------------------------------------------------------

export const woodFinishesProducts: OfficialProductSpec[] = [
  {
    id: 'melamine-base',
    mainCategory: 'Wood Finishes',
    subcategory: 'Melamine Base',
    productName: 'Melamine Base',
    usageFeatures:
      '2-pack Hi-build Acid catalyst sealer with medium drying. Excellent filling properties, easy sanding. Water white in nature.',
    specs: {
      mixingRatio: 'Base - 0.9 part, Catalyst - 0.1 part, NC Thinner V106 - 0.3 part.',
      applicationMethod: 'By Spray / Brush',
      noOfCoats: '2 coats',
      potLife: '8 hours @ 30 deg C',
      dryingTime: '4 hours',
      flashOff: '20 mins',
      sandPaper: 'P-2401, P-3201',
      methodOfSanding: 'Dry sanding only',
      background: 'Pores filled with NC / OB filler followed by NC Sealer and thoroughly scrubbed solid wood & venners.',
      hardenerInduction: 'AC - 09',
      buffing: 'Not Required',
      sprayViscosity: '18 +/- 1” in 4mm cup',
      coveringViscosity: '100 - 110 sq.ft',
    },
  },
  {
    id: 'wood-polish-colorless',
    mainCategory: 'Wood Finishes',
    subcategory: 'Wood Polish',
    productName: 'Wood Polish - Colorless',
    usageFeatures:
      'High gloss fast drying polish provides excellent appearance with antique look. Can be used for spot, full panel and overall top coat application. Good moisture resistance and long lasting Gloss.',
    specs: {
      mixingRatio: 'Ready for use',
      applicationMethod: 'By padding',
      noOfCoats: 'As Required',
      potLife: 'Not Applicable',
      dryingTime: '30 mins',
      flashOff: '-',
      sandPaper: '-',
      methodOfSanding: '-',
      background: 'Pores filled with NC / OB filler followed by 2 NC Sealer and',
      hardenerInduction: 'Not Applicable',
      buffing: 'Not Required',
      sprayViscosity: 'Not Applicable',
      coveringViscosity: '100 - 110 sq.ft',
    },
  },
  {
    id: 'nc-sanding-sealer-special',
    mainCategory: 'Wood Finishes',
    subcategory: 'Sealers',
    productName: 'NC Sanding Sealer Special',
    usageFeatures:
      'Very good Adhesion to bare wood and more flexible film. Easy to apply and easy to sand. Improve the appearance of top coat clears.',
    specs: {
      mixingRatio: 'Sealer - 1 part NC Thinner V14 - 2 parts.',
      applicationMethod: 'By spray / padding',
      noOfCoats: '2-3 Coats',
      potLife: 'Not Applicable',
      dryingTime: '60 mins',
      flashOff: '-',
      sandPaper: 'P - 240 / P - 320c',
      methodOfSanding: 'Dry sanding only',
      background: 'Pores filled with NC / OB filler and thoroughly scrubbed solid wood',
      hardenerInduction: 'Not Applicable',
      buffing: 'Not Required',
      sprayViscosity: 'Not Applicable',
      coveringViscosity: '80 - 90 sq.ft',
    },
  },
  {
    id: 'nc-sanding-sealer-matt',
    mainCategory: 'Wood Finishes',
    subcategory: 'Sealers',
    productName: 'NC Sanding Sealer Matt',
    usageFeatures:
      'Excellent filling power and Adhesion to bare wood, OEM finishes. Suitable for white wood.',
    specs: {
      mixingRatio: 'Sealer - 1 part NC Thinner V14 - 1 part.',
      applicationMethod: 'By spray / padding',
      noOfCoats: '2-3 Coats',
      potLife: 'Not Applicable',
      dryingTime: '60 mins',
      flashOff: '-',
      sandPaper: 'P-240/P-320',
      methodOfSanding: 'Dry sanding only',
      background: 'Pores filled with NC / OB filler and thoroughly scrubbed solid wood',
      hardenerInduction: 'Not Applicable',
      buffing: 'Not Required',
      sprayViscosity: 'Not Applicable',
      coveringViscosity: '90 - 100',
    },
  },
  {
    id: 'nc-table-top-glossy',
    mainCategory: 'Wood Finishes',
    subcategory: 'Clears',
    productName: 'NC Table Top - Glossy',
    usageFeatures:
      'NC Resin based clear glossy for Interior wooden racks, cup boards and Furniture. Has excellent mar and weather resistance.',
    specs: {
      mixingRatio: 'Clear - 1 part NC Retarder SK58 - 0.5 part.',
      applicationMethod: 'By spray',
      noOfCoats: '2 Coats',
      potLife: 'Not Applicable',
      dryingTime: '60nmins',
      flashOff: '-',
      sandPaper: 'P-400/P-600',
      methodOfSanding: 'Dry sanding only',
      background: 'Pores filled with NC filler followed by 2 NC Sealer and thoroughly scrubbed solid wood & venners.',
      hardenerInduction: 'Not Applicable',
      buffing: 'Usually not required, but can be done using cloth to remove dust.',
      sprayViscosity: '18 +1-1” in 4mm cup',
      coveringViscosity: '90 - 100 sq.ft',
    },
  },
];

// --------------------------------------------------------------------------
// 3. DECORATIVE PAINTS
// --------------------------------------------------------------------------

export const decorativePaintsProducts: OfficialProductSpec[] = [
  {
    id: 'interior-primers',
    mainCategory: 'Decorative Paints',
    subcategory: 'Interior Primers',
    productName: 'Interior Primers',
    usageFeatures:
      'Get the beautiful, long-lasting results you expect secure Primers finish coats, uneven areas, seal porous surfaces and make the finish coat smooth',
    specs: {
      mixingRatio: '1 ltr primer mixing with water 750 ml for 1st coat. For second coat mixing in 1:1',
      applicationMethod: 'By Brush / Spray',
      noOfCoats: '2 Coats',
      dryingTime: '8 hours',
      coveringCapacity: '180 - 200 sq.ft',
      stabilityOfThinned: '24 hours',
    },
  },
  {
    id: 'exterior-primers',
    mainCategory: 'Decorative Paints',
    subcategory: 'Exterior Primers',
    productName: 'Exterior Primers',
    usageFeatures:
      'Get the beautiful, long-lasting results for multiple types of exterior secure Primers finish coats, uneven areas, seal porous surfaces and make the finish coat smooth',
    specs: {
      mixingRatio: '1 ltr primer mixing with water 750 ml for 1st coat. For second coat mixing in 1:1',
      applicationMethod: 'By Brush / Spray',
      noOfCoats: '2 Coats',
      dryingTime: '8 hours',
      coveringCapacity: '180 - 200 sq.ft',
      stabilityOfThinned: '24 hours',
    },
  },
  {
    id: 'acrylic-putty',
    mainCategory: 'Decorative Paints',
    subcategory: 'Acrylic Putty',
    productName: 'Acrylic Putty',
    usageFeatures:
      'Excellent alkali & acid resistance. Resistance to fungal attack. Good penetration power on porous concrete & cement bases. High adhesion on properly treated surfaces. Good workability and easy application.',
    specs: {
      mixingRatio:
        'Clean the surface wall. Remove all loose matter by sanding with emery paper and wiping off the powder with a cloth or cotton waste. Apply 1 coat of mathulac primer. After drying for 8 hours lightly sand with emery paper.',
      applicationMethod:
        'Apply mathulac acrylic Wall Putty using putty blade to obtain a smooth & uniform surface. Deep dents should be spiled by applying thin layers. Allow to dry for 4 hours and sand with emery paper. The loose powder on the surface is to be wiped off with a cloth or cotton waste.',
      noOfCoats: '2 Coats',
      dryingTime: '4 - 6 hours',
      coveringCapacity: '15 - 20 sq.ft',
    },
  },
  {
    id: 'acrylic-distemper',
    mainCategory: 'Decorative Paints',
    subcategory: 'Acrylic Distemper',
    productName: 'Acrylic Distemper',
    usageFeatures:
      'Mathulac Acrylic distemper is paste form, & it can be used for the decoration of concrete, brick work, plaster, and asbestos surface. Mathulac Acrylic Distemper is Easy application, Good washability & smooth matt finish. Mathulac Acrylic Distemper is recommended for interior only. It can be applied on Wall surfaces',
    specs: {
      mixingRatio: 'Add 1 lit of water in 1.5 kg of distemper',
      applicationMethod:
        'The surface is clean, dry free from all defective adhering material, dirt, grease wax etc., All loose particles rubbing by sand paper. Apply a coat of mathulac primer followed by mathulac acrylic wall putty to level the dents and make them uniform surface. Apply another coat Primer. Then apply 2 or 3 coats of mathulac Acrylic Distemper.',
      noOfCoats: '2 or 3 Coats',
      dryingTime: '4 - 5 hours',
      coveringCapacity: '100 - 120 sq.ft',
      stabilityOfThinned: '24 hours',
    },
  },
  {
    id: 'trendy-interior-emulsion',
    mainCategory: 'Decorative Paints',
    subcategory: 'Interior Emulsion',
    productName: 'TRENDY Interior Emulsion',
    usageFeatures:
      'Mathulac TRENDY Interior Emulsion is a economical paint that gives good performance, protect & decorate the interior walls. It is formulated by using co-polymer emulsion for smooth and matt finish. Mathulac TRENDY Interior Emulsion is smooth & pleasing matt',
    specs: {
      mixingRatio: 'Add 1 lit of paint by 750 ml water',
      applicationMethod:
        'Surface to be painted should be sound, clean and free from loose particles, dust, grease or fungus. Old surfaces with Alage growth require thorough cleaning and treatment. After cleaning apply household bleaching powder (Calcium Hypochloride with approx. 35% chlorine content) by adding 2 kg of bleaching powder to 50 ltrs of water. Brush the solution well on surface and leave 24 hrs. Then wash down thoroughly and allow to dry. Ensure that water leakages and seepages are stopped completely before painting. A coat of Mathulac primer followed by Mathulac wall putty to level the dents and make uniform surface.',
      noOfCoats: '2 or 3 Coats',
      dryingTime: '4 - 5 hours',
      coveringCapacity: '100 - 120 sq.ft',
    },
  },
  {
    id: 'apt-exterior-emulsion',
    mainCategory: 'Decorative Paints',
    subcategory: 'Exterior Emulsion',
    productName: 'APT Exterior Emulsion',
    usageFeatures:
      'An extremely versatile paint suitable for exteriors giving our home the grace it deserves. Mathulac-APT Exterior imparts to a surface, in addition to decor, durability and protection against extreme climatic conditions. Being an acrylic co polymer emulsion paint assures excellent durability, alkali resistance and good colour retention. Mathulac APT Exterior Emulsion is formulated to chalk gradually, becoming self cleaning to get great looking exteriors that stand the test of time.',
    specs: {
      mixingRatio: 'Thinned with 1 - 2 litres of water 4 litres of Emulsion paint',
      applicationMethod:
        'Surface to be painted should be sound, clean and free from loose particles, dust, grease or fungus. Old surfaces with Alage growth require thorough cleaning and treatment. After cleaning apply household bleaching powder (Calcium Hypochloride with approx 35% chlorine content) by adding 2 kg of bleaching powder to 50 ltrs of water. Brush the solution well on surface and leave 24 hrs. Then wash down thoroughly and allow to dry. Ensure that water leakages and seepages are stopped completely before painting. For new Plaster the surface may be first coated with Mathulac Exterior Primer and finally coated with 2 - 3 coats of Mathulac APT Exterior Emulsion. Apply self priming coat followed by 2 coats by thinning 1 ltr of paint by 650 ml of water. Covering capacity depends on texture and porosity of the exterior.',
      noOfCoats: '2 or 3 Coats',
      dryingTime: '4 - 5 hours',
      coveringCapacity: '100 - 120 sq.ft',
    },
  },
  {
    id: 'optima-weather-proof-exterior-emulsion',
    mainCategory: 'Decorative Paints',
    subcategory: 'Weather Proof Exterior Emulsion',
    productName: 'OPTIMA WEATHER PROOF Exterior Emulsion',
    usageFeatures:
      'An extremely versatile paint suitable for exteriors giving our home the grace it deserves. Mathulac-OPTIMA Exterior imparts to a surface, in addition to decor, durability and protection against extreme climatic conditions. Being an acrylic co polymer emulsion paint assures excellent durability, alkali resistance and good colour retention. Mathulac OPTIMA WEATHER PROOF Exterior Emulsion is formulated to chalk gradually, becoming self cleaning to get great looking exteriors that stand the test of time.',
    specs: {
      mixingRatio: 'Thinned with 1 – 1.5 litres of water 4 litres of Emulsion paint',
      applicationMethod:
        'Surface to be painted should be sound, clean and free from loose particles, dust, grease or fungus. Old surfaces with Alage growth require thorough cleaning and treatment. After cleaning apply household bleaching powder (Calcium Hypochloride with approx 35% chlorine content) by adding 2 kg of bleaching powder to 50 ltrs of water. Brush the solution well on surface and leave 24 hrs. Then wash down thoroughly and allow to dry. Ensure that water leakages and seepages are stopped completely before painting. For new Plaster the surface may be first coated with Mathulac Exterior Primer and finally coated with 2 - 3 coats of Mathulac APT Exterior Emulsion. Apply self priming coat followed by 2 coats by thinning 1 ltr of paint by 650 ml of water. Covering capacity depends on texture and porosity of the exterior.',
      noOfCoats: '2 or 3 Coats',
      dryingTime: '4 - 5 hours',
      coveringCapacity: '100 - 120 sq.ft',
    },
  },
];

export const problemSolverList: ProblemSolverItem[] = [
  {
    id: 'chalking-powdering',
    problem: 'Chalking (Powdering)',
    description:
      'The formation of fine, white powder on the surface of the paint film due to weathering, which may give the appearance of color fading. Although some degree of chalking is normal and can be desirable way for a paint film to wear, excessive paint film erosion may result in heavy chalking.',
    possibleCause:
      'Oil-based paints tend to chalk more than latex formulations. Use of a low-grade, highly pigmented paint. Factory finished siding can develop an excessively thick chalk layer and may require power washing ensure complete chalk removal. Use of an interior paint for an outdoor application. Not adequately sealing a porous surface. Over thinning a coating (e.g. paint or stain). Spreading the paint too.',
    solution:
      'Chalk by washing or power washing the surface with an appropriate cleaner. If some chalk remains after first washing, then wash again for complete removal, scrubbing may be necessary. Rinse well with clear water. Allow to dry thoroughly. Brick areas that are stained by “chalk run- own” should be scrubbed with a stiff brush and detergent. Professional cleaning may be required to remove this staining. For the best resistance to chalking, use higher-quality acrylic.',
  },
];

// All official product specifications grouped
export const allOfficialProducts: OfficialProductSpec[] = [
  ...autoPrimersProducts,
  ...autoUnderCoatSurfaces,
  ...puttyAutoBodyFillers,
  ...autoTopCoatSolidColors,
  ...autoTopCoatMetallicFinishes,
  ...autoTopCoatClears,
  ...woodFinishesProducts,
  ...decorativePaintsProducts,
];
