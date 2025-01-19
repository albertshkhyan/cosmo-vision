import { FC } from 'react';

import Footer from '@common/Footer';
import Header from '@components/common/Header';
import MainContent from '@components/ui/MainContent';

const App: FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white dark:bg-gray-100 dark:text-black">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;
