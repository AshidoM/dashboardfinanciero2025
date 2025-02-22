import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Check, X } from "lucide-react";

interface AddManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddManagerDialog = ({ open, onOpenChange }: AddManagerDialogProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    location: "",
  });

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
          setFormData({ fullName: "", email: "", password: "", location: "" });
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
            Añadir Gestor
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Nombre Completo
            </label>
            <Input
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm"
              required
              disabled={isProcessing}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Correo</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm"
              required
              disabled={isProcessing}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Contraseña
            </label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm"
              required
              disabled={isProcessing}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Ubicación
            </label>
            <Input
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
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
                  {progress === 100 ? "Completado" : "Creando gestor..."}
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
              Crear Gestor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddManagerDialog;
