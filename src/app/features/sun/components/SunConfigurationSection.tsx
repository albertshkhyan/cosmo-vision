import React from 'react';

import Collapse from '@ui/Collapse';
import { ControlItemProps } from '@ui/ControlItem';
import HelpButton from '@ui/HelpButton';
import ResetButton from '@ui/ResetButton';
import { FaSun } from 'react-icons/fa';

import SunHelpContent from './SunHelpContent';
import ControlPanel from '../../shared/components/ControlPanel';

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
