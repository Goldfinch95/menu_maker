// src/features/menu/hooks/useMenuData.ts

import { useState, useEffect } from "react";
import { Menu, Categories } from "../types/menu";
import { getPublicMenu } from "../services/public_menu_services";

export function useMenuData(menuId: string | null) {
  const [menu, setMenu] = useState<Menu>({} as Menu);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!menuId) {
      setIsLoading(false);
      return;
    }

    const loadMenu = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const menuData = await getPublicMenu(menuId);
        console.log("Menú cargado:", menuData);
        
        setMenu(menuData);

        const sortedCategories = [...menuData.categories].sort(
          (a, b) => a.position - b.position
        );
        setCategories(sortedCategories);
      } catch (error) {
        console.error("❌ Error al cargar el menú:", error);
        setError(error instanceof Error ? error.message : "Error al cargar el menú");
      } finally {
        setIsLoading(false);
      }
    };

    loadMenu();
  }, [menuId]);

  return { menu, categories, isLoading, error };
}