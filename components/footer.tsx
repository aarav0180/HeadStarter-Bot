"use client"

import { useState } from "react"

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const socialLinks = [
    { name: "LinkedIn", icon: "💼" },
    { name: "GitHub", icon: "🐙" },
    { name: "Twitter", icon: "🐦" },
  ]

  return (
    <footer className="py-16 px-6 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
          <p className="text-sm font-light italic text-[#EAEAEA]/80 mb-6">
            <span className="text-[#39D39F]">Join our community of a 115,000 engineers.</span>
          </p>
          <h3 className="text-xl font-semibold text-white mb-6">Break Into Best Roles TODAY</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-6 py-3 rounded-xl backdrop-blur-md bg-[#39D39F]/20 border border-[#39D39F] hover:bg-[#39D39F]/30 transition-all duration-300">
              <span className="text-base font-medium text-[#39D39F]">Start Free Trial</span>
            </button>
            <button className="px-6 py-3 rounded-xl backdrop-blur-md bg-white/5 border border-white/20 hover:border-[#39D39F]/50 transition-all duration-300">
              <span className="text-base font-medium text-white">Apply BuildCore</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and Mission */}
          <div>
            <h3 className="text-xl font-medium text-[#EAEAEA] mb-4">headstarter</h3>
            <p className="text-xs font-light italic text-[#EAEAEA]/80 leading-relaxed">
              Building the #1 community for Software Engineers.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Links</h4>
            <ul className="space-y-2">
              {["Book Free Demo", "BuildCore Program", "Success Stories"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-[#EAEAEA]/80 hover:text-[#39D39F] transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs text-[#EAEAEA]/80 hover:text-[#39D39F] transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <h3 className="text-lg font-semibold text-white mb-4">FAQ</h3>
          <p className="text-xs text-[#EAEAEA]/60">© 2024 HeadStarter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
