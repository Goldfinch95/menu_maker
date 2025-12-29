"use server";

import { cookies } from "next/headers";

import { ImageItems } from "../types/items";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function updateItemImage(id: number, data: Partial<ImageItems>) {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");
  const subdomainCookie = cookiesStore.get("subdomain");
  const authToken = tokenCookie?.value;
  const tenant = subdomainCookie?.value;

  if (!authToken) {
    throw new Error("No autenticado");
  }

  const response = await fetch(`${BASE_URL}/images/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "x-tenant-subdomain": tenant || "",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al actualizar imagen: ${response.status} - ${errorText}`);
  }

  // Manejar respuestas vacías (204 No Content o body vacío)
  const contentType = response.headers.get("content-type");

  if (response.status !== 204 && contentType?.includes("application/json")) {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  return null;
}