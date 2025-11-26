"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2, FileText } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"

const loanApplicationSchema = z.object({
  accountNumber: z.string().min(1, "Account number is required"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender",
  }),
  regularJob: z.string().min(1, "Regular job is required"),
  monthlyIncome: z.string().min(1, "Monthly income is required"),
  estimatedAnnualIncome: z.string().min(1, "Estimated annual income is required"),
  addressZone: z.string().min(1, "Address zone is required"),
  woreda: z.string().min(1, "Woreda is required"),
  city: z.string().min(1, "City is required"),
  kebele: z.string().min(1, "Kebele is required"),
  houseNumber: z.string().optional(),
  workPhone: z.string().optional(),
  personalMobile: z.string().min(1, "Personal mobile number is required"),
  loanAmount: z.string().min(1, "Loan amount is required"),
  loanAmountInWords: z.string().min(1, "Loan amount in words is required"),
  loanMonth: z.string().min(1, "Loan month is required"),
  loanYear: z.string().min(1, "Loan year is required"),
  loanReason: z.string().min(10, "Loan reason must be at least 10 characters"),
  regularSavings: z.string().optional(),
  lotterySavings: z.string().optional(),
  totalSavings: z.string().optional(),
  otherDebts: z.string().optional(),
  existingLoanAmount: z.string().optional(),
  loanSource: z.string().optional(),
  lenderNameAddress: z.string().optional(),
  supportingDocuments: z.string().optional(),
  declaration: z.boolean().refine((val) => val === true, {
    message: "You must agree to the declaration",
  }),
  signature: z.string().min(1, "Signature is required"),
  signatureName: z.string().min(1, "Name is required"),
})

type LoanApplicationFormValues = z.infer<typeof loanApplicationSchema>

export function LoanApplicationForm() {
  const t = useTranslations('loanApplication')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<LoanApplicationFormValues>({
    resolver: zodResolver(loanApplicationSchema),
    defaultValues: {
      accountNumber: "",
      fullName: "",
      gender: undefined,
      regularJob: "",
      monthlyIncome: "",
      estimatedAnnualIncome: "",
      addressZone: "",
      woreda: "",
      city: "",
      kebele: "",
      houseNumber: "",
      workPhone: "",
      personalMobile: "",
      loanAmount: "",
      loanAmountInWords: "",
      loanMonth: "",
      loanYear: "",
      loanReason: "",
      regularSavings: "",
      lotterySavings: "",
      totalSavings: "",
      otherDebts: "",
      existingLoanAmount: "",
      loanSource: "",
      lenderNameAddress: "",
      supportingDocuments: "",
      declaration: false,
      signature: "",
      signatureName: "",
    },
  })

  async function onSubmit(data: LoanApplicationFormValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/loan-application", {
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
          description: result.message || t('form.errorDescription'),
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
    <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <Card className="shadow-xl border-2">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b pb-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <FileText className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl">{t('title')}</CardTitle>
              <CardDescription className="mt-2 text-sm sm:text-base">{t('subtitle')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 lg:p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 sm:space-y-10">
              {/* Applicant Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-3 border-b-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  <h3 className="text-xl sm:text-2xl font-bold">{t('sections.applicantInfo')}</h3>
                </div>
                
                <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.accountNumber')}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t('fields.accountNumber')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.fullName')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-base font-semibold">{t('fields.gender')}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary/50 transition-all cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                            <RadioGroupItem value="male" id="male" className="mt-0" />
                            <Label htmlFor="male" className="cursor-pointer font-medium flex-1">{t('fields.genderMale')}</Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary/50 transition-all cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                            <RadioGroupItem value="female" id="female" className="mt-0" />
                            <Label htmlFor="female" className="cursor-pointer font-medium flex-1">{t('fields.genderFemale')}</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="regularJob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.regularJob')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="monthlyIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.monthlyIncome')}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="estimatedAnnualIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('fields.estimatedAnnualIncome')}</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="addressZone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.addressZone')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="woreda"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.woreda')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.city')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="kebele"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.kebele')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="houseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.houseNumber')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.workPhone')}</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personalMobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.personalMobile')}</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Loan Request Details Section */}
              <div className="space-y-6 pt-6 border-t">
                <div className="flex items-center space-x-3 pb-3 border-b-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  <h3 className="text-xl sm:text-2xl font-bold">{t('sections.loanRequest')}</h3>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="loanAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.loanAmount')}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>{t('fields.loanAmountInNumbers')}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loanAmountInWords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.loanAmountInWords')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="loanMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.loanMonth')}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="MM" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loanYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.loanYear')}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="YYYY" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="loanReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('fields.loanReason')}</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Financial Standing Section */}
              <div className="space-y-6 pt-6 border-t">
                <div className="flex items-center space-x-3 pb-3 border-b-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  <h3 className="text-xl sm:text-2xl font-bold">{t('sections.financialStanding')}</h3>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="regularSavings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.regularSavings')}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lotterySavings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.lotterySavings')}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalSavings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.totalSavings')}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="otherDebts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('fields.otherDebts')}</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[80px]" {...field} />
                      </FormControl>
                      <FormDescription>{t('fields.otherDebtsDescription')}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="existingLoanAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.existingLoanAmount')}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loanSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.loanSource')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="lenderNameAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('fields.lenderNameAddress')}</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[80px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supportingDocuments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('fields.supportingDocuments')}</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[80px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Declaration Section */}
              <div className="space-y-6 pt-6 border-t">
                <div className="flex items-center space-x-3 pb-3 border-b-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  <h3 className="text-xl sm:text-2xl font-bold">{t('sections.declaration')}</h3>
                </div>
                
                <div className="bg-gradient-to-br from-muted/50 to-muted p-5 sm:p-6 rounded-xl border border-primary/10">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {t('declarationText')}
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="declaration"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-xl border-2 p-5 sm:p-6 bg-gradient-to-br from-muted/30 to-muted/50 hover:border-primary/30 transition-all">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 h-5 w-5"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-relaxed flex-1">
                        <FormLabel className="cursor-pointer font-normal text-sm sm:text-base">
                          {t('fields.declarationAgree')}
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="signature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.signature')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="signatureName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.signatureName')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto h-11 sm:h-12 text-base"
                >
                  {t('form.reset')}
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full sm:w-auto min-w-[160px] h-11 sm:h-12 text-base shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('form.submitting')}
                    </>
                  ) : (
                    t('form.submit')
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

