import { toast } from "sonner";
import { deleteCategoryService } from "../services/delete_category_service";

interface DeleteCategoryParams {
  categoryId: number;
  onSuccess?: () => void;
}

export const deleteCategorySubmit = async ({
  categoryId,
  onSuccess,
}: DeleteCategoryParams) => {
  try {
    // ⚠️ DESCOMENTAR CUANDO TENGAS EL SERVICE
    await deleteCategoryService(categoryId);
    toast.success("Categoría eliminada con éxito");
    //recargar pagina

    if (onSuccess) {
      await onSuccess();
    }
  } catch (error) {
    toast.error("no se pudo eliminar la Categoría");
  }
};
