import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemValidations, ItemFormData } from "../utils/validate_item_form";
import { useState } from "react";
import { Item } from "../types/items";

interface UseItemFormProps {
  item?: Item; // Si existe, es modo edición
  categoryId: number;
  onSubmit: (formData: FormData) => Promise<void>;
}

export const useItemForm = ({ item, categoryId, onSubmit }: UseItemFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    item?.images?.[0]?.url || null
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemValidations),
    defaultValues: {
      title: item?.title || "",
      description: item?.description || "",
      price: item?.price || undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleFormSubmit = async (data: ItemFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.price) formData.append("price", String(data.price));
    if (imageFile) formData.append("image", imageFile);
    if (!item) formData.append("categoryId", String(categoryId));

    await onSubmit(formData);
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