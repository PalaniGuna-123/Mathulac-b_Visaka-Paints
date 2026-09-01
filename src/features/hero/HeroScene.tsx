import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { ArchitecturalHouse } from './ArchitecturalHouse';
import { LiquidPaint } from './LiquidPaint';
import { createHeroSceneLayout, type HeroSceneLayout } from './heroSceneLayout';
import type { HeroMotionState, HeroViewportProfile } from './heroMotion';

interface HeroSceneProps {
  motion: MutableRefObject<HeroMotionState>;
  profile: HeroViewportProfile;
  reducedMotion: boolean;
  active: boolean;
  onReady: () => void;
}

interface StudioBucketProps extends HeroSceneProps {
  layout: HeroSceneLayout;
}

const BUCKET_TEXTURES: string[] = [
  '/assets/hero/bucket/muthulac-5-buckets-upright.jpg',
  '/assets/hero/bucket/muthulac-5-buckets-pouring.jpg',
  '/assets/hero/bucket/muthulac-5-colors-swirl.jpg',
];

const ENVIRONMENT_TEXTURES: string[] = [
  '/assets/hero/environment/background-plants.webp',
  '/assets/hero/environment/foreground-plants.webp',
  '/assets/hero/environment/ground-shadow.webp',
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const segment = (progress: number, start: number, end: number) => {
  const value = clamp01((progress - start) / Math.max(0.0001, end - start));
  return value * value * (3 - 2 * value);
};

interface CompiledBucketShader {
  uniforms: Record<string, THREE.IUniform>;
}

// 5-Color Palette Particle Specs matching the 5 Muthulac buckets
const SPLASH_DROPS = [
  { color: '#ffc400', emissive: '#b45309', pos: [-2.1, -1.35, 0.18], scale: 0.08, phase: 0.1 },
  { color: '#ff2a4b', emissive: '#991b1b', pos: [-1.05, -1.55, 0.28], scale: 0.09, phase: 0.8 },
  { color: '#0084ff', emissive: '#004db3', pos: [0.08, -1.68, 0.35], scale: 0.12, phase: 1.4 },
  { color: '#00e676', emissive: '#065f46', pos: [1.15, -1.52, 0.26], scale: 0.09, phase: 2.1 },
  { color: '#d500f9', emissive: '#6b21a8', pos: [2.15, -1.32, 0.16], scale: 0.08, phase: 2.7 },
  { color: '#0084ff', emissive: '#004db3', pos: [-0.35, -1.45, 0.22], scale: 0.06, phase: 3.3 },
  { color: '#ff2a4b', emissive: '#991b1b', pos: [-1.45, -1.25, 0.15], scale: 0.05, phase: 4.0 },
  { color: '#00e676', emissive: '#065f46', pos: [0.65, -1.48, 0.24], scale: 0.06, phase: 4.8 },
];

function StudioBucket({ motion, profile, reducedMotion, onReady, layout }: StudioBucketProps) {
  const bucketGroupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const shaderRef = useRef<CompiledBucketShader | null>(null);
  const splashGroupRef = useRef<THREE.Group>(null);
  const shadowRef = useRef<THREE.Mesh>(null);

  const [uprightTexture, pouringTexture, swirlTexture] = useTexture(BUCKET_TEXTURES) as THREE.Texture[];
  const { gl } = useThree();

  const shadowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(128, 128, 12, 128, 128, 128);
      gradient.addColorStop(0, 'rgba(0,0,0,0.85)');
      gradient.addColorStop(0.45, 'rgba(0,0,0,0.45)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 256, 256);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useLayoutEffect(() => {
    const anisotropy = Math.min(profile === 'desktop' ? 8 : 4, gl.capabilities.getMaxAnisotropy());
    [uprightTexture, pouringTexture, swirlTexture].forEach((texture) => {
      if (texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = anisotropy;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
      }
    });
    shadowTexture.needsUpdate = true;
    return () => shadowTexture.dispose();
  }, [gl, pouringTexture, profile, shadowTexture, swirlTexture, uprightTexture]);

  useEffect(() => onReady(), [onReady]);

  useLayoutEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uUprightTexture = { value: uprightTexture };
      shader.uniforms.uPouringTexture = { value: pouringTexture };
      shader.uniforms.uSwirlTexture = { value: swirlTexture };
      shader.uniforms.uPourProgress = { value: 0 };
      shader.uniforms.uSwirlProgress = { value: 0 };
      shader.uniforms.uFade = { value: 1 };
      shader.uniforms.uTime = { value: 0 };

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
          uniform float uPourProgress;
          uniform float uSwirlProgress;
          uniform float uTime;
          varying vec2 vBucketUv;`,
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          vBucketUv = uv;
          // Subtle cylindrical curve across the 5-buckets arc
          float curveX = (1.0 - pow(uv.x * 2.0 - 1.0, 2.0)) * 0.16;
          transformed.z += curveX * (1.0 - uPourProgress * 0.4);

          // Dynamic liquid turbulence on the pouring stream region (bottom half)
          if (uv.y < 0.48) {
            float streamWave = sin(uv.x * 28.0 + uTime * 4.2) * cos(uv.y * 18.0 - uTime * 3.5);
            transformed.z += streamWave * 0.022 * uPourProgress;
          }`,
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
          uniform sampler2D uUprightTexture;
          uniform sampler2D uPouringTexture;
          uniform sampler2D uSwirlTexture;
          uniform float uPourProgress;
          uniform float uSwirlProgress;
          uniform float uFade;
          uniform float uTime;
          varying vec2 vBucketUv;

          float getLuma(vec3 c) {
            return dot(c, vec3(0.299, 0.587, 0.114));
          }`,
        )
        .replace(
          '#include <map_fragment>',
          `vec4 upright = texture2D(uUprightTexture, vBucketUv);
          vec4 pouring = texture2D(uPouringTexture, vBucketUv);
          vec4 swirl = texture2D(uSwirlTexture, vBucketUv);

          // Fluid organic morph: pouring streams cascade downward as user scrolls
          float streamWave = sin(vBucketUv.x * 12.0 + uTime * 2.0) * 0.06;
          float pourMask = smoothstep(0.0, 1.0, clamp((uPourProgress - (1.0 - vBucketUv.y) * 0.35 + streamWave) / 0.65, 0.0, 1.0));

          // Blend Upright -> Pouring
          vec4 blended = mix(upright, pouring, pourMask);

          // Blend Pouring -> Swirl vortex
          blended = mix(blended, swirl, uSwirlProgress);

          // Studio Deep-Dark Luminance Integration:
          // Keep buckets fully solid & vibrant, cleanly separating from the dark canvas
          float luma = getLuma(blended.rgb);
          float alpha = smoothstep(0.002, 0.02, luma);

          // Specular boost on vibrant paint streams
          float isPaintStream = (1.0 - smoothstep(0.05, 0.55, vBucketUv.y)) * pourMask;
          vec3 enhancedRgb = blended.rgb;
          if (isPaintStream > 0.01) {
            enhancedRgb *= (1.0 + isPaintStream * 0.14);
          }

          diffuseColor = vec4(enhancedRgb, alpha * uFade);`,
        )
        .replace(
          '#include <roughnessmap_fragment>',
          `#include <roughnessmap_fragment>
          roughnessFactor = mix(0.18, 0.08, uPourProgress * (1.0 - vBucketUv.y));`,
        )
        .replace(
          '#include <lights_physical_fragment>',
          `#include <lights_physical_fragment>
          material.clearcoat = mix(0.4, 0.92, uPourProgress);
          material.clearcoatRoughness = mix(0.24, 0.06, uPourProgress);`,
        )
        .replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
          // Radiant clarity so bucket image details & colors shine through vibrantly without black shadows
          totalEmissiveRadiance += diffuseColor.rgb * (0.85 + uPourProgress * 0.15);`,
        );

      shaderRef.current = shader;
    };

    material.customProgramCacheKey = () => 'muthulac-5-buckets-cinematic-stage-v2';
    material.needsUpdate = true;

    return () => {
      shaderRef.current = null;
    };
  }, [pouringTexture, swirlTexture, uprightTexture]);

  useFrame(({ clock }) => {
    const group = bucketGroupRef.current;
    if (!group) return;

    const values = motion.current;
    // Controlled forward tilt & morph timing
    const tiltProgress = segment(values.intro, 0.05, 0.88);
    const pourProgress = segment(values.intro, 0.22, 0.95);
    const swirlProgress = segment(values.paintProgress, 0.18, 0.65);
    const exit = values.bucketExit;
    const fade = 1 - segment(exit, 0.08, 0.95);
    const idle = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.52) * 0.012 * (1 - tiltProgress) * (1 - exit);

    if (reducedMotion && values.houseReveal > 0.9) {
      group.position.set(
        profile === 'mobile' ? -0.5 : profile === 'tablet' ? -2.1 : -3.1,
        profile === 'mobile' ? -1.8 : -1.65,
        -3,
      );
      group.rotation.set(0, -0.04, 0);
      group.scale.setScalar(layout.bucketScale * (profile === 'mobile' ? 0.5 : 0.32));
    } else {
      // 5-Bucket Unified 3D Stage Position
      group.position.lerpVectors(layout.bucketStart, layout.bucketEnd, tiltProgress);
      group.position.y += (1 - values.intro) * 0.04 + idle + exit * 0.12;
      group.position.z -= exit * 2.85;
      group.position.x -= exit * (profile === 'mobile' ? 0.06 : 0);
      group.rotation.set(
        THREE.MathUtils.lerp(layout.bucketStartRotation.x, layout.bucketEndRotation.x, tiltProgress),
        THREE.MathUtils.lerp(layout.bucketStartRotation.y, layout.bucketEndRotation.y + (swirlProgress * 0.08), tiltProgress),
        THREE.MathUtils.lerp(layout.bucketStartRotation.z, layout.bucketEndRotation.z, tiltProgress),
      );
      const entranceScale = layout.bucketScale * (0.96 + values.intro * 0.04) * (1 - exit * 0.22);
      group.scale.setScalar(entranceScale);
    }

    const effectiveFade = reducedMotion && values.houseReveal > 0.9 ? 0.9 : fade;
    group.visible = effectiveFade > 0.002;

    const shader = shaderRef.current;
    if (shader) {
      shader.uniforms.uPourProgress.value = pourProgress;
      shader.uniforms.uSwirlProgress.value = swirlProgress;
      shader.uniforms.uFade.value = effectiveFade;
      shader.uniforms.uTime.value = clock.elapsedTime;
    }

    // Dynamic 3D paint splash droplets at the bottom of the streams
    if (splashGroupRef.current) {
      const splashActive = pourProgress > 0.12 && effectiveFade > 0.05;
      splashGroupRef.current.visible = splashActive;
      if (splashActive) {
        splashGroupRef.current.children.forEach((child, i) => {
          const spec = SPLASH_DROPS[i];
          if (child instanceof THREE.Mesh && spec) {
            const time = clock.elapsedTime * 2.2 + spec.phase;
            const bounce = Math.abs(Math.sin(time));
            child.position.y = spec.pos[1] + bounce * 0.22 * pourProgress;
            child.position.x = spec.pos[0] + Math.cos(time * 0.8) * 0.04;
            const dropScale = spec.scale * pourProgress * (0.8 + bounce * 0.35) * effectiveFade;
            child.scale.setScalar(dropScale);
          }
        });
      }
    }

    if (shadowRef.current) {
      shadowRef.current.visible = effectiveFade > 0.002;
      shadowRef.current.position.set(group.position.x, group.position.y - 1.55, group.position.z - 0.25);
      shadowRef.current.scale.set(4.8 - tiltProgress * 0.3, 1.8 + tiltProgress * 0.2, 1);
      const shadowMaterial = shadowRef.current.material as THREE.MeshBasicMaterial;
      shadowMaterial.opacity = (0.62 - tiltProgress * 0.12) * (0.65 + values.intro * 0.35) * effectiveFade;
    }

    gl.domElement.dataset.heroMotion = values.master.toFixed(3);
  });

  // 16:9 Studio Canvas Dimensions (1920x1080 Aspect Ratio)
  const planeWidth = profile === 'mobile' ? 7.2 : profile === 'tablet' ? 8.2 : 9.2;
  const planeHeight = planeWidth / 1.7778;

  return (
    <>
      <group ref={bucketGroupRef}>
        {/* Unified 5-Buckets Photographic Stage Mesh */}
        <mesh ref={meshRef} position={[0, 0, 0.1]} renderOrder={2}>
          <planeGeometry args={[planeWidth, planeHeight, 48, 32]} />
          <meshPhysicalMaterial
            ref={materialRef}
            map={uprightTexture}
            transparent
            opacity={1}
            roughness={0.28}
            metalness={0.06}
            clearcoat={0.7}
            clearcoatRoughness={0.15}
            depthWrite={false}
          />
        </mesh>

        {/* Dynamic 3D Cascade Droplets & Micro-Splashes at Stream Base */}
        <group ref={splashGroupRef} position={[0, 0, 0.15]} visible={false}>
          {SPLASH_DROPS.map((spec, i) => (
            <mesh key={i} position={spec.pos as [number, number, number]} renderOrder={3}>
              <sphereGeometry args={[1, 14, 14]} />
              <meshPhysicalMaterial
                color={spec.color}
                emissive={spec.emissive}
                emissiveIntensity={0.45}
                roughness={0.08}
                metalness={0.04}
                clearcoat={1.0}
                clearcoatRoughness={0.04}
                transparent
                opacity={0.92}
              />
            </mesh>
          ))}
        </group>
      </group>

      <mesh ref={shadowRef} position={[0.4, -1.82, -0.22]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={0}>
        <planeGeometry args={[4.6, 2.8]} />
        <meshBasicMaterial map={shadowTexture} transparent depthWrite={false} opacity={0} />
      </mesh>
    </>
  );
}

