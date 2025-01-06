import React from 'react';

interface SwitchProps {
  isChecked: boolean;
  onToggle: () => void;
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({ isChecked, onToggle, label }) => (
  <div className="flex items-center">
    <button
      onClick={onToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
        isChecked ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
          isChecked ? 'translate-x-6' : 'translate-x-0'
        }`}
      ></div>
    </button>
    {label && <span className="ml-3 text-white">{label}</span>}
  </div>
);

export default Switch;
