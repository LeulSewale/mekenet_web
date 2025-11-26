"use client"

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Globe } from "lucide-react"

const languages = [
  { code: 'en', name: 'English' },
  { code: 'am', name: 'አማርኛ' },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
      <Select value={locale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[110px] sm:w-[130px] h-9 sm:h-10 border-2 hover:border-primary/50 transition-colors">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code} className="cursor-pointer">
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

