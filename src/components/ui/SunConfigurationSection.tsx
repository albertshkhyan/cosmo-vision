import React from 'react';

import Collapse from '@ui/Collapse.tsx';
import { ControlItemProps } from '@ui/ControlItem.tsx';
import ControlPanel from '@ui/ControlPanel.tsx';
import HelpButton from '@ui/HelpButton.tsx';
import ResetButton from '@ui/ResetButton.tsx';
import SunHelpContent from '@ui/SunHelpContent.tsx';

import { FaSun } from 'react-icons/fa';

const SunConfigurationSection: React.FC<{
  sunItems: ControlItemProps[];
  resetSunToDefault: () => void;
  openHelpModal: (content: React.ReactNode) => void;
  t: (key: string) => string;
}> = ({ sunItems, resetSunToDefault, openHelpModal, t }) => (
  <Collapse
    title={
      <h2 className="text-xl font-bold text-white flex items-center">
        <FaSun className="mr-2" /> {t('sunConfig.title')}
      </h2>
    }
  >
    <ControlPanel title={t('sunConfig.visualEffects')} items={sunItems} />
    <ResetButton onClick={resetSunToDefault} label={t('sunConfig.reset')} />
    <HelpButton onClick={() => openHelpModal(<SunHelpContent />)} label={t('sunConfig.help')} />
  </Collapse>
);

export default SunConfigurationSection;
