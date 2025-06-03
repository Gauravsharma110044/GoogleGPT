"use client"
import React from 'react'
import UserAvatar from '../user-avatar'
import { User } from '@/types'
import { Book, LogOut, Settings, Sparkle } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { signOut } from 'next-auth/react'
import { useModal } from '@/hooks/use-modal-store'
import { Button } from '../ui/button'

interface SideBarFooterProps {
  user: User;
}

const SideBarFooter = ({ user }: SideBarFooterProps) => {
  const {onOpen} = useModal()
  return (
    <div className='space-y-2'>
      <button onClick={() => onOpen('pricing')} className='group p-2 rounded-md flex items-center gap-x-3 w-full hover:bg-zinc-700/30 transition'>
        <Sparkle />
        <div className='flex flex-col items-start'>
          <p className='text-sm font-semibold'>Upgrade plan</p>
          <span className='text-xs text-gray-400'>Get GPT-4, DALL-E, and more</span>
        </div>
      </button>
      <div className='flex items-center gap-x-4 p-3'>
        <div className='flex items-center gap-x-2'>
          <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
            <span className='text-sm font-medium'>{user.name?.[0]}</span>
          </div>
          <div className='space-y-1'>
            <p className='text-sm font-medium leading-none'>{user.name}</p>
            <p className='text-xs text-muted-foreground'>{user.email}</p>
          </div>
        </div>
        <Button
          onClick={() => signOut()}
          variant="ghost"
          size="icon"
          className='ml-auto'
        >
          <LogOut className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}

export default SideBarFooter
