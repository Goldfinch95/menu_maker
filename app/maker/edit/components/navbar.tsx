// navbar de crear menu
"use client";
import { ChevronLeft, Eye } from "lucide-react";
import Link from "next/link";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/common/components/organism/menubar";
import { Menu } from "@/app/home/types/menu";

interface MenuCardProps {
  menuData: Menu | null;
}

export const Navbar = ({ menuData }: MenuCardProps) => {
  // Verifica si menuData es null antes de intentar acceder a menuId
  if (!menuData) {
    return null; // O cualquier renderizado alternativo si no hay menuData
  }

  const menuId = menuData.id;

  return (
    <Menubar className="w-full flex justify-between items-center">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={"/home"}>
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </Link>
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <div className="font-medium">Editar Menu</div>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>
          <Link href={`/menu?id=${menuId}&preview=true`}>
            <Eye className="w-6 h-6 text-slate-700" />
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};
