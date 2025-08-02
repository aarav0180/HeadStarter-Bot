"use client"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Past month, I have worked on AI projects and expanded my network by nearly 200%",
      author: "Parikshit Sood",
    },
    {
      quote:
        "I had the opportunity to contribute to an AI-powered pull request review system designed to streamline code reviews using LLMs.",
      author: "Luciano Maldonado",
    },
    {
      quote: "Collaborating with fellow cohorts!",
      author: "Lauren Ramroop",
    },
    {
      quote: "I really liked how it forced me to get out of my comfort zone",
      author: "Rafinal Haque",
    },
    {
      quote: "It taught me quite a bit about technical interviews, and building a good resume.",
      author: "Nasif Rahman",
    },
    {
      quote:
        "It provides a personal connection with seasoned professionals who provide great insight on the tech industry.",
      author: "Saqib Mahmood",
    },
  ]

  // Split testimonials into two columns of 3 each
  const column1 = testimonials.slice(0, 3)
  const column2 = testimonials.slice(3, 6)

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Platform Testimonials</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Column */}
          <div className="space-y-6">
            {column1.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-[#39D39F]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#39D39F]/10"
              >
                <p className="text-sm font-light italic text-[#EAEAEA]/90 mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <p className="text-xs font-medium text-[#39D39F]">{testimonial.author}</p>
              </div>
            ))}
          </div>

          {/* Second Column - Shifted down */}
          <div className="space-y-6 md:mt-12">
            {column2.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-[#39D39F]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#39D39F]/10"
              >
                <p className="text-sm font-light italic text-[#EAEAEA]/90 mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <p className="text-xs font-medium text-[#39D39F]">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
