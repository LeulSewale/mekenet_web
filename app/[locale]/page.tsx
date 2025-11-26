import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { VisionMissionSection } from "@/components/vision-mission-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <VisionMissionSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

