"use client"

import { useState } from "react"

export default function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  const plans = [
    {
      name: "Accelerator Lite",
      price: "$0",
      period: "for one-week",
      trial: "7-day free trial",
      features: [
        "Limited Access to 20+ Projects",
        "Resume Roasts",
        "Interview Prep Platform",
        "100% Remote, Asynchronous Sprints",
      ],
      buttonText: "Join Platform",
      popular: false,
    },
    {
      name: "Accelerator",
      price: "$149",
      period: "monthly",
      trial: "Most Popular",
      features: [
        "20+ Project Roadmap",
        "2-Week Deadlines",
        "400+ Hired Network",
        "1on1 Onboarding Call",
        "Resume Roast",
        "85+ Score = Match with Startup",
        "100% Remote, Asynchronous",
        "3 Mentor Calls from Engineers at Google, OpenAI, Scale AI, etc",
      ],
      buttonText: "Join Platform",
      popular: true,
    },
    {
      name: "Accelerator Bundle Plan",
      price: "$999",
      period: "annually",
      trial: "includes",
      features: [
        "Everything in Accelerator plan",
        "for a year, plus",
        "O1 Visa Advice",
        "Team Matching",
        "100% Refund if Hired by Partner",
        "Unlimited Calls with Mentors from Google, OpenAI, Scale AI",
      ],
      buttonText: "Join Platform",
      popular: false,
    },
  ]

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">GET Started</h2>
          <p className="text-sm font-light italic text-[#EAEAEA]/80">
            <span className="text-[#39D39F]">Standout with other go-getters</span>{" "}
            <span className="text-white">and high-achievers</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-xl backdrop-blur-md border transition-all duration-300 ${
                plan.popular
                  ? "bg-[#39D39F]/10 border-[#39D39F] shadow-lg shadow-[#39D39F]/25"
                  : hoveredPlan === index
                    ? "bg-white/10 border-[#39D39F]/50 transform -translate-y-2"
                    : "bg-white/5 border-white/10 hover:border-[#39D39F]/30"
              }`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#39D39F] text-black text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-[#39D39F]">{plan.price}</span>
                  <span className="text-sm text-[#EAEAEA]/80 ml-1">{plan.period}</span>
                </div>
                <p className="text-xs text-[#39D39F]">{plan.trial}</p>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-xs text-[#EAEAEA]/90 font-light italic">
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg border transition-all duration-300 ${
                  plan.popular
                    ? "border-[#39D39F] bg-[#39D39F]/20 text-[#39D39F] hover:bg-[#39D39F]/30"
                    : "border-[#39D39F]/50 text-[#EAEAEA] hover:border-[#39D39F] hover:bg-[#39D39F]/10 hover:text-[#39D39F]"
                }`}
              >
                <span className="text-sm font-medium">{plan.buttonText}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
