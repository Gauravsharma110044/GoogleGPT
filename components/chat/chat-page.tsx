"use client"

import { Chat, Message, User } from '@/types'
import ChatHeader from './chat-header'
import ChatInput from './chat-input'
import ChatMessages from './chat-messages'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface ChatPageProps {
  chat: Chat;
  user: User;
  chats: Chat[];
}

const ChatPage = ({ chat, user, chats }: ChatPageProps) => {
  const [messages, setMessages] = useState<Message[]>(chat.messages || [])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSendMessage = async (content: string) => {
    try {
      setIsLoading(true)
      const response = await axios.post('/api/chat', {
        chatId: chat.id,
        content
      })
      setMessages([...messages, response.data])
      router.refresh()
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader chat={chat} user={user} chats={chats} />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput chat={chat} onSendMessage={handleSendMessage} />
    </div>
  )
}

export default ChatPage 