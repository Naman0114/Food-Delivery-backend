import orderModel from "../models/orderModel.js";

const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        res.status(200).json({ success: true, message: 'Order placed successfully' });
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Error" });
    }
}


const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


//listing order for admin panel;

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

export { listOrders, placeOrder, userOrder };

