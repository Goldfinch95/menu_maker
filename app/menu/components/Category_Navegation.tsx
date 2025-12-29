import { Categories } from "../types/menu";
import { CategoryButton } from "./Category_Button";

interface CategoryNavigationProps {
  categories: Categories[];
  activeCategory: number;
  primaryColor?: string;
  secondaryColor?: string;
  onCategoryClick: (categoryId: number) => void;
}

export function CategoryNavigation({
  categories,
  activeCategory,
  primaryColor,
  secondaryColor,
  onCategoryClick,
}: CategoryNavigationProps) {
  return (
    <div
      className="sticky top-12 z-40 backdrop-blur-xl"
      style={{
        backgroundColor: primaryColor
          ? `${primaryColor}CC`
          : "rgba(255,255,255,0.8)",
      }}
    >
      <div
        className={`max-w-xl mx-auto px-4 py-3 flex gap-2 scrollbar-hide ${
          categories.length <= 4 ? "justify-center" : "overflow-x-auto"
        }`}
      >
        {categories.map((cat) => (
          <CategoryButton
            key={cat.id}
            categoryId={cat.id}
            title={cat.title}
            isActive={activeCategory === cat.id}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onClick={onCategoryClick}
          />
        ))}
      </div>
    </div>
  );
}