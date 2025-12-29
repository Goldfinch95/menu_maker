'use client'; // Indicar que este código es del lado del cliente

import { useEffect, useState } from "react";
import Cookie from "js-cookie"; // Librería para manejar cookies en el cliente
import { ImageItems } from "../types/items";

interface ImageUpload {
  fileField: string;
  file: File;
}

interface UpdateImageParams {
  itemId: number;
  images: ImageUpload[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function updateImage({
  itemId,
  images,
}: UpdateImageParams): Promise<ImageItems> {
  const authToken = Cookie.get("token"); // Obtener el token de las cookies
  const tenant = Cookie.get("subdomain"); // Obtener el subdominio de las cookies

  if (!authToken || !tenant) {
    throw new Error("No se encontraron las cookies necesarias para la autenticación.");
  }

  console.log("📤 [updateImage] Iniciando actualización de imágenes");
  console.log("  itemId:", itemId);
  console.log("  número de imágenes:", images.length);

  const formData = new FormData();

  // Agregar cada imagen al FormData
  images.forEach((imageUpload) => {
    formData.append(
      "images",
      JSON.stringify({
        fileField: imageUpload.fileField,
      })
    );
    formData.append(imageUpload.fileField, imageUpload.file, imageUpload.file.name);
  });

  console.log("📦 Contenido del FormData:");
  formData.forEach((value, key) => {
    if (value instanceof File) {
      console.log(`Campo: ${key}, Archivo: ${value.name}`);
    } else {
      console.log(`Campo: ${key}, Valor: ${value}`);
    }
  });

  // Llamar al endpoint PUT con los headers de autorización
  const response = await fetch(`${BASE_URL}/images/items/${itemId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${authToken}`,
      "x-tenant-subdomain": tenant || "",
    },
    body: formData, // Enviar FormData sin Content-Type
  });

  console.log("📡 [updateImage] Respuesta de la API:", response.status);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("❌ Error en la respuesta de la API:", errorData);
    throw new Error(errorData.error || `Error al subir imagen: ${response.status}`);
  }

  const data = await response.json();
  console.log("✅ Imagen subida correctamente:", data);

  return data;
}
