// ImageFields.tsx
"use client";
import { Input } from "@/common/components/atoms/input";
import { Field, FieldLabel } from "@/common/components/molecules/field";
import { UseFormRegister } from "react-hook-form";
import { useImagePreview } from "../hooks/image_preview_handlers";

interface ImageFieldsProps {
  register: UseFormRegister<any>;
  
}

export const ImageFields = ({ register }: ImageFieldsProps) => {
  const { logoPreview, bgPreview, handleLogoChange, handleBgChange } =
    useImagePreview();

  return (
    <>
      <Field>
        <FieldLabel htmlFor="logo">Logo</FieldLabel>
        <Input
          {...register("logo", {
            onChange: handleLogoChange,
          })}
          id="logo"
          type="file"
          accept="image/*"
          
        />
        {logoPreview && (
          <div className="mt-2">
            <img
              src={logoPreview}
              alt="Preview del logo"
              className="h-20 w-20 object-cover rounded-lg border"
            />
          </div>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="backgroundImage">Imagen de Fondo</FieldLabel>
        <Input
          {...register("backgroundImage", {
            onChange: handleBgChange,
          })}
          id="backgroundImage"
          type="file"
          accept="image/*"
          
        />
        {bgPreview && (
          <div className="mt-2">
            <img
              src={bgPreview}
              alt="Preview del fondo"
              className="h-32 w-full object-cover rounded-lg border"
            />
          </div>
        )}
      </Field>
    </>
  );
};
