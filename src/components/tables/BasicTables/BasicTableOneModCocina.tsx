import { useState, useEffect } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import ComponentCard from "../../common/ComponentCard";
import Label from "../../form/Label";
import Input from "../../../components/form/input/InputField";
// import usuarioData from "./Alimentos.json";
import Select from "react-select";
import type { StylesConfig, GroupBase } from "react-select";
import Swal from "sweetalert2";
import { ToastContainer, toast, Bounce } from "react-toastify";
import PageMeta from "../../common/PageMeta";
import { useTheme } from "../../../context/ThemeContext";

export default function BasicTableOneModCocina() {
  const [selectedTipo, setSelectedTipo] = useState<number | null>(null);

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
        title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          toast.info("Alimento eliminado exitosamente");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          toast.info("No se ha borrado el alimento");
        }
      });
  };

  const optionsOrder = [
    { value: "Ascendente", label: "Ascendente" },
    { value: "Descendente", label: "Descendente" },
  ];

  const handleSelectChange = (value: string, field: string) => {
    console.log(`Campo: ${field}, Valor seleccionado: ${value}`);
    if (field === "estado") {
      setOrdenAlimentos(value);
    }
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
  // const [selectedUser, setSelectedUser] = useState<Alimento | null>(null);

  // Estado para los formularios de los modales
  const [modalFormData, setModalFormData] = useState({
    nombre: "",
    precio: "",
  });

  const { theme } = useTheme();

  // Define el tipo de opción para el select
  type OptionType = { value: string; label: string };

  const customSelectStylesDark: StylesConfig<
    OptionType,
    false,
    GroupBase<OptionType>
  > = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      color: "#fff",
      borderColor: "#374151", // gray-700
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1f2937",
      color: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#374151" : "#1f2937",
      color: "#fff",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
    }),
  };

  // 1. Define el tipo para los alimentos según el JSON del endpoint
  // (lo puedes mover a un archivo de tipos si lo prefieres)
  type Alimento = {
    id: number;
    name: string;
    price: number;
    foodTypeId: number;
    foodTypeName: string;
    foodTypeIcon: string;
    kitchenId: number;
  };

  // Tipo para tipos de alimento
  type TipoAlimento = {
    id: number;
    name: string;
    icon: string;
    kitchenId: number | null;
  };

  // 2. Estado para los alimentos
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);

  // Estado para tipos de alimento
  const [tipoAlimentoData, setTipoAlimentoData] = useState<TipoAlimento[]>([]);

  // Estado para el filtro de alimentos por tipo
  const [alimentosFiltrados, setAlimentosFiltrados] = useState<Alimento[]>([]);
  
  // Estado para el orden de los alimentos
  const [ordenAlimentos, setOrdenAlimentos] = useState<string>("Ascendente");
  
  // Estado para el término de búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>("");

  // 3. Fetch de alimentos
  useEffect(() => {
    const fetchAlimentos = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          console.error("Token no encontrado");
          return;
        }

        const response = await fetch("http://localhost:8080/foods/kitchen/1", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) throw new Error("Error al obtener los alimentos");
        const data = await response.json();
        setAlimentos(data);
        setAlimentosFiltrados(data); // Inicialmente mostrar todos los alimentos
      } catch (error) {
        console.error("Error fetching alimentos:", error);
      }
    };
    fetchAlimentos();
  }, []);

  // Efecto para filtrar, buscar y ordenar alimentos cuando cambie el tipo seleccionado, el orden o el término de búsqueda
  useEffect(() => {
    let alimentosProcesados: Alimento[] = [];
    
    if (selectedTipo === null) {
      // Si no hay tipo seleccionado, mostrar todos los alimentos
      alimentosProcesados = [...alimentos];
    } else {
      // Filtrar alimentos por el tipo seleccionado
      alimentosProcesados = alimentos.filter(alimento => alimento.foodTypeId === selectedTipo);
    }
    
    // Aplicar filtro de búsqueda por nombre
    if (terminoBusqueda.trim() !== "") {
      const termino = terminoBusqueda.toLowerCase().trim();
      alimentosProcesados = alimentosProcesados.filter(alimento => 
        alimento.name.toLowerCase().includes(termino)
      );
    }
    
    // Aplicar ordenamiento por nombre
    alimentosProcesados.sort((a, b) => {
      const nombreA = a.name.toLowerCase();
      const nombreB = b.name.toLowerCase();
      
      if (ordenAlimentos === "Ascendente") {
        return nombreA.localeCompare(nombreB);
      } else {
        return nombreB.localeCompare(nombreA);
      }
    });
    
    setAlimentosFiltrados(alimentosProcesados);
  }, [selectedTipo, alimentos, ordenAlimentos, terminoBusqueda]);

  // Fetch de tipos de alimento
  useEffect(() => {
    const fetchTiposAlimento = async () => {
      try {
        const kitchenId = 1; // o usa una variable si lo recibes dinámicamente
        const token = localStorage.getItem("token"); // O de donde tengas almacenado el token

        if (!token) {
          console.error("Token no encontrado");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/food-types/kitchen/${kitchenId}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Error al obtener los tipos de alimentos');
        }

        const data = await response.json();
        setTipoAlimentoData(data);
      } catch (error) {
        console.error("Error fetching tipos de alimento:", error);
      }
    };

    fetchTiposAlimento();
  }, []);


  


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
      />
      <PageMeta
        title="Tablas Cocinas V1 | Effinity"
        description="Esta es la página de Panel de Calendario React.js para TailAdmin - Plantilla de Panel de Administración React.js Tailwind CSS"
      />
      <div className="overflow-x-hidden p-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Tipos de Alimentos
            <div className="text-sm sm:text-base font-bold leading-tight break-words max-w-full peer-checked:underline dark:text-gray-500">
              FILTRAR
            </div>
          </h1>

          <div className="flex gap-2">
            <Button size="sm" onClick={openModal2}>
              Añadir Tipo de Alimento
            </Button>
            <Button size="sm" onClick={openModal2}>
              Añadir Alimento
            </Button>
          </div>
        </div>

        <div className="w-full xl:max-w-screen-xl mx-auto overflow-x-auto box-border ">
          <div className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-2 scrollbar-hide touch-pan-x pb-3 pt-2 px-2 scroll-px-4 custom-scrollbar">
            {tipoAlimentoData.map((tipo) => (
  <label
    key={tipo.id}
    className={`relative
      ${selectedTipo === tipo.id
        ? "outline-2 outline-gray-200 border-brand-500 bg-brand-300 text-black"
        : " bg-gray-100 dark:bg-gray-400 border border-gray-300 dark:border-black text-black"}
      rounded-xl px-4 py-4 text-sm font-medium shadow-theme-xs
      cursor-pointer w-100 h-38 flex flex-col justify-between items-center text-center
      hover:outline-2 hover:outline-gray-200 hover:bg-brand-300 dark:hover:bg-green-100
      hover:border-gray-200 hover:shadow hover:text-black`}
  >
    <input
      type="checkbox"
      className="absolute opacity-0 w-0 h-0"
      checked={selectedTipo === tipo.id}
      onChange={() => setSelectedTipo((prev) => (prev === tipo.id ? null : tipo.id))}
    />

                {/* Botones de acción arriba */}
                <div className="flex justify-center gap-2 w-full">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Editar tipo:", tipo.name);
                    }}
                    className="flex-1 flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium border border-gray-300 bg-gray-50 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.05] text-gray-950"
                    title="Editar"
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
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Eliminar tipo:", tipo.name);
                    }}
                    className="flex-1 flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium border border-red-300 bg-white hover:bg-red-50 text-red-600 dark:border-red-700 dark:bg-gray-800 dark:hover:bg-white/[0.05]"
                    title="Eliminar"
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
                </div>

                {/* Nombre en medio */}
                <div className="text-sm sm:text-base font-bold leading-tight break-words max-w-full peer-checked:underline">
                  {tipo.name}
                </div>

                {/* Emoji abajo */}
                <div className="text-2xl">{tipo.icon}</div>
              </label>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="flex gap-5 my-4 max-w-full justify-around">
            <div className="flex-1 relative">
              <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                    fill=""
                  />
                </svg>
              </span>
                             <Input
                 type="text"
                 id="inputOne"
                 placeholder="Buscar"
                 value={terminoBusqueda}
                 onChange={(e) => setTerminoBusqueda(e.target.value)}
                 className="dark:bg-dark-900 pl-12 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
               />
            </div>
            <div className="flex-1">
              <Select
                options={optionsOrder}
                onChange={(
                  selectedOrder: { value: string; label: string } | null
                ) => handleSelectChange(selectedOrder?.value || "", "estado")}
                placeholder="Selecciona el orden"
                className="dark:bg-dark-900"
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={theme === "dark" ? customSelectStylesDark : undefined}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Alimentos
          </h1>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] w-full xl:max-w-screen-xl mx-auto box-border">
          <div className="w-full box-border">
            {/* Grid de cards de alimentos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
              {alimentosFiltrados.map((alimento) => (
                <div
                  key={alimento.id}
                  className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-white/[0.05]"
                >
                  <div className="text-center mb-3">
                    <div className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
                      {alimento.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {alimento.price}€ / kg
                    </div>
                    <div className="mt-1 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {alimento.foodTypeName} {alimento.foodTypeIcon}
                    </div>
                  </div>
                  <div className="flex  gap-2 mt-auto w-full">
                    <button
                      onClick={() => {
                        // setSelectedUser(alimento); // Si tienes lógica de edición, adapta esto
                        openModal();
                      }}
                      className="flex flex-1 items-center justify-center rounded-full px-4 py-2 text-sm font-medium border border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.05]"
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
                      className="flex flex-1 justify-center rounded-full px-4 py-2 text-sm font-medium border border-red-300 bg-white hover:bg-red-50 text-red-600 dark:border-red-700 dark:bg-gray-800 dark:hover:bg-white/[0.05]"
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
                  </div>
                </div>
              ))}
            </div>
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
                  value={modalFormData.nombre}
                  onChange={(e) =>
                    setModalFormData({ ...modalFormData, nombre: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="inputTwo">Precio</Label>
                <Input
                  type="text"
                  id="inputTwo"
                  placeholder="5.00€"
                  value={modalFormData.precio}
                  onChange={(e) =>
                    setModalFormData({ ...modalFormData, precio: e.target.value })
                  }
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
                  value={modalFormData.nombre}
                  onChange={(e) =>
                    setModalFormData({ ...modalFormData, nombre: e.target.value })
                  }
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
