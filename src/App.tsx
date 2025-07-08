import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
// import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
// import Videos from "./pages/UiElements/Videos";
// import Images from "./pages/UiElements/Images";
// import Alerts from "./pages/UiElements/Alerts";
// import Badges from "./pages/UiElements/Badges";
// import Avatars from "./pages/UiElements/Avatars";
// import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
//import BasicTables from "./pages/Tables/BasicTables";
// import FormElements from "./pages/Forms/FormElements";
// import Blank from "./pages/Blank";
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
        {/* ✅ Rutas públicas */}
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="*" element={<NotFound />} />

        {/* 🔒 Rutas protegidas con AppLayout */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />

          {/* Forms */}
          <Route path="/registro-empresa" element={<FormElementsModif />} />
          <Route path="/registro-cocina" element={<FormElementsModifCocina />} />
          <Route path="/registro-comida" element={<FormElementsModif />} />
          <Route path="/registro-usuarios" element={<FormElementsModifUsuarios />} />

          {/* Tables */}
          {/* <Route path="/basic-tables" element={<BasicTables />} /> */}
          <Route path="/table-usuarios" element={<BasicTableOneModUsuarios />} />
          <Route path="/table-cocinas" element={<BasicTableOneModCocina/>} />
          <Route path="/table-cocinasv2" element={<BasicTableOneModCocinaV2/>} />

          {/* Charts */}
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />

          {/* Dashboards por rol */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/comercial/dashboard" element={<ComercialDashboard />} />
          <Route path="/operario/dashboard" element={<OperarioDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
