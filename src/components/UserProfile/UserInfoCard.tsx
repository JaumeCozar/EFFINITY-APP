import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";



export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();

  

  const saveClickToastInfo = () => {
    setTimeout(() => {
      toast.info("Se ha guardado la configuracion");
    }, 100);
    closeModal();
  };


  interface UserInfo {
    id: number;
    name: string;
    surname: string;
    email: string;
    tel: string | null;
    role: string;
    imageUrl: string | null;
  }
  
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
      name: "",
      surname: "",
      email: "",
      tel: "",
      role: ""
    });
  
  
  const [selectedUserInfo, setSelectedUserInfo] = useState<UserInfo | null>(null);
    
      useEffect(() => {
      if (selectedUserInfo) {
        setFormData({
          name: `${selectedUserInfo.name}`,
          surname: selectedUserInfo.surname,
          email: selectedUserInfo.email,
          tel: selectedUserInfo.tel || "No especificado",
          role: selectedUserInfo.role
        });
      }
    }, [selectedUserInfo]);
  
  const [userinfo, setUserInfo] = useState<UserInfo | null>(null);

  
  
     
       useEffect(() => {
       const fetchUserInfo = async () => {
       try {
         const token = localStorage.getItem("token"); // o desde cookies
     
         const response = await fetch("http://localhost:8080/users/me", {
           headers: {
             Authorization: `Bearer ${token}`, // O según lo que tu backend espere
             "Content-Type": "application/json",
           },
         });
     
         if (!response.ok) {
           throw new Error(`Error ${response.status}`);
         }
     
         const data = await response.json();
         setUserInfo(data);
       } catch (error) {
         console.error("Error al cargar los usuarios:", error);
         toast.error("No se pudieron cargar los usuarios");
       }
     };
     fetchUserInfo();
     
     }, []);

  
  return (
    <>
      

      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Información personal
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Nombre
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userinfo?.name}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Apellido
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userinfo?.surname}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Correo
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userinfo?.email}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Telf
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userinfo?.tel|| "No especificado"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Rol
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userinfo?.role}
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
            Editar
          </button>
        </div>

        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl m-4 rounded-2xl"
        >
          <div className="no-scrollbar relative w-full max-h-[80vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Editar información personal
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Actualiza tus datos para mantener tu perfil al día.
              </p>
            </div>
            <form className="flex flex-col">
              <div className="custom-scrollbar h-[350px] overflow-y-auto px-2 pb-3">
                <div className="mt-7">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Información personal
                  </h5>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Nombre</Label>
                      <Input type="text" value="Musharof" />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Apellido</Label>
                      <Input type="text" value="Chowdhury" />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Correo electrónico</Label>
                      <Input type="text" value="randomuser@pimjo.com" />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Teléfono</Label>
                      <Input type="text" value="+09 363 398 46" />
                    </div>

                    <div className="col-span-2">
                      <Label>Rol</Label>
                      <Input type="text" value="Team Manager" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" onClick={saveClickToastInfo}>
                  Guardar cambios
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}
