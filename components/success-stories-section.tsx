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

  // Split stories into 3 staggered rows with different starting positions
  const row1 = [...successStories.slice(0, 4), ...successStories.slice(0, 4)]
  const row2 = [...successStories.slice(4, 8), ...successStories.slice(4, 8)]
  const row3 = [...successStories.slice(8, 12), ...successStories.slice(8, 12)]

  type SuccessStory = {
    name: string;
    role: string;
    year: string;
    logo: string;
    company: string;
  };

  const SuccessCard = ({ story, index }: { story: SuccessStory; index: number }) => (
    <div
      className="min-w-[380px] mx-3 group cursor-pointer"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="relative px-6 py-4 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-[#39D39F]/20 via-[#39D39F]/10 to-white/5 border border-[#39D39F]/30 hover:border-[#39D39F]/60 transition-all duration-500 hover:scale-105 hover:rotate-1 shadow-2xl hover:shadow-[#39D39F]/20">
        {/* Glassy overlay effect with colors */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#39D39F]/15 via-emerald-400/5 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#39D39F]/30 via-emerald-400/20 to-cyan-400/20 blur-sm"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#39D39F] transition-colors duration-300">
                {story.name}
              </h3>
              <p className="text-sm text-[#39D39F]/90 mb-1 font-medium">
                {story.role}
              </p>
              <p className="text-xs text-[#39D39F] font-semibold bg-[#39D39F]/20 px-3 py-1 rounded-full inline-block border border-[#39D39F]/40">
                {story.year}
              </p>
            </div>
            <div className="ml-4 text-3xl group-hover:scale-110 transition-transform duration-300 bg-white/10 p-2 rounded-xl backdrop-blur-sm">
              {story.logo}
            </div>
          </div>
        </div>
      </div>
    </div>
  )


  // Hardcoded simple marquee row (always scrolls left, no SSR issues)
  const MarqueeRow = ({ stories }: { stories: SuccessStory[] }) => (
    <div className="relative overflow-hidden py-3">
      <div className="flex marquee-track">
        {stories.map((story, index) => (
          <SuccessCard key={`marquee-${index}`} story={story} index={index} />
        ))}
      </div>
    </div>
  )


  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-white text-center mb-4">Success Stories</h2>
        <p className="text-center text-base font-light italic text-[#EAEAEA]/80 mb-16">
          <span className="text-[#39D39F]">2000+ Headstarters</span>{" "}
          <span className="text-white">have landed roles at top companies.</span>
        </p>

       {/* Staggered Marquee Rows with different offsets */}
       <div className="space-y-4 mb-16">
          <MarqueeRow stories={row1} />
          <MarqueeRow stories={row2} />
          <MarqueeRow stories={row3} />
        </div>
        </div>

      <style jsx>{`
        @keyframes simple-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          width: 200%;
          animation: simple-marquee 25s linear infinite;
        }
      `}</style>
    </section>
  )
}
