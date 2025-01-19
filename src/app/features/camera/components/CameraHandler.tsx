import { FC, useRef } from 'react';

import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { clamp, lerp } from '@app/utils/mathUtils.ts'; // Import utilities

import { CameraFocus } from '@features/camera';

interface CameraHandlerProps {
  focus: CameraFocus;
  initialCameraPosition?: [number, number, number]; // Initial camera position
}

/**
 * A component to handle camera controls (focus, zoom, and rotation) inside the Canvas.
 */
const CameraHandler: FC<CameraHandlerProps> = ({ focus, initialCameraPosition }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (cameraRef.current) {
      const { target, distance, zoomLevel, rotation } = focus;

      // Clamp the distance and zoomLevel for safety
      const clampedDistance = clamp(distance, 1, 50); // Prevent too close or too far distances
      const clampedZoom = clamp(zoomLevel, 0.1, 3); // Restrict zoom to a valid range

      // Calculate the camera position based on target, distance, and rotation
      const position = new THREE.Vector3(
        target[0] + clampedDistance * Math.sin(rotation[0]) * Math.cos(rotation[1]),
        target[1] + clampedDistance * Math.sin(rotation[1]),
        target[2] + clampedDistance * Math.cos(rotation[0]) * Math.cos(rotation[1])
      );

      // Smoothly interpolate the camera position using lerp utility
      const interpolatedX = lerp(cameraRef.current.position.x, position.x, 0.1);
      const interpolatedY = lerp(cameraRef.current.position.y, position.y, 0.1);
      const interpolatedZ = lerp(cameraRef.current.position.z, position.z, 0.1);

      cameraRef.current.position.set(interpolatedX, interpolatedY, interpolatedZ);

      // Update the camera's lookAt target
      cameraRef.current.lookAt(new THREE.Vector3(...target));

      // Adjust zoom (field of view) with the clamped value
      cameraRef.current.zoom = clampedZoom;
      cameraRef.current.updateProjectionMatrix();
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={initialCameraPosition} />;
};

export default CameraHandler;
