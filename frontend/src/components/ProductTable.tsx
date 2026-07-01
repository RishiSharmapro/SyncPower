import type { Product } from "../types/product";

type ProductTableProps = {
    products: Product[];
};

const ProductTable = ({ products }: ProductTableProps) => {

    // Get all unique specification names
    const specificationHeaders = [
        ...new Set(
            products.flatMap((product) =>
                product.specifications.map((spec) => spec.name)
            )
        ),
    ];

    return (
        <div className="bg-white rounded-lg shadow border overflow-hidden">

            <div className="overflow-x-auto">

                <table className="min-w-full border-collapse">

                    <thead className="bg-blue-700 text-white">

                        <tr>

                            <th className="px-4 py-3 text-left whitespace-nowrap">
                                Part Number
                            </th>

                            {specificationHeaders.map((header) => (
                                <th
                                    key={header}
                                    className="px-4 py-3 text-left whitespace-nowrap"
                                >
                                    {header}
                                </th>
                            ))}

                            <th className="px-4 py-3 text-left whitespace-nowrap">
                                Datasheet
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.map((product) => {

                            // Convert specification array into an object
                            const specMap = product.specifications.reduce(
                                (acc, spec) => {
                                    acc[spec.name] = spec.value;
                                    return acc;
                                },
                                {} as Record<string, string | null>
                            );

                            return (
                                <tr
                                    key={product.partNumber}
                                    className="border-b hover:bg-slate-50"
                                >

                                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                                        {product.partNumber}
                                    </td>

                                    {specificationHeaders.map((header) => (
                                        <td
                                            key={header}
                                            className="px-4 py-3 whitespace-nowrap"
                                        >
                                            {specMap[header] ?? "-"}
                                        </td>
                                    ))}

                                    <td className="px-4 py-3">

                                        <a
                                            href={product.datasheetUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            View PDF
                                        </a>

                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default ProductTable;