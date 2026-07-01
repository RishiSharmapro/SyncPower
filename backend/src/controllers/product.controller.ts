import prisma from "../lib/prisma";
import { Request, Response } from "express";

const productController = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subCategories: {
          include: {
            products: {
              include: {
                specifications: {
                  include: {
                    specification: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const formattedData = categories.map((category) => ({
      ...category,

      subCategories: category.subCategories.map((subCategory) => ({
        ...subCategory,

        products: subCategory.products.map((product) => ({
          ...product,

          specifications: product.specifications.map((spec) => ({
            name: spec.specification.name.replace(/\r?\n/g, " ").trim(),
            value: spec.value,
          })),
        })),
      })),
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default productController;
