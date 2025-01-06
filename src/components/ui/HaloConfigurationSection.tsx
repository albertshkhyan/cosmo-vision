import React from 'react';

import Collapse from '@ui/Collapse.tsx';
import { ControlItemProps } from '@ui/ControlItem.tsx';
import ControlPanel from '@ui/ControlPanel.tsx';
import HaloHelpContent from '@ui/HaloHelpContent.tsx';
import HelpButton from '@ui/HelpButton.tsx';
import ResetButton from '@ui/ResetButton.tsx';

const HaloConfigurationSection: React.FC<{
  haloItems: ControlItemProps[];
  resetHaloToDefault: () => void;
  openHelpModal: (content: React.ReactNode) => void;
  t: (key: string) => string;
}> = ({ haloItems, resetHaloToDefault, openHelpModal, t }) => (
  <Collapse
    title={
      <h2 className="text-xl font-bold text-white flex items-center">🌟 {t('haloConfig.title')}</h2>
    }
  >
    <ControlPanel title={t('haloConfig.visualEffects')} items={haloItems} />
    <ResetButton onClick={resetHaloToDefault} label={t('haloConfig.reset')} />
    <HelpButton onClick={() => openHelpModal(<HaloHelpContent />)} label={t('haloConfig.help')} />
  </Collapse>
);

export default HaloConfigurationSection;
