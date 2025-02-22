import React, { useState } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { FileDown, BarChart, Calendar, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface TransactionHistoryProps {
  accountName: string;
  type?: "income" | "expense" | "all";
}

const TransactionHistory = ({
  accountName,
  type = "all",
}: TransactionHistoryProps) => {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Mock transactions data filtered by type
  const transactions = Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
    type:
      type === "income"
        ? "ingreso"
        : type === "expense"
          ? "egreso"
          : i % 2 === 0
            ? "ingreso"
            : "egreso",
    amount: Math.floor(Math.random() * 10000) + 1000,
    description:
      type === "income" || (type === "all" && i % 2 === 0)
        ? ["Depósito", "Transferencia", "Reembolso", "Consultoría", "Proyecto"][
            Math.floor(Math.random() * 5)
          ]
        : ["Servicios", "Materiales", "Mantenimiento", "Suministros", "Gastos"][
            Math.floor(Math.random() * 5)
          ],
    date: new Date(2024, 2, 25 - i).toISOString().split("T")[0],
    user: "Bryan",
    responsible: "Juan Pérez",
    operationNumber: Math.floor(Math.random() * 1000000).toString(),
  })).filter((t) => {
    if (type === "income") return t.type === "ingreso";
    if (type === "expense") return t.type === "egreso";
    return true;
  });

  const totals = {
    ingresos: transactions
      .filter((t) => t.type === "ingreso")
      .reduce((sum, t) => sum + t.amount, 0),
    egresos: transactions
      .filter((t) => t.type === "egreso")
      .reduce((sum, t) => sum + t.amount, 0),
  };

  // Prepare data for the chart
  const chartData = transactions
    .reduce((acc: any[], transaction) => {
      const existingDay = acc.find((d) => d.date === transaction.date);
      if (existingDay) {
        if (transaction.type === "ingreso") {
          existingDay.ingresos =
            (existingDay.ingresos || 0) + transaction.amount;
        } else {
          existingDay.egresos = (existingDay.egresos || 0) + transaction.amount;
        }
      } else {
        acc.push({
          date: transaction.date,
          ingresos: transaction.type === "ingreso" ? transaction.amount : 0,
          egresos: transaction.type === "egreso" ? transaction.amount : 0,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Card className="p-4 bg-[#25262B] border-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium text-gray-200">
            Historial de{" "}
            {type === "income"
              ? "Ingresos"
              : type === "expense"
                ? "Egresos"
                : "Movimientos"}
          </h3>
          <span className="text-sm text-gray-400">
            Balance:{" "}
            <span className="text-blue-500">
              ${(totals.ingresos - totals.egresos).toLocaleString()}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-gray-400 hover:text-white hover:bg-[#2C2D31]"
              >
                <BarChart className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#25262B] border-[#2C2D31] p-4 max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-gray-200 text-base">
                  Gráfica de Movimientos
                </DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-4 mb-4">
                {(type === "all" || type === "income") && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-200">Ingresos</span>
                  </div>
                )}
                {(type === "all" || type === "expense") && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-sm text-gray-200">Egresos</span>
                  </div>
                )}
              </div>
              <div className="h-[300px] bg-[#2C2D31] rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "#2C2D31",
                        border: "none",
                        borderRadius: "8px",
                      }}
                      itemStyle={{ color: "#E5E7EB" }}
                      labelStyle={{ color: "#9CA3AF" }}
                    />
                    {(type === "all" || type === "income") && (
                      <Line
                        type="monotone"
                        dataKey="ingresos"
                        name="Ingresos"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={{ fill: "#2C2D31", strokeWidth: 2 }}
                      />
                    )}
                    {(type === "all" || type === "expense") && (
                      <Line
                        type="monotone"
                        dataKey="egresos"
                        name="Egresos"
                        stroke="#EF4444"
                        strokeWidth={2}
                        dot={{ fill: "#2C2D31", strokeWidth: 2 }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDateFilter(true)}
            className="h-7 w-7 bg-[#2C2D31] text-white hover:bg-[#35363b]"
          >
            <Calendar className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-400 hover:text-white hover:bg-[#2C2D31]"
          >
            <FileDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        {(type === "all" || type === "income") && (
          <div className="flex-1 bg-[#2C2D31] rounded-sm p-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] text-gray-400 block">Ingresos</span>
            </div>
            <span className="text-xs font-medium text-green-500">
              ${totals.ingresos.toLocaleString()}
            </span>
          </div>
        )}
        {(type === "all" || type === "expense") && (
          <div className="flex-1 bg-[#2C2D31] rounded-sm p-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-[10px] text-gray-400 block">Egresos</span>
            </div>
            <span className="text-xs font-medium text-red-500">
              ${totals.egresos.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      <ScrollArea className="h-[200px]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2C2D31]">
              <th className="text-left py-2 text-xs font-medium text-gray-400">
                Tipo
              </th>
              <th className="text-left py-2 text-xs font-medium text-gray-400">
                Monto
              </th>
              <th className="text-left py-2 text-xs font-medium text-gray-400">
                Descripción
              </th>
              <th className="text-left py-2 text-xs font-medium text-gray-400">
                Usuario
              </th>
              <th className="text-left py-2 text-xs font-medium text-gray-400">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-[#2C2D31] last:border-0 cursor-pointer hover:bg-[#2C2D31] transition-colors"
                onClick={() => setSelectedTransaction(transaction)}
              >
                <td className="py-2 text-sm">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${transaction.type === "ingreso" ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <span
                      className={
                        transaction.type === "ingreso"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {transaction.type === "ingreso" ? "Ingreso" : "Egreso"}
                    </span>
                  </div>
                </td>
                <td className="py-2 text-sm text-gray-200">
                  ${transaction.amount.toLocaleString()}
                </td>
                <td className="py-2 text-sm text-gray-200">
                  {transaction.description}
                </td>
                <td className="py-2 text-sm text-gray-200">
                  {transaction.user}
                </td>
                <td className="py-2 text-sm text-gray-200">
                  {transaction.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>

      <Dialog open={showDateFilter} onOpenChange={setShowDateFilter}>
        <DialogContent className="bg-[#25262B] border-[#2C2D31] p-4 max-w-[400px]">
          <button
            onClick={() => setShowDateFilter(false)}
            className="absolute right-4 top-4 text-white hover:text-gray-400 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogHeader>
            <DialogTitle className="text-gray-200 text-base">
              Filtrar por Fecha
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Desde</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Hasta</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-[#2C2D31] border-0 text-gray-200 h-8 text-sm [color-scheme:dark]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setShowDateFilter(false)}
                className="h-8 text-white hover:text-white hover:bg-[#2C2D31]"
              >
                Cancelar
              </Button>
              <Button onClick={() => setShowDateFilter(false)} className="h-8">
                Aplicar Filtro
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedTransaction}
        onOpenChange={() => setSelectedTransaction(null)}
      >
        <DialogContent className="bg-[#25262B] border-[#2C2D31] p-4 max-w-[400px]">
          <button
            onClick={() => setSelectedTransaction(null)}
            className="absolute right-4 top-4 text-white hover:text-gray-400 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogHeader>
            <DialogTitle className="text-gray-200 text-base">
              Detalles del Movimiento
            </DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Tipo</label>
                <p className="text-sm text-gray-200">
                  {selectedTransaction.type === "ingreso"
                    ? "Ingreso"
                    : "Egreso"}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Monto
                </label>
                <p className="text-sm text-gray-200">
                  ${selectedTransaction.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Descripción
                </label>
                <p className="text-sm text-gray-200">
                  {selectedTransaction.description}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Usuario
                </label>
                <p className="text-sm text-gray-200">
                  {selectedTransaction.user}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Responsable
                </label>
                <p className="text-sm text-gray-200">
                  {selectedTransaction.responsible || "No especificado"}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  {selectedTransaction.type === "ingreso"
                    ? "No. Operación"
                    : "No. Cheque"}
                </label>
                <p className="text-sm text-gray-200">
                  {selectedTransaction.operationNumber || "No especificado"}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Fecha
                </label>
                <p className="text-sm text-gray-200">
                  {selectedTransaction.date}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TransactionHistory;
