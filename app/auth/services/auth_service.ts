//logica de autenticacion

import { authResponse } from "../types/auth_response";
import { formState } from "../types/form_state";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const authService = async (data: formState): Promise<authResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        }),
    });
    if(!response.ok){
        throw new Error ("Email o Contraseña Erronea");
        //toast.error
    }
    return response.json();
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    throw error;
  }
};
