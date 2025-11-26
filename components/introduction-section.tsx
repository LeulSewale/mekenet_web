"use client"

import { useTranslations } from 'next-intl'
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Scale, FileText } from "lucide-react"

export function IntroductionSection() {
  const t = useTranslations('introduction')

  return (
    <section id="introduction" className="relative py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
      
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

        <div className="mx-auto max-w-6xl space-y-8 sm:space-y-10">
          {/* Main Content Card */}
          <Card className="shadow-xl border-2">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert">
                <div className="space-y-6 sm:space-y-8 text-muted-foreground leading-relaxed">
                  <p className="text-base sm:text-lg leading-relaxed">
                    {t('content.paragraph1')}
                  </p>
                  
                  <p className="text-base sm:text-lg leading-relaxed">
                    {t('content.paragraph2')}
                  </p>
                  
                  <p className="text-base sm:text-lg leading-relaxed">
                    {t('content.paragraph3')}
                  </p>
                  
                  <p className="text-base sm:text-lg leading-relaxed">
                    {t('content.paragraph4')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Points Grid */}
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 border-2">
              <CardContent className="p-6 sm:p-8 text-center space-y-4">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform mx-auto">
                  <Users className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">{t('keyPoints.cooperation.title')}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t('keyPoints.cooperation.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 border-2">
              <CardContent className="p-6 sm:p-8 text-center space-y-4">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform mx-auto">
                  <Scale className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">{t('keyPoints.legal.title')}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t('keyPoints.legal.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 border-2">
              <CardContent className="p-6 sm:p-8 text-center space-y-4">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform mx-auto">
                  <BookOpen className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">{t('keyPoints.savings.title')}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t('keyPoints.savings.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 border-2">
              <CardContent className="p-6 sm:p-8 text-center space-y-4">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform mx-auto">
                  <FileText className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">{t('keyPoints.governance.title')}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t('keyPoints.governance.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

