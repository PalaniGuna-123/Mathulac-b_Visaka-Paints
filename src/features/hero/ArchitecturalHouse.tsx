import { useLayoutEffect, useRef, type MutableRefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { HeroMotionState, HeroViewportProfile } from './heroMotion';
import type { HeroSceneLayout } from './heroSceneLayout';

interface ArchitecturalHouseProps {
  motion: MutableRefObject<HeroMotionState>;
  profile: HeroViewportProfile;
  layout: HeroSceneLayout;
}

interface CompiledHouseShader {
  uniforms: Record<string, THREE.IUniform>;
}

const HOUSE_TEXTURES = [
  '/assets/hero/house/house-00-unpainted.webp',
  '/assets/hero/house/house-01-base-painted.webp',
  '/assets/hero/house/house-02-blue-painted.webp',
  '/assets/hero/house/house-03-accent-painted.webp',
  '/assets/hero/house/house-04-details-painted.webp',
  '/assets/hero/house/house-05-luxury-final.webp',
] as const;

const HOUSE_MASKS = [
  '/assets/hero/masks/wall-main-mask.webp',
  '/assets/hero/masks/wall-secondary-mask.webp',
  '/assets/hero/masks/accent-mask.webp',
  '/assets/hero/masks/trims-mask.webp',
  '/assets/hero/masks/facade-mask.webp',
] as const;

const ALL_HOUSE_TEXTURES = [...HOUSE_TEXTURES, ...HOUSE_MASKS];

const houseShaderPars = /* glsl */ `
  uniform sampler2D uBasePainted;
  uniform sampler2D uBluePainted;
  uniform sampler2D uAccentPainted;
  uniform sampler2D uDetailsPainted;
  uniform sampler2D uLuxuryFinal;
  uniform sampler2D uWallMainMask;
  uniform sampler2D uWallSecondaryMask;
  uniform sampler2D uAccentMask;
  uniform sampler2D uTrimsMask;
  uniform sampler2D uFacadeMask;
  uniform float uBaseProgress;
  uniform float uBlueProgress;
  uniform float uAccentProgress;
  uniform float uDetailsProgress;
  uniform float uLuxuryProgress;
  uniform float uHousePaint;
  uniform float uReveal;
  uniform float uTime;
  varying vec2 vHouseUv;
  float mathulacWetness = 0.0;
  float mathulacPaintEdge = 0.0;
  vec3 mathulacCoatedColor = vec3(0.0);

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  float noise21(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);
    return mix(
      mix(hash21(cell), hash21(cell + vec2(1.0, 0.0)), local.x),
      mix(hash21(cell + vec2(0.0, 1.0)), hash21(cell + vec2(1.0, 1.0)), local.x),
      local.y
    );
  }

  float brushNoise(vec2 point) {
    float value = noise21(point) * 0.56;
    value += noise21(point * 2.17 + 6.3) * 0.28;
    value += noise21(point * 5.03 + 2.8) * 0.16;
    return value;
  }

  float maskLuma(vec3 colour) {
    return dot(colour, vec3(0.2126, 0.7152, 0.0722));
  }

  float organicReveal(vec2 point, float progress, float seed, float direction) {
    float noise = brushNoise(point * vec2(17.0, 23.0) + seed);
    float bristle = sin(point.y * 157.0 + seed * 5.2) * 0.006;
    float travel = mix(point.x, 1.0 - point.x, direction) * 0.8 + point.y * 0.2;
    float edge = progress * 1.25 - 0.13 + (noise - 0.5) * 0.14 + bristle;
    return smoothstep(travel - 0.02, travel + 0.009, edge);
  }

  float cinematicReveal(vec2 point, float progress, float seed) {
    float noise = brushNoise(point * vec2(12.0, 17.0) + seed);
    float travel = point.x * 0.78 + point.y * 0.22;
    float edge = progress * 1.24 - 0.12 + (noise - 0.5) * 0.1;
    float reveal = smoothstep(travel - 0.065, travel + 0.04, edge);
    return mix(reveal, 1.0, smoothstep(0.94, 1.0, progress));
  }

  float stageCoverage(
    vec2 point,
    float progress,
    float seed,
    float direction,
    float difference,
    float semanticMask,
    vec2 differenceRange
  ) {
    // Supplied masks guide timing while consecutive-image differences keep the
    // reveal registered to the photographic house itself.
    float priorityProgress = clamp(progress + (semanticMask - 0.5) * 0.11, 0.0, 1.0);
    float changedSurface = smoothstep(differenceRange.x, differenceRange.y, difference);
    float paintedSurface = changedSurface * organicReveal(point, priorityProgress, seed, direction);
    float finalResolve = smoothstep(0.93, 1.0, progress);
    return max(paintedSurface, finalResolve);
  }

  float wetWindow(float progress) {
    float arrival = smoothstep(0.03, 0.2, progress);
    float drying = 1.0 - smoothstep(0.42, 0.96, progress);
    return arrival * (0.12 + drying * 0.88);
  }
`;

export function ArchitecturalHouse({ motion, profile, layout }: ArchitecturalHouseProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const shaderRef = useRef<CompiledHouseShader | null>(null);
  const textures = useTexture(ALL_HOUSE_TEXTURES) as THREE.Texture[];
  const { gl } = useThree();
  const [
    unpaintedTexture,
    basePaintedTexture,
    bluePaintedTexture,
    accentPaintedTexture,
    detailsPaintedTexture,
    luxuryFinalTexture,
    wallMainMask,
    wallSecondaryMask,
    accentMask,
    trimsMask,
    facadeMask,
  ] = textures;
  const houseHeight = layout.houseWidth / 1.5;
  const planeSegments: [number, number] = profile === 'desktop' ? [36, 24] : profile === 'tablet' ? [24, 16] : [12, 8];

  useLayoutEffect(() => {
    const anisotropy = Math.min(profile === 'desktop' ? 8 : 4, gl.capabilities.getMaxAnisotropy());
    textures.forEach((texture, index) => {
      texture.colorSpace = index < HOUSE_TEXTURES.length ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.anisotropy = index < HOUSE_TEXTURES.length ? anisotropy : 1;
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
    });
  }, [gl, profile, textures]);

  useLayoutEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uBasePainted = { value: basePaintedTexture };
      shader.uniforms.uBluePainted = { value: bluePaintedTexture };
      shader.uniforms.uAccentPainted = { value: accentPaintedTexture };
      shader.uniforms.uDetailsPainted = { value: detailsPaintedTexture };
      shader.uniforms.uLuxuryFinal = { value: luxuryFinalTexture };
      shader.uniforms.uWallMainMask = { value: wallMainMask };
      shader.uniforms.uWallSecondaryMask = { value: wallSecondaryMask };
      shader.uniforms.uAccentMask = { value: accentMask };
      shader.uniforms.uTrimsMask = { value: trimsMask };
      shader.uniforms.uFacadeMask = { value: facadeMask };
      shader.uniforms.uBaseProgress = { value: 0 };
      shader.uniforms.uBlueProgress = { value: 0 };
      shader.uniforms.uAccentProgress = { value: 0 };
      shader.uniforms.uDetailsProgress = { value: 0 };
      shader.uniforms.uLuxuryProgress = { value: 0 };
      shader.uniforms.uHousePaint = { value: 0 };
      shader.uniforms.uReveal = { value: 0 };
      shader.uniforms.uTime = { value: 0 };

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
          uniform float uHousePaint;
          uniform float uTime;
          varying vec2 vHouseUv;`,
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          vHouseUv = uv;
          float coatingRelief = sin(uv.x * 121.0 + uv.y * 37.0)
            * sin(uv.y * 89.0 - uv.x * 23.0);
          transformed += normal * coatingRelief * 0.0032 * smoothstep(0.02, 0.18, uHousePaint);`,
        );

      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>\n${houseShaderPars}`)
        .replace(
          '#include <map_fragment>',
          `vec4 unpainted = texture2D(map, vHouseUv);
          vec4 basePainted = texture2D(uBasePainted, vHouseUv);
          vec4 bluePainted = texture2D(uBluePainted, vHouseUv);
          vec4 accentPainted = texture2D(uAccentPainted, vHouseUv);
          vec4 detailsPainted = texture2D(uDetailsPainted, vHouseUv);
          vec4 luxuryFinal = texture2D(uLuxuryFinal, vHouseUv);
          vec2 q = vec2(vHouseUv.x, 1.0 - vHouseUv.y);

          float mainMask = maskLuma(texture2D(uWallMainMask, vHouseUv).rgb);
          float secondaryMask = maskLuma(texture2D(uWallSecondaryMask, vHouseUv).rgb);
          float accentSurfaceMask = maskLuma(texture2D(uAccentMask, vHouseUv).rgb);
          float trimSurfaceMask = maskLuma(texture2D(uTrimsMask, vHouseUv).rgb);
          float facadeSurfaceMask = maskLuma(texture2D(uFacadeMask, vHouseUv).rgb);

          float baseDifference = length(basePainted.rgb - unpainted.rgb);
          float blueDifference = length(bluePainted.rgb - basePainted.rgb);
          float accentDifference = length(accentPainted.rgb - bluePainted.rgb);
          float detailsDifference = length(detailsPainted.rgb - accentPainted.rgb);
          float baseCoverage = stageCoverage(
            q, uBaseProgress, 1.7, 0.0, baseDifference,
            max(mainMask, facadeSurfaceMask), vec2(0.045, 0.11)
          );
          float blueCoverage = stageCoverage(
            q, uBlueProgress, 5.2, 1.0, blueDifference,
            max(mainMask, facadeSurfaceMask), vec2(0.05, 0.12)
          );
          float accentCoverage = stageCoverage(
            q, uAccentProgress, 9.6, 0.0, accentDifference,
            max(secondaryMask, accentSurfaceMask), vec2(0.035, 0.1)
          );
          float detailsCoverage = stageCoverage(
            q, uDetailsProgress, 14.1, 1.0, detailsDifference,
            max(trimSurfaceMask, max(accentSurfaceMask, facadeSurfaceMask)), vec2(0.03, 0.09)
          );
          float luxurySemanticMask = max(facadeSurfaceMask, max(trimSurfaceMask, secondaryMask));
          float luxuryPriority = clamp(uLuxuryProgress + (luxurySemanticMask - 0.5) * 0.035, 0.0, 1.0);
          // The last stage is a single broad photographic evolution. A wider
          // organic boundary prevents misaligned details from appearing as
          // scattered fragments while lighting and landscaping build around it.
          float luxuryCoverage = cinematicReveal(q, luxuryPriority, 18.4);

          vec3 coated = mix(unpainted.rgb, basePainted.rgb, baseCoverage);
          coated = mix(coated, bluePainted.rgb, blueCoverage);
          coated = mix(coated, accentPainted.rgb, accentCoverage);
          coated = mix(coated, detailsPainted.rgb, detailsCoverage);
          coated = mix(coated, luxuryFinal.rgb, luxuryCoverage);

          float fineTexture = brushNoise(q * vec2(58.0, 41.0));
          float coatedAmount = max(baseCoverage, max(blueCoverage, max(accentCoverage, detailsCoverage)));
          coated *= 0.988 + (fineTexture - 0.5) * 0.022 * coatedAmount * (1.0 - luxuryCoverage);
          mathulacCoatedColor = coated;
          diffuseColor *= vec4(coated, uReveal);

          mathulacWetness = max(
            wetWindow(uBaseProgress) * baseCoverage * (1.0 - luxuryCoverage),
            max(wetWindow(uBlueProgress) * blueCoverage,
              max(wetWindow(uAccentProgress) * accentCoverage,
                max(wetWindow(uDetailsProgress) * detailsCoverage,
                  wetWindow(uLuxuryProgress) * luxuryCoverage)))
          );
          mathulacPaintEdge = clamp(
            baseCoverage * (1.0 - baseCoverage)
            + blueCoverage * (1.0 - blueCoverage)
            + accentCoverage * (1.0 - accentCoverage)
            + detailsCoverage * (1.0 - detailsCoverage)
            + luxuryCoverage * (1.0 - luxuryCoverage),
            0.0,
            1.0
          );`,
        )
        .replace(
          '#include <roughnessmap_fragment>',
          `#include <roughnessmap_fragment>
          roughnessFactor = mix(0.72, 0.21, clamp(mathulacWetness + mathulacPaintEdge * 0.3, 0.0, 1.0));
          roughnessFactor = mix(roughnessFactor, 0.5, uLuxuryProgress * 0.5);`,
        )
        .replace(
          '#include <lights_physical_fragment>',
          `#include <lights_physical_fragment>
          material.clearcoat = mix(0.1, 0.88, mathulacWetness);
          material.clearcoatRoughness = mix(0.42, 0.09, mathulacWetness);`,
        )
        .replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
          totalEmissiveRadiance += mathulacCoatedColor * mix(0.6, 0.73, uLuxuryProgress);
          totalEmissiveRadiance += vec3(0.035, 0.055, 0.08) * mathulacPaintEdge;`,
        );

      shaderRef.current = shader;
    };
    material.customProgramCacheKey = () => 'muthulac-six-stage-house-v1';
    material.needsUpdate = true;

    return () => {
      shaderRef.current = null;
    };
  }, [
    accentMask,
    accentPaintedTexture,
    basePaintedTexture,
    bluePaintedTexture,
    detailsPaintedTexture,
    facadeMask,
    luxuryFinalTexture,
    trimsMask,
    wallMainMask,
    wallSecondaryMask,
  ]);

  useFrame(() => {
    const group = groupRef.current;
    const material = materialRef.current;
    const shader = shaderRef.current;
    if (!group || !material) return;

    const values = motion.current;
    const reveal = values.houseReveal;
    group.visible = reveal > 0.001;
    group.position.copy(layout.housePosition);
    group.scale.setScalar(1.018 - reveal * 0.018);
    group.rotation.y = (1 - reveal) * (profile === 'mobile' ? -0.009 : -0.014);
    material.visible = reveal > 0.001;

    if (shader) {
      shader.uniforms.uBaseProgress.value = values.houseBase;
      shader.uniforms.uBlueProgress.value = values.houseBlue;
      shader.uniforms.uAccentProgress.value = values.houseAccent;
      shader.uniforms.uDetailsProgress.value = values.houseDetails;
      shader.uniforms.uLuxuryProgress.value = values.houseLuxury;
      shader.uniforms.uHousePaint.value = values.housePaint;
      shader.uniforms.uReveal.value = reveal;
      shader.uniforms.uTime.value = values.master * 8;
    }

    gl.domElement.dataset.heroHouse = [
      reveal,
      values.houseBase,
      values.houseBlue,
      values.houseAccent,
      values.houseDetails,
      values.houseLuxury,
    ].map((value) => value.toFixed(3)).join(',');
  });

  return (
    <group ref={groupRef} position={layout.housePosition} visible={false}>
      <mesh renderOrder={1}>
        <planeGeometry args={[layout.houseWidth, houseHeight, ...planeSegments]} />
        <meshPhysicalMaterial
          ref={materialRef}
          map={unpaintedTexture}
          transparent
          opacity={1}
          depthWrite={false}
          toneMapped
          side={THREE.DoubleSide}
          roughness={0.72}
          metalness={0}
          clearcoat={0.18}
          clearcoatRoughness={0.38}
          specularIntensity={0.6}
          envMapIntensity={0.86}
        />
      </mesh>
    </group>
  );
}

useTexture.preload(ALL_HOUSE_TEXTURES);
