//validaciones del formulario con zod
import * as z from "zod";

export const validations = z.object({
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .trim() // Elimina espacios accidentales al inicio o final
    .email("Escribe una dirección de correo válida (ej: nombre@correo.com)"),

  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseña es muy corta (mínimo 8 caracteres)")
    .max(16, "La contraseña es muy larga (máximo 16 caracteres)"),
});
