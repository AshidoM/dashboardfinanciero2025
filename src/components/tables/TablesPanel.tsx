import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { FileDown, Upload } from "lucide-react";

interface TableField {
  name: string;
  type: string;
}

interface TableInfo {
  name: string;
  fields: TableField[];
}

const tables: TableInfo[] = [
  {
    name: "administradores_gestores",
    fields: [
      { name: "id", type: "int" },
      { name: "nombre", type: "varchar" },
      { name: "correo", type: "varchar" },
      { name: "ubicacion", type: "varchar" },
      { name: "rol", type: "varchar" },
    ],
  },
  {
    name: "cuentas",
    fields: [
      { name: "id", type: "int" },
      { name: "nombre", type: "varchar" },
      { name: "tipo", type: "varchar" },
      { name: "banco", type: "varchar" },
      { name: "saldo", type: "decimal" },
    ],
  },
  {
    name: "movimientos",
    fields: [
      { name: "id", type: "int" },
      { name: "cuenta_id", type: "int" },
      { name: "tipo", type: "varchar" },
      { name: "subtipo", type: "varchar" },
      { name: "numero_operacion", type: "varchar" },
      { name: "responsable", type: "varchar" },
      { name: "monto", type: "decimal" },
      { name: "descripcion", type: "text" },
      { name: "fecha_movimiento", type: "timestamp" },
      { name: "usuario", type: "varchar" },
    ],
  },
];

const TablesPanel = () => {
  const [selectedTable, setSelectedTable] = useState<TableInfo | null>(null);

  return (
    <div className="w-full h-full bg-[#1E1F23] flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-200">
            Tablas del Sistema
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] gap-4 sm:gap-6">
          <Card className="p-4 bg-[#25262B] border-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-200">
                Listado de Tablas
              </h3>
            </div>
            <ScrollArea className="h-[320px]">
              <div className="space-y-1 pr-4">
                {tables.map((table) => (
                  <button
                    key={table.name}
                    onClick={() => setSelectedTable(table)}
                    className={`w-full text-left px-2 py-1.5 rounded text-sm ${selectedTable?.name === table.name ? "bg-[#2C2D31] text-white" : "text-gray-400 hover:bg-[#2C2D31]/50 hover:text-white"}`}
                  >
                    {table.name}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>

          <Card className="p-4 bg-[#25262B] border-0">
            {selectedTable ? (
              <>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <h3 className="text-sm font-medium text-gray-200">
                    Campos de {selectedTable.name}
                  </h3>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-[#2C2D31] bg-transparent text-white hover:bg-[#2C2D31] hover:text-white flex-1 sm:flex-none"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Importar CSV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-[#2C2D31] bg-transparent text-white hover:bg-[#2C2D31] hover:text-white flex-1 sm:flex-none"
                    >
                      <FileDown className="h-4 w-4 mr-2" />
                      Descargar CSV
                    </Button>
                  </div>
                </div>
                <div className="overflow-hidden rounded-md border border-[#2C2D31]">
                  <ScrollArea className="h-[320px] w-full">
                    <div className="min-w-[300px] sm:min-w-[400px]">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-[#2C2D31]">
                            <th className="text-left py-2 px-4 text-xs font-medium text-gray-400 w-1/2">
                              Campo
                            </th>
                            <th className="text-left py-2 px-4 text-xs font-medium text-gray-400 w-1/2">
                              Tipo
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTable.fields.map((field) => (
                            <tr
                              key={field.name}
                              className="border-b border-[#2C2D31] last:border-0"
                            >
                              <td className="py-2 px-4 text-sm text-gray-200">
                                {field.name}
                              </td>
                              <td className="py-2 px-4 text-sm text-gray-400">
                                {field.type}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ScrollArea>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-400">
                Selecciona una tabla para ver sus campos
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TablesPanel;
