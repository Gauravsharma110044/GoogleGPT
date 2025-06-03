import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached: typeof mongoose | null = null;

async function connectDB() {
  if (cached) {
    return cached;
  }

  const opts = {
    bufferCommands: false,
  };

  try {
    cached = await mongoose.connect(MONGODB_URI, opts);
    if (!cached.connection.db) {
      throw new Error('Failed to connect to database');
    }
    return cached;
  } catch (e) {
    throw e;
  }
}

export default connectDB; 