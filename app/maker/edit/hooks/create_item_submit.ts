import { toast } from "sonner";
import { createItemService } from "../services/create_item_service";
import { uploadItemImage } from "../services/image_service";
import { NewItem } from "../types/items";

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
    console.log("➕ [createItemSubmit] Creando item para categoría:", categoryId);
    
    // Extraer datos del FormData
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;
    const priceStr = formData.get("price") as string | null;
    const imageFile = formData.get("image") as File | null;

    console.log("📋 [createItemSubmit] Datos extraídos:");
    console.log("  title:", title);
    console.log("  description:", description);
    console.log("  price:", priceStr);
    console.log("  image:", imageFile ? `File(${imageFile.name}, ${imageFile.size} bytes)` : "Sin imagen");

    // PASO 1: Crear el item sin imagen
    const newItem: NewItem = {
      categoryId,
      title,
      description: description || undefined,
      price: priceStr ? parseFloat(priceStr) : undefined,
      active: true,
    };

    console.log("🌐 [createItemSubmit] Creando item en la API...");
    const createdItem = await createItemService(newItem);
    
    console.log("✅ [createItemSubmit] Item creado:", createdItem);
    console.log("🔍 [createItemSubmit] ID del item creado:", createdItem?.id);
    console.log("🔍 [createItemSubmit] Item completo:", JSON.stringify(createdItem, null, 2));

    // PASO 2: Si hay imagen, subirla después
    if (imageFile && imageFile.size > 0) {
      console.log("🖼️ [createItemSubmit] Subiendo imagen del item...");
      console.log("  imageFile.name:", imageFile.name);
      console.log("  imageFile.size:", imageFile.size);
      console.log("  createdItem.id:", createdItem?.id);
      
      if (!createdItem?.id) {
        console.error("❌ [createItemSubmit] No se obtuvo el ID del item creado");
        toast.warning("Plato creado, pero no se pudo subir la imagen (falta ID)");
        return createdItem;
      }
      
      try {
        console.log("🚀 [createItemSubmit] Llamando a uploadItemImage...");
        const uploadResult = await uploadItemImage(createdItem.id, imageFile);
        console.log("✅ [createItemSubmit] Imagen subida exitosamente:", uploadResult);
      } catch (imageError) {
        console.error("⚠️ [createItemSubmit] Error al subir imagen:", imageError);
        console.error("  Error completo:", JSON.stringify(imageError, null, 2));
        toast.warning("Plato creado, pero hubo un error al subir la imagen");
      }
    } else {
      console.log("ℹ️ [createItemSubmit] No hay imagen para subir");
    }

    toast.success("Plato creado con éxito");

    if (onSuccess) {
      console.log("🔄 [createItemSubmit] Ejecutando callback onSuccess");
      await onSuccess();
    }
    
    return createdItem;
  } catch (error) {
    console.error("❌ [createItemSubmit] Error:", error);
    toast.error(error instanceof Error ? error.message : "No se pudo crear el plato");
    throw error;
  }
};