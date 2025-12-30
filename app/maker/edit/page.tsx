"use client";

import { Navbar } from "./components/navbar";
import { InfoCard } from "./components/info_card/Info_Card";
import { Suspense } from "react";
import { DeleteButton } from "./components/Delete_Button";
import { MenuCard } from "./components/menu_card/Menu_Card";
import { useSearchParams } from "next/navigation";
import { useFetchMenu } from "./hooks/use_fetch_menu";

// Componente interno que usa useSearchParams
const EditPageContent = () => {
  const searchParams = useSearchParams();
  const menuId = searchParams.get("id");

  const { menuData } = useFetchMenu(menuId);

  console.log(menuData?.categories);

  // Mostrar loading mientras se cargan los datos
  if (!menuData) {
    return (
      <div className="flex flex-col justify-center items-center py-8 grow">
        <div className="w-full max-w-sm mx-auto p-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-gray-200 rounded-2xl"></div>
            <div className="h-48 bg-gray-200 rounded-2xl"></div>
            <div className="h-16 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar menuData={menuData} />
      <div className="flex flex-col justify-center items-center py-8 grow">
        <InfoCard menuData={menuData} />
        <MenuCard menuData={menuData} />
        <DeleteButton />
      </div>
    </div>
  );
};

// Componente principal con Suspense
const EditPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Suspense
        fallback={
          <div className="flex flex-col justify-center items-center py-8 grow">
            <div className="w-full max-w-sm mx-auto p-8 text-center">
              <div className="animate-pulse space-y-4">
                <div className="h-48 bg-gray-200 rounded-2xl"></div>
                <div className="h-48 bg-gray-200 rounded-2xl"></div>
                <div className="h-16 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        }
      >
        <EditPageContent />
      </Suspense>
    </div>
  );
};

export default EditPage;
