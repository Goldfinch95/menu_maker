import { Card } from "@/common/components/organism/card";
import { Button } from "@/common/components/atoms/button";
import { Plus } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { NewCategoryDialog } from "./New_Category_Dialog";
import { useSearchParams } from "next/navigation";

export const MenuCard = () => {


  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-md p-6 w-full max-w-sm mx-auto">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-0 ml-1">
            Menú
          </p>
          <div className="shrink-0">
            <NewCategoryDialog >
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  className="bg-orange-500 text-white p-2 rounded-lg h-8 w-8 shadow-md hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
            </NewCategoryDialog>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {/*{categories && categories.length > 0 ? (
              <CategoryList
                categories={categories}
                expandedCategoryId={expandedCategoryId}
                setExpandedCategoryId={setExpandedCategoryId}
                sensors={sensors}
                onDragEnd={handleDragEnd}
                onSaveTitle={updateTitle}
                onDelete={deleteCategory}
                onCategoryChange={onCategoryChange}
              />
            ) : !loading ? (
              <p className="text-sm text-slate-400 italic mt-6">
                No hay categorías creadas aún.
              </p>
            ) : null}*/}
        </div>
      </div>
    </Card>
  );
};
