"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { ArrowUp, SendHorizontal } from 'lucide-react'
import { Chat, Message } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

const FormSchema = z.object({
  prompt: z.string().min(1)
})

interface ChatInputProps {
  chat: Chat;
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ chat, onSendMessage }: ChatInputProps) => {
  const router = useRouter()
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-x-2 p-4 border-t">
      <textarea
        value={message}
        onChange={handleChange}
        placeholder="Type a message..."
        className="min-h-[60px] flex-1 p-2 rounded-md border"
      />
      <Button type="submit" size="icon">
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </form>
  )
}

export default ChatInput
