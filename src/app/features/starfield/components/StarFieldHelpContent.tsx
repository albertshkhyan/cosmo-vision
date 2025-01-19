import React from 'react';

import { useTranslation } from 'react-i18next';

const StarFieldHelpContent: React.FC = () => {
  const { t } = useTranslation();

  // Define the controls dynamically from the translation file
  const controls = [
    {
      key: 'starDensity',
      title: t('help.starFieldConfig.controls.starDensity'),
      description: t('help.starFieldConfig.controls.starDensityDescription'),
    },
    {
      key: 'motionSpeed',
      title: t('help.starFieldConfig.controls.motionSpeed'),
      description: t('help.starFieldConfig.controls.motionSpeedDescription'),
    },
    {
      key: 'starColor',
      title: t('help.starFieldConfig.controls.starColor'),
      description: t('help.starFieldConfig.controls.starColorDescription'),
    },
    {
      key: 'visibility',
      title: t('help.starFieldConfig.controls.visibility'),
      description: t('help.starFieldConfig.controls.visibilityDescription'),
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{t('help.starFieldConfig.title')}</h2>
      <p className="text-sm mb-4">{t('help.starFieldConfig.description')}</p>
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

export default StarFieldHelpContent;
