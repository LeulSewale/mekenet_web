import type React from "react"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/error-boundary"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              name: "Mekenet SACCO LTD",
              description:
                "Innovative digital banking solutions, savings, and credit services to empower your financial growth and security.",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo.png`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Digital Avenue, Financial District",
                addressLocality: "Addis Ababa",
                addressCountry: "ET",
                postalCode: "1000",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+251-11-123-4567",
                contactType: "customer service",
                email: "info@mekenetsacco.et",
              },
              areaServed: {
                "@type": "Country",
                name: "Ethiopia",
              },
              serviceType: ["Savings Accounts", "Loans & Credit", "Mobile Banking", "Investment Plans"],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
              {children}
              <Toaster />
            </ThemeProvider>
          </NextIntlClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

