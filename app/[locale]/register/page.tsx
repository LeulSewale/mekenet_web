"use client"

import { Header } from "@/components/header"
import { RegistrationForm } from "@/components/registration-form"
import { Footer } from "@/components/footer"
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const t = useTranslations('auth')
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="mb-6">
          <Link href="/login">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('register.backToLogin')}
            </Button>
          </Link>
        </div>
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  )
}

