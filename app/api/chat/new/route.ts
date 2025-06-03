import { currentUser } from "@/lib/current-user"
import connectDB from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function POST(req: Request){
  try {
    const user = await currentUser()
    if(!user){
      return new NextResponse('Unauthorized', {status: 401})
    }

    const mongoose = await connectDB();
    if (!mongoose.connection.db) {
      throw new Error('Database connection failed');
    }
    const db = mongoose.connection.db;

    const result = await db.collection('chats').insertOne({
      userId: user.id,
      name: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    if(!result.insertedId){
      return new NextResponse('Failed to create new chat', {status: 400})
    }

    const chat = {
      id: result.insertedId.toString(),
      userId: user.id,
      name: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return NextResponse.json(chat)
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: 'Error creating chats'}, {status: 500})
  }
}