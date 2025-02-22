import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Check, X, Download, FolderOpen, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
import TransactionHistory from "../dashboard/TransactionHistory";

interface Account {
  id: string;
  name: string;
  type: "bank" | "cash";
  balance: number;
  bankName?: string;
}

interface ExpenseFormProps {
  type: string;
  onClose: () => void;
}

const accounts: Account[] = [
  {
    id: "santander-1",
    name: "SANTANDER A 857500",
    type: "bank",
    balance: 10000,
    bankName: "Santander",
  },
  {
    id: "santander-2",
    name: "SANTANDER Jimenez Gallardo",
    type: "bank",
    balance: 10000,
    bankName: "Santander",
  },
  {
    id: "santander-3",
    name: "SANTANDER PAAE 9575",
    type: "bank",
    balance: 10000,
    bankName: "Santander",
  },
  {
    id: "santander-4",
    name: "SANTANDER Prestamo",
    type: "bank",
    balance: 10000,
    bankName: "Santander",
  },
  {
    id: "santander-5",
    name: "SANTANDER Protesis 96",
    type: "bank",
    balance: 10000,
    bankName: "Santander",
  },
  {
    id: "santander-6",
    name: "SANTANDER SEIEM 958",
    type: "bank",
    balance: 10000,
    bankName: "Santander",
  },
  {
    id: "santander-7",
    name: "SANTANDER Unidad Cultura",
    type: "bank",
    balance: 10000,
    bankName: "Santander",
  },
  {
    id: "hsbc-1",
    name: "HSBC CTA Madre",
    type: "bank",
    balance: 10000,
    bankName: "HSBC",
  },
  { id: "cash-1", name: "Efectivo Principal", type: "cash", balance: 10000 },
];

const ExpenseForm = ({ type, onClose }: ExpenseFormProps) => {
  const today = new Date();
  const mexicoDate = today.toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [formData, setFormData] = useState({
    operationNumber: "1",
    date: mexicoDate.split(",")[0],
    account: "",
    responsible: "",
    amount: "",
    description: "",
    checkNumber: "1",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const filteredAccounts = accounts.filter((account) => {
    if (type === "Salida Efectivo" || type === "Oficinas Regionales") {
      return account.type === "cash";
    }
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    setShowConfirmDialog(false);
    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setStatus("success");
          setShowPdfDialog(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handlePdfOption = (option: string) => {
    console.log("PDF option:", option);
    setShowPdfDialog(false);
    setFormData({ ...formData, responsible: "", amount: "", description: "" });
    setStatus(null);
  };

  return (
    <div className="w-full h-full bg-[#1E1F23] flex flex-col overflow-hidden">
      <header className="w-full h-10 bg-[#1E1F23] px-4 flex items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-9 w-9 mr-3 text-gray-400 hover:text-white hover:bg-[#2C2D31]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h3 className="text-lg font-medium text-gray-200">{type}</h3>
      </header>

      <div className="p-4 sm:p-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,600px] gap-4">
          <Card className="p-4 bg-[#25262B] border-0 w-full max-w-[480px] h-[370px] flex flex-col">
            <form
              onSubmit={handleSubmit}
              className="space-y-2.5 flex-1 flex flex-col"
            >
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    {type === "Cheque" ? "No. Cheque" : "No. Operación"}
                  </label>
                  <Input
                    value="1"
                    className="bg-[#2C2D31] border-0 text-gray-200 h-7 text-sm"
                    disabled
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Fecha
                  </label>
                  <Input
                    type="text"
                    value={formData.date}
                    className="bg-[#2C2D31] border-0 text-gray-200 h-7 text-sm"
                    disabled
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Cuenta de Origen
                </label>
                <Select
                  value={formData.account}
                  onValueChange={(value) =>
                    setFormData({ ...formData, account: value })
                  }
                >
                  <SelectTrigger className="bg-[#2C2D31] border-0 text-gray-200 h-7 text-sm">
                    <SelectValue placeholder="Seleccionar cuenta" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#25262B] border-[#2C2D31]">
                    {filteredAccounts.map((account) => (
                      <SelectItem
                        key={account.id}
                        value={account.id}
                        className="text-gray-200 hover:bg-[#2C2D31] focus:bg-[#2C2D31] data-[highlighted]:bg-[#2C2D31] data-[highlighted]:text-white"
                      >
                        {account.name} - ${account.balance.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Responsable
                  </label>
                  <Input
                    value={formData.responsible}
                    onChange={(e) =>
                      setFormData({ ...formData, responsible: e.target.value })
                    }
                    className="bg-[#2C2D31] border-0 text-gray-200 h-7 text-sm"
                    placeholder="Quien recibe el pago"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Monto
                  </label>
                  <Input
                    type="text"
                    inputMode="decimal"
                    value={formData.amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
                        setFormData({ ...formData, amount: value });
                      }
                    }}
                    className="bg-[#2C2D31] border-0 text-gray-200 h-7 text-sm"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Descripción
                </label>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-[#2C2D31] border-0 text-gray-200 h-7 text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Creado por
                </label>
                <Input
                  value="Bryan Anthony Gutierrez"
                  className="bg-[#2C2D31] border-0 text-gray-200 h-7 text-sm"
                  disabled
                />
              </div>

              {(isProcessing || status) && (
                <div className="space-y-1">
                  <Progress value={progress} className="h-0.5" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      {isProcessing ? "Procesando..." : "Completado"}
                    </span>
                    {status === "success" && (
                      <div className="rounded-full p-0.5 bg-green-500/20">
                        <Check className="h-3 w-3 text-green-500" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-7 text-sm mt-auto"
                disabled={isProcessing || status !== null}
              >
                Ejecutar Egreso
              </Button>
            </form>
          </Card>

          <TransactionHistory accountName={type} />
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-[#25262B] border-[#2C2D31] p-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-200">
              Confirmar Egreso
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              ¿Estás seguro de querer ejecutar este egreso por $
              {formData.amount || "0"} MXN?
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

      <Dialog open={showPdfDialog} onOpenChange={setShowPdfDialog}>
        <DialogContent className="bg-[#25262B] border-[#2C2D31] p-4 max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-gray-200 text-base">
              Guardar Comprobante PDF
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            <Button
              onClick={() => handlePdfOption("configured")}
              className="w-full h-7 text-sm bg-[#2C2D31] hover:bg-[#35363b] flex items-center gap-2"
            >
              <FolderOpen className="h-4 w-4" />
              Usar ruta configurada
            </Button>
            <Button
              onClick={() => handlePdfOption("download")}
              className="w-full h-7 text-sm bg-[#2C2D31] hover:bg-[#35363b] flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Descargar PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseForm;
