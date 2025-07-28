import { useState, useEffect } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import ComponentCard from "../../common/ComponentCard";
import Label from "../../form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "react-select";
import { EnvelopeIcon } from "../../../icons";
import Swal from "sweetalert2";
import Badge from "../../ui/badge/Badge";
import { ToastContainer, toast, Bounce } from "react-toastify";
import PageMeta from "../../common/PageMeta";
import { EyeCloseIcon, EyeIcon } from "../../../icons";
interface Kitchen {
  id: number;
  name: string;
  ubi: string;
  imageUrl: string | null;
}

interface User {
  id: number;
  name: string;
  surname: string | null;
  email: string;
  password: string;
  tel: string | null;
  role: string;
  status: string | null;
  imageUrl: string | null;
  kitchen: Kitchen | null;
  kitchenId: string | number;
}

export default function BasicTableOneModUsuarios() {
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpen2,
    openModal: openModal2,
    closeModal: closeModal2,
  } = useModal();

  const handleUpdateUser = async () => {
  if (!selectedUser) return;

  try {
    const token = localStorage.getItem("token");

    // Validaciones (opcional)
    if (formData.telefono.length !== 9) {
      toast.error("El número de teléfono debe tener 9 dígitos");
      return;
    }

    // if (!formData.contrasena || formData.contrasena.length < 8) {
    //   toast.error("La contraseña debe tener al menos 8 caracteres");
    //   return;
    // }

    const response = await fetch(`http://localhost:8080/users/${selectedUser.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.nombre,
        surname: formData.apellido,
        tel: formData.telefono,
        email: formData.email,
        password: formData.contrasena,
        role: formData.rol,
        status: formData.estado,
        kitchenId: formData.kitchenId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    toast.success("Usuario actualizado correctamente");
    setUsers((prevUsers) =>
  prevUsers.map((user) =>
    user.id === selectedUser?.id
      ? { ...user, status: formData.estado }
      : user
  )
);

   
    closeModal();
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    toast.error("No se pudo actualizar el usuario");
  }
};


  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState<{
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  contrasena: string;
  rol: string;
  estado: string;
  kitchenId: string | number;
}>({
  nombre: "",
  apellido: "",
  telefono: "",
  email: "",
  contrasena: "",
  rol: "",
  estado: "",
  
  kitchenId: "", // este valor es string inicialmente
});


  const optionsRol = [
    { value: "admin", label: "Admin" },
    { value: "operario", label: "Operario" },
    { value: "comercial", label: "Comercial" },
  ];

  const optionsEstado = [
    { value: "activo", label: "Activo" },
    { value: "pendiente", label: "Pendiente" },
    { value: "deshabilitado", label: "Deshabilitado" },
  ];

  // Esta función maneja el cambio de selección en el select de rol y estado
  const handleSelectChange = (value: string, field: string) => {
    console.log(`Cambio en ${field}:`, value); // Debug JAGO
    setFormData((prevState) => ({
      ...prevState,
      [field]: value, // Actualiza el campo correspondiente (rol o estado)
    }));
  };

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        nombre: selectedUser.name || "",
        apellido: selectedUser.surname || "",
        telefono: selectedUser.tel || "",
        email: selectedUser.email,
        contrasena: selectedUser.password, // o mantenerla si decides usar contraseñas
        rol: selectedUser.role || "",
        estado: selectedUser.status || "",
       
        kitchenId: selectedUser.kitchen?.id || "",
      });
    }
  }, [selectedUser]);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded",
      cancelButton:
        "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded",
    },
    buttonsStyling: false,
  });

 const handleDelete = async (userId: number) => {
  // Mostrar la alerta de confirmación de SweetAlert2
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token"); // o desde cookies
          // Realizar la solicitud DELETE al backend usando fetch
          const response = await fetch(`http://localhost:8080/users/${userId}`, {
            method: 'DELETE',
            headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }

          });

          // Verificar si la respuesta fue exitosa
          if (response.ok) {
            // Actualizar el estado local eliminando el usuario con ese ID
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            toast.success("Usuario eliminado exitosamente");
          } else {
            // Si la respuesta no es exitosa, mostrar un mensaje de error
            toast.error("Hubo un error al eliminar el usuario");
          }
        } catch (error) {
          // Manejo de errores en caso de fallo en la solicitud
          console.error('Error al eliminar el usuario:', error);
          toast.error("Hubo un error inesperado");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.info("No se ha borrado el usuario");
      }
    });
};


  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Efecto para actualizar el estado cuando cambia localStorage (internamente)
  useEffect(() => {
    const observer = setInterval(() => {
      const current = localStorage.getItem("theme") || "light";
      setTheme((prev) => (prev !== current ? current : prev));
    }, 300); // actualiza cada 300ms

    return () => clearInterval(observer);
  }, []);

  const [users, setUsers] = useState<User[]>([]);


