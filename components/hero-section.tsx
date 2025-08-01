import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Shield, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-8 xl:grid-cols-[1fr_400px] xl:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none">
                Welcome to Mekenet SACCO LTD
              </h1>
              <p className="max-w-[600px] text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
                Your trusted financial partner providing innovative digital banking solutions, savings, and credit
                services to empower your financial growth and security.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button size="lg" className="w-full sm:w-auto inline-flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center order-first lg:order-last">
            <Image
              src="/logo.jpg"
              alt="Mekenet SACCO LTD"
              width={300}
              height={300}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Community Focused</h3>
            <p className="text-sm text-muted-foreground">Serving our members with personalized financial solutions</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Secure & Reliable</h3>
            <p className="text-sm text-muted-foreground">Advanced security measures to protect your financial assets</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Growth Oriented</h3>
            <p className="text-sm text-muted-foreground">Helping you achieve your financial goals and aspirations</p>
          </div>
        </div>
      </div>
    </section>
  )
}
