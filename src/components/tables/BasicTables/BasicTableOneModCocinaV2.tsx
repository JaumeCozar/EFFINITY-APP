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
import usuarioData from "../../../components/form/form-elements/usuarios.json";

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
    email: "",
    contrasena: "",
    rol: "",
    estado: "",
    ubicacion: "",
  });

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
        <Button
          className="my-4"
          size="sm"
          onClick={() => {
            openModal2();
          }}
        >
          Añadir Cocina
        </Button>
      </div>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 w-1/2">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img src="/images/user/owner.jpg" alt="user" />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                Cocina Salou
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Calle Tarragona 555
                </p>
              </div>
            </div>
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end"></div>
          </div>
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512.012 512.012"
              width="18"
              height="18"
            >
              <g>
                <path d="m504.501 225.645h-38.637c.645-5.2.901-9.881.743-13.953-.759-19.623-10.001-35.946-24.796-45.479l9.575-46.989c13.664 4.846 28.849-2.043 34.137-15.642.963-2.475 1.546-5.061 1.749-7.672 9.975-.819 19.032-7.191 22.892-17.118 2.61-6.712 2.449-14.039-.452-20.631-2.901-6.591-8.196-11.657-14.911-14.268-.234-.091-.47-.179-.705-.263 1.13-7.084.207-14.353-2.753-21.075-4.062-9.228-11.476-16.321-20.874-19.974-11.063-4.3-23.241-3.15-33.159 2.846-1.869-1.359-3.914-2.479-6.087-3.323-13.855-5.388-29.516 1.504-34.903 15.36-2.059 5.294-2.386 10.955-1.041 16.296-6.55 4.282-11.689 10.545-14.559 17.922-3.654 9.397-3.429 19.655.634 28.883 4.062 9.228 11.476 16.321 20.874 19.974 3.153 1.227 6.438 2.018 9.764 2.365l-11.194 55.143c-3.787.698-7.347 1.804-10.684 3.233-3.622-26.807-22.933-48.95-48.404-56.579l2.197-3.562c4.099-6.648-3.22-13.098-8.978-10.975l-29.052 10.708-25.625-9.65c-5.749-2.169-13.127 4.258-9.04 10.935l8.7 14.21c-17.86 13.99-27.823 36.276-26.227 58.966l-5.203.258-4.239-3.316c1.716-8.267 1.777-16.689.136-25.059-2.884-14.713-10.689-27.646-22.18-36.976-.07-3.628-.44-7.266-1.141-10.839-3.19-16.277-12.517-30.341-26.262-39.601-13.749-9.263-30.27-12.607-46.527-9.423-15.807 3.099-29.848 12.338-38.998 25.545-2.764.293-5.492.778-8.184 1.454-13.555-8.795-29.652-11.935-45.558-8.82-16.255 3.189-30.293 12.525-39.528 26.294-9.231 13.763-12.559 30.307-9.368 46.583.581 2.965 1.386 5.889 2.384 8.729-7.76 12.972-10.952 28.745-7.821 44.724 2.284 11.652 7.732 22.243 15.578 30.76h-9.273c-4.143 0-7.5 3.357-7.5 7.5v271.366c0 4.143 3.357 7.5 7.5 7.5h82.496c4.143 0 7.5-3.357 7.5-7.5v-25.034h317.008v25.034c0 4.143 3.357 7.5 7.5 7.5h82.496c4.143 0 7.5-3.357 7.5-7.5v-271.367c0-4.142-3.357-7.5-7.5-7.5zm-7.5 238.832h-482v-51.473h482zm-482-184.449h482v51.473h-482v-51.473zm170.222-39.707c3.298-18.288 15.517-33.338 32.176-40.475l-12.904 19.754c-4.211 6.449 3.254 13.178 8.839 11.151l27.333-9.923 24.651 9.333c7.483.916 10.687-2.357 9.611-9.819l-6.581-16.317c20.206 12.871 29.58 38.015 23.019 61.002h-104.904c-2.292-7.99-2.731-16.444-1.24-24.706zm163.241 24.707h-41.63c1.95-8.814 2.164-18.739.575-27.561 14.306 3.133 29.814 1.487 43.153-4.576-1.129 9.816-1.843 20.619-2.098 32.137zm148.537 132.977h-482v-51.473h482zm0-132.977h-67.496v-24.383h67.496zm-45.382-52.756c.145 3.741-.15 8.224-.877 13.373h-28.738c-4.143 0-7.5 3.357-7.5 7.5v31.883h-51.034c.227-9.811.8-19.102 1.684-27.608l22.431 4.349c9.226 1.774 12.216-12.91 2.855-14.727l-23.286-4.515c1.776-10.518 4.125-19.152 6.943-25.157 3.335-7.104 16.431-29.855 44.94-24.327 23.077 4.474 31.962 23.198 32.582 39.229zm-43.959-125.713c-18.583-7.222-18.978-34.871-.132-42.34 4.563-2.478 5.786-6.087 3.669-10.828-7.392-12.337 10.808-24.737 19.627-13.59 3.343 3.437 6.962 3.757 10.856.96 17.375-15.404 44.786 3.457 36.306 25.261-1.901 4.958.371 11.213 6.803 11.041 7.694-.136 14.289 8.851 11.394 16.294-2.328 5.985-8.912 9.061-14.987 6.994-7.142-.766-10.309 2.419-9.499 9.557 4.097 11.824-11.668 21.01-20.029 12.096-5.015-5.845-3.853-14.021-.674-21.633zm-10.554-17.187c4.772 4.513 10.261 9.043 16.033 13.264l7.672-15.606c5.389-10.895 21.247-2.493 23.186 6.412 5.839 16.059-8.619 33.703-25.684 29.715 3.101-7.554 9.258-16.639 16.155-23.65z"></path>
              </g>
            </svg>
          </button>
          <button
            onClick={openModal}
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
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
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
                  Cocina
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Direccion
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Editar
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Eliminar
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {usuarioData.map((user, id) => (
                <TableRow key={id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.ubicacion}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Calle Tarragona 555
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
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {/* {order.budget} */}
                    <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
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
