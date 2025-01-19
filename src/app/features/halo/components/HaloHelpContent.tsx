import React from 'react';

import { useTranslation } from 'react-i18next';

const HaloHelpContent: React.FC = () => {
  const { t } = useTranslation();

  // Define the controls dynamically from the translation file
  const controls = [
    {
      key: 'radius',
      title: t('help.haloConfig.controls.radius'),
      description: t('help.haloConfig.controls.radius'),
    },
    {
      key: 'cameraDistance',
      title: t('help.haloConfig.controls.cameraDistance'),
      description: t('help.haloConfig.controls.cameraDistance'),
    },
    {
      key: 'color',
      title: t('help.haloConfig.controls.color'),
      description: t('help.haloConfig.controls.color'),
    },
    {
      key: 'intensity',
      title: t('help.haloConfig.controls.intensity'),
      description: t('help.haloConfig.controls.intensity'),
    },
    {
      key: 'innerGlow',
      title: t('help.haloConfig.controls.innerGlow'),
      description: t('help.haloConfig.controls.innerGlow'),
    },
    {
      key: 'outerGlow',
      title: t('help.haloConfig.controls.outerGlow'),
      description: t('help.haloConfig.controls.outerGlow'),
    },
    {
      key: 'pulsation',
      title: t('help.haloConfig.controls.pulsation'),
      description: t('help.haloConfig.controls.pulsation'),
    },
    {
      key: 'fadeEffect',
      title: t('help.haloConfig.controls.fadeEffect'),
      description: t('help.haloConfig.controls.fadeEffect'),
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{t('help.haloConfig.title')}</h2>
      <p className="text-sm mb-4">{t('help.haloConfig.description')}</p>
      <ul className="text-sm list-disc list-inside">
        {controls.map((control) => (
          <li key={control.key}>
            <strong>{control.title}:</strong> {control.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HaloHelpContent;
