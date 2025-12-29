import { toast } from "sonner";
import { editItemService } from "../services/edit_item_service";
import { NewItem } from "../types/items";

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
    console.log("✏️ [editItemSubmit] Editando item:", itemId);
    
    // Convertir FormData a objeto para la API
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;
    const priceStr = formData.get("price") as string | null;
    const image = formData.get("image") as File | null;

    console.log("📋 [editItemSubmit] Datos extraídos del FormData:");
    console.log("  title:", title);
    console.log("  description:", description);
    console.log("  price:", priceStr);
    console.log("  image:", image ? `File(${image.name})` : "No hay imagen");

    // Construir objeto de actualización (sin categoryId porque es edición)
    const updateData: Partial<NewItem> = {
      title,
      description: description || undefined,
      price: priceStr ? parseFloat(priceStr) : undefined,
    };

    console.log("📦 [editItemSubmit] Datos a actualizar:");
    console.log(updateData);

    // ⚠️ NOTA: La API actual NO soporta subida de imágenes
    if (image) {
      console.warn("⚠️ [editItemSubmit] Imagen detectada pero NO se puede subir con esta API");
    }

    console.log("🌐 [editItemSubmit] Llamando al servicio API...");
    const result = await editItemService(itemId, updateData);
    
    console.log("✅ [editItemSubmit] Item actualizado exitosamente");

    toast.success("Plato actualizado con éxito");

    if (onSuccess) {
      console.log("🔄 [editItemSubmit] Ejecutando callback onSuccess");
      await onSuccess();
    }
    
    return result;
  } catch (error) {
    console.error("❌ [editItemSubmit] Error al editar item:", error);
    toast.error("No se pudo actualizar el plato");
    throw error;
  }
};