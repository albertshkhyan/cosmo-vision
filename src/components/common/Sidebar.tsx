import React from 'react';

import HelpModal from '@components/modals/HelpModal';
import { ConfigurationHandlers, Handlers } from '@hooks/useConfigurationHandlers.ts';
import useHelpModal from '@hooks/useHelpModal.ts';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';

import { createEarthControlItems, EarthConfigurationSection } from '@features/earth';
import { createHaloControlItems, HaloConfigurationSection } from '@features/halo';
import { createProminenceControlItems, ProminenceConfigurationSection } from '@features/prominence';
import { createStarFieldControlItems, StarFieldConfigurationSection } from '@features/starfield';
import { createSunControlItems, SunConfigurationSection } from '@features/sun';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  configurations: ConfigurationHandlers['configurations'];
  handlers: Handlers;
}

const Sidebar: React.FC<SidebarProps> = ({ configurations, isOpen, onClose, handlers }) => {
  const {
    setSunConfiguration,
    resetSunToDefault,
    setHaloConfiguration,
    resetHaloToDefault,
    setProminenceConfiguration,
    resetProminenceToDefault,
    toggleProminenceVisibility,
    setStarFieldConfiguration,
    resetStarFieldToDefault,
    toggleStarFieldVisibility,
    setEarthConfiguration,
    resetEarthToDefault,
  } = handlers;

  const {
    sunConfiguration,
    haloConfiguration,
    prominenceConfiguration,
    starFieldConfiguration,
    earthConfiguration,
  } = configurations;
  const { t } = useTranslation();
  const { isHelpOpen, helpContent, openHelpModal, closeHelpModal } = useHelpModal();

  const sunItems = createSunControlItems(sunConfiguration, setSunConfiguration, t);

  const haloItems = createHaloControlItems(haloConfiguration, setHaloConfiguration, t);

  const prominenceItems = createProminenceControlItems(
    prominenceConfiguration,
    setProminenceConfiguration,
    t
  ); // Create prominence control items

  const starFieldItems = createStarFieldControlItems(
    // Generate StarField control items
    starFieldConfiguration,
    setStarFieldConfiguration,
    t
  );

  const earthItems = createEarthControlItems(earthConfiguration, setEarthConfiguration, t);

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 shadow-lg flex flex-col transform transition-transform z-sidebar ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '30%' }}
    >
      {/* Header */}
      <div className="p-4 bg-gray-800 flex-shrink-0">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600"
          onClick={onClose}
          aria-label="Close Sidebar"
        >
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-white flex items-center">{t('sidebar.title')}</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto p-4 space-y-6">
        <SunConfigurationSection
          sunItems={sunItems}
          resetSunToDefault={resetSunToDefault}
          openHelpModal={openHelpModal}
          t={t}
        />

        <HaloConfigurationSection
          haloItems={haloItems}
          resetHaloToDefault={resetHaloToDefault}
          openHelpModal={openHelpModal}
          t={t}
        />

        <ProminenceConfigurationSection
          prominenceItems={prominenceItems} // Pass prominence control items
          resetProminenceToDefault={resetProminenceToDefault} // Pass reset function
          openHelpModal={openHelpModal} // Pass Help modal function
          toggleProminenceVisibility={toggleProminenceVisibility}
          isProminenceVisible={prominenceConfiguration.isVisible}
          t={t} // Pass translation function
        />

        <StarFieldConfigurationSection
          starFieldItems={starFieldItems} // Pass StarField control items
          resetStarFieldToDefault={resetStarFieldToDefault} // Pass reset function
          openHelpModal={openHelpModal} // Pass Help modal function
          toggleStarFieldVisibility={toggleStarFieldVisibility} // Pass visibility toggle
          isStarFieldVisible={starFieldConfiguration.isVisible} // Pass visibility state
          t={t} // Pass translation function
        />

        {/* Earth Configuration */}
        <EarthConfigurationSection
          earthItems={earthItems}
          resetEarthToDefault={resetEarthToDefault}
          openHelpModal={openHelpModal}
          t={t}
        />
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-800 flex-shrink-0">
        <HelpModal
          isOpen={isHelpOpen}
          onClose={closeHelpModal}
          title={t('helpModal.title')}
          content={helpContent}
        />
      </div>
    </div>
  );
};

export default Sidebar;
