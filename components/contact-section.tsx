"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Loader2, ExternalLink } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
  const t = useTranslations('contact')
  
  // Note: Zod validation messages are static, but form labels and placeholders are translated
  const contactFormSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  })

  type ContactFormValues = z.infer<typeof contactFormSchema>
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast({
          title: t('form.success'),
          description: t('form.successDescription'),
        })
        form.reset()
      } else {
        toast({
          title: t('form.error'),
          description: t('form.errorDescription'),
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: t('form.error'),
        description: t('form.errorDescription'),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 overflow-hidden">
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

        <div className="mx-auto grid max-w-6xl items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-2">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                <CardTitle className="flex items-center space-x-3 text-lg sm:text-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span>{t('address.title')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed text-sm sm:text-base mb-4">
                  {t('address.content')}
                </p>
                
                {/* Embedded Map */}
                <div className="mb-4 rounded-lg overflow-hidden border-2 border-muted shadow-md bg-muted/50 relative group">
                  <iframe
                    src="https://www.google.com/maps?q=Lem+Hotel+Marketing+Center,+3rd+Floor,+Office+No.+308,+Addis+Ababa&output=embed"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                    title={t('address.mapTitle')}
                  />
                  {/* Floating button to open full map - positioned to not block map interaction */}
                  <a
                    href="https://maps.app.goo.gl/ec5meAEdVE3Pq4Lt6?g_st=atm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground px-3 py-1.5 rounded-md shadow-lg hover:shadow-xl hover:bg-primary/90 flex items-center gap-1.5 text-xs sm:text-sm font-medium"
                    aria-label={t('address.openFullMap')}
                  >
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{t('address.openFullMap')}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <a
                    href="https://maps.app.goo.gl/ec5meAEdVE3Pq4Lt6?g_st=atm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    {t('address.viewOnMap')}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Card className="shadow-lg hover:shadow-xl transition-shadow border-2">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                  <CardTitle className="flex items-center space-x-3 text-base sm:text-lg">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span>{t('phone.title')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 sm:p-6">
                  <p className="text-muted-foreground text-sm sm:text-base">+251 11 123 4567</p>
                  <p className="text-muted-foreground text-sm sm:text-base">+251 11 987 6543</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow border-2">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                  <CardTitle className="flex items-center space-x-3 text-base sm:text-lg">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span>{t('email.title')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 sm:p-6">
                  <p className="text-muted-foreground text-sm sm:text-base">info@mekenetsacco.et</p>
                  <p className="text-muted-foreground text-sm sm:text-base">support@mekenetsacco.et</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg hover:shadow-xl transition-shadow border-2">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                <CardTitle className="flex items-center space-x-3 text-lg sm:text-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Clock className="h-5 w-5" />
                  </div>
                  <span>{t('hours.title')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 text-muted-foreground text-sm sm:text-base">
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    {t('hours.weekday')}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    {t('hours.saturday')}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    {t('hours.sunday')}
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-primary mt-4 pt-4 border-t">
                    {t('hours.online')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-xl border-2">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b pb-6">
              <CardTitle className="text-xl sm:text-2xl">{t('form.title')}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('form.firstName')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('form.firstNamePlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('form.lastName')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('form.lastNamePlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.email')}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t('form.emailPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.phone')}</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder={t('form.phonePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.subject')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('form.subjectPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.message')}</FormLabel>
                        <FormControl>
                          <Textarea placeholder={t('form.messagePlaceholder')} className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-11 sm:h-12 text-base shadow-lg hover:shadow-xl transition-all" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('form.sending')}
                      </>
                    ) : (
                      t('form.sendMessage')
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
