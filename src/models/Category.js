import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
}, { timestamps: true }); // Timestamps automatically creates createdAt and updatedAt fields

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);