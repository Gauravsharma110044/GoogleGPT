import { currentUser } from "@/lib/current-user"
import connectDB from "@/lib/mongodb"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"

export async function DELETE(req:Request, {params}: {params: {chatId: string}}){
  try {
    const user = await currentUser()
    if(!user){
      return new NextResponse('Unauthorized', {status: 401})
    }

    if(!params.chatId){
      return new NextResponse('chatId not provided', {status: 401})
    }

    const mongoose = await connectDB();
    if (!mongoose.connection.db) {
      throw new Error('Database connection failed');
    }
    const db = mongoose.connection.db;

    const result = await db.collection('chats').deleteOne({
      _id: new ObjectId(params.chatId),
      userId: user.id
    });

    if (result.deletedCount === 0) {
      return new NextResponse('Chat not found', {status: 404})
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: 'Error deleting chat'}, {status: 500})
  }  
}

export async function PATCH(req:Request, {params}: {params: {chatId: string}}){
  try {
    const user = await currentUser()
    if(!user){
      return new NextResponse('Unauthorized', {status: 401})
    }

    if(!params.chatId){
      return new NextResponse('chatId not provided', {status: 401})
    }

    const {name} = await req.json()
    
    const mongoose = await connectDB();
    if (!mongoose.connection.db) {
      throw new Error('Database connection failed');
    }
    const db = mongoose.connection.db;

    const result = await db.collection('chats').findOneAndUpdate(
      {
        _id: new ObjectId(params.chatId),
        userId: user.id
      },
      {
        $set: {
          name,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return new NextResponse('Chat not found', {status: 404})
    }

    const chat = {
      id: result.value._id.toString(),
      name: result.value.name,
      userId: result.value.userId,
      messages: result.value.messages || [],
      createdAt: result.value.createdAt,
      updatedAt: result.value.updatedAt
    };

    return NextResponse.json(chat)
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: 'Error updating chat'}, {status: 500})
  }  
}