"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles, Bot, Zap, Search, SearchX } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { AiMessagePopup } from "@/components/ai-message-popup"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ChatWindowProps {
  messages: { role: string; content: string }[]
  setMessages: (messages: { role: string; content: string }[]) => void
  currentChatId: string | null
  setCurrentChatId: React.Dispatch<React.SetStateAction<string | null>>
}

interface Solution {
  rank: number
  type: string
  fix: string
  source: string
}

interface Suggestion {
  prompt: string
  reason: string
}

interface ApiResponse {
  solutions: Solution[]
  suggestions: Suggestion[]
}

interface StreamStep {
  step: string
  message: string
  progress: number
  solutions?: Solution[]
  suggestions?: Suggestion[]
}

export function ChatWindow({ messages, setMessages, currentChatId, setCurrentChatId }: ChatWindowProps) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showAiPopup, setShowAiPopup] = useState(false)
  const [webSearchEnabled, setWebSearchEnabled] = useState(false)
  const [streamProgress, setStreamProgress] = useState<StreamStep | null>(null)
  const [continuousProgress, setContinuousProgress] = useState(0)
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Cleanup progress interval on unmount
  useEffect(() => {
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    }
  }, [progressInterval])

  const startContinuousProgress = () => {
    setContinuousProgress(0)
    
    // Clear any existing interval
    if (progressInterval) {
      clearInterval(progressInterval)
    }
    
    // Start new interval that increases by 2% every second
    const interval = setInterval(() => {
      setContinuousProgress(prev => {
        const newProgress = prev + 2
        return newProgress > 98 ? 98 : newProgress // Cap at 98% until completion
      })
    }, 1000)
    
    setProgressInterval(interval)
  }

  const stopContinuousProgress = () => {
    if (progressInterval) {
      clearInterval(progressInterval)
      setProgressInterval(null)
    }
  }

  const updateProgressFromSSE = (sseProgress: number) => {
    setContinuousProgress(sseProgress)
  }

  const handleSendMessage = async () => {
    if (input.trim() === "") return

    const userMessage = { role: "user", content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")
    setIsLoading(true)
    setStreamProgress(null)

    try {
      if (webSearchEnabled) {
        // Use streaming endpoint directly
        await handleStreamingQuery(input)
      } else {
        // Use the API route for basic queries
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            messages: [...messages, userMessage],
            webSearchEnabled: false
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setMessages((prevMessages) => [...prevMessages, { role: "ai", content: data.response }])
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", content: "Sorry, something went wrong. Please try again." },
      ])
    } finally {
      setIsLoading(false)
      setStreamProgress(null)
    }
  }

  const handleStreamingQuery = async (question: string) => {
    try {
      const response = await fetch("http://localhost:8000/query/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error(`Streaming API error: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error("No response body from streaming API")
      }

      // Start continuous progress and add initial loading message
      startContinuousProgress()
      setMessages((prevMessages) => [...prevMessages, { role: "ai", content: "Initializing web search..." }])

      // Add timeout mechanism
      const timeout = setTimeout(() => {
        reader.cancel()
        stopContinuousProgress()
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages]
          const lastMessage = newMessages[newMessages.length - 1]
          if (lastMessage.role === "ai") {
            lastMessage.content = "Request timed out. Please try again or check your connection."
          }
          return newMessages
        })
      }, 30000) // 30 second timeout

      try {
        while (true) {
          const { done, value } = await reader.read()
          
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data: StreamStep = JSON.parse(line.slice(6))
                setStreamProgress(data)

                // Update progress from SSE
                if (typeof data.progress === 'number') {
                  updateProgressFromSSE(data.progress)
                }

                // Update the AI message with progress and status
                setMessages((prevMessages) => {
                  const newMessages = [...prevMessages]
                  const lastMessage = newMessages[newMessages.length - 1]
                  
                  if (lastMessage.role === "ai") {
                    if (data.step === "complete" && data.solutions) {
                      // Stop continuous progress and clear timeout on completion
                      stopContinuousProgress()
                      clearTimeout(timeout)
                      setContinuousProgress(100)
                      
                      // Format final response
                      let formattedResponse = "Here are the solutions I found:\n\n"
                      
                      // Check if solutions is an array and has items
                      if (Array.isArray(data.solutions) && data.solutions.length > 0) {
                        data.solutions.forEach((solution, index) => {
                          const solutionType = solution.type || 'solution'
                          const solutionFix = solution.fix || 'No fix provided'
                          const solutionSource = solution.source || 'Unknown source'
                          
                          formattedResponse += `**${index + 1}. ${solutionType.replace('_', ' ').toUpperCase()}**\n`
                          formattedResponse += `${solutionFix}\n`
                          formattedResponse += `*Source: ${solutionSource}*\n\n`
                        })
                      } else {
                        formattedResponse = "I couldn't find specific solutions for your query. Please try rephrasing your question."
                      }

                      if (data.suggestions && Array.isArray(data.suggestions) && data.suggestions.length > 0) {
                        formattedResponse += "**Suggestions for further exploration:**\n"
                        data.suggestions.forEach((suggestion, index) => {
                          const suggestionPrompt = suggestion.prompt || 'No prompt provided'
                          const suggestionReason = suggestion.reason || 'No reason provided'
                          formattedResponse += `${index + 1}. **${suggestionPrompt}** - ${suggestionReason}\n`
                        })
                      }

                      lastMessage.content = formattedResponse
                    } else if (data.message && typeof data.progress === 'number') {
                      // Show dynamic status message with progress
                      const stepName = data.step ? data.step.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Processing'
                      lastMessage.content = `${stepName}: ${data.message}`
                    } else {
                      // Fallback for unexpected data format
                      lastMessage.content = "Processing your request..."
                    }
                  }
                  
                  return newMessages
                })
              } catch (e) {
                console.error("Error parsing SSE data:", e, "Raw data:", line)
                // Continue processing other lines even if one fails
              }
            }
          }
        }
      } finally {
        stopContinuousProgress()
        clearTimeout(timeout)
        reader.releaseLock()
      }
    } catch (error) {
      console.error("Error in streaming query:", error)
      stopContinuousProgress()
      
      // Update the last AI message with error information
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages]
        const lastMessage = newMessages[newMessages.length - 1]
        
        if (lastMessage.role === "ai") {
          lastMessage.content = "Sorry, the web search service is currently unavailable. Please try again later or disable web search to use the basic chat mode."
        }
        
        return newMessages
      })
      
      throw error
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
        <div className="flex flex-col items-center justify-center flex-1 text-center p-8">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#059669] to-[#0D9488] rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-[#059669] to-[#0D9488] p-6 rounded-full shadow-2xl">
              <Bot className="w-16 h-16 text-[#0A0F1A]" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-[#EAEAEA]">Welcome to Your </span>
            <span className="bg-gradient-to-r from-[#059669] to-[#0D9488] bg-clip-text text-transparent">AI Assistant</span>
          </h2>
          <p className="text-[#EAEAEA] max-w-lg text-lg leading-relaxed mb-8">
            <span className="text-[#EAEAEA]">I'm here to help you with your </span>
            <span className="text-[#059669]">career journey</span>
            <span className="text-[#EAEAEA]">, answer questions, and provide </span>
            <span className="text-[#059669]">guidance</span>
            <span className="text-[#EAEAEA]">. Let's start a conversation and explore new possibilities together.</span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="bg-[#059669]/10 backdrop-blur-sm border border-[#059669]/20 rounded-lg px-4 py-2 text-sm text-[#EAEAEA]">
              💼 Career Advice
            </div>
            <div className="bg-[#059669]/10 backdrop-blur-sm border border-[#059669]/20 rounded-lg px-4 py-2 text-sm text-[#EAEAEA]">
              🎯 Goal Setting
            </div>
            <div className="bg-[#059669]/10 backdrop-blur-sm border border-[#059669]/20 rounded-lg px-4 py-2 text-sm text-[#EAEAEA]">
              📚 Learning Paths
            </div>
            <div className="bg-[#059669]/10 backdrop-blur-sm border border-[#059669]/20 rounded-lg px-4 py-2 text-sm text-[#EAEAEA]">
              🤝 Networking Tips
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
          {messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#059669] to-[#0D9488] flex items-center justify-center">
                <Bot className="h-5 w-5 text-[#0A0F1A]" />
              </div>
              <div className="bg-[#059669]/10 backdrop-blur-sm border border-[#059669]/20 rounded-lg p-4 max-w-[70%]">
                <div className="flex items-center gap-2 text-[#059669] mb-3">
                  <div className="w-2 h-2 bg-[#059669] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#059669] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-[#059669] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-sm font-medium ml-2">
                    {webSearchEnabled ? (streamProgress?.message || "Searching...") : "Thinking..."}
                  </span>
                </div>
                {webSearchEnabled && (
                  <div className="space-y-2">
                    <div className="w-full bg-[#059669]/20 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#059669] to-[#10B981] h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                        style={{ 
                          width: `${continuousProgress}%`,
                          background: `linear-gradient(90deg, #059669 ${continuousProgress}%, #10B981 ${Math.min(continuousProgress + 20, 100)}%)`
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#059669]/70">
                        {streamProgress?.step ? streamProgress.step.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Processing'}
                      </span>
                      <span className="text-[#059669] font-medium">{Math.round(continuousProgress)}%</span>
                    </div>
                    {streamProgress?.message && (
                      <p className="text-xs text-[#059669]/80 italic">
                        {streamProgress.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="flex-shrink-0 p-4 border-t border-[#059669]/20 bg-[#0A0F1A]/60 backdrop-blur-xl rounded-b-3xl">
        {/* Web Search Toggle */}
        <div className="flex items-center justify-between mb-3 p-2 bg-[#059669]/5 rounded-lg border border-[#059669]/10">
          <div className="flex items-center gap-2">
            {webSearchEnabled ? (
              <Search className="w-4 h-4 text-[#059669]" />
            ) : (
              <SearchX className="w-4 h-4 text-[#EAEAEA]/60" />
            )}
            <Label htmlFor="web-search" className="text-xs font-medium text-[#EAEAEA]">
              {webSearchEnabled ? "Web Search Enabled" : "Web Search Disabled"}
            </Label>
          </div>
          <Switch
            id="web-search"
            checked={webSearchEnabled}
            onCheckedChange={setWebSearchEnabled}
            className="data-[state=checked]:bg-[#059669] data-[state=unchecked]:bg-[#EAEAEA]/20"
          />
        </div>
        
        <div className="flex items-end gap-2">
          <Textarea
            placeholder={webSearchEnabled ? "Ask me anything with web search..." : "Type your message here..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 resize-none rounded-xl border border-[#059669]/20 bg-[#0A0F1A]/80 backdrop-blur-sm p-3 shadow-lg focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20 transition-all duration-300 text-[#EAEAEA] placeholder-[#059669]/50 text-sm"
            rows={1}
          />
          <div className="flex gap-1">
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || input.trim() === ""}
              variant="ghost"
              className="bg-[#059669]/10 text-[#059669] hover:bg-[#059669]/20 hover:text-[#10B981] transition-all duration-300 border border-[#059669]/30 rounded-xl px-3 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
            <Button
              onClick={() => setShowAiPopup(true)}
              variant="ghost"
              className="bg-[#059669]/10 backdrop-blur-sm text-[#059669] border-[#059669]/30 hover:bg-[#059669]/20 hover:text-[#10B981] transition-all duration-300 rounded-xl px-3 py-3"
            >
              <Zap className="w-4 h-4" />
              <span className="sr-only">AI Options</span>
            </Button>
          </div>
        </div>
      </div>

      {showAiPopup && (
        <div className="absolute inset-0 bg-[#0A0F1A]/80 backdrop-blur-sm flex items-center justify-center z-50">
          <AiMessagePopup onClose={handleAiPopupClose} />
        </div>
      )}
    </div>
  )
}
