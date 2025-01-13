import React from 'react';

import { useTranslation } from 'react-i18next';

import useHelpModal from '@hooks/useHelpModal.ts';
import { createProminenceControlItems, ProminenceState } from '@ui/configs/ProminenceControls.tsx';
import { createStarFieldControlItems, StarFieldState } from '@ui/configs/StarfieldControlPanel.tsx';
import { SunState } from '@ui/configs/SunControls';
import HaloConfigurationSection from '@ui/HaloConfigurationSection.tsx';
import HelpModal from '@ui/modals/HelpModal';
import ProminenceConfigurationSection from '@ui/ProminenceConfigurationSection.tsx';
import StarFieldConfigurationSection from '@ui/StarFieldConfigurationSection.tsx';
import SunConfigurationSection from '@ui/SunConfigurationSection.tsx';

import { FaTimes } from 'react-icons/fa';

import { createHaloControlItems, HaloState } from './configs/HaloControls';
import { createSunControlItems } from './configs/SunControls';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  sunConfiguration: SunState;
  setSunConfiguration: (updated: Partial<SunState>) => void;
  resetSunToDefault: () => void;
  resetToDefault: () => void;
  haloConfiguration: HaloState;
  setHaloConfiguration: (updated: Partial<HaloState>) => void;
  resetHaloToDefault: () => void;
  prominenceConfiguration: ProminenceState;
  setProminenceConfiguration: (updated: Partial<ProminenceState>) => void;
  resetProminenceToDefault: () => void;
  toggleProminenceVisibility: () => void;
  starFieldConfiguration: StarFieldState; // Add StarField configuration
  setStarFieldConfiguration: (updated: Partial<StarFieldState>) => void; // Add setter for StarField
  resetStarFieldToDefault: () => void; // Add reset function for StarField
  toggleStarFieldVisibility: () => void; // Add toggle visibility for StarField
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  sunConfiguration,
  setSunConfiguration,
  resetSunToDefault,
  haloConfiguration,
  setHaloConfiguration,
  resetHaloToDefault,
  prominenceConfiguration, // Add Prominence configuration
  setProminenceConfiguration, // Add setter for Prominence
  resetProminenceToDefault, // Add reset function for Prominence
  toggleProminenceVisibility,
  starFieldConfiguration, // Add StarField configuration
  setStarFieldConfiguration, // Add setter for StarField
  resetStarFieldToDefault, // Add reset function for StarField
  toggleStarFieldVisibility, // Add toggle visibility for StarField
}) => {
  const { t } = useTranslation();
  const { isHelpOpen, helpContent, openHelpModal, closeHelpModal } = useHelpModal();

  const sunItems = createSunControlItems(sunConfiguration, setSunConfiguration, t);

  const haloItems = createHaloControlItems(haloConfiguration, setHaloConfiguration, t);

  const prominenceItems = createProminenceControlItems(
    prominenceConfiguration,
    setProminenceConfiguration,
    t
  ); // Create Prominence control items

  const starFieldItems = createStarFieldControlItems(
    // Generate StarField control items
    starFieldConfiguration,
    setStarFieldConfiguration,
    t
  );

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
          prominenceItems={prominenceItems} // Pass Prominence control items
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
