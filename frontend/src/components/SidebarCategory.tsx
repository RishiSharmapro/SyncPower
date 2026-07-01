import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import type { SubCategory } from "../types/product";

type SidebarCategoryProps = {
  title: string;
  subCategories: SubCategory[];

  expanded: boolean;

  selectedSubCategory: string;

  onCategoryClick: () => void;

  onSubCategoryClick: (name: string) => void;
};

const SidebarCategory = ({
  title,
  subCategories,
  expanded,
  selectedSubCategory,
  onCategoryClick,
  onSubCategoryClick,
}: SidebarCategoryProps) => {
  return (
    <div className="border-b">

      <button
        onClick={onCategoryClick}
        className="flex cursor-pointer items-center justify-between w-full px-5 py-3 hover:bg-slate-100 transition"
      >
        <span className="font-medium">{title}</span>

        {expanded ? (
          <ChevronDownIcon className="w-5 h-5" />
        ) : (
          <ChevronRightIcon className="w-5 h-5" />
        )}
      </button>

      {expanded && (
        <div className="bg-slate-50">

          {subCategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => onSubCategoryClick(sub.name)}
              className={`cursor-pointer block w-full text-left px-10 py-2 text-sm transition

                ${
                  selectedSubCategory === sub.name
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-200"
                }
              `}
            >
              {sub.name}
            </button>
          ))}

        </div>
      )}
    </div>
  );
};

export default SidebarCategory;