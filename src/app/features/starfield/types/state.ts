// StarFieldState interface
import { ControlItemProps } from '@ui/ControlItem';

export interface StarFieldState {
  starDensity: number; // Number of stars in the field
  starColor: [number, number, number]; // RGB values for star color
  isVisible: boolean; // Whether the starfield is visible
  motionSpeed: number; // Speed of star movement (if applicable)
}

// Type alias for ControlItemProps specific to starfield controls
export type CreateStarFieldControlItem = ControlItemProps;
