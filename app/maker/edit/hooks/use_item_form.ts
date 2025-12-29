import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemValidations, ItemFormData } from "../utils/validate_item_form";
import { useState } from "react";
import { Items } from "@/app/home/types/menu";

interface UseItemFormProps {
  item?: Items; // Si existe, es modo edición
  categoryId: number;
  onSubmit: (formData: FormData) => Promise<void>;
}

export const useItemForm = ({ item, categoryId, onSubmit }: UseItemFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    item?.images?.[0]?.url || null
  );

  const isEditMode = !!item;

  console.log("🎨 [useItemForm] Inicializando formulario:", {
    mode: isEditMode ? "EDICIÓN" : "CREACIÓN",
    itemId: item?.id,
    categoryId,
    hasExistingImage: !!imagePreview,
  });

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
    reset,
  } = form;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("🖼️ [useItemForm] Nueva imagen seleccionada:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        console.log("✅ [useItemForm] Preview generado correctamente");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    console.log("🗑️ [useItemForm] Imagen removida");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleFormSubmit = async (data: ItemFormData) => {
    console.log("📤 [useItemForm] Preparando datos para envío:");
    console.log("  Modo:", isEditMode ? "EDICIÓN" : "CREACIÓN");
    console.log("  Datos del formulario:", data);
    console.log("  Tiene nueva imagen:", !!imageFile);
    console.log("  CategoryId:", categoryId);

    const formData = new FormData();
    
    // Datos básicos
    formData.append("title", data.title);
    console.log("  ✓ title:", data.title);
    
    if (data.description) {
      formData.append("description", data.description);
      console.log("  ✓ description:", data.description);
    }
    
    if (data.price !== undefined && data.price !== null && !isNaN(data.price)) {
      formData.append("price", String(data.price));
      console.log("  ✓ price:", data.price);
    }
    
    // Imagen (solo si hay una nueva)
    if (imageFile) {
      formData.append("image", imageFile);
      console.log("  ✓ image:", imageFile.name);
    }
    
    // CategoryId (solo en modo creación)
    if (!isEditMode) {
      formData.append("categoryId", String(categoryId));
      console.log("  ✓ categoryId:", categoryId);
    }

    console.log("🚀 [useItemForm] Enviando FormData...");

    try {
      await onSubmit(formData);
      console.log("✅ [useItemForm] Formulario enviado exitosamente");
    } catch (error) {
      console.error("❌ [useItemForm] Error al enviar formulario:", error);
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