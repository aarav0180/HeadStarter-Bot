"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { AiMessagePopup } from "@/components/ai-message-popup"

interface ChatWindowProps {
  messages: {
    role: "user" | "ai"
    content: string
    detailedContent?: string
    links?: { text: string; url: string }[]
  }[]
  setMessages: React.Dispatch<
    React.SetStateAction<
      {
        role: "user" | "ai"
        content: string
        detailedContent?: string
        links?: { text: string; url: string }[]
      }[]
    >
  >
}

export function ChatWindow({ messages, setMessages }: ChatWindowProps) {
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [currentDetailedMessage, setCurrentDetailedMessage] = useState<{
    detailedContent?: string
    links?: { text: string; url: string }[]
  } | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsSending(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input.trim() }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const aiMessage = {
        role: "ai" as const,
        content: data.crispContent,
        detailedContent: data.detailedContent,
        links: data.links,
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, I couldn't process that. Please try again.",
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  const handleShowDetails = (detailedContent?: string, links?: { text: string; url: string }[]) => {
    setCurrentDetailedMessage({ detailedContent, links })
    setPopupOpen(true)
  }

  return (
    <div className="flex flex-col h-full bg-transparent text-[#EAEAEA] p-4">
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            role={msg.role}
            content={msg.content}
            detailedContent={msg.detailedContent}
            links={msg.links}
            onShowDetails={handleShowDetails}
          />
        ))}
        {isSending && (
          <div className="flex justify-start">
            <div className="bg-[#39D39F]/20 text-[#EAEAEA] p-3 rounded-lg max-w-[70%] animate-pulse">Typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-white/5 border border-white/10 text-[#EAEAEA] placeholder:text-[#EAEAEA]/70 focus:ring-[#39D39F] focus:border-[#39D39F] backdrop-blur-md"
          disabled={isSending}
        />
        <Button type="submit" className="bg-[#39D39F] text-white hover:bg-[#39D39F]/90" disabled={isSending}>
          <Send className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </form>

      <AiMessagePopup
        open={popupOpen}
        onOpenChange={setPopupOpen}
        detailedContent={currentDetailedMessage?.detailedContent}
        links={currentDetailedMessage?.links}
      />
    </div>
  )
}
