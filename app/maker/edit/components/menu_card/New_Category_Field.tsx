import React from 'react';
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
} from "@/common/components/molecules/field";
import { Input } from "@/common/components/atoms/input";
import { Button } from "@/common/components/atoms/button";

export const NewCategoryField = () => {
    return (
        <form >
          <FieldSet>
            <FieldGroup>
              {/*<Errors errors={errors} />*/}
              <Field>
                <FieldLabel htmlFor="title">Titulo de la Categoria</FieldLabel>
                <Input
                  placeholder="Ingresa el título de la categoría"
                  id="title"
                  type="text"
                  
                />
              </Field>
              <Field>
                <Button
                  className="w-full py-4 rounded-lg text-base bg-linear-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-sm hover:shadow-md active:scale-[0.98] transition-transform"
                  type="submit"
                  
                >
                  {/*{isSubmitting ? "Actualizando Menu..." :*/} Crear
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
    );
};

