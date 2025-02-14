import cors from "cors";
import 'dotenv/config';
import express from "express";
import { connectDB } from "./config/db.js";
import cartRouter from "./routes/cartRouter.js";
import { foodRouter } from "./routes/foodRouter.js";
import { orderRouter } from "./routes/orderRouter.js";
import userRouter from "./routes/userRoute.js";
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

//api endpoints
app.use("/images", express.static('uploads'));
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter)

app.listen(5000, () => {
    console.log("Server Started");
})

//mongodb+srv://naman:12345@cluster1.qgh7o.mongodb.net/?