"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function createItemService(formData: FormData, categoryId: number) {
  const cookiesStore = await cookies();
  const authToken = cookiesStore.get("token")?.value;
  const tenant = cookiesStore.get("subdomain")?.value;

  if (!authToken) {
    throw new Error("No autenticado");
  }

  // Agregar categoryId al formData
  formData.append("categoryId", String(categoryId));

  const response = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "x-tenant-subdomain": tenant || "",
    },
    body: formData, // FormData incluye la imagen
  });

  if (!response.ok) {
    throw new Error(`Error al crear item: ${response.status}`);
  }

  const result = await response.json();
  revalidatePath("/home");
  return result;
}