import { useState } from 'react';

interface CameraFocus {
  target: [number, number, number]; // The position to focus on
  distance: number; // Distance from the target
  zoomLevel: number; // Zoom level for finer control
  rotation: [number, number]; // Rotation around the target (azimuthal and polar angles)
}

const DEFAULT_FOCUS: CameraFocus = {
  target: [0, 0, 0], // Default focus (e.g., the Sun)
  distance: 20, // Default distance
  zoomLevel: 1, // Default zoom level
  rotation: [3.3, 0.0], // Default rotation (azimuthal and polar)
};

const useCameraFocus = () => {
  const [focus, setFocus] = useState<CameraFocus>(DEFAULT_FOCUS);

  // Focus on a specific target (e.g., a planet or the Sun)
  const focusOnTarget = (
    position: [number, number, number],
    distance: number = DEFAULT_FOCUS.distance,
    zoomLevel: number = DEFAULT_FOCUS.zoomLevel
  ) => {
    setFocus({
      target: position,
      distance,
      zoomLevel,
      rotation: focus.rotation, // Keep current rotation
    });
  };

  // Adjust the zoom level
  const setZoom = (zoomLevel: number) => {
    setFocus((prev) => ({
      ...prev,
      zoomLevel: Math.max(0.1, Math.min(zoomLevel, 3)), // Clamp between 0.1 and 3
    }));
  };

  // Adjust the rotation around the target
  const setRotation = (azimuthal: number, polar: number) => {
    setFocus((prev) => ({
      ...prev,
      rotation: [
        Math.max(-Math.PI, Math.min(azimuthal, Math.PI)), // Clamp azimuthal within -π to π
        Math.max(0, Math.min(polar, Math.PI)), // Clamp polar within 0 to π
      ],
    }));
  };

  // Reset to default focus
  const resetFocus = () => {
    setFocus(DEFAULT_FOCUS);
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
