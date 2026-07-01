import api from "../services/api";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import type { Category } from "../types/product";
import { useEffect, useMemo, useState } from "react";
import ProductTable from "../components/ProductTable";
import LoadingOverlay from "../components/LoadingOverlay";

const Home = () => {
    const [search, setSearch] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const uploadCSV = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("data", selectedFile);

        try {
            setIsUploading(true);

            await api.post("/upload", formData);

            const res = await api.get("/products");

            setCategories(res.data);

            if (res.data.length > 0) {
                setSelectedCategory(res.data[0].name);

                if (res.data[0].subCategories.length > 0) {
                    setSelectedSubCategory(
                        res.data[0].subCategories[0].name
                    );
                }
            }

            alert("Upload completed successfully!");
        } catch (error) {
            console.error(error);
            alert("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/products");

                setCategories(res.data);

                if (res.data.length > 0) {
                    setSelectedCategory(res.data[0].name);

                    if (res.data[0].subCategories.length > 0) {
                        setSelectedSubCategory(
                            res.data[0].subCategories[0].name
                        );
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    const selectedProducts = useMemo(() => {
        const category = categories.find(
            (cat) => cat.name === selectedCategory
        );

        if (!category) return [];

        const subCategory = category.subCategories.find(
            (sub) => sub.name === selectedSubCategory
        );

        if (!subCategory) return [];

        return subCategory.products.filter((product) =>
            product.partNumber
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [
        categories,
        selectedCategory,
        selectedSubCategory,
        search,
    ]);

    if (isUploading) {
        return <LoadingOverlay />;
    }
    return (
        <div className="min-h-screen bg-slate-100">

            <Header />

            <div className="grid grid-cols-[280px_1fr]">

                <Sidebar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedSubCategory={selectedSubCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
                />

                <main className="overflow-auto p-8">

                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        setSelectedFile={setSelectedFile}
                        uploadCSV={uploadCSV}
                    />

                    <ProductTable
                        products={selectedProducts}
                    />

                </main>

            </div>

        </div>
    );
};

export default Home;