import React, { useRef, useMemo, useEffect } from 'react';

import earthTextureUrl from '@assets/textures/earth/8k_earth_daymap.jpg';
import { useFrame, useLoader } from '@react-three/fiber';
import earthFragmentShader from '@shaders/earth/earthFragment.glsl';
import earthVertexShader from '@shaders/earth/earthVertex.glsl';
import { EarthState } from '@ui/configs/EarthControls.tsx';
import { TextureLoader, Mesh, ShaderMaterial } from 'three';

interface EarthProps {
  earthValues: EarthState; // Props containing Earth's configuration
  position: [number, number, number];
}

const Earth: React.FC<EarthProps> = ({ earthValues, position }) => {
  const { rotationSpeed, axialTilt, solarIrradiance, atmosphereTransparency } = earthValues;

  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  // Load Earth texture
  const [earthTexture] = useLoader(TextureLoader, [earthTextureUrl]);

  // Uniforms for shaders
  const uniforms = useMemo(
    () => ({
      earthTexture: { value: earthTexture },
      lightDirection: { value: [1.0, 0.0, 0.0] }, // Direction of the Sun's light
      time: { value: 0 },
      solarIrradiance: { value: solarIrradiance },
      atmosphereTransparency: { value: atmosphereTransparency },
    }),
    [earthTexture, solarIrradiance, atmosphereTransparency]
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
    }

    // Rotate Earth
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed; // Earth's rotation speed
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} rotation={[axialTilt * (Math.PI / 180), 0, 0]}>
        {/* Apply axial tilt */}
        <sphereGeometry args={[1, 64, 64]} />
        {/* Radius = 1 */}
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
