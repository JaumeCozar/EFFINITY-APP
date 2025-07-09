import { Link } from "react-router-dom";


export default function Unauthorized() {



  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-center">
      <h1 className="text-2xl font-semibold text-red-600">
        ❌ No tienes permiso para acceder a esta página.
      </h1>

      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
