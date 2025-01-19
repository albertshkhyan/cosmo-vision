import * as THREE from 'three';

import { randomRange } from '@app/utils/mathUtils';

/**
 * Generate star positions using Perlin noise for clustering and randomness for distribution.
 * @param count - Total number of stars to generate.
 * @param radius - The radius within which stars are distributed.
 * @param cameraPosition - The position of the camera for centering the starfield.
 * @returns Array of star positions as THREE.Vector3.
 */
export const generateStarPositions = (
  count: number,
  radius: number,
  cameraPosition: THREE.Vector3
): THREE.Vector3[] => {
  const starPositions: THREE.Vector3[] = [];

  for (let i = 0; i < count; i++) {
    // Generate Perlin-like clustered coordinates
    const theta = randomRange(0, Math.PI * 2); // Azimuthal angle
    const phi = Math.acos(randomRange(-1, 1)); // Polar angle

    // Add Perlin-like noise for clustering effect
    const noiseFactor = randomRange(0.5, 1); // Random noise for clustering
    const distance = Math.pow(Math.random(), 0.5) * radius * noiseFactor; // Bias closer distances

    // Convert spherical coordinates to Cartesian
    const x = distance * Math.sin(phi) * Math.cos(theta);
    const y = distance * Math.sin(phi) * Math.sin(theta);
    const z = distance * Math.cos(phi);

    // Offset position to center starfield around the camera
    const position = new THREE.Vector3(x, y, z).add(cameraPosition);

    starPositions.push(position);
  }

  return starPositions;
};

/**
 * Create a BufferGeometry for stars based on their positions.
 * @param positions - Array of star positions as THREE.Vector3.
 * @returns A BufferGeometry with the star positions.
 */
export function createStarGeometry(positions: THREE.Vector3[]): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(positions.length * 3);

  positions.forEach((pos, i) => {
    positionArray[i * 3] = pos.x;
    positionArray[i * 3 + 1] = pos.y;
    positionArray[i * 3 + 2] = pos.z;
  });

  geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
  return geometry;
}
