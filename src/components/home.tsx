import React, { useState, lazy, Suspense } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";

const AccountsPanel = lazy(() => import("./dashboard/AccountsPanel"));
const ExpensesPanel = lazy(() => import("./expenses/ExpensesPanel"));
const ManagersPanel = lazy(() => import("./managers/ManagersPanel"));
const ConfigurationPanel = lazy(
  () => import("./configuration/ConfigurationPanel"),
);
const UpdatePanel = lazy(() => import("./update/UpdatePanel"));
const InformationPanel = lazy(() => import("./information/InformationPanel"));
const TablesPanel = lazy(() => import("./tables/TablesPanel"));
const ReportsPanel = lazy(() => import("./reports/ReportsPanel"));

interface HomeProps {
  onNavigate?: (route: string) => void;
  onLogout?: () => void;
  view?:
    | "income"
    | "expenses"
    | "reports"
    | "managers"
    | "configuration"
    | "update"
    | "information"
    | "tables";
}

const Home = ({ onNavigate, onLogout, view = "income" }: HomeProps) => {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  return (
    <div className="flex h-screen w-full bg-[#1E1F23]">
      <Sidebar onNavigate={onNavigate} onLogout={onLogout} />
      <div className="flex flex-col flex-1 relative">
        <Header selectedBank={selectedBank} />
        <main className="flex-1 overflow-auto pb-12">
          <Suspense fallback={null}>
            {view === "income" ? (
              <AccountsPanel onBankSelect={setSelectedBank} />
            ) : view === "expenses" ? (
              <ExpensesPanel />
            ) : view === "managers" ? (
              <ManagersPanel />
            ) : view === "update" ? (
              <UpdatePanel />
            ) : view === "information" ? (
              <InformationPanel />
            ) : view === "tables" ? (
              <TablesPanel />
            ) : view === "reports" ? (
              <ReportsPanel />
            ) : (
              <ConfigurationPanel />
            )}
          </Suspense>
        </main>
        <div className="fixed bottom-0 left-16 sm:left-20 right-0 p-3 text-center border-t border-[#2C2D31] bg-[#1E1F23]">
          <p className="text-xs text-gray-400">Secretaría de Finanzas 24-27</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
