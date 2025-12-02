import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Email must be unique
  password: { 
    type: String, 
    required: false, 
    select: false // Security: Password is NOT returned in queries by default
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], // Only allows 'user' or 'admin'
    default: 'user' 
  },
  image: { type: String },
}, { timestamps: true });

// Use existing model if available, otherwise create it.
export default mongoose.models.User || mongoose.model('User', UserSchema);