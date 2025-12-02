import mongoose from 'mongoose';

// Order Item Schema (Snapshot Strategy)
const OrderItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', // Reference to the original product
    required: true 
  },
  name: { type: String, required: true }, // Snapshot of Name (keeps historical data if product changes)
  price: { type: Number, required: true }, // Snapshot of Price (keeps paid price if product price increases)
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String }, 
});

const OrderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the user who made the purchase
    required: true 
  },
  items: [OrderItemSchema], // List of purchased items
  totalAmount: { type: Number, required: true }, // Total paid
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  stripePaymentId: { type: String }, // Stripe ID for auditing
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);