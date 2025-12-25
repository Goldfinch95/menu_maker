// components/ColorPickerFields.tsx
"use client";
import { Controller, Control } from "react-hook-form";
import {
  Field,
  FieldLabel,
} from "@/common/components/molecules/field";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/common/components/atoms/input";
import { useColorPicker } from "../hooks/use_color_picker";

interface ColorPickerFieldsProps {
  control: Control<any>;
}

export const ColorPickerFields = ({ control }: ColorPickerFieldsProps) => {
  const { activeColorField, setActiveColorField } = useColorPicker();

  return (
    <>
      {/* Selector de colores */}
      <Field>
        <FieldLabel>Selector de colores</FieldLabel>
        
        <Controller
          key={activeColorField}
          name={`color.${activeColorField}`}
          control={control}
          render={({ field }) => (
            <div className="space-y-4">
              <HexColorPicker
                color={
                  field.value ||
                  (activeColorField === "primary" ? "#D4D4D4" : "#262626")
                }
                onChange={field.onChange}
                style={{ width: "100%", height: 220, borderRadius: "1rem" }}
              />
              
              <div className="text-sm text-gray-600 text-center">
                Editando:{" "}
                <span className="font-semibold">
                  {activeColorField === "primary"
                    ? "Color Primario"
                    : "Color Secundario"}
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
                className={`w-12 h-12 rounded-lg border-2 shadow-sm shrink-0 cursor-pointer transition-all hover:scale-105 ${
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
                className={`w-12 h-12 rounded-lg border-2 shadow-sm shrink-0 cursor-pointer transition-all hover:scale-105 ${
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
      </Field>
    </>
  );
};