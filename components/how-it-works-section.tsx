"use client"

import { useState } from "react"

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "Career Score",
      description: "A score from 0-100 on how one thinks and collaborates compared to a Staff SWE.",
      number: "01",
    },
    {
      title: "ML Projects",
      description: "Work on complex problems in AI/ML, infra and demo your storytelling & coding skills",
      number: "02",
    },
    {
      title: "Full-Stack Projects",
      description: "Build AI-Engineering, Full-stack and Backend projects",
      number: "03",
    },
    {
      title: "AI Mock Interviews & Feedback",
      description: "Practice Data Structures and Algorithms and get feedback on communication",
      number: "04",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-white text-center mb-6">How our Platform Works</h2>
        <p className="text-center text-base font-light italic text-[#EAEAEA]/80 mb-16">
          <span className="text-[#39D39F]">See how close you are to becoming a senior engineer</span>{" "}
          <span className="text-white">with every submission.</span>
        </p>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start space-x-8 p-8 rounded-2xl transition-all duration-300 cursor-pointer ${
                activeStep === index ? "bg-white/5 border border-[#39D39F]/30" : "hover:bg-white/2"
              }`}
              onClick={() => setActiveStep(index)}
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Step Number */}
              <div
                className={`flex-shrink-0 w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  activeStep === index ? "border-[#39D39F] bg-[#39D39F]/10" : "border-white/20"
                }`}
              >
                <span className={`text-lg font-bold ${activeStep === index ? "text-[#39D39F]" : "text-white/60"}`}>
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    activeStep === index ? "text-[#39D39F]" : "text-white"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-sm font-light italic text-[#EAEAEA]/80 leading-relaxed">{step.description}</p>
              </div>

              {/* Active Indicator */}
              <div
                className={`w-1 h-16 rounded-full transition-all duration-300 ${
                  activeStep === index ? "bg-[#39D39F]" : "bg-transparent"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-base font-light italic text-[#EAEAEA]/80 mb-8">
            <span className="text-[#39D39F]">Level-up and Get Feedback</span>{" "}
            <span className="text-white">Join IRL events, speaker series and live resume roasts.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-xl backdrop-blur-md bg-[#39D39F]/20 border border-[#39D39F] hover:bg-[#39D39F]/30 transition-all duration-300">
              <span className="text-base font-medium text-[#39D39F]">Start Free Trial</span>
            </button>
            <button className="px-8 py-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/20 hover:border-[#39D39F]/50 transition-all duration-300">
              <span className="text-base font-medium text-white">Apply BuildCore</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
