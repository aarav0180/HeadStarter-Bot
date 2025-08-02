"use client"
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

export function ChatSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 flex items-center justify-center">
        {isCollapsed ? (
          <div className="text-2xl font-bold text-[#EAEAEA]">H</div>
        ) : (
          <div className="text-2xl font-bold text-[#EAEAEA]">headstarter</div>
        )}
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <Button className={cn("w-full justify-center", isCollapsed ? "px-2 py-2" : "px-4 py-2")} variant="outline">
              <Plus className={cn("mr-2", isCollapsed && "mr-0")} />
              {!isCollapsed && "New Chat"}
              <span className="sr-only">New Chat</span>
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {Array.from({ length: 5 }).map((_, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton tooltip={`Chat ${i + 1}`} className="justify-start">
                    <MessageSquare />
                    {!isCollapsed && <span>Chat {i + 1}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings" className="justify-start">
              <Settings />
              {!isCollapsed && <span>Settings</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout" className="justify-start">
              <LogOut />
              {!isCollapsed && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
