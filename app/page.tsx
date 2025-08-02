import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import PartnerMarquee from "@/components/partner-marquee"
import FeaturesSection from "@/components/features-section"
import HowItWorksSection from "@/components/how-it-works-section"
import JobMatchingSection from "@/components/job-matching-section"
import SuccessStoriesSection from "@/components/success-stories-section"
import TestimonialsSection from "@/components/testimonials-section"
import PricingSection from "@/components/pricing-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0F1A] text-[#EAEAEA] font-['Poppins'] overflow-x-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00F260] via-[#0575E6] to-transparent animate-gradient-shift" />
      </div>

      <Header />
      <HeroSection />
      <PartnerMarquee />
      <FeaturesSection />
      <HowItWorksSection />
      <JobMatchingSection />
      <SuccessStoriesSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </div>
  )
}
