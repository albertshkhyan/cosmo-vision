import React, { Suspense } from 'react';

import DistanceIndicator from '@components/ui/DistanceIndicator';
import CameraHandler from '@core3d/CameraHandler.tsx';
import useCameraFocus from '@hooks/useCameraFocus';
import useLocalStorageState from '@hooks/useLocalStorageState.ts';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import CameraControlPanel from '@ui/CameraControlPanel';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Canvas3DProps {
  children: React.ReactNode;
  initialCameraPosition?: [number, number, number]; // Initial camera position
  showControls?: boolean;
  showCameraControlPanel?: boolean; // Toggle for Camera Control Panel visibility
}

/**
 * A reusable 3D Canvas component with integrated camera focus and controls.
 */
const Canvas3D: React.FC<Canvas3DProps> = ({
  children,
  initialCameraPosition,
  showControls = true,
  // showCameraControlPanel,
}) => {
  const [isCameraPanelVisible, setCameraPanelVisible] = useLocalStorageState(
    'cameraControlPanelVisible',
    true
  );

  const { focus, focusOnTarget, setZoom, setRotation, resetFocus } = useCameraFocus();

  return (
    <div className="relative w-full h-full bg-gray-900 dark:bg-brand-50">
      {/* Distance Indicator */}
      <DistanceIndicator distance={focus.distance} />

      {/* Camera Control Panel */}
      <CameraControlPanel
        onFocusChange={(target, distance) => focusOnTarget(target, distance)}
        onZoomChange={(zoom) => setZoom(zoom)}
        onRotationChange={(azimuthal, polar) => setRotation(azimuthal, polar)}
        zoomLevel={focus.zoomLevel}
        rotation={focus.rotation}
        onReset={() => resetFocus()}
        isVisible={isCameraPanelVisible}
      />

      {/* Toggle Button for Camera Control Panel */}
      <button
        className="absolute top-4 right-4 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 z-overlay"
        onClick={() => setCameraPanelVisible((prev) => !prev)}
      >
        {isCameraPanelVisible ? (
          <>
            <FaChevronDown size={16} />
            <span>Hide Controls</span>
          </>
        ) : (
          <>
            <FaChevronUp size={16} />
            <span>Show Controls</span>
          </>
        )}
      </button>

      <Canvas>
        <Suspense fallback={null}>
          {/* Camera Handler */}
          {}
          <CameraHandler initialCameraPosition={initialCameraPosition} focus={focus} />

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
