import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    quantity: { type: Number, required: true, default: 0 },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    wareHouseName: { type: String, required: true },
  });

const Product = mongoose.model('Product', ProductSchema);

const wareHouseSchema = new mongoose.Schema({
  wareHouseName: { type: String, required: true },
  wareHouseLocation: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  
});

const WareHouse = mongoose.model('WareHouse', wareHouseSchema);

export{
  Product,
  WareHouse
};
