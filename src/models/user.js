import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  LastName: { type: String, required: true },
  Gender: { type: String, required: true },
  Age: { type: Number, required: true },
  Tags: [String]
});

export default mongoose.models.User || mongoose.model('User', userSchema);
