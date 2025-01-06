import React, { useRef } from 'react';

import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraTrackerProps {
  onCameraMove?: (position: [number, number, number]) => void;
}

const CameraTracker: React.FC<CameraTrackerProps> = ({ onCameraMove }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // Track camera position and invoke the callback
  useFrame(() => {
    if (cameraRef.current && onCameraMove) {
      const { x, y, z } = cameraRef.current.position;
      onCameraMove([x, y, z]);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 5]} // Default position
    />
  );
};

export default CameraTracker;
