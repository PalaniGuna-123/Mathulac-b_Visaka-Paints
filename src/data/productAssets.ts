// Direct asset imports for all Mathulac products from src/assets/products

// Thinners
import thinner1Img from '../assets/products/Thinners/thinner1.webp';
import puThinnerImg from '../assets/products/Thinners/pu_thinner.webp';
import v106ThinnerImg from '../assets/products/Thinners/v106_melamine_thinner.webp';

// Primers / Auto Primers / Putty
import ncPuttyImg from '../assets/products/Auto Primers/nc_putty.webp';
import ogPuttyImg from '../assets/products/Auto Primers/nc_putty (1).webp';
import qdPrimerImg from '../assets/products/Primers/redoxide_metal_primer_matt_glossy.webp';
import skpsWhiteGreyImg from '../assets/products/Primers/skps_white_grey.webp';

// Aluminium Paints
import ncAluminiumImg from '../assets/products/Aluminium Paints/nc_putty (1).webp';
import aluminiumSinglePackImg from '../assets/products/Aluminium Paints/aluminium_single_pack.webp';

// Wood Coatings
import woodCementPrimerImg from '../assets/products/Wood Coatings/wood_cement_primer_white_pink.webp';
import ncSandingSealerImg from '../assets/products/Wood Coatings/nc_sanding_sealer_special_matt.webp';
import ncSplTtClearImg from '../assets/products/Wood Coatings/nc_spl_tt_clear.webp';

// Synthetic Enamels
import auraSatinEnamelImg from '../assets/products/Synthetic Enamels/nc_spl_tt_clear (1).webp';
import synEnamelsImg from '../assets/products/Synthetic Enamels/syn_enamels.webp';

// General Purpose Enamels
import varnaGpEnamelsImg from '../assets/products/General Purpose Enamels/varna_gp_enamels.webp';
import blackChassisGreyImg from '../assets/products/General Purpose Enamels/black_&_chasis_grey.webp';

// Hammertone Paints
import hammerToneImg from '../assets/products/Hammertone Paints/hammer_tone.webp';

// Acrylic & Cement Putty
import acrylicWallPuttyImg from '../assets/products/Acrylic/acrylic_wall_putty.webp';

// Interior / Exterior Primers
import cementPrimerInteriorImg from '../assets/products/Interior/cement_primer_interior.webp';
import weatherProofExteriorPrimersImg from '../assets/products/Interior/weather_proof_exterior_primers.webp';

// Trendy Interior Products
import trendyAcrylicDistemperImg from '../assets/products/Trendy Interior Emulsion/trendy_acrylic_distember.webp';
import trendyInteriorEmulsionImg from '../assets/products/Trendy Interior Emulsion/trendy_interior_emulsion.webp';

// Exterior Emulsions
import aptExteriorEmulsionImg from '../assets/products/Apt Exterior Emulsion/apt_exterior_emulsion.webp';
import optimaExteriorEmulsionImg from '../assets/products/Optima Wheather Proof Exterior Emulsion/optima_weather_proof_exterior_emulsion.webp';

export const productAssetMap: Record<string, string> = {
  // Thinners
  'special-pu-thinner': thinner1Img,
  'pu-thinner': puThinnerImg,
  'v106-melamine-thinner': v106ThinnerImg,

  // Primers / Auto Putty
  'nc-putty': ncPuttyImg,
  'og-putty': ogPuttyImg,
  'qd-primer-brown': qdPrimerImg,

  // Aluminium Paints
  'nc-aluminium': ncAluminiumImg,
  'aluminium-single-pack': aluminiumSinglePackImg,

  // Wood Coatings
  'wood-cement-primer': woodCementPrimerImg,
  'nc-sanding-sealer': ncSandingSealerImg,
  'nc-spl-tt-clear': ncSplTtClearImg,

  // Synthetic Enamels
  'aura-satin-enamel': auraSatinEnamelImg,
  'syn-enamels': synEnamelsImg,

  // General Purpose Enamels
  'varna-gp-enamels': varnaGpEnamelsImg,
  'black-chassis-grey': blackChassisGreyImg,

  // Hammertone Paints
  'hammer-tone': hammerToneImg,

  // Acrylic & Cement Base Putty
  'acrylic-wall-putty': acrylicWallPuttyImg,
  'cement-base-wall-putty': skpsWhiteGreyImg,

  // Interior / Exterior Primers
  'cement-primer-interior': cementPrimerInteriorImg,
  'weather-proof-exterior-primers': weatherProofExteriorPrimersImg,

  // Trendy Interior Products
  'trendy-acrylic-distemper': trendyAcrylicDistemperImg,
  'trendy-interior-emulsion': trendyInteriorEmulsionImg,

  // Exterior Emulsions
  'apt-exterior-emulsion': aptExteriorEmulsionImg,
  'optima-weather-proof-exterior-emulsion': optimaExteriorEmulsionImg,

  // Tile Coat
  'tile-coat': weatherProofExteriorPrimersImg,
};

export function getProductAssetImage(productId: string, fallback?: string): string {
  return productAssetMap[productId] || fallback || thinner1Img;
}
