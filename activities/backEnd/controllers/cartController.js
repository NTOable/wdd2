import Cart from '../models/Cart.js';
import jwt from 'jsonwebtoken';

// Helper function to verify token
const verifyToken = (req) => {
    const token = req.headers['authorization'];
    if (!token) {
        throw new Error('No token provided');
    }
    const tokenString = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    return decoded;
};

// Get user's cart
export const getCart = async (req, res) => {
    try {
        const user = verifyToken(req);
        const userId = user.id;
        let cart = await Cart.findOne({ userId }).populate('products.productId');
        
        if (!cart) {
            cart = await Cart.create({ userId, products: [], totalAmount: 0 });
        }
        
        res.status(200).json(cart);
    } catch (error) {
        res.status(401).json({ message: error.message || 'Authentication failed' });
    }
};

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const user = verifyToken(req);
        const userId = user.id;
        const { productId, name, price, quantity = 1, image } = req.body;
        
        let cart = await Cart.findOne({ userId });
        
        if (!cart) {
            cart = await Cart.create({ userId, products: [], totalAmount: 0 });
        }
        
        // Check if product already exists in cart
        const existingItemIndex = cart.products.findIndex(
            item => item.productId.toString() === productId
        );
        
        if (existingItemIndex > -1) {
            cart.products[existingItemIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, name, price, quantity, image });
        }
        
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(401).json({ message: error.message || 'Authentication failed' });
    }
};

// Update item quantity in cart
export const updateCartItem = async (req, res) => {
    try {
        const user = verifyToken(req);
        const userId = user.id;
        const { productId, quantity } = req.body;
        
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        const itemIndex = cart.products.findIndex(
            item => item.productId.toString() === productId
        );
        
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        
        if (quantity <= 0) {
            cart.products.splice(itemIndex, 1);
        } else {
            cart.products[itemIndex].quantity = quantity;
        }
        
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(401).json({ message: error.message || 'Authentication failed' });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const user = verifyToken(req);
        const userId = user.id;
        const { productId } = req.params;
        
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        cart.products = cart.products.filter(
            item => item.productId.toString() !== productId
        );
        
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(401).json({ message: error.message || 'Authentication failed' });
    }
};

// Clear entire cart
export const clearCart = async (req, res) => {
    try {
        const user = verifyToken(req);
        const userId = user.id;
        
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        cart.products = [];
        cart.totalAmount = 0;
        
        await cart.save();
        res.status(200).json({ message: 'Cart cleared successfully', cart });
    } catch (error) {
        res.status(401).json({ message: error.message || 'Authentication failed' });
    }
};