import * as z from "zod";

// Configuración de validación de archivos
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

/**
 * Validación para archivos de imagen
 * - Tamaño máximo: 4MB
 * - Tipos aceptados: jpg, jpeg, png, webp
 */
export const fileValidation = z
  .instanceof(File)
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    "El archivo debe ser menor a 4MB"
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Solo se aceptan archivos .jpg, .jpeg, .png y .webp"
  )
  .optional();

export const itemValidations = z.object({
  // ✅ REQUERIDO: Nombre del plato (3-60 caracteres)
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(60, "El título no puede exceder 60 caracteres")
    .trim(),
  
  // ✅ OPCIONAL: Descripción (máximo 200 caracteres si se proporciona)
  description: z
    .string()
    .max(200, "La descripción no puede exceder 200 caracteres")
    .optional()
    .or(z.literal("")),
  
  // ✅ OPCIONAL: Precio (debe ser mayor o igual a 0 si se proporciona)
  price: z.preprocess(
    (val) => {
      // Si es undefined, null o string vacío, devolver undefined
      if (val === undefined || val === null || val === "") return undefined;
      // Si es string, convertir a number
      if (typeof val === "string") {
        const num = parseFloat(val);
        return isNaN(num) ? undefined : num;
      }
      // Si ya es número, devolverlo
      return val;
    },
    z.number().min(0, "El precio no puede ser negativo").optional()
  ),
  
  // ✅ OPCIONAL: Imagen del plato (File)
  image: fileValidation,
});

export type ItemFormData = z.infer<typeof itemValidations>;