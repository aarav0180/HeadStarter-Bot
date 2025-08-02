"use client"

import { useState } from "react"

export default function JobMatchingSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const jobs = [
    {
      company: "Anterior",
      role: "Product Eng.",
      salary: "$170-220k",
      status: "HIRED",
    },
    {
      company: "Ruby (YC23)",
      role: "Software Intern",
      salary: "$$$",
      status: "",
    },
    {
      company: "Rilla Voice",
      role: "Senior Engineer",
      salary: "$190-300k",
      status: "",
    },
    {
      company: "Autoblocks AI",
      role: "Founding Eng.",
      salary: "$120-200k",
      status: "HIRED",
    },
    {
      company: "Stealth Startup",
      role: "Software Eng.",
      salary: "$$$",
      status: "",
    },
    {
      company: "Coframe",
      role: "Member of Technical Staff",
      salary: "$150-300K",
      status: "",
    },
    {
      company: "AutoMax AI",
      role: "Founding Eng.",
      salary: "$100-150k",
      status: "",
    },
    {
      company: "Roger Health",
      role: "Full-Stack Eng.",
      salary: "$150-180K",
      status: "HIRED",
    },
    {
      company: "Olostep",
      role: "Software Intern",
      salary: "$$$",
      status: "",
    },
  ]

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Match with Startups</h2>
        <p className="text-center text-sm font-light italic text-[#EAEAEA]/80 mb-12">
          <span className="text-[#39D39F]">Have work experience, 85+ career capital</span>{" "}
          <span className="text-white">OR the best project and we will forward you to:</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl backdrop-blur-md bg-white/5 border transition-all duration-300 ${
                hoveredCard === index
                  ? "border-[#39D39F] shadow-lg shadow-[#39D39F]/25 transform -translate-y-1"
                  : "border-white/10 hover:border-[#39D39F]/50"
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-white">{job.role}</h3>
                  <p className="text-xs text-[#EAEAEA]/80">{job.company}</p>
                </div>
                {job.status && (
                  <span className="text-xs bg-[#39D39F]/20 text-[#39D39F] px-2 py-1 rounded">{job.status}</span>
                )}
              </div>
              <p className="text-sm font-medium text-[#39D39F]">{job.salary}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 rounded-xl backdrop-blur-md bg-[#39D39F]/20 border border-[#39D39F] hover:bg-[#39D39F]/30 transition-all duration-300">
              <span className="text-base font-medium text-[#39D39F]">Start Free Trial</span>
            </button>
            <button className="px-6 py-3 rounded-xl backdrop-blur-md bg-white/5 border border-white/20 hover:border-[#39D39F]/50 transition-all duration-300">
              <span className="text-base font-medium text-white">Apply BuildCore</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
