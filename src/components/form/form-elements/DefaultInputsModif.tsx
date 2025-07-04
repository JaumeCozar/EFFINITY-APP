
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import PhoneInput from "../group-input/PhoneInput";
import { EnvelopeIcon } from "../../../icons";

import DatePicker from "../date-picker.tsx";
import Button from "../../ui/button/Button.tsx";

export default function DefaultInputsModif() {
  
  const options = [
    { value: "hotel", label: "Hotel" },
    { value: "restaurante", label: "Restaurante" },
    { value: "bar", label: "Bar" },
  ];

  const optionsPais = [
    { value: "usa", label: "Estados Unidos" },
    { value: "es", label: "España" },
    { value: "fr", label: "Francia" },
    { value: "pt", label: "Portugal" },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };


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
    <ComponentCard title="Datos">
      <div className="space-y-6">
        <div>
          <Label htmlFor="inputTwo">Nombre Completo</Label>
          <Input type="text" id="inputTwo" placeholder="Paco de Lucia" />
        </div>

        <div>
          <Label>Pais</Label>
          <Select
            options={optionsPais}
            placeholder="Selecciona una opcion"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>

        <div>
          <Label htmlFor="inputTwo">Direccion</Label>
          <Input type="text" id="inputTwo" placeholder="Calle Tarragona 555" />
        </div>

        <div>
          <Label htmlFor="inputTwo">NIF</Label>
          <Input type="text" id="inputTwo" placeholder="Y66688855M" />
        </div>

        <div>
          <Label>Telefono</Label>
          <PhoneInput
            selectPosition="end"
            countries={countries}
            placeholder="+1 (555) 000-0000"
            onChange={handlePhoneNumberChange}
          />
        </div>

        <div>
          <Label>Email</Label>
          <div className="relative">
            <Input
              placeholder="info@gmail.com"
              type="text"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6" />
            </span>
          </div>
        </div>

        <div>
          <DatePicker
            id="date-picker"
            label="Fecha de Alta"
            placeholder="Selecciona una fecha"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div>

        <div>
          <Label>Sector</Label>
          <Select
            options={options}
            placeholder="Selecciona una opcion"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>

        <Button size="md">Enviar</Button>
      </div>
    </ComponentCard>
  );
}
