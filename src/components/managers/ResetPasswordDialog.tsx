import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Check, X } from "lucide-react";

interface Manager {
  id: string;
  fullName: string;
  email: string;
  location: string;
}

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  manager: Manager | null;
}

const ResetPasswordDialog = ({
  open,
  onOpenChange,
  manager,
}: ResetPasswordDialogProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          onOpenChange(false);
          setNewPassword("");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#25262B] border-[#2C2D31] p-4 max-w-[400px]">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-white hover:text-gray-400 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <DialogHeader>
          <DialogTitle className="text-gray-200 text-base">
            Reiniciar Contraseña
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Nueva Contraseña para {manager?.fullName}
            </label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm"
              required
              disabled={isProcessing}
            />
          </div>

          {isProcessing && (
            <div className="space-y-1">
              <Progress value={progress} className="h-0.5" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">
                  {progress === 100
                    ? "Completado"
                    : "Actualizando contraseña..."}
                </span>
                {progress === 100 && (
                  <div className="rounded-full p-0.5 bg-green-500/20">
                    <Check className="h-3 w-3 text-green-500" />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-8 text-white hover:text-white hover:bg-[#2C2D31]"
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button type="submit" className="h-8" disabled={isProcessing}>
              Actualizar Contraseña
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordDialog;
