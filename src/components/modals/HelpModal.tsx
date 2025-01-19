import { FC, ReactNode } from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
}

const HelpModal: FC<HelpModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-modal"
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          onClose();
        }
      }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="text-sm text-gray-700 dark:text-gray-300">{content}</div>

        {/* Modal Footer */}
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
