"use client"

import { useState } from "react"
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

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)

  const handleNewChat = () => {
    setMessages([])
    setCurrentChatId(null) // Reset current chat ID for a new chat
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB] text-gray-800">
        <ChatSidebar onNewChat={handleNewChat} />
        <SidebarInset className="flex flex-1 flex-col bg-white/50 backdrop-blur-md rounded-l-xl shadow-lg m-2">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/20 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-white/30" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/chat">Chat</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>New Chat</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col p-4">
            <ChatWindow
              messages={messages}
              setMessages={setMessages}
              currentChatId={currentChatId}
              setCurrentChatId={setCurrentChatId}
            />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
