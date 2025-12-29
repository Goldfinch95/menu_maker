import { useState } from "react";
import { deleteItemService } from "../services/delete_item_service";
import { createItemService } from "../services/create_item_service";
import { editItemService } from "../services/edit_item_service";

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
      await deleteItemService({ itemId, onSuccess: onItemChange });
    } catch (error) {
      console.error("Error en deleteItem:", error);
    } finally {
      setDeletingItemId(null);
    }
  };

  // ========== CREAR ITEM ==========
  const createItem = async (formData: FormData, categoryId: number) => {
    setCreatingItem(true);
    
    try {
      await createItemService({ formData, categoryId, onSuccess: onItemChange });
    } catch (error) {
      console.error("Error en createItem:", error);
      throw error;
    } finally {
      setCreatingItem(false);
    }
  };

  // ========== EDITAR ITEM ==========
  const editItem = async (itemId: number, formData: FormData) => {
    setEditingItemId(itemId);
    
    try {
      await editItemService({ itemId, formData, onSuccess: onItemChange });
    } catch (error) {
      console.error("Error en editItem:", error);
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