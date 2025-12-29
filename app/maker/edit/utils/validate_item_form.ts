import * as z from "zod";

// Configuración de validación de archivos
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

/**
 * Validación para archivos de imagen
 * - Tamaño máximo: 5MB
 * - Tipos aceptados: jpg, jpeg, png, webp
 */
export const fileValidation = z
  .any()
  .refine((files) => {
    // Si es undefined, null o string (URL existente), es válido
    if (!files || typeof files === 'string') return true;
    
    // Si es FileList vacío, es válido
    if (files instanceof FileList && files.length === 0) return true;
    
    // Si es un File directamente
    if (files instanceof File) {
      return files.size <= MAX_FILE_SIZE;
    }
    
    // Si es FileList con archivo, validar tamaño
    if (files instanceof FileList && files[0]) {
      return files[0].size <= MAX_FILE_SIZE;
    }
    
    return true;
  }, "El archivo debe ser menor a 5MB")
  .refine((files) => {
    // Si es undefined, null o string (URL existente), es válido
    if (!files || typeof files === 'string') return true;
    
    // Si es FileList vacío, es válido
    if (files instanceof FileList && files.length === 0) return true;
    
    // Si es un File directamente
    if (files instanceof File) {
      return ACCEPTED_IMAGE_TYPES.includes(files.type);
    }
    
    // Si es FileList con archivo, validar tipo
    if (files instanceof FileList && files[0]) {
      return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
    }
    
    return true;
  }, "Solo se aceptan archivos .jpg, .jpeg, .png y .webp");

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
  
  // ✅ OPCIONAL: Imagen del plato
  image: fileValidation.optional(),
});

export type ItemFormData = z.infer<typeof itemValidations>;