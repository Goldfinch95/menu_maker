import { toast } from "sonner";
import { editItemService } from "../services/edit_item_service";
import { uploadItemImage } from "../services/image_service";
import { NewItem } from "../types/items";

interface EditItemParams {
  itemId: number;
  formData: FormData;
  existingImageId?: number; // ID de la imagen existente (si hay)
  onSuccess?: () => void;
}

export const editItemSubmit = async ({
  itemId,
  formData,
  existingImageId,
  onSuccess,
}: EditItemParams) => {
  try {
    console.log("✏️ [editItemSubmit] Editando item:", itemId);
    
    // Extraer datos del FormData
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;
    const priceStr = formData.get("price") as string | null;
    const imageFile = formData.get("image") as File | null;

    console.log("📋 [editItemSubmit] Datos extraídos:");
    console.log("  title:", title);
    console.log("  description:", description);
    console.log("  price:", priceStr);
    console.log("  imageFile:", imageFile ? `File(${imageFile.name}, ${imageFile.size} bytes)` : "Sin imagen nueva");
    console.log("  existingImageId:", existingImageId);

    // PASO 1: Actualizar datos básicos del item
    const updateData: Partial<NewItem> = {
      title,
      description: description || undefined,
      price: priceStr ? parseFloat(priceStr) : undefined,
    };

    console.log("🌐 [editItemSubmit] Actualizando datos del item...");
    const result = await editItemService(itemId, updateData);
    console.log("✅ [editItemSubmit] Datos actualizados");

    // PASO 2: Manejar imagen si hay una nueva
    if (imageFile && imageFile.size > 0) {
      console.log("🖼️ [editItemSubmit] Detectada nueva imagen");
      
      if (existingImageId) {
        console.log("ℹ️ [editItemSubmit] Imagen anterior será reemplazada automáticamente por la API");
      }

      // Subir la nueva imagen (la API se encarga de reemplazar la anterior)
      console.log("⬆️ [editItemSubmit] Subiendo nueva imagen...");
      try {
        await uploadItemImage(itemId, imageFile);
        console.log("✅ [editItemSubmit] Nueva imagen subida exitosamente");
      } catch (imageError) {
        console.error("⚠️ [editItemSubmit] Error al subir nueva imagen:", imageError);
        toast.warning("Plato actualizado, pero hubo un error al actualizar la imagen");
      }
    }

    toast.success("Plato actualizado con éxito");

    if (onSuccess) {
      console.log("🔄 [editItemSubmit] Ejecutando callback onSuccess");
      await onSuccess();
    }
    
    return result;
  } catch (error) {
    console.error("❌ [editItemSubmit] Error:", error);
    toast.error("No se pudo actualizar el plato");
    throw error;
  }
};