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
  const bucketScale = mobile ? 0.36 : tablet ? 0.52 : 0.60;
  const bucketStart = new THREE.Vector3(
    mobile ? 0 : tablet ? 0.35 : 0.85,
    mobile ? -2.08 : -0.12,
    0,
  );
  const bucketEnd = new THREE.Vector3(
    mobile ? -0.05 : tablet ? 0.15 : 0.32,
    mobile ? -1.72 : tablet ? 0.03 : 0.12,
    0.06,
  );
  const bucketStartRotation = new THREE.Euler(-0.025, -0.08, 0.012);
  const bucketEndRotation = new THREE.Euler(
    mobile ? 0.02 : 0.04,
    mobile ? -0.035 : -0.015,
    mobile ? -0.2 : -0.24,
  );

  // The first curve point is the bucket image's right-hand lip transformed by
  // the exact final bucket pose, keeping the pour welded to the opening.
  const paintOrigin = new THREE.Vector3(0.32, 0.62, 0.31)
    .multiplyScalar(bucketScale)
    .applyEuler(bucketEndRotation)
    .add(bucketEnd);
  const xScale = mobile ? 0.58 : tablet ? 0.82 : 1;
  const housePosition = new THREE.Vector3(
    mobile ? 0.38 : tablet ? 0.12 : 0,
    mobile ? 0.08 : 0,
    -7.85,
  );

  // One physical path carries the story. The first half draws a broad S in
  // three dimensions (including a true behind-bucket pass), then the same
  // stroke approaches the lens and lands on the first house wall.
  const paintCurve = makeCurve([
    paintOrigin,
    new THREE.Vector3(1.24 * xScale, mobile ? -0.48 : 0.38, 0.5),
    new THREE.Vector3(1.7 * xScale, mobile ? 0.34 : 1.34, 0.24),
    new THREE.Vector3(0.48 * xScale, mobile ? 1.05 : 2.08, -0.72),
    new THREE.Vector3(-1.56 * xScale, mobile ? 0.72 : 1.5, -1.18),
    new THREE.Vector3(-1.68 * xScale, mobile ? -0.18 : 0.02, -0.5),
    new THREE.Vector3(-0.62 * xScale, mobile ? -0.94 : -1.3, 0.7),
    new THREE.Vector3(1.16 * xScale, mobile ? -0.9 : -1.12, 1.46),
    new THREE.Vector3(1.58 * xScale, mobile ? -0.1 : 0.08, 3.12),
    new THREE.Vector3(-0.12, mobile ? 0.18 : 0.46, mobile ? 5.0 : 5.35),
    new THREE.Vector3(-0.52 * xScale, mobile ? 0.38 : 0.55, 2.35),
    new THREE.Vector3(0.48 * xScale, mobile ? 0.28 : 0.4, -1.2),
    new THREE.Vector3(-1.55 * xScale, mobile ? 0.04 : 0.12, -4.85),
    new THREE.Vector3(
      housePosition.x - (mobile ? 1.2 : tablet ? 2.15 : 3.05),
      housePosition.y + (mobile ? -0.18 : -0.05),
      housePosition.z + 0.18,
    ),
  ], 0.38);

  const cameraCurve = makeCurve([
    new THREE.Vector3(0, mobile ? 0 : 0.08, mobile ? 8.45 : 8.05),
    new THREE.Vector3(mobile ? 0.04 : 0.2, mobile ? 0 : 0.12, 7.05),
    new THREE.Vector3(mobile ? 0.12 : 0.38, mobile ? 0.1 : 0.24, 5.55),
    new THREE.Vector3(mobile ? -0.05 : -0.2, mobile ? 0.22 : 0.38, 4.15),
    new THREE.Vector3(mobile ? 0.1 : 0.08, mobile ? 0.24 : 0.3, mobile ? 3.15 : 2.72),
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
