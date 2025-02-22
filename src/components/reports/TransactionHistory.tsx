import React from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { FileDown, BarChart } from "lucide-react";
import { Button } from "../ui/button";

interface TransactionHistoryProps {
  accountName: string;
  type?: "income" | "expense" | "all";
}

const TransactionHistory = ({
  accountName,
  type = "all",
}: TransactionHistoryProps) => {
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
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-400 hover:text-white hover:bg-[#2C2D31]"
          >
            <BarChart className="h-4 w-4" />
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

      <ScrollArea className="h-[300px]">
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
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-[#2C2D31] last:border-0"
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
                  {transaction.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </Card>
  );
};

export default TransactionHistory;
