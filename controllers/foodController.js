// import fs from "fs";
import cloudinary from "../Cloudinary.js";
import foodModel from "../models/foodModel.js";

const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "food_images",
    });

    // Create new food with Cloudinary URL
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url, // ✅ store URL instead of filename
    });

    await food.save();

    // remove temp file from local uploads
    fs.unlinkSync(req.file.path);

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

    // delete from Cloudinary (optional)
    const publicId = food.image.split("/").pop().split(".")[0]; // extract public id
    await cloudinary.uploader.destroy(`food_images/${publicId}`);

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
