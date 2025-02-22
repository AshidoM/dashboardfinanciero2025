import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Plus, MoreVertical } from "lucide-react";
import AccountCard from "./AccountCard";
import TransactionForm from "./TransactionForm";
import TransactionHistory from "./TransactionHistory";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Check, X } from "lucide-react";
import { useToast } from "../ui/use-toast";

interface AccountDetails {
  id: string;
  name: string;
  type: "bank" | "cash";
  balance: number;
  bankName?: string;
  createdAt: string;
  description: string;
}

interface BankPanelProps {
  bankName: string;
  onBack: () => void;
}

const bankAccounts: Record<string, AccountDetails[]> = {
  Santander: [
    {
      id: "1",
      name: "SANTANDER A 857500",
      type: "bank",
      balance: 10000,
      bankName: "Santander",
      createdAt: "2024-01-01",
      description: "Cuenta principal para gastos operativos",
    },
    {
      id: "2",
      name: "SANTANDER Jimenez Gallardo",
      type: "bank",
      balance: 10000,
      bankName: "Santander",
      createdAt: "2024-01-02",
      description: "Cuenta secundaria para nómina",
    },
    {
      id: "3",
      name: "SANTANDER PAAE 9575",
      type: "bank",
      balance: 10000,
      bankName: "Santander",
      createdAt: "2024-01-03",
      description: "Cuenta para inversiones",
    },
    {
      id: "4",
      name: "SANTANDER Prestamo",
      type: "bank",
      balance: 10000,
      bankName: "Santander",
      createdAt: "2024-01-04",
      description: "Cuenta para proyectos especiales",
    },
    {
      id: "5",
      name: "SANTANDER Protesis 96",
      type: "bank",
      balance: 10000,
      bankName: "Santander",
      createdAt: "2024-01-05",
      description: "Cuenta para gastos administrativos",
    },
    {
      id: "6",
      name: "SANTANDER SEIEM 958",
      type: "bank",
      balance: 10000,
      bankName: "Santander",
      createdAt: "2024-01-06",
      description: "Cuenta para reservas",
    },
    {
      id: "7",
      name: "SANTANDER Unidad Cultura",
      type: "bank",
      balance: 10000,
      bankName: "Santander",
      createdAt: "2024-01-07",
      description: "Cuenta para contingencias",
    },
  ],
  HSBC: [
    {
      id: "8",
      name: "HSBC CTA Madre",
      type: "bank",
      balance: 10000,
      bankName: "HSBC",
      createdAt: "2024-02-01",
      description: "Cuenta principal HSBC",
    },
  ],
  Efectivo: [
    {
      id: "9",
      name: "Efectivo Principal",
      type: "cash",
      balance: 10000,
      createdAt: "2024-01-01",
      description: "Caja chica para gastos menores",
    },
  ],
};

