
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "../../ui/button/Button.tsx";

export default function DefaultInputsModifCocina() {
 
  return (
    <ComponentCard title="Datos">
      <div className="space-y-6">
        <div>
          <Label htmlFor="inputTwo">Nombre Cocina</Label>
          <Input type="text" id="inputTwo" placeholder="Que bo es" />
        </div>

        <div>
          <Label htmlFor="inputTwo">Direccion</Label>
          <Input type="text" id="inputTwo" placeholder="Calle Tarragona 555" />
        </div>

        <Button size="md">Enviar</Button>
      </div>
    </ComponentCard>
  );
}
