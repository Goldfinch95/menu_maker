//validaciones del formulario con zod
import * as z from "zod";

// Validación personalizada para archivos
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const fileValidation = z
  .any()
  .refine((files) => {
    if (!files || files.length === 0) return true;
    return files[0]?.size <= MAX_FILE_SIZE;
  }, "El archivo debe ser menor a 4MB")
  .refine((files) => {
    if (!files || files.length === 0) return true;
    return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type);
  }, "Solo se aceptan archivos .jpg, .jpeg, .png y .webp");

  // Validación para colores hexadecimales
const hexColorValidation = z
  .string()
  .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Debe ser un color hexadecimal válido (ej: #FF5733)");

//validacion para el titulo y la ubicacion
export const validations = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede exceder 100 caracteres"),
  pos: z
    .string()
    .min(3, "La ubicación debe tener al menos 3 caracteres")
    .max(200, "La ubicación no puede exceder 200 caracteres"),
  logo: fileValidation.optional(),
  backgroundImage: fileValidation.optional(),
  color: z.object({
    primary: hexColorValidation,
    secondary: hexColorValidation,
  }),
});
