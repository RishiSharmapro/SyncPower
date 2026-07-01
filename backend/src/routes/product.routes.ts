import router from "express";
import { productController } from "../controllers/product.controller.js";

const productRouter = router();

productRouter.get("/products", productController);

export default productRouter;