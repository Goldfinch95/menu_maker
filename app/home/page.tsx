import React from "react";
import { Navbar } from "./components/Navbar";
import Image from 'next/image';

/*
debe renderizar:
1. un nav con icono del logo , nombre de la app (solo visible en escritorio), icono de logout
2. al hacer click en el icono y si el usuario tiene UserId 1,debe abrir un segundo navbar con opciones
3. el segundo navbar debe tener varias opciones pero por ahora unicamente habilitado el crear usuario.
----- fin de las tareas hasta que se termine el testeo general del login, registro, recuperar contraseña ----
4. renderizar el boton de crear menu
5. mostrar los menus creados
6. mostrar la pagina de FAQ
*/
const page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex-1 w-full relative bg-[#5d6d7c]">
        <Image 
          src="/under_construction.jpg" 
          alt="Descripción"
          fill
          className="object-contain"
          priority // opcional, para cargar rápido
        />
      </div>
    </div>
  );
};

export default page;
