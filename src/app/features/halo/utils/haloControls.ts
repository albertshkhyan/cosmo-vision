import { TFunction } from 'i18next';

import { HaloControlItem, HaloState } from '../types/state.ts';

// Update the `haloConfiguration` type to use the `HaloState` interface
export const createHaloControlItems = (
  haloConfiguration: HaloState,
  update: (updated: Partial<HaloState>) => void,
  t: TFunction
): HaloControlItem[] => [
  {
    label: t('haloConfig.radius'),
    value: haloConfiguration.radius,
    type: 'slider',
    min: 1.0,
    max: 5.0,
    step: 0.1,
    onChange: (value: number) => update({ radius: value }),
  },
  {
    label: t('haloConfig.cameraDistance'),
    value: haloConfiguration.cameraDistance,
    type: 'slider',
    min: 0.5,
    max: 3.0,
    step: 0.1,
    onChange: (value: number) => update({ cameraDistance: value }),
  },
  {
    label: t('haloConfig.colorR'),
    value: haloConfiguration.colorR,
    type: 'slider',
    min: 0.0,
    max: 1.0,
    step: 0.1,
    onChange: (value: number) => update({ colorR: value }),
  },
  {
    label: t('haloConfig.colorG'),
    value: haloConfiguration.colorG,
    type: 'slider',
    min: 0.0,
    max: 1.0,
    step: 0.1,
    onChange: (value: number) => update({ colorG: value }),
  },
  {
    label: t('haloConfig.colorB'),
    value: haloConfiguration.colorB,
    type: 'slider',
    min: 0.0,
    max: 1.0,
    step: 0.1,
    onChange: (value: number) => update({ colorB: value }),
  },
  {
    label: t('haloConfig.haloBrightness'),
    value: haloConfiguration.haloBrightness,
    type: 'slider',
    min: 1.0,
    max: 10.0,
    step: 0.1,
    onChange: (value: number) => update({ haloBrightness: value }),
  },
  {
    label: t('haloConfig.edgeTransparencyFactor'),
    value: haloConfiguration.edgeTransparencyFactor,
    type: 'slider',
    min: 0.0,
    max: 5.0,
    step: 0.01,
    onChange: (value: number) => update({ edgeTransparencyFactor: value }),
  },
  {
    label: t('haloConfig.globalAlpha'),
    value: haloConfiguration.globalAlpha,
    type: 'slider',
    min: 0.0,
    max: 1.0,
    step: 0.01,
    onChange: (value: number) => update({ globalAlpha: value }),
  },
];
