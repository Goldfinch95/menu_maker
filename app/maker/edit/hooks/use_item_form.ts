import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemValidations, ItemFormData } from "../utils/validate_item_form";
import { useState } from "react";
import { Items } from "@/app/home/types/menu";

interface UseItemFormProps {
  item?: Items;
  categoryId: number;
  onSubmit: (formData: FormData) => Promise<void>;
}

export const useItemForm = ({
  item,
  categoryId,
  onSubmit,
}: UseItemFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    item?.images?.[0]?.url || null
  );

  const isEditMode = !!item;

  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemValidations),
    defaultValues: {
      title: item?.title || "",
      description: item?.description || "",
      price: item?.price || undefined,
      image: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = form;

  // Observar el campo image del formulario
  const imageFile = watch("image");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("🔍 [handleImageChange] Archivo seleccionado:", file);
    
    if (file) {
      console.log("✅ [handleImageChange] Guardando archivo:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });
      
      // ✅ Guardar en react-hook-form
      setValue("image", file, { shouldValidate: true });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        console.log("✅ [handleImageChange] Preview generado");
      };
      reader.readAsDataURL(file);
    } else {
      console.warn("⚠️ [handleImageChange] No se detectó archivo");
    }
  };

  const removeImage = () => {
    console.log("🗑️ [removeImage] Eliminando imagen");
    setValue("image", undefined);
    setImagePreview(null);
  };

  const handleFormSubmit = async (data: ItemFormData) => {
    console.log("📤 [handleFormSubmit] Iniciando submit");
    console.log("  data:", data);

    const formData = new FormData();

    // Datos básicos
    formData.append("title", data.title);
    console.log("  ✓ title agregado");

    if (data.description) {
      formData.append("description", data.description);
      console.log("  ✓ description agregado");
    }

    if (data.price !== undefined && data.price !== null && !isNaN(data.price)) {
      formData.append("price", String(data.price));
      console.log("  ✓ price agregado:", data.price);
    }

    // ✅ CRÍTICO: Agregar imagen si existe
    if (data.image instanceof File) {
      formData.append("image", data.image, data.image.name);
      console.log("  ✅ image agregado:", data.image.name);
    } else {
      console.log("  ℹ️ No hay imagen para agregar");
    }

    // CategoryId (solo en modo creación)
    if (!isEditMode) {
      formData.append("categoryId", String(categoryId));
      console.log("  ✓ categoryId agregado:", categoryId);
    }

    // 🔍 Verificar contenido del FormData
    console.log("📦 [handleFormSubmit] Contenido del FormData:");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size} bytes)`);
      } else {
        console.log(`  ${key}:`, value);
      }
    }

    try {
      await onSubmit(formData);
      console.log("✅ [handleFormSubmit] Submit exitoso");
    } catch (error) {
      console.error("❌ [handleFormSubmit] Error en submit:", error);
      throw error;
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    errors,
    isSubmitting,
    imageFile,
    imagePreview,
    handleImageChange,
    removeImage,
    reset,
  };
};