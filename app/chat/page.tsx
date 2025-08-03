"use client"

import { useState, useEffect } from "react"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatWindow } from "@/components/chat-window"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Chat {
  id: string
  title: string
  messages: { role: string; content: string }[]
  createdAt: Date
  updatedAt: Date
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])

  // Load chats from localStorage on component mount
  useEffect(() => {
    const savedChats = localStorage.getItem('headstarter-chats')
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt)
      }))
      setChats(parsedChats)
      
      // Set the most recent chat as current if no current chat is selected
      if (parsedChats.length > 0 && !currentChatId) {
        const mostRecentChat = parsedChats.sort((a: Chat, b: Chat) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )[0]
        setCurrentChatId(mostRecentChat.id)
        setMessages(mostRecentChat.messages)
      }
    }
  }, [])

  // Save chats to localStorage whenever chats change
  useEffect(() => {
    localStorage.setItem('headstarter-chats', JSON.stringify(chats))
  }, [chats])

  // Update messages when current chat changes
  useEffect(() => {
    if (currentChatId) {
      const currentChat = chats.find(chat => chat.id === currentChatId)
      if (currentChat) {
        setMessages(currentChat.messages)
      }
    } else {
      setMessages([])
    }
  }, [currentChatId, chats])

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setChats(prevChats => [newChat, ...prevChats])
    setCurrentChatId(newChat.id)
    setMessages([])
  }

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId)
  }

  const handleMessagesUpdate = (newMessages: { role: string; content: string }[]) => {
    setMessages(newMessages)
    
    if (currentChatId) {
      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === currentChatId) {
          // Update chat title based on first user message
          let title = chat.title
          if (newMessages.length > 0 && newMessages[0].role === 'user') {
            const firstMessage = newMessages[0].content
            title = firstMessage.length > 30 ? firstMessage.substring(0, 30) + '...' : firstMessage
          }
          
          return {
            ...chat,
            title,
            messages: newMessages,
            updatedAt: new Date()
          }
        }
        return chat
      }))
    }
  }

  const handleDeleteChat = (chatId: string) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId))
    
    // If we're deleting the current chat, switch to the most recent one or create a new one
    if (currentChatId === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId)
      if (remainingChats.length > 0) {
        const mostRecentChat = remainingChats.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )[0]
        setCurrentChatId(mostRecentChat.id)
        setMessages(mostRecentChat.messages)
      } else {
        setCurrentChatId(null)
        setMessages([])
      }
    }
  }

  const currentChat = chats.find(chat => chat.id === currentChatId)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0A0F1A] text-[#EAEAEA] relative overflow-hidden">
        {/* Enhanced animated background elements */}
        <div className="fixed inset-0 opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#059669] via-[#0D9488] to-transparent animate-gradient-shift" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(5,150,105,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(13,148,136,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(20,184,166,0.08),transparent_50%)]"></div>
        
        <ChatSidebar 
          onNewChat={handleNewChat}
          chats={chats}
          currentChatId={currentChatId}
          onChatSelect={handleChatSelect}
          onDeleteChat={handleDeleteChat}
        />
        <SidebarInset className="flex flex-1 flex-col bg-[#0A0F1A]/80 backdrop-blur-2xl rounded-l-3xl shadow-2xl m-4 border border-[#059669]/10">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-[#059669]/20 px-6 bg-[#0A0F1A]/60 backdrop-blur-xl">
            <SidebarTrigger className="-ml-1 text-[#059669] hover:text-[#10B981] transition-colors" />
            <Separator orientation="vertical" className="mr-3 h-6 bg-gradient-to-b from-[#059669]/60 to-transparent" />
            <Breadcrumb>
              <BreadcrumbList className="text-[#EAEAEA]">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/chat" className="text-[#059669] hover:text-[#10B981] transition-colors font-medium">
                    AI Assistant
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#059669]/50" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#EAEAEA] font-semibold">
                    {currentChat ? currentChat.title : "New Conversation"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col p-6">
            <ChatWindow
              messages={messages}
              setMessages={handleMessagesUpdate}
              currentChatId={currentChatId}
              setCurrentChatId={setCurrentChatId}
            />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
