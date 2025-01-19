import { useState } from 'react';

import { EarthState } from '../types/state.ts';

// Default configuration for Earth
const defaultEarthConfiguration: EarthState = {
  rotationSpeed: 0.01, // Default rotation speed (Earth's rotation around its axis in radians per frame)
  axialTilt: 23.5, // Earth's axial tilt in degrees (astronomical standard)
  solarIrradiance: 1361, // Solar constant in W/m² (average solar energy received at Earth's atmosphere)
  atmosphereTransparency: 1.0, // Full transparency by default (no dimming effects from atmosphere)
};

/**
 * Hook to manage the state of Earth configuration.
 */
const useEarthConfiguration = () => {
  const [earthConfiguration, setEarthConfiguration] =
    useState<EarthState>(defaultEarthConfiguration);

  /**
   * Reset the Earth configuration to its default values.
   */
  const resetEarthConfiguration = () => {
    setEarthConfiguration(defaultEarthConfiguration);
  };

  return {
    earthConfiguration,
    setEarthConfiguration,
    resetEarthConfiguration,
  };
};

export default useEarthConfiguration;
