"use client"

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Target, Heart } from "lucide-react"

export function VisionMissionSection() {
  const t = useTranslations('visionMission')

  return (
    <section id="vision-mission" className="relative py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 bg-gradient-to-br from-muted/30 via-background to-muted/30 overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center mb-12 sm:mb-16">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              {t('title')}
            </h2>
            <p className="max-w-[900px] mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl items-stretch gap-6 sm:gap-8 py-8 sm:py-12 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-2">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b pb-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                  <Eye className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl">{t('vision.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-4 sm:space-y-5">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {t('vision.description1')}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {t('vision.description2')}
              </p>
            </CardContent>
          </Card>

          <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-2">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b pb-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                  <Target className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl">{t('mission.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-4 sm:space-y-5">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {t('mission.description1')}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {t('mission.description2')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mx-auto max-w-6xl mt-12 sm:mt-16">
          <Card className="shadow-xl border-2">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b pb-6">
              <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                  <Heart className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl">{t('values.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="group text-center space-y-3 p-5 sm:p-6 rounded-xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                  <h4 className="font-bold text-base sm:text-lg text-primary">{t('values.integrity.title')}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {t('values.integrity.description')}
                  </p>
                </div>
                <div className="group text-center space-y-3 p-5 sm:p-6 rounded-xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                  <h4 className="font-bold text-base sm:text-lg text-primary">{t('values.innovation.title')}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {t('values.innovation.description')}
                  </p>
                </div>
                <div className="group text-center space-y-3 p-5 sm:p-6 rounded-xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                  <h4 className="font-bold text-base sm:text-lg text-primary">{t('values.community.title')}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {t('values.community.description')}
                  </p>
                </div>
                <div className="group text-center space-y-3 p-5 sm:p-6 rounded-xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                  <h4 className="font-bold text-base sm:text-lg text-primary">{t('values.excellence.title')}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {t('values.excellence.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
