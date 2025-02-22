import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface LoginFormProps {
  onLogin: (userData: {
    email: string;
    role: string;
    username: string;
  }) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    setError("");

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          validateCredentials();
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const validateCredentials = () => {
    if (
      email === "admin@gmail.com" &&
      password === "1234" &&
      role === "admin"
    ) {
      onLogin({ email, role, username: "Bryan Anthony Gutierrez Orduña" });
    } else if (
      email === "gestor@gmail.com" &&
      password === "1234" &&
      role === "gestor"
    ) {
      onLogin({ email, role, username: "Anthony Grz" });
    } else {
      setError("Credenciales inválidas");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#1E1F23] flex items-center justify-center p-4">
      <Card className="w-full max-w-[400px] p-4 sm:p-6 bg-[#25262B] border-0">
        <h2 className="text-xl font-bold text-gray-200 mb-6 text-center">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Rol</label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="bg-[#2C2D31] border-0 text-gray-200">
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent className="bg-[#25262B] border-[#2C2D31]">
                <SelectItem
                  value="admin"
                  className="text-gray-200 hover:bg-[#2C2D31] hover:text-white focus:bg-[#2C2D31] focus:text-white"
                >
                  Administrador
                </SelectItem>
                <SelectItem
                  value="gestor"
                  className="text-gray-200 hover:bg-[#2C2D31] hover:text-white focus:bg-[#2C2D31] focus:text-white"
                >
                  Gestor
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Correo</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#2C2D31] border-0 text-gray-200"
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Contraseña
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#2C2D31] border-0 text-gray-200"
              required
            />
          </div>

          {(isLoading || error) && (
            <div className="space-y-1">
              {isLoading && <Progress value={progress} className="h-0.5" />}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">
                  {isLoading ? "Verificando..." : error}
                </span>
                {error && (
                  <div className="rounded-full p-0.5 bg-red-500/20">
                    <X className="h-3 w-3 text-red-500" />
                  </div>
                )}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            Iniciar Sesión
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
