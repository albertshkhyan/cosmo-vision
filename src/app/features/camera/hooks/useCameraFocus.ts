import { useState } from 'react';

import { CameraFocus } from '@camera/types/camer-focus';

import { distance3D } from '@app/utils/mathUtils'; // Import the distance3D utility function

const useCameraFocus = () => {
  const [focus, setFocus] = useState<CameraFocus>({
    target: [0, 0, 0],
    distance: 20,
    zoomLevel: 1,
    rotation: [0, Math.PI / 4],
  });

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

    console.log(`Current distance: ${currentDistance}`); // Optional debugging log
    setFocus((prev) => ({ ...prev, target, distance }));
  };

  const setZoom = (zoomLevel: number) => {
    setFocus((prev) => ({ ...prev, zoomLevel }));
  };

  const setRotation = (azimuthal: number, polar: number) => {
    setFocus((prev) => ({ ...prev, rotation: [azimuthal, polar] }));
  };

  const resetFocus = () => {
    setFocus({
      target: [0, 0, 0],
      distance: 20,
      zoomLevel: 1,
      rotation: [0, Math.PI / 4],
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
