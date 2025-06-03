"use client"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import axios from "axios"
import { Chat } from "@/types"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from '../ui/button'

const FormSchema = z.object({
  name: z.string().min(1)
})

interface SideBarItemEditProps {
  chat: Chat
  setIsEditing: (value: boolean) => void
}

const SideBarItemEdit = ({ chat, setIsEditing }: SideBarItemEditProps) => {
  const [name, setName] = useState(chat.name)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/chat/${chat.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        throw new Error('Failed to update chat name')
      }

      router.refresh()
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating chat name:', error)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex-1 px-2">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-7 px-2 focus-visible:ring-transparent"
      />
    </form>
  )
}

export default SideBarItemEdit