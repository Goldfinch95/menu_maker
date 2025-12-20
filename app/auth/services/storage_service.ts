'use server'

import { cookies } from "next/headers";
import { authResponse } from "../types/auth_response";

export const handleLoginResponse = async (response: authResponse) => {
  const cookiesStore = await cookies();

  // Configurar las cookies correctamente
  await cookiesStore.set('token', response.token, { path: '/', httpOnly: true });
  await cookiesStore.set('subdomain', response.user.subdomain, { path: '/' });
  await cookiesStore.set('roleId', response.user.roleId.toString(), { path: '/' });
};