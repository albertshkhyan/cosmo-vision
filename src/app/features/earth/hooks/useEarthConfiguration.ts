import { useControls } from 'leva';

import { EarthState } from '../types/state.ts';

// Define constants to replace magic numbers
const DEFAULT_ROTATION_SPEED = 0.0001; // Lower value to slow down rotation
const MIN_ROTATION_SPEED = 0.00001;
const MAX_ROTATION_SPEED = 0.001;
const ROTATION_SPEED_STEP = 0.00001;

const DEFAULT_AXIAL_TILT = 23.5;
const MIN_AXIAL_TILT = 0;
const MAX_AXIAL_TILT = 0; //90 default
const AXIAL_TILT_STEP = 0.1;

const DEFAULT_SOLAR_IRRADIANCE = 1361; // W/m²
const MIN_SOLAR_IRRADIANCE = 1000;
const MAX_SOLAR_IRRADIANCE = 2000;
const SOLAR_IRRADIANCE_STEP = 10;

const DEFAULT_ATMOSPHERE_TRANSPARENCY = 1.0;
const MIN_ATMOSPHERE_TRANSPARENCY = 0;
const MAX_ATMOSPHERE_TRANSPARENCY = 1;
const ATMOSPHERE_TRANSPARENCY_STEP = 0.01;

// Default configuration for Earth
const defaultEarthConfiguration: EarthState = {
  rotationSpeed: DEFAULT_ROTATION_SPEED,
  axialTilt: DEFAULT_AXIAL_TILT,
  solarIrradiance: DEFAULT_SOLAR_IRRADIANCE,
  atmosphereTransparency: DEFAULT_ATMOSPHERE_TRANSPARENCY,
};

/**
 * Hook to manage the state of Earth configuration using Leva UI controls.
 */
const useEarthConfiguration = () => {
  // Leva UI panel for live configuration
  const earthConfiguration = useControls('Earth Settings', {
    rotationSpeed: {
      value: DEFAULT_ROTATION_SPEED,
      min: MIN_ROTATION_SPEED,
      max: MAX_ROTATION_SPEED,
      step: ROTATION_SPEED_STEP,
      label: 'Rotation Speed',
    },
    axialTilt: {
      value: DEFAULT_AXIAL_TILT,
      min: MIN_AXIAL_TILT,
      max: MAX_AXIAL_TILT,
      step: AXIAL_TILT_STEP,
      label: 'Axial Tilt',
    },
    solarIrradiance: {
      value: DEFAULT_SOLAR_IRRADIANCE,
      min: MIN_SOLAR_IRRADIANCE,
      max: MAX_SOLAR_IRRADIANCE,
      step: SOLAR_IRRADIANCE_STEP,
      label: 'Solar Irradiance (W/m²)',
    },
    atmosphereTransparency: {
      value: DEFAULT_ATMOSPHERE_TRANSPARENCY,
      min: MIN_ATMOSPHERE_TRANSPARENCY,
      max: MAX_ATMOSPHERE_TRANSPARENCY,
      step: ATMOSPHERE_TRANSPARENCY_STEP,
      label: 'Atmosphere Transparency',
    },
  });

  /**
   * Reset the Earth configuration to its default values.
   */
  const resetEarthConfiguration = () => {
    Object.keys(defaultEarthConfiguration).forEach((key) => {
      (earthConfiguration as Record<string, number>)[key] =
        defaultEarthConfiguration[key as keyof EarthState];
    });
  };

  return {
    earthConfiguration,
    resetEarthConfiguration,
  };
};

export default useEarthConfiguration;
