"use client"

import { useState } from "react"

export default function ImageGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const images = [
    { src: "/placeholder.svg?height=300&width=400", alt: "Neural Network" },
    { src: "/placeholder.svg?height=400&width=300", alt: "Robotics Lab" },
    { src: "/placeholder.svg?height=350&width=350", alt: "Data Charts" },
    { src: "/placeholder.svg?height=300&width=450", alt: "Tech Team" },
    { src: "/placeholder.svg?height=400&width=300", alt: "ML Algorithms" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Research Office" },
  ]

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-white text-center mb-12">The Future of AI/ML</h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image, index) => (
            <div
              key={index}
              className={`break-inside-avoid rounded-xl overflow-hidden backdrop-blur-md bg-white/5 border transition-all duration-300 ${
                hoveredIndex === index
                  ? "border-[#39D39F] shadow-lg shadow-[#39D39F]/25 transform scale-105"
                  : "border-white/10 hover:border-[#39D39F]/50"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className={`w-full h-auto object-cover transition-transform duration-300 ${
                    hoveredIndex === index ? "scale-110" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
