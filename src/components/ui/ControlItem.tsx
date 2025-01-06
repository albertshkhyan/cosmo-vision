import React from 'react';

/**
 * Props for a single control item, supporting multiple types (e.g., slider, range, etc.).
 */
export interface ControlItemProps {
  label: string;
  value: number; // The current value of the control
  min: number; // Minimum value
  max: number; // Maximum value
  step: number; // Step value
  onChange: (val: number) => void; // Callback to handle value changes
  type?: 'slider' | 'range'; // Control type (slider is default)
}

const ControlItem: React.FC<ControlItemProps> = ({
  label,
  value,
  type = 'slider',
  min,
  max,
  step,
  onChange,
}) => {
  const renderControl = () => {
    switch (type) {
      case 'slider':
        return (
          <input
            type="range"
            className="w-full"
            min={min}
            max={max}
            step={step}
            value={value ?? 0} // Default to 0 if value is undefined
            onChange={(e) => onChange(parseFloat(e.target.value))}
          />
        );
      case 'range':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              className="w-16 p-1 border rounded"
              min={min}
              max={max}
              step={step}
              value={value ?? 0} // Default to 0 if value is undefined
              onChange={(e) => onChange(parseFloat(e.target.value))}
            />
            <input
              type="range"
              className="flex-grow"
              min={min}
              max={max}
              step={step}
              value={value ?? 0} // Default to 0 if value is undefined
              onChange={(e) => onChange(parseFloat(e.target.value))}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold">
        {label}: {value !== undefined ? value.toFixed(2) : 'N/A'}{' '}
        {/* Fallback to "N/A" if value is undefined */}
      </label>
      {renderControl()}
    </div>
  );
};

export default ControlItem;
