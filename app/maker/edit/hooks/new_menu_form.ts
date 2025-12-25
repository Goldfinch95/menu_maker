// hooks/new_menu_form.ts
import { newMenu } from "../types/new_menu";
import { handleNewMenuSubmit } from "./new_menu_submit";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { validations, NewMenuFormData } from "../utils/validate_form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Menu } from "@/app/home/types/menu";

export const newMenuForm = (menuData: Menu | null = null) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<NewMenuFormData>({
    resolver: zodResolver(validations),
    defaultValues: {
      title: menuData?.title || "",
      pos: menuData?.pos || "",
      logo: menuData?.logo || undefined,
      backgroundImage: menuData?.backgroundImage || undefined,
      color: {
        primary: menuData?.color.primary || "#D4D4D4",
        secondary: menuData?.color.secondary || "#262626",
      },
    },
  });
  
  const onSubmit = async (formData: NewMenuFormData) => {
    if (!menuData) {
    console.error("No hay datos del menú para actualizar");
    return;
  }

    const values = getValues();

    const dataToUpdate: newMenu = {
    title: formData.title,
    pos: formData.pos || "",
    // Si no se sube un nuevo archivo, mantener el existente
    logo: values.logo?.[0] || menuData.logo,
    backgroundImage: values.backgroundImage?.[0] || menuData.backgroundImage,
    color: {
      primary: formData.color?.primary || menuData.color?.primary || "#D4D4D4",
      secondary: formData.color?.secondary || menuData.color?.secondary || "#262626",
    },
  };
    
    await handleNewMenuSubmit(dataToUpdate, router);
  };
  
  return { register, handleSubmit, errors, control, onSubmit, isSubmitting };
};