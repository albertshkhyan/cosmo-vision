import React from 'react';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { createStarGeometry, generateStarPositions } from '../utils/generateStarPositions.ts';

export const useStarGeometries = (
  starDensity: number,
  radius: number,
  cameraPosition: THREE.Vector3
) => {
  // Generate positions for red, blue, and yellow stars
  const redPositions = generateStarPositions(starDensity, radius, cameraPosition);
  const bluePositions = generateStarPositions(starDensity, radius, cameraPosition);
  const yellowPositions = generateStarPositions(starDensity / 2, radius, cameraPosition);

  // Return BufferGeometry objects
  return {
    redGeometry: createStarGeometry(redPositions),
    blueGeometry: createStarGeometry(bluePositions),
    yellowGeometry: createStarGeometry(yellowPositions),
  };
};

export const useStarMotion = (yellowRef: React.RefObject<THREE.Points>, motionSpeed: number) => {
  useFrame(() => {
    if (!yellowRef.current) return;

    const positionAttribute = yellowRef.current.geometry.getAttribute('position');
    const array = positionAttribute.array as Float32Array;

    for (let i = 0; i < array.length; i += 3) {
      array[i + 2] += motionSpeed; // Move stars along the Z-axis
      if (array[i + 2] > 1000) array[i + 2] = -1000; // Reset stars when they move past the camera
    }

    positionAttribute.needsUpdate = true;
  });
};
