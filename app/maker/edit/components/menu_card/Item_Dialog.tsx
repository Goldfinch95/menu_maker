"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/common/components/organism/dialog";
import { Button } from "@/common/components/atoms/button";
import { Input } from "@/common/components/atoms/input";
import { Label } from "@/common/components/atoms/label";
import { Textarea } from "@/common/components/atoms/textarea";
import { Upload, X } from "lucide-react";
import { Items } from "@/app/home/types/menu";
import { useItemForm } from "../../hooks/use_item_form";

interface ItemDialogProps {
  categoryId: number;
  item?: Items;
  trigger: React.ReactNode;
  onSubmit: (formData: FormData) => Promise<void>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ItemDialog: React.FC<ItemDialogProps> = ({
  categoryId,
  item,
  trigger,
  onSubmit,
  open: controlledOpen,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  const isEditMode = !!item;

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    imagePreview,
    handleImageChange,
    removeImage,
    reset,
  } = useItemForm({
    item,
    categoryId,
    onSubmit: async (formData) => {
      await onSubmit(formData);
      setOpen(false);
      reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-md rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogClose className="absolute right-6 top-6 rounded-sm opacity-70 transition-opacity hover:opacity-100">
          <X className="h-5 w-5 text-slate-600" />
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            {isEditMode ? "Editar Plato" : "Nuevo Plato"}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {isEditMode
              ? "Modifica los detalles de tu plato"
              : "Agrega un nuevo plato a tu menú"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="item-title" className="text-sm font-medium text-slate-700">
                Nombre del plato *
              </Label>
              <Input
                id="item-title"
                {...register("title")}
                placeholder="Ej: Hamburguesa clásica"
                maxLength={60}
                autoFocus
                className="w-full"
              />
              {errors.title && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span>⚠️</span> {errors.title.message}
                </p>
              )}
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="item-description" className="text-sm font-medium text-slate-700">
                Descripción
              </Label>
              <Textarea
                id="item-description"
                {...register("description")}
                placeholder="Describe tu plato..."
                maxLength={200}
                rows={3}
                className="w-full resize-none"
              />
              {errors.description && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span>⚠️</span> {errors.description.message}
                </p>
              )}
            </div>

            {/* Precio */}
            <div className="space-y-2">
              <Label htmlFor="item-price" className="text-sm font-medium text-slate-700">
                Precio
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
                <Input
                  id="item-price"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("price")}
                  placeholder="0.00"
                  className="w-full pl-7"
                />
              </div>
              {errors.price && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span>⚠️</span> {errors.price.message}
                </p>
              )}
            </div>

            {/* Imagen */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Imagen</Label>

              {imagePreview ? (
                <div className="relative w-full h-48 rounded-lg border-2 border-slate-200 overflow-hidden group">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-slate-400 mb-3" />
                    <p className="text-sm text-slate-600 font-medium mb-1">
                      Haz clic para subir una imagen
                    </p>
                    <p className="text-xs text-slate-500">
                      PNG, JPG o WEBP (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <DialogFooter className="flex gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Guardando...
                </span>
              ) : isEditMode ? (
                "Actualizar"
              ) : (
                "Crear"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};