import { Suspense, lazy, useEffect, useState } from "react";
import {
  useRoutes,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import routes from "tempo-routes";
import LockScreen from "./components/auth/LockScreen";
import LoginForm from "./components/auth/LoginForm";
import {
  getUserSession,
  setUserSession,
  clearUserSession,
  UserData,
} from "./lib/auth";

// Preload all major components
const preloadComponents = () => {
  const components = [
    () => import("./components/home"),
    () => import("./components/dashboard/AccountsPanel"),
    () => import("./components/expenses/ExpensesPanel"),
    () => import("./components/managers/ManagersPanel"),
    () => import("./components/configuration/ConfigurationPanel"),
    () => import("./components/update/UpdatePanel"),
    () => import("./components/information/InformationPanel"),
    () => import("./components/tables/TablesPanel"),
    () => import("./components/reports/ReportsPanel"),
  ];
  components.forEach((component) => component());
};

const Home = lazy(() => import("./components/home"));

function App() {
  const location = useLocation();
  const [showLockScreen, setShowLockScreen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(getUserSession());

  useEffect(() => {
    import("./lib/audio").then(({ playStartupSound }) => {
      playStartupSound();
    });
  }, []);

  useEffect(() => {
    preloadComponents();
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      main.style.opacity = "0";
      requestAnimationFrame(() => {
        main.style.opacity = "1";
      });
    }
  }, [location.pathname]);

  const handleLogin = (userData: UserData) => {
    setUserSession(userData);
    setUserData(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    clearUserSession();
    setUserData(null);
    setIsAuthenticated(false);
    setShowLockScreen(true);
  };

  useEffect(() => {
    const user = getUserSession();
    if (user) {
      setUserData(user);
      setIsAuthenticated(true);
      setShowLockScreen(false);
    }
  }, []);

  if (showLockScreen) {
    return (
      <div className="transition-opacity duration-300">
        <LockScreen
          onClick={() => {
            const element = document.querySelector(".animate-fade-in-up");
            if (element) {
              element.classList.add("animate-fade-out");
              setTimeout(() => setShowLockScreen(false), 300);
            }
          }}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center bg-[#1E1F23]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Cargando...</p>
          </div>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/ingresos" replace />} />
          <Route path="/ingresos" element={<Home onLogout={handleLogout} />} />
          <Route
            path="/egresos"
            element={<Home view="expenses" onLogout={handleLogout} />}
          />
          {userData?.role === "admin" && (
            <Route
              path="/gestores"
              element={<Home view="managers" onLogout={handleLogout} />}
            />
          )}
          <Route
            path="/configuracion"
            element={<Home view="configuration" onLogout={handleLogout} />}
          />
          <Route
            path="/actualizar"
            element={<Home view="update" onLogout={handleLogout} />}
          />
          <Route
            path="/informacion"
            element={<Home view="information" onLogout={handleLogout} />}
          />
          {userData?.role === "admin" && (
            <Route
              path="/tablas"
              element={<Home view="tables" onLogout={handleLogout} />}
            />
          )}
          <Route
            path="/reportes"
            element={<Home view="reports" onLogout={handleLogout} />}
          />
          <Route path="*" element={<Navigate to="/ingresos" />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
