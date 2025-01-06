import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import useCameraFocus from '@hooks/useCameraFocus';

interface CameraControllerProps {
  initialPosition?: [number, number, number];
  smoothFactor?: number;
  enableLookAt?: boolean;
  zoomSpeed?: number; // Speed for zoom adjustments
  zoomLimits?: [number, number]; // Min and max zoom (fov)
  rotationSpeed?: number; // Speed for rotation
  enableRotation?: boolean; // Toggle rotation functionality
}

const CameraController: React.FC<CameraControllerProps> = ({
  initialPosition = [0, 10, 20],
  smoothFactor = 0.1,
  enableLookAt = true,
  zoomSpeed = 0.2,
  zoomLimits = [15, 75], // Min and max fov
  rotationSpeed = 0.01,
  enableRotation = true,
}) => {
  const { focus } = useCameraFocus();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // Rotation parameters
  const spherical = useRef(new THREE.Spherical());
  const rotationAngle = useRef(0);

  // Pre-create vectors for performance optimization
  const targetVector = useRef(new THREE.Vector3());
  const positionVector = useRef(new THREE.Vector3());

  useFrame(() => {
    if (cameraRef.current) {
      const { target, distance } = focus;

      // Update the target vector
      targetVector.current.set(target[0], target[1], target[2]);

      if (enableRotation) {
        // Update the spherical coordinates for rotation
        rotationAngle.current += rotationSpeed;
        spherical.current.set(distance, Math.PI / 4, rotationAngle.current); // Adjust latitude/longitude here

        // Convert spherical to Cartesian coordinates
        positionVector.current.setFromSpherical(spherical.current).add(targetVector.current);
      } else {
        // Without rotation, directly set the position behind the target
        positionVector.current.set(target[0], target[1], target[2] + distance);
      }

      // Smoothly interpolate the camera's position
      cameraRef.current.position.lerp(positionVector.current, smoothFactor);

      // Optionally update the camera's lookAt target
      if (enableLookAt) {
        cameraRef.current.lookAt(targetVector.current);
      }
    }
  });

  // Handle zoom (e.g., mouse wheel input)
  const handleWheel = (event: WheelEvent) => {
    if (cameraRef.current) {
      // Adjust the camera's field of view (fov) based on scroll direction
      cameraRef.current.fov = THREE.MathUtils.clamp(
        cameraRef.current.fov + (event.deltaY > 0 ? zoomSpeed : -zoomSpeed),
        zoomLimits[0],
        zoomLimits[1]
      );
      cameraRef.current.updateProjectionMatrix();
    }
  };

  // Add event listener for zoom
  React.useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [zoomSpeed, zoomLimits]);

  return <PerspectiveCamera ref={cameraRef} makeDefault position={initialPosition} />;
};

export default CameraController;
