//tarjeta de creacion de menu
"use client";

import { Button } from "@/common/components/atoms/button";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/common/components/organism/card";

import { Edit, BookImage, QrCode } from "lucide-react";
import { useFetchMenu } from "../hooks/use_fetch_menu";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useQrHandler } from "../hooks/use_qr_handler";
import { DialogTrigger } from "@/common/components/organism/dialog";
import { InfoDialog } from "./Info_Dialog";

export const InfoCard = () => {
  const searchParams = useSearchParams();
  const menuId = searchParams.get("id");

  const { menuData } = useFetchMenu(menuId);

  // Usar el hook directamente aquí
  const { handleGenerateQr, isGenerating } = useQrHandler({
    menuId: Number(menuData?.id),
    menuName: menuData?.title,
  });

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-lg pt-0 w-full max-w-sm mx-auto">
      <CardHeader className="bg-linear-to-r from-orange-500 to-orange-600 text-white pt-8 pb-15 relative rounded-t-xl ">
        <div className="text-left space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider opacity-90 mb-1">
            Información del menú
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {menuData?.title}
          </h2>
        </div>
        {/* Círculo blanco con icono centrado */}
        <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-xl">
            {/* logo */}
            <div
              className={`w-28 h-28 rounded-full overflow-hidden flex items-center justify-center 
              ${
                menuData?.logo
                  ? "ring-2 ring-slate-200"
                  : "border-2 border-dashed border-slate-300"
              }`}
            >
              {menuData?.logo ? (
                <Image
                  src={menuData?.logo}
                  alt="Logo preview"
                  width={80}
                  height={80}
                  className="object-cover"
                  priority
                />
              ) : (
                <BookImage className="w-12 h-12 text-slate-400" />
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-10 pb-6 px-6">
        {/* Botones */}
        <div className="flex align-center justify-center gap-6 pt-8">
          <div className="flex flex-row items-center justify-center gap-4 w-1/2">
            {/* este boton debe abrir el dialogo de editar menu */}
            <InfoDialog menuData={menuData} >
          <DialogTrigger asChild>
            <Button className="w-full h-25 bg-orange-500 text-white rounded-xl flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition duration-300">
              <Edit className="w-8! h-8!" />
              <span className="text-sm mt-2">Editar</span>
            </Button>
          </DialogTrigger>
        </InfoDialog>
            <Button
              onClick={handleGenerateQr}
              disabled={isGenerating}
              className="w-full h-25 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <QrCode className="w-8! h-8!" />
              <span className="text-sm mt-2">
                {isGenerating ? 'Generando...' : 'Generar QR'}
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};