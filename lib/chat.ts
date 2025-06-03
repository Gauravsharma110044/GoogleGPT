import connectDB from "./mongodb";

export const createNewChat = async (userId: string) => {
  try {
    const mongoose = await connectDB();
    if (!mongoose.connection.db) {
      throw new Error('Database connection failed');
    }
    const db = mongoose.connection.db;
    
    const result = await db.collection('chats').insertOne({
      name: 'New Chat',
      userId,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return {
      id: result.insertedId.toString(),
      name: 'New Chat',
      userId,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } catch (error) {
    console.error("[CREATE_CHAT_ERROR]", error);
    return null;
  }
};