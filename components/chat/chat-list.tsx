import { Chat, User } from '@/types'
import ChatItem from './chat-item'

interface ChatListProps {
  chats: Chat[];
  user: User;
}

const ChatList = ({ chats, user }: ChatListProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} user={user} />
      ))}
    </div>
  )
}

export default ChatList 