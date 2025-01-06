import { useState } from 'react';

import { ProminenceState } from '@ui/configs/ProminenceControls.tsx';

const defaultProminenceConfiguration: ProminenceState = {
  intensity: 1.5, // Default intensity
  turbulence: 0.8, // Default turbulence
  colorR: 1.0, // Default red
  colorG: 0.5, // Default green
  colorB: 0.1, // Default blue
  scale: 1.0, // Default scale
  spread: 0.6, // Default spread
  falloff: 2.5, // Default falloff
  distortionScale: 1.0, // Default distortion scale
  turbulenceStrength: 1.2, // Default turbulence strength
  isVisible: true, // Default isVisible to true
};

/**
 * Hook to manage the state of prominence configuration.
 */
const useProminenceConfiguration = () => {
  const [prominenceConfiguration, setProminenceConfiguration] = useState<ProminenceState>(
    defaultProminenceConfiguration
  );

  /**
   * Reset the prominence configuration to its default values.
   */
  const resetProminenceConfiguration = () => {
    setProminenceConfiguration(defaultProminenceConfiguration);
  };

  /**
   * Toggle the visibility of the prominence.
   */
  const toggleVisibility = () => {
    setProminenceConfiguration((prevState) => ({
      ...prevState,
      isVisible: !prevState.isVisible,
    }));
  };

  return {
    prominenceConfiguration,
    setProminenceConfiguration,
    resetProminenceConfiguration,
    toggleVisibility,
  };
};

export default useProminenceConfiguration;
