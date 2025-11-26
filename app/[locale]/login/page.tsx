"use client"

import { Header } from "@/components/header"
import { LoginForm } from "@/components/login-form"
import { RegistrationForm } from "@/components/registration-form"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from 'next-intl'

export default function LoginPage() {
  const t = useTranslations('auth')
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12 sm:h-14">
            <TabsTrigger value="login" className="text-base sm:text-lg font-semibold">
              {t('login.title')}
            </TabsTrigger>
            <TabsTrigger value="register" className="text-base sm:text-lg font-semibold">
              {t('register.title')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-6">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register" className="mt-6">
            <RegistrationForm />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}

