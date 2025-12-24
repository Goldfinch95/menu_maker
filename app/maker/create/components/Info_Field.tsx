// InfoField.tsx
"use client";
import { useState } from "react";
import { Button } from "@/common/components/atoms/button";
import { newMenuForm } from "../hooks/new_menu_form";
import Errors from "./errors_msg";
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
} from "@/common/components/molecules/field";
import { Input } from "@/common/components/atoms/input";
import { HexColorPicker } from "react-colorful";
import { Controller } from "react-hook-form";

type ActiveColorField = "primary" | "secondary";

export const InfoField = () => {
  const { register, handleSubmit, control, errors, onSubmit, isSubmitting } =
    newMenuForm();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bgPreview, setBgPreview] = useState<string | null>(null);
  
  // Estado para trackear qué campo está activo
  const [activeColorField, setActiveColorField] = useState<ActiveColorField>("primary");

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Errors errors={errors} />
          
          <Field>
            <FieldLabel htmlFor="title">Nombre del Menu</FieldLabel>
            <Input
              {...register("title")}
              id="title"
              type="text"
              aria-invalid={!!errors.title}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="pos">Ubicacion/Puntos de venta</FieldLabel>
            <Input
              {...register("pos")}
              id="pos"
              type="text"
              aria-invalid={!!errors.pos}
            />
          </Field>

          {/* UN SOLO Color Picker que se vincula dinámicamente */}
          <Field>
            <FieldLabel>Selector de colores</FieldLabel>
            
            {/* SOLUCIÓN: key aquí en el Controller del picker */}
            <Controller
              key={activeColorField} // ⬅️ KEY AQUÍ para forzar re-render
              name={`color.${activeColorField}`}
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  <HexColorPicker
                    color={field.value || (activeColorField === "primary" ? "#D4D4D4" : "#262626")}
                    onChange={field.onChange}
                    style={{ width: "100%", height: 220, borderRadius: "1rem" }}
                  />
                  
                  {/* Indicador visual de qué color está activo */}
                  <div className="text-sm text-gray-600 text-center">
                    Editando: <span className="font-semibold">
                      {activeColorField === "primary" ? "Color Primario" : "Color Secundario"}
                    </span>
                  </div>
                </div>
              )}
            />
          </Field>

          {/* Input para Color Primary */}
          <Field>
            <FieldLabel htmlFor="colorPrimary">Color Primario</FieldLabel>
            <Controller
              name="color.primary"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <div
                    onClick={() => setActiveColorField("primary")}
                    className={`w-12 h-12 rounded-lg border-2 shadow-sm flex-shrink-0 cursor-pointer transition-all hover:scale-105 ${
                      activeColorField === "primary"
                        ? "border-orange-500 ring-2 ring-orange-300"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: field.value || "#D4D4D4" }}
                    title="Click para editar este color"
                  />
                  <Input
                    id="colorPrimary"
                    type="text"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || value.startsWith("#")) {
                        field.onChange(value);
                      }
                    }}
                    onFocus={() => setActiveColorField("primary")}
                    placeholder="#D4D4D4"
                    className={`font-mono uppercase ${
                      activeColorField === "primary" 
                        ? "ring-2 ring-orange-500 border-orange-500" 
                        : ""
                    }`}
                  />
                </div>
              )}
            />
            {errors.color?.primary && (
              <p className="text-sm text-red-600 mt-1">
                {errors.color.primary.message}
              </p>
            )}
          </Field>

          {/* Input para Color Secondary */}
          <Field>
            <FieldLabel htmlFor="colorSecondary">Color Secundario</FieldLabel>
            <Controller
              name="color.secondary"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <div
                    onClick={() => setActiveColorField("secondary")}
                    className={`w-12 h-12 rounded-lg border-2 shadow-sm flex-shrink-0 cursor-pointer transition-all hover:scale-105 ${
                      activeColorField === "secondary"
                        ? "border-orange-500 ring-2 ring-orange-300"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: field.value || "#262626" }}
                    title="Click para editar este color"
                  />
                  <Input
                    id="colorSecondary"
                    type="text"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || value.startsWith("#")) {
                        field.onChange(value);
                      }
                    }}
                    onFocus={() => setActiveColorField("secondary")}
                    placeholder="#262626"
                    className={`font-mono uppercase ${
                      activeColorField === "secondary" 
                        ? "ring-2 ring-orange-500 border-orange-500" 
                        : ""
                    }`}
                  />
                </div>
              )}
            />
            {errors.color?.secondary && (
              <p className="text-sm text-red-600 mt-1">
                {errors.color.secondary.message}
              </p>
            )}
          </Field>

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

          <Field>
            <Button
              className="w-full py-4 rounded-lg text-base bg-linear-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-sm hover:shadow-md active:scale-[0.98] transition-transform"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando Menu..." : "Crear Menu"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};