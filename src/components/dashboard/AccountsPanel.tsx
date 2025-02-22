import React, { useState } from "react";
import AccountCard from "./AccountCard";
import BankPanel from "./BankPanel";

interface AccountsPanelProps {
  onBankSelect?: (bankName: string | null) => void;
}

const mainAccounts = [
  {
    id: "main-1",
    name: "Santander",
    type: "bank" as const,
    balance: 70000, // Sum of all Santander accounts (7 accounts * 10000)
    bankName: "Santander",
  },
  {
    id: "main-2",
    name: "HSBC",
    type: "bank" as const,
    balance: 10000, // Single HSBC account
    bankName: "HSBC",
  },
  {
    id: "main-3",
    name: "Efectivo",
    type: "cash" as const,
    balance: 10000, // Cash balance
  },
];

const AccountsPanel = ({ onBankSelect }: AccountsPanelProps) => {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName);
    onBankSelect?.(bankName);
  };

  const handleBack = () => {
    setSelectedBank(null);
    onBankSelect?.(null);
  };

  if (selectedBank) {
    return <BankPanel bankName={selectedBank} onBack={handleBack} />;
  }

  const totalBalance = mainAccounts.reduce(
    (sum, account) => sum + account.balance,
    0,
  );

  return (
    <div className="w-full h-full bg-[#1E1F23] flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6 overflow-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-200">
            Mis Cuentas
          </h2>
          <div className="w-full sm:w-auto bg-[#25262B] p-2 sm:p-3 rounded-lg">
            <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5 sm:mb-1">
              Balance Total
            </p>
            <p className="text-base sm:text-lg md:text-xl font-bold text-gray-200">
              $
              {totalBalance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              MXN
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {mainAccounts.map((account) => (
            <AccountCard
              key={account.id}
              accountName={account.name}
              accountType={account.type}
              balance={account.balance}
              bankName={account.bankName}
              onClick={() => handleBankSelect(account.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsPanel;
