import { toast } from "sonner";
import { editItemService } from "../services/edit_item_service";

interface EditItemParams {
  itemId: number;
  formData: FormData;
  onSuccess?: () => void;
}

export const editItemSubmit = async ({
  itemId,
  formData,
  onSuccess,
}: EditItemParams) => {
  try {
    console.log("✏️ Editando item:", itemId);

    await editItemService(itemId, formData);

    toast.success("Plato actualizado con éxito");

    if (onSuccess) {
      await onSuccess();
    }
  } catch (error) {
    console.error("Error al editar item:", error);
    toast.error("No se pudo actualizar el plato");
    throw error;
  }
};
