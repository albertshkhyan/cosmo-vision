import * as THREE from 'three';

import { randomRange, mapRange } from '@app/utils/mathUtils.ts';

export const generateProminencePositions = (
  count: number,
  radius: number,
  offsetScale: number = 1.05,
  equatorialBias: number = 0.8
): { position: THREE.Vector3; rotation: THREE.Euler }[] => {
  const positions: { position: THREE.Vector3; rotation: THREE.Euler }[] = [];

  for (let i = 0; i < count; i++) {
    // Generate random azimuthal and polar angles
    const theta = randomRange(0, Math.PI * 2); // Azimuthal angle
    const phi = Math.acos(1 - mapRange(Math.random(), 0, 1, 0, equatorialBias)); // Polar angle with bias

    // Offset to position prominences above the Sun's surface
    const offset = radius * (offsetScale + randomRange(0, 0.1)); // Add slight variation
    const x = offset * Math.sin(phi) * Math.cos(theta);
    const y = offset * Math.sin(phi) * Math.sin(theta);
    const z = offset * Math.cos(phi);

    // Create position vector
    const position = new THREE.Vector3(x, y, z);

    // Align prominence arcs to the Sun's surface
    const normal = position.clone().normalize(); // Normal vector to Sun's surface
    const up = new THREE.Vector3(0, 0, 1); // Default upward direction
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, normal); // Align "up" to the normal
    const rotation = new THREE.Euler().setFromQuaternion(quaternion);

    positions.push({ position, rotation });
  }

  return positions;
};
