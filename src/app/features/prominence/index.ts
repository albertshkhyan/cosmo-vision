import Prominence from './components/Prominence';
import ProminenceConfigurationSection from './components/ProminenceConfigurationSection';
import useProminenceConfiguration from './hooks/useProminenceConfiguration';
import { ProminenceState } from './types/state';
import { generateProminencePositions } from './utils/generateProminencePositions';
import { createProminenceControlItems } from './utils/prominenceControls';

export type { ProminenceState };

export {
  useProminenceConfiguration,
  generateProminencePositions,
  createProminenceControlItems,
  ProminenceConfigurationSection,
  Prominence,
};
