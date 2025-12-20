"use client";

import { Button } from "@/common/components/atoms/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/common/components/molecules/field";
import { Input } from "@/common/components/atoms/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formState } from "../types/form_state";
import { handleLoginSubmit, handleTogglePassword } from "../hooks/handlers";
import { loginForm } from "../hooks/login_form";
import { Controller } from "react-hook-form";
import Errors from "./errors_msg";
import { authService } from "../services/auth_service";

export const LoginField = () => {
  //const [form, setForm] = useState<formState>({ email: "", password: "" });
  const { register, handleSubmit, errors, onSubmit , isSubmitting } = loginForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Errors errors={errors} />
          {/* aqui deberian ir los errores */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              {...register("email")}
              id="email"
              type="email"
              aria-invalid={!!errors.email}
              //onChange={(e) => handleChange(e, setForm)}
            />
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <FieldLabel className="bg-transparent text-orange-500 font-semibold p-0">
                <a href="/forgot_password">¿Olvidaste tu contraseña?</a>
              </FieldLabel>
            </div>
            <div className="relative">
              <Input
                {...register("password")}
                //onChange={(e) => handleChange(e, setForm)}
                id="password"
                type={showPassword ? "text" : "password"}
                aria-invalid={!!errors.password}
              />
              <Button
                onClick={() => handleTogglePassword(setShowPassword)}
                type="button"
                className="absolute bg-transparent hover:bg-transparent right-1 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? (
                  <Eye className="w-12 h-12" />
                ) : (
                  <EyeOff className="w-12 h-12" />
                )}
              </Button>
            </div>
          </Field>
          <Field>
            <Button
              className="w-full py-4 rounded-lg text-base bg-linear-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-sm hover:shadow-md active:scale-[0.98] transition-transform"
              //onClick={(e) => handleSubmit(e, form)}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
