// controladores del envio de email
import { emailType } from "../types/email";
import { toast } from "sonner";
import { userService } from "../services/user_service";




//peticion de recuperar contraseña
export const handleEmailSubmit = async (
  formData: emailType,
  router: any
) => {
  try {
    await userService(formData);
    // sucess: info
    toast.info("El enlace de recuperacion se ha enviado a su correo")
    //redirigir a login
    router.push("/auth");
  } catch (error) {
    console.error("Error en la autenticación:", error);
    if (error instanceof Error) {
      //objetivo mas seguridad
      //error: info
      toast.info("El enlace de recuperacion se ha enviado a su correo");
      //redirigir a login
      router.push("/auth");
    } 
  }
};