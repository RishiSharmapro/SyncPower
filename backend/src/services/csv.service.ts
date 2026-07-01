import csv from "csv-parser";
import fs from "fs";

const parseCSV = (filePath: string): Promise<Record<string, string>[]> => {
    return new Promise((resolve, reject) => {
        const results: Record<string, string>[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", (error) => reject(error));
    });
};

export default parseCSV;