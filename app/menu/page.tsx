"use client"
import { useEffect, useState } from 'react';
import { getPublicMenu } from './services/public_menu_services';
import { useSearchParams } from 'next/navigation';
import { Menu } from './types/menu';
import { Suspense } from 'react';

function MenuPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadMenu = async () => {
      try {
        setLoading(true);
        const data = await getPublicMenu(id);
        console.log(data);
        setMenu(data);
      } catch (error) {
        console.error("❌ Error al cargar el menú:", error);
        setError("No se pudo cargar el menú");
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [id]);

  if (loading) return <div>Cargando menú...</div>;
  if (error) return <div>{error}</div>;
  if (!id) return <div>No se proporcionó ID de menú</div>;
  if (!menu) return <div>No se encontró el menú</div>;

  return (
    <div>
      <div>Título: {menu.title}</div>
      <div>Pos: {menu.pos}</div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <MenuPageContent />
    </Suspense>
  );
}