'use server';

import { cookies } from "next/headers";
import { ImageItems } from "../types/items";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface UploadImageParams {
  itemId: number;
  imageFile: File;
}

export async function updateImage({ itemId, imageFile }: UploadImageParams): Promise<ImageItems> {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");
  const subdomainCookie = cookiesStore.get("subdomain");
  const authToken = tokenCookie?.value;
  const tenant = subdomainCookie?.value;

  if (!authToken) {
    throw new Error("No autenticado");
  }
  // Construir FormData con la imagen
  const formData = new FormData();
  formData.append("image", imageFile, imageFile.name);

  // La URL correcta según tu backend: /api/images/:id
  const response = await fetch(`${BASE_URL}/api/images/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "x-tenant-subdomain": tenant || "",
    },
    body: formData, // Solo envías { url?: string, active?: boolean }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ [uploadImage] Error response:", errorText);
    throw new Error(`Error al subir imagen: ${response.status} - ${errorText}`);
  }

  const contentType = response.headers.get("content-type");
  
  if (contentType?.includes("application/json")) {
    const data = await response.json();
    console.log("✅ [uploadImage] Imagen subida exitosamente:", data);
    return data.image || data; // Ajusta según la estructura de tu API
  }

  throw new Error("Respuesta del servidor no es JSON");
}