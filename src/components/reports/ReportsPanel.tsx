import React, { useState } from "react";
import GeneralReport from "./GeneralReport";
import IncomeReport from "./IncomeReport";
import ExpenseReport from "./ExpenseReport";
import SpecialReport from "./SpecialReport";
import MonthlyReport from "./MonthlyReport";
import InformativeReport from "./InformativeReport";
import { Card } from "../ui/card";
import {
  FileText,
  FileBarChart,
  FileSearch,
  Calendar,
  FileOutput,
  Info,
} from "lucide-react";

const ReportsPanel = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  if (selectedReport === "Reporte General") {
    return <GeneralReport onBack={() => setSelectedReport(null)} />;
  } else if (selectedReport === "Reporte Ingresos") {
    return <IncomeReport onBack={() => setSelectedReport(null)} />;
  } else if (selectedReport === "Reporte de Egresos") {
    return <ExpenseReport onBack={() => setSelectedReport(null)} />;
  } else if (selectedReport === "Reporte Especial") {
    return <SpecialReport onBack={() => setSelectedReport(null)} />;
  } else if (selectedReport === "Reporte Mensual") {
    return <MonthlyReport onBack={() => setSelectedReport(null)} />;
  } else if (selectedReport === "Reporte Informativo") {
    return <InformativeReport onBack={() => setSelectedReport(null)} />;
  }

  const reports = [
    { name: "Reporte General", icon: <FileText className="h-5 w-5" /> },
    { name: "Reporte Ingresos", icon: <FileBarChart className="h-5 w-5" /> },
    { name: "Reporte Especial", icon: <FileSearch className="h-5 w-5" /> },
    { name: "Reporte Mensual", icon: <Calendar className="h-5 w-5" /> },
    { name: "Reporte de Egresos", icon: <FileOutput className="h-5 w-5" /> },
    { name: "Reporte Informativo", icon: <Info className="h-5 w-5" /> },
  ];

  return (
    <div className="w-full h-full bg-[#1E1F23] flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-200">
            Reportes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <Card
              key={report.name}
              className="group w-full h-[100px] bg-[#25262B] shadow-lg transition-all duration-200 border-0 cursor-pointer border border-transparent hover:border-white/10 hover:text-white p-4 flex flex-col justify-center items-center gap-2"
              onClick={() => setSelectedReport(report.name)}
            >
              <div className="p-2 bg-[#2C2D31] rounded-full group-hover:bg-[#35363b] transition-colors">
                {React.cloneElement(report.icon as React.ReactElement, {
                  className:
                    "h-5 w-5 text-gray-400 group-hover:text-white transition-colors",
                })}
              </div>
              <span className="text-sm font-medium text-white transition-colors">
                {report.name}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPanel;
