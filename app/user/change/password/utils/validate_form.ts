//validaciones del formulario con zod
import * as z from "zod";

export const validations = z
  .object({
    password: z
      .string()
      .min(1, "La contraseña es obligatoria")
      .min(8, "La contraseña es muy corta (mínimo 8 caracteres)")
      .max(16, "La contraseña es muy larga (máximo 16 caracteres)"),
    control_password: z
      .string()
      .min(1, "Debes repetir la contraseña")
  })
  .refine((data) => data.password === data.control_password, {
    message: "Las contraseñas no coinciden",
  });

