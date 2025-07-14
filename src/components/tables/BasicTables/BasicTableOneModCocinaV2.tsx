import { useState, useEffect } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import ComponentCard from "../../common/ComponentCard";
import Label from "../../form/Label";
import Input from "../../../components/form/input/InputField";
import cocinasData from "./Cocinas.json";
import Swal from 'sweetalert2';



// import Badge from "../../ui/badge/Badge";

export default function BasicTableOneModCocinaV2() {
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
    ubicacion: "",
  });

  type User = (typeof cocinasData)[0];

  const [selectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        nombre: selectedUser.nombre,
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
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
};







  return (
    <>
      <div className="flex justify-end">
        <Button
          className="my-4 mx-6"
          size="sm"
          onClick={() => {
            openModal2();
          }}
        >
          Añadir Cocina
        </Button>
      </div>

      <div className=" flex flex-wrap gap-2 p-2">
        {cocinasData.map((cocina) => (
          <div
            key={cocina.id}
            className="bg-white w-full md:w-[calc(50%-12px)] border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6  dark:bg-white/[0.03]"
          >
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col my-4 items-center w-full gap-3 xl:flex-row">
                <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                  <img src={cocina.image} alt={cocina.nombre} />
                </div>
                <div className="order-3 xl:order-2">
                  <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                    {cocina.nombre}
                  </h4>
                  <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {cocina.ubicacion}
                    </p>
                  </div>
                </div>
                
              </div>
              <button
                onClick={openModal}
                className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              >
                Alimentos
              </button>
              <div className="flex flex-col px-4 gap-2">
              <button
                onClick={openModal}
                className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
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
              </button>

              <button 
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
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
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        {" "}
        {/*Primer Modal*/}
        <div className="relative w-full max-h-[90vh] p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <ComponentCard title="Editar Cocina">
            <div className="space-y-6">
              <div>
                <Label htmlFor="inputOne">Nombre de la Cocina</Label>
                <Input
                  type="text"
                  id="inputOne"
                  placeholder="Tarragona-Reus-Salou-etc..."
                  value={formData.nombre}
                />
              </div>

              <div>
                <Label htmlFor="inputTwo">Direccion</Label>
                <Input
                  type="text"
                  id="inputTwo"
                  placeholder="Calle Tarragona 555"
                  value={formData.ubicacion}
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
          <ComponentCard title="Añadir Cocina">
            <div className="space-y-6">
              <div>
                <Label htmlFor="inputOne">Nombre de la Cocina</Label>
                <Input
                  type="text"
                  id="inputOne"
                  placeholder="Tarragona-Reus-Salou-etc..."
                />
              </div>

              <div>
                <Label htmlFor="inputTwo">Direccion</Label>
                <Input
                  type="text"
                  id="inputTwo"
                  placeholder="Calle Tarragona 555"
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


