import React from 'react';

import Header from '@components/ui/Header';
import MainContent from '@components/ui/MainContent';
import Footer from '@components/ui/Footer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white dark:bg-gray-100 dark:text-black">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;
