"use client"
import  { useEffect, useState } from 'react';
import { getPublicMenu } from './services/public_menu_services';
import { useSearchParams } from 'next/navigation';
import { Menu } from './types/menu';

const menuPage = () => {
  const searchParams = useSearchParams();
   const id = searchParams.get('id');
  const [menu, setMenu] = useState<Menu | null>(null);


    useEffect(() => {
     if (!id || typeof id !== 'string') return;

    const loadMenu = async () => {
      
      try {
        
        const data = await getPublicMenu(id);
        console.log(data);
        setMenu(data);
        
      } catch (error) {
        console.error("❌ Error al cargar el menú:", error);
        
      }
    };

    loadMenu();
  }, [id]);
    return (
        <div>
            <div>Título: {menu?.title}</div>
      <div>Pos: {menu?.pos}</div>
            {/* mostrar nombre*/}
            {/* mostrar pos*/}
        </div>
    );
};

export default menuPage;