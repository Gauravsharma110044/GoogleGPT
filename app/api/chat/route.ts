import { NextResponse } from "next/server";
import { generateResponse } from "@/lib/gemini";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const response = await generateResponse(lastMessage.content);

    // Store the chat in MongoDB
    const mongoose = await connectDB();
    if (!mongoose.connection.db) {
      throw new Error('Database connection failed');
    }
    const db = mongoose.connection.db;
    await db.collection('chats').insertOne({
      userId: session.user.id,
      messages: [...messages, { role: 'assistant', content: response }],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error("[CHAT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}