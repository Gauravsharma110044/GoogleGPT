import connectDB from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET(req: Request){
  try {
    const mongoose = await connectDB();
    if (!mongoose.connection.db) {
      throw new Error('Database connection failed');
    }
    const db = mongoose.connection.db;
    
    const chats = await db.collection('chats').find({}).toArray();
    return NextResponse.json(chats) 
  } catch (error) {
    return NextResponse.json({message: 'Error fetching chats'}, {status: 500})
  }
}