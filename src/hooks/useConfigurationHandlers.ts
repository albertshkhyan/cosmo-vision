import { Dispatch, SetStateAction } from 'react';

import { EarthState, useEarthConfiguration } from '@features/earth';
import { HaloState, useHaloConfiguration } from '@features/halo';
import { ProminenceState, useProminenceConfiguration } from '@features/prominence';
import { StarFieldState, useStarFieldConfiguration } from '@features/starfield';
import { SunState, useSunConfigurationState } from '@features/sun';

export interface Handlers {
  setSunConfiguration: (updated: Partial<SunState>) => void;
  resetSunToDefault: () => void;
  setHaloConfiguration: (updated: Partial<HaloState>) => void;
  resetHaloToDefault: () => void;
  setProminenceConfiguration: (updated: Partial<ProminenceState>) => void;
  resetProminenceToDefault: () => void;
  toggleProminenceVisibility: () => void;
  setStarFieldConfiguration: (updated: Partial<StarFieldState>) => void;
  resetStarFieldToDefault: () => void;
  toggleStarFieldVisibility: () => void;
  setEarthConfiguration: (updated: Partial<EarthState>) => void;
  resetEarthToDefault: () => void;
}

// Define the expected type of configurations and handlers
export interface ConfigurationHandlers {
  configurations: {
    sunConfiguration: SunState;
    haloConfiguration: HaloState;
    prominenceConfiguration: ProminenceState;
    starFieldConfiguration: StarFieldState;
    earthConfiguration: EarthState;
  };
  handlers: Handlers;
}

export const useConfigurationHandlers = (): ConfigurationHandlers => {
  const {
    sunConfiguration,
    setSunConfiguration,
    resetToDefault: resetSunToDefault,
  } = useSunConfigurationState();
  const { haloConfiguration, setHaloConfiguration, resetHaloConfiguration } =
    useHaloConfiguration();
  const {
    prominenceConfiguration,
    toggleVisibility: toggleProminenceVisibility,
    setProminenceConfiguration,
    resetProminenceConfiguration,
  } = useProminenceConfiguration();
  const {
    starFieldConfiguration,
    toggleVisibility: toggleStarFieldVisibility,
    setStarFieldConfiguration,
    resetStarFieldConfiguration,
  } = useStarFieldConfiguration();
  const { earthConfiguration, setEarthConfiguration, resetEarthConfiguration } =
    useEarthConfiguration();

  const createUpdateHandler = <T>(
    setter: Dispatch<SetStateAction<T>>
  ): ((updated: Partial<T>) => void) => {
    return (updated: Partial<T>) => {
      setter((prev) => ({ ...prev, ...updated }));
    };
  };

  return {
    configurations: {
      sunConfiguration,
      haloConfiguration,
      prominenceConfiguration,
      starFieldConfiguration,
      earthConfiguration,
    },
    handlers: {
      setSunConfiguration: createUpdateHandler(setSunConfiguration),
      resetSunToDefault,
      setHaloConfiguration: createUpdateHandler(setHaloConfiguration),
      resetHaloToDefault: resetHaloConfiguration,
      setProminenceConfiguration: createUpdateHandler(setProminenceConfiguration),
      resetProminenceToDefault: resetProminenceConfiguration,
      toggleProminenceVisibility,
      setStarFieldConfiguration: createUpdateHandler(setStarFieldConfiguration),
      resetStarFieldToDefault: resetStarFieldConfiguration,
      toggleStarFieldVisibility,
      setEarthConfiguration: createUpdateHandler(setEarthConfiguration),
      resetEarthToDefault: resetEarthConfiguration,
    },
  };
};
