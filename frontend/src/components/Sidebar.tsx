import SidebarCategory from "./SidebarCategory";
import type { Category } from "../types/product";

type SidebarProps = {
    categories: Category[];

    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;

    selectedSubCategory: string;
    setSelectedSubCategory: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
}: SidebarProps) => {

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category.name);

        if (category.subCategories.length > 0) {
            setSelectedSubCategory(category.subCategories[0].name);
        }
    };

    return (
        <aside className="bg-white border-r h-[calc(100vh-80px)] overflow-y-auto">

            <div className="p-5 border-b">
                <h2 className="text-xl font-semibold">
                    Categories
                </h2>
            </div>

            {categories.map((category) => (
                <SidebarCategory
                    key={category.id}
                    title={category.name}
                    subCategories={category.subCategories}
                    expanded={selectedCategory === category.name}
                    selectedSubCategory={selectedSubCategory}
                    onCategoryClick={() => handleCategoryClick(category)}
                    onSubCategoryClick={(subCategory) =>
                        setSelectedSubCategory(subCategory)
                    }
                />
            ))}
        </aside>
    );
};

export default Sidebar;