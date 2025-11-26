"use client"

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Target, Heart } from "lucide-react"

export function VisionMissionSection() {
  const t = useTranslations('visionMission')

  return (
    <section id="vision-mission" className="py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 bg-muted/50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              {t('title')}
            </h2>
            <p className="max-w-[900px] text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-8 sm:py-12 lg:grid-cols-2 lg:gap-8 xl:gap-12">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Eye className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl">{t('vision.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {t('vision.description1')}
              </p>
              <p className="text-muted-foreground">
                {t('vision.description2')}
              </p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Target className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl">{t('mission.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {t('mission.description1')}
              </p>
              <p className="text-muted-foreground">
                {t('mission.description2')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mx-auto max-w-5xl">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Heart className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl">{t('values.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="text-center space-y-2 p-4">
                  <h4 className="font-semibold text-sm sm:text-base">{t('values.integrity.title')}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {t('values.integrity.description')}
                  </p>
                </div>
                <div className="text-center space-y-2 p-4">
                  <h4 className="font-semibold text-sm sm:text-base">{t('values.innovation.title')}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {t('values.innovation.description')}
                  </p>
                </div>
                <div className="text-center space-y-2 p-4">
                  <h4 className="font-semibold text-sm sm:text-base">{t('values.community.title')}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {t('values.community.description')}
                  </p>
                </div>
                <div className="text-center space-y-2 p-4">
                  <h4 className="font-semibold text-sm sm:text-base">{t('values.excellence.title')}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
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
