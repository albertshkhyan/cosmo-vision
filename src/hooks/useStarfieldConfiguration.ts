import { useState } from 'react';

import { StarFieldState } from '@ui/configs/StarfieldControlPanel.tsx';

const defaultStarFieldConfiguration: StarFieldState = {
  starDensity: 5000, // Default star density
  starColor: [1.0, 1.0, 1.0], // Default white star color
  isVisible: true, // Default visibility
  motionSpeed: 0.5, // Default motion speed
};

/**
 * Hook to manage the state of starfield configuration.
 */
const useStarFieldConfiguration = () => {
  const [starFieldConfiguration, setStarFieldConfiguration] = useState<StarFieldState>(
    defaultStarFieldConfiguration
  );

  /**
   * Reset the starfield configuration to its default values.
   */
  const resetStarFieldConfiguration = () => {
    setStarFieldConfiguration(defaultStarFieldConfiguration);
  };

  /**
   * Toggle the visibility of the starfield.
   */
  const toggleVisibility = () => {
    setStarFieldConfiguration((prevState) => ({
      ...prevState,
      isVisible: !prevState.isVisible,
    }));
  };

  return {
    starFieldConfiguration,
    setStarFieldConfiguration,
    resetStarFieldConfiguration,
    toggleVisibility,
  };
};

export default useStarFieldConfiguration;
