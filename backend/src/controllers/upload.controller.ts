import fs from "fs/promises";
import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import parseCSV from "../services/csv.service.js";

const uploadController = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const parsedData = await parseCSV(req.file.path);
        const ignoredColumns = [
            "Category",
            "Sub-category",
            "Part No.",
            "Datasheet Link (PDF)",
            ""
        ];
        
        for (const row of parsedData) {
            const normalizedRow = {
                category: row["Category"],
                subCategory: row["Sub-category"],
                partNumber: row["Part No."],
                datasheet: row["Datasheet Link (PDF)"],
            };

            const category = await prisma.category.upsert({
                where: { 
                    name: normalizedRow.category 
                },
                update: {},
                create: { 
                    name: normalizedRow.category 
                }
            });
            
            const subCategory = await prisma.subCategory.upsert({
                where: { 
                    name_categoryId: {
                        name: normalizedRow.subCategory,
                        categoryId: category.id
                    }
                },
                update: {},
                create: { 
                    name: normalizedRow.subCategory, 
                    categoryId: category.id 
                }
            });
            
            const product = await prisma.product.upsert({
                where: {
                    partNumber: normalizedRow.partNumber
                },
                update: {},
                create: {
                    partNumber: normalizedRow.partNumber,
                    datasheetUrl: normalizedRow.datasheet,
                    subCategoryId: subCategory.id
                }
            });

            for (const [key, value] of Object.entries(row)) {
                if (ignoredColumns.includes(key)) continue;

                const specValue = value.trim();
                if (specValue === "") continue;

                const specification = await prisma.specification.upsert({
                    where: {
                        name: key
                    },
                    update: {},
                    create: {
                        name: key
                    }
                });

                await prisma.productSpecification.upsert({
                    where: {
                        productId_specId: {
                            productId: product.id,
                            specId: specification.id
                        }
                    },
                    update: {},
                    create: {
                        productId: product.id,
                        specId: specification.id,
                        value: specValue == "-" ? null : specValue
                    }
                });
            }
        }

        return res.status(200).json({ message: "File uploaded and data processed successfully" });
    } catch (error) {
        console.error("Error processing CSV file:", error);
        return res.status(500).json({ error: "Error processing CSV file" });
    }
    finally {
        if (req.file) {
            await fs.unlink(req.file.path).catch(err => console.error("Error deleting uploaded file:", err));
        }
    }
};

export { uploadController };