const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // o desde cookies

        const response = await fetch("http://localhost:8080/users", {
          headers: {
            Authorization: `Bearer ${token}`, // O según lo que tu backend espere
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
        toast.error("No se pudieron cargar los usuarios");
      }
    };


  useEffect(() => {
    fetchUsers();
  }, []);

  // 1. Estado para nuevo usuario
  const [newUserData, setNewUserData] = useState<{
    nombre: string;
    apellidos: string;
    email: string;
    contrasena: number | string;
    rol: string;
    estado: string;
    telefono: string;
    kitchenId: number | "";
  }>({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    contrasena: "",
    rol: "",
    estado: "",
    kitchenId: "",
  });

  // 2. Función para manejar cambios en inputs
 const handleNewUserChange = (field: string, value: string | number) => {
  if (field === "telefono") {
    const cleaned = value.toString().replace(/\D/g, "").slice(0, 9);
    setNewUserData((prev) => ({
      ...prev,
      [field]: cleaned,
    }));
  } else {
    setNewUserData((prev) => ({
      ...prev,
      [field]: field === "kitchenId" ? Number(value) : value,
    }));
  }
};


const handleFormDataChange = (field: string, value: string) => {
  if (field === "telefono") {
    // Solo números y máximo 9 caracteres
    const cleaned = value.replace(/\D/g, "").slice(0, 9);
    setFormData((prev) => ({
      ...prev,
      [field]: cleaned,
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "kitchenId" ? Number(value) : value,
    }));
  }
};



  // 3. Función para hacer POST y añadir usuario
  const handleAddUser = async () => {
    try {

      // Validar telefono

      if (newUserData.telefono.length !== 9) {
  toast.error("El número de teléfono debe tener 9 dígitos");
  return;
}

// Validar contraseña
    if (!newUserData.contrasena || newUserData.contrasena.toString().length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }

      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUserData.nombre,
          surname: newUserData.apellidos,
          email: newUserData.email,
          tel: newUserData.telefono,
          password: newUserData.contrasena,
          role: newUserData.rol,
          status: newUserData.estado,
          kitchenId: newUserData.kitchenId,
        }),
      });


      // const createdUser = await response.json();

      // Recargar usuarios para reflejar correctamente kitchen.name y status
