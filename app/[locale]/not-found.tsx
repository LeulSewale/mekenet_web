import { useTranslations } from 'next-intl'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Link } from '@/i18n/routing'
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-6xl sm:text-8xl font-bold text-primary">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/">
            <Button size="lg" className="mt-4">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

