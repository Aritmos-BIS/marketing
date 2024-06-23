import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  Street: { type: String, required: true },
  City: { type: String, required: true },
  State: { type: String, required: true },
  Zip: { type: String, required: true },
  Phone: { type: String, required: true }
});

const productOrderSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  Order_ID: { type: Number, required: true },
  Client_ID: { type: String, required: true },
  Gift: { type: Boolean, default: false },
  Address: { type: addressSchema, required: true },
  Products: [productOrderSchema]
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
