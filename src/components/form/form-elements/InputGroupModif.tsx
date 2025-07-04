import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import PhoneInput from "../group-input/PhoneInput";

export default function InputGroupModif() {
  const countries = [
    { code: "US", label: "+1" },
    { code: "ES", label: "+34" },
    { code: "FR", label: "+33" },
    { code: "PT", label: "+351" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };
  return (
    <ComponentCard title="Input Group">
      <div className="space-y-6">
        <div>
          <Label>Phone</Label>
          <PhoneInput
            selectPosition="end"
            countries={countries}
            placeholder="+1 (555) 000-0000"
            onChange={handlePhoneNumberChange}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
