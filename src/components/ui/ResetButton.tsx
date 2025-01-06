import React from 'react';
import { FaRedo } from 'react-icons/fa';

const ResetButton: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
  <button
    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
    onClick={onClick}
  >
    <FaRedo className="mr-2" />
    {label}
  </button>
);

export default ResetButton;
