import { useState } from 'react';

import { CameraFocus } from '@camera/types/camer-focus';

import { distance3D } from '@app/utils/mathUtils'; // Import the distance3D utility function

// Define constants to replace magic numbers
const DEFAULT_TARGET: [number, number, number] = [0, 0, 0];
const DEFAULT_DISTANCE = 20;
const DEFAULT_ZOOM_LEVEL = 1;
const MIN_ZOOM_LEVEL = 0.1;
const MAX_ZOOM_LEVEL = 10;
const INITIAL_ROTATION: [number, number] = [0, Math.PI / 4];

const useCameraFocus = () => {
  const [focus, setFocus] = useState<CameraFocus>({
    target: DEFAULT_TARGET,
    distance: DEFAULT_DISTANCE,
    zoomLevel: DEFAULT_ZOOM_LEVEL,
    rotation: INITIAL_ROTATION,
  });

  console.log('sdafsdf3 Current focus: ', { zoomLevel: focus.zoomLevel });

  const focusOnTarget = (target: [number, number, number], distance: number) => {
    // Calculate the distance between the current focus target and the new one
    const currentDistance = distance3D(
      focus.target[0],
      focus.target[1],
      focus.target[2],
      target[0],
      target[1],
      target[2]
    );

    console.log(`Current distance: ${currentDistance}`); // Debugging log
    setFocus((prev) => ({ ...prev, target, distance }));
  };

  const setZoom = (zoomLevel: number) => {
    // Ensure zoom stays within limits
    const clampedZoom = Math.max(MIN_ZOOM_LEVEL, Math.min(MAX_ZOOM_LEVEL, zoomLevel));

    setFocus((prev) => ({
      ...prev,
      zoomLevel: clampedZoom,
      distance: DEFAULT_DISTANCE / clampedZoom, // Reduce distance as zoom increases
    }));
  };

  const setRotation = (azimuthal: number, polar: number) => {
    setFocus((prev) => ({ ...prev, rotation: [azimuthal, polar] }));
  };

  const resetFocus = () => {
    setFocus({
      target: DEFAULT_TARGET,
      distance: DEFAULT_DISTANCE,
      zoomLevel: DEFAULT_ZOOM_LEVEL,
      rotation: INITIAL_ROTATION,
    });
  };

  return {
    focus,
    focusOnTarget,
    setZoom,
    setRotation,
    resetFocus,
  };
};

export default useCameraFocus;
