import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import { MyBar } from "../../components/ecommerce/NivoChart";

export default function BarChart() {
  return (
    <div>
      <PageMeta
        title="Gráfica de barras | Effinity"
        description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Bar Chart" />
      <div className="space-y-6">
        <ComponentCard title="Bar Chart 1">
          <div className="h-96 w-full">
            <MyBar/>
          </div>
        </ComponentCard>
        {/* <ComponentCard title="Bar Nivo" className="h-96">
          
          
    
        </ComponentCard> */}
      </div>
    </div>
  );
}
