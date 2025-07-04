import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DefaultInputsModif from "../../components/form/form-elements/DefaultInputsModif";

export default function FormElementsModif() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Registro" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-6 ">
        <div className="space-y-6 xl:col-start-2 xl:col-span-4">
          <DefaultInputsModif />
        </div>
      </div>
    </div>
  );
}
