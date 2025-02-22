import React, { useState } from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Check, RefreshCw } from "lucide-react";

const UpdatePanel = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadedMB, setDownloadedMB] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [newVersion, setNewVersion] = useState("1.1.0");
  const totalMB = 135;

  const checkForUpdates = () => {
    setIsChecking(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsChecking(false);
          setHasUpdate(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const installUpdate = () => {
    setIsUpdating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return 100;
        }
        const increment = 2;
        const newProgress = prev + increment;
        setDownloadedMB((totalMB * newProgress) / 100);
        setDownloadSpeed(Math.random() * (2.5 - 1.5) + 1.5);
        return newProgress;
      });
    }, 100);
  };

  return (
    <div className="w-full h-full bg-[#1E1F23] flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-200">
            Actualizar Sistema
          </h2>
        </div>

        <Card className="p-4 bg-[#25262B] border-0 w-full max-w-[480px]">
          <div className="space-y-4">
            {!isChecking && !isUpdating && !hasUpdate && (
              <div className="space-y-4">
                <p className="text-sm text-gray-400">
                  Haz clic en el botón para buscar actualizaciones disponibles.
                </p>
                <Button
                  onClick={checkForUpdates}
                  className="w-full h-9 bg-[#2C2D31] hover:bg-[#35363b] text-white border-0 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Buscar Actualizaciones
                </Button>
              </div>
            )}

            {(isChecking || isUpdating) && (
              <div className="space-y-1">
                <Progress value={progress} className="h-1" />
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      {isChecking
                        ? "Verificando actualizaciones..."
                        : isUpdating
                          ? "Descargando y actualizando software..."
                          : ""}
                    </span>
                    {progress === 100 && (
                      <div className="rounded-full p-0.5 bg-green-500/20">
                        <Check className="h-3 w-3 text-green-500" />
                      </div>
                    )}
                  </div>
                  {isUpdating && (
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>
                        {Math.round(downloadedMB)}/{totalMB} MB
                      </span>
                      <span>{downloadSpeed.toFixed(1)} MB/s</span>
                      <span>{progress}%</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!isChecking && !isUpdating && hasUpdate && (
              <div className="space-y-4">
                <div className="p-3 bg-[#2C2D31] rounded-lg">
                  <p className="text-sm text-gray-200 mb-1">
                    Nueva versión disponible: v{newVersion}
                  </p>
                  <p className="text-xs text-gray-400">
                    Se recomienda actualizar para obtener las últimas mejoras y
                    correcciones.
                  </p>
                </div>
                <Button
                  onClick={installUpdate}
                  className="w-full h-9 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Actualizar a v{newVersion}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdatePanel;
