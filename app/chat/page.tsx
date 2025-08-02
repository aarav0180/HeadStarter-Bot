"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatWindow } from "@/components/chat-window"

export default function ChatPage() {
  const [messages, setMessages] = useState<
    {
      role: "user" | "ai"
      content: string
      detailedContent?: string
      links?: { text: string; url: string }[]
    }[]
  >([])

  return (
    <SidebarProvider defaultOpen={true}>
      <ChatSidebar />
      <SidebarInset className="flex flex-col h-svh">
        <ChatWindow messages={messages} setMessages={setMessages} />
      </SidebarInset>
    </SidebarProvider>
  )
}
