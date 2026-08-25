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
  '/assets/hero/bucket/muthulac-bucket-closed-CV8ODW7x.webp',
  '/assets/hero/bucket/muthulac-bucket-open-DARpo9Mj.webp',
  '/assets/hero/bucket/muthulac-bucket-red.jpg',
  '/assets/hero/bucket/muthulac-bucket-green.jpg',
  '/assets/hero/bucket/muthulac-bucket-yellow.jpg',
  '/assets/hero/bucket/muthulac-bucket-purple.jpg',
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

function StudioBucket({ motion, profile, reducedMotion, onReady, layout }: StudioBucketProps) {
  const bucketGroupRef = useRef<THREE.Group>(null);
  const heroBucketRef = useRef<THREE.Group>(null);
  const companionRefs = useRef<(THREE.Group | null)[]>([]);

  const closedMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const openMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const depthMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  const companionMaterialRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const companionDepthRefs = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);

  const keyLightRef = useRef<THREE.SpotLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const shadowRef = useRef<THREE.Mesh>(null);

  const [closedTexture, openTexture, redTexture, greenTexture, yellowTexture, purpleTexture] = useTexture(
    BUCKET_TEXTURES,
  ) as THREE.Texture[];
  const { gl } = useThree();

  const shadowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 192;
    canvas.height = 192;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(96, 96, 8, 96, 96, 96);
      gradient.addColorStop(0, 'rgba(0,0,0,0.72)');
      gradient.addColorStop(0.4, 'rgba(0,0,0,0.42)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 192, 192);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  // 4 Companion buckets configuration with individual textures: Red, Green, Yellow, Purple
  const companions = useMemo(() => [
    {
      id: 'red',
      texture: redTexture,
      depthColor: '#991b1b',
      offset: [-1.45, -0.16, -0.42] as [number, number, number],
      scale: 0.86,
      rotY: 0.05,
    },
    {
      id: 'green',
      texture: greenTexture,
      depthColor: '#065f46',
      offset: [1.45, -0.16, -0.42] as [number, number, number],
      scale: 0.86,
      rotY: -0.05,
    },
    {
      id: 'yellow',
      texture: yellowTexture,
      depthColor: '#b45309',
      offset: [-0.85, 0.72, -0.88] as [number, number, number],
      scale: 0.80,
      rotY: 0.03,
    },
    {
      id: 'purple',
      texture: purpleTexture,
      depthColor: '#6b21a8',
      offset: [0.85, 0.72, -0.88] as [number, number, number],
      scale: 0.80,
      rotY: -0.03,
    },
  ], [greenTexture, purpleTexture, redTexture, yellowTexture]);

  useLayoutEffect(() => {
    const anisotropy = Math.min(profile === 'desktop' ? 8 : 4, gl.capabilities.getMaxAnisotropy());
    [closedTexture, openTexture, redTexture, greenTexture, yellowTexture, purpleTexture].forEach((texture) => {
      if (texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = anisotropy;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.needsUpdate = true;
      }
    });
    shadowTexture.needsUpdate = true;
    return () => shadowTexture.dispose();
  }, [closedTexture, gl, greenTexture, openTexture, profile, purpleTexture, redTexture, shadowTexture, yellowTexture]);

  useEffect(() => onReady(), [onReady]);

  useFrame(({ clock }) => {
    const group = bucketGroupRef.current;
    const heroBucket = heroBucketRef.current;
    if (!group || !heroBucket) return;

    const values = motion.current;
    const tiltPhase = segment(values.intro, 0.48, 1);
    const openMix = segment(values.intro, 0.7, 1);
    const exit = values.bucketExit;
    const fade = 1 - segment(exit, 0.12, 0.96);
    const companionFade = 1 - segment(exit, 0.02, 0.42);
    const idle = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.56) * 0.014 * (1 - tiltPhase) * (1 - exit);

    if (reducedMotion && values.houseReveal > 0.9) {
      group.position.set(
        profile === 'mobile' ? -0.5 : profile === 'tablet' ? -2.1 : -3.1,
        profile === 'mobile' ? -1.8 : -1.65,
        -3,
      );
      group.rotation.set(0, -0.04, 0);
      group.scale.setScalar(layout.bucketScale * (profile === 'mobile' ? 0.5 : 0.32));
    } else {
      // Group position and subtle entrance
      group.position.lerpVectors(layout.bucketStart, layout.bucketEnd, tiltPhase);
      group.position.y += (1 - values.intro) * 0.24 + idle + exit * 0.14;
      group.position.z -= exit * 2.55;
      group.position.x -= exit * (profile === 'mobile' ? 0.04 : 0.18);
      group.rotation.set(
        THREE.MathUtils.lerp(layout.bucketStartRotation.x, layout.bucketEndRotation.x, tiltPhase),
        THREE.MathUtils.lerp(layout.bucketStartRotation.y, layout.bucketEndRotation.y, tiltPhase),
        THREE.MathUtils.lerp(layout.bucketStartRotation.z, layout.bucketEndRotation.z, tiltPhase),
      );
      const entranceScale = layout.bucketScale * (0.94 + values.intro * 0.06) * (1 - exit * 0.16);
      group.scale.setScalar(entranceScale);
    }

    const effectiveOpenMix = reducedMotion ? 0 : openMix;
    const effectiveFade = reducedMotion && values.houseReveal > 0.9 ? 0.9 : fade;
    group.visible = effectiveFade > 0.002;

    // Central Hero Bucket materials
    if (closedMaterialRef.current && openMaterialRef.current) {
      closedMaterialRef.current.opacity = (1 - effectiveOpenMix) * effectiveFade;
      openMaterialRef.current.opacity = effectiveOpenMix * effectiveFade;
    }
    if (depthMaterialRef.current) {
      depthMaterialRef.current.opacity = (1 - effectiveOpenMix * 0.7) * effectiveFade;
    }

    // Companion buckets fade smoothly during exit
    companionMaterialRefs.current.forEach((mat) => {
      if (mat) mat.opacity = effectiveFade * companionFade;
    });
    companionDepthRefs.current.forEach((mat) => {
      if (mat) mat.opacity = effectiveFade * companionFade;
    });

    if (shadowRef.current) {
      shadowRef.current.visible = effectiveFade > 0.002;
      shadowRef.current.position.x = group.position.x * 0.72;
      shadowRef.current.position.z = group.position.z - 0.18;
      shadowRef.current.scale.set(1.65 - tiltPhase * 0.1, 0.58 + tiltPhase * 0.07, 1);
      const shadowMaterial = shadowRef.current.material as THREE.MeshBasicMaterial;
      shadowMaterial.opacity = (0.48 - tiltPhase * 0.14) * values.intro * effectiveFade;
    }

    if (keyLightRef.current) keyLightRef.current.intensity = (54 + values.intro * 44) * (0.68 + effectiveFade * 0.32);
    if (fillLightRef.current) fillLightRef.current.intensity = 26 * effectiveFade;
    if (rimLightRef.current) rimLightRef.current.intensity = 40 * effectiveFade;
    gl.domElement.dataset.heroMotion = values.master.toFixed(3);
  });

  return (
    <>
      <group ref={bucketGroupRef}>
        {/* Central Hero Signature Blue Bucket (pours paint in Stage 2) */}
        <group ref={heroBucketRef} position={[0, 0, 0]}>
          <mesh position={[0, -0.18, -0.42]} scale={[1.06, 1, 0.2]}>
            <cylinderGeometry args={[1.18, 1.08, 2.45, profile === 'mobile' ? 32 : 52, 1, false]} />
            <meshPhysicalMaterial
              ref={depthMaterialRef}
              color="#092b75"
              transparent
              opacity={1}
              metalness={0.18}
              roughness={0.3}
              clearcoat={0.8}
              clearcoatRoughness={0.2}
              depthWrite
            />
          </mesh>

          <mesh position={[0, 0, 0.22]} renderOrder={2}>
            <planeGeometry args={[5.1, 3.4]} />
            <meshStandardMaterial
              ref={closedMaterialRef}
              map={closedTexture}
              transparent
              alphaTest={0.025}
              depthWrite
              roughness={0.27}
              metalness={0.04}
              emissive="#07183f"
              emissiveMap={closedTexture}
              emissiveIntensity={0.06}
            />
          </mesh>

          <mesh position={[0, 0.01, 0.225]} renderOrder={3}>
            <planeGeometry args={[5.1, 3.4]} />
            <meshStandardMaterial
              ref={openMaterialRef}
              map={openTexture}
              transparent
              opacity={0}
              alphaTest={0.025}
              depthWrite
              roughness={0.22}
              metalness={0.05}
              emissive="#07183f"
              emissiveMap={openTexture}
              emissiveIntensity={0.07}
            />
          </mesh>
        </group>

        {/* 4 Colored Companion Buckets (Red, Green, Yellow, Purple) */}
        {companions.map((comp, idx) => (
          <group
            key={comp.id}
            ref={(el) => { companionRefs.current[idx] = el; }}
            position={comp.offset}
            scale={comp.scale}
            rotation={[0, comp.rotY, 0]}
          >
            <mesh position={[0, -0.18, -0.42]} scale={[1.06, 1, 0.2]}>
              <cylinderGeometry args={[1.18, 1.08, 2.45, 32, 1, false]} />
              <meshPhysicalMaterial
                ref={(el) => { companionDepthRefs.current[idx] = el; }}
                color={comp.depthColor}
                transparent
                opacity={1}
                metalness={0.2}
                roughness={0.32}
                clearcoat={0.75}
                clearcoatRoughness={0.22}
                depthWrite
              />
            </mesh>

            <mesh position={[0, 0, 0.22]} renderOrder={idx < 2 ? 1 : 0}>
              <planeGeometry args={[5.1, 3.4]} />
              <meshStandardMaterial
                ref={(el) => { companionMaterialRefs.current[idx] = el; }}
                map={comp.texture}
                transparent
                alphaTest={0.025}
                depthWrite
                roughness={0.28}
                metalness={0.04}
              />
            </mesh>
          </group>
        ))}
      </group>

      <mesh ref={shadowRef} position={[0.4, -1.62, -0.18]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={0}>
        <planeGeometry args={[3.6, 2.4]} />
        <meshBasicMaterial map={shadowTexture} transparent depthWrite={false} opacity={0} />
      </mesh>

      <ambientLight intensity={0.22} color="#adc9ff" />
      <spotLight
        ref={keyLightRef}
        position={[-3.6, 5.5, 5.5]}
        angle={0.48}
        penumbra={0.92}
        decay={1.7}
        distance={18}
        color="#f5f8ff"
      />
      <pointLight ref={fillLightRef} position={[-4.2, 0.2, 2.6]} color="#55bfff" distance={11} decay={2} />
      <pointLight ref={rimLightRef} position={[4.4, 2.1, -1.6]} color="#82a8ff" distance={13} decay={2} />
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
    () => new THREE.Vector3(layout.bucketStart.x * 0.35, profile === 'mobile' ? -0.42 : -0.04, 0),
    [layout.bucketStart.x, profile],
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
      cameraPosition.z += profile === 'mobile' ? 1.55 : 1.75;
      cameraPosition.y += 0.15;
    }
    camera.position.copy(cameraPosition);

    layout.paintCurve.getPointAt(Math.min(0.995, values.paintProgress + 0.025), streamLookAt);
    const streamFollowAmount = profile === 'mobile' ? 0.16 : profile === 'tablet' ? 0.23 : 0.3;
    const streamFocus = segment(values.paintProgress, 0.04, 0.4)
      * (1 - segment(values.transition, 0.34, 0.82))
      * streamFollowAmount;
    lookAt.copy(initialLookAt).lerp(streamLookAt, streamFocus);
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
        fov: props.profile === 'mobile' ? 33 : 29,
        near: 0.1,
        far: 42,
        position: [0, 0.08, props.profile === 'mobile' ? 8.45 : 8.05],
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
