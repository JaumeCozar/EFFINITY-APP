import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import Unauthorized from "./pages/OtherPage/Unauthorized";
import UserProfiles from "./pages/UserProfiles";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import FormElementsModif from "./pages/Forms/FormElementsModif";
import FormElementsModifCocina from "./pages/Forms/FormElementsModifCocina";
import FormElementsModifUsuarios from "./pages/Forms/FormElementsModifUsuarios";
import BasicTableOneModUsuarios from "./components/tables/BasicTables/BasicTableOneModUsuarios";
import AdminDashboard from "./pages/user_admin/dashboard/AdminDashboard";
import ComercialDashboard from "./pages/user_comercial/dashboard/ComercialDashboard";
import OperarioDashboard from "./pages/user_operario/dashboard/OperarioDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import BasicTableOneModCocina from "./components/tables/BasicTables/BasicTableOneModCocina";
import BasicTableOneModCocinaV2 from "./components/tables/BasicTables/BasicTableOneModCocinaV2";
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected: ADMIN */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<AppLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/registro-empresa" element={<FormElementsModif />} />
            <Route path="/registro-cocina" element={<FormElementsModifCocina />} />
            <Route path="/registro-usuarios" element={<FormElementsModifUsuarios />} />
            <Route path="/table-usuarios" element={<BasicTableOneModUsuarios />} />
            <Route path="/registro-comida" element={<FormElementsModif />} />
            <Route path="/table-cocinas" element={<BasicTableOneModCocina/>} />
            <Route path="/table-cocinasv2" element={<BasicTableOneModCocinaV2/>} />
            <Route path="/bar-chart" element={<BarChart />} />
            <Route path="/line-chart" element={<LineChart />} />
          </Route>
        </Route>

        {/* Protected: COMERCIAL */}
        <Route element={<ProtectedRoute allowedRoles={["comercial"]} />}>
          <Route element={<AppLayout />}>
            <Route path="/comercial/dashboard" element={<ComercialDashboard />} />
            <Route path="/registro-comida" element={<FormElementsModif />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>
        </Route>

        {/* Protected: OPERARIO */}
        <Route element={<ProtectedRoute allowedRoles={["operario"]} />}>
          <Route element={<AppLayout />}>
            <Route path="/operario/dashboard" element={<OperarioDashboard />} />
            <Route path="/line-chart" element={<LineChart />} />
          </Route>
        </Route>

        {/* Protected: compartido */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "comercial", "operario"]} />}>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/basic-tables" element={<BasicTables />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

