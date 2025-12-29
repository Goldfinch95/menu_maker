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

    //paso 2: controlar el id del item
    console.log(createdItem.categoryId)

    // PASO 2: Si hay imagen, subirla
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      console.log("🖼️ [createItemSubmit] Subiendo imagen...");
      
      try {
        const uploadedImage = await updateImage({
          itemId: createdItem.id,
          imageFile: imageFile,
        });
        
        console.log("✅ [createItemSubmit] Imagen subida exitosamente:", uploadedImage);
        
        // Actualizar el item con la imagen
        createdItem.images = [uploadedImage];
        
      } catch (imageError) {
        console.error("⚠️ [createItemSubmit] Error al subir imagen:", imageError);
        
        // El item ya fue creado, solo falló la imagen
        toast.warning(
          "Plato creado exitosamente, pero hubo un error al subir la imagen. Puedes editarlo para agregar la imagen más tarde."
        );
        
        // No lanzamos el error para no bloquear el éxito parcial
      }
    } else {
      console.log("ℹ️ [createItemSubmit] No hay imagen para subir");
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
    toast.error(error instanceof Error ? error.message : "No se pudo crear el plato");
    throw error;
  }
};