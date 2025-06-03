"use client"
import { Chat, Message } from '@/types'
import React, { useEffect, useRef } from 'react'
import UserAvatar from '../user-avatar'
import BotAvatar from '../bot-avatar'
import ChatRecommendation from './chat-recommendation'
import ReactMarkdown from 'react-markdown'

interface ChatContentProps {
  chat: Chat
}

const ChatContent = ({chat}: ChatContentProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  if(chat.messages.length === 0){
    return (<ChatRecommendation chat={chat} />)
  }
  return (
    <div className='flex flex-1 flex-col py-4 overflow-y-auto no-scrollbar'>
      <div className='flex flex-col space-y-8'>
        {chat.messages.map((message, idx) => {
          return(
            <div key={idx} className='flex space-x-3 px-4'>
              {message.role === 'USER' ? (
                <div className='flex flex-col items-end w-full'>
                  <div className='flex items-center gap-2'>
                    <div className='mt-1 text-right'>
                      <span className='font-bold text-sm text-gray-500'>You</span>
                      <div className='bg-blue-500 text-white rounded-lg p-3 mt-1 max-w-[80%] ml-auto'>
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    </div>
                    <UserAvatar name='chetan' />
                  </div>
                </div>
              ) : (
                <div className='flex items-start gap-2'>
                  <BotAvatar />
                  <div className='mt-1'>
                    <span className='font-bold text-sm text-gray-500'>GoogleGPT</span>
                    <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-3 mt-1 max-w-[80%]'>
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default ChatContent
