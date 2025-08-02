"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  role: "user" | "ai"
  content: string
  detailedContent?: string
  links?: { text: string; url: string }[]
  onShowDetails?: (detailedContent?: string, links?: { text: string; url: string }[]) => void
}

export function ChatMessage({ role, content, detailedContent, links, onShowDetails }: ChatMessageProps) {
  const isUser = role === "user"

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "p-3 rounded-lg max-w-[70%]",
          isUser ? "bg-[#0575E6]/30 text-white" : "bg-[#39D39F]/20 text-[#EAEAEA]",
        )}
      >
        <p>{content}</p>
        {!isUser && detailedContent && (
          <Button
            variant="link"
            className="mt-2 p-0 h-auto text-[#39D39F] hover:text-[#00F260]"
            onClick={() => onShowDetails?.(detailedContent, links)}
          >
            Show Details
          </Button>
        )}
      </div>
    </div>
  )
}
