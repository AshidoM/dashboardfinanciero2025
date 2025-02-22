import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Check, X } from "lucide-react";

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    fullName: string;
    email: string;
    role: "Administrador" | "Gestor";
    location: string;
  };
}

const UserProfileDialog = ({
  open,
  onOpenChange,
  user,
}: UserProfileDialogProps) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    location: user.location,
    password: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          onOpenChange(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <>
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
              Mi Perfil
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
              <label className="text-xs text-gray-400 block mb-1">Rol</label>
              <Input
                value={user.role}
                className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm"
                disabled
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
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Nueva Contraseña
              </label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm"
                placeholder="Dejar en blanco para mantener la actual"
                disabled={isProcessing}
              />
            </div>

            {isProcessing && (
              <div className="space-y-1">
                <Progress value={progress} className="h-0.5" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    {progress === 100 ? "Completado" : "Actualizando perfil..."}
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
                Actualizar Perfil
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="bg-[#25262B] border-[#2C2D31] p-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-200">
              Confirmar Actualización
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              ¿Estás seguro de querer actualizar tu perfil?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="h-7 bg-[#2C2D31] text-gray-200 border-0 hover:bg-[#35363b] text-sm">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} className="h-7 text-sm">
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserProfileDialog;
