import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeft, FolderOpen, FileDown, Database } from "lucide-react";
import { Progress } from "../ui/progress";
import { Check, X } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const ConfigurationPanel = () => {
  const [configuredPath, setConfiguredPath] = useState("");
  const [movementsCount, setMovementsCount] = useState("150");
  const [checkNumber, setCheckNumber] = useState("20");
  const [newCheckNumber, setNewCheckNumber] = useState("");
  const [showDevOptions, setShowDevOptions] = useState(false);
  const [devPassword, setDevPassword] = useState("");
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showFormatDialog, setShowFormatDialog] = useState(false);

  // Separate states for different loading bars
  const [configProcessing, setConfigProcessing] = useState(false);
  const [configProgress, setConfigProgress] = useState(0);
  const [csvProcessing, setCsvProcessing] = useState(false);
  const [csvProgress, setCsvProgress] = useState(0);
  const [formatProcessing, setFormatProcessing] = useState(false);
  const [formatProgress, setFormatProgress] = useState(0);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleSelectPath = () => {
    setConfiguredPath("/Users/example/Documents/Egresos");
  };

  const handleSaveConfig = () => {
    setConfigProcessing(true);
    setConfigProgress(0);
    setStatus(null);

    const interval = setInterval(() => {
      setConfigProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setConfigProcessing(false);
          setStatus("success");
          setTimeout(() => setStatus(null), 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDevPassword = () => {
    if (devPassword === "1234") {
      setShowDevOptions(true);
      setShowPasswordDialog(false);
      setDevPassword("");
    } else {
      setStatus("error");
      setTimeout(() => setStatus(null), 2000);
    }
  };

  const handleDownloadAndFormat = () => {
    setCsvProcessing(true);
    setCsvProgress(0);
    setStatus(null);

    const interval = setInterval(() => {
      setCsvProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowFormatDialog(true);
          setCsvProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleConfirmFormat = () => {
    setShowFormatDialog(false);
    setFormatProcessing(true);
    setFormatProgress(0);

    const interval = setInterval(() => {
      setFormatProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFormatProcessing(false);
          setShowDevOptions(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="w-full h-full bg-[#1E1F23] flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-200">
            Configuración
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4 bg-[#25262B] border-0">
            <h3 className="text-sm font-medium text-gray-200 mb-4">
              Configuración General
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Ruta de Archivos
                </label>
                <div className="flex gap-2">
                  <Input
                    value={configuredPath}
                    className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm flex-1"
                    placeholder="Selecciona una ruta..."
                    readOnly
                  />
                  <Button
                    onClick={handleSelectPath}
                    className="h-8 px-3 bg-[#2C2D31] hover:bg-[#35363b] text-white border-0"
                  >
                    <FolderOpen className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Contador de Movimientos
                </label>
                <Input
                  value={movementsCount}
                  className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm"
                  readOnly
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Número de Cheque Actual
                </label>
                <div className="flex gap-2">
                  <Input
                    value={checkNumber}
                    className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm"
                    readOnly
                  />
                  <Input
                    type="text"
                    placeholder="Nueva numeración"
                    value={newCheckNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^\d+$/.test(value)) {
                        setNewCheckNumber(value);
                      }
                    }}
                    className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm"
                  />
                </div>
              </div>

              {(configProcessing || status) && (
                <div className="space-y-1">
                  <Progress value={configProgress} className="h-0.5" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      {configProcessing
                        ? "Guardando configuración..."
                        : status === "success"
                          ? "Configuración guardada"
                          : status === "error"
                            ? "Error: Contraseña incorrecta"
                            : ""}
                    </span>
                    {status && (
                      <div
                        className={`rounded-full p-0.5 ${status === "success" ? "bg-green-500/20" : "bg-red-500/20"}`}
                      >
                        {status === "success" ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <Button
                onClick={handleSaveConfig}
                className="w-full h-8 text-sm"
                disabled={configProcessing || csvProcessing || formatProcessing}
              >
                Guardar Configuración
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-[#25262B] border-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-200">
                Configuraciones Especiales
              </h3>
              {!showDevOptions && (
                <Button
                  variant="ghost"
                  className="h-8 text-sm text-gray-400 hover:text-white hover:bg-[#2C2D31]"
                  onClick={() => setShowPasswordDialog(true)}
                >
                  Mostrar Opciones
                </Button>
              )}
            </div>

            {showDevOptions ? (
              <div className="space-y-4">
                {(csvProcessing || formatProcessing) && (
                  <div className="space-y-1">
                    <Progress
                      value={csvProcessing ? csvProgress : formatProgress}
                      className="h-0.5"
                    />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">
                        {csvProcessing
                          ? "Descargando tablas en CSV..."
                          : formatProcessing
                            ? "Formateando base de datos..."
                            : ""}
                      </span>
                    </div>
                  </div>
                )}
                <Button
                  onClick={handleDownloadAndFormat}
                  className="w-full h-8 text-sm bg-[#2C2D31] hover:bg-[#35363b] text-white border-0 flex items-center gap-2"
                  disabled={
                    configProcessing || csvProcessing || formatProcessing
                  }
                >
                  <FileDown className="h-4 w-4" />
                  Descargar CSV y Formatear Base de Datos
                </Button>
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                Ingresa la contraseña de desarrollador para ver las opciones
                especiales.
              </p>
            )}
          </Card>
        </div>
      </div>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="bg-[#25262B] border-[#2C2D31] p-4 max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-gray-200 text-base">
              Contraseña de Desarrollador
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <Input
              type="password"
              value={devPassword}
              onChange={(e) => setDevPassword(e.target.value)}
              className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm"
              placeholder="Ingresa la contraseña"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowPasswordDialog(false);
                  setDevPassword("");
                }}
                className="h-8 text-white hover:text-white hover:bg-[#2C2D31]"
              >
                Cancelar
              </Button>
              <Button onClick={handleDevPassword} className="h-8">
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showFormatDialog} onOpenChange={setShowFormatDialog}>
        <AlertDialogContent className="bg-[#25262B] border-[#2C2D31] p-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-200">
              Formatear Base de Datos
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Los archivos CSV han sido descargados. ¿Estás seguro de querer
              formatear la base de datos? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="h-7 bg-[#2C2D31] text-gray-200 border-0 hover:bg-[#35363b] text-sm">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmFormat}
              className="h-7 text-sm bg-red-500 hover:bg-red-600"
            >
              Formatear
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ConfigurationPanel;
