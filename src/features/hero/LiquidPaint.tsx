import { memo, useLayoutEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { HeroMotionState, HeroViewportProfile } from './heroMotion';

interface LiquidPaintProps {
  motion: MutableRefObject<HeroMotionState>;
  profile: HeroViewportProfile;
  curve: THREE.CatmullRomCurve3;
  reducedMotion?: boolean;
}

interface CompiledPaintShader {
  uniforms: Record<string, THREE.IUniform>;
}

interface PaintBubbleSpec {
  curveT: number;
  offset: THREE.Vector3;
  rest: THREE.Vector3;
  size: number;
  stretch: number;
  phase: number;
  anticipation: boolean;
}

const PAINT_BLUE = new THREE.Color('#075dcc');
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const segment = (progress: number, start: number, end: number) => {
  const value = clamp01((progress - start) / Math.max(0.0001, end - start));
  return value * value * (3 - 2 * value);
};

/**
 * Builds a single volumetric brush stroke around the shared Hero curve.
 * The oval cross-section, width variation and longitudinal ridges keep the
 * geometry from reading as a hose while retaining TubeGeometry-level cost.
 */
function createBrushStrokeGeometry(
  curve: THREE.CatmullRomCurve3,
  profile: HeroViewportProfile,
) {
  const tubularSegments = profile === 'desktop' ? 176 : profile === 'tablet' ? 132 : 92;
  const radialSegments = profile === 'desktop' ? 14 : profile === 'tablet' ? 11 : 8;
  const baseRadius = profile === 'mobile' ? 0.084 : profile === 'tablet' ? 0.105 : 0.122;
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const vertices: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const point = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const vertex = new THREE.Vector3();

  for (let index = 0; index <= tubularSegments; index += 1) {
    const t = index / tubularSegments;
    curve.getPointAt(t, point);
    const loadedBody = Math.sin(Math.PI * clamp01(t / 0.78));
    const widthVariation = 1.3
      + loadedBody * 0.34
      + Math.sin(t * 37.0 + 0.7) * 0.055
      + Math.sin(t * 83.0) * 0.022;
    const heightVariation = 0.31
      + loadedBody * 0.055
      + Math.sin(t * 31.0) * 0.025;

    for (let sideIndex = 0; sideIndex <= radialSegments; sideIndex += 1) {
      const sideT = sideIndex / radialSegments;
      const angle = sideT * Math.PI * 2;
      const bristleRidge = 1
        + Math.sin(sideT * Math.PI * 12 + t * 49) * 0.026
        + Math.sin(sideT * Math.PI * 22 - t * 27) * 0.012;
      const sideAsymmetry = Math.sign(Math.cos(angle))
        * (Math.sin(t * 51.0 + 0.8) * 0.055 + Math.sin(t * 113.0) * 0.024);
      const width = baseRadius * widthVariation * bristleRidge * (1 + sideAsymmetry);
      const height = baseRadius * heightVariation * bristleRidge;

      // A rounded superellipse creates broad brush faces with real edge
      // thickness instead of the perfectly round silhouette of TubeGeometry.
      const shapeX = Math.sign(Math.cos(angle)) * Math.sqrt(Math.abs(Math.cos(angle)));
      const shapeY = Math.sign(Math.sin(angle)) * Math.sqrt(Math.abs(Math.sin(angle)));

      normal
        .copy(frames.normals[index])
        .multiplyScalar(shapeX * width)
        .addScaledVector(frames.binormals[index], shapeY * height)
        .normalize();
      vertex
        .copy(point)
        .addScaledVector(frames.normals[index], shapeX * width)
        .addScaledVector(frames.binormals[index], shapeY * height);

      vertices.push(vertex.x, vertex.y, vertex.z);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(t, sideT);
    }
  }

  for (let index = 1; index <= tubularSegments; index += 1) {
    for (let sideIndex = 1; sideIndex <= radialSegments; sideIndex += 1) {
      const a = (radialSegments + 1) * (index - 1) + (sideIndex - 1);
      const b = (radialSegments + 1) * index + (sideIndex - 1);
      const c = (radialSegments + 1) * index + sideIndex;
      const d = (radialSegments + 1) * (index - 1) + sideIndex;
      indices.push(a, b, d, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.computeBoundingSphere();
  return geometry;
}

const PaintAnticipation = memo(function PaintAnticipation({ motion, profile, curve }: LiquidPaintProps) {
  const surfaceRef = useRef<THREE.Mesh>(null);
  const firstRippleRef = useRef<THREE.Mesh>(null);
  const secondRippleRef = useRef<THREE.Mesh>(null);
  const surfaceMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const firstRippleMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const secondRippleMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const origin = useMemo(() => curve.getPointAt(0), [curve]);
  const radius = profile === 'mobile' ? 0.105 : profile === 'tablet' ? 0.135 : 0.155;

  useFrame(({ clock }) => {
    const values = motion.current;
    const anticipation = segment(values.intro, 0.54, 0.96) * (1 - segment(values.bucketExit, 0.04, 0.38));
    const pulse = 1 + Math.sin(clock.elapsedTime * 3.1) * 0.045;

    if (surfaceRef.current) {
      surfaceRef.current.visible = anticipation > 0.002;
      surfaceRef.current.position.copy(origin);
      surfaceRef.current.position.z += 0.01;
      surfaceRef.current.scale.set(radius * pulse * anticipation, radius * 0.3 * anticipation, radius * 0.72 * pulse * anticipation);
    }
    if (surfaceMaterialRef.current) surfaceMaterialRef.current.opacity = anticipation * 0.94;

    const setRipple = (
      ripple: THREE.Mesh | null,
      material: THREE.MeshBasicMaterial | null,
      delay: number,
    ) => {
      if (!ripple || !material) return;
      const phase = (clock.elapsedTime * 0.44 + delay) % 1;
      const visibility = anticipation * Math.sin(Math.PI * phase);
      ripple.visible = visibility > 0.002;
      ripple.position.copy(origin);
      ripple.position.z += 0.022 + delay * 0.006;
      ripple.scale.setScalar(radius * (0.78 + phase * 1.02));
      material.opacity = visibility * 0.34;
    };
    setRipple(firstRippleRef.current, firstRippleMaterialRef.current, 0);
    setRipple(secondRippleRef.current, secondRippleMaterialRef.current, 0.52);
  });

  return (
    <group>
      <mesh ref={surfaceRef} visible={false} frustumCulled={false} renderOrder={4}>
        <sphereGeometry args={[1, profile === 'mobile' ? 12 : 22, profile === 'mobile' ? 8 : 14]} />
        <meshPhysicalMaterial
          ref={surfaceMaterialRef}
          color={PAINT_BLUE}
          roughness={0.2}
          clearcoat={0.86}
          clearcoatRoughness={0.1}
          specularIntensity={0.76}
          envMapIntensity={1.2}
          transparent
          depthWrite
        />
      </mesh>
      {[firstRippleRef, secondRippleRef].map((ref, index) => (
        <mesh key={index} ref={ref} visible={false} frustumCulled={false} renderOrder={5}>
          <torusGeometry args={[1, 0.045, 6, profile === 'mobile' ? 18 : 28]} />
          <meshBasicMaterial
            ref={index === 0 ? firstRippleMaterialRef : secondRippleMaterialRef}
            color="#67adff"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
});

const PaintBubbles = memo(function PaintBubbles({ motion, profile, curve }: LiquidPaintProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = profile === 'desktop' ? 18 : profile === 'tablet' ? 11 : 6;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const cursorWorld = useMemo(() => new THREE.Vector3(), []);
  const cursorDirection = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);
  const displacement = useMemo(() => new THREE.Vector3(), []);
  const finePointer = useMemo(
    () => profile === 'desktop' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    [profile],
  );
  const { camera } = useThree();

  const bubbles = useMemo<PaintBubbleSpec[]>(() => {
    let seed = 3187;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const specs: PaintBubbleSpec[] = [];

    for (let index = 0; index < count; index += 1) {
      const anticipation = index < Math.min(3, count);
      const curveT = anticipation ? 0.006 + index * 0.012 : 0.055 + random() * 0.43;
      const curvePoint = curve.getPointAt(curveT);
      const depthBand = index % 3;
      const depth = depthBand === 0 ? -0.82 : depthBand === 1 ? 0.02 : 0.9;
      const spread = profile === 'mobile' ? 0.24 : 0.48;
      const offset = new THREE.Vector3(
        (random() - 0.5) * spread * (anticipation ? 0.48 : 1),
        (random() - 0.38) * spread * 0.82 + (anticipation ? 0.16 + index * 0.08 : 0),
        depth + (random() - 0.5) * 0.28,
      );
      const rest = curvePoint.clone().add(offset);
      specs.push({
        curveT,
        offset,
        rest,
        size: (anticipation ? 0.035 : 0.026) + random() * (profile === 'mobile' ? 0.038 : 0.065),
        stretch: 0.85 + random() * 1.5,
        phase: random() * Math.PI * 2,
        anticipation,
      });
    }
    return specs;
  }, [count, curve, profile]);

  const currentPositions = useMemo(
    () => bubbles.map((bubble) => bubble.rest.clone()),
    [bubbles],
  );

  useFrame(({ clock, pointer }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const values = motion.current;
    const transitionFade = 1 - segment(values.transition, 0.46, 0.94);
    const anticipationProgress = segment(values.intro, 0.61, 0.98);
    mesh.visible = transitionFade > 0.002 && (anticipationProgress > 0.002 || values.paintProgress > 0.004);

    cursorWorld.set(pointer.x, pointer.y, 0.18).unproject(camera);
    cursorDirection.copy(cursorWorld).sub(camera.position).normalize();
    const pointerDistance = Math.abs(cursorDirection.z) > 0.0001
      ? (camera.position.z / -cursorDirection.z)
      : 0;
    cursorWorld.copy(camera.position).addScaledVector(cursorDirection, pointerDistance);

    bubbles.forEach((bubble, index) => {
      const reveal = bubble.anticipation
        ? anticipationProgress * (1 - segment(values.paintProgress, 0.16, 0.38))
        : segment(values.paintProgress, Math.max(0, bubble.curveT - 0.085), bubble.curveT + 0.015)
          * transitionFade;
      const strokeInfluence = Math.max(0, 1 - Math.abs(values.paintProgress - bubble.curveT) / 0.09);
      const driftScale = profile === 'mobile' ? 0.42 : 1;

      desired.copy(bubble.rest);
      desired.x += Math.sin(clock.elapsedTime * 0.48 + bubble.phase) * 0.035 * driftScale;
      desired.y += Math.cos(clock.elapsedTime * 0.38 + bubble.phase * 1.3) * 0.05 * driftScale;
      desired.x += Math.sign(bubble.offset.x || 1) * strokeInfluence * 0.075 * driftScale;
      desired.y += strokeInfluence * 0.035 * driftScale;

      if (finePointer && reveal > 0.01 && desired.z > -0.35) {
        displacement.set(desired.x - cursorWorld.x, desired.y - cursorWorld.y, 0);
        const distance = displacement.length();
        const response = clamp01((1.25 - distance) / 1.25);
        if (distance > 0.0001) desired.addScaledVector(displacement.normalize(), response * response * 0.11);
      }

      currentPositions[index].lerp(desired, 0.075);
      dummy.position.copy(currentPositions[index]);
      dummy.rotation.set(
        Math.sin(clock.elapsedTime * 0.23 + bubble.phase) * 0.22,
        Math.cos(clock.elapsedTime * 0.19 + bubble.phase) * 0.28,
        bubble.phase + clock.elapsedTime * 0.11,
      );
      const size = bubble.size * reveal;
      dummy.scale.set(size * (0.8 + strokeInfluence * 0.14), size * bubble.stretch, size * 0.82);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false} renderOrder={5}>
      <sphereGeometry args={[1, profile === 'mobile' ? 7 : 10, profile === 'mobile' ? 5 : 8]} />
      <meshPhysicalMaterial
        color={PAINT_BLUE}
        roughness={0.23}
        metalness={0}
        clearcoat={0.88}
        clearcoatRoughness={0.12}
        specularIntensity={0.74}
        envMapIntensity={1.16}
      />
    </instancedMesh>
  );
});

export function LiquidPaint({ motion, profile, curve, reducedMotion }: LiquidPaintProps) {
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const shaderRef = useRef<CompiledPaintShader | null>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const sourceRef = useRef<THREE.Mesh>(null);
  const headMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const sourceMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const headPoint = useMemo(() => new THREE.Vector3(), []);
  const brushGeometry = useMemo(() => createBrushStrokeGeometry(curve, profile), [curve, profile]);

  useLayoutEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uProgress = { value: 0 };
      shader.uniforms.uFlow = { value: 0 };
      shader.uniforms.uThickness = { value: profile === 'mobile' ? 0.72 : 1 };
      shader.uniforms.uRadius = { value: profile === 'mobile' ? 0.084 : profile === 'tablet' ? 0.105 : 0.122 };
      shader.uniforms.uWetness = { value: 0.82 };
      shader.uniforms.uColor = { value: PAINT_BLUE.clone() };
      shader.uniforms.uHighlight = { value: 0.36 };
      shader.uniforms.uEdgeNoise = { value: profile === 'mobile' ? 0.55 : 1 };
      shader.uniforms.uTransition = { value: 0 };
      shader.uniforms.uWipeScale = { value: profile === 'mobile' ? 0.42 : 0.76 };
      shader.uniforms.uOpacity = { value: 1 };

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
          uniform float uTime;
          uniform float uProgress;
          uniform float uFlow;
          uniform float uThickness;
          uniform float uRadius;
          uniform float uEdgeNoise;
          uniform float uTransition;
          uniform float uWipeScale;
          varying float vPaintFlowT;
          varying float vPaintEdge;`,
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          vPaintFlowT = uv.x;
          vPaintEdge = pow(abs(cos(uv.y * 6.2831853)), 5.0);
          float viscousPulse = sin(uv.x * 33.0 - uFlow * 4.0) * 0.5
            + sin(uv.x * 71.0 + uTime * 0.27) * 0.24;
          float bristleRidge = sin(uv.y * 75.398 + uv.x * 54.0) * 0.34
            + sin(uv.y * 138.23 - uv.x * 29.0) * 0.16;
          float lensBulge = exp(-pow((uv.x - 0.73) * 9.2, 2.0)) * sin(uTransition * 3.14159265);
          float bodyTaper = smoothstep(0.0, 0.052, uv.x) * (1.0 - smoothstep(0.955, 1.0, uv.x) * 0.22);
          float drawnTip = 1.0 - smoothstep(0.0, 0.035, uProgress - uv.x);
          transformed += normal * (
            (bodyTaper - 1.0) * uRadius
            + viscousPulse * 0.013 * uThickness
            + bristleRidge * vPaintEdge * 0.011 * uEdgeNoise
            - drawnTip * vPaintEdge * 0.012
            + lensBulge * uWipeScale
          );`,
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
          uniform float uTime;
          uniform float uProgress;
          uniform float uFlow;
          uniform float uWetness;
          uniform vec3 uColor;
          uniform float uHighlight;
          uniform float uEdgeNoise;
          uniform float uTransition;
          uniform float uOpacity;
          varying float vPaintFlowT;
          varying float vPaintEdge;`,
        )
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
          float edgeBreakup = sin(vPaintFlowT * 147.0 + sin(vPaintFlowT * 61.0) * 2.3) * 0.005 * uEdgeNoise;
          float tipVariation = sin(vPaintFlowT * 113.0 + uTime * 0.72) * 0.003
            + sin(vPaintFlowT * 47.0 - uFlow * 1.4) * 0.005
            + edgeBreakup * vPaintEdge;
          if (vPaintFlowT > uProgress + tipVariation) discard;
          float bodyVariation = sin(vPaintFlowT * 29.0 + sin(vPaintFlowT * 71.0)) * 0.026;
          float brushGrain = sin(vPaintFlowT * 188.0 + vPaintEdge * 7.0) * vPaintEdge * 0.012 * uEdgeNoise;
          float wetHighlight = pow(0.5 + 0.5 * sin(vPaintFlowT * 41.0 - uFlow + vPaintEdge), 7.0) * uHighlight;
          vec3 pigmentedBlue = uColor * (0.9 + bodyVariation + brushGrain);
          diffuseColor.rgb = mix(pigmentedBlue, pigmentedBlue * 1.1, wetHighlight * 0.18);
          float movingTail = smoothstep(0.26, 0.6, vPaintFlowT);
          float wipeClears = smoothstep(0.78, 1.0, uTransition);
          float wallConnection = smoothstep(0.86, 0.965, vPaintFlowT);
          float retainedRibbon = mix(1.0, wallConnection, wipeClears);
          diffuseColor.a *= uOpacity
            * mix(1.0, movingTail, uTransition * 0.88)
            * retainedRibbon;`,
        )
        .replace(
          '#include <roughnessmap_fragment>',
          `#include <roughnessmap_fragment>
          roughnessFactor = mix(roughnessFactor, 0.32 + vPaintEdge * 0.055, uWetness * 0.68);`,
        )
        .replace(
          '#include <lights_physical_fragment>',
          `#include <lights_physical_fragment>
          material.clearcoat = mix(0.42, 0.63, uWetness);
          material.clearcoatRoughness = mix(0.28, 0.19, uWetness);`,
        )
        .replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
          totalEmissiveRadiance += uColor * 0.009 * uHighlight;`,
        );

      shaderRef.current = shader;
    };
    material.customProgramCacheKey = () => 'muthulac-flying-brush-stroke-v1';
    material.needsUpdate = true;

    return () => {
      shaderRef.current = null;
      brushGeometry.dispose();
    };
  }, [brushGeometry, profile]);

  useFrame(() => {
    const values = motion.current;
    const progress = values.paintProgress;
    const fade = 1 - segment(values.housePaint, 0.04, 0.34);
    const shader = shaderRef.current;
    const material = materialRef.current;
    const head = headRef.current;
    const source = sourceRef.current;

    if (material) {
      material.visible = progress > 0.001 && fade > 0.002;
      material.opacity = fade;
    }
    if (shader) {
      shader.uniforms.uTime.value = values.master * 9.5;
      shader.uniforms.uProgress.value = progress;
      shader.uniforms.uFlow.value = progress * 6.2;
      shader.uniforms.uTransition.value = values.transition;
      shader.uniforms.uOpacity.value = fade;
      shader.uniforms.uWetness.value = THREE.MathUtils.lerp(0.86, 0.7, values.transition);
    }

    if (head) {
      curve.getPointAt(Math.min(0.999, progress), headPoint);
      head.position.copy(headPoint);
      head.visible = progress > 0.002 && fade > 0.002;
      const radius = profile === 'mobile' ? 0.086 : profile === 'tablet' ? 0.108 : 0.126;
      const wipePulse = Math.sin(values.transition * Math.PI);
      const headScale = radius * fade * (1 + wipePulse * (profile === 'mobile' ? 2 : 2.8));
      head.scale.set(headScale * 1.14, headScale * 0.6, headScale * 0.88);
      if (headMaterialRef.current) headMaterialRef.current.opacity = fade;
    }

    if (source) {
      const sourceReveal = segment(progress, 0, 0.075);
      const sourceFade = 1 - segment(values.bucketExit, 0.15, 0.72);
      curve.getPointAt(0, headPoint);
      source.position.copy(headPoint);
      source.visible = sourceReveal * sourceFade > 0.002;
      const radius = profile === 'mobile' ? 0.09 : profile === 'tablet' ? 0.116 : 0.134;
      source.scale.set(
        radius * 1.18 * sourceReveal * sourceFade,
        radius * 0.62 * sourceReveal * sourceFade,
        radius * 0.96 * sourceReveal * sourceFade,
      );
      if (sourceMaterialRef.current) sourceMaterialRef.current.opacity = sourceFade;
    }
  });

  return (
    <group>
      <PaintAnticipation motion={motion} profile={profile} curve={curve} />

      <mesh geometry={brushGeometry} frustumCulled={false} renderOrder={3}>
        <meshPhysicalMaterial
          ref={materialRef}
          color={PAINT_BLUE}
          roughness={0.4}
          metalness={0}
          clearcoat={0.48}
          clearcoatRoughness={0.24}
          specularIntensity={0.44}
          envMapIntensity={0.52}
          ior={1.46}
          transparent
          opacity={1}
          depthWrite
        />
      </mesh>

      <mesh ref={headRef} frustumCulled={false} renderOrder={4} visible={false}>
        <sphereGeometry args={[1, profile === 'mobile' ? 14 : 28, profile === 'mobile' ? 9 : 18]} />
        <meshPhysicalMaterial
          ref={headMaterialRef}
          color={PAINT_BLUE}
          roughness={0.23}
          clearcoat={0.8}
          clearcoatRoughness={0.13}
          specularIntensity={0.72}
          envMapIntensity={1.08}
          transparent
          depthWrite
        />
      </mesh>

      <mesh ref={sourceRef} frustumCulled={false} renderOrder={4} visible={false}>
        <sphereGeometry args={[1, profile === 'mobile' ? 10 : 15, profile === 'mobile' ? 7 : 11]} />
        <meshPhysicalMaterial
          ref={sourceMaterialRef}
          color={PAINT_BLUE}
          roughness={0.25}
          clearcoat={0.76}
          clearcoatRoughness={0.14}
          specularIntensity={0.7}
          envMapIntensity={1}
          transparent
          depthWrite
        />
      </mesh>

      {!reducedMotion && (
        <PaintBubbles motion={motion} profile={profile} curve={curve} />
      )}
    </group>
  );
}
