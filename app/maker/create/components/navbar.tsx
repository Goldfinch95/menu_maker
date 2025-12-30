// navbar de crear menu
"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/common/components/organism/menubar";

export const Navbar = () => {
  return (
    <Menubar className="w-full justify-between ps-4">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={"/home"}>
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <div className="flex-1 flex justify-center">
        <MenubarMenu>
          <div className="font-medium me-10">Crear Menu</div>
        </MenubarMenu>
      </div>
    </Menubar>
  );
};
