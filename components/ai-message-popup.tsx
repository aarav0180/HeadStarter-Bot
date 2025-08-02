"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AiMessagePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  detailedContent?: string
  links?: { text: string; url: string }[]
}

export function AiMessagePopup({ open, onOpenChange, detailedContent, links }: AiMessagePopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#0A0F1A]/90 backdrop-blur-lg border border-white/10 text-[#EAEAEA] rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-[#39D39F]">Detailed Information</DialogTitle>
          <DialogDescription className="text-[#EAEAEA]/70">
            Here's more in-depth information related to your query.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] pr-4">
          <div className="text-sm leading-relaxed">
            {detailedContent ? (
              <p className="mb-4">{detailedContent}</p>
            ) : (
              <p className="mb-4">No detailed content available.</p>
            )}
            {links && links.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-[#39D39F] mb-2">Relevant Links:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00F260] hover:underline"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
