import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import { MyBar } from "../../components/ecommerce/NivoChart";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Admin Panel | Effinity"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* EcommerceMetrics ocupa toda la línea */}
        <div className="col-span-12">
          <EcommerceMetrics />
        </div>

        {/* MonthlySalesChart ocupa toda la línea */}
        <div className="col-span-12">
          <MonthlySalesChart />
        </div>

        {/* Nueva gráfica NivoBar */}
        <div className="col-span-12">
          <div className="h-72 w-full">
            <MyBar />
          </div>
        </div>

        {/* <div className="col-span-12">
          <StatisticsChart />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div> */}

        <div className="col-span-12 xl:col-span-12">
          <div className="flex flex-col xl:flex-row gap-6">
            {/* <div className="flex-1">
              <RecentOrders />
            </div> */}
            <div className="flex-1 min-w-[320px]">
              <DemographicCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
