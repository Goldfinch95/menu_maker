import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/common/components/organism/dialog";
import { X } from "lucide-react";
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
} from "@/common/components/molecules/field";
import { Input } from "@/common/components/atoms/input";
import { Button } from "@/common/components/atoms/button";
import { NewCategoryField } from "./New_Category_Field";

export interface InfoDialogProps {
  children: ReactNode;
}

export const NewCategoryDialog = ({ children }: InfoDialogProps) => {
  return (
    <Dialog>
      {/* Esto muestra el botón que abre el diálogo */}
      {children}
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto [&>button]:hidden">
        <DialogHeader>
          <div className="relative flex items-center justify-center">
            <DialogTitle className="text-xl font-semibold text-black">
              Crear Categoria
            </DialogTitle>
            <DialogClose className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/70">
              <X className="h-5 w-5 text-orange-400" />
            </DialogClose>
          </div>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/*aqui va el field */}
        <NewCategoryField />
        {/*<InfoField  menuData={menuData} />*/}
        {/* Aquí agregas el contenido que necesites */}
      </DialogContent>
    </Dialog>
  );
};
