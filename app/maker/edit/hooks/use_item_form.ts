import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemValidations, ItemFormData } from "../utils/validate_item_form";
import { useState } from "react";
import { Items } from "@/app/home/types/menu";
import { toast } from "sonner";

interface UseItemFormProps {
  item?: Items;
  categoryId: number;
  onSubmit: (formData: FormData) => Promise<{ success: boolean; error?: string; imageError?: boolean; message?: string }>;
  onSuccess?: () => void;
}

const IS_DEV = process.env.NODE_ENV === 'development';

export const useItemForm = ({
  item,
  categoryId,
  onSubmit,
  onSuccess,
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
    
    
    
    if (file) {
      // ✅ Guardar en react-hook-form
      setValue("image", file, { shouldValidate: true });
      
      if (IS_DEV) {
        console.log("✅ [handleImageChange] Archivo guardado en form");
      }
      
      // Generar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
       
      };
      reader.readAsDataURL(file);
    } else {
      
    }
  };

  const removeImage = () => {
    
    setValue("image", undefined);
    setImagePreview(null);
  };

  const handleFormSubmit = async (data: ItemFormData) => {
    

    const formData = new FormData();

    // Datos básicos
    formData.append("title", data.title);

    if (data.description) {
      formData.append("description", data.description);
    }

    if (data.price !== undefined && data.price !== null && !isNaN(data.price)) {
      formData.append("price", String(data.price));
    }

    // ✅ CRÍTICO: Agregar imagen si existe
    if (data.image instanceof File) {
      formData.append("image", data.image, data.image.name);
    } 
    

    // CategoryId (solo en modo creación)
    if (!isEditMode) {
      formData.append("categoryId", String(categoryId));
    }

    // 🔍 Verificar contenido final del FormData
    

    try {
      const result = await onSubmit(formData);
      
     

      if (result.success) {
        if (result.imageError) {
          toast.warning(result.message || "Plato creado, pero falló la imagen");
        } else {
          toast.success(result.message || "Plato creado exitosamente");
        }

        // Ejecutar callback de éxito
        if (onSuccess) {
          await onSuccess();
        }
      } else {
        toast.error(result.error || "Error al crear el plato");
      }
    } catch (error) {
      console.error("❌ [handleFormSubmit] Error en submit:", error);
      toast.error("Error inesperado al crear el plato");
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