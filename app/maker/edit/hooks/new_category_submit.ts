import { newCategory } from "../types/new_category";
import { toast } from "sonner";
import { createCategory } from "../services/create_category_service";

export const newCategorySubmit = async (
  formData: newCategory,
  menuId: number,
  onSuccess?: () => void
) => {
  try {
    console.log("📋 Datos del formulario:");
    console.log(formData, menuId);
    
    await createCategory(formData, menuId);
    
    toast.success("Se ha creado una nueva Categoria del Menu");
    
    // Cerrar el dialog si la función está disponible
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.error("Error al crear Categoria del Menu:", error);
    toast.error("No se pudo crear la Categoria del Menu");
  }
};