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
    console.log("🗑️ [deleteItemSubmit] Eliminando item:", itemId);
    console.log("📋 [deleteItemSubmit] Detalles:", {
      itemId,
      timestamp: new Date().toISOString(),
    });

    // TODO: Descomentar cuando conectes con la API
    await deleteItemService(itemId);
    
    // Simulación temporal para testing
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("✅ [deleteItemSubmit] Item eliminado exitosamente (simulado)");

    toast.success("Plato eliminado con éxito");

    if (onSuccess) {
      console.log("🔄 [deleteItemSubmit] Ejecutando callback onSuccess");
      await onSuccess();
    }
  } catch (error) {
    console.error("❌ [deleteItemSubmit] Error al eliminar item:", error);
    toast.error("No se pudo eliminar el plato");
    throw error;
  }
};