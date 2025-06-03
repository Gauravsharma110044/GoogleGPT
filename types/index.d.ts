export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  chatId: string;
}

export interface Chat {
  id: string;
  name: string;
  userId: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
} 