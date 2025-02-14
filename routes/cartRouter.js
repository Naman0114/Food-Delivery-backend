import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/auth.js';

const cartRouter=express.Router();

cartRouter.post('/remove',authMiddleware,removeFromCart)
cartRouter.post('/add',authMiddleware,addToCart)
cartRouter.get('/get',authMiddleware,getCart)

export default cartRouter;