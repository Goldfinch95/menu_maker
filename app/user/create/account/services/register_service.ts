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
    console.error("Error de respuesta:", errorText);

    let errorMessage = "No se pudo registrar el usuario";
    let errorData = null;

    try {
      errorData = JSON.parse(errorText);
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = errorText || errorMessage;
    }

    // Detectar email duplicado por mensaje o status
    const isDuplicateEmail = 
      response.status === 409 ||
      (response.status === 500 && (
        errorMessage.toLowerCase().includes("email") ||
        errorMessage.toLowerCase().includes("duplicate") ||
        errorMessage.toLowerCase().includes("already exists") ||
        errorMessage.toLowerCase().includes("ya existe")
      ));

    if (isDuplicateEmail) {
      throw new Error("El email ya está registrado. Por favor usa otro email.");
    }

    // Otros errores específicos
    if (response.status === 401) {
      throw new Error("No autorizado. Por favor inicia sesión nuevamente.");
    }

    if (response.status === 500) {
      throw new Error("Error del servidor. Intenta nuevamente más tarde.");
    }

    if (response.status === 400) {
      throw new Error(errorMessage || "Datos inválidos");
    }

    throw new Error(errorMessage);
  }

  return await response.json();
};
