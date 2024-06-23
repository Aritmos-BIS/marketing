import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  rate: { type: Number, required: true }
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
