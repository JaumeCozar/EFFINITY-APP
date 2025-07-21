import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import { ToastContainer, Bounce } from "react-toastify";
import { useState, useEffect } from "react";
export default function UserProfiles() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  // Efecto para actualizar el estado cuando cambia localStorage (internamente)
  useEffect(() => {
    const observer = setInterval(() => {
      const current = localStorage.getItem("theme") || "light";
      setTheme((prev) => (prev !== current ? current : prev));
    }, 300); // actualiza cada 300ms

    return () => clearInterval(observer);
  }, []);

  

  return (
    <>

    <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Bounce}
      />

      <PageMeta
        title="Perfil | Effinity"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          <UserAddressCard />
        </div>
      </div>
    </>
  );
}
