import React, { useCallback, useState } from 'react';

import useHaloConfiguration from '@hooks/useHaloConfiguration.ts';
import useSunConfigurationState from '@hooks/useSunConfigurationState';
import SolarSystemScene from '@scenes/SolarSystemScene';
import Sidebar from '@ui/Sidebar';

import { FaBars } from 'react-icons/fa';

const SceneLayout: React.FC = () => {
  const { sunConfiguration, setSunConfiguration, resetToDefault } = useSunConfigurationState();
  const { haloConfiguration, updateHaloConfiguration, resetHaloConfiguration } =
    useHaloConfiguration();

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
        <SolarSystemScene haloValues={haloConfiguration} sunValues={sunConfiguration} />
      </div>
    </div>
  );
};

export default SceneLayout;
