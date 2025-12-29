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
    console.log("🗑️ [useItemOperations] Iniciando eliminación de item:", itemId);
    setDeletingItemId(itemId);
    
    try {
      await deleteItemSubmit({
        itemId,
        onSuccess: onItemChange,
      });
      console.log("✅ [useItemOperations] Item eliminado exitosamente");
    } catch (error) {
      console.error("❌ [useItemOperations] Error al eliminar item:", error);
    } finally {
      setDeletingItemId(null);
    }
  };

  // ========== CREAR ITEM ==========
  const createItem = async (formData: FormData, categoryId: number) => {
    console.log("➕ [useItemOperations] Iniciando creación de item");
    console.log("📋 CategoryId:", categoryId);
    
    setCreatingItem(true);
    
    try {
      await createItemSubmit({
        formData,
        categoryId,
        onSuccess: onItemChange,
      });
      console.log("✅ [useItemOperations] Item creado exitosamente");
    } catch (error) {
      console.error("❌ [useItemOperations] Error al crear item:", error);
      throw error;
    } finally {
      setCreatingItem(false);
    }
  };

  // ========== EDITAR ITEM ==========
  const editItem = async (item: Items, formData: FormData) => {
    console.log("✏️ [useItemOperations] Iniciando edición de item:", item.id);
    
    // Obtener el ID de la primera imagen si existe
    const existingImageId = item.images?.[0]?.id;
    console.log("🖼️ [useItemOperations] ID de imagen existente:", existingImageId);
    
    setEditingItemId(item.id);
    
    try {
      await editItemSubmit({
        itemId: item.id,
        formData,
        existingImageId,
        onSuccess: onItemChange,
      });
      console.log("✅ [useItemOperations] Item editado exitosamente");
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