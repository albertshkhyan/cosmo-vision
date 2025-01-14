import React from 'react';

import { useTranslation } from 'react-i18next';

const EarthHelpContent: React.FC = () => {
  const { t } = useTranslation();

  // Define the controls dynamically from the translation file
  const controls = [
    {
      key: 'rotationSpeed',
      title: t('help.earthConfig.controls.rotationSpeed'),
      description: t('help.earthConfig.controls.rotationSpeed'),
    },
    {
      key: 'axialTilt',
      title: t('help.earthConfig.controls.axialTilt'),
      description: t('help.earthConfig.controls.axialTilt'),
    },
    {
      key: 'solarIrradiance',
      title: t('help.earthConfig.controls.solarIrradiance'),
      description: t('help.earthConfig.controls.solarIrradiance'),
    },
    {
      key: 'atmosphereTransparency',
      title: t('help.earthConfig.controls.atmosphereTransparency'),
      description: t('help.earthConfig.controls.atmosphereTransparency'),
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{t('help.earthConfig.title')}</h2>
      <p className="text-sm mb-4">{t('help.earthConfig.description')}</p>
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

export default EarthHelpContent;
