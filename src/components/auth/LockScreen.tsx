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
      <h1 className="text-3xl font-bold text-gray-200 mb-6">
        Sistema de Control Financiero
      </h1>
      <div className="p-4 bg-[#2C2D31] rounded-full">
        <Lock className="h-8 w-8 text-gray-400" />
      </div>
      <p className="text-sm text-gray-400 mt-6">
        Haz clic en cualquier lugar para continuar
      </p>
    </div>
  );
};

export default LockScreen;
