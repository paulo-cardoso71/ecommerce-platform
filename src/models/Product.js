import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema ({
    name:{ type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // Preço é obrigatório e numérico
    stock: { type: Number, default: 0 }, // Começa com 0 se não informar

     // O Pulo do Gato: Relacionamento com outra tabela
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', // Isso conecta com o model Category abaixo
    required: true 
  },

  imageUrl: { type: String, required: true },
  featured: { type: Boolean, default: false }, // Para a Home Page
}, {timestamps: true});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);