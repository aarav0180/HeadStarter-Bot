"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { AiMessagePopup } from "@/components/ai-message-popup"

interface ChatWindowProps {
  messages: { role: string; content: string }[]
  setMessages: React.Dispatch<React.SetStateAction<{ role: string; content: string }[]>>
  currentChatId: string | null
  setCurrentChatId: React.Dispatch<React.SetStateAction<string | null>>
}

export function ChatWindow({ messages, setMessages, currentChatId, setCurrentChatId }: ChatWindowProps) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showAiPopup, setShowAiPopup] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (input.trim() === "") return

    const userMessage = { role: "user", content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setMessages((prevMessages) => [...prevMessages, { role: "ai", content: data.response }])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", content: "Sorry, something went wrong. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleAiPopupClose = () => {
    setShowAiPopup(false)
  }

  return (
    <div className="flex flex-col h-full relative">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center p-4">
          <Sparkles className="w-16 h-16 text-[#39D39F] mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to HeadStarter AI Chat!</h2>
          <p className="text-gray-600 max-w-md">
            Start a conversation by typing a message below. I'm here to help you with your career journey.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
          {isLoading && <ChatMessage role="ai" content="Thinking..." />}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="p-4 border-t border-white/20 bg-white/70 backdrop-blur-md rounded-b-xl flex items-center gap-2">
        <Textarea
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 resize-none rounded-lg border border-gray-300 bg-white/80 p-2 shadow-sm focus:border-[#39D39F] focus:ring-1 focus:ring-[#39D39F] transition-all duration-200"
          rows={1}
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading || input.trim() === ""}
          className="bg-[#39D39F] text-white hover:bg-[#39D39F]/90 transition-all duration-200"
        >
          <Send className="w-5 h-5" />
          <span className="sr-only">Send message</span>
        </Button>
        <Button
          onClick={() => setShowAiPopup(true)}
          variant="outline"
          className="bg-white/80 text-[#39D39F] border-[#39D39F] hover:bg-[#39D39F] hover:text-white transition-all duration-200"
        >
          <Sparkles className="w-5 h-5" />
          <span className="sr-only">AI Options</span>
        </Button>
      </div>

      {showAiPopup && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <AiMessagePopup onClose={handleAiPopupClose} />
        </div>
      )}
    </div>
  )
}
