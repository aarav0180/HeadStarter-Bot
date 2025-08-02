"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface AiMessagePopupProps {
  onClose: () => void
}

export function AiMessagePopup({ onClose }: AiMessagePopupProps) {
  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-lg border border-white/20 shadow-xl relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </Button>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">AI Options</CardTitle>
        <CardDescription className="text-gray-600">
          Choose an AI-powered action to enhance your message.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button
          variant="outline"
          className="w-full text-[#39D39F] border-[#39D39F] hover:bg-[#39D39F] hover:text-white bg-transparent"
        >
          Summarize
        </Button>
        <Button
          variant="outline"
          className="w-full text-[#39D39F] border-[#39D39F] hover:bg-[#39D39F] hover:text-white bg-transparent"
        >
          Rephrase
        </Button>
        <Button
          variant="outline"
          className="w-full text-[#39D39F] border-[#39D39F] hover:bg-[#39D39F] hover:text-white bg-transparent"
        >
          Expand
        </Button>
        <Button
          variant="outline"
          className="w-full text-[#39D39F] border-[#39D39F] hover:bg-[#39D39F] hover:text-white bg-transparent"
        >
          Translate
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-xs text-gray-500">More options coming soon!</p>
      </CardFooter>
    </Card>
  )
}
