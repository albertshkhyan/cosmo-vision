import { useState } from 'react';

import { SunState } from '@ui/configs/SunControls';

const defaultSunConfiguration: SunState = {
  polarSpeedFactor: 0.8,
  granulationIntensity: 0.2,
  surfaceIntensity: 1.0,
  plasmaFlowSpeed: 0.3,
  coronaGlowStrength: 888.0,
  flareIntensity: 0.3,
  radiantRayStrength: 0.3,
  alphaTransparency: 1.0,
};

const useSunConfigurationState = () => {
  const [sunConfiguration, setSunConfiguration] = useState<SunState>(defaultSunConfiguration);

  // Reset function to revert to default configuration
  const resetToDefault = () => {
    setSunConfiguration(defaultSunConfiguration);
  };

  return { sunConfiguration, setSunConfiguration, resetToDefault };
};

export default useSunConfigurationState;
