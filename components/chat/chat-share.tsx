"use client"

import { Chat, User } from '@/types'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useState } from 'react'
import { Share2 } from 'lucide-react'

interface ChatShareProps {
  chat: Chat;
  user: User;
}

const ChatShare = ({ chat, user }: ChatShareProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const shareUrl = `${window.location.origin}/chat/${chat.id}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Chat</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Share URL</Label>
            <div className="flex gap-x-2">
              <Input id="url" value={shareUrl} readOnly />
              <Button onClick={handleCopy}>Copy</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChatShare 