// src/components/SpinButton.tsx
import React from "react";

interface SpinButtonProps {
  onClick: () => void;
  isSpinning: boolean;
}

const SpinButton: React.FC<SpinButtonProps> = ({ onClick, isSpinning }) => {
  return (
    <button
      className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-400 text-white dark:text-gray-900 font-bold rounded hover:bg-green-600 dark:hover:bg-green-500 disabled:bg-gray-400"
      onClick={onClick}
      disabled={isSpinning}
    >
      {isSpinning ? "Spinning..." : "Spin the Wheel"}
    </button>
  );
};

export default SpinButton;
