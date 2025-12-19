//pagina de login : renderiza el login
"use client"

import { LoginCard } from "./components/login_card";



const login = () => {
  //tarea:
    /*
    1.agregar validaciones
    2.agregar toast
    */
  return (
    <div className="w-full max-w-md">
      <LoginCard />
    </div>
  );
};

export default login;
