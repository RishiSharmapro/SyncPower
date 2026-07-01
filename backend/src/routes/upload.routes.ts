import router from "express";
import multer from "multer";
import { uploadController } from "../controllers/upload.controller.js";

const uploadRouter = router();
const upload = multer({ dest: "uploads/" });

uploadRouter.post("/upload", upload.single("data"), uploadController);

export default uploadRouter;