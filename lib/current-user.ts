import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import connectDB from "./mongodb";

export const currentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return null;
    }

    const mongoose = await connectDB();
    if (!mongoose.connection.db) {
      throw new Error('Database connection failed');
    }
    const db = mongoose.connection.db;
    const user = await db.collection('users').findOne({ email: session.user.email });

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image
    };
  } catch (error) {
    console.error("[CURRENT_USER_ERROR]", error);
    return null;
  }
};