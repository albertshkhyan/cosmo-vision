import React, { useState } from 'react';

const useHelpModal = () => {
  const [isHelpOpen, setHelpOpen] = useState(false);
  const [helpContent, setHelpContent] = useState<React.ReactNode | null>(null);

  const openHelpModal = (content: React.ReactNode) => {
    setHelpContent(content);
    setHelpOpen(true);
  };

  const closeHelpModal = () => setHelpOpen(false);

  return { isHelpOpen, helpContent, openHelpModal, closeHelpModal };
};

export default useHelpModal;
