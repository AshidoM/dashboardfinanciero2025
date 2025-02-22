import React from "react";
import { Lock } from "lucide-react";

interface LockScreenProps {
  onClick: () => void;
}

const LockScreen = ({ onClick }: LockScreenProps) => {
  return (
    <div
      className="w-full h-screen bg-[#1E1F23] flex flex-col items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <div className="animate-fade-in-up flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-200 mb-6 opacity-0 animate-fade-in-up-1">
          Sistema de Control Financiero
        </h1>
        <div className="p-4 bg-[#2C2D31] rounded-full opacity-0 animate-fade-in-up-2">
          <Lock className="h-8 w-8 text-gray-400 animate-pulse" />
        </div>
        <p className="text-sm text-gray-400 mt-6 opacity-0 animate-fade-in-up-3">
          Haz clic en cualquier lugar para continuar
        </p>
      </div>
    </div>
  );
};

export default LockScreen;
