//pagina de cambio de contraseña : renderiza la pagina de recuperacion
"use client"

import { PasswordChangeCard } from './components/password_change_card';


const page = () => {
    /*
    RECORDATORIO:
    Tenes comentado
     -el form en password_form.ts
     -el passwordChangeService en handlers
    
     recuerda pasar el token en change_service.ts, body.
    
    */
    return (
        <div className='w-full h-screen sm:h-auto sm:max-w-md'>
            <PasswordChangeCard />
        </div>
    );
};

export default page;