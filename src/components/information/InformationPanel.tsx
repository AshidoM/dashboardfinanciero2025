import React from "react";
import { Card } from "../ui/card";

interface UpdateInfo {
  version: string;
  date: string;
  features: string[];
}

const updates: UpdateInfo[] = [
  {
    version: "1.0.0",
    date: "2024-03-25",
    features: [
      "Lanzamiento inicial del sistema",
      "Panel de ingresos con múltiples cuentas",
      "Sistema de egresos por categorías",
      "Gestión de usuarios y permisos",
    ],
  },
  {
    version: "1.1.0",
    date: "2024-03-26",
    features: [
      "Nuevo menú de navegación mejorado",
      "Sistema de reportes avanzados",
      "Mejoras en la interfaz de usuario",
      "Corrección de errores menores",
    ],
  },
  {
    version: "1.2.0",
    date: "2024-03-27",
    features: [
      "Integración con múltiples bancos",
      "Exportación de reportes a Excel",
      "Nuevo sistema de notificaciones",
      "Mejoras en el rendimiento",
    ],
  },
  {
    version: "1.3.0",
    date: "2024-03-28",
    features: [
      "Panel de administración mejorado",
      "Nuevos tipos de reportes financieros",
      "Sistema de respaldo automático",
      "Optimización de la base de datos",
    ],
  },
  {
    version: "1.4.0",
    date: "2024-03-29",
    features: [
      "Interfaz adaptativa para móviles",
      "Nuevas opciones de filtrado",
      "Mejoras en la seguridad",
      "Soporte para múltiples idiomas",
    ],
  },
];

const InformationPanel = () => {
  return (
    <div className="w-full h-full bg-[#1E1F23] flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-200">
            Información del Sistema
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 bg-[#25262B] border-0">
            <div className="flex flex-col items-center justify-center p-6 border-b border-[#2C2D31]">
              <img
                src="https://odolofjixzwxfntaveii.supabase.co/storage/v1/object/public/imagenes%20de%20equipo/LOGO/LogoICONO.png"
                alt="SocialWhite"
                className="h-16 w-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-200 mb-2">
                Sistema de Control Financiero
              </h3>
              <p className="text-sm text-gray-400 text-center">
                Desarrollado por SocialWhite
              </p>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-200 mb-3">
                Características Principales
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Control de ingresos y egresos
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Gestión de múltiples cuentas bancarias
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Sistema de reportes avanzados
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Control de usuarios y permisos
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-4 bg-[#25262B] border-0">
            <h3 className="text-sm font-medium text-gray-200 mb-4">
              Historial de Actualizaciones
            </h3>
            <div
              className="h-[400px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-[#35363b] scrollbar-track-transparent"
              style={
                {
                  scrollbarWidth: "thin",
                  scrollbarColor: "#35363b transparent",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#35363b",
                    borderRadius: "2px",
                  },
                } as React.CSSProperties
              }
            >
              {updates.map((update) => (
                <div
                  key={update.version}
                  className="p-3 bg-[#2C2D31] rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-200">
                      Versión {update.version}
                    </span>
                    <span className="text-xs text-gray-400">{update.date}</span>
                  </div>
                  <ul className="space-y-1">
                    {update.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-xs text-gray-400 flex items-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InformationPanel;
