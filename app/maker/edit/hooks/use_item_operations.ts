import { useState } from "react";
import { deleteItemSubmit } from "./delete_item_submit";
import { createItemSubmit } from "./create_item_submit";
import { editItemSubmit } from "./edit_item_submit";
import { Items } from "@/app/home/types/menu";

interface UseItemOperationsProps {
  onItemChange: () => Promise<void>;
}

export const useItemOperations = ({ onItemChange }: UseItemOperationsProps) => {
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [creatingItem, setCreatingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  // ========== ELIMINAR ITEM ==========
  const deleteItem = async (itemId: number) => {
    setDeletingItemId(itemId);
    
    try {
      await deleteItemSubmit({
        itemId,
        onSuccess: onItemChange,
      });
    } catch (error) {
      console.error("❌ [useItemOperations] Error al eliminar item:", error);
    } finally {
      setDeletingItemId(null);
    }
  };

  // ========== CREAR ITEM ==========
  const createItem = async (formData: FormData, categoryId: number) => {
    setCreatingItem(true);
    
    try {
      await createItemSubmit({
        formData,
        categoryId,
        onSuccess: onItemChange,
      });
    } catch (error) {
      console.error("❌ [useItemOperations] Error al crear item:", error);
      throw error;
    } finally {
      setCreatingItem(false);
    }
  };

  // ========== EDITAR ITEM ==========
  const editItem = async (item: Items, formData: FormData) => {
    
    
    // Obtener el ID de la primera imagen si existe
    const existingImageId = item.images?.[0]?.id;
   
    
    setEditingItemId(item.id);
    
    try {
      await editItemSubmit({
        itemId: item.id,
        formData,
        existingImageId,
        onSuccess: onItemChange,
      });
      
    } catch (error) {
      console.error("❌ [useItemOperations] Error al editar item:", error);
      throw error;
    } finally {
      setEditingItemId(null);
    }
  };

  return {
    // Delete
    deleteItem,
    deletingItemId,
    isDeleting: deletingItemId !== null,
    
    // Create
    createItem,
    creatingItem,
    
    // Edit
    editItem,
    editingItemId,
    isEditing: editingItemId !== null,
  };
};