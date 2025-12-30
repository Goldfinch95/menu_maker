"use client"

import { Button } from "@/common/components/atoms/button";
import { useDeleteMenu } from "../hooks/use_delete_menu";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";


export const DeleteButton = () => {

    const searchParams = useSearchParams();
      const menuId = searchParams.get("id");
      const router = useRouter();

  const { deleteMenu, isDeleting } = useDeleteMenu(router);

  return (
     <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
    <Button onClick={() => deleteMenu(Number(menuId))} disabled={isDeleting} className="w-full py-8 mt-8 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-500/25 max-w-sm mx-auto">
      {isDeleting ? "Borrando..." : "Borrar"}
    </Button>
    </motion.div>
  );
};

