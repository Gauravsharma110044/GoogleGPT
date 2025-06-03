import { createNewChat } from "@/lib/chat"
import { currentUser } from "@/lib/current-user"
import connectDB from "@/lib/mongodb"
import { redirect } from "next/navigation"

const page = async () => {
  const user = await currentUser()
  if(!user){
    return redirect('/login')
  }

  const mongoose = await connectDB();
  if (!mongoose.connection.db) {
    throw new Error('Database connection failed');
  }
  const db = mongoose.connection.db;
  const chats = await db.collection('chats').find({
    userId: user.id
  }).toArray();

  if(chats.length === 0){
    const newChat = await createNewChat(user.id);
    return redirect(`/${newChat.id}`);
  }

  return redirect(`/${chats[0]._id}`);
}

export default page