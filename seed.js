import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';

// Load environment variables from .env
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in .env');
  process.exit(1);
}

const seed = async () => {
  try {
    // 1. Connect to the Database
    await mongoose.connect(MONGODB_URI);
    console.log('📦 Connected to MongoDB for seeding...');

    // 2. Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@loja.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists. Skipping...');
      process.exit();
    }

    // 3. Hash the password (security first!)
    // We'll use "123456" as the password
    const hashedPassword = await bcrypt.hash('123456', 10);

    // 4. Create the User
    await User.create({
      name: 'Admin Paulo',
      email: 'admin@loja.com',
      password: hashedPassword, // Save the encrypted version
      role: 'admin',
    });

    console.log('✅ Admin created successfully!');
    console.log('📧 Email: admin@loja.com');
    console.log('🔑 Password: 123456');

  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    mongoose.connection.close(); // Close connection
  }
};

seed();