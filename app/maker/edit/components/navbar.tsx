// navbar de crear menu
"use client";
import { ChevronLeft, Eye } from "lucide-react";
import Link from "next/link";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/common/components/organism/menubar";

export const Navbar = () => {
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
          <Link href={"/home"}>
            <Eye className="w-6 h-6 text-slate-700" />
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};
