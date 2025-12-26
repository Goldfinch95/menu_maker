import * as z from "zod";


export const categoryValidations = z.object({
  title: z
    .string()
    .min(3, `El título debe tener al menos 3 caracteres`)
    .max(50, `El título no puede exceder 50 caracteres`)
    .trim(),
});

export type NewCategoryFormData = z.infer<typeof categoryValidations>;