import * as THREE from 'three';
import type { HeroViewportProfile } from './heroMotion';

export interface HeroSceneLayout {
  bucketStart: THREE.Vector3;
  bucketEnd: THREE.Vector3;
  bucketScale: number;
  bucketStartRotation: THREE.Euler;
  bucketEndRotation: THREE.Euler;
  paintCurve: THREE.CatmullRomCurve3;
  cameraCurve: THREE.CatmullRomCurve3;
  cameraFov: [number, number];
  housePosition: THREE.Vector3;
  houseWidth: number;
  houseLookAt: THREE.Vector3;
}

const makeCurve = (points: THREE.Vector3[], tension = 0.42) => {
  const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal', tension);
  curve.arcLengthDivisions = 240;
  return curve;
};

export function createHeroSceneLayout(profile: HeroViewportProfile): HeroSceneLayout {
  const mobile = profile === 'mobile';
  const tablet = profile === 'tablet';
  const bucketScale = mobile ? 0.50 : tablet ? 0.68 : 0.80;
  const bucketStart = new THREE.Vector3(
    mobile ? 0 : tablet ? 0.78 : 1.25,
    mobile ? -0.55 : tablet ? -0.14 : -0.22,
    mobile ? 0.0 : 0.15,
  );
  const bucketEnd = new THREE.Vector3(
    0,
    mobile ? -0.52 : -0.10,
    0.28,
  );
  const bucketStartRotation = new THREE.Euler(
    mobile ? -0.02 : -0.01,
    mobile ? -0.04 : -0.04,
    mobile ? 0.01 : 0.01,
  );
  const bucketEndRotation = new THREE.Euler(
    mobile ? 0.04 : 0.05,
    0,
    0,
  );

  // Connects directly to the bottom cascade of the central pouring paint
  const paintOrigin = new THREE.Vector3(0.12, -0.65, 0.22)
    .multiplyScalar(bucketScale)
    .applyEuler(bucketEndRotation)
    .add(bucketEnd);
  const xScale = mobile ? 0.58 : tablet ? 0.82 : 1;
  const housePosition = new THREE.Vector3(
    mobile ? 0.38 : tablet ? 0.12 : 0,
    mobile ? 0.08 : 0,
    -7.85,
  );

  // Fluid 3D curve connects the 5-buckets pour to the architectural house facade
  const paintCurve = makeCurve([
    paintOrigin,
    new THREE.Vector3(0.85 * xScale, mobile ? -0.7 : -0.15, 0.6),
    new THREE.Vector3(1.55 * xScale, mobile ? 0.2 : 0.95, 0.4),
    new THREE.Vector3(0.65 * xScale, mobile ? 0.9 : 1.85, -0.5),
    new THREE.Vector3(-1.35 * xScale, mobile ? 0.65 : 1.35, -1.0),
    new THREE.Vector3(-1.55 * xScale, mobile ? -0.15 : 0.05, -0.45),
    new THREE.Vector3(-0.55 * xScale, mobile ? -0.85 : -1.15, 0.65),
    new THREE.Vector3(1.05 * xScale, mobile ? -0.8 : -0.98, 1.35),
    new THREE.Vector3(1.45 * xScale, mobile ? -0.08 : 0.1, 2.85),
    new THREE.Vector3(-0.1, mobile ? 0.16 : 0.42, mobile ? 4.8 : 5.1),
    new THREE.Vector3(-0.48 * xScale, mobile ? 0.35 : 0.5, 2.2),
    new THREE.Vector3(0.42 * xScale, mobile ? 0.25 : 0.36, -1.1),
    new THREE.Vector3(-1.45 * xScale, mobile ? 0.05 : 0.1, -4.6),
    new THREE.Vector3(
      housePosition.x - (mobile ? 1.2 : tablet ? 2.15 : 3.05),
      housePosition.y + (mobile ? -0.18 : -0.05),
      housePosition.z + 0.18,
    ),
  ], 0.38);

  const cameraCurve = makeCurve([
    new THREE.Vector3(0, mobile ? 0.04 : 0.08, mobile ? 8.65 : 8.05),
    new THREE.Vector3(mobile ? 0.04 : 0.18, mobile ? 0.02 : 0.1, 7.15),
    new THREE.Vector3(mobile ? 0.1 : 0.32, mobile ? 0.1 : 0.2, 5.65),
    new THREE.Vector3(mobile ? -0.04 : -0.16, mobile ? 0.22 : 0.34, 4.25),
    new THREE.Vector3(mobile ? 0.08 : 0.06, mobile ? 0.24 : 0.28, mobile ? 3.25 : 2.72),
  ], 0.36);

  return {
    bucketStart,
    bucketEnd,
    bucketScale,
    bucketStartRotation,
    bucketEndRotation,
    paintCurve,
    cameraCurve,
    cameraFov: mobile ? [33, 36] : tablet ? [30, 34] : [29, 34],
    housePosition,
    houseWidth: mobile ? 11.8 : tablet ? 9.5 : 11.8,
    houseLookAt: new THREE.Vector3(mobile ? 0.35 : 0.05, mobile ? 0.12 : 0.08, housePosition.z),
  };
}
