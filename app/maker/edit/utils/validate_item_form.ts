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
    "El archivo debe ser de 4MB o menos. Intenta con otro archivo si es más grande."
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Por favor, sube una imagen en formato .jpg, .jpeg, .png o .webp."
  )
  .optional();

// ✅ Schema personalizado para price que garantiza el tipo correcto

export const itemValidations = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres.")
    .max(50, "El título no puede tener más de 50 caracteres.")
    .trim(),

  description: z
    .string()
    .refine((val) => val === "" || (val.length >= 3 && val.length <= 200), {
      message:
        "Si decides agregar una descripción, debe tener entre 3 y 200 caracteres.",
    })
    .optional(),

  price: z
    .union([z.number(), z.nan(), z.literal("")])
    .transform((val) => {
      // Si es vacío, NaN o undefined, devolvemos 0
      if (val === "" || Number.isNaN(val) || val === undefined) {
        return 0;
      }
      return Number(val);
    })
    .pipe(
      z
        .number()
        .min(0, "El precio debe ser un número positivo o igual a 0.")
        .max(999999, "El precio no puede exceder $999,999.")
    ),

  image: fileValidation,
});

export type ItemFormData = z.infer<typeof itemValidations>;
