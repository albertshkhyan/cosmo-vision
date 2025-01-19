import React from 'react';

import { FaQuestionCircle } from 'react-icons/fa';

const HelpButton: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
  <button className="mt-4 text-white flex items-center" onClick={onClick}>
    <FaQuestionCircle className="mr-2" />
    {label}
  </button>
);

export default HelpButton;
