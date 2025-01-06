import React from 'react';

import { useTranslation } from 'react-i18next';

import useHelpModal from '@hooks/useHelpModal.ts';
import { SunState } from '@ui/configs/SunControls';
import HaloConfigurationSection from '@ui/HaloConfigurationSection.tsx';
import HelpModal from '@ui/modals/HelpModal';
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
}) => {
  const { t } = useTranslation();
  const { isHelpOpen, helpContent, openHelpModal, closeHelpModal } = useHelpModal();

  const sunItems = createSunControlItems(sunConfiguration, setSunConfiguration, t);

  const haloItems = createHaloControlItems(haloConfiguration, setHaloConfiguration, t);

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
