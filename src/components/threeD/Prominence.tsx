import React, { useRef, useEffect } from 'react';

import { useFrame, useThree } from '@react-three/fiber';
import prominenceFragmentShader from '@shaders/sun/prominenceFragment.glsl';
import prominenceVertexShader from '@shaders/sun/prominenceVertex.glsl';
import { ProminenceState } from '@ui/configs/ProminenceControls.tsx';
import { createProminenceCurve } from '@utils/prominenceUtils';
import { ShaderMaterial, Mesh } from 'three';
import * as THREE from 'three';

interface ProminenceProps {
  prominenceValues: ProminenceState;
}
const Prominence: React.FC<ProminenceProps> = ({ prominenceValues }) => {
  const materialRef = useRef<ShaderMaterial>(null);
  const meshRef = useRef<Mesh>(null);
  const { size: canvasSize } = useThree();

  const {
    intensity,
    turbulence,
    colorR,
    colorG,
    colorB,
    scale,
    spread,
    falloff,
    distortionScale,
    turbulenceStrength,
    isVisible,
  } = prominenceValues;

  // Create the uniforms object once
  const uniforms = useRef({
    time: { value: 0 },
    intensity: { value: intensity },
    turbulence: { value: turbulence },
    color: { value: new THREE.Vector3(colorR, colorG, colorB) },
    scale: { value: scale },
    spread: { value: spread },
    falloff: { value: falloff },
    distortionScale: { value: distortionScale },
    turbulenceStrength: { value: turbulenceStrength },
    resolution: { value: new THREE.Vector2(canvasSize.width, canvasSize.height) },
  }).current;

  // Create the prominence curve dynamically using the utility
  const curve = React.useMemo(() => createProminenceCurve(scale, spread), [scale, spread]);

  // Animate the time uniform
  useFrame(({ clock }) => {
    uniforms.time.value = clock.getElapsedTime();
  });

  // Update uniforms when props change
  useEffect(() => {
    if (!materialRef.current) return;

    uniforms.intensity.value = intensity;
    uniforms.turbulence.value = turbulence;
    uniforms.color.value.set(colorR, colorG, colorB);
    uniforms.scale.value = scale;
    uniforms.spread.value = spread;
    uniforms.falloff.value = falloff;
    uniforms.distortionScale.value = distortionScale;
    uniforms.turbulenceStrength.value = turbulenceStrength;
    uniforms.resolution.value.set(canvasSize.width, canvasSize.height);
  }, [
    intensity,
    turbulence,
    colorR,
    colorG,
    colorB,
    scale,
    spread,
    falloff,
    distortionScale,
    turbulenceStrength,
    canvasSize,
  ]);

  // Render an empty group if not visible
  if (!isVisible) {
    return <group />;
  }

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 64, 0.1, 8, false]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={prominenceVertexShader}
        fragmentShader={prominenceFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

export default Prominence;
