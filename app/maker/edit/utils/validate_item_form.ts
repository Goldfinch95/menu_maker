import * as z from "zod";

export const itemValidations = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(60, "El título no puede exceder 60 caracteres")
    .trim(),
  description: z
    .string()
    .max(200, "La descripción no puede exceder 200 caracteres")
    .optional(),
  price: z
    .number()
    .min(0, "El precio no puede ser negativo")
    .optional()
    .or(z.string().transform(val => val ? parseFloat(val) : undefined)),
});

export type ItemFormData = z.infer<typeof itemValidations>;