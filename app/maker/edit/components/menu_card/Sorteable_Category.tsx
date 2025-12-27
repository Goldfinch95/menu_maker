"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/common/components/atoms/collapsible";
import { Button } from "@/common/components/atoms/button";
import { cn } from "@/lib/utils";
import { Categories } from "@/app/home/types/menu";
import { CategoryTitle } from "./Category_Title";
//import { CategoryDeleteDialog } from "./Category_Delete_Dialog";
import { useEditCategoryForm } from "../../hooks/use_edit_category_form";
// import { ItemList } from "@/menu/items/components/ItemList";

interface SortableCategoryProps {
  category: Categories;
  expandedCategoryId: number | null;
  setExpandedCategoryId: (id: number | null) => void;
  onDelete: () => void;
  onCategoryChange: () => Promise<void>;
  sensors: any;
}

export const SortableCategory: React.FC<SortableCategoryProps> = ({
  category,
  expandedCategoryId,
  setExpandedCategoryId,
  onDelete,
  onCategoryChange,
  sensors,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  // ========== HOOK DE EDICIÓN CON VALIDACIONES ==========
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    showSaveButton,
    handleFocus,
    handleBlur,
  } = useEditCategoryForm({
    categoryId: category.id,
    initialTitle: category.title,
    onSuccess: onCategoryChange,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isExpanded = expandedCategoryId === category.id;

  return (
    <div ref={setNodeRef} style={style}>
      <Collapsible
        open={isExpanded}
        onOpenChange={() =>
          setExpandedCategoryId(isExpanded ? null : category.id)
        }
      >
        {/* ========== FORM WRAPPER ========== */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
            {/* Drag Handle */}
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing touch-none mr-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <GripVertical className="w-5 h-5" />
            </div>

            {/* ========== TÍTULO EDITABLE CON VALIDACIONES ========== */}
            <CategoryTitle
              register={register}
              errors={errors}
              showSaveButton={showSaveButton}
              onSave={handleSubmit(onSubmit)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              isSubmitting={isSubmitting}
            />

            {/* Botones de acción */}
            <div className="flex space-x-2">
              {/*<CategoryDeleteDialog onDelete={onDelete} />*/}

              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 p-0 rounded-lg transition-all duration-200",
                    isExpanded
                      ? "bg-orange-50 text-orange-500 shadow-sm"
                      : "text-slate-500 hover:bg-slate-100"
                  )}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
        </form>

        {/* Contenido desplegable (Items) */}
        <CollapsibleContent>
          {/* <ItemList ... /> */}
          <div className="p-4 text-sm text-slate-500">
            Items de la categoría aquí...
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};