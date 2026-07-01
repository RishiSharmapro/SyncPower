import express from "express";
import cors from "cors";
import uploadRouter from "./routes/upload.routes.js";
import productController from "./controllers/product.controller.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", uploadRouter);
app.use("/api/v1/products", productController);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

export default app;