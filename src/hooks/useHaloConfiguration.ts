import { useState } from 'react';

import { HaloState } from '@ui/configs/HaloControls.tsx';

const defaultHaloConfiguration: HaloState = {
  radius: 2.5,
  cameraDistance: 1.2,
  colorR: 1.0,
  colorG: 0.8,
  colorB: 0.4,
  haloBrightness: 5, // Default brightness
  edgeTransparencyFactor: 1.0, // Default edge transparency
  globalAlpha: 1.0, // Default global alpha
};

const useHaloConfiguration = () => {
  const [haloConfiguration, setHaloConfiguration] = useState<HaloState>(defaultHaloConfiguration);

  // Update specific properties in the configuration
  const updateHaloConfiguration = (updated: Partial<HaloState>) => {
    setHaloConfiguration((prev) => ({ ...prev, ...updated }));
  };

  // Reset to default configuration
  const resetHaloConfiguration = () => {
    setHaloConfiguration(defaultHaloConfiguration);
  };

  return {
    haloConfiguration,
    updateHaloConfiguration,
    resetHaloConfiguration,
  };
};

export default useHaloConfiguration;
