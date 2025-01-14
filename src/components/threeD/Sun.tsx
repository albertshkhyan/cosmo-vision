import React, { useRef, useEffect, useMemo } from 'react';

import sunTextureUrl from '@assets/textures/sun/8k_sun_surface.jpg';
import { useFrame, useLoader } from '@react-three/fiber';
import sunFragmentShader from '@shaders/sun/sunFragment.glsl';
import sunVertexShader from '@shaders/sun/sunVertex.glsl';
import Prominence from '@threeD/Prominence.tsx';
import { HaloState } from '@ui/configs/HaloControls.tsx';
import { ProminenceState } from '@ui/configs/ProminenceControls.tsx';
import { SunState } from '@ui/configs/SunControls';
import { generateProminencePositions } from '@utils/prominenceUtils.ts';
import { Mesh, ShaderMaterial, TextureLoader } from 'three';

import Halo from './Halo';

interface SunProps {
  haloValues: HaloState; // Props for the halo configuration
  sunValues: SunState; // Props for the sun configuration
  prominenceValues: ProminenceState;
  position: [number, number, number];
}

const Sun: React.FC<SunProps> = ({ haloValues, sunValues, prominenceValues, position }) => {
  const {
    polarSpeedFactor,
    granulationIntensity,
    surfaceIntensity,
    plasmaFlowSpeed,
    coronaGlowStrength,
    flareIntensity,
    radiantRayStrength,
  } = sunValues;

  const {
    radius: haloRadius,
    cameraDistance,
    colorR,
    colorG,
    colorB,
    haloBrightness,
    edgeTransparencyFactor,
    globalAlpha,
  } = haloValues;

  const sunRadius = 2; // Core Sun radius (from sphereGeometry args)

  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  // Load texture
  const [sunTexture] = useLoader(TextureLoader, [sunTextureUrl]);

  // Create the uniforms object ONCE
  const uniforms = React.useMemo(() => {
    return {
      time: { value: 0 },
      sunTexture: { value: sunTexture },
      polarSpeedFactor: { value: polarSpeedFactor },
      granulationIntensity: { value: granulationIntensity },
      surfaceIntensity: { value: surfaceIntensity },
      plasmaFlowSpeed: { value: plasmaFlowSpeed },
      coronaGlowStrength: { value: coronaGlowStrength },
      flareIntensity: { value: flareIntensity },
      radiantRayStrength: { value: radiantRayStrength },
    };
  }, [sunTexture]);

  // Each frame, animate time
  useFrame((state) => {
    if (materialRef.current) {
      uniforms.time.value = state.clock.elapsedTime;
    }
  });

  // Whenever your numeric props change, update the existing uniform values.
  useEffect(() => {
    if (!materialRef.current) return;
    uniforms.polarSpeedFactor.value = polarSpeedFactor;
    uniforms.granulationIntensity.value = granulationIntensity;
    uniforms.surfaceIntensity.value = surfaceIntensity;
    uniforms.plasmaFlowSpeed.value = plasmaFlowSpeed;
    uniforms.coronaGlowStrength.value = coronaGlowStrength;
    uniforms.flareIntensity.value = flareIntensity;
    uniforms.radiantRayStrength.value = radiantRayStrength;
  }, [
    polarSpeedFactor,
    granulationIntensity,
    surfaceIntensity,
    plasmaFlowSpeed,
    coronaGlowStrength,
    flareIntensity,
    radiantRayStrength,
    uniforms,
  ]);

  // Prominence generation parameters
  const prominenceParams = {
    count: 5, // Number of prominences
    radius: sunRadius, // Core Sun radius
    offsetScale: 1.05, // Scale to offset prominences above the Sun's surface
    equatorialBias: 0.8, // Bias prominences towards the equator
  };

  // Generate dynamic positions for the prominences
  const prominencePositions = useMemo(
    () =>
      generateProminencePositions(
        prominenceParams.count,
        prominenceParams.radius,
        prominenceParams.offsetScale,
        prominenceParams.equatorialBias
      ),
    [prominenceParams]
  );

  return (
    <group position={position}>
      {/* Core Sun */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[sunRadius, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={sunVertexShader}
          fragmentShader={sunFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Prominences */}
      {prominencePositions.map(({ position, rotation }, index) => (
        <group key={index} position={position} rotation={rotation}>
          <Prominence prominenceValues={prominenceValues} />
        </group>
      ))}

      {/* Halo */}
      <Halo
        radius={haloRadius}
        cameraDistance={cameraDistance}
        color={[colorR, colorG, colorB]}
        haloBrightness={haloBrightness}
        edgeTransparencyFactor={edgeTransparencyFactor}
        globalAlpha={globalAlpha}
      />
    </group>
  );
};

export default Sun;
