"use client"

import { Button } from "@/common/components/atoms/button";
import { useDeleteMenu } from "../hooks/use_delete_menu";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';



export const DeleteButton = () => {

    const searchParams = useSearchParams();
      const menuId = searchParams.get("id");
      const router = useRouter();

  const { deleteMenu, isDeleting } = useDeleteMenu(router);

  return (
    <Button onClick={() => deleteMenu(Number(menuId))} disabled={isDeleting}>
      {isDeleting ? "Borrando..." : "Borrar"}
    </Button>
  );
};

