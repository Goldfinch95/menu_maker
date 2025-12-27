import { toast } from "sonner";
import { editCategory } from "../services/edit_category_service";

interface EditCategoryParams {
  categoryId: number;
  title: string;
  onSuccess?: () => void;
}

export const editCategorySubmit = async ({
  categoryId,
  title,
  onSuccess,
}: EditCategoryParams) => {
  try {
    // 👇 POR AHORA SOLO CONSOLE.LOG PARA PROBAR
    console.log("📝 Editando categoría:", {
      categoryId,
      title,
    });

    // 👇 AQUÍ IRÁ LA LLAMADA A TU API
     await editCategory({ title }, categoryId);
    
    //reload
    toast.success("Se ha editado una nueva Categoria del Menu");
    // Llamar al callback de éxito
    if (onSuccess) {
      await onSuccess();
    }
  } catch (error) {
    console.error("Error al crear Categoria del Menu:", error);
    toast.error("No se pudo crear la Categoria del Menu");
  }
};
