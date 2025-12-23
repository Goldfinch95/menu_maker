// controladores del envio de contraseñas
import { passwordType } from "../types/password";
import { toast } from "sonner";
import { userCreatePasswordService } from "../services/create_service";


// visualizacion de la contraseña (ojo)
export const handleTogglePassword = (
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setShowPassword((eye) => !eye); // Alterna el valor de showPassword
};

//peticion de recuperar contraseña
export const handlePasswordSubmit = async (
  formData: passwordType,
  router: any,
  token: string
) => {
  try {
    //esperar a naza
    await userCreatePasswordService(formData, token);

    // sucess: info
    toast.info("Se Actualizo su Contraseña")
    //redirigir a login
    router.push("/auth");
  } catch (error) {
    console.error("Error en la autenticación:", error);
    if (error instanceof Error) {
      //objetivo mas seguridad
      //error: info
      toast.error("No se pudo actualizar su contraseña, vuelva a intentarlo");
      //redirigir a login
      //router.push("/auth");
    } 
  }
};