// src/components/ui/ControlPanel.tsx
import React from 'react';
import ControlItem, { ControlItemProps } from './ControlItem';

interface ControlPanelProps {
  title?: string;
  items: ControlItemProps[];
}

const ControlPanel: React.FC<ControlPanelProps> = ({ title, items }) => {
  return (
    <div className="p-4 bg-gray-800 text-white w-64 space-y-4">
      {title && <h2 className="text-lg font-bold">{title}</h2>}

      {items.map((item, i) => (
        <ControlItem key={i} {...item} />
      ))}
    </div>
  );
};

export default ControlPanel;
