// controladores del envio de email
import { newMenu } from "../types/new_menu";
import { toast } from "sonner";
import { createMenuService } from "../services/new_menu_service";




//peticion de recuperar contraseña
export const handleNewMenuSubmit = async (
  formData: newMenu,
  router: any
) => {
  try {
    console.log("📋 Datos del formulario:");
    console.log(formData)
    await createMenuService(formData);
    // sucess: info
    toast.info("Se ha creado un nuevo Menu")
    //redirigir a home
    router.push("/home");
  } catch (error) {
    console.error("Error al crear Menu:", error);
    if (error instanceof Error) {
      //objetivo mas seguridad
      //error: info
      toast.error("No se pudo crear el Menu");
    } 
  }
};