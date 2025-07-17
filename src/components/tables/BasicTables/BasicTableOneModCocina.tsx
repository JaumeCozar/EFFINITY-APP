import { useState, useEffect } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import ComponentCard from "../../common/ComponentCard";
import Label from "../../form/Label";
import Input from "../../../components/form/input/InputField";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import usuarioData from "./Alimentos.json";
import Select from "react-select";
import Swal from "sweetalert2";
import tipoAlimentoData from "./TiposDeAlimentos.json";
import { ToastContainer, toast, Bounce } from "react-toastify";
// import Badge from "../../ui/badge/Badge";
import PageMeta from "../../common/PageMeta";


export default function BasicTableOneModCocina() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded",
      cancelButton:
        "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded",
    },
    buttonsStyling: false,
  });

  const handleDelete = () => {
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
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          toast.info("No se ha borrado el alimento");
          
          //Añadir aqui la tostada cuando se clickee Cancelar
        }
      });
  };

  const optionsOrder = [
    { value: "Ascendente", label: "Ascendente" },
    { value: "Descendente", label: "Descendente" },
  ];

  const handleSelectChange = (value: string, field: string) => {
    console.log(`Campo: ${field}, Valor seleccionado: ${value}`);
    // Aquí puedes actualizar el estado según el campo (rol o estado)
  };

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
    image: "",
    nombre: "",
    precio: "",
  });

  type User = (typeof usuarioData)[0];

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        image: selectedUser.image,
        nombre: selectedUser.nombre,
        precio: selectedUser.precio,
      });
    }
  }, [selectedUser]);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Efecto para actualizar el estado cuando cambia localStorage (internamente)
  useEffect(() => {
    const observer = setInterval(() => {
      const current = localStorage.getItem('theme') || 'light';
      setTheme(prev => (prev !== current ? current : prev));
    }, 300); // actualiza cada 300ms

    return () => clearInterval(observer);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Bounce}
      />
      <PageMeta
        title="Tablas Cocinas V1 | Effinity"
        description="Esta es la página de Panel de Calendario React.js para TailAdmin - Plantilla de Panel de Administración React.js Tailwind CSS"
      />
      <div className="overflow-x-hidden p-0">
        <div className="w-full xl:max-w-screen-xl mx-auto overflow-x-auto box-border">
          <div className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-2 scrollbar-hide touch-pan-x">
            {tipoAlimentoData.map((item) => (
              <button
                key={item.id}
                id={item.id}
                className="snap-center snap-always px-4 py-2 rounded whitespace-nowrap text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
                onClick={() => {
                  console.log("Has clickeado:", item.nombre);
                }}
              >
                {item.nombre}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden w-full xl:max-w-screen-xl mx-auto box-border">
          <div className="flex gap-5 my-4 max-w-full justify-around">
            <div className="flex-1">
              <Input
                type="text"
                id="inputOne"
                placeholder="Buscar"
                className="dark:bg-dark-900"
              />
            </div>
            <div className="flex-1">
              <Select
                options={optionsOrder}
                onChange={(selectedOrder: { value: string; label: string } | null) =>
                  handleSelectChange(selectedOrder?.value || "", "estado")
                }
                placeholder="Selecciona el orden"
                className="dark:bg-dark-900"
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
              />
            </div>
            <div className="flex-1">
              <Button
                className="w-full"
                size="sm"
                onClick={() => {
                  openModal2();
                }}
              >
                Añadir Alimento
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] w-full xl:max-w-screen-xl mx-auto box-border">
          <div className="w-full overflow-x-auto box-border">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Alimento
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Precio
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Editar
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-2 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Eliminar
                  </TableCell>
                </TableRow>
              </TableHeader>
              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {usuarioData.map((user, id) => (
                  <TableRow key={id}>
                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
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
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-2 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {user.precio}€ / kg
                    </TableCell>
                    <TableCell className="px-2 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
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
                    <TableCell className="px-2 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {/* {order.budget} */}
                      <button
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
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
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        {" "}
        {/*Primer Modal*/}
        <div className="relative w-full max-h-[90vh] p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <ComponentCard title="Editar Alimento">
            <div className="space-y-6">
              <div>
                <Label htmlFor="inputOne">Alimento</Label>
                <Input
                  type="text"
                  id="inputOne"
                  placeholder="Manzana/Mandarina/Arandano..."
                  value={formData.nombre}
                />
              </div>

              <div>
                <Label htmlFor="inputTwo">Precio</Label>
                <Input
                  type="text"
                  id="inputTwo"
                  placeholder="5.00€"
                  value={formData.precio}
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
          <ComponentCard title="Añadir Alimento">
            <div className="space-y-6">
              <div>
                <Label htmlFor="inputOne">Alimento</Label>
                <Input
                  type="text"
                  id="inputOne"
                  placeholder="Manzana/Mandarina/Arandano..."
                />
              </div>

              <div>
                <Label htmlFor="inputTwo">Precio</Label>
                <Input type="text" id="inputTwo" placeholder="5.00€" />
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
