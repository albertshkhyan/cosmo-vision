import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface CameraFocus {
  target: [number, number, number];
  distance: number;
  zoomLevel: number;
  rotation: [number, number];
}

interface CameraHandlerProps {
  focus: CameraFocus;
  initialCameraPosition?: [number, number, number]; // Initial camera position
}

/**
 * A component to handle camera controls (focus, zoom, and rotation) inside the Canvas.
 */
const CameraHandler: React.FC<CameraHandlerProps> = ({ focus, initialCameraPosition }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (cameraRef.current) {
      const { target, distance, zoomLevel, rotation } = focus;

      // Calculate the camera position based on target, distance, and rotation
      const position = new THREE.Vector3(
        target[0] + distance * Math.sin(rotation[0]) * Math.cos(rotation[1]),
        target[1] + distance * Math.sin(rotation[1]),
        target[2] + distance * Math.cos(rotation[0]) * Math.cos(rotation[1])
      );

      // Smoothly interpolate the camera position
      cameraRef.current.position.lerp(position, 0.1);

      // Update the camera's lookAt target
      cameraRef.current.lookAt(new THREE.Vector3(...target));

      // Adjust zoom (field of view)
      cameraRef.current.zoom = zoomLevel;
      cameraRef.current.updateProjectionMatrix();
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={initialCameraPosition} />;
};

export default CameraHandler;
