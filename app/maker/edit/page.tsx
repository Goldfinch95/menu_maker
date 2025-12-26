"use client";

import { Navbar } from "./components/navbar";
import { InfoCard } from "./components/info_card/Info_Card";
import { Suspense } from "react";
import {DeleteButton} from "./components/Delete_Button";
import { MenuCard } from "./components/menu_card/Menu_Card";

const editPage = () => {
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
          <InfoCard />
          <MenuCard />
          <DeleteButton />
        </Suspense>
      </div>
    </div>
  );
};

export default editPage;
