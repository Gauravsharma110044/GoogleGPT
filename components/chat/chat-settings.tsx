"use client"

import { Chat, User } from '@/types'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Settings } from 'lucide-react'

interface ChatSettingsProps {
  chat: Chat;
  user: User;
}

const ChatSettings = ({ chat, user }: ChatSettingsProps) => {
  const [name, setName] = useState(chat.name)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleSave = async () => {
    try {
      await axios.patch(`/api/chat/${chat.id}`, { name })
      router.refresh()
      setIsOpen(false)
    } catch (error) {
      console.error('Error updating chat:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Chat Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter chat name"
            />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChatSettings 