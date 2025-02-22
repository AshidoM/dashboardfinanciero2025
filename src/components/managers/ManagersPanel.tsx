import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Pencil, KeyRound, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import AddManagerDialog from "./AddManagerDialog";
import EditManagerDialog from "./EditManagerDialog";
import ResetPasswordDialog from "./ResetPasswordDialog";
import DeleteManagerDialog from "./DeleteManagerDialog";
import { ScrollArea } from "../ui/scroll-area";

interface Manager {
  id: string;
  fullName: string;
  email: string;
  location: string;
}

const ManagersPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);

  // Mock data
  const managers: Manager[] = [
    {
      id: "1",
      fullName: "Juan Pérez",
      email: "juan@example.com",
      location: "México",
    },
    {
      id: "2",
      fullName: "Ana García",
      email: "ana@example.com",
      location: "Toluca",
    },
    // Add more mock data as needed
  ];

  const filteredManagers = managers.filter((manager) => {
    const matchesSearch =
      manager.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      !locationFilter ||
      manager.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="w-full h-full bg-[#1E1F23] flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-200">
            Gestores
          </h2>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="h-8 bg-[#2C2D31] hover:bg-[#35363b] text-white border-0 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Añadir Gestor
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <Input
            placeholder="Buscar por nombre completo o ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#2C2D31] border-0 text-gray-200"
          />
          <Input
            placeholder="Filtrar por ubicación"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-[#2C2D31] border-0 text-gray-200"
          />
        </div>

        <Card className="bg-[#25262B] border-0">
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#2C2D31]">
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">
                        ID
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">
                        Nombre Completo
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">
                        Correo
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">
                        Ubicación
                      </th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredManagers.map((manager) => (
                      <tr
                        key={manager.id}
                        className="border-b border-[#2C2D31] last:border-0"
                      >
                        <td className="py-3 px-4 text-sm text-gray-200">
                          {manager.id}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-200">
                          {manager.fullName}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-200">
                          {manager.email}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-200">
                          {manager.location}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-[#2C2D31]"
                              >
                                <span className="sr-only">Abrir menú</span>
                                <svg
                                  className="h-4 w-4 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                  />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-[160px] bg-[#25262B] border-[#2C2D31]"
                            >
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedManager(manager);
                                  setShowEditDialog(true);
                                }}
                                className="text-gray-200 focus:bg-[#2C2D31] focus:text-white"
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedManager(manager);
                                  setShowResetDialog(true);
                                }}
                                className="text-gray-200 focus:bg-[#2C2D31] focus:text-white"
                              >
                                <KeyRound className="mr-2 h-4 w-4" />
                                <span>Reiniciar Contraseña</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedManager(manager);
                                  setShowDeleteDialog(true);
                                }}
                                className="text-red-500 focus:bg-[#2C2D31] focus:text-red-500"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Eliminar</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollArea>
        </Card>
      </div>

      <AddManagerDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
      <EditManagerDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        manager={selectedManager}
      />
      <ResetPasswordDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        manager={selectedManager}
      />
      <DeleteManagerDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        manager={selectedManager}
      />
    </div>
  );
};

export default ManagersPanel;
