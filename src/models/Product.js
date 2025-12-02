import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // Price is mandatory and numeric
  stock: { type: Number, default: 0 }, // Defaults to 0 if not provided
  
  
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', // Links to the Category model below
    required: true 
  },

  imageUrl: { type: String, required: true },
  featured: { type: Boolean, default: false }, // For the Home Page Hero section
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);