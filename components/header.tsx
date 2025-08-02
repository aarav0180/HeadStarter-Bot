"use client"

import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-transparent border-b border-white/5">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - Far left with minimal margin */}
        <div className="text-2xl font-bold text-[#EAEAEA]">headstarter</div>

        {/* Centered Navigation */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          {["Hiring Partners", "Success Stories"].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 ${
                hoveredItem === item
                  ? "border-[#39D39F] bg-[#39D39F]/20 text-white shadow-lg shadow-[#39D39F]/25"
                  : "border-[#39D39F]/50 text-[#EAEAEA] hover:border-[#39D39F] hover:bg-[#39D39F]/10"
              }`}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* CTA Button - Far right with minimal margin */}
        <Link href="/chat" passHref>
          <button
            className={`px-6 py-2 text-sm rounded-lg border transition-all duration-300 ${
              hoveredItem === "trial"
                ? "border-[#39D39F] bg-[#39D39F]/20 text-white shadow-lg shadow-[#39D39F]/25"
                : "border-[#39D39F] bg-[#39D39F]/10 text-[#39D39F] hover:bg-[#39D39F]/20"
            }`}
            onMouseEnter={() => setHoveredItem("trial")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Start Free Trial
          </button>
        </Link>
      </div>
    </header>
  )
}
