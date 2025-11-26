"use client"

import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Shield, TrendingUp } from "lucide-react"
import { Logo } from "@/components/logo"

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section id="home" className="relative py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_350px] lg:gap-12 xl:grid-cols-[1fr_450px] xl:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                {t('title')}
              </h1>
              <p className="max-w-[650px] text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                {t('description')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                {t('getStarted')}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12 border-2 hover:bg-accent transition-all"
              >
                {t('learnMore')}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center order-first lg:order-last">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl transform scale-110 animate-pulse" />
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px] rounded-3xl shadow-2xl ring-4 ring-primary/10 transition-transform hover:scale-105 bg-primary/5 flex items-center justify-center">
                <Logo 
                  width={400} 
                  height={400} 
                  className="w-full h-full rounded-3xl"
                  iconClassName="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:gap-8 mt-16 sm:mt-20 md:mt-24 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group flex flex-col items-center text-center space-y-3 sm:space-y-4 p-6 sm:p-8 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
              <Users className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">{t('features.community.title')}</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t('features.community.description')}</p>
          </div>
          <div className="group flex flex-col items-center text-center space-y-3 sm:space-y-4 p-6 sm:p-8 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
              <Shield className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">{t('features.secure.title')}</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t('features.secure.description')}</p>
          </div>
          <div className="group flex flex-col items-center text-center space-y-3 sm:space-y-4 p-6 sm:p-8 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
              <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">{t('features.growth.title')}</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t('features.growth.description')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
