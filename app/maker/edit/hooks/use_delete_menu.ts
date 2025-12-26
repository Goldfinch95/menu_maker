import { deleteMenuService } from '../services/delete_menu_service';
import { useState } from 'react';
import { toast } from 'sonner';

export const useDeleteMenu = (router: any) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteMenu = async (menuId: number) => {
    setIsDeleting(true);

    try {
      await deleteMenuService(menuId);
      toast.success("Se ha borrado el Menu");
      router.push("/home");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se ha podido borrar el Menu");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteMenu,
    isDeleting,
  };
};