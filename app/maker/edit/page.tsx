"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getMenuId } from "./services/menu";
import { useFetchMenu } from "./hooks/use_fetch_menu";
/*import { Button } from "@/common/components/atoms/button";
import { useState } from "react";
import { getMenuQr } from "./services/qr_service";


const page = () => {
  

  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Construir la URL pública del menú
  const menuPublicUrl = menuId 
    ? `https://template-menu-self.vercel.app/menu?id=${menuId}` 
    : null;

  const handleGetQr = async () => {
     if (!menuId) {
      setError("No se encontró el ID del menú");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const qrBlob = await getMenuQr(Number(menuId));
      const url = URL.createObjectURL(qrBlob);
      setQrUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al obtener QR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      
       {/*boton para enviar peticion de qr 
      <button
        onClick={handleGetQr}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Cargando..." : "Obtener QR"}
      </button>
      {/* mostrar qr 
      {qrUrl && (
        <div className="border rounded p-4 bg-white">
          <img src={qrUrl} alt="QR del menú" className="w-64 h-64" />
         {/* mostrar URL del blob 
          <div className="text-sm text-gray-600 break-all max-w-md text-center">
            <p className="font-semibold mb-1">URL del menú:</p>
            <a 
              href={menuPublicUrl || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-100 p-2 rounded block text-blue-600 hover:underline"
            >
              {menuPublicUrl}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;*/

const page = () => {
  const searchParams = useSearchParams();
  const menuId = searchParams.get("id");

  const { menuData } = useFetchMenu(menuId);

  

  return (
    <div>
       <div>{menuData?.title}</div>
        <div>{menuData?.pos}</div>
    </div>
  );
};

export default page;
