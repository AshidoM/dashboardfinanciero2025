import React, { memo } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { getUserSession } from "@/lib/auth";
import {
  BarChart3,
  DollarSign,
  LogOut,
  Settings,
  Users,
  Wallet,
  Info,
  RefreshCw,
  Database,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  onNavigate?: (route: string) => void;
  onLogout?: () => void;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  route: string;
}

const NavButton = memo(
  ({
    item,
    isActive,
    onClick,
  }: {
    item: NavItem;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`w-full flex flex-col items-center gap-1 py-1.5 transition-colors ${item.route === "logout" ? "text-[#F03E3E] hover:text-red-400" : isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
    >
      <div className="p-1.5 bg-[#2C2D31] rounded-full transition-colors">
        {React.cloneElement(item.icon as React.ReactElement, {
          className: "h-4 w-4",
        })}
      </div>
      <span className="text-[8px] sm:text-[9px]">{item.label}</span>
    </button>
  ),
);

const Sidebar = ({
  className,
  onNavigate = () => {},
  onLogout = () => {},
}: SidebarProps) => {
  const navigate = useNavigate();
  const user = getUserSession();

  const navItems: NavItem[] = [
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Ingresos",
      route: "/ingresos",
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      label: "Egresos",
      route: "/egresos",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Reportes",
      route: "/reportes",
    },
    ...(user?.role === "admin"
      ? [
          {
            icon: <Users className="h-5 w-5" />,
            label: "Gestores",
            route: "/gestores",
          },
          {
            icon: <Database className="h-5 w-5" />,
            label: "Tablas",
            route: "/tablas",
          },
        ]
      : []),
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Configuración",
      route: "/configuracion",
    },
    {
      icon: <Info className="h-5 w-5" />,
      label: "Información",
      route: "/informacion",
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      label: "Actualizar",
      route: "/actualizar",
    },
    {
      icon: <LogOut className="h-5 w-5" />,
      label: "Salir",
      route: "logout",
    },
  ];

  const handleNavigate = (route: string) => {
    if (route === "logout") {
      onLogout();
      return;
    }
    navigate(route);
    onNavigate(route);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full w-16 sm:w-20 bg-[#1A1B1E] py-4",
        className,
      )}
    >
      <div className="flex-1 px-2 flex flex-col gap-1.5 pt-1">
        {navItems.map((item) => (
          <NavButton
            key={item.route}
            item={item}
            isActive={window.location.pathname === item.route}
            onClick={() => handleNavigate(item.route)}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Sidebar);
