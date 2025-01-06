import React, { useRef, useEffect } from 'react';

import sunTextureUrl from '@assets/textures/sun/8k_sun_surface.jpg';
import { useFrame, useLoader } from '@react-three/fiber';
import sunFragmentShader from '@shaders/sun/sunFragment.glsl';
import sunVertexShader from '@shaders/sun/sunVertex.glsl';
import { HaloState } from '@ui/configs/HaloControls.tsx';
import { SunState } from '@ui/configs/SunControls';
import { Mesh, ShaderMaterial, TextureLoader } from 'three';

import Halo from './Halo';

interface SunProps {
  haloValues: HaloState; // Props for the halo configuration
  sunValues: SunState; // Props for the sun configuration
}

const Sun: React.FC<SunProps> = ({ haloValues, sunValues }) => {
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
    radius,
    cameraDistance,
    colorR,
    colorG,
    colorB,
    haloBrightness,
    edgeTransparencyFactor,
    globalAlpha,
  } = haloValues;

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

  return (
    <group>
      {/* Core Sun */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={sunVertexShader}
          fragmentShader={sunFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Halo */}
      <Halo
        radius={radius}
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
