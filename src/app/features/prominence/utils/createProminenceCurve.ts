import * as THREE from 'three';

import { randomRange } from '@app/utils/mathUtils';

/**
 * Create a prominence curve for astrophysical accuracy.
 * @param scale - Scale of the curve.
 * @param spread - Spread of the curve.
 * @returns A THREE.CatmullRomCurve3 instance representing the prominence shape.
 */
export const createProminenceCurve = (scale: number, spread: number): THREE.CatmullRomCurve3 => {
  const points: THREE.Vector3[] = [];
  const arcSegments = 6; // Smooth curve with more segments
  const arcHeightFactor = scale * 0.5; // Adjust arc height based on scale
  const arcSpread = spread * 0.2; // Fine-tune spread for realistic behavior

  for (let i = 0; i <= arcSegments; i++) {
    const progress = i / arcSegments; // Progress along the arc (0 to 1)
    const angle = Math.PI * progress; // Arc from 0 to π
    const x = Math.sin(angle) * scale * 0.5; // Horizontal displacement
    const y = Math.cos(angle) * arcHeightFactor; // Vertical height
    const z = randomRange(-arcSpread / 2, arcSpread / 2); // Random depth

    points.push(new THREE.Vector3(x, y, z));
  }

  return new THREE.CatmullRomCurve3(points);
};
