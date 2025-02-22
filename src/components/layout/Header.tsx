import React, { useState, useEffect } from "react";
import { getUserSession } from "@/lib/auth";
import UserProfileDialog from "./UserProfileDialog";

interface HeaderProps {
  selectedBank?: string | null;
}

const Header = ({ selectedBank }: HeaderProps) => {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const user = getUserSession();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(
        `${now.toLocaleDateString("es-MX", {
          timeZone: "America/Mexico_City",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })} ${now.toLocaleTimeString("es-MX", {
          timeZone: "America/Mexico_City",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}`,
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="h-10 bg-[#1E1F23] border-b border-[#2C2D31] px-2 sm:px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <h1 className="text-xs sm:text-sm font-medium text-gray-200 whitespace-nowrap">
            {window.location.pathname === "/reportes"
              ? "Reportes"
              : window.location.pathname === "/tablas"
                ? "Tablas"
                : window.location.pathname === "/configuracion"
                  ? "Configuración"
                  : window.location.pathname === "/informacion"
                    ? "Información"
                    : window.location.pathname === "/actualizar"
                      ? "Actualizar"
                      : selectedBank || window.location.pathname === "/egresos"
                        ? "Egresos"
                        : window.location.pathname === "/gestores"
                          ? "Gestores"
                          : "Ingresos"}
          </h1>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <h2 className="text-xs sm:text-sm font-medium text-gray-200 whitespace-nowrap hidden sm:inline">
            Sistema de Control Financiero
          </h2>
          <span className="text-gray-500 hidden md:inline">|</span>
          <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap truncate hidden md:inline max-w-[300px]">
            {currentDateTime}
          </span>
        </div>
        <button
          onClick={() => setShowProfileDialog(true)}
          className="text-xs sm:text-sm text-gray-200 hover:text-white transition-colors whitespace-nowrap"
        >
          {user?.username}
        </button>
      </header>

      <UserProfileDialog
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        user={{
          fullName: user?.username || "",
          email: user?.email || "",
          role: user?.role === "admin" ? "Administrador" : "Gestor",
          location: "México",
        }}
      />
    </>
  );
};

export default Header;
