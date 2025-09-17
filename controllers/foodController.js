import fs from "fs";
import foodModel from "../models/foodModel.js";

const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Create new food with local file path
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: `/uploads/${req.file.filename}`, // store relative path
        });

        await food.save();

        res.json({ success: true, message: "Food added", data: food });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error uploading food" });
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) return res.json({ success: false, message: "Not found" });

        // delete local file
        const filePath = `.${food.image}`;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addFood, listFood, removeFood };
