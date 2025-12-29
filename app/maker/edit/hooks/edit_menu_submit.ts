// Handler para actualizar información del menú
import { editMenu } from "../types/edit_menu";
import { toast } from "sonner";
import { updateMenuService } from "../services/update_menu_service";

export const handleEditMenuSubmit = async (
  formData: editMenu,
  router: any
) => {
  try {
    console.log("📋 Datos enviados al servidor:");
    console.log(formData);
    
    const editForm = await updateMenuService(formData, formData.id);
    
    console.log("✅ Respuesta del servidor:");
    console.log(editForm);
    
    toast.success("Menú actualizado correctamente");
    
    router.push("/home");
  } catch (error) {
    console.error("❌ Error al actualizar menú:", error);
    if (error instanceof Error) {
      toast.error("No se pudo actualizar el menú");
    } 
  }
};