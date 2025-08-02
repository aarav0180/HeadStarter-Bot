"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Sparkles, User } from "lucide-react"

interface ChatMessageProps {
  role: "user" | "ai"
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user"
  return (
    <div className={cn("flex items-start gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8 border border-[#39D39F]">
          <AvatarFallback className="bg-[#39D39F] text-white">
            <Sparkles className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3 shadow-sm",
          isUser
            ? "bg-[#39D39F] text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none border border-gray-200",
        )}
      >
        <p className="text-sm">{content}</p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 border border-gray-300">
          <AvatarFallback className="bg-gray-200 text-gray-600">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
