import React from 'react';

import { useTranslation } from 'react-i18next';

const ProminenceHelpContent: React.FC = () => {
  const { t } = useTranslation();

  // Define the controls dynamically from the translation file
  const controls = [
    {
      key: 'size',
      title: t('help.prominenceConfig.controls.size'),
      description: t('help.prominenceConfig.controls.size'),
    },
    {
      key: 'intensity',
      title: t('help.prominenceConfig.controls.intensity'),
      description: t('help.prominenceConfig.controls.intensity'),
    },
    {
      key: 'color',
      title: t('help.prominenceConfig.controls.color'),
      description: t('help.prominenceConfig.controls.color'),
    },
    {
      key: 'arcSegments',
      title: t('help.prominenceConfig.controls.arcSegments'),
      description: t('help.prominenceConfig.controls.arcSegments'),
    },
    {
      key: 'noiseFactor',
      title: t('help.prominenceConfig.controls.noiseFactor'),
      description: t('help.prominenceConfig.controls.noiseFactor'),
    },
    {
      key: 'turbulence',
      title: t('help.prominenceConfig.controls.turbulence'),
      description: t('help.prominenceConfig.controls.turbulence'),
    },
    {
      key: 'flicker',
      title: t('help.prominenceConfig.controls.flicker'),
      description: t('help.prominenceConfig.controls.flicker'),
    },
    {
      key: 'fadeEffect',
      title: t('help.prominenceConfig.controls.fadeEffect'),
      description: t('help.prominenceConfig.controls.fadeEffect'),
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{t('help.prominenceConfig.title')}</h2>
      <p className="text-sm mb-4">{t('help.prominenceConfig.description')}</p>
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

export default ProminenceHelpContent;
