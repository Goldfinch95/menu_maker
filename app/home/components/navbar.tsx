// navbar de home
import React from 'react';
import {
 Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/common/components/organism/menubar"
import { UtensilsCrossed, LogOut } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <Menubar className='w-full justify-between'>
      <MenubarMenu>
        <MenubarTrigger>
            <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href={"/user/create/account"}>Crear Usuario</Link>
          </MenubarItem>
          <MenubarItem disabled>
            Cuentas
          </MenubarItem>
          <MenubarItem disabled>Otra opcion</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger>Titulo</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
            <LogOut className="w-6 h-6 text-slate-700" />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
    );
};

