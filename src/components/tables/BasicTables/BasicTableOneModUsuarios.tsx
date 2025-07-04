// import { useState} from "react";
import { useState, useEffect } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import ComponentCard from "../../common/ComponentCard";
import Label from "../../form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "react-select";
import { EnvelopeIcon } from "../../../icons";
import { EyeCloseIcon, EyeIcon } from "../../../icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import usuarioData from "../../../components/form/form-elements/usuarios.json";

import Badge from "../../ui/badge/Badge";

// interface Order {
//   id: number;
//   user: {
//     image: string;
//     name: string;
//     role: string;
//   };
//   projectName: string;
//   team: {
//     images: string[];
//   };
//   status: string;
//   budget: string;
// }

// interface User {
//   id: number;
//   image: string;
//   nombre: string;
//   email: string;
//   contrasena: string;
//   rol: string;
//   estado: string;
//   ubicacion: string;
// }

export default function BasicTableOneModUsuarios() {
  // const [formData, setFormData] = useState({
  //   id: "",
  //   image: "",
  //   nombre: "",
  //   email: "",
  //   contrasena: "",
  //   rol: "",
  //   estado: "",
  //   ubicacion: ""
  // });

  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };

  const [showPassword, setShowPassword] = useState(false);

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    rol: "",
    estado: "",
    ubicacion: "",
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

  type User = (typeof usuarioData)[0];

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        nombre: selectedUser.nombre,
        email: selectedUser.email,
        contrasena: selectedUser.contrasena,
        rol: selectedUser.rol,
        estado: selectedUser.estado,
        ubicacion: selectedUser.ubicacion,
      });
    }
  }, [selectedUser]);

  return (
    <>
      <div>
        <Button className="my-4" size="sm">Añadir Usuario</Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Usuario
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Cocina
                </TableCell>
                {/* <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Equipo
              </TableCell> */}
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Estado
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Editar
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {usuarioData.map((user, id) => (
                <TableRow key={id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={user.image}
                          alt={user.nombre}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {user.nombre}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {user.rol}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.ubicacion}
                  </TableCell>
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                    {order.team.images.map((teamImage, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                      >
                        <img
                          width={24}
                          height={24}
                          src={teamImage}
                          alt={`Team member ${index + 1}`}
                          className="w-full size-6"
                        />
                      </div>
                    ))}
                  </div>
                </TableCell> */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        user.estado === "Activo"
                          ? "success"
                          : user.estado === "Pendiente"
                          ? "warning"
                          : "error"
                      }
                    >
                      {user.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {/* {order.budget} */}
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        openModal();
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                          fill=""
                        />
                      </svg>
                      Edit
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full max-h-[90vh] p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <ComponentCard title="Datos">
            <div className="space-y-6">
              <div>
                <Label htmlFor="inputOne">Nombre Completo</Label>
                <Input
                  type="text"
                  id="inputOne"
                  placeholder="Paco de Lucia"
                  value={formData.nombre}
                />
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

              <div>
                <Label htmlFor="inputTwo">Ubicacion</Label>
                <Input
                  type="text"
                  id="inputTwo"
                  placeholder="Nombre de la Cocina"
                  value={formData.ubicacion}
                />
              </div>

              <div>
                <Label>Rol</Label>
                <Select
                  options={optionsRol}
                  value={
                    optionsRol.find(
                      (option) => option.value === formData.rol
                    ) || null
                  } // Asegúrate de que sea null si no se encuentra
                  onChange={(selectedOption) =>
                    handleSelectChange(
                      selectedOption ? selectedOption.value : "",
                      "rol"
                    )
                  }
                  placeholder="Selecciona una opcion"
                  className="dark:bg-dark-900"
                />
              </div>

              <div>
                <Label>Estado</Label>
                <Select
                  options={optionsEstado}
                  value={
                    optionsEstado.find(
                      (option) => option.value === formData.estado
                    ) || null
                  } // Asegúrate de que sea null si no se encuentra
                  onChange={(selectedOption) =>
                    handleSelectChange(
                      selectedOption ? selectedOption.value : "",
                      "estado"
                    )
                  }
                  placeholder="Selecciona una opcion"
                  className="dark:bg-dark-900"
                />
              </div>

              <Button size="md" onClick={handleSave}>
                Enviar
              </Button>
            </div>
          </ComponentCard>
        </div>
      </Modal>
    </>
  );
}