interface SceneDirectorProps {
  motion: MutableRefObject<HeroMotionState>;
  profile: HeroViewportProfile;
  layout: HeroSceneLayout;
  reducedMotion: boolean;
}

function SceneDirector({ motion, profile, layout, reducedMotion }: SceneDirectorProps) {
  const { camera, gl, scene } = useThree();
  const cameraPosition = useMemo(() => new THREE.Vector3(), []);
  const streamLookAt = useMemo(() => new THREE.Vector3(), []);
  const lookAt = useMemo(() => new THREE.Vector3(), []);
  const initialLookAt = useMemo(
    () => new THREE.Vector3(layout.bucketStart.x * 0.28, profile === 'mobile' ? -0.18 : -0.04, 0),
    [layout.bucketStart.x, profile],
  );
  const centeredLookAt = useMemo(
    () => new THREE.Vector3(0, layout.bucketEnd.y, 0),
    [layout.bucketEnd.y],
  );
  const darkBackground = useMemo(() => new THREE.Color('#060b17'), []);
  const daylightBackground = useMemo(() => new THREE.Color('#b9d3df'), []);
  const finishedBackground = useMemo(() => new THREE.Color('#294e68'), []);
  const background = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }) => {
    const values = motion.current;
    const transition = reducedMotion ? 1 : values.transition;
    layout.cameraCurve.getPointAt(transition, cameraPosition);

    if (!reducedMotion) {
      // Product act only: a restrained push-in and lateral follow makes the
      // stroke feel photographed rather than observed by a static camera.
      // It reaches zero before the established house choreography begins.
      const productAct = 1 - segment(values.transition, 0.32, 0.9);
      const strokeFollow = segment(values.paintProgress, 0.04, 0.46) * productAct;
      cameraPosition.z -= values.intro * 0.2 * productAct;
      cameraPosition.x += strokeFollow * (profile === 'mobile' ? 0.055 : profile === 'tablet' ? 0.12 : 0.2);
      cameraPosition.y += strokeFollow * (profile === 'mobile' ? 0.035 : 0.1);

      const accentFocus = values.houseAccent * (1 - values.houseDetails);
      const detailsFocus = values.houseDetails * (1 - values.houseLuxury);
      const cameraScale = profile === 'mobile' ? 0.48 : profile === 'tablet' ? 0.72 : 1;
      cameraPosition.x += (accentFocus * 0.24 - detailsFocus * 0.1) * cameraScale;
      cameraPosition.y += (values.housePaint * 0.035 + detailsFocus * 0.04) * cameraScale;
      cameraPosition.z -= detailsFocus * 0.34 * cameraScale;
      cameraPosition.z += values.houseLuxury * (profile === 'mobile' ? 1.55 : profile === 'tablet' ? 1.7 : 1.95);
      cameraPosition.y += values.houseLuxury * (profile === 'mobile' ? 0.08 : 0.16);
      cameraPosition.x += Math.sin(clock.elapsedTime * 0.24) * 0.014 * values.finalHold;
    } else {
      cameraPosition.z += profile === 'mobile' ? 1.75 : 1.75;
      cameraPosition.y += 0.15;
    }
    camera.position.copy(cameraPosition);

    layout.paintCurve.getPointAt(Math.min(0.995, values.paintProgress + 0.025), streamLookAt);
    const streamFollowAmount = profile === 'mobile' ? 0.16 : profile === 'tablet' ? 0.23 : 0.3;
    const streamFocus = segment(values.paintProgress, 0.04, 0.4)
      * (1 - segment(values.transition, 0.34, 0.82))
      * streamFollowAmount;
    lookAt.copy(initialLookAt).lerp(centeredLookAt, segment(values.intro, 0.05, 0.88));
    lookAt.lerp(streamLookAt, streamFocus);
    lookAt.lerp(layout.houseLookAt, reducedMotion ? 1 : segment(values.transition, 0.34, 0.95));
    if (!reducedMotion) {
      const accentFocus = values.houseAccent * (1 - values.houseDetails);
      const detailsFocus = values.houseDetails * (1 - values.houseLuxury);
      lookAt.x += accentFocus * (profile === 'mobile' ? 0.04 : 0.14);
      lookAt.y += detailsFocus * (profile === 'mobile' ? 0.025 : 0.07);
    }
    lookAt.y += Math.sin(clock.elapsedTime * 0.2) * 0.008 * values.finalHold;
    camera.lookAt(lookAt);

    if (camera instanceof THREE.PerspectiveCamera) {
      const transitionFov = THREE.MathUtils.lerp(layout.cameraFov[0], layout.cameraFov[1], transition);
      const finalFov = THREE.MathUtils.lerp(transitionFov, profile === 'mobile' ? 34 : 32, values.houseLuxury);
      if (Math.abs(camera.fov - finalFov) > 0.001) {
        camera.fov = finalFov;
        camera.updateProjectionMatrix();
      }
    }

    background
      .copy(darkBackground)
      .lerp(daylightBackground, values.houseReveal)
      .lerp(finishedBackground, values.houseLuxury * 0.78);
    if (scene.background instanceof THREE.Color) scene.background.copy(background);
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.copy(background);
      scene.fog.near = THREE.MathUtils.lerp(8.7, 14.2, values.houseReveal);
      scene.fog.far = THREE.MathUtils.lerp(15.5, 29, values.houseReveal);
    }

    gl.toneMappingExposure = THREE.MathUtils.lerp(1.03, 1, values.houseReveal) + values.houseLuxury * 0.07;
    gl.domElement.dataset.heroCamera = cameraPosition.toArray().map((value) => value.toFixed(2)).join(',');
    gl.domElement.dataset.heroLookAt = lookAt.toArray().map((value) => value.toFixed(2)).join(',');
    gl.domElement.dataset.heroDrawCalls = String(gl.info.render.calls);
    gl.domElement.dataset.heroTextures = String(gl.info.memory.textures);
  });

  return null;
}

