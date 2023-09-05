import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    quantity: { type: Number, required: true, default: 0 },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true }
  });

const Product = mongoose.model('Product', ProductSchema);

export default Product;
