import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
// import InputGroup from "../../components/form/form-elements/InputGroup";
import InputGroupModif from "../../components/form/form-elements/InputGroupModif";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents";
import RadioButtons from "../../components/form/form-elements/RadioButtons";
import ToggleSwitch from "../../components/form/form-elements/ToggleSwitch";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import InputStates from "../../components/form/form-elements/InputStates";
import PageMeta from "../../components/common/PageMeta";
import InputGroupModifMail from "../../components/form/form-elements/InputGroupModifMail";
import DefaultInputsModif from "../../components/form/form-elements/DefaultInputsModif";

export default function FormElements() {
  return (
    <div>
      <PageMeta
        title="FORMS"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="From Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
          <DefaultInputsModif />
          <SelectInputs />
          <TextAreaInput />
          <InputStates />
        </div>
        <div className="space-y-6">
          <InputGroupModif />
          <InputGroupModifMail />
          <FileInputExample />
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent />
        </div>
      </div>
    </div>
  );
}
