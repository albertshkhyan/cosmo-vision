import { ControlItemProps } from '@ui/ControlItem';
import { TFunction } from 'i18next';

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

type CreateProminenceControlItem = ControlItemProps;

/**
 * Given the current prominence state and a callback to update it,
 * return an array of ControlItems that ControlPanel can render.
 */
export function createProminenceControlItems(
  prominence: ProminenceState,
  setProminence: (updated: Partial<ProminenceState>) => void,
  t: TFunction // Pass the translation function as a parameter
): CreateProminenceControlItem[] {
  // Helper to avoid repeating onChange logic
  const makeOnChange = (key: keyof ProminenceState) => (newVal: number) =>
    setProminence({ [key]: newVal });

  return [
    {
      label: t('prominenceConfig.intensity'),
      value: prominence.intensity,
      min: 0,
      max: 5,
      step: 0.1,
      onChange: makeOnChange('intensity'),
    },
    {
      label: t('prominenceConfig.turbulence'),
      value: prominence.turbulence,
      min: 0,
      max: 3,
      step: 0.1,
      onChange: makeOnChange('turbulence'),
    },
    {
      label: t('prominenceConfig.colorR'),
      value: prominence.colorR,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: makeOnChange('colorR'),
    },
    {
      label: t('prominenceConfig.colorG'),
      value: prominence.colorG,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: makeOnChange('colorG'),
    },
    {
      label: t('prominenceConfig.colorB'),
      value: prominence.colorB,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: makeOnChange('colorB'),
    },
    {
      label: t('prominenceConfig.scale'),
      value: prominence.scale,
      min: 0.5,
      max: 10,
      step: 0.1,
      onChange: makeOnChange('scale'),
    },
    {
      label: t('prominenceConfig.spread'),
      value: prominence.spread,
      min: 0.5,
      max: 3,
      step: 0.1,
      onChange: makeOnChange('spread'),
    },
    {
      label: t('prominenceConfig.falloff'),
      value: prominence.falloff,
      min: 0.5,
      max: 5,
      step: 0.1,
      onChange: makeOnChange('falloff'),
    },
    {
      label: t('prominenceConfig.distortionScale'),
      value: prominence.distortionScale,
      min: 0.1,
      max: 2,
      step: 0.1,
      onChange: makeOnChange('distortionScale'),
    },
    {
      label: t('prominenceConfig.turbulenceStrength'),
      value: prominence.turbulenceStrength,
      min: 0.5,
      max: 3,
      step: 0.1,
      onChange: makeOnChange('turbulenceStrength'),
    },
  ];
}
