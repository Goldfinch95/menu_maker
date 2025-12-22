//pagina de renderizado de los menues
"use client";
import { CreateMenuButton } from "./components/Create_Menu_Button";
import { Navbar } from "./components/Navbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Manrope } from "next/font/google";

import { Menu } from "./types/menu";
import { getAllMenus } from "./services/menu_service";
import { MenuList } from "./components/Menu_List";
import Faq from "./components/Faq";

const manrope = Manrope({ subsets: ["latin"] });

/*
debe renderizar:
1. al hacer click en el icono y si el usuario tiene UserId 1,debe abrir un segundo navbar con opciones
----- fin de las tareas hasta que se termine el testeo general del login, registro, recuperar contraseña ----
5. mostrar los menus creados
6. mostrar la pagina de FAQ
*/
const page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex flex-col justify-center items-center py-8">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl">
          <CreateMenuButton />
        </div>
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
          <MenuList />
        </div>
        <div>
          <Faq />
        </div>
      </div>
    </div>
  );
};

export default page;
