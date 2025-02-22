import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Banknote } from "lucide-react";

interface AccountCardProps {
  accountName?: string;
  accountType?: "bank" | "cash";
  balance?: number;
  bankName?: string;
  onClick?: () => void;
}

const AccountCard = ({
  accountName = "My Account",
  accountType = "bank",
  balance = 1000.0,
  bankName = "Bank",
  onClick,
}: AccountCardProps) => {
  return (
    <Card
      className="group w-full h-[120px] sm:h-[150px] bg-[#25262B] shadow-lg transition-all duration-200 border-0 cursor-pointer border border-transparent hover:border-white/10 hover:text-white"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 sm:pb-2 p-2 sm:p-3">
        <CardTitle className="text-xs sm:text-sm font-medium text-gray-200 line-clamp-2">
          {accountName}
        </CardTitle>
        <div className="p-1.5 bg-[#2C2D31] rounded-full flex-shrink-0 ml-2">
          {accountType === "bank" ? (
            bankName === "Santander" ? (
              <img
                src="https://companieslogo.com/img/orig/SC-13b4ec06.png?t=1720244493"
                alt="Santander"
                className="h-4 w-4 object-contain"
              />
            ) : bankName === "HSBC" ? (
              <img
                src="https://logos-world.net/wp-content/uploads/2021/02/HSBC-Emblem.png"
                alt="HSBC"
                className="h-4 w-4 object-contain"
              />
            ) : null
          ) : (
            <Banknote className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex flex-col space-y-1">
          {accountType === "bank" && (
            <p className="text-xs text-gray-400">{bankName}</p>
          )}
          <div className="flex items-baseline space-x-1">
            <span className="text-lg font-medium text-gray-200">
              $
              {balance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-xs text-gray-400">MXN</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
