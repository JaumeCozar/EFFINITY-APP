import { useState, useEffect } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import ComponentCard from "../../common/ComponentCard";
import Label from "../../form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "react-select";
import { EnvelopeIcon } from "../../../icons";
import usuarioData from "../../../components/form/form-elements/usuarios.json";
import Swal from 'sweetalert2';
import Badge from "../../ui/badge/Badge";
import { ToastContainer, toast, Bounce } from 'react-toastify';

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

interface User {
  id: string;
  image: string;
  nombre: string;
  email: string;
  telefono: string;
  contrasena: string;
  rol: string;
  estado: string;
  ubicacion: string;
}

export default function BasicTableOneModUsuarios() {
  
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpen2,
    openModal: openModal2,
    closeModal: closeModal2,
  } = useModal();

  const handleSave = () => {

    console.log("Saving changes...");
    closeModal();
  };

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


    
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded",
      cancelButton: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
    },
    buttonsStyling: false
  });
  
  const handleDelete = () => {
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        toast.info("No se ha borrado el usuario");
      }
    });
  };

  return (
    <>

      <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/>

      <div className="flex justify-end mb-4">
        <Button
          className="bg-blue-500 opacity-80 hover:bg-blue-600 text-white"
          size="sm"
          onClick={() => {
            openModal2();
          }}
        >
          Añadir Usuario
        </Button>
      </div>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {usuarioData.map((user, id) => (
          <div
            key={id}
            className="flex flex-col items-center bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.05] rounded-xl p-6 shadow-sm"
          >
            {/* Imagen */}
            <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-gray-200 dark:border-white/[0.08]">
              <img
                width={80}
                height={80}
                src={user.image}
                alt={user.nombre}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Nombre, Rol, Correo y Teléfono */}
            <div className="text-center mb-2">
              <span className="block font-semibold text-gray-800 text-xl dark:text-white/90">
                {user.nombre}
              </span>
              <span
                className={
                  "block text-base font-medium mt-1 " +
                  (user.rol === "Admin"
                    ? "text-purple-400"
                    : user.rol === "Operario"
                    ? "text-blue-400"
                    : user.rol === "Comercial"
                    ? "text-yellow-400"
                    : "text-gray-500 dark:text-gray-400")
                }
              >
                {user.rol}
              </span>
              <span className="block text-gray-500 text-base dark:text-gray-400 font-medium mt-2">
                📧 {user.email}
              </span>
              <span className="block text-gray-500 text-base dark:text-gray-400 font-medium">
                📞 {user.telefono}
              </span>
            </div>
            {/* Estado */}
            <div className="mb-2">
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
            </div>
            {/* Ubicación */}
            <div className="mb-4 text-gray-500 text-sm dark:text-gray-400">
              {user.ubicacion}
            </div>
            {/* Botones */}
            <div className="flex gap-3 mt-auto">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelectedUser(user);
                  openModal();
                }}
                className="flex items-center gap-2"
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
                Editar
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleDelete}
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="-48 0 512 512"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="m208 416c8.835938 0 16-7.164062 16-16v-128c0-8.835938-7.164062-16-16-16s-16 7.164062-16 16v128c0 8.835938 7.164062 16 16 16zm0 0"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="m272 416c8.835938 0 16-7.164062 16-16v-128c0-8.835938-7.164062-16-16-16s-16 7.164062-16 16v128c0 8.835938 7.164062 16 16 16zm0 0"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="m144 416c8.835938 0 16-7.164062 16-16v-128c0-8.835938-7.164062-16-16-16s-16 7.164062-16 16v128c0 8.835938 7.164062 16 16 16zm0 0"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="m368 64h-96v-48c0-8.835938-7.164062-16-16-16h-96c-8.835938 0-16 7.164062-16 16v48h-96c-26.5.027344-47.9726562 21.5-48 48v32c.0351562 20.316406 12.847656 38.417969 32 45.199219v274.800781c.027344 26.5 21.5 47.972656 48 48h256c26.5-.027344 47.972656-21.5 48-48v-274.800781c19.152344-6.78125 31.964844-24.882813 32-45.199219v-32c-.027344-26.5-21.5-47.972656-48-48zm-192-32h64v32h-64zm176 432c0 8.835938-7.164062 16-16 16h-256c-8.835938 0-16-7.164062-16-16v-272h288zm32-320c0 8.835938-7.164062 16-16 16h-320c-8.835938 0-16-7.164062-16-16v-32c0-8.835938 7.164062-16 16-16h320c8.835938 0 16 7.164062 16 16zm0 0"
                    fill=""
                  />
                </svg>
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        {" "}
        {/*Primer Modal*/}
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
                  } 
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
                  }
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
                Guardar
              </Button>
            </div>
          </ComponentCard>
        </div>
      </Modal>

      <Modal
        isOpen={isOpen2}
        onClose={closeModal2}
        className="max-w-[700px] m-4"
      >
        {" "}
        {/*Segundo Modal*/}
        <div className="relative w-full max-h-[90vh] p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <ComponentCard title="Datos">
            <div className="space-y-6">
              <div>
                <Label htmlFor="inputOne">Nombre Completo</Label>
                <Input type="text" id="inputOne" placeholder="Paco de Lucia" />
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

              {/*
              <div>
                <Label>Contraseña</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder=""
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
                <Input
                  type="text"
                  id="inputTwo"
                  placeholder="Nombre de la Cocina"
                />
              </div>

              <div>
                <Label>Rol</Label>
                <Select
                  options={optionsRol}
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
                Guardar
              </Button>
            </div>
          </ComponentCard>
        </div>
      </Modal>
    </>
  );
}
