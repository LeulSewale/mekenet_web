"use client"

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button } from "@/components/ui/button"
import { Menu, Info, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Logo } from "@/components/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"

export function Header() {
  const t = useTranslations('header')
  const tIntro = useTranslations('introduction')

  const navItems = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.visionMission'), href: "#vision-mission" },
    { name: t('nav.contact'), href: "#contact" },
    { name: t('nav.loanApplication'), href: "/loan-application" },
    { name: t('nav.login'), href: "/login" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-16 sm:h-18 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group transition-transform hover:scale-105">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all bg-primary/10 flex items-center justify-center">
            <Logo 
              width={40} 
              height={40} 
              className="w-full h-full rounded-full"
              iconClassName="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg md:text-xl hidden xs:block leading-tight">{t('title')}</span>
            <span className="font-bold text-sm xs:hidden leading-tight">{t('shortTitle')}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground rounded-md hover:bg-accent group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground rounded-md hover:bg-accent group">
                <Info className="h-4 w-4 mr-1" />
                {t('nav.information')}
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[600px] p-0">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 max-h-[500px] overflow-y-auto">
                  <h3 className="text-lg font-bold mb-4">{tIntro('title')}</h3>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                      <p>{tIntro('content.paragraph1')}</p>
                      <p>{tIntro('content.paragraph2')}</p>
                      <p>{tIntro('content.paragraph3')}</p>
                      <p>{tIntro('content.paragraph4')}</p>
                    </div>
                  </div>
                  <Link href="#introduction" className="mt-4 inline-block text-sm text-primary hover:underline">
                    {t('nav.readMore')}
                  </Link>
                </CardContent>
              </Card>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="ml-2 pl-2 border-l">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Tablet Navigation */}
        <nav className="hidden md:flex lg:hidden items-center space-x-4">
          {navItems.slice(0, 3).map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[300px]">
              <SheetTitle className="sr-only">{t('title')} - {t('nav.home')}</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation menu for {t('title')}
              </SheetDescription>
              <div className="flex flex-col space-y-1 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 text-base font-medium transition-colors hover:text-primary hover:bg-accent rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="#introduction"
                  className="px-4 py-3 text-base font-medium transition-colors hover:text-primary hover:bg-accent rounded-lg flex items-center gap-2"
                >
                  <Info className="h-4 w-4" />
                  {t('nav.information')}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
