// boton de crear menu
import { Button } from "@/common/components/atoms/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const CreateMenuButton = () => {
  return (
    <Link href={"/maker/menu"} className="w-full lg:w-auto">
      <Button className="w-full sm:w-[90%] lg:w-auto lg:min-w-50 lg:max-w-87.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-2xl p-10 sm:p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl active:scale-[0.98] overflow-hidden shadow-lg">
        <div className=" flex items-center justify-center">
          <p className="text-white  text-xl sm:text-lg font-semibold">Crear menú</p>
        </div>
      </Button>
    </Link>
  );
};
