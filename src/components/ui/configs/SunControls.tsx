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

type CreateSunControlItem = ControlItemProps;

/**
 * Given the current sun state and a callback to update it,
 * return an array of ControlItems that ControlPanel can render.
 */
export function createSunControlItems(
  sun: SunState,
  setSun: (updated: Partial<SunState>) => void,
  t: (key: string) => string // Pass the translation function as a parameter
): CreateSunControlItem[] {
  // Helper to avoid repeating onChange logic
  const makeOnChange = (key: keyof SunState) => (newVal: number) => setSun({ [key]: newVal });

  return [
    {
      label: t('sunConfig.polarSpeedFactor'),
      value: sun.polarSpeedFactor,
      min: 0,
      max: 2,
      step: 0.01,
      onChange: makeOnChange('polarSpeedFactor'),
    },
    {
      label: t('sunConfig.granulation'),
      value: sun.granulationIntensity,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: makeOnChange('granulationIntensity'),
    },
    {
      label: t('sunConfig.surfaceIntensity'),
      value: sun.surfaceIntensity,
      min: 0,
      max: 2,
      step: 0.01,
      onChange: makeOnChange('surfaceIntensity'),
    },
    {
      label: t('sunConfig.plasmaFlowSpeed'),
      value: sun.plasmaFlowSpeed,
      min: 0,
      max: 2,
      step: 0.01,
      onChange: makeOnChange('plasmaFlowSpeed'),
    },
    {
      label: t('sunConfig.coronaGlowStrength'),
      value: sun.coronaGlowStrength,
      min: 0,
      max: 888.0,
      step: 0.1,
      onChange: makeOnChange('coronaGlowStrength'),
    },
    {
      label: t('sunConfig.flareIntensity'),
      value: sun.flareIntensity,
      min: 0,
      max: 2,
      step: 0.01,
      onChange: makeOnChange('flareIntensity'),
    },
    {
      label: t('sunConfig.alphaTransparency'), // Label for alphaTransparency
      value: sun.alphaTransparency,
      min: 0.0,
      max: 1.0, // Transparency range (0 for fully transparent, 1 for fully opaque)
      step: 0.01,
      onChange: makeOnChange('alphaTransparency'),
    },
  ];
}
