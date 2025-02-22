import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Card } from "../ui/card";

interface TransactionFormProps {
  accountName: string;
}

const TransactionForm = ({ accountName }: TransactionFormProps) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow positive numbers with up to 2 decimal places
    if (
      value === "" ||
      (/^\d*\.?\d{0,2}$/.test(value) && parseFloat(value) >= 0)
    ) {
      setAmount(value);
    }
  };

  const simulateTransaction = () => {
    setIsProcessing(true);
    setProgress(0);
    setStatus(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setStatus("success");
          setTimeout(() => {
            setStatus(null);
            setAmount("");
            setDescription("");
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Card className="p-2.5 bg-[#25262B] border-0">
      <h3 className="text-sm font-medium text-gray-200 mb-2">
        Registrar Ingreso
      </h3>
      <div className="space-y-2">
        <div>
          <label className="text-xs text-gray-400 block mb-1">Monto</label>
          <Input
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
            className="bg-[#2C2D31] border-0 text-gray-200 h-7 text-sm"
            disabled={isProcessing}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Descripción
          </label>
          <Input
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-[#2C2D31] border-0 text-gray-200 h-7 text-sm"
            disabled={isProcessing}
          />
        </div>

        {(isProcessing || status) && (
          <div className="space-y-1">
            <Progress value={progress} className="h-0.5" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">
                {isProcessing
                  ? "Procesando..."
                  : status === "success"
                    ? "Completado"
                    : status === "error"
                      ? "Error"
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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="w-full h-7 text-sm"
              disabled={
                !amount || !description || isProcessing || status !== null
              }
            >
              Añadir Ingreso
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#25262B] border-[#2C2D31] p-4 max-w-[400px]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-200 text-base">
                Confirmar Ingreso
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400 text-sm">
                ¿Estás seguro de querer registrar este ingreso por $
                {parseFloat(amount || "0").toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}{" "}
                MXN?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel className="h-7 bg-[#2C2D31] text-gray-200 border-0 hover:bg-[#35363b] text-sm">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={simulateTransaction}
                className="h-7 text-sm"
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
};

export default TransactionForm;
