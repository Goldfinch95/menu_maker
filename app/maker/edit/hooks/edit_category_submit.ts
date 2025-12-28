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
    console.log("📝 Editando categoría:", {
      categoryId,
      title,
    });

    await editCategory({ title }, categoryId);
    
    toast.success("Categoría editada exitosamente");
    
    // Llamar al callback para refrescar solo el componente
    if (onSuccess) {
      await onSuccess();
    }
    
  } catch (error) {
    console.error("Error al editar categoría:", error);
    toast.error("No se pudo editar la categoría");
  }
};