await fetchUsers();

      toast.success("Usuario añadido exitosamente");
      

      // Limpiar formulario
      setNewUserData({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        contrasena: "",
        rol: "",
        estado: "",
        
        kitchenId: "",
      });
    } catch (error) {
      console.error("Error al añadir usuario:", error);
      toast.error("No se pudo añadir el usuario");
    }
    
    closeModal2(); // Cierra modal
  };

  const [kitchens, setKitchens] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/kitchens", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setKitchens(data);
      } catch (error) {
        console.error("Error cargando cocinas:", error);
        toast.error("No se pudieron cargar las cocinas");
      }
    };
    fetchKitchens();
  }, []);

  const kitchenOptions = kitchens.map((kitchen) => ({
    value: kitchen.id,
    label: kitchen.name,
  }));

  const [showPassword, setShowPassword] = useState(false);


  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Bounce}
        style={{ zIndex: 99999 }}
      />

      <PageMeta
        title="Tablas Usuarios | Effinity"
        description="Esta es la página de Panel de Calendario React.js para TailAdmin - Plantilla de Panel de Administración React.js Tailwind CSS"
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
        {users.map((user, id) => (
          <div
            key={id}
            className="flex flex-col items-center bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.05] rounded-xl p-6 shadow-sm"
          >
            {/* Imagen */}
            <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-gray-200 dark:border-white/[0.08]">
              <img
                width={80}
                height={80}
                src="./images/user/user-01.jpg"
                alt={user.name}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Nombre, Rol, Correo y Teléfono */}
            <div className="text-center mb-2">
              <span className="block font-semibold text-gray-800 text-xl dark:text-white/90">
                {user.name} {user.surname || ""}
              </span>
              <span
                className={
                  "block text-base font-medium mt-1 " +
                  (user.role === "admin"
                    ? "text-purple-400"
                    : user.role === "operario"
                    ? "text-blue-400"
                    : user.role === "comercial"
                    ? "text-yellow-400"
                    : "text-gray-500 dark:text-gray-400")
                }
              >
                {user.role.toLocaleUpperCase()}
              </span>
              <span className="block text-gray-500 text-base dark:text-gray-400 font-medium mt-2">
                📧 {user.email}
              </span>
              <span className="block text-gray-500 text-base dark:text-gray-400 font-medium">
                📞 {user.tel || "No especificado"}
              </span>
            </div>
            {/* Estado */}
            <div className="mb-2">
              <Badge
                size="sm"
                color={
                  user.status === "activo"
                    ? "success"
                    : user.status === "pendiente"
                    ? "warning"
                    : "error"
                }
              >
                {user.status || "No especificado"}
              </Badge>
            </div>
            {/* Ubicación */}
            <div className="mb-4 text-gray-500 text-sm dark:text-gray-400">
              {user.kitchen?.name || "No especificado"}
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
                onClick={() => handleDelete(user.id)} // Pasar el ID del usuario
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
                <Label htmlFor="inputOne">Nombre</Label>
                <Input
                  type="text"
                  id="inputOne"
                  placeholder="Paco de Lucia"
                  value={formData.nombre}
                  onChange={(e) => handleFormDataChange("nombre", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="inputThree">Apellido</Label>
                <Input
                  type="text"
                  id="inputThree"
                  placeholder="de Lucia"
                  value={formData.apellido}
                  onChange={(e) =>
                    handleFormDataChange("apellido", e.target.value)
                  }
                />
              </div>

              <div className="">
                <Label htmlFor="inputTel">Teléfono</Label>
                <div className="relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 pl-3 text-gray-500">
                    +34
                  </span>
                  <Input
                    type="text"
                    id="inputTel"
                    placeholder="616 565 453"
                    value={formData.telefono}
                    onChange={(e) =>
                      handleFormDataChange("telefono", e.target.value)
                    }
                    className="pl-12" // padding-left para que no se solape con el prefijo
                  />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <div className="relative">
                  <Input
                    placeholder="info@gmail.com"
                    type="text"
                    className="pl-[62px]"
                    value={formData.email}
                    onChange={(e) => handleFormDataChange("email", e.target.value)}
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <EnvelopeIcon className="size-6" />
                  </span>
                </div>
              </div>

              <div>
                <Label>Rol</Label>
                <Select
                  options={optionsRol}
                  value={
                    optionsRol.find((opt) => opt.value === formData.rol) || null
                  }
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption?.value || "", "rol")
                  }
                  placeholder="Selecciona una opción"
                  className="dark:bg-dark-900"
                />
              </div>

              <div>
                <Label>Estado</Label>
                <Select
                  options={optionsEstado}
                  value={
                    optionsEstado.find(
                      (opt) => opt.value === formData.estado
                    ) || null
                  }
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption?.value || "", "estado")
                  }
                  placeholder="Selecciona una opción"
                  className="dark:bg-dark-900"
                />
              </div>

              <div>
                <Label>Ubicacion</Label>
                <Select
    options={kitchenOptions}
    value={kitchenOptions.find((opt) => opt.value === formData.kitchenId) || null}
    onChange={(selectedOption) => {
  if (selectedOption) {
    handleFormDataChange("kitchenId", selectedOption.value.toString());
  } else {
    handleFormDataChange("kitchenId", ""); // o algún valor por defecto
  }
}}
    placeholder="Selecciona una cocina"
    className="dark:bg-dark-900"
  />



              </div>

              <Button size="md" onClick={handleUpdateUser}>
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
                <Label htmlFor="inputOne">Nombre</Label>
                <Input
                  type="text"
                  id="inputOne"
                  placeholder="Paco"
                  value={newUserData.nombre}
                  onChange={(e) =>
                    handleNewUserChange("nombre", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor="inputThree">Apellido</Label>
                <Input
                  type="text"
                  id="inputThree"
                  placeholder="de Lucia"
                  value={newUserData.apellidos}
                  onChange={(e) =>
                    handleNewUserChange("apellidos", e.target.value)
                  }
                />
              </div>

              <div className="">
                <Label htmlFor="inputTel">Teléfono</Label>
                <div className="relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 pl-3 text-gray-500">
                    +34
                  </span>
                  <Input
                    type="text"
                    id="inputTel"
                    placeholder="616 565 453"
                    value={newUserData.telefono}
                    onChange={(e) =>
                      handleNewUserChange("telefono", e.target.value)
                    }
                    className="pl-12" // padding-left para que no se solape con el prefijo
                  />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <div className="relative">
                  <Input
                    placeholder="info@gmail.com"
                    type="text"
                    className="pl-[62px]"
                    value={newUserData.email}
                    onChange={(e) =>
                      handleNewUserChange("email", e.target.value)
                    }
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
                    placeholder="Ingrese su contraseña"
                    value={newUserData.contrasena}
                    onChange={(e) =>
                      handleNewUserChange("contrasena", e.target.value)
                    }
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
                <Label>Rol</Label>
                <Select
                  options={optionsRol}
                  value={
                    optionsRol.find((opt) => opt.value === newUserData.rol) ||
                    null
                  }
                  onChange={(selectedOption) =>
                    handleNewUserChange(
                      "rol",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  placeholder="Selecciona una opción"
                  className="dark:bg-dark-900"
                />
              </div>

              <div>
                <Label>Estado</Label>
                <Select
                  options={optionsEstado}
                  value={
                    optionsEstado.find(
                      (opt) => opt.value === newUserData.estado
                    ) || null
                  }
                  onChange={(selectedOption) =>
                    handleNewUserChange(
                      "estado",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  placeholder="Selecciona una opción"
                  className="dark:bg-dark-900"
                />
              </div>

              <div>
                <Label>Ubicacion</Label>
                <Select
  options={kitchenOptions}
  value={
    kitchenOptions.find((opt) => opt.value === newUserData.kitchenId) || null
  }
  onChange={(selectedOption) => {
    handleNewUserChange("kitchenId", selectedOption?.value ?? "");
  }}
  placeholder="Selecciona una cocina"
  className="dark:bg-dark-900"
/>




              </div>

              <Button size="md" onClick={handleAddUser}>
                Guardar
              </Button>
            </div>
          </ComponentCard>
        </div>
      </Modal>
    </>
  );
}
