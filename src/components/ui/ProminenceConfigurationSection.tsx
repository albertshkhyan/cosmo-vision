import React from 'react';

import Collapse from '@ui/Collapse.tsx';
import { ControlItemProps } from '@ui/ControlItem.tsx';
import ControlPanel from '@ui/ControlPanel.tsx';
import HelpButton from '@ui/HelpButton.tsx';
import ProminenceHelpContent from '@ui/ProminenceHelpContent.tsx';
import ResetButton from '@ui/ResetButton.tsx';
import Switch from '@ui/Switch.tsx';

import { FaFire } from 'react-icons/fa';

const ProminenceConfigurationSection: React.FC<{
  prominenceItems: ControlItemProps[];
  resetProminenceToDefault: () => void;
  openHelpModal: (content: React.ReactNode) => void;
  toggleProminenceVisibility: () => void;
  isProminenceVisible: boolean;
  t: (key: string) => string;
}> = ({
  prominenceItems,
  resetProminenceToDefault,
  openHelpModal,
  toggleProminenceVisibility,
  isProminenceVisible,
  t,
}) => (
  <Collapse
    title={
      <h2 className="text-xl font-bold text-white flex items-center">
        <FaFire className="mr-2" /> {t('prominenceConfig.title')}
      </h2>
    }
  >
    <div className="mb-4 flex items-center">
      <label className="text-white text-sm font-medium mr-2">{t('toggleVisibility')}</label>
      <Switch
        isChecked={isProminenceVisible}
        onToggle={toggleProminenceVisibility}
        label={isProminenceVisible ? t('visible') : t('hidden')}
      />
    </div>
    <ControlPanel title={t('prominenceConfig.visualEffects')} items={prominenceItems} />
    <ResetButton onClick={resetProminenceToDefault} label={t('prominenceConfig.reset')} />
    <HelpButton
      onClick={() => openHelpModal(<ProminenceHelpContent />)}
      label={t('prominenceConfig.help')}
    />
  </Collapse>
);

export default ProminenceConfigurationSection;
