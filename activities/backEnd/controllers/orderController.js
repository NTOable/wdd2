import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import jwt from 'jsonwebtoken';

const verifyToken = (req) => {
    const token = req.headers['authorization'];
    if (!token) {
        throw new Error('No token provided');
    }
    const tokenString = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    return decoded;
};

export const createOrder = async (req, res) => {
    try {
        const user = verifyToken(req);
        const userId = user.id;
        const { shippingAddress, payment } = req.body;

        const cart = await Cart.findOne({ userId });
        
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const order = await Order.create({
            userId,
            items: cart.products,
            totalAmount: cart.totalAmount,
            shippingAddress,
            payment,
            status: 'pending'
        });

        cart.products = [];
        cart.totalAmount = 0;
        await cart.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ message: error.message || 'Failed to create order' });
    }
};

export const getOrders = async (req, res) => {
    try {
        const user = verifyToken(req);
        const userId = user.id;

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to fetch orders' });
    }
};
