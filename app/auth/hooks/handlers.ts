// controladores del login

import { authService } from "../services/auth_service";
import { formState } from "../types/form_state";
import { toast } from "sonner";

//valores del input
export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: React.Dispatch<React.SetStateAction<formState>>
) => {
  const { id, value } = e.target;
  setForm((prev) => ({ ...prev, [id]: value }));
  //console.log(id,value)
};

// visualizacion de la contraseña (ojo)
export const handleTogglePassword = (
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setShowPassword((eye) => !eye); // Alterna el valor de showPassword
};

//peticion de logeo
export const handleSubmit = async (
  e: { preventDefault: () => void },
  form: formState
) => {
  e.preventDefault();
  //console.log("click");
  //console.log("enviando", form.email, form.password);
  //enviar a la base de datos
  try {
    await authService(form);
    //console.log ("login exitoso")
    //redirigir a otra pagina
  } catch (error) {
    console.error("Error en la autenticación:", error);
    
    if (error instanceof Error) {
      toast.error("El Email o Contraseña que ingresaste es incorrecto");
    } 
    
  }
};