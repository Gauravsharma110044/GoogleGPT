import ChatContent from '@/components/chat/chat-content'
import ChatHeader from '@/components/chat/chat-header'
import ChatInput from '@/components/chat/chat-input'
import ShareChatButton from '@/components/share-chat-button'
import { currentUser } from '@/lib/current-user'
import connectDB from '@/lib/mongodb'
import { CircleHelp } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import { ObjectId } from 'mongodb'
import { Message } from '@/types'

const page = async ({params}: {params: {chatId: string}}) => {
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

  // Validate chatId
  if (!params.chatId || !ObjectId.isValid(params.chatId)) {
    return redirect('/');
  }

  try {
    const chat = await db.collection('chats').findOne({
      _id: new ObjectId(params.chatId),
      userId: user.id
    });

    if(!chat){
      return redirect('/')
    }

    // Transform user to match User type
    const transformedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Transform MongoDB document to match Chat type
    const transformedChat = {
      id: chat._id.toString(),
      name: chat.name,
      userId: chat.userId,
      messages: (chat.messages || []).map((msg: any) => ({
        id: msg._id?.toString() || new ObjectId().toString(),
        content: msg.content,
        role: msg.role,
        createdAt: msg.createdAt || new Date(),
        updatedAt: msg.updatedAt || new Date()
      })),
      createdAt: chat.createdAt || new Date(),
      updatedAt: chat.updatedAt || new Date()
    };

    // Transform chats array to match Chat type
    const transformedChats = chats.map(chat => ({
      id: chat._id.toString(),
      name: chat.name,
      userId: chat.userId,
      messages: (chat.messages || []).map((msg: any) => ({
        id: msg._id?.toString() || new ObjectId().toString(),
        content: msg.content,
        role: msg.role,
        createdAt: msg.createdAt || new Date(),
        updatedAt: msg.updatedAt || new Date()
      })),
      createdAt: chat.createdAt || new Date(),
      updatedAt: chat.updatedAt || new Date()
    }));

    return (
      <div className='flex flex-col h-full'>
        <ChatHeader chat={transformedChat} chats={transformedChats} user={transformedUser} />
        <div className='flex flex-1 overflow-y-auto container no-scrollbar lg:px-[14rem]'>
          <ChatContent chat={transformedChat} />
        </div>
        <div className='container lg:px-[12rem]'>
          <ChatInput 
            chat={transformedChat} 
            onSendMessage={async (message: Message) => {
              'use server'
              const db = (await connectDB()).connection.db;
              await db.collection('chats').updateOne(
                { _id: new ObjectId(transformedChat.id) },
                { 
                  $push: { 
                    messages: {
                      ...message,
                      _id: new ObjectId(),
                      createdAt: new Date(),
                      updatedAt: new Date()
                    }
                  },
                  $set: { updatedAt: new Date() }
                }
              );
            }}
          />
          <span className='flex justify-center mb-3 text-xs text-gray-300 text-center'>GoogleGPT can make mistakes. Consider checking important information.</span>
        </div>

        <ShareChatButton chat={transformedChat} />
        <button className='absolute bottom-6 right-6' aria-label="Help">
          <CircleHelp className='h-5 w-5 text-gray-300' />
        </button>
      </div>
    )
  } catch (error) {
    console.error('Error fetching chat:', error);
    return redirect('/');
  }
}

export default page
