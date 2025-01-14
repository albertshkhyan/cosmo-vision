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

/**
 * Creates control items for Earth's configuration.
 * These items are used by the ControlPanel to render sliders.
 */
export function createEarthControlItems(
  earth: EarthState,
  setEarth: (updated: Partial<EarthState>) => void,
  t: (key: string) => string // Pass the translation function
): EarthControlItem[] {
  // Helper to avoid repeating onChange logic
  const makeOnChange = (key: keyof EarthState) => (newVal: number) => setEarth({ [key]: newVal });

  return [
    {
      label: t('earthConfig.rotationSpeed'),
      value: earth.rotationSpeed,
      min: 0,
      max: 2,
      step: 0.01,
      onChange: makeOnChange('rotationSpeed'),
    },
    {
      label: t('earthConfig.axialTilt'),
      value: earth.axialTilt,
      min: 0,
      max: 90,
      step: 0.1,
      onChange: makeOnChange('axialTilt'),
    },
    {
      label: t('earthConfig.solarIrradiance'),
      value: earth.solarIrradiance,
      min: 0,
      max: 1361, // Maximum solar constant in W/m²
      step: 1,
      onChange: makeOnChange('solarIrradiance'),
    },
    {
      label: t('earthConfig.atmosphereTransparency'),
      value: earth.atmosphereTransparency,
      min: 0,
      max: 1, // 0 for fully opaque, 1 for fully transparent
      step: 0.01,
      onChange: makeOnChange('atmosphereTransparency'),
    },
  ];
}
