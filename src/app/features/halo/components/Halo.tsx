import React, { useRef, useEffect } from 'react';

import { useFrame } from '@react-three/fiber';
import { ShaderMaterial, Mesh } from 'three';
import * as THREE from 'three';

import haloFragmentShader from '../halo/haloFragment.glsl';
import haloVertexShader from '../halo/haloVertex.glsl';

interface HaloProps {
  radius?: number; // Radius of the halo
  color?: [number, number, number]; // RGB components of the glow color
  cameraDistance?: number; // Adjust light falloff scaling
  haloBrightness?: number; // Brightness of the halo
  edgeTransparencyFactor?: number; // Transparency for edges
  globalAlpha?: number; // Overall alpha
}

const Halo: React.FC<HaloProps> = ({
  radius = 8,
  color = [1, 0.8, 0.4],
  cameraDistance = 1,
  haloBrightness = 5,
  edgeTransparencyFactor = 1,
  globalAlpha = 1,
}) => {
  const materialRef = useRef<ShaderMaterial>(null);
  const meshRef = useRef<Mesh>(null);

  // Create the uniform object ONCE
  const uniforms = React.useMemo(() => {
    return {
      time: { value: 0 },
      cameraDistance: { value: cameraDistance },
      glowColorR: { value: color[0] },
      glowColorG: { value: color[1] },
      glowColorB: { value: color[2] },
      haloBrightness: { value: haloBrightness },
      edgeTransparencyFactor: { value: edgeTransparencyFactor },
      globalAlpha: { value: globalAlpha },
    };
  }, [cameraDistance, color, edgeTransparencyFactor, globalAlpha, haloBrightness]);

  // Each frame, animate the time uniform
  useFrame(({ clock }) => {
    if (materialRef.current) {
      uniforms.time.value = clock.getElapsedTime();
    }
  });

  // Update uniforms when prop change
  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.cameraDistance.value = cameraDistance;
    materialRef.current.uniforms.glowColorR.value = color[0];
    materialRef.current.uniforms.glowColorG.value = color[1];
    materialRef.current.uniforms.glowColorB.value = color[2];
    materialRef.current.uniforms.haloBrightness.value = haloBrightness;
    materialRef.current.uniforms.edgeTransparencyFactor.value = edgeTransparencyFactor;
    materialRef.current.uniforms.globalAlpha.value = globalAlpha;
  }, [cameraDistance, color, haloBrightness, edgeTransparencyFactor, globalAlpha]);

  // Update radius dynamically (affects geometry)
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(radius, radius, radius);
    }
  }, [radius]);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} /> {/* Base geometry with scale applied */}
      <shaderMaterial
        ref={materialRef}
        vertexShader={haloVertexShader}
        fragmentShader={haloFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

export default Halo;
