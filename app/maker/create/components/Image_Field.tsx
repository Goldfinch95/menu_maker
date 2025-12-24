// ImageFields.tsx
"use client";
import { Input } from "@/common/components/atoms/input";
import {
  Field,
  FieldLabel,
} from "@/common/components/molecules/field";
import { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";


interface ImageFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const ImageFields = ({ register, errors }: ImageFieldsProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bgPreview, setBgPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  };

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setBgPreview(null);
    }
  };

  return (
    <>
      <Field>
        <FieldLabel htmlFor="logo">Logo</FieldLabel>
        <Input
          {...register("logo", {
            onChange: handleLogoChange
          })}
          id="logo"
          type="file"
          accept="image/*"
          aria-invalid={!!errors.logo}
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
            onChange: handleBgChange
          })}
          id="backgroundImage"
          type="file"
          accept="image/*"
          aria-invalid={!!errors.backgroundImage}
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