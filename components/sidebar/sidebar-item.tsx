"use client"
import { Chat } from '@/types'
import { Archive, MoreHorizontal, Pencil, Share, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useModal } from '@/hooks/use-modal-store'
import { SideBarItemEdit } from './sidebar-name-edit-form'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare } from 'lucide-react'

interface SideBarItemProps {
  chat: Chat
}

const SideBarItem = ({ chat }: SideBarItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const params = useParams()
  const { onOpen } = useModal()
  const pathname = usePathname()
  const isActive = pathname === `/${chat.id}`

  return (
    <Link
      href={`/${chat.id}`}
      className={cn(
        'flex items-center gap-x-2 text-sm font-medium pl-6 transition-all hover:text-primary',
        isActive ? 'text-primary' : 'text-muted-foreground'
      )}
    >
      <MessageSquare className="h-4 w-4" />
      {!isEditing && (<p className="line-clamp-1">{chat.name}</p>)}
      {isEditing && (<SideBarItemEdit chat={chat} setIsEditing={setIsEditing} />)}
      <div className='space-x-2 ml-auto flex'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpen("deleteChat", { chatId: chat.id })}>
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpen("shareChat", { chatId: chat.id })}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Archive className='w-4 h-4 mr-2 text-gray-300 hover:text-white' onClick={() => console.log('Archive')} />
      </div>
    </Link>
  )
}

export default SideBarItem
