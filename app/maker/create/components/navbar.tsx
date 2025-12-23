// navbar de home
"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/common/components/organism/menubar";
import { ChevronLeft, LogOut } from "lucide-react";
import Link from "next/link";
//import { handleLogout } from "../services/log_out_service";

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

  <div className="flex-1 flex justify-center">
    <MenubarMenu>
      <MenubarTrigger>Crear Menu</MenubarTrigger>
    </MenubarMenu>
  </div>
</Menubar>
  );
};
