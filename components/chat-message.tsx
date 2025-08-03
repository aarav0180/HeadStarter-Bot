"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Bot, User, Copy, Check } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'

interface ChatMessageProps {
  role: string
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user"
  const [displayedContent, setDisplayedContent] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const codeRef = useRef<HTMLDivElement>(null)

  // Typewriter effect for AI messages
  useEffect(() => {
    if (!isUser) {
      setIsTyping(true)
      setDisplayedContent("")
      
      let index = 0
      const typeInterval = setInterval(() => {
        if (index < content.length) {
          setDisplayedContent(content.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(typeInterval)
        }
      }, 15) // Slightly faster typing

      return () => clearInterval(typeInterval)
    } else {
      setDisplayedContent(content)
    }
  }, [content, isUser])

  // Highlight code blocks after content changes
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightAllUnder(codeRef.current)
    }
  }, [displayedContent])

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  // Function to format content with enhanced markdown and code highlighting
  const formatContent = (text: string) => {
    // First, let's handle code blocks that span multiple lines
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []
    let lastIndex = 0
    let match

    // Find all code blocks first
    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before the code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        })
      }

      // Add the code block
      const language = match[1] || 'text'
      const code = match[2].trim()
      const isCopied = copiedCode === code
      
      parts.push({
        type: 'code',
        language,
        code,
        isCopied
      })

      lastIndex = match.index + match[0].length
    }

    // Add remaining text after the last code block
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      })
    }

    // Now process each part
    return parts.map((part, partIndex) => {
      if (part.type === 'code') {
        return (
          <div key={partIndex} className="my-4 relative" ref={codeRef}>
            <div className="bg-[#0A0F1A]/90 border border-[#059669]/20 rounded-lg overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-[#059669]/20 to-[#0D9488]/20 px-4 py-2 border-b border-[#059669]/20 flex items-center justify-between">
                <span className="text-xs font-mono text-[#059669] uppercase font-semibold">{part.language}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToClipboard(part.code)}
                    className="flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-all duration-200 hover:bg-[#059669]/20"
                  >
                    {part.isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#059669]" />
                        <span className="text-[#059669]">Copy</span>
                      </>
                    )}
                  </button>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <pre className="p-4 m-0 overflow-x-auto bg-[#0A0F1A]">
                <code className={`language-${part.language} text-sm font-mono leading-relaxed`}>
                  {part.code}
                </code>
              </pre>
            </div>
          </div>
        )
      }

      // Process text content
      const lines = part.content.split('\n')
      
      return lines.map((line, lineIndex) => {
        // Handle inline code (`code`)
        if (line.includes('`') && !line.includes('```')) {
          const codeParts = line.split('`')
          return (
            <div key={`${partIndex}-${lineIndex}`} className="mb-2">
              {codeParts.map((codePart, codePartIndex) => 
                codePartIndex % 2 === 1 ? (
                  <span key={codePartIndex} className="bg-[#0A0F1A]/80 text-[#10B981] font-mono px-2 py-1 rounded border border-[#059669]/30 shadow-sm">
                    {codePart}
                  </span>
                ) : (
                  <span key={codePartIndex}>{formatTextWithLinks(codePart)}</span>
                )
              )}
            </div>
          )
        }

        // Handle bold text (**text**)
        if (line.includes('**')) {
          const parts = line.split('**')
          return (
            <div key={`${partIndex}-${lineIndex}`} className="mb-2">
              {parts.map((part, partIndex) => 
                partIndex % 2 === 1 ? (
                  <span key={partIndex} className="font-bold text-[#059669]">{formatTextWithLinks(part)}</span>
                ) : (
                  <span key={partIndex}>{formatTextWithLinks(part)}</span>
                )
              )}
            </div>
          )
        }
        
        // Handle italic text (*text*)
        if (line.includes('*') && !line.includes('**')) {
          const parts = line.split('*')
          return (
            <div key={`${partIndex}-${lineIndex}`} className="mb-2">
              {parts.map((part, partIndex) => 
                partIndex % 2 === 1 ? (
                  <span key={partIndex} className="italic text-[#EAEAEA]/70">{formatTextWithLinks(part)}</span>
                ) : (
                  <span key={partIndex}>{formatTextWithLinks(part)}</span>
                )
              )}
            </div>
          )
        }
        
        // Handle numbered lists (1. text)
        if (/^\d+\./.test(line.trim())) {
          return (
            <div key={`${partIndex}-${lineIndex}`} className="mb-1 ml-2">
              <span className="text-[#059669] font-medium">{formatTextWithLinks(line)}</span>
            </div>
          )
        }

        // Handle bullet points (- text or * text)
        if (/^[-*]\s/.test(line.trim())) {
          return (
            <div key={`${partIndex}-${lineIndex}`} className="mb-1 ml-2">
              <span className="text-[#EAEAEA]">{formatTextWithLinks(line)}</span>
            </div>
          )
        }
        
        // Handle empty lines
        if (line.trim() === '') {
          return <div key={`${partIndex}-${lineIndex}`} className="mb-2"></div>
        }
        
        // Regular text
        return (
          <div key={`${partIndex}-${lineIndex}`} className="mb-2">
            {formatTextWithLinks(line)}
          </div>
        )
      })
    }).flat()
  }

  // Function to detect and format links in text
  const formatTextWithLinks = (text: string) => {
    // URL regex pattern to match http/https URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = urlRegex.exec(text)) !== null) {
      // Add text before the URL
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        })
      }

      // Add the URL
      const url = match[1]
      parts.push({
        type: 'link',
        content: url
      })

      lastIndex = match.index + match[0].length
    }

    // Add remaining text after the last URL
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      })
    }

    return parts.map((part, index) => {
      if (part.type === 'link') {
        return (
          <a
            key={index}
            href={part.content}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#10B981] hover:text-[#059669] underline decoration-[#10B981]/30 hover:decoration-[#059669] transition-all duration-200 hover:bg-[#10B981]/10 px-1 py-0.5 rounded group relative"
            onClick={(e) => {
              e.stopPropagation()
              // Add a small delay to show the hover effect
              setTimeout(() => {
                window.open(part.content, '_blank', 'noopener,noreferrer')
              }, 100)
            }}
          >
            <span>{part.content}</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#0A0F1A]/95 backdrop-blur-xl border border-[#10B981]/30 rounded-lg px-3 py-2 text-xs text-[#EAEAEA] whitespace-nowrap shadow-2xl z-50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                <span>Click to open link</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#0A0F1A]/95"></div>
            </div>
          </a>
        )
      }
      return <span key={index}>{part.content}</span>
    })
  }

  return (
    <div className={cn("flex items-start gap-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="relative">
          <Avatar className="h-10 w-10 border-2 border-[#059669]/30 shadow-lg">
            <AvatarFallback className="bg-gradient-to-r from-[#059669] to-[#0D9488] text-[#0A0F1A]">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#059669] rounded-full animate-pulse shadow-lg"></div>
        </div>
      )}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl p-4 shadow-xl backdrop-blur-sm border transition-all duration-300",
          isUser
            ? "bg-gradient-to-r from-[#059669] to-[#0D9488] text-[#0A0F1A] rounded-br-md border-[#059669]/30 shadow-[#059669]/25"
            : "bg-[#059669]/10 text-[#EAEAEA] rounded-bl-md border-[#059669]/20 shadow-lg hover:bg-[#059669]/15"
        )}
      >
        <div className="text-sm leading-relaxed font-medium whitespace-pre-wrap">
          {formatContent(displayedContent)}
          {isTyping && (
            <span className="inline-block w-2 h-4 bg-[#059669] animate-pulse ml-1 rounded-sm typewriter-cursor"></span>
          )}
        </div>
      </div>
      {isUser && (
        <div className="relative">
          <Avatar className="h-10 w-10 border-2 border-[#EAEAEA]/30 shadow-lg">
            <AvatarFallback className="bg-gradient-to-r from-[#EAEAEA] to-[#059669]/20 text-[#0A0F1A]">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#EAEAEA] rounded-full animate-pulse shadow-lg"></div>
        </div>
      )}
    </div>
  )
}
