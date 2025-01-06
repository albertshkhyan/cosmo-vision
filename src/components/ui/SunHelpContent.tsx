import React from 'react';
import { useTranslation } from 'react-i18next';
import useTooltip from '@hooks/useTooltip';

const SunHelpContent: React.FC = () => {
  const { t } = useTranslation();
  const { tooltip, showTooltip, hideTooltip } = useTooltip();

  return (
    <div>
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute bg-gray-800 text-white text-sm p-2 rounded z-popover"
          style={{ top: tooltip.position.y + 10, left: tooltip.position.x + 10 }}
        >
          {tooltip.content}
        </div>
      )}

      <p>{t('help.sunConfig.description')}</p>
      <ul className="list-disc pl-4 mt-2">
        <li>
          <strong>{t('sunConfig.polarSpeedFactor')}:</strong>{' '}
          {t('help.sunConfig.controls.polarSpeedFactor')}
        </li>
        <li>
          <strong>
            <a
              href="https://en.wikipedia.org/wiki/Solar_granule#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
              onMouseEnter={(e) => showTooltip(t('sunConfig.tooltips.granulation'), e)}
              onMouseLeave={hideTooltip}
            >
              {t('sunConfig.granulation')}
            </a>
            :
          </strong>{' '}
          {t('help.sunConfig.controls.granulation')}
        </li>
        <li>
          <strong>{t('sunConfig.surfaceIntensity')}:</strong>{' '}
          {t('help.sunConfig.controls.surfaceIntensity')}
        </li>
        <li>
          <strong>{t('sunConfig.plasmaFlowSpeed')}:</strong>{' '}
          {t('help.sunConfig.controls.plasmaFlowSpeed')}
        </li>
        <li>
          <strong>
            <a
              href="https://en.wikipedia.org/wiki/Stellar_corona"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
              onMouseEnter={(e) => showTooltip(t('sunConfig.tooltips.corona'), e)}
              onMouseLeave={hideTooltip}
            >
              {t('sunConfig.coronaGlowStrength')}
            </a>
            :
          </strong>{' '}
          {t('help.sunConfig.controls.coronaGlowStrength')}
        </li>
        <li>
          <strong>{t('sunConfig.flareIntensity')}:</strong>{' '}
          {t('help.sunConfig.controls.flareIntensity')}
        </li>
      </ul>
    </div>
  );
};

export default SunHelpContent;
