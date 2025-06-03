"use client"
import { Chat } from '@/types'
import { Share } from 'lucide-react'
import { Button } from './ui/button'
import { useModal } from '@/hooks/use-modal-store'

interface ShareChatButtonProps {
  chat: Chat;
}

const ShareChatButton = ({ chat }: ShareChatButtonProps) => {
  const { onOpen } = useModal()

  return (
    <Button
      onClick={() => onOpen('shareChat', { chat })}
      variant="ghost"
      size="icon"
    >
      <Share className="h-4 w-4" />
    </Button>
  )
}

export default ShareChatButton
