import { useState, MouseEvent } from 'react';

interface TooltipState {
  content: string;
  visible: boolean;
  position: { x: number; y: number };
}

const useTooltip = () => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    content: '',
    visible: false,
    position: { x: 0, y: 0 },
  });

  const showTooltip = (content: string, event: MouseEvent<HTMLElement>) => {
    setTooltip({
      content,
      visible: true,
      position: { x: event.clientX, y: event.clientY },
    });
  };

  const hideTooltip = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return {
    tooltip,
    showTooltip,
    hideTooltip,
  };
};

export default useTooltip;
