import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://naman:12345@cluster1.qgh7o.mongodb.net/food-delivery').then(()=>{
        console.log("MongoDB connected Successfully");
    }).catch(() => {
        console.log("MongoDb not connected");
    })
};
