import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLanguage, FaMoon, FaSun } from 'react-icons/fa';
import LanguageSwitcher from '@ui/LanguageSwitcher';
import useDarkMode from '@hooks/useDarkMode';

const Menu: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hy', label: 'Հայերեն' },
  ];

  return (
    <div className="flex items-center space-x-4">
      {/* Language Switcher */}
      <div className="relative flex items-center">
        <button className="flex items-center text-white dark:text-black focus:outline-none">
          <FaLanguage className="mr-2 text-lg" />
          <span className="hidden sm:block">{t('header.language')}</span>
        </button>
        <LanguageSwitcher languages={languages} />
      </div>

      {/* Dark Mode Toggle */}
      <button
        className="flex items-center text-white dark:text-black focus:outline-none"
        onClick={toggleDarkMode}
        title={isDarkMode ? t('header.lightMode') : t('header.darkMode')}
      >
        {isDarkMode ? (
          <FaSun className="text-yellow-400 text-lg" />
        ) : (
          <FaMoon className="text-blue-400 text-lg" />
        )}
        <span className="hidden sm:block ml-2">
          {isDarkMode ? t('header.lightMode') : t('header.darkMode')}
        </span>
      </button>
    </div>
  );
};

export default Menu;
