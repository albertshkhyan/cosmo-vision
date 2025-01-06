import { useState } from 'react';

import { HaloState } from '@ui/configs/HaloControls.tsx';

const defaultHaloConfiguration: HaloState = {
  radius: 2.2,
  cameraDistance: 1.2,
  colorR: 1.0,
  colorG: 1.0,
  colorB: 0.1,
  haloBrightness: 1.7, // Default brightness
  edgeTransparencyFactor: 0.0, // Default edge transparency
  globalAlpha: 0.1, // Default global alpha
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
