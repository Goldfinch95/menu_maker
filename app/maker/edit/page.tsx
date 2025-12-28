"use client";

import { Navbar } from "./components/navbar";
import { InfoCard } from "./components/info_card/Info_Card";
import { Suspense } from "react";
import { DeleteButton } from "./components/Delete_Button";
import { MenuCard } from "./components/menu_card/Menu_Card";
import { useSearchParams } from "next/navigation";
import { useFetchMenu } from "./hooks/use_fetch_menu";

const EditPage = () => {
  const searchParams = useSearchParams();
  const menuId = searchParams.get("id");

  const { menuData } = useFetchMenu(menuId);

  // Mostrar loading mientras se cargan los datos
  if (!menuData) {
    return (
      <div className="min-h-screen w-full flex flex-col">
        <Navbar />
        <div className="flex flex-col justify-center items-center py-8 grow">
          <div className="w-full max-w-sm mx-auto p-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-48 bg-gray-200 rounded-2xl"></div>
              <div className="h-48 bg-gray-200 rounded-2xl"></div>
              <div className="h-16 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex flex-col justify-center items-center py-8 grow">
        <Suspense
          fallback={
            <div className="w-full max-w-sm mx-auto p-8 text-center">
              <div className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
          }
        >
          <InfoCard menuData={menuData} />
          <MenuCard menuData={menuData} />
          <DeleteButton />
        </Suspense>
      </div>
    </div>
  );
};

export default EditPage;