"use client"

export default function SuccessStoriesSection() {
  const successStories = [
    {
      name: "Vanohra Gaspard",
      role: "Software Intern, Duolingo",
      year: "Headstarter '24",
      logo: "🎵",
      company: "Duolingo",
    },
    {
      name: "Ahmad Hossain",
      role: "Software Engineer, Google",
      year: "Headstarter '22",
      logo: "🔍",
      company: "Google",
    },
    {
      name: "Thamida Choudhury",
      role: "Software Intern, Bloomberg",
      year: "Headstarter '23",
      logo: "📊",
      company: "Bloomberg",
    },
    {
      name: "Samin Malik",
      role: "Software Eng., Microsoft",
      year: "Headstarter '21",
      logo: "🪟",
      company: "Microsoft",
    },
    {
      name: "Agrima Kampani",
      role: "Software Engineer, Google",
      year: "Headstarter '21",
      logo: "🔍",
      company: "Google",
    },
    {
      name: "Sathvik Vangavolu",
      role: "Dev. Relations Intern, Perplexity",
      year: "Headstarter '25",
      logo: "🔮",
      company: "Perplexity",
    },
    {
      name: "Eric L.",
      role: "AI Analyst, Mercor",
      year: "Headstarter '24",
      logo: "🎯",
      company: "Mercor",
    },
    {
      name: "Jordan Yen",
      role: "SWE intern, Scale AI",
      year: "Headstarter '24",
      logo: "📈",
      company: "Scale AI",
    },
    {
      name: "Rajashekar V.",
      role: "Applied AI, Fetch AI",
      year: "Headstarter '24",
      logo: "🤖",
      company: "Fetch AI",
    },
    {
      name: "J Cai",
      role: "Software Eng., Scale AI",
      year: "Headstarter '23",
      logo: "📈",
      company: "Scale AI",
    },
    {
      name: "Nana Adjekum",
      role: "Software Eng., Wayfair",
      year: "Headstarter '24",
      logo: "🏠",
      company: "Wayfair",
    },
    {
      name: "Raja Adil",
      role: "2x Software Intern, Citadel",
      year: "Headstarter '21",
      logo: "🏛️",
      company: "Citadel",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-white text-center mb-4">Success Stories</h2>
        <p className="text-center text-base font-light italic text-[#EAEAEA]/80 mb-16">
          <span className="text-[#39D39F]">2000+ Headstarters</span>{" "}
          <span className="text-white">have landed roles at top companies.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl backdrop-blur-md bg-[#1a1f2e]/80 border border-white/10 hover:border-[#39D39F]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#39D39F]/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{story.name}</h3>
                  <p className="text-sm text-[#EAEAEA]/70 mb-1">{story.role}</p>
                  <p className="text-xs text-[#EAEAEA]/50">{story.year}</p>
                </div>
                <div className="ml-4 text-2xl">{story.logo}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
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
