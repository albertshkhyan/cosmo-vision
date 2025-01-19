import React, { Suspense } from 'react';

import DistanceIndicator from '@components/ui/DistanceIndicator';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { CameraFocus } from '@features/camera';

import CameraHandler from '../../app/features/camera/components/CameraHandler.tsx';

interface Canvas3DProps {
  children: React.ReactNode;
  initialCameraPosition?: [number, number, number]; // Initial camera position
  showControls?: boolean;
  showCameraControlPanel?: boolean; // Toggle for Camera Control Panel visibility
  focus: {
    data: CameraFocus;
    focusOnTarget: (target: [number, number, number], distance: number) => void;
    setZoom: (zoomLevel: number) => void;
    setRotation: (azimuthal: number, polar: number) => void;
    resetFocus: () => void;
  };
}

/**
 * A reusable 3D Canvas component with integrated camera focus and controls.
 */
const Canvas3D: React.FC<Canvas3DProps> = ({
  children,
  initialCameraPosition,
  showControls = true,
  focus,
  // showCameraControlPanel,
}) => {
  return (
    <div className="relative w-full h-full bg-gray-900 dark:bg-brand-50">
      {/* Distance Indicator */}
      <DistanceIndicator distance={focus.data.distance} />

      <Canvas>
        <Suspense fallback={null}>
          {/* Camera Handler */}
          {}
          <CameraHandler initialCameraPosition={initialCameraPosition} focus={focus.data} />

          {/* Optional Orbit Controls */}
          {showControls && <OrbitControls enableRotate={false} enableZoom={false} />}

          {/* Default Lights */}
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={1.5} />

          {/* Render children components */}
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Canvas3D;
