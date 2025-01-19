import { TFunction } from 'i18next';

import { CreateStarFieldControlItem, StarFieldState } from '../types/state.ts';

/**
 * Given the current starfield state and a callback to update it,
 * return an array of ControlItems that ControlPanel can render.
 */
export function createStarFieldControlItems(
  starField: StarFieldState,
  setStarField: (updated: Partial<StarFieldState>) => void,
  t: TFunction // Translation function for labels
): CreateStarFieldControlItem[] {
  // Helper to simplify onChange logic
  const makeOnChange = (key: keyof StarFieldState) => (newVal: number) =>
    setStarField({ [key]: newVal });

  return [
    {
      label: t('starFieldConfig.starDensity'),
      value: starField.starDensity,
      min: 1000,
      max: 10000,
      step: 100,
      onChange: makeOnChange('starDensity'),
    },
    {
      label: t('starFieldConfig.motionSpeed'),
      value: starField.motionSpeed,
      min: 0.1,
      max: 2.0,
      step: 0.1,
      onChange: makeOnChange('motionSpeed'),
    },
    {
      label: t('starFieldConfig.starColorR'),
      value: starField.starColor[0],
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (newVal) => {
        setStarField({
          starColor: [newVal, starField.starColor[1], starField.starColor[2]],
        });
      },
    },
    {
      label: t('starFieldConfig.starColorG'),
      value: starField.starColor[1],
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (newVal) => {
        setStarField({
          starColor: [starField.starColor[0], newVal, starField.starColor[2]],
        });
      },
    },
    {
      label: t('starFieldConfig.starColorB'),
      value: starField.starColor[2],
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (newVal) => {
        setStarField({
          starColor: [starField.starColor[0], starField.starColor[1], newVal],
        });
      },
    },
  ];
}
