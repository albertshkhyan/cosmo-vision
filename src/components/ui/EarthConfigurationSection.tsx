import React from 'react';

import Collapse from '@ui/Collapse.tsx';
import { EarthControlItem } from '@ui/configs/EarthControls.tsx';
import ControlPanel from '@ui/ControlPanel';
import EarthHelpContent from '@ui/EarthHelpContent.tsx';
import HelpButton from '@ui/HelpButton';
import ResetButton from '@ui/ResetButton';

const EarthConfigurationSection: React.FC<{
  earthItems: EarthControlItem[];
  resetEarthToDefault: () => void;
  openHelpModal: (content: React.ReactNode) => void;
  t: (key: string) => string;
}> = ({ earthItems, resetEarthToDefault, openHelpModal, t }) => (
  <Collapse title={<h2>{t('earthConfig.title')}</h2>}>
    <ControlPanel title={t('earthConfig.visualEffects')} items={earthItems} />
    <ResetButton onClick={resetEarthToDefault} label={t('earthConfig.reset')} />
    <HelpButton onClick={() => openHelpModal(<EarthHelpContent />)} label={t('earthConfig.help')} />
  </Collapse>
);

export default EarthConfigurationSection;
