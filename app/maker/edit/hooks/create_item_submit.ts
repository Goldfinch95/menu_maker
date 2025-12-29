import { toast } from "sonner";
import { createItemService } from "../services/create_item_service";

interface CreateItemParams {
  formData: FormData;
  categoryId: number;
  onSuccess?: () => void;
}

export const createItemSubmit = async ({
  formData,
  categoryId,
  onSuccess,
}: CreateItemParams) => {
  try {
    console.log("➕ Creando item para categoría:", categoryId);

    await createItemService(formData, categoryId);

    toast.success("Plato creado con éxito");

    if (onSuccess) {
      await onSuccess();
    }
  } catch (error) {
    console.error("Error al crear item:", error);
    toast.error("No se pudo crear el plato");
    throw error;
  }
};