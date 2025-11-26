import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
}, {timestamps: true}); // timestamp cria createdAt e updatedAt sozinhos

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);