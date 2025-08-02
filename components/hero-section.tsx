"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export default function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Initialize particles
    const initialParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }))

    setParticles(initialParticles)

    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
          y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y,
        })),
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-[#39D39F] animate-pulse"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px rgba(57, 211, 159, 0.3)`,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl leading-tight mb-6">
          <span className="font-bold text-white">Break</span>{" "}
          <span className="font-light italic text-[#EAEAEA]">into the</span>{" "}
          <span className="font-bold text-white">best</span>
          <br />
          <span className="font-bold text-[#39D39F]">ML/SWE</span>{" "}
          <span className="font-light italic text-[#EAEAEA]">Roles</span>
        </h1>

        <p className="text-lg md:text-xl mb-8 font-light italic">
          <span className="text-[#39D39F]">Solve real-world tech problems.</span>{" "}
          <span className="text-white">Get personalized referrals.</span>{" "}
          <span className="text-[#39D39F]">Land your dream job.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group relative px-6 py-3 rounded-xl backdrop-blur-md bg-[#39D39F]/20 border border-[#39D39F] hover:bg-[#39D39F]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#39D39F]/25">
            <span className="text-base font-medium text-[#39D39F] group-hover:text-white transition-colors">
              Start Free Trial
            </span>
          </button>
          <button className="group relative px-6 py-3 rounded-xl backdrop-blur-md bg-white/5 border border-white/20 hover:border-[#39D39F]/50 hover:bg-white/10 transition-all duration-300">
            <span className="text-base font-medium text-white group-hover:text-[#39D39F] transition-colors">
              Apply BuildCore
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
