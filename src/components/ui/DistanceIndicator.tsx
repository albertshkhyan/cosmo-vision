import React from 'react';
import useTooltip from '@hooks/useTooltip';

interface DistanceIndicatorProps {
  distance: number;
}

const DistanceIndicator: React.FC<DistanceIndicatorProps> = ({ distance }) => {
  const { tooltip, showTooltip, hideTooltip } = useTooltip();

  return (
    <div className="relative z-overlay">
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/80 dark:bg-white/80 shadow-lg rounded-lg px-6 py-2 flex items-center justify-center text-white dark:text-gray-800 backdrop-blur-sm">
        <span className="text-sm mr-2">🌌</span>
        <span className="text-sm font-medium">Distance:</span>
        <span
          className="ml-2 text-lg font-extrabold cursor-pointer"
          onMouseEnter={(e) =>
            showTooltip(
              'AU stands for Astronomical Unit, which is the average distance between Earth and the Sun (~149.6 million kilometers).',
              e
            )
          }
          onMouseLeave={hideTooltip}
        >
          {distance.toFixed(2)} AU
        </span>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-popover pointer-events-none"
          style={{
            top: tooltip.position.y - 50, // Position tooltip 50px above
            left: tooltip.position.x - 80, // Center tooltip horizontally
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default DistanceIndicator;
