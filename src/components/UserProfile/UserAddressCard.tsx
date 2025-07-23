import { Modal } from "../ui/modal";
import { useModal } from "../../hooks/useModal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../../components/form/Select";
import { EnvelopeIcon } from "../../icons";
import PhoneInput from "../../components/form/group-input/PhoneInput";
import ComponentCard from "../common/ComponentCard";
import { toast} from "react-toastify";
import { useState, useEffect } from "react";

export default function UserAddressCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const options = [
    { value: "hotel", label: "Hotel" },
    { value: "restaurante", label: "Restaurante" },
    { value: "bar", label: "Bar" },
  ];

  const optionsPais = [
    { value: "usa", label: "Estados Unidos" },
    { value: "es", label: "España" },
    { value: "fr", label: "Francia" },
    { value: "pt", label: "Portugal" },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const countries = [
    { code: "US", label: "+1" },
    { code: "ES", label: "+34" },
    { code: "FR", label: "+33" },
    { code: "PT", label: "+351" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };

  

  const saveClickToastAddress = () => {
    setTimeout(() => {
      toast.info("Se ha guardado la configuracion");
    }, 100);
    closeModal();
  };



  interface UserAddress {
    id: number;
    name: string;
    address:string;
    zipCode: string;
    email: string;
    tel: string;
    imageUrl: string;
    sectorName: string;
  }
  
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
      name: "",
      address: "",
      zipCode: "",
      email: "",
      tel: "",
      imageUrl: "",
      sectorName: ""
      
    });
  
  
  const [selectedUserAddress, setSelectedUserAddress] = useState<UserAddress | null>(null);
    
      useEffect(() => {
      if (selectedUserAddress) {
        setFormData({
          name: selectedUserAddress.name,
  address: selectedUserAddress.address,
  zipCode: selectedUserAddress.zipCode,
  email: selectedUserAddress.email,
  tel: selectedUserAddress.tel ?? "",
  imageUrl: selectedUserAddress.imageUrl ?? "",
  sectorName: selectedUserAddress.sectorName ?? ""
        });
      }
    }, [selectedUserAddress]);
  
  const [useraddress, setUserAddress] = useState<UserAddress | null>(null);

  
  
     
       useEffect(() => {
  const fetchUserAddress = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();

      // Construir el objeto que realmente necesitas para mostrar
      const userData: UserAddress = {
        id: data.id,
        name: data.company?.name || "",
        address: data.company?.adress || "",
        zipCode: data.company?.zipCode || "",
        email: data.company?.email || data.email || "",
        tel: data.company?.tel || "",
        imageUrl: data.company?.imageUrl || "",
        sectorName: data.company?.sectorName || "",
      };

      setUserAddress(userData);
      setFormData(userData); // También puedes inicializar formData aquí
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
      toast.error("No se pudieron cargar los usuarios");
    }
  };

  fetchUserAddress();
}, []);





  return (
    <>
      

      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Información de la Empresa
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Empresa
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {useraddress?.name}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Dirección
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {useraddress?.address}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Código postal
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {useraddress?.zipCode}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Sector
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {useraddress?.sectorName}
                </p>
              </div>

              {/* Apartado Teléfono */}
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Teléfono
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {useraddress?.tel}
                </p>
              </div>

              {/* Apartado Email */}
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {useraddress?.email}
                </p>
              </div>
            </div>
          </div>

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
            Edit
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full max-h-[90vh] p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <ComponentCard title="Informacion de la Empresa">
            <div className="space-y-6">
              <div>
                <Label htmlFor="inputOne">Empresa</Label>
                <Input type="text" id="inputOne" placeholder="Paco de Lucia" />
              </div>

              <div>
                <Label htmlFor="inputTwo">Direccion</Label>
                <Input
                  type="text"
                  id="inputTwo"
                  placeholder="Calle Tarragona 555"
                />
              </div>

              <div>
                <Label htmlFor="inputThree">Codigo Postal</Label>
                <Input type="text" id="inputThree" placeholder="43101" />
              </div>

              <div>
                <Label>Pais</Label>
                <Select
                  options={optionsPais}
                  placeholder="Selecciona una opcion"
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
              </div>

              <div>
                <Label>Telefono</Label>
                <PhoneInput
                  selectPosition="end"
                  countries={countries}
                  placeholder="+1 (555) 000-0000"
                  onChange={handlePhoneNumberChange}
                />
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

              <div>
                <Label>Sector</Label>
                <Select
                  options={options}
                  placeholder="Selecciona una opcion"
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="md" onClick={saveClickToastAddress}>
                Enviar
              </Button>
              </div>
            </div>
          </ComponentCard>
        </div>
      </Modal>
    </>
  );
}
