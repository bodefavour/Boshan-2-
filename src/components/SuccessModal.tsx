import React from 'react';

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-black text-black dark:text-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center relative">
        <h2 className="text-2xl font-semibold mb-4">You're In!</h2>
        <p className="text-base mb-4">
          You've successfully joined Boshan's wait-list. A confirmation email has been sent to you.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-[#C07C6C] hover:bg-[#a96354] text-white rounded-xl transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;