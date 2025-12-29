import { toast } from "sonner";
import { createItemService } from "../services/create_item_service";
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
    
    // Convertir FormData a NewItem
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;
    const priceStr = formData.get("price") as string | null;
    const image = formData.get("image") as File | null;

    console.log("📋 [createItemSubmit] Datos extraídos del FormData:");
    console.log("  title:", title);
    console.log("  description:", description);
    console.log("  price:", priceStr);
    console.log("  image:", image ? `File(${image.name})` : "No hay imagen");
    console.log("  categoryId:", categoryId);

    // Construir objeto NewItem
    const newItem: NewItem = {
      categoryId,
      title,
      description: description || undefined,
      price: priceStr ? parseFloat(priceStr) : undefined,
      active: true, // Por defecto activo
    };

    console.log("📦 [createItemSubmit] Objeto NewItem a enviar:");
    console.log(newItem);

    // ⚠️ NOTA: La API actual NO soporta subida de imágenes
    if (image) {
      console.warn("⚠️ [createItemSubmit] Imagen detectada pero NO se puede subir con esta API");
      console.warn("  La API solo acepta JSON, no FormData");
      console.warn("  Necesitarás un endpoint separado para subir imágenes");
    }

    console.log("🌐 [createItemSubmit] Llamando al servicio API...");
    const result = await createItemService(newItem);
    
    console.log("✅ [createItemSubmit] Respuesta del servicio:", result);
    console.log("✅ [createItemSubmit] Item creado exitosamente");

    toast.success("Plato creado con éxito");

    if (onSuccess) {
      console.log("🔄 [createItemSubmit] Ejecutando callback onSuccess");
      await onSuccess();
    }
    
    return result;
  } catch (error) {
    console.error("❌ [createItemSubmit] Error completo:", error);
    console.error("❌ [createItemSubmit] Error mensaje:", error instanceof Error ? error.message : "Error desconocido");
    
    toast.error(error instanceof Error ? error.message : "No se pudo crear el plato");
    throw error;
  }
};