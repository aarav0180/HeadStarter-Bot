"use client"
import Image from "next/image"
import { Plus, MessageSquare, Settings, LogOut, Sparkles, Bot, Trash2 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Chat {
  id: string
  title: string
  messages: { role: string; content: string }[]
  createdAt: Date
  updatedAt: Date
}

interface ChatSidebarProps {
  onNewChat: () => void
  chats: Chat[]
  currentChatId: string | null
  onChatSelect: (chatId: string) => void
  onDeleteChat: (chatId: string) => void
}

export function ChatSidebar({ onNewChat, chats, currentChatId, onChatSelect, onDeleteChat }: ChatSidebarProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getLastMessage = (messages: { role: string; content: string }[]) => {
    if (messages.length === 0) return "No messages yet"
    const lastMessage = messages[messages.length - 1]
    return lastMessage.content.length > 30 ? lastMessage.content.substring(0, 30) + '...' : lastMessage.content
  }

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" className="bg-[#0A0F1A]/90 backdrop-blur-2xl border-r border-[#059669]/10 shadow-2xl">
        <SidebarHeader className={cn(
          "flex items-center justify-center bg-gradient-to-r from-[#059669]/10 to-[#0D9488]/10 border-b border-[#059669]/20",
          isCollapsed ? "p-4" : "p-6"
        )}>
          {isCollapsed ? (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#059669]/20 to-[#0D9488]/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-[#0A0F1A]/80 backdrop-blur-xl p-3 rounded-xl border border-[#059669]/20 shadow-lg">
                <Bot className="h-6 w-6 text-[#059669]" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#059669] rounded-full animate-pulse shadow-lg"></div>
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#059669]/20 to-[#0D9488]/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-[#0A0F1A]/80 backdrop-blur-xl p-4 rounded-xl border border-[#059669]/20 shadow-lg">
                <h1 className="text-xl font-bold text-[#EAEAEA] font-['Poppins']">
                  <span className="text-[#EAEAEA]">Head</span>
                  <span className="text-[#059669]">Starter</span>
                </h1>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#059669] rounded-full animate-pulse shadow-lg"></div>
            </div>
          )}
        </SidebarHeader>
        
        <SidebarContent className={cn(
          "flex-1 overflow-auto",
          isCollapsed ? "p-3" : "p-4"
        )}>
          <SidebarGroup>
            <SidebarGroupContent>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onNewChat}
                    variant="ghost"
                    className={cn(
                      "w-full justify-center bg-[#059669]/10 text-[#059669] hover:bg-[#059669]/20 hover:text-[#10B981] transition-all duration-300 border border-[#059669]/30 backdrop-blur-sm",
                      isCollapsed ? "px-3 py-3 rounded-xl size-14" : "px-6 py-3 rounded-xl font-semibold",
                    )}
                  >
                    <Plus className={cn("mr-2", isCollapsed && "mr-0")} />
                    {!isCollapsed && "New Chat"}
                    <span className="sr-only">New Chat</span>
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="bg-[#0A0F1A]/95 backdrop-blur-2xl border-[#059669]/30 text-[#059669] shadow-2xl">
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span className="font-medium">New Chat</span>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </SidebarGroupContent>
          </SidebarGroup>
          
          {!isCollapsed && chats.length > 0 && (
            <div className="mt-6 mb-4">
              <h3 className="text-xs font-semibold text-[#059669]/70 uppercase tracking-wider mb-3 bg-gradient-to-r from-[#059669]/70 to-[#0D9488]/70 bg-clip-text text-transparent">
                Recent Conversations
              </h3>
            </div>
          )}
          
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {chats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          tooltip={chat.title}
                          className={cn(
                            "justify-start text-[#EAEAEA] hover:bg-[#059669]/10 hover:text-[#059669] transition-all duration-200 rounded-lg group backdrop-blur-sm relative",
                            isCollapsed ? "mb-2 p-2" : "mb-1 p-3",
                            currentChatId === chat.id && "bg-[#059669]/20 text-[#059669]"
                          )}
                          onClick={() => onChatSelect(chat.id)}
                        >
                          <div className="relative">
                            <MessageSquare className={cn(
                              "group-hover:scale-110 transition-transform duration-200",
                              isCollapsed ? "h-5 w-5" : "h-4 w-4"
                            )} />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#059669] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"></div>
                          </div>
                          {!isCollapsed && (
                            <div className="flex flex-col items-start ml-3 flex-1">
                              <div className="flex items-center justify-between w-full">
                                <span className="font-medium text-[#EAEAEA] truncate">{chat.title}</span>
                                <div
                                  className="h-6 w-6 p-0 text-[#EAEAEA]/50 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer flex items-center justify-center rounded"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onDeleteChat(chat.id)
                                  }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </div>
                              </div>
                              <span className="text-xs text-[#059669]/60 bg-gradient-to-r from-[#059669]/60 to-[#0D9488]/60 bg-clip-text text-transparent">
                                {getLastMessage(chat.messages)}
                              </span>
                              <span className="text-xs text-[#059669]/40">
                                {formatDate(chat.updatedAt)}
                              </span>
                            </div>
                          )}
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right" className="bg-[#0A0F1A]/95 backdrop-blur-2xl border-[#059669]/30 text-[#059669] shadow-2xl">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium">{chat.title}</span>
                            <span className="text-xs text-[#059669]/60">{getLastMessage(chat.messages)}</span>
                            <span className="text-xs text-[#059669]/40">{formatDate(chat.updatedAt)}</span>
                          </div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className={cn(
          "border-t border-[#059669]/20 bg-gradient-to-r from-[#0A0F1A]/80 to-[#0A0F1A]/90 backdrop-blur-xl",
          isCollapsed ? "p-3" : "p-4"
        )}>
          <SidebarMenu>
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    tooltip="Settings"
                    className={cn(
                      "justify-start text-[#EAEAEA] hover:bg-[#059669]/10 hover:text-[#059669] transition-all duration-200 rounded-lg backdrop-blur-sm",
                      isCollapsed ? "mb-2 p-2" : "mb-1 p-3"
                    )}
                  >
                    <Settings className={cn(
                      "hover:rotate-90 transition-transform duration-300",
                      isCollapsed ? "h-5 w-5" : "h-4 w-4"
                    )} />
                    {!isCollapsed && <span className="font-medium ml-3 text-[#EAEAEA]">Settings</span>}
                  </SidebarMenuButton>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="bg-[#0A0F1A]/95 backdrop-blur-2xl border-[#059669]/30 text-[#059669] shadow-2xl">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      <span className="font-medium">Settings</span>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    tooltip="Logout"
                    className={cn(
                      "justify-start text-[#EAEAEA] hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 rounded-lg backdrop-blur-sm",
                      isCollapsed ? "p-2" : "p-3"
                    )}
                  >
                    <LogOut className={cn(
                      "hover:scale-110 transition-transform duration-200",
                      isCollapsed ? "h-5 w-5" : "h-4 w-4"
                    )} />
                    {!isCollapsed && <span className="font-medium ml-3 text-[#EAEAEA]">Logout</span>}
                  </SidebarMenuButton>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="bg-[#0A0F1A]/95 backdrop-blur-2xl border-red-500/30 text-red-400 shadow-2xl">
                    <div className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Logout</span>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  )
}
