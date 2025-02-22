import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import { Card } from "../ui/card";
import {
  CreditCard,
  Wallet,
  Users,
  Building2,
  ClipboardList,
  Landmark,
  MapPin,
  Users2,
  UserSquare2,
  Map,
  CalendarDays,
  PaintBucket,
  Building,
  Receipt,
  UserCog,
  Calculator,
} from "lucide-react";

interface ExpenseCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description?: string;
}

const expenseCategories: ExpenseCategory[] = [
  { id: "1", name: "Cheque", icon: <CreditCard className="h-5 w-5" /> },
  { id: "2", name: "Salida Efectivo", icon: <Wallet className="h-5 w-5" /> },
  { id: "3", name: "Secretaria General", icon: <Users className="h-5 w-5" /> },
  {
    id: "4",
    name: "Secretaria de Finanzas",
    icon: <Calculator className="h-5 w-5" />,
  },
  { id: "5", name: "Oficialia Mayor", icon: <Building2 className="h-5 w-5" /> },
  {
    id: "6",
    name: "Patrimonio Sindical",
    icon: <Landmark className="h-5 w-5" />,
  },
  {
    id: "7",
    name: "Oficinas Regionales",
    icon: <MapPin className="h-5 w-5" />,
  },
  { id: "8", name: "Comite Ejecutivo", icon: <Users2 className="h-5 w-5" /> },
  {
    id: "9",
    name: "Estructura Sindical",
    icon: <UserSquare2 className="h-5 w-5" />,
  },
  { id: "10", name: "Geopoliticos", icon: <Map className="h-5 w-5" /> },
  { id: "11", name: "Eventos", icon: <CalendarDays className="h-5 w-5" /> },
  {
    id: "12",
    name: "Unidad Cultural",
    icon: <PaintBucket className="h-5 w-5" />,
  },
  {
    id: "13",
    name: "Jimenez Gallardo",
    icon: <Building className="h-5 w-5" />,
  },
  { id: "14", name: "Gasto Corriente", icon: <Receipt className="h-5 w-5" /> },
  {
    id: "15",
    name: "Secretarios Regionales",
    icon: <UserCog className="h-5 w-5" />,
  },
  {
    id: "16",
    name: "Operacion Finanzas",
    icon: <ClipboardList className="h-5 w-5" />,
  },
];

const ExpensesPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="w-full h-full bg-[#1E1F23] flex flex-col overflow-hidden">
      <div
        className="p-4 sm:p-6 overflow-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#35363b transparent",
          msOverflowStyle: "none",
        }}
      >
        {selectedCategory ? (
          <ExpenseForm
            type={selectedCategory}
            onClose={() => setSelectedCategory(null)}
          />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-200">
                Categorías de Egresos
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {expenseCategories.map((category) => (
                <Card
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className="group w-full h-[100px] bg-[#25262B] shadow-lg transition-all duration-200 border-0 cursor-pointer border border-transparent hover:border-white/10 hover:text-white p-4 flex flex-col justify-center items-center gap-2"
                >
                  <div className="p-2 bg-[#2C2D31] rounded-full group-hover:bg-[#35363b] transition-colors">
                    {React.cloneElement(category.icon as React.ReactElement, {
                      className:
                        "h-5 w-5 text-gray-400 group-hover:text-white transition-colors",
                    })}
                  </div>
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                    {category.name}
                  </span>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpensesPanel;
