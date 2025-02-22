import React, { useState } from "react";
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
import { Progress } from "../ui/progress";
import { Check } from "lucide-react";

interface Manager {
  id: string;
  fullName: string;
  email: string;
  location: string;
}

interface DeleteManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  manager: Manager | null;
}

const DeleteManagerDialog = ({
  open,
  onOpenChange,
  manager,
}: DeleteManagerDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDelete = () => {
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
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#25262B] border-[#2C2D31] p-4">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-200">
            Eliminar Gestor
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            ¿Estás seguro de querer eliminar al gestor {manager?.fullName}? Esta
            acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isProcessing && (
          <div className="space-y-1">
            <Progress value={progress} className="h-0.5" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">
                {progress === 100 ? "Completado" : "Eliminando gestor..."}
              </span>
              {progress === 100 && (
                <div className="rounded-full p-0.5 bg-green-500/20">
                  <Check className="h-3 w-3 text-green-500" />
                </div>
              )}
            </div>
          </div>
        )}

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel
            className="h-8 bg-[#2C2D31] text-gray-200 border-0 hover:bg-[#35363b] text-sm"
            disabled={isProcessing}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="h-8 bg-red-500 hover:bg-red-600 text-sm"
            disabled={isProcessing}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteManagerDialog;
