import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    quantity: { type: Number, required: true, default: 0 },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true }
  });

const Order = mongoose.model('Product', OrderSchema);

export default Order;
