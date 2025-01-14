import React, { useCallback, useState } from 'react';

import useEarthConfiguration from '@hooks/useEarthConfiguration.ts';
import useHaloConfiguration from '@hooks/useHaloConfiguration.ts';
import useProminenceConfiguration from '@hooks/useProminenceConfiguration.ts';
import useStarFieldConfiguration from '@hooks/useStarfieldConfiguration.ts';
import useSunConfigurationState from '@hooks/useSunConfigurationState';
import SolarSystemScene from '@scenes/SolarSystemScene';
import { EarthState } from '@ui/configs/EarthControls.tsx';
import { ProminenceState } from '@ui/configs/ProminenceControls.tsx';
import { StarFieldState } from '@ui/configs/StarfieldControlPanel.tsx';
import Sidebar from '@ui/Sidebar';

import { FaBars } from 'react-icons/fa';

const SceneLayout: React.FC = () => {
  const { sunConfiguration, setSunConfiguration, resetToDefault } = useSunConfigurationState();
  const { haloConfiguration, updateHaloConfiguration, resetHaloConfiguration } =
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
  } = useStarFieldConfiguration(); // StarField hook integration

  const { earthConfiguration, setEarthConfiguration, resetEarthConfiguration } =
    useEarthConfiguration(); // Earth hook integration

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const updateSunConfiguration = useCallback(
    (updated: Partial<typeof sunConfiguration>) => {
      setSunConfiguration((prev) => ({
        ...prev,
        ...updated,
      }));
    },
    [setSunConfiguration]
  );

  const updateProminenceConfiguration = (updated: Partial<ProminenceState>) => {
    setProminenceConfiguration((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const updateStarFieldConfiguration = (updated: Partial<StarFieldState>) => {
    setStarFieldConfiguration((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const updateEarthConfiguration = (updated: Partial<EarthState>) => {
    setEarthConfiguration((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  return (
    <div className="relative flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        sunConfiguration={sunConfiguration}
        setSunConfiguration={updateSunConfiguration}
        resetToDefault={resetToDefault}
        resetSunToDefault={resetToDefault}
        haloConfiguration={haloConfiguration}
        setHaloConfiguration={updateHaloConfiguration}
        resetHaloToDefault={resetHaloConfiguration}
        prominenceConfiguration={prominenceConfiguration}
        setProminenceConfiguration={updateProminenceConfiguration}
        resetProminenceToDefault={resetProminenceConfiguration}
        toggleProminenceVisibility={toggleProminenceVisibility}
        starFieldConfiguration={starFieldConfiguration} // Pass StarField config
        setStarFieldConfiguration={updateStarFieldConfiguration} // Pass StarField setter
        resetStarFieldToDefault={resetStarFieldConfiguration} // Pass reset logic
        toggleStarFieldVisibility={toggleStarFieldVisibility} // Pass visibility toggle
        earthConfiguration={earthConfiguration} // Pass Earth config
        setEarthConfiguration={updateEarthConfiguration} // Pass Earth setter
        resetEarthToDefault={resetEarthConfiguration} // Pass Earth reset logic
      />

      {/* Main Content Area */}
      <div className="flex-grow relative">
        {/* Burger Menu Button */}
        <button
          className="absolute top-4 left-4 z-[1000] bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 focus:outline-none"
          onClick={toggleSidebar}
        >
          <FaBars size={20} />
        </button>

        {/* 3D Scene */}
        <SolarSystemScene
          earthValues={earthConfiguration}
          prominenceValues={prominenceConfiguration}
          haloValues={haloConfiguration}
          sunValues={sunConfiguration}
          starFieldValues={starFieldConfiguration} // Pass StarField configuration
        />
      </div>
    </div>
  );
};

export default SceneLayout;