function ArchitecturalLighting({ motion }: Pick<SceneDirectorProps, 'motion'>) {
  const hemisphereRef = useRef<THREE.HemisphereLight>(null);
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const entranceGlowRef = useRef<THREE.PointLight>(null);
  const gardenGlowRef = useRef<THREE.PointLight>(null);
  const mutedSky = useMemo(() => new THREE.Color('#cbd7de'), []);
  const finishedSky = useMemo(() => new THREE.Color('#fff0d5'), []);
  const mutedGround = useMemo(() => new THREE.Color('#596258'), []);
  const finishedGround = useMemo(() => new THREE.Color('#72815f'), []);
  const coolSun = useMemo(() => new THREE.Color('#eef3f8'), []);
  const warmSun = useMemo(() => new THREE.Color('#fff0cf'), []);

  useFrame(() => {
    const values = motion.current;
    const finish = values.houseLuxury;
    const detail = values.houseDetails;
    const reveal = values.houseReveal;
    if (hemisphereRef.current) {
      hemisphereRef.current.intensity = reveal * THREE.MathUtils.lerp(0.42, 0.66, finish);
      hemisphereRef.current.color.copy(mutedSky).lerp(finishedSky, finish);
      hemisphereRef.current.groundColor.copy(mutedGround).lerp(finishedGround, finish);
    }
    if (sunRef.current) {
      sunRef.current.intensity = reveal * THREE.MathUtils.lerp(0.82, 1.28, finish);
      sunRef.current.color.copy(coolSun).lerp(warmSun, finish);
    }
    if (entranceGlowRef.current) entranceGlowRef.current.intensity = detail * 0.18 + finish * 0.44;
    if (gardenGlowRef.current) gardenGlowRef.current.intensity = values.houseAccent * 0.08 + finish * 0.3;
  });

  return (
    <>
      <hemisphereLight ref={hemisphereRef} args={['#cbd7de', '#596258', 0]} />
      <directionalLight ref={sunRef} position={[-4, 7, 3]} intensity={0} color="#eef3f8" />
      <pointLight ref={entranceGlowRef} position={[-0.8, -0.6, -6.7]} color="#ffd39a" distance={5.5} decay={2} intensity={0} />
      <pointLight ref={gardenGlowRef} position={[3.1, -1.25, -6.2]} color="#ffe2ad" distance={5} decay={2} intensity={0} />
    </>
  );
}

