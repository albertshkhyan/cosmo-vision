import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import Menu from './Menu';

const Header: FC = () => {
  const { t } = useTranslation();

  return (
    <header className="p-4 bg-gray-800 shadow-md flex justify-between items-center dark:bg-gray-100">
      <h1 className="text-2xl font-bold dark:text-black">{t('header.title')}</h1>
      <Menu />
    </header>
  );
};

export default Header;
