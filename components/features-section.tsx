"use client"

export default function FeaturesSection() {
  const features = [
    {
      title: "One Platform to Land a Job",
      description: "We partnered with 30+ companies hiring for 100+ roles.",
      align: "left",
    },
    {
      title: "Solve Real-world Problems",
      description: "Complete 20-100hr coding projects in full-stack, ai/ml or infra given by startups",
      align: "right",
    },
    {
      title: "Get Personalized Referrals",
      description: "Turn your skills to automatic job interviews. Get introduced to jobs or feedback on how to improve",
      align: "left",
    },
    {
      title: "Support Throughout Journey",
      description: "Join Network, IRL Events and Headstarter alumni who are in many top Software Companies",
      align: "right",
    },
  ]

  return (
    <section className="py-20 px-6 relative">
      <div className="container mx-auto max-w-4xl relative">
        {/* Curvy dotted connecting line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#39D39F" />
            </marker>
          </defs>
          <path
            d="M650 -25 Q720 -25 720 45 Q720 115 80 115 Q30 115 30 185 Q30 255 720 255 Q770 255 770 325 Q700 395 150 395"
            stroke="#39D39F"
            strokeWidth="2"
            strokeDasharray="8,8"
            fill="none"
            opacity="0.6"
            className="animate-pulse"
            markerEnd="url(#arrowhead)"
          />
          {/* Arrow markers (circles) */}
          <circle cx="720" cy="45" r="3" fill="#39D39F" opacity="0.8" />
          <circle cx="80" cy="115" r="3" fill="#39D39F" opacity="0.8" />
          <circle cx="720" cy="255" r="3" fill="#39D39F" opacity="0.8" />
          <circle cx="150" cy="395" r="3" fill="#39D39F" opacity="0.8" />
        </svg>

        <div className="space-y-16 relative z-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.align === "left" ? "text-left" : "text-right"} max-w-2xl ${feature.align === "right" ? "ml-auto" : ""}`}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-base font-light italic text-[#39D39F] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
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
