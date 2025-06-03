import SideBar from "@/components/sidebar/SideBar";
import { currentUser } from "@/lib/current-user";
import connectDB from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function ChatLayout({children}: {children: React.ReactNode}){
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

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <SideBar chats={chats} user={user} />
      </div>
      <main className="md:pl-72">
        {children}
      </main>
    </div>
  )
}