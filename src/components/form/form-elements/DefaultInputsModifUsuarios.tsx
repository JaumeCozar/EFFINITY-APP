import { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "react-select"; // Importar React Select
import { EnvelopeIcon } from "../../../icons";
import Button from "../../ui/button/Button.tsx";
import usuarioData from "./usuarios.json";

export default function DefaultInputsModifUsuarios() {
  
    // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    rol: "",
    estado: "",
    ubicacion: ""
  });

  const optionsRol = [
    { value: "Admin", label: "Admin" },
    { value: "Operario", label: "Operario" },
    { value: "Comercial", label: "Comercial" },
  ];

  const optionsEstado = [
    { value: "Activo", label: "Activo" },
    { value: "Pendiente", label: "Pendiente" },
    { value: "Deshabilitado", label: "Deshabilitado" },
  ];

  // Esta función maneja el cambio de selección en el select de rol y estado
  const handleSelectChange = (value: string, field: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value, // Actualiza el campo correspondiente (rol o estado)
    }));
  };

   useEffect(() => {
  if (usuarioData && usuarioData.length > 0) {
    setFormData({
      nombre: usuarioData[0].nombre,
      email: usuarioData[0].email,
      contrasena: usuarioData[0].contrasena,
      rol: usuarioData[0].rol,
      estado: usuarioData[0].estado,
      ubicacion: usuarioData[0].ubicacion
    });
  }
}, []); 

  return (
    <ComponentCard title="Datos">
      <div className="space-y-6">
        <div>
          <Label htmlFor="inputOne">Nombre Completo</Label>
          <Input type="text" id="inputOne" placeholder="Paco de Lucia" value={formData.nombre} />
        </div>

        <div>
          <Label>Email</Label>
          <div className="relative">
            <Input
              placeholder="info@gmail.com"
              type="text"
              className="pl-[62px]"
              value={formData.email}
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6" />
            </span>
          </div>
        </div>

        {/*
        <div>
          <Label>Contraseña</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder=""
              value={formData.contrasena}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </button>
          </div>
        </div>
        */}

        <div>
          <Label htmlFor="inputTwo">Ubicacion</Label>
          <Input type="text" id="inputTwo" placeholder="Nombre de la Cocina" value={formData.ubicacion}/>
        </div>

        <div>
          <Label>Rol</Label>
          <Select
            options={optionsRol}
            value={optionsRol.find((option) => option.value === formData.rol) || null} // Asegúrate de que sea null si no se encuentra
            onChange={(selectedOption) => handleSelectChange(selectedOption ? selectedOption.value : "", "rol")}
            placeholder="Selecciona una opcion"
            
            className="dark:bg-dark-900"
            
          />
        </div>

        <div>
          <Label>Estado</Label>
          <Select
            options={optionsEstado}
            value={optionsEstado.find((option) => option.value === formData.estado) || null} // Asegúrate de que sea null si no se encuentra
            onChange={(selectedOption) => handleSelectChange(selectedOption ? selectedOption.value : "", "estado")}
            placeholder="Selecciona una opcion"
            
            className="dark:bg-dark-900"
          />
        </div>

        <Button size="md">Enviar</Button>
      </div>
    </ComponentCard>
  );
}
