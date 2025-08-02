"use client"
import Image from "next/image"
import { Plus, MessageSquare, Settings, LogOut } from "lucide-react"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip" // Corrected import

interface ChatSidebarProps {
  onNewChat: () => void
}

export function ChatSidebar({ onNewChat }: ChatSidebarProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" className="bg-transparent backdrop-blur-lg border-r border-white/10">
        <SidebarHeader className="p-4 flex items-center justify-center">
          {isCollapsed ? (
            <Image
              src="/images/headstarter-logo.png"
              alt="HeadStarter Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          ) : (
            <Image
              src="/images/headstarter-logo.png"
              alt="HeadStarter Logo"
              width={150}
              height={40}
              className="h-10 w-auto object-contain"
            />
          )}
        </SidebarHeader>
        <SidebarContent className="flex-1 overflow-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onNewChat}
                    className={cn(
                      "w-full justify-center bg-[#39D39F] text-white hover:bg-[#39D39F]/90 transition-all duration-200",
                      isCollapsed ? "px-2 py-2 rounded-full size-10" : "px-4 py-2 rounded-lg",
                    )}
                    variant="default"
                  >
                    <Plus className={cn("mr-2", isCollapsed && "mr-0")} />
                    {!isCollapsed && "New Chat"}
                    <span className="sr-only">New Chat</span>
                  </Button>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">New Chat</TooltipContent>}
              </Tooltip>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          tooltip={`Chat ${i + 1}`}
                          className="justify-start text-[#EAEAEA] hover:bg-white/10 hover:text-[#39D39F]"
                        >
                          <MessageSquare />
                          {!isCollapsed && <span>Chat {i + 1}</span>}
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {isCollapsed && <TooltipContent side="right">{`Chat ${i + 1}`}</TooltipContent>}
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-white/10">
          <SidebarMenu>
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    tooltip="Settings"
                    className="justify-start text-[#EAEAEA] hover:bg-white/10 hover:text-[#39D39F]"
                  >
                    <Settings />
                    {!isCollapsed && <span>Settings</span>}
                  </SidebarMenuButton>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Settings</TooltipContent>}
              </Tooltip>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    tooltip="Logout"
                    className="justify-start text-[#EAEAEA] hover:bg-white/10 hover:text-[#39D39F]"
                  >
                    <LogOut />
                    {!isCollapsed && <span>Logout</span>}
                  </SidebarMenuButton>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Logout</TooltipContent>}
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  )
}