const BankPanel = ({ bankName, onBack }: BankPanelProps) => {
  const { toast } = useToast();
  const accounts = bankAccounts[bankName as keyof typeof bankAccounts] || [];
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAccountDetails, setShowAccountDetails] =
    useState<AccountDetails | null>(null);
  const [newAccount, setNewAccount] = useState({
    name: "",
    balance: "",
    description: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);

  const selectedAccountData = selectedAccount
    ? accounts.find((acc) => acc.name === selectedAccount)
    : null;

  const handleCreateAccount = () => {
    setIsCreating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCreating(false);
          toast({
            title: "Cuenta creada",
            description: "La cuenta se ha creado exitosamente.",
            className: "bg-[#2C2D31] border-[#35363b] text-gray-200",
          });
          setShowAddAccount(false);
          setNewAccount({ name: "", balance: "", description: "" });
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    console.log("Creating account:", {
      ...newAccount,
      bankName,
      type: bankName === "Efectivo" ? "cash" : "bank",
      createdAt: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="w-full h-full bg-[#1E1F23] flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-gray-400 hover:bg-[#2C2D31] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-200 truncate">
              {selectedAccount || bankName}
            </h2>
          </div>
          {!selectedAccount && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddAccount(true)}
              className="h-8 border-[#2C2D31] bg-transparent text-white hover:bg-[#2C2D31] hover:text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Añadir Cuenta
            </Button>
          )}
        </div>

        {selectedAccount ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="relative">
                <AccountCard
                  accountName={selectedAccountData?.name || ""}
                  accountType={selectedAccountData?.type || "bank"}
                  balance={selectedAccountData?.balance || 0}
                  bankName={selectedAccountData?.bankName}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-7 w-7 text-gray-400 hover:text-white hover:bg-[#2C2D31]"
                  onClick={() =>
                    setShowAccountDetails(selectedAccountData || null)
                  }
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <TransactionForm accountName={selectedAccount} />
            </div>
            <TransactionHistory accountName={selectedAccount} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {accounts.map((account) => (
              <div key={account.id} className="relative group">
                <AccountCard
                  accountName={account.name}
                  accountType={account.type}
                  balance={account.balance}
                  bankName={account.bankName}
                  onClick={() => setSelectedAccount(account.name)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-7 w-7 text-gray-400 hover:text-white hover:bg-[#2C2D31] opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAccountDetails(account);
                  }}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showAddAccount} onOpenChange={setShowAddAccount}>
        <DialogContent className="bg-[#25262B] border-[#2C2D31] p-4 max-w-[400px]">
          <button
            onClick={() => setShowAddAccount(false)}
            className="absolute right-4 top-4 text-white hover:text-gray-400 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogHeader>
            <DialogTitle className="text-gray-200 text-base">
              Añadir Cuenta de {bankName}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Nombre de la cuenta
              </label>
              <Input
                value={newAccount.name}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, name: e.target.value })
                }
                className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm"
                placeholder="Nombre de la cuenta"
                disabled={isCreating}
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Saldo Inicial
              </label>
              <Input
                type="text"
                inputMode="decimal"
                value={newAccount.balance}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
                    setNewAccount({ ...newAccount, balance: value });
                  }
                }}
                className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm"
                placeholder="0.00"
                disabled={isCreating}
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Descripción
              </label>
              <Textarea
                value={newAccount.description}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, description: e.target.value })
                }
                className="bg-[#2C2D31] border-0 text-gray-200 text-sm min-h-[80px]"
                placeholder="Descripción de la cuenta"
                disabled={isCreating}
              />
            </div>

            {isCreating && (
              <div className="space-y-1">
                <Progress value={progress} className="h-0.5" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Creando cuenta...</span>
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
                variant="ghost"
                onClick={() => setShowAddAccount(false)}
                className="h-8 hover:bg-[#2C2D31] hover:text-white"
                disabled={isCreating}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateAccount}
                className="h-8"
                disabled={!newAccount.name || !newAccount.balance || isCreating}
              >
                Crear Cuenta
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!showAccountDetails}
        onOpenChange={() => setShowAccountDetails(null)}
      >
        <DialogContent className="bg-[#25262B] border-[#2C2D31] p-4 max-w-[400px]">
          <button
            onClick={() => setShowAccountDetails(null)}
            className="absolute right-4 top-4 text-white hover:text-gray-400 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogHeader>
            <DialogTitle className="text-gray-200 text-base">
              Detalles de la Cuenta
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Nombre de la Cuenta
              </label>
              <p className="text-sm text-gray-200">
                {showAccountDetails?.name}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Banco</label>
              <p className="text-sm text-gray-200">
                {showAccountDetails?.type === "bank"
                  ? showAccountDetails.bankName
                  : "Efectivo"}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Saldo Actual
              </label>
              <p className="text-sm text-gray-200">
                ${showAccountDetails?.balance.toLocaleString()} MXN
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Fecha de Creación
              </label>
              <p className="text-sm text-gray-200">
                {showAccountDetails?.createdAt}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Descripción
              </label>
              <p className="text-sm text-gray-200">
                {showAccountDetails?.description}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BankPanel;
