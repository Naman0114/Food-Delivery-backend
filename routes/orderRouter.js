import express from 'express';
import { listOrders, placeOrder, userOrder } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/auth.js';

const orderRouter=express.Router();

orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.post('/usersOrder',authMiddleware,userOrder);
orderRouter.get('/list',listOrders);

export { orderRouter };
