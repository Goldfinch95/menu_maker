import * as z from "zod";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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

// ✅ Schema personalizado para price que garantiza el tipo correcto


export const itemValidations = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(50, "El título no puede exceder 50 caracteres")
    .trim(),
  
  description: z
    .string()
    .max(200, "La descripción no puede exceder 200 caracteres")
    .trim()
    .optional()
    .or(z.literal("")),
  
  price: z.any(),
  
  image: fileValidation,
});

export type ItemFormData = z.infer<typeof itemValidations>;