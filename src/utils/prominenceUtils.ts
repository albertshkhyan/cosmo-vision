import * as THREE from 'three';

/**
 * Create an astrophysically accurate prominence curve.
 * @param size - The size or height of the prominence.
 * @returns A THREE.CatmullRomCurve3 instance representing the prominence shape.
 */
// export const createProminenceCurve = (size: number, spread: number): THREE.CatmullRomCurve3 => {
//   const points: THREE.Vector3[] = [];
//   const arcSegments = 64; // Higher number of segments for smoother curves
//   const turbulenceStrength = size * 0.03; // Reduced turbulence for slimmer curves
//   const horizontalScale = spread * 0.3; // Reduce horizontal displacement for a slimmer curve
//   const verticalScale = size; // Keep vertical scale for height
//
//   for (let i = 0; i <= arcSegments; i++) {
//     const progress = i / arcSegments; // Progress from 0 to 1 along the arc
//     const angle = Math.PI * progress; // Angle from 0 to π (half a loop)
//
//     // Base arc shape with reduced horizontal spread
//     const baseX = Math.sin(angle) * size * horizontalScale; // Slimmer horizontal displacement
//     const baseY = Math.cos(angle) * verticalScale; // Vertical height
//     const baseZ = 0; // Centered on z-axis initially
//
//     // Add gravitational asymmetry (slight downward pull)
//     const gravityFactor = Math.sin(angle) * -0.1; // Reduced downward pull
//     let y = baseY + gravityFactor * size * 0.1;
//
//     // Add magnetic turbulence (random noise with diminished strength at the edges)
//     const noiseX = (Math.random() - 0.5) * turbulenceStrength * (1 - progress);
//     const noiseY = (Math.random() - 0.5) * turbulenceStrength * (1 - progress);
//     const noiseZ = (Math.random() - 0.5) * turbulenceStrength;
//
//     // Final point with turbulence added
//     const x = baseX + noiseX;
//     y += noiseY; // Integrate noise into the y-component
//     const z = baseZ + noiseZ;
//
//     points.push(new THREE.Vector3(x, y, z));
//   }
//
//   return new THREE.CatmullRomCurve3(points, false); // `false` to avoid closed loop
// };

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
    const z = (Math.random() - 0.5) * arcSpread; // Slight randomness in depth

    points.push(new THREE.Vector3(x, y, z));
  }

  return new THREE.CatmullRomCurve3(points);
};

/**
 * Generate realistic prominence positions and align them with the Sun's surface.
 * @param count - Number of prominences to generate.
 * @param radius - Radius of the Sun.
 * @param offsetScale - Scale to offset prominences from the Sun's surface.
 * @param equatorialBias - Bias value to concentrate prominences towards the equatorial region.
 * @returns Array of positions and rotations for each prominence.
 */
export const generateProminencePositions = (
  count: number,
  radius: number,
  offsetScale: number = 1.05,
  equatorialBias: number = 0.8
): { position: THREE.Vector3; rotation: THREE.Euler }[] => {
  const positions: { position: THREE.Vector3; rotation: THREE.Euler }[] = [];

  for (let i = 0; i < count; i++) {
    // Generate random azimuthal and polar angles
    const theta = Math.random() * Math.PI * 2; // Azimuthal angle (0 to 2π)
    const phi = Math.acos(1 - Math.random() * equatorialBias); // Polar angle (biased towards the equator)

    // Offset to position prominences just above the Sun's surface
    const offset = radius * (offsetScale + Math.random() * 0.1); // Add a slight random variation
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
