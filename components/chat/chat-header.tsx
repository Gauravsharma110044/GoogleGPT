"use client"

import React from 'react'
import { Chat, User } from '@/types'
import BotAvatar from '../bot-avatar'
import UserAvatar from '../user-avatar'
import MobileSidebar from '../mobile-sidebar'
import ChatActions from './chat-actions'

interface ChatHeaderProps {
  chat: Chat;
  user: User;
  chats: Chat[];
}

const ChatHeader = ({ chat, user, chats }: ChatHeaderProps) => {
  if (!chat || !user) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-x-4">
        <MobileSidebar chats={chats} user={user} />
        <BotAvatar />
        <div>
          <h2 className="text-lg font-semibold">{chat.name}</h2>
          <p className="text-sm text-muted-foreground">
            Created by {user.name}
          </p>
        </div>
      </div>
      <ChatActions chat={chat} user={user} />
    </div>
  )
}

export default ChatHeader