import React, { useRef } from 'react';

import useTextures from '@hooks/useTextures.ts';
import { useThree } from '@react-three/fiber';
import blueStarUrl from '@textures/stars/blue-star.png';
import redStarUrl from '@textures/stars/red-star.png';
import yellowStarUrl from '@textures/stars/yellow-star.png';
import { Points, Color } from 'three';
import * as THREE from 'three';

import { StarFieldState, useStarMotion, useStarGeometries } from '@features/starfield';

import flickerFragmentShader from '../starfield/flickerFragmentShader.glsl';
import flickerVertexShader from '../starfield/flickerVertexShader.glsl';

interface StarFieldProps {
  starFieldValues: StarFieldState;
}

const StarField: React.FC<StarFieldProps> = ({ starFieldValues }) => {
  const { starDensity, starColor, isVisible, motionSpeed } = starFieldValues;

  const redRef = useRef<Points>(null);
  const blueRef = useRef<Points>(null);
  const yellowRef = useRef<Points>(null);
  const { camera } = useThree();

  // Load star textures
  const [redStar, blueStar, yellowStar] = useTextures([redStarUrl, blueStarUrl, yellowStarUrl]);

  // Generate star geometries using the custom hooks
  const { redGeometry, blueGeometry, yellowGeometry } = useStarGeometries(
    starDensity,
    1000, // Explicit radius for starfield
    camera.position
  );

  // Apply motion to yellow stars using the custom hooks
  useStarMotion(yellowRef, motionSpeed);

  // Render nothing if not visible
  if (!isVisible) {
    return <group />;
  }

  /**
   * Helper to render static stars (red and blue).
   * Uses a standard points material.
   */
  const renderStaticStars = (
    ref: React.RefObject<Points>,
    geometry: THREE.BufferGeometry,
    texture: THREE.Texture,
    size: number,
    color?: Color
  ) => (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={size}
        sizeAttenuation
        map={texture}
        color={color || undefined}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        alphaTest={0.5}
      />
    </points>
  );

  /**
   * Helper to render flickering stars (red and blue).
   * Uses custom shaders for flickering.
   */
  const renderFlickeringStars = (
    ref: React.RefObject<Points>,
    geometry: THREE.BufferGeometry,
    texture: THREE.Texture,
    color: Color
  ) => (
    <points ref={ref} geometry={geometry}>
      <shaderMaterial
        vertexShader={flickerVertexShader}
        fragmentShader={flickerFragmentShader}
        uniforms={{
          time: { value: 0 },
          map: { value: texture },
          starColor: { value: color },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );

  return (
    <group>
      {/* Static Red Stars */}
      {renderStaticStars(redRef, redGeometry, redStar, 1.5)}

      {/* Static Blue Stars */}
      {renderStaticStars(blueRef, blueGeometry, blueStar, 1.5)}

      {/* Flickering Red Stars */}
      {renderFlickeringStars(redRef, redGeometry, redStar, new Color(1, 0, 0))}

      {/* Flickering Blue Stars */}
      {renderFlickeringStars(blueRef, blueGeometry, blueStar, new Color(0, 0, 1))}

      {/* Moving Yellow Stars */}
      <points ref={yellowRef} geometry={yellowGeometry}>
        <pointsMaterial
          size={2}
          sizeAttenuation
          map={yellowStar}
          color={new Color(...starColor)}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export default StarField;
