// boton de crear menu
import { Button } from "@/common/components/atoms/button";
import { Plus } from "lucide-react";
import Link from "next/link";


export const CreateMenuButton = () => {
  return (
    <Link href={"/maker/menu"}>
    <Button className="w-full relative bg-linear-to-r from-orange-400 to-orange-500 rounded-2xl p-7 sm:p-6 md:p-7 cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-[0.98] overflow-hidden shadow-lg">
      <div className="absolute right-0 top-0 bottom-0 w-32 opacity-20">
        <div className="w-24 h-24 bg-white rounded-full absolute -right-8 -top-8" />
        <div className="w-20 h-20 bg-white rounded-full absolute right-4 bottom-0" />
      </div>

      <div className="relative z-10 flex items-center">
        <Plus
          className="w-8 h-8 sm:w-8 sm:h-8 text-white mr-3"
          strokeWidth={3}
        />
        <p className="text-white text-base sm:text-base md:text-lg font-semibold">
          Crear nuevo menú
        </p>
      </div>
    </Button>
</Link>
  );
};
