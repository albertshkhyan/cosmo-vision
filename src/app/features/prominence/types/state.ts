import { ControlItemProps } from '@ui/ControlItem';

export interface ProminenceState {
  intensity: number; // Intensity of the prominence
  turbulence: number; // Turbulence factor for dynamic effects
  colorR: number; // Red component of the prominence color
  colorG: number; // Green component of the prominence color
  colorB: number; // Blue component of the prominence color
  scale: number; // Scale of the prominence
  spread: number; // Spread of prominence arc
  falloff: number; // Controls the radial fade-off of the prominence
  distortionScale: number; // Magnitude of UV distortions for wavy motions
  turbulenceStrength: number; // Strength of the turbulence effect
  isVisible: boolean; // Visibility toggle for prominence
}

export type CreateProminenceControlItem = ControlItemProps;
