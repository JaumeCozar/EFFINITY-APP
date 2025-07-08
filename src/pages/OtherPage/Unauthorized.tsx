import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function Unauthorized() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    if (!user || !user.role) {
      navigate("/signin");
      return;
    }

    switch (user.role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "comercial":
        navigate("/comercial/dashboard");
        break;
      case "operario":
        navigate("/operario/dashboard");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-center">
      <h1 className="text-2xl font-semibold text-red-600">
        ❌ No tienes permiso para acceder a esta página.
      </h1>

      <button
        onClick={handleBack}
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
      >
        Volver al inicio
      </button>
    </div>
  );
}
