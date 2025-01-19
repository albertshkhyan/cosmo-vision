import React from 'react';

import Collapse from '@ui/Collapse';
import HelpButton from '@ui/HelpButton';
import ResetButton from '@ui/ResetButton';

import EarthHelpContent from './EarthHelpContent';
import ControlPanel from '../../shared/components/ControlPanel';
import type { EarthControlItem } from '../types/state';

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
