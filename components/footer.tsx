"use client"

import Image from "next/image"
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.jpg"
                alt="Mekenet SACCO LTD Logo"
                width={28}
                height={28}
                className="sm:w-8 sm:h-8 rounded-full"
              />
              <span className="font-bold text-base sm:text-lg">Mekenet SACCO LTD</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t('description')}
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm sm:text-base font-semibold">{t('quickLinks')}</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="#home" className="text-muted-foreground hover:text-primary">
                  {t('home', { defaultValue: 'Home' })}
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary">
                  {t('about', { defaultValue: 'About Us' })}
                </Link>
              </li>
              <li>
                <Link href="#vision-mission" className="text-muted-foreground hover:text-primary">
                  {t('visionMission', { defaultValue: 'Vision & Mission' })}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary">
                  {t('contact', { defaultValue: 'Contact' })}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm sm:text-base font-semibold">{t('services')}</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  {t('savingsAccounts')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  {t('loansCredit')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  {t('mobileBanking')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  {t('investmentPlans')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm sm:text-base font-semibold">{t('contactInfo')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Digital Avenue</li>
              <li>Addis Ababa, Ethiopia</li>
              <li>+251 11 123 4567</li>
              <li>info@mekenetsacco.et</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  )
}
