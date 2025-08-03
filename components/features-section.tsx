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
        {/* Enhanced curvy dotted connecting line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 900 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="arrowhead" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
              <polygon points="0 0, 12 4, 0 8" fill="#39D39F" />
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main curvy path with extended length and more curves */}
          <path
            d="M800 -50 Q850 -50 850 10 Q850 70 780 90 Q650 120 550 120 Q350 120 200 120 Q100 120 80 140 Q60 160 60 200 Q60 240 80 260 Q120 280 200 280 Q400 280 600 280 Q750 280 800 300 Q850 320 850 360 Q850 400 800 420 Q700 450 500 450 Q300 450 200 470 Q100 490 80 520 Q60 550 80 580 Q120 600 200 600 Q400 600 600 620 Q750 640 800 660"
            stroke="#39D39F"
            strokeWidth="3"
            strokeDasharray="10,6"
            fill="none"
            opacity="0.7"
            className="animate-pulse"
            markerEnd="url(#arrowhead)"
            filter="url(#glow)"
          />
          
          {/* Animated flow dots along the path */}
          <circle cx="780" cy="90" r="4" fill="#39D39F" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="120" r="4" fill="#39D39F" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="600" cy="280" r="4" fill="#39D39F" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="200" cy="470" r="4" fill="#39D39F" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1.5s" />
          </circle>
          
          {/* Additional decorative elements */}
          <path
            d="M100 50 Q150 30 200 50"
            stroke="#39D39F"
            strokeWidth="1"
            strokeDasharray="4,4"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M700 100 Q750 80 800 100"
            stroke="#39D39F"
            strokeWidth="1"
            strokeDasharray="4,4"
            fill="none"
            opacity="0.3"
          />
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
            {/* <button className="px-8 py-4 rounded-xl backdrop-blur-md bg-[#39D39F]/20 border border-[#39D39F] hover:bg-[#39D39F]/30 transition-all duration-300">
              <span className="text-base font-medium text-[#39D39F]">Start Free Trial</span>
            </button>
            <button className="px-8 py-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/20 hover:border-[#39D39F]/50 transition-all duration-300">
              <span className="text-base font-medium text-white">Apply BuildCore</span>
            </button> */}
          </div>
        </div>
      </div>
    </section>
  )
}
