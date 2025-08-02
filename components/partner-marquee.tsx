"use client"

export default function PartnerMarquee() {
  const partners = [
    "Google",
    "NVIDIA",
    "OpenAI",
    "Meta",
    "Microsoft",
    "Amazon",
    "Tesla",
    "DeepMind",
    "Anthropic",
    "Scale AI",
    "Apple",
    "Netflix",
  ]

  return (
    <section className="py-20 overflow-hidden">
      <div className="text-center mb-12">
        <p className="text-lg font-light italic text-[#EAEAEA]/80">
          <span className="text-[#39D39F]">Over 2000+ Engineers hired</span>{" "}
          <span className="text-white">after Headstarter into Companies like:</span>
        </p>
      </div>

      <div className="relative">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0F1A] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0F1A] to-transparent z-10" />

        {/* Scrolling marquee - bigger text, no boxes */}
        <div className="flex animate-marquee">
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div key={`${partner}-${index}`} className="flex-shrink-0 mx-12 whitespace-nowrap">
              <span className="text-3xl font-medium text-[#6B7280] hover:text-[#39D39F] transition-colors duration-300">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
