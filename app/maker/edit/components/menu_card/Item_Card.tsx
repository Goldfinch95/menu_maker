"use client";

import React from "react";
import { Button } from "@/common/components/atoms/button";
import { Pencil, Trash2 } from "lucide-react";
import { Items } from "@/app/home/types/menu";
import { ItemImage } from "./Item_Image";

interface ItemCardProps {
  item: Items;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  const previewUrl = item.images?.[0]?.url || null;

  return (
    <div className="flex justify-between items-center bg-white border border-slate-200 rounded-xl p-3 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3 overflow-hidden flex-1">
        {/* Imagen */}
        <ItemImage imageUrl={previewUrl} alt={item.title} />

        {/* Información del item */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="font-medium text-slate-700 text-sm truncate">
            {item.title || "Nuevo plato"}
          </p>
        </div>

        {/* Precio */}
        {item.price && item.price > 0 && (
          <div className="shrink-0 px-2">
            <p className="text-slate-600 text-sm font-semibold">
              ${Number.isInteger(Number(item.price))
                ? Number(item.price)
                : Number(item.price).toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex gap-1 ml-2">
        {/* Botón Editar */}
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
          onClick={onEdit}
          type="button"
        >
          <Pencil className="w-4 h-4" />
        </Button>

        {/* Botón Eliminar */}
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={onDelete}
          disabled={isDeleting}
          type="button"
        >
          {isDeleting ? (
            <div className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};