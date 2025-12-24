"use client";

import { useState } from "react";
import { getMenuQr } from "../services/qr_service";
import { generateQrPdf } from '../utils/generate_qr_pdf';


interface UseQrHandlerProps {
  menuId: number;
  menuName?: string;
}

export const useQrHandler = ({ menuId, menuName }: UseQrHandlerProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateQr = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Obtener el QR como Blob
      const qrBlob = await getMenuQr(menuId);

      // Convertir Blob a base64 para el PDF
      const qrBase64 = await blobToBase64(qrBlob);

      // Generar y descargar el PDF
      await generateQrPdf({
        qrImageBase64: qrBase64,
        menuName: menuName || `Menu ${menuId}`,
        menuId,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al generar el QR";
      setError(errorMessage);
      console.error("Error generando QR:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    handleGenerateQr,
    isGenerating,
    error,
  };
};

// Función auxiliar para convertir Blob a Base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
