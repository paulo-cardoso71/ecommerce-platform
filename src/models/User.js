import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Email não pode repetir
  password: { 
    type: String, 
    required: true, 
    select: false // Segurança: Quando buscarmos usuários, a senha NÃO vem junto por padrão
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], // Só aceita 'user' ou 'admin'
    default: 'user' 
  },
  image: { type: String },
}, { timestamps: true });

// Se o model já existe, usa ele. Se não, cria.
export default mongoose.models.User || mongoose.model('User', UserSchema);