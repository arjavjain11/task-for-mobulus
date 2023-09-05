import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    orderNumber: { type: Number },
    quantity: { type: Number, required: true, default: 0 },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    orderStatus: { type: String, default: "new" },
    address: { type: String, required: true },
  });

const Order = mongoose.model('Product', OrderSchema);

export default Order;
