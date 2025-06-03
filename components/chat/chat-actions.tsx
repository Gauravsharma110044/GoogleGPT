import { Chat, User } from '@/types'
import ChatDelete from './chat-delete'
import ChatSettings from './chat-settings'
import ChatShare from './chat-share'

interface ChatActionsProps {
  chat: Chat;
  user: User;
}

const ChatActions = ({ chat, user }: ChatActionsProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <ChatSettings chat={chat} user={user} />
      <ChatShare chat={chat} user={user} />
      <ChatDelete chat={chat} user={user} />
    </div>
  )
}

export default ChatActions 