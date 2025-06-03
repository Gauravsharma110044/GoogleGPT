"use client"

import { Chat, User } from '@/types'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

interface ChatDeleteProps {
  chat: Chat;
  user: User;
}

const ChatDelete = ({ chat, user }: ChatDeleteProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/chat/${chat.id}`)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error deleting chat:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Chat</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this chat? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ChatDelete 