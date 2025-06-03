"use client"

import BotAvatar from '../bot-avatar'
import UserAvatar from '../user-avatar'
import { Message } from '@/types'

interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean;
}

const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-x-4 ${
            message.role === 'USER' ? 'justify-end' : ''
          }`}
        >
          {message.role === 'ASSISTANT' && <BotAvatar />}
          <div
            className={`rounded-lg px-4 py-2 max-w-[80%] ${
              message.role === 'USER'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          {message.role === 'USER' && <UserAvatar />}
        </div>
      ))}
      {isLoading && (
        <div className="flex items-start gap-x-4">
          <BotAvatar />
          <div className="rounded-lg px-4 py-2 bg-muted">
            <p className="text-sm">Thinking...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatMessages 