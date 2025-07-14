import EcommerceMetrics from "../../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../../components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../../../components/ecommerce/MonthlyTarget";
import DemographicCard from "../../../components/ecommerce/DemographicCard";
import PageMeta from "../../../components/common/PageMeta";
import { MyBar } from "../../../components/ecommerce/NivoChart";

export default function AdminDashboard() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        {/* Nueva gráfica NivoBar: ahora ocupa toda la línea */}
        <div className="col-span-12">
          <div className="h-72 w-full">
            <MyBar />
          </div>
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          {/* Removed StatisticsChart */}
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          {/* <RecentOrders /> Eliminado porque el componente no existe */}
        </div>
      </div>
    </>
  );
}
