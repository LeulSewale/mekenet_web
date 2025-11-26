"use client"

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Facebook, Twitter, Linkedin, Youtube, Mail, Music2, Send, Phone, MapPin } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t bg-gradient-to-br from-muted/50 to-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-primary/20 bg-primary/10 flex items-center justify-center">
                <Logo 
                  width={40} 
                  height={40} 
                  className="w-full h-full rounded-full"
                  iconClassName="w-6 h-6 sm:w-7 sm:h-7"
                />
              </div>
              <span className="font-bold text-lg sm:text-xl">Mekenet SACCO LTD</span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm">
              {t('description')}
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="https://www.facebook.com/profile.php?id=61559074432374" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                  title="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link 
                  href="https://x.com/mekenet5567?t=eAnuOt-vyS2-TpU1fuYcGw&s=09" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                  title="Twitter/X"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link 
                  href="https://www.linkedin.com/in/mekenet-saving-136719306" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                  title="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link 
                  href="https://www.youtube.com/@MekenetSaving" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                  title="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
                <Link 
                  href="https://www.tiktok.com/@mekenet56" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                  title="TikTok"
                >
                  <Music2 className="h-5 w-5" />
                  <span className="sr-only">TikTok</span>
                </Link>
                {/* <Link 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                  title="Telegram"
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Telegram</span>
                </Link> */}
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                  <a href="mailto:mekenet2015@gmail.com" className="hover:text-primary transition-colors break-all">
                    mekenet2015@gmail.com
                  </a>
                </div>
                <div className="text-xs text-muted-foreground/80">
                  Login: mekenet2015@gmail.com
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-base sm:text-lg font-bold">{t('quickLinks')}</h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link href="#home" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('home', { defaultValue: 'Home' })}
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('about', { defaultValue: 'About Us' })}
                </Link>
              </li>
              <li>
                <Link href="#vision-mission" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('visionMission', { defaultValue: 'Vision & Mission' })}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('contact', { defaultValue: 'Contact' })}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h4 className="text-base sm:text-lg font-bold">{t('services')}</h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('savingsAccounts')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('loansCredit')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('mobileBanking')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('investmentPlans')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h4 className="text-base sm:text-lg font-bold">{t('contactInfo')}</h4>
            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>{t('location')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span>{t('poBox')}: {t('poBoxNumber')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <a href={`tel:${t('phoneNumber')}`} className="hover:text-primary transition-colors">
                  {t('phoneNumber')}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <a href="mailto:mekenet2015@gmail.com" className="hover:text-primary transition-colors break-all">
                  mekenet2015@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 border-t pt-8 sm:pt-10 text-center">
          <p className="text-sm sm:text-base text-muted-foreground">{t('copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  )
}
