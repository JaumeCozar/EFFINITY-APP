// import { Navigate } from "react-router-dom";

// interface Props {
//   children: React.ReactNode;
// }

// const ProtectedRoute = ({ children }: Props) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/signin" />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;






// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const ProtectedRoute = () => {
//   const { user, loading } = useAuth();

//   if (loading) return <div className="text-center p-5">Cargando...</div>;
//   return user ? <Outlet /> : <Navigate to="/signin" />;
// };

// export default ProtectedRoute;





import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-5">Cargando...</div>;

  // ⛔ No hay usuario → redirige a login
  if (!user || !user.role) {
    return <Navigate to="/signin" replace />;
  }

  // ❌ Usuario logueado pero con rol incorrecto
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

