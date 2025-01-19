import { ControlItemProps } from '@ui/ControlItem';

/**
 * Earth State Interface
 * Defines the configuration state for the Earth.
 */
export interface EarthState {
  rotationSpeed: number;
  axialTilt: number;
  solarIrradiance: number;
  atmosphereTransparency: number; // Transparency of the Earth's atmosphere
}

export type EarthControlItem = ControlItemProps;
