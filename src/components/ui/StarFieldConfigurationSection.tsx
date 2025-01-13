import React from 'react';

import Collapse from '@ui/Collapse.tsx';
import { ControlItemProps } from '@ui/ControlItem.tsx';
import ControlPanel from '@ui/ControlPanel.tsx';
import HelpButton from '@ui/HelpButton.tsx';
import ResetButton from '@ui/ResetButton.tsx';
import StarFieldHelpContent from '@ui/StarFieldHelpContent';
import Switch from '@ui/Switch.tsx';

import { FaStar } from 'react-icons/fa';

const StarFieldConfigurationSection: React.FC<{
  starFieldItems: ControlItemProps[];
  resetStarFieldToDefault: () => void;
  openHelpModal: (content: React.ReactNode) => void;
  toggleStarFieldVisibility: () => void;
  isStarFieldVisible: boolean;
  t: (key: string) => string;
}> = ({
  starFieldItems,
  resetStarFieldToDefault,
  openHelpModal,
  toggleStarFieldVisibility,
  isStarFieldVisible,
  t,
}) => (
  <Collapse
    title={
      <h2 className="text-xl font-bold text-white flex items-center">
        <FaStar className="mr-2" /> {t('starFieldConfig.title')}
      </h2>
    }
  >
    {/* Visibility Toggle */}
    <div className="mb-4 flex items-center">
      <label className="text-white text-sm font-medium mr-2">
        {t('starFieldConfig.toggleVisibility')}
      </label>
      <Switch
        isChecked={isStarFieldVisible}
        onToggle={toggleStarFieldVisibility}
        label={isStarFieldVisible ? t('visible') : t('hidden')}
      />
    </div>

    {/* Control Panel */}
    <ControlPanel title={t('starFieldConfig.visualEffects')} items={starFieldItems} />

    {/* Reset Button */}
    <ResetButton onClick={resetStarFieldToDefault} label={t('starFieldConfig.reset')} />

    {/* Help Button */}
    <HelpButton
      onClick={() => openHelpModal(<StarFieldHelpContent />)}
      label={t('starFieldConfig.help')}
    />
  </Collapse>
);

export default StarFieldConfigurationSection;
