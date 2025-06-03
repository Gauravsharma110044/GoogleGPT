import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
  className?: string
}

const BotAvatar = ({className}: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-8 md:w-8", className)}>
      <AvatarImage src='/ChatGPT Image Jun 2, 2025, 01_59_06 PM.png' alt="GoogleGPT" />
      <AvatarFallback>GoogleGPT</AvatarFallback>
    </Avatar>
  )
}

export default BotAvatar