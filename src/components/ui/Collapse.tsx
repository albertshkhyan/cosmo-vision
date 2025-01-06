import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CollapseProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

const Collapse: React.FC<CollapseProps> = ({ title, children, defaultCollapsed = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <div className="w-full">
      {/* Header with toggle */}
      <div
        className="text-xl font-bold text-white flex items-center justify-between cursor-pointer p-2 bg-gray-700 rounded-md hover:bg-gray-600"
        onClick={toggleCollapse}
      >
        <div>{title}</div>
        {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
      </div>

      {/* Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'
        }`}
      >
        <div className="mt-2 p-2">{children}</div>
      </div>
    </div>
  );
};

export default Collapse;
