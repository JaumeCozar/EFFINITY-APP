import { Navigate } from "react-router-dom";
import { DASHBOARD_ROUTES, AUTH_ROUTES } from "../../routes/routes";

const RedirectToDashboard = () => {
  const role = localStorage.getItem("role");

  switch (role) {
    case "admin":
      return <Navigate to={DASHBOARD_ROUTES.admin} />;
    case "comercial":
      return <Navigate to={DASHBOARD_ROUTES.comercial} />;
    case "operario":
      return <Navigate to={DASHBOARD_ROUTES.operario} />;
    default:
      return <Navigate to={AUTH_ROUTES.signin} />;
  }
};

export default RedirectToDashboard;