interface CinematicEnvironmentProps {
  motion: MutableRefObject<HeroMotionState>;
  profile: HeroViewportProfile;
  layout: HeroSceneLayout;
}

function CinematicEnvironment({ motion, profile, layout }: CinematicEnvironmentProps) {
  const backgroundRef = useRef<THREE.Mesh>(null);
  const foregroundRef = useRef<THREE.Mesh>(null);
  const groundShadowRef = useRef<THREE.Mesh>(null);
  const [backgroundTexture, foregroundTexture, groundShadowTexture] = useTexture(ENVIRONMENT_TEXTURES) as THREE.Texture[];
  const { gl } = useThree();
  const widthScale = profile === 'mobile' ? 1.22 : profile === 'tablet' ? 1.18 : 1.14;

  useLayoutEffect(() => {
    const anisotropy = Math.min(profile === 'desktop' ? 4 : 2, gl.capabilities.getMaxAnisotropy());
    [backgroundTexture, foregroundTexture, groundShadowTexture].forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = anisotropy;
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
    });
  }, [backgroundTexture, foregroundTexture, gl, groundShadowTexture, profile]);

  useFrame(({ clock }) => {
    const values = motion.current;
    const background = backgroundRef.current;
    const foreground = foregroundRef.current;
    const shadow = groundShadowRef.current;

    if (background) {
      const material = background.material as THREE.MeshBasicMaterial;
      const reveal = Math.max(values.houseAccent * 0.34, values.houseDetails * 0.54, values.houseLuxury * 0.76);
      background.visible = reveal > 0.002;
      material.opacity = reveal;
      background.position.x = layout.housePosition.x - values.houseAccent * 0.025;
    }
    if (foreground) {
      const material = foreground.material as THREE.MeshBasicMaterial;
      const reveal = Math.max(values.houseDetails * 0.38, values.houseLuxury * 0.86);
      foreground.visible = reveal > 0.002;
      material.opacity = reveal;
      foreground.position.x = layout.housePosition.x + Math.sin(clock.elapsedTime * 0.22) * 0.008 * values.finalHold;
    }
    if (shadow) {
      const material = shadow.material as THREE.MeshBasicMaterial;
      const reveal = Math.max(values.houseDetails * 0.26, values.houseLuxury * 0.58);
      shadow.visible = reveal > 0.002;
      material.opacity = reveal;
    }
  });

  const backgroundWidth = layout.houseWidth * widthScale;
  const foregroundWidth = layout.houseWidth * (profile === 'mobile' ? 1.08 : 1.04);

  return (
    <>
      <mesh
        ref={backgroundRef}
        position={[layout.housePosition.x, layout.housePosition.y - 1.45, layout.housePosition.z - 0.12]}
        renderOrder={0}
        visible={false}
      >
        <planeGeometry args={[backgroundWidth, backgroundWidth / 2]} />
        <meshBasicMaterial map={backgroundTexture} transparent opacity={0} alphaTest={0.025} depthWrite={false} toneMapped />
      </mesh>
      <mesh
        ref={groundShadowRef}
        position={[layout.housePosition.x, layout.housePosition.y - 2.55, layout.housePosition.z + 0.08]}
        renderOrder={2}
        visible={false}
      >
        <planeGeometry args={[layout.houseWidth * 0.92, layout.houseWidth * 0.46]} />
        <meshBasicMaterial map={groundShadowTexture} transparent opacity={0} alphaTest={0.015} depthWrite={false} toneMapped />
      </mesh>
      <mesh
        ref={foregroundRef}
        position={[layout.housePosition.x, layout.housePosition.y - 2.15, layout.housePosition.z + 0.16]}
        renderOrder={3}
        visible={false}
      >
        <planeGeometry args={[foregroundWidth, foregroundWidth / 1.5]} />
        <meshBasicMaterial map={foregroundTexture} transparent opacity={0} alphaTest={0.025} depthWrite={false} toneMapped />
      </mesh>
    </>
  );
}

