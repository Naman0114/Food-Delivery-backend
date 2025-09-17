import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";



import path from "path";

// storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // folder to save images locally
    },
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + path.extname(file.originalname) // unique filename
        );
    },
});

const upload = multer({ storage });

const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;