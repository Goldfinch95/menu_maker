import { toast } from "sonner";
import { createItemService } from "../services/create_item_service";
import { updateImage } from "../services/image_service";
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
    // Extraer datos del FormData
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;
    const priceStr = formData.get("price") as string | null;
    const imageFile = formData.get("image") as File | null;

    // PASO 1: Crear el item sin imagen
    const newItem: NewItem = {
      categoryId,
      title,
      description: description || undefined,
      price: priceStr ? parseFloat(priceStr) : undefined,
      active: true,
    };

    const createdItem = await createItemService(newItem);


    // PASO 2: Si hay imagen, subirla
    // ✅ Verificar propiedades en lugar de instanceof
    const isValidFile =
      imageFile &&
      typeof imageFile === "object" &&
      "name" in imageFile &&
      "size" in imageFile &&
      imageFile.size > 0;

    if (isValidFile) {
      try {

        // ✅ NUEVO FORMATO: Array de imágenes con fileField
        const uploadedImage = await updateImage({
          itemId: createdItem.id,
          images: [
            {
              fileField: "image", // Nombre del campo del FormData
              file: imageFile as File,
            },
          ],
        });

        // Actualizar el item con la imagen
        createdItem.images = [uploadedImage];
      } catch (imageError) {
        console.error(
          "⚠️ [createItemSubmit] Error al subir imagen:",
          imageError
        );

        toast.warning(
          "Plato creado exitosamente, pero hubo un error al subir la imagen. Puedes editarlo para agregar la imagen más tarde."
        );
      }
    } else {
      console.log("ℹ️ [createItemSubmit] No hay imagen válida para subir");
    }

    // PASO 3: Notificar éxito
    toast.success("Plato creado con éxito");

    // PASO 4: Ejecutar callback de éxito
    if (onSuccess) {
      console.log("🔄 [createItemSubmit] Ejecutando onSuccess callback");
      await onSuccess();
    }

    return createdItem;
  } catch (error) {
    console.error("❌ [createItemSubmit] Error:", error);
    toast.error(
      error instanceof Error ? error.message : "No se pudo crear el plato"
    );
    throw error;
  }
};
