//llamado a la api de crear cuenta
"use server";

import { cookies } from "next/headers";
import { formUser } from "../types/form_user";
import { User } from "../types/user";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const registerUserAction = async (data: formUser): Promise<User> => {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");
  const authToken = tokenCookie?.value;

  if (!authToken) {
    throw new Error("No se encontró el token de autenticación");
  }

  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      name: data.name,
      lastName: data.last_name,
      email: data.email,
      cel: data.cel,
      roleId: data.role_id,
    }),
  });

  if (!response.ok) {
  const errorText = await response.text();
  console.error("Error de respuesta:", errorText); // Registra el error completo

  let errorMessage = "No se pudo registrar el usuario";
  try {
    const errorJson = JSON.parse(errorText);
    errorMessage = errorJson.message || errorMessage;
  } catch {
    // Si no es JSON, usa el texto directamente o el mensaje por defecto
  }

  // Manejo específico de errores
  if (response.status === 409) {
    throw new Error("El email ya está registrado");
  } else if (response.status === 500) {
    throw new Error("Error del servidor. Intenta nuevamente");
  } else if (response.status === 401) {
    throw new Error("No autorizado");
  } else {
    throw new Error(errorMessage);
  }
}

  return await response.json();
};
