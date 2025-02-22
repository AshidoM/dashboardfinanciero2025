import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, FileDown } from "lucide-react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import TransactionHistory from "../dashboard/TransactionHistory";

interface InformativeReportProps {
  onBack: () => void;
}

const InformativeReport = ({ onBack }: InformativeReportProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
              Reporte Informativo
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
          <Card className="p-4 bg-[#25262B] border-0 h-fit space-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-2">
                Rango de Fechas
              </label>
              <div className="space-y-2">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm [color-scheme:dark]"
                  placeholder="Fecha inicial"
                />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm [color-scheme:dark]"
                  placeholder="Fecha final"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-2">
                Resumen de Cuentas
              </label>
              <div className="space-y-2">
                <div className="p-2 bg-[#2C2D31] rounded-sm">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>Santander</span>
                    <span>7 cuentas</span>
                  </div>
                  <span className="text-sm font-medium text-gray-200">
                    $70,000.00 MXN
                  </span>
                </div>
                <div className="p-2 bg-[#2C2D31] rounded-sm">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>HSBC</span>
                    <span>1 cuenta</span>
                  </div>
                  <span className="text-sm font-medium text-gray-200">
                    $10,000.00 MXN
                  </span>
                </div>
                <div className="p-2 bg-[#2C2D31] rounded-sm">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>Efectivo</span>
                    <span>1 cuenta</span>
                  </div>
                  <span className="text-sm font-medium text-gray-200">
                    $10,000.00 MXN
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <TransactionHistory accountName="Reporte Informativo" />
        </div>
      </div>
    </div>
  );
};

export default InformativeReport;
