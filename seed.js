import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js'; // Note o .js no final, importante para scripts manuais

// Carrega as variáveis do .env
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Erro: MONGODB_URI não encontrada no .env');
  process.exit(1);
}

const seed = async () => {
  try {
    // 1. Conecta ao Banco
    await mongoose.connect(MONGODB_URI);
    console.log('📦 Conectado ao MongoDB para seeding...');

    // 2. Verifica se já existe admin
    const existingAdmin = await User.findOne({ email: 'admin@loja.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin já existe. Nada a fazer.');
      process.exit();
    }

    // 3. Cria o Hash da senha (segurança!)
    // Vamos usar a senha "123456"
    const hashedPassword = await bcrypt.hash('123456', 10);

    // 4. Cria o Usuário
    await User.create({
      name: 'Admin Paulo',
      email: 'admin@loja.com',
      password: hashedPassword, // Salva a versão criptografada
      role: 'admin',
    });

    console.log('✅ Admin criado com sucesso!');
    console.log('📧 Email: admin@loja.com');
    console.log('🔑 Senha: 123456');

  } catch (error) {
    console.error('❌ Erro no seed:', error);
  } finally {
    mongoose.connection.close(); // Fecha a conexão
  }
};

seed();