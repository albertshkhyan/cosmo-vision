import React from 'react';

import Canvas3D from '@core3d/Canvas3D';
import useLocalStorageState from '@hooks/useLocalStorageState';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { CameraControlPanel, useCameraFocus } from '@features/camera';
import { Earth, EarthState } from '@features/earth';
import { HaloState } from '@features/halo';
import { ProminenceState } from '@features/prominence';
import { Sun, SunState } from '@features/sun';

import { StarField, StarFieldState } from '../features/starfield';

interface SolarSystemSceneProps {
  sunValues: SunState;
  haloValues: HaloState; // Include halo configuration in props
  prominenceValues: ProminenceState; // Include prominence configuration in props
  starFieldValues: StarFieldState; // Include starfield configuration in props
  earthValues: EarthState; // Include Earth configuration in props
}

const SolarSystemScene: React.FC<SolarSystemSceneProps> = ({
  sunValues,
  haloValues,
  prominenceValues,
  starFieldValues,
  earthValues,
}) => {
  const [isCameraPanelVisible, setCameraPanelVisible] = useLocalStorageState(
    'cameraControlPanelVisible',
    true
  );

  const { focus, focusOnTarget, setZoom, setRotation, resetFocus } = useCameraFocus();

  console.log('dsafsdfsd focus.target: ', focus.target);
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Canvas3D
        focus={{
          data: focus,
          focusOnTarget,
          setZoom,
          setRotation,
          resetFocus,
        }}
        initialCameraPosition={[0, 10, 20]}
        showControls
      >
        {/* The Sun */}
        <Sun
          position={[0, 0, 0]}
          haloValues={haloValues}
          sunValues={sunValues}
          prominenceValues={prominenceValues}
        />
        {/*StarField */}
        <StarField starFieldValues={starFieldValues} />
        {/* Earth */}
        <Earth position={[10, 0, 0]} earthValues={earthValues} />
        {/* Planets */}
        {/* Uncomment and add planets as needed */}
        {/* <Earth distanceFromSun={8} orbitalSpeed={0.01} showOrbit={showOrbits} /> */}
        {/* <Mars distanceFromSun={12} orbitalSpeed={0.008} showOrbit={showOrbits} /> */}

        {/* Camera Control Panel */}
        {/* Toggle Button for Camera Control Panel */}
      </Canvas3D>

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
      <CameraControlPanel
        onFocusChange={(target, distance) => {
          return focusOnTarget(target, distance);
        }}
        onZoomChange={(zoom) => setZoom(zoom)}
        onRotationChange={(azimuthal, polar) => setRotation(azimuthal, polar)}
        zoomLevel={focus.zoomLevel}
        rotation={focus.rotation}
        onReset={() => resetFocus()}
        isVisible={isCameraPanelVisible}
      />
    </div>
  );
};

export default SolarSystemScene;
