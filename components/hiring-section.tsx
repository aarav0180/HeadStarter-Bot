"use client"

import { useState } from "react"

export default function HiringSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const jobs = [
    {
      company: "DeepMind",
      role: "Machine Learning Engineer",
      logo: "/placeholder.svg?height=60&width=60",
    },
    {
      company: "OpenAI",
      role: "AI Research Scientist",
      logo: "/placeholder.svg?height=60&width=60",
    },
    {
      company: "NVIDIA",
      role: "Deep Learning Engineer",
      logo: "/placeholder.svg?height=60&width=60",
    },
    {
      company: "Meta",
      role: "AI Product Manager",
      logo: "/placeholder.svg?height=60&width=60",
    },
    {
      company: "Google",
      role: "ML Infrastructure Engineer",
      logo: "/placeholder.svg?height=60&width=60",
    },
    {
      company: "Anthropic",
      role: "AI Safety Researcher",
      logo: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-[#EAEAEA] text-center mb-12">Top Companies Are Hiring</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl backdrop-blur-md bg-white/5 border transition-all duration-300 ${
                hoveredCard === index
                  ? "border-[#39D39F] shadow-lg shadow-[#39D39F]/25 transform -translate-y-2"
                  : "border-white/10 hover:border-[#39D39F]/50"
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center mb-4">
                <img
                  src={job.logo || "/placeholder.svg"}
                  alt={`${job.company} logo`}
                  className="w-12 h-12 rounded-lg mr-4 opacity-80"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                  <p className="text-[#EAEAEA]/80">{job.company}</p>
                </div>
              </div>

              <button
                className={`w-full py-2 px-4 rounded-lg border transition-all duration-300 ${
                  hoveredCard === index
                    ? "border-[#39D39F] bg-[#39D39F]/20 text-white"
                    : "border-[#39D39F]/50 text-[#EAEAEA] hover:border-[#39D39F] hover:bg-[#39D39F]/10"
                }`}
              >
                View Role
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
