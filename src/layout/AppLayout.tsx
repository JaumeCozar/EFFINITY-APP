import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import "./AppLayout.css";
const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        {/* INI Jordi SV 18/07 */}
        {/* <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div> */}
        
{/* <div className="w-full px-4 md:px-6 py-4 mx-auto" style={{ maxWidth: "clamp(0px, calc(100vw - 300px), 1160px)" }}>
  <Outlet />
</div> */}


{/* <div className="w-full px-4 md:px-6 py-4 mx-auto" style={{
  maxWidth: "1160px",
  width: "100%",
}}>
  <Outlet />
</div> */}


<div className="layout-wrapper">
  <Outlet />
</div>




        {/* FIN Jordi SV 18/07 */}
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
