import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true 
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    image: { type: String, default: '' }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        unique: true 
    },
    products: [cartItemSchema],
    totalAmount: { type: Number, default: 0 }
}, { timestamps: true });

// Update totalAmount before saving
cartSchema.pre('save', function(next) {
    this.totalAmount = this.products.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    next();
});

export default mongoose.model('Cart', cartSchema);