import { toast } from "sonner";
import { editItemService } from "../services/edit_item_service";
import { updateImage } from "../services/image_service";
import { NewItem } from "../types/items";

interface EditItemParams {
  itemId: number;
  formData: FormData;
  existingImageId?: number;
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

    // 1. Extraer datos del FormData original
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;
    const priceStr = formData.get("price") as string | null;
    const imageFile = formData.get("image") as File | null;

    // 2. Actualizar datos básicos del item
    const updateData: Partial<NewItem> = {
      title,
      description: description || undefined,
      price: priceStr ? parseFloat(priceStr) : undefined,
      active: true,
    };

    console.log("🌐 [editItemSubmit] Enviando actualización de datos...");
    const result = await editItemService(itemId, updateData);

    // 3. Manejar actualización de imagen si existe un archivo nuevo
    const hasValidImage =
      imageFile && imageFile instanceof File && imageFile.size > 0;

    if (hasValidImage) {
      console.log("🚀 [Paso 2] Detectada nueva imagen, preparando subida...");

      // Creamos el FormData específico para el servicio de imágenes
      const imageFormData = new FormData();

      /** * Formato requerido por el backend:
       * - 'images': Un string JSON con el mapeo del campo.
       * - [fileField]: El archivo real.
       */
      const metadata = JSON.stringify([
        { id: existingImageId, fileField: "image" },
      ]);
      imageFormData.append("images", metadata);
      imageFormData.append("image", imageFile, imageFile.name);
      console.log(itemId);
      try {
        // Corregido: Usamos itemId que viene por parámetros
        await updateImage(itemId, imageFormData);
        console.log("✅ [editItemSubmit] Nueva imagen subida exitosamente");
      } catch (imageError: any) {
        console.error(
          "⚠️ [editItemSubmit] Error al subir nueva imagen:",
          imageError
        );
        toast.warning("Datos actualizados, pero la imagen no se pudo procesar");
        // No lanzamos error aquí para permitir que el flujo continúe si el texto sí se guardó
      }
    }

    toast.success("Plato actualizado con éxito");

    if (onSuccess) {
      await onSuccess();
    }

    return result;
  } catch (error: any) {
    console.error("❌ [editItemSubmit] Error crítico:", error);
    toast.error(error.message || "No se pudo actualizar el plato");
    throw error;
  }
};
