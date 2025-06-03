import { Chat, User } from '@/types'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ChatItemProps {
  chat: Chat;
  user: User;
}

const ChatItem = ({ chat, user }: ChatItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === `/chat/${chat.id}`

  return (
    <Link
      href={`/chat/${chat.id}`}
      className={`flex items-center gap-x-2 p-3 rounded-lg transition-colors hover:bg-muted ${
        isActive ? 'bg-muted' : ''
      }`}
    >
      <MessageSquare className="h-4 w-4" />
      <span className="line-clamp-1">{chat.name}</span>
    </Link>
  )
}

export default ChatItem 