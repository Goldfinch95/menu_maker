import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Categories } from "@/app/home/types/menu";
import { calculateNewPosition } from "../utils/positioning";
import { toast } from "sonner";

export const useCategoryDragDrop = (
  categories: Categories[],
  setCategories: (categories: Categories[]) => void,
  onCategoryChange: () => Promise<void>
) => {
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);

      // Actualización optimista de UI
      const newCategories = arrayMove(categories, oldIndex, newIndex);
      setCategories(newCategories);

      const movedCategory = categories[oldIndex];
      const newPosition = calculateNewPosition(categories, oldIndex, newIndex);

      try {
        // Llamar a tu API para actualizar la posición
        const response = await fetch(`/api/categories/${movedCategory.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ position: newPosition }),
        });

        if (!response.ok) throw new Error("Error al actualizar");

        await onCategoryChange();
      } catch (error) {
        console.error("❌ Error al actualizar el orden de categoría", error);
        setCategories(categories); // Revertir
        toast.error("Error al actualizar el orden");
      }
    }
  };

  return { handleDragEnd };
};