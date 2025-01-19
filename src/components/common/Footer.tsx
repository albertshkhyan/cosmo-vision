import React from 'react';

import useDarkMode from '@hooks/useDarkMode.ts';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();

  return (
    <footer
      className={`p-2 text-sm text-center ${
        isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'
      }`}
    >
      © {new Date().getFullYear()} {t('footer.copyright')}
    </footer>
  );
};

export default Footer;
