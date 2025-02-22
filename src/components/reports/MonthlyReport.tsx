import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, FileDown } from "lucide-react";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TransactionHistory from "../dashboard/TransactionHistory";
import { Checkbox } from "../ui/checkbox";

interface Account {
  id: string;
  name: string;
  type: "bank" | "cash";
  balance: number;
  bankName?: string;
}

const accounts: Account[] = [
  {
    id: "all",
    name: "Todas las cuentas",
    type: "all",
    balance: 0,
  },
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

interface MonthlyReportProps {
  onBack: () => void;
}

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const MonthlyReport = ({ onBack }: MonthlyReportProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    months[new Date().getMonth()],
  );
  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);

  const getReportType = () => {
    if (showIncome && !showExpense) return "income";
    if (!showIncome && showExpense) return "expense";
    return "all";
  };

  return (
    <div className="w-full h-full bg-[#1E1F23] flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6">
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
            <h2 className="text-lg sm:text-xl font-bold text-gray-200">
              Reporte Mensual
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-[#2C2D31] bg-transparent text-white hover:bg-[#2C2D31] hover:text-white"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Guardar como Excel
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-4">
          <div className="space-y-4">
            <Card className="p-4 bg-[#25262B] border-0">
              <label className="text-xs text-gray-400 block mb-2">
                Seleccionar Cuenta
              </label>
              <Select>
                <SelectTrigger className="bg-[#2C2D31] border-0 text-gray-200">
                  <SelectValue placeholder="Todas las cuentas" />
                </SelectTrigger>
                <SelectContent className="bg-[#25262B] border-[#2C2D31]">
                  {accounts.map((account) => (
                    <SelectItem
                      key={account.id}
                      value={account.id}
                      className="text-white hover:bg-[#2C2D31] focus:bg-[#2C2D31] data-[highlighted]:text-white"
                    >
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            <Card className="p-4 bg-[#25262B] border-0">
              <label className="text-xs text-gray-400 block mb-2">
                Seleccionar Mes
              </label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="bg-[#2C2D31] border-0 text-gray-200">
                  <SelectValue placeholder="Seleccionar mes" />
                </SelectTrigger>
                <SelectContent className="bg-[#25262B] border-[#2C2D31]">
                  {months.map((month) => (
                    <SelectItem
                      key={month}
                      value={month}
                      className="text-white hover:bg-[#2C2D31] focus:bg-[#2C2D31] data-[highlighted]:text-white"
                    >
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            <Card className="p-4 bg-[#25262B] border-0">
              <label className="text-xs text-gray-400 block mb-2">
                Tipo de Movimientos
              </label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-income"
                    checked={showIncome}
                    onCheckedChange={(checked) =>
                      setShowIncome(checked as boolean)
                    }
                    className="border-[#2C2D31] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="show-income"
                    className="text-sm font-medium leading-none text-gray-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mostrar Ingresos
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-expense"
                    checked={showExpense}
                    onCheckedChange={(checked) =>
                      setShowExpense(checked as boolean)
                    }
                    className="border-[#2C2D31] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  />
                  <label
                    htmlFor="show-expense"
                    className="text-sm font-medium leading-none text-gray-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mostrar Egresos
                  </label>
                </div>
              </div>
            </Card>
          </div>

          <TransactionHistory
            accountName={`Reporte de ${selectedMonth}`}
            type={getReportType()}
          />
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;
