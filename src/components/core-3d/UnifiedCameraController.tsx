import React, { useRef, useEffect } from 'react';

import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraFocus {
  target: [number, number, number];
  distance: number;
  zoomLevel: number;
  rotation: [number, number];
}

interface UnifiedCameraControllerProps {
  focus: CameraFocus; // Camera focus, rotation, and zoom
  onCameraMove?: (position: [number, number, number]) => void; // Callback for camera movement
  initialCameraPosition?: [number, number, number]; // Initial camera position
}

const UnifiedCameraController: React.FC<UnifiedCameraControllerProps> = ({
  focus,
  onCameraMove,
  initialCameraPosition = [0, 0, 5],
}) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (cameraRef.current) {
      // Set the initial camera position
      cameraRef.current.position.set(...initialCameraPosition);
    }
  }, [initialCameraPosition]);

  useFrame(() => {
    if (cameraRef.current) {
      const { target, distance, zoomLevel, rotation } = focus;

      // Calculate the desired camera position
      const desiredPosition = new THREE.Vector3(
        target[0] + distance * Math.sin(rotation[0]) * Math.cos(rotation[1]),
        target[1] + distance * Math.sin(rotation[1]),
        target[2] + distance * Math.cos(rotation[0]) * Math.cos(rotation[1])
      );

      // Smoothly interpolate the camera position
      cameraRef.current.position.lerp(desiredPosition, 0.1);

      // Update the camera's lookAt target
      cameraRef.current.lookAt(new THREE.Vector3(...target));

      // Adjust zoom (field of view)
      cameraRef.current.zoom = zoomLevel;
      cameraRef.current.updateProjectionMatrix();

      // Invoke the callback to report the camera position
      if (onCameraMove) {
        const { x, y, z } = cameraRef.current.position;
        onCameraMove([x, y, z]);
      }
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault />;
};

export default UnifiedCameraController;
