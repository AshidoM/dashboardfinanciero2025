import React from "react";
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

interface Account {
  id: string;
  name: string;
  type: "bank" | "cash";
  balance: number;
  bankName?: string;
}

const accounts: Account[] = [
  // Santander accounts
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
  // HSBC accounts
  {
    id: "hsbc-1",
    name: "HSBC CTA Madre",
    type: "bank",
    balance: 10000,
    bankName: "HSBC",
  },
  {
    id: "hsbc-2",
    name: "HSBC Cuenta Secundaria",
    type: "bank",
    balance: 15000,
    bankName: "HSBC",
  },
  {
    id: "hsbc-3",
    name: "HSBC Inversiones",
    type: "bank",
    balance: 25000,
    bankName: "HSBC",
  },
  // Cash accounts
  { id: "cash-1", name: "Efectivo Principal", type: "cash", balance: 10000 },
  { id: "cash-2", name: "Efectivo Secundario", type: "cash", balance: 5000 },
  { id: "cash-3", name: "Caja Chica", type: "cash", balance: 2000 },
];

interface IncomeReportProps {
  onBack: () => void;
}

const IncomeReport = ({ onBack }: IncomeReportProps) => {
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
              Reporte de Ingresos
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
          <Card className="p-4 bg-[#25262B] border-0 h-fit">
            <label className="text-xs text-gray-400 block mb-2">
              Seleccionar Cuenta
            </label>
            <Select>
              <SelectTrigger className="bg-[#2C2D31] border-0 text-gray-200">
                <SelectValue placeholder="Todas las cuentas" />
              </SelectTrigger>
              <SelectContent className="bg-[#25262B] border-[#2C2D31]">
                <SelectItem
                  value="all"
                  className="text-white hover:bg-[#2C2D31] focus:bg-[#2C2D31] data-[highlighted]:text-white"
                >
                  Todas las cuentas
                </SelectItem>
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

          <TransactionHistory accountName="Reporte de Ingresos" type="income" />
        </div>
      </div>
    </div>
  );
};

export default IncomeReport;
