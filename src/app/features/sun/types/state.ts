import { ControlItemProps } from '@ui/ControlItem';

export interface SunState {
  polarSpeedFactor: number;
  granulationIntensity: number;
  surfaceIntensity: number;
  plasmaFlowSpeed: number;
  coronaGlowStrength: number;
  flareIntensity: number;
  radiantRayStrength: number;
  alphaTransparency: number; // Added alphaTransparency
}

export type CreateSunControlItem = ControlItemProps;
