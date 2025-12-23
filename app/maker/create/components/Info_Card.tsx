import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/common/components/organism/card";
import Image from "next/image";
import { BookImage, QrCode } from "lucide-react";
import { Button } from "@/common/components/atoms/button";
import { InfoDialog } from "./Info_Dialog";

export const InfoCard = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-lg pt-0 w-full max-w-sm mx-auto">
      <CardHeader className="bg-linear-to-r from-orange-500 to-orange-600 text-white pt-8 pb-15 relative rounded-t-xl ">
        <div className="text-left space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider opacity-90 mb-1 pb-8">
            Información del menú
          </p>
        </div>
        {/* Círculo blanco con icono centrado */}
        <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-xl">
            {/* logo */}
            <div>
              <Image
                src={
                  "https://undevcode-menus.s3.sa-east-1.amazonaws.com/defaults/menu/default_menu.png"
                }
                alt="Logo preview"
                width={80}
                height={80}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-10 pb-6 px-6">
        {/* Botones */}
        <div className="flex align-center justify-center gap-6 pt-8">
          <div className="flex flex-row items-center justify-center gap-4 w-1/2">
            <InfoDialog
                /*menuId={currentMenuId}
                menuTitle={menu.title}
                menuPos={menu.pos}
                menuLogo={menu.logo}
                menuBackground={menu.backgroundImage}
                menuPrimary={menu.color?.primary}
                menuSecondary={menu.color?.secondary}
                onUpdated={handleMenuUpdated}
                trigger={
                  <Button className="w-full h-25 bg-orange-500 text-white rounded-xl flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition duration-300">
                    <Edit className="!w-8 !h-8" />
                    <span className="text-sm mt-2">Editar</span>
                  </Button>
                }*/
              />
            <Button
              //onClick={handleGenerateQr}
              //disabled={isGeneratingQr}
              className="w-full h-25 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col items-center justify-center"
            >
              {/*{isGeneratingQr ? (
                  <>
                    <Spinner className="w-6 h-6 mb-2 text-white" />
                    <span className="text-sm opacity-90">Generando...</span>
                  </>
                ) : (*/}
              <>
                <QrCode className="w-8! h-8!" />
                <span className="text-sm mt-2">Generar QR</span>
              </>
              {/*})}**/}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
