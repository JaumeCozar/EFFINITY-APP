import { useState, useEffect } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import ComponentCard from "../../common/ComponentCard";
import Label from "../../form/Label";
import Input from "../../../components/form/input/InputField";
import cocinasData from "./Cocinas.json";

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

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        nombre: selectedUser.nombre,
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

      <div className="bg-white flex flex-wrap">
        {cocinasData.map((cocina) => (
          <div
            key={cocina.id}
            className="p-40 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 w-1/2"
          >
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col items-center w-full gap-3 xl:flex-row">
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
                <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end"></div>
              </div>
              <button
                onClick={openModal}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              >
                {/* <svg
                  className="fill-current"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="38"
                  height="38"
                  viewBox="0 0 512.002 512.002"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M289.776,329.478l-17.091-17.092c-1.427-1.427-3.36-2.227-5.378-2.227s-3.95,0.801-5.378,2.227l-17.091,17.092
          c-6.001,6.001-9.307,13.981-9.307,22.468c0,8.487,3.305,16.467,9.307,22.468c6.001,6.001,13.98,9.307,22.468,9.307
          c8.487,0,16.466-3.305,22.467-9.307c6.002-6.001,9.308-13.981,9.308-22.468C299.083,343.458,295.777,335.479,289.776,329.478z
           M279.022,363.66c-3.129,3.129-7.289,4.852-11.714,4.852c-4.425,0-8.586-1.724-11.715-4.852s-4.852-7.29-4.852-11.714
          c0-4.426,1.724-8.585,4.852-11.715l11.715-11.715l11.714,11.715c0,0,0,0,0.001,0c3.129,3.129,4.852,7.29,4.852,11.715
          C283.875,356.371,282.151,360.531,279.022,363.66z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M459.093,180.098c4.214,0.184,7.741-3.084,7.915-7.281c0.687-16.42,1.035-33.07,1.035-49.486
          c0-24.809-20.183-44.992-44.992-44.992h-7.619l38.637-38.636c2.97-2.97,2.97-7.784,0-10.753c-2.97-2.969-7.783-2.971-10.754,0
          l-38.636,38.636V7.604c0-4.199-3.404-7.604-7.604-7.604s-7.604,3.405-7.604,7.604v59.983l-38.635-38.636
          c-2.971-2.97-7.784-2.971-10.754,0c-2.97,2.97-2.97,7.784,0,10.753l38.636,38.636H371.1c-24.809,0-44.992,20.183-44.992,44.992
          c0,22.445,0.648,44.838,1.909,67.163c-29.791-13.49-66.472-11.139-100.712,6.594c-0.401-8.159-1.449-19.235-4.047-30.928
          c-7.045-31.703-22.218-52.424-43.878-59.921c-3.968-1.374-8.299,0.729-9.673,4.698c-1.374,3.968,0.73,8.299,4.698,9.673
          c16.577,5.738,27.996,22.074,33.941,48.555c2.316,10.314,3.302,20.266,3.707,27.738c-42.735-21.954-89.095-19.818-121.034,6.47
          c-3.242,2.669-3.707,7.461-1.038,10.703c2.669,3.242,7.461,3.708,10.703,1.038c28.893-23.782,72.316-23.949,111.573-0.74v282.23
          c-85.089-3.987-153.09-74.455-153.09-160.513c0-43.429,8.175-77.664,24.299-101.751c2.336-3.49,1.401-8.213-2.09-10.548
          c-3.489-2.337-8.213-1.4-10.548,2.09C53,252.519,43.959,289.599,43.959,336.095c0,96.984,78.894,175.888,175.875,175.905
          c0.009,0,0.018,0.001,0.027,0.001c0.009,0,0.018-0.001,0.028-0.001c33.009-0.004,65.184-9.208,93.049-26.615
          c21.751-13.59,40.209-31.719,54.165-53.032c6.766,25.026,14.35,49.872,22.775,74.506c1.052,3.076,3.944,5.143,7.195,5.143
          c3.251,0,6.143-2.067,7.195-5.143c33.508-97.969,54.051-200.024,61.057-303.327c0.284-4.189-2.882-7.817-7.072-8.101
          c-4.191-0.284-7.817,2.882-8.101,7.073c-3.083,45.457-8.83,90.669-17.173,135.388h-20.592c-4.2,0-7.604,3.405-7.604,7.604
          s3.404,7.604,7.604,7.604h17.652c-8.599,42.927-19.6,85.372-32.969,127.113c-37.01-115.487-55.759-235.429-55.759-356.878
          c0-16.424,13.362-29.784,29.784-29.784h51.953c16.423,0,29.784,13.361,29.784,29.784c0,16.205-0.344,32.64-1.021,48.851
          C451.639,176.378,454.897,179.922,459.093,180.098z M361.698,411.652c-26.848,50.341-77.554,82.306-134.233,84.941V214.377
          c34.939-20.672,73.218-22.989,101.669-6.189C334.047,276.888,344.933,344.885,361.698,411.652z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M379.04,147.283h-24.333c-4.2,0-7.604,3.405-7.604,7.604s3.404,7.604,7.604,7.604h24.333c4.2,0,7.604-3.405,7.604-7.604
          S383.241,147.283,379.04,147.283z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M427.706,197.976h-24.333c-4.2,0-7.604,3.405-7.604,7.604s3.404,7.604,7.604,7.604h24.333c4.2,0,7.604-3.405,7.604-7.604
          S431.906,197.976,427.706,197.976z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M395.262,266.918h-24.333c-4.2,0-7.604,3.405-7.604,7.604c0,4.199,3.405,7.604,7.604,7.604h24.333
          c4.2,0,7.604-3.405,7.604-7.604C402.866,270.323,399.462,266.918,395.262,266.918z"
                      />
                    </g>
                  </g>
                </svg> */}
                Alimentos
              </button>
              <div className="flex flex-col">
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
