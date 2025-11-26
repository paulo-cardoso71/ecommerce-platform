import mongoose from 'mongoose';

// Schema do Item do Pedido (Snapshot)
const OrderItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', // Link para saber qual foi o produto original
    required: true 
  },
  name: { type: String, required: true }, // Cópia do Nome (se o produto mudar de nome, aqui mantém o antigo)
  price: { type: Number, required: true }, // Cópia do Preço (se o preço subir, aqui mantém o pago)
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String }, 
});

const OrderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Link para saber quem comprou
    required: true 
  },
  items: [OrderItemSchema], // Lista de itens comprados
  totalAmount: { type: Number, required: true }, // Total pago
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  stripePaymentId: { type: String }, // ID do Stripe para auditoria
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);