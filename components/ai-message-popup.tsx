"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Sparkles, RotateCcw, Expand, Languages, Zap } from "lucide-react"

interface AiMessagePopupProps {
  onClose: () => void
}

export function AiMessagePopup({ onClose }: AiMessagePopupProps) {
  return (
    <Card className="w-full max-w-md bg-[#0A0F1A]/95 backdrop-blur-2xl border border-[#059669]/20 shadow-2xl relative rounded-2xl">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 text-[#EAEAEA] hover:text-[#059669] hover:bg-[#059669]/10 transition-all duration-200 rounded-full"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </Button>
      <CardHeader className="text-center pb-4">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-[#059669] to-[#0D9488] rounded-full blur-lg opacity-20"></div>
          <div className="relative bg-gradient-to-r from-[#059669] to-[#0D9488] p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-[#0A0F1A]" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">
          <span className="text-[#EAEAEA]">AI </span>
          <span className="bg-gradient-to-r from-[#059669] to-[#0D9488] bg-clip-text text-transparent">Assistant</span>
        </CardTitle>
        <CardDescription className="text-[#EAEAEA] text-base">
          <span className="text-[#EAEAEA]">Choose an AI-powered action to </span>
          <span className="text-[#059669]">enhance</span>
          <span className="text-[#EAEAEA]"> your conversation.</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 px-6">
        <Button
          variant="ghost"
          className="w-full text-[#059669] border-[#059669]/30 hover:bg-[#059669]/20 hover:text-[#10B981] bg-[#059669]/5 backdrop-blur-sm transition-all duration-300 rounded-xl py-3 font-medium group"
        >
          <Sparkles className="w-4 h-4 mr-3 group-hover:rotate-12 transition-transform" />
          Summarize
        </Button>
        <Button
          variant="ghost"
          className="w-full text-[#059669] border-[#059669]/30 hover:bg-[#059669]/20 hover:text-[#10B981] bg-[#059669]/5 backdrop-blur-sm transition-all duration-300 rounded-xl py-3 font-medium group"
        >
          <RotateCcw className="w-4 h-4 mr-3 group-hover:rotate-180 transition-transform" />
          Rephrase
        </Button>
        <Button
          variant="ghost"
          className="w-full text-[#059669] border-[#059669]/30 hover:bg-[#059669]/20 hover:text-[#10B981] bg-[#059669]/5 backdrop-blur-sm transition-all duration-300 rounded-xl py-3 font-medium group"
        >
          <Expand className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
          Expand
        </Button>
        <Button
          variant="ghost"
          className="w-full text-[#059669] border-[#059669]/30 hover:bg-[#059669]/20 hover:text-[#10B981] bg-[#059669]/5 backdrop-blur-sm transition-all duration-300 rounded-xl py-3 font-medium group"
        >
          <Languages className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
          Translate
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center pt-4 pb-6">
        <div className="flex items-center gap-2 text-xs text-[#059669]/70">
          <Zap className="w-3 h-3 text-[#059669]" />
          <span>More AI features coming soon!</span>
        </div>
      </CardFooter>
    </Card>
  )
}
