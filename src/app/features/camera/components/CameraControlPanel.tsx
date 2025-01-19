import { FC } from 'react';

import { FaSearchPlus, FaSearchMinus, FaSyncAlt } from 'react-icons/fa';

interface CameraControlPanelProps {
  onFocusChange: (target: [number, number, number], distance: number) => void;
  onZoomChange: (zoomLevel: number) => void;
  onRotationChange: (azimuthal: number, polar: number) => void;
  onReset: () => void;
  zoomLevel: number;
  rotation: [number, number];
  isVisible: boolean;
}

const CameraControlPanel: FC<CameraControlPanelProps> = ({
  onFocusChange,
  onZoomChange,
  onRotationChange,
  onReset,
  zoomLevel,
  rotation,
  isVisible,
}) => {
  return (
    <div
      className={`fixed bottom-4 right-4 bg-white/80 dark:bg-gray-900/80 shadow-lg backdrop-blur-lg rounded-lg p-4 space-y-6 text-sm font-semibold text-gray-800 dark:text-gray-100 w-80 z-popover transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
      }`}
    >
      <h3 className="text-xl font-bold">Camera Control Panel</h3>

      {/* Focus Section */}
      <div>
        <h4 className="font-semibold mb-2">Focus</h4>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded"
            onClick={() => onFocusChange([0, 0, 0], 20)} // Focus on the Sun
          >
            Sun
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded"
            onClick={() => onFocusChange([10, 0, 0], 15)} // Focus on Earth
          >
            Earth
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded"
            onClick={() => onFocusChange([15, 0, 0], 10)} // Focus on Mars
          >
            Mars
          </button>
        </div>
      </div>

      {/* Zoom Section */}
      <div>
        <h3 className="text-lg font-bold mb-2">Zoom</h3>
        <div className="flex items-center space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded"
            onClick={() => onZoomChange(Math.max(zoomLevel - 0.1, 0.1))}
          >
            <FaSearchMinus />
          </button>
          <div className="flex-1 text-center text-sm font-bold text-blue-600 dark:text-blue-400">
            {zoomLevel.toFixed(2)}x
          </div>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded"
            onClick={() => onZoomChange(Math.min(zoomLevel + 0.1, 3))}
          >
            <FaSearchPlus />
          </button>
        </div>
        <input
          type="range"
          min={0.1}
          max={3}
          step={0.1}
          value={zoomLevel}
          onChange={(e) => onZoomChange(Number(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      {/* Rotation Section */}
      <div>
        <h3 className="text-lg font-bold mb-2">Rotation</h3>
        <div className="flex justify-between items-center">
          <span className="text-sm">Azimuthal:</span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {((rotation[0] * 180) / Math.PI).toFixed(1)}°
          </span>
        </div>
        <input
          type="range"
          min={-Math.PI}
          max={Math.PI}
          step={0.1}
          value={rotation[0]}
          onChange={(e) => onRotationChange(Number(e.target.value), rotation[1])}
          className="w-full mb-2"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm">Polar:</span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {((rotation[1] * 180) / Math.PI).toFixed(1)}°
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={Math.PI}
          step={0.1}
          value={rotation[1]}
          onChange={(e) => onRotationChange(rotation[0], Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Reset Button */}
      <button
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        onClick={onReset}
      >
        <FaSyncAlt className="inline mr-2" />
        Reset
      </button>
    </div>
  );
};

export default CameraControlPanel;
