import React, { useRef, useMemo, useEffect } from 'react';

import { useFrame, useLoader } from '@react-three/fiber';
import earthCloudsTextureUrl from '@textures/earth/8k_earth_clouds.jpg';
import earthDayTextureUrl from '@textures/earth/8k_earth_daymap.jpg';
import earthNightTextureUrl from '@textures/earth/8k_earth_nightmap.jpg';
import { TextureLoader, Mesh, ShaderMaterial } from 'three';

// Import shaders
import earthFragmentShader from '../shaders/earthFragment.glsl';
import earthVertexShader from '../shaders/earthVertex.glsl';
import { EarthState } from '../types/state.ts';

interface EarthProps {
  earthValues: EarthState;
  position: [number, number, number];
}

const Earth: React.FC<EarthProps> = ({ earthValues, position }) => {
  const { rotationSpeed, axialTilt, solarIrradiance, atmosphereTransparency } = earthValues;

  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  // Load textures using imported URLs
  const [earthDayTexture, earthNightTexture, earthCloudsTexture] = useLoader(TextureLoader, [
    earthDayTextureUrl,
    earthNightTextureUrl,
    earthCloudsTextureUrl,
  ]);

  // Define uniforms for shaders
  const uniforms = useMemo(
    () => ({
      earthDayTexture: { value: earthDayTexture },
      earthNightTexture: { value: earthNightTexture },
      earthCloudsTexture: { value: earthCloudsTexture },
      lightDirection: { value: [1.0, 0.0, 0.0] }, // Light from the sun
      cameraPosition: { value: [0, 0, 0] }, // 👈 **NEW: Camera position uniform**
      time: { value: 0 },
      solarIrradiance: { value: solarIrradiance },
      atmosphereTransparency: { value: atmosphereTransparency },
    }),
    [
      earthDayTexture,
      earthNightTexture,
      earthCloudsTexture,
      solarIrradiance,
      atmosphereTransparency,
    ]
  );

  // Update uniforms when props change
  useEffect(() => {
    if (materialRef.current) {
      uniforms.solarIrradiance.value = solarIrradiance;
      uniforms.atmosphereTransparency.value = atmosphereTransparency;
    }
  }, [solarIrradiance, atmosphereTransparency, uniforms]);

  // Frame-by-frame animation
  useFrame((state) => {
    if (materialRef.current) {
      uniforms.time.value = state.clock.elapsedTime;

      // ✅ Update camera position in the shader
      uniforms.cameraPosition.value = state.camera.position.toArray();
    }

    // Rotate Earth
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} rotation={[axialTilt * (Math.PI / 180), 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
};

export default Earth;
