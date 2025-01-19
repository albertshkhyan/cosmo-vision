import React, { useCallback, useState } from 'react';

import Sidebar from '@common/Sidebar.tsx';
import { useConfigurationHandlers } from '@hooks/useConfigurationHandlers';
import { FaBars } from 'react-icons/fa';

import SolarSystemScene from '@app/routes/SolarSystemScene';

const SceneLayout: React.FC = () => {
  const { configurations, handlers } = useConfigurationHandlers();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative flex h-screen">
      {/* Sidebar */}
      <Sidebar
        configurations={configurations}
        handlers={handlers}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
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
          sunValues={configurations.sunConfiguration}
          haloValues={configurations.haloConfiguration}
          prominenceValues={configurations.prominenceConfiguration}
          starFieldValues={configurations.starFieldConfiguration}
          earthValues={configurations.earthConfiguration}
        />
      </div>
    </div>
  );
};

export default SceneLayout;
