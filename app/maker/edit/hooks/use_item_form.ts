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
    console.log("🔍 [handleImageChange] Archivo seleccionado:", file);
  console.log("🔍 [handleImageChange] FileList completo:", e.target.files);
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
    else {
    console.warn("⚠️ No se detectó archivo en el input");
  }
  };

  const removeImage = () => {
    console.log("🗑️ [useItemForm] Imagen removida");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleFormSubmit = async (data: ItemFormData) => {
   console.log("📤 [useItemForm] Estado del imageFile:", imageFile);
  console.log("📤 [useItemForm] ¿imageFile existe?", !!imageFile);

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
        console.log("✅ Agregando imagen al FormData");
      formData.append("image", imageFile);
      console.log("  ✓ image:", imageFile.name);
    }
    
    // CategoryId (solo en modo creación)
    if (!isEditMode) {
      formData.append("categoryId", String(categoryId));
      console.log("  ✓ categoryId:", categoryId);
    }

    console.log("🔍 FormData.get('image'):", formData.get("image"));

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