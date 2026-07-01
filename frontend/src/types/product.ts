export interface Specification {
    name: string;
    value: string | null;
}

export interface Product {
    partNumber: string;
    datasheetUrl: string;
    specifications: Specification[];
}

export interface SubCategory {
    id: number;
    name: string;
    categoryId: number;
    products: Product[];
}

export interface Category {
    id: number;
    name: string;
    subCategories: SubCategory[];
}