function SceneContents(props: HeroSceneProps) {
  const layout = useMemo(() => createHeroSceneLayout(props.profile), [props.profile]);

  return (
    <>
      <color attach="background" args={['#060b17']} />
      <fog attach="fog" args={['#060b17', 8.7, 15.5]} />
      <SceneDirector
        motion={props.motion}
        profile={props.profile}
        layout={layout}
        reducedMotion={props.reducedMotion}
      />
      <StudioBucket {...props} layout={layout} />
      <LiquidPaint
        motion={props.motion}
        profile={props.profile}
        curve={layout.paintCurve}
        reducedMotion={props.reducedMotion}
      />
      <ArchitecturalHouse motion={props.motion} profile={props.profile} layout={layout} />

      <CinematicEnvironment motion={props.motion} profile={props.profile} layout={layout} />

      <ArchitecturalLighting motion={props.motion} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[0, 2.5, 8]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-4, 2, 6]} intensity={1.0} color="#eef6ff" />
      <directionalLight position={[4, 2, 6]} intensity={1.0} color="#fff4e8" />
      <Environment resolution={props.profile === 'desktop' ? 96 : 64}>
        <Lightformer form="rect" intensity={3.2} color="#dce9ff" position={[-4, 4, 4]} scale={[5, 3, 1]} />
        <Lightformer form="rect" intensity={1.55} color="#ffd9b6" position={[4, 2, -2]} rotation={[0, -0.7, 0]} scale={[3, 5, 1]} />
        <Lightformer form="ring" intensity={0.9} color="#b9e8f2" position={[0, 5, -3]} scale={3} />
      </Environment>
    </>
  );
}

export default function HeroScene(props: HeroSceneProps) {
  const dpr: [number, number] = props.profile === 'desktop'
    ? [1, 1.35]
    : props.profile === 'tablet'
      ? [0.9, 1.15]
      : [0.8, 1];

  return (
    <Canvas
      className="cinematic-hero__canvas"
      frameloop={props.active ? 'always' : 'never'}
      dpr={dpr}
      camera={{
        fov: props.profile === 'mobile' ? 32 : 29,
        near: 0.1,
        far: 42,
        position: [0, props.profile === 'mobile' ? 0.04 : 0.08, props.profile === 'mobile' ? 8.65 : props.profile === 'tablet' ? 8.2 : 8.05],
      }}
      gl={{
        alpha: false,
        antialias: props.profile !== 'mobile',
        powerPreference: 'high-performance',
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.03;
        gl.domElement.dataset.heroMotion = '0.000';
      }}
    >
      <Suspense fallback={null}>
        <SceneContents {...props} />
      </Suspense>
    </Canvas>
  );
}

useTexture.preload(BUCKET_TEXTURES);
useTexture.preload(ENVIRONMENT_TEXTURES);
