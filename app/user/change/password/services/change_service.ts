//llamado a la api de cambio de contraseña

import { passwordType } from "../types/password";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const userChangePasswordService = async (data: passwordType, token: string): Promise <{ message: string }> => {
    try {
        const response = await fetch(`${BASE_URL}/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                password: data.password,
            }),
        });
        if(!response.ok){
          if(response.status === 401){
            throw new Error("Error 401");
          }
          else {
            throw new Error("Error al iniciar sesión");
          }  
        }
        return await response.json();
      } catch (error) {
        console.error("Error al autenticar usuario:", error);
        throw error;
      }
}