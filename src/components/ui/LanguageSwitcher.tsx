import React from 'react';

import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  languages: { code: string; label: string }[];
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ languages }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="relative">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-gray-700 text-white rounded px-2 py-1 border border-gray-600 focus:outline-none"
        defaultValue={i18n.language}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
