// campos de creacion de informacion del menu
"use client";
import { Button } from "@/common/components/atoms/button";
//import { emailForm } from "../hooks/email_form";
//import Errors from "./errors_msg";
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
} from "@/common/components/molecules/field";
import { Input } from "@/common/components/atoms/input";


export const InfoField = () => {
  /*const { register, handleSubmit, errors, onSubmit, isSubmitting } =
    emailForm();*/

  return (
    <div></div>
    /*<form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Errors errors={errors} />
          <Field>
            <FieldLabel htmlFor="name">Nombre del Menu</FieldLabel>
            <Input
              {...register("name")}
              id="name"
              type="string"
              aria-invalid={!!errors.name}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="string">Ubicacion/Puntos de venta</FieldLabel>
            <Input
              {...register("pos")}
              id="pos"
              type="string"
              aria-invalid={!!errors.pos}
            />
          </Field>
          <Field>
            <Button
              className="w-full py-4 rounded-lg text-base bg-linear-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-sm hover:shadow-md active:scale-[0.98] transition-transform"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando Email..." : "Enviar Email"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>*/
  );
};
