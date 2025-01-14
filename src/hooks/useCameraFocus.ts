import { useState } from 'react';

export interface CameraFocus {
  target: [number, number, number];
  distance: number;
  zoomLevel: number;
  rotation: [number, number];
}

const useCameraFocus = () => {
  const [focus, setFocus] = useState<CameraFocus>({
    target: [0, 0, 0],
    distance: 20,
    zoomLevel: 1,
    rotation: [0, Math.PI / 4],
  });

  const focusOnTarget = (target: [number, number, number], distance: number) => {
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
