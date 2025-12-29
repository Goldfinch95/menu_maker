import { toast } from "sonner";
 import { deleteItemService } from "../services/delete_item_service";

interface DeleteItemParams {
  itemId: number;
  onSuccess?: () => void;
}

export const deleteItemSubmit = async ({
  itemId,
  onSuccess,
}: DeleteItemParams) => {
  try {
    // TODO: Descomentar cuando conectes con la API
    await deleteItemService(itemId);
    toast.success("Plato eliminado con éxito");

    if (onSuccess) {
      await onSuccess();
    }
  } catch (error) {
    console.error("❌ [deleteItemSubmit] Error al eliminar item:", error);
    toast.error("No se pudo eliminar el plato");
    throw error;
  }
};