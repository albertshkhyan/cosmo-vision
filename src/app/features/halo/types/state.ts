// Define the HaloState interface
import { ControlItemProps } from '@ui/ControlItem';

export interface HaloState {
  radius: number; // Radius of the halo
  cameraDistance: number; // Light falloff scaling based on camera distance
  colorR: number; // Red component of glow color
  colorG: number; // Green component of glow color
  colorB: number; // Blue component of glow color
  haloBrightness: number; // Brightness of the halo
  edgeTransparencyFactor: number; // Transparency for edges
  globalAlpha: number; // Global alpha (overall transparency)
}

export type HaloControlItem = ControlItemProps;
