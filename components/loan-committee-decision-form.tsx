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
import { Label } from "@/components/ui/label"
import { Loader2, FileCheck } from "lucide-react"
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

const loanCommitteeDecisionSchema = z.object({
  documentNumber: z.string().min(1, "Document number is required"),
  date: z.string().min(1, "Date is required"),
  to: z.string().min(1, "Recipient is required"),
  committeeMeetingDate: z.string().min(1, "Committee meeting date is required"),
  committeeMeetingYear: z.string().min(1, "Committee meeting year is required"),
  committeeMember: z.string().min(1, "Committee member name is required"),
  meetingLocation: z.string().min(1, "Meeting location is required"),
  loanAmountInNumbers: z.string().min(1, "Loan amount in numbers is required"),
  loanAmountInFederal: z.string().optional(),
  approvedAmountInNumbers: z.string().min(1, "Approved amount in numbers is required"),
  approvedAmountInFederal: z.string().optional(),
  decision: z.enum(["approved", "rejected", "partial"], {
    required_error: "Please select a decision",
  }),
  rejectionReason: z.string().optional(),
  committeeMembers: z.array(z.object({
    name: z.string().min(1, "Member name is required"),
    signature: z.string().min(1, "Signature is required"),
  })).min(1, "At least one committee member is required"),
})

type LoanCommitteeDecisionFormValues = z.infer<typeof loanCommitteeDecisionSchema>

export function LoanCommitteeDecisionForm() {
  const t = useTranslations('loanCommitteeDecision')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<LoanCommitteeDecisionFormValues>({
    resolver: zodResolver(loanCommitteeDecisionSchema),
    defaultValues: {
      documentNumber: "",
      date: "",
      to: "",
      committeeMeetingDate: "",
      committeeMeetingYear: "",
      committeeMember: "",
      meetingLocation: "",
      loanAmountInNumbers: "",
      loanAmountInFederal: "",
      approvedAmountInNumbers: "",
      approvedAmountInFederal: "",
      decision: undefined,
      rejectionReason: "",
      committeeMembers: [
        { name: "", signature: "" },
        { name: "", signature: "" },
        { name: "", signature: "" },
      ],
    },
  })

  const decision = form.watch("decision")

  async function onSubmit(data: LoanCommitteeDecisionFormValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/loan-committee-decision", {
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
              <FileCheck className="h-6 w-6 sm:h-7 sm:w-7" />
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
              {/* Header Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-3 border-b-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  <h3 className="text-xl sm:text-2xl font-bold">{t('sections.header')}</h3>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex justify-end space-x-4">
                    <FormField
                      control={form.control}
                      name="documentNumber"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>{t('fields.documentNumber')}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>{t('fields.date')}</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="to"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.to')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Decision Details Section */}
              <div className="space-y-6 pt-6 border-t">
                <div className="flex items-center justify-center space-x-3 pb-3 border-b-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  <h3 className="text-xl sm:text-2xl font-bold">{t('sections.decision')}</h3>
                </div>
                
                <div className="bg-gradient-to-br from-muted/50 to-muted p-5 sm:p-6 lg:p-8 rounded-xl border border-primary/10 space-y-6">
                  <p className="text-sm text-muted-foreground">
                    {t('decisionText.part1')}
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="committeeMeetingDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fields.committeeMeetingDate')}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="DD/MM" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="committeeMeetingYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fields.committeeMeetingYear')}</FormLabel>
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
                    name="committeeMember"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.committeeMember')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meetingLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.meetingLocation')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="loanAmountInNumbers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fields.loanAmountInNumbers')}</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormDescription>{t('fields.inBirr')}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="loanAmountInFederal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fields.loanAmountInFederal')}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>{t('fields.inFederalBirr')}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="approvedAmountInNumbers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fields.approvedAmountInNumbers')}</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormDescription>{t('fields.inBirr')}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="approvedAmountInFederal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fields.approvedAmountInFederal')}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>{t('fields.inFederalBirr')}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="decision"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-base font-semibold">{t('fields.decision')}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                          >
                            <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-green-500/50 transition-all cursor-pointer has-[:checked]:border-green-500 has-[:checked]:bg-green-500/5">
                              <RadioGroupItem value="approved" id="approved" className="mt-0" />
                              <Label htmlFor="approved" className="cursor-pointer font-medium flex-1 text-green-700 dark:text-green-400">{t('fields.decisionApproved')}</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-red-500/50 transition-all cursor-pointer has-[:checked]:border-red-500 has-[:checked]:bg-red-500/5">
                              <RadioGroupItem value="rejected" id="rejected" className="mt-0" />
                              <Label htmlFor="rejected" className="cursor-pointer font-medium flex-1 text-red-700 dark:text-red-400">{t('fields.decisionRejected')}</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-yellow-500/50 transition-all cursor-pointer has-[:checked]:border-yellow-500 has-[:checked]:bg-yellow-500/5">
                              <RadioGroupItem value="partial" id="partial" className="mt-0" />
                              <Label htmlFor="partial" className="cursor-pointer font-medium flex-1 text-yellow-700 dark:text-yellow-400">{t('fields.decisionPartial')}</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(decision === "rejected" || decision === "partial") && (
                    <FormField
                      control={form.control}
                      name="rejectionReason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fields.rejectionReason')}</FormLabel>
                          <FormControl>
                            <Textarea className="min-h-[100px]" {...field} />
                          </FormControl>
                          <FormDescription>{t('fields.rejectionReasonDescription')}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <p className="text-sm text-muted-foreground mt-4">
                    {t('decisionText.part2')}
                  </p>
                </div>
              </div>

              {/* Committee Members Section */}
              <div className="space-y-6 pt-6 border-t">
                <div className="flex items-center space-x-3 pb-3 border-b-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  <h3 className="text-xl sm:text-2xl font-bold">{t('sections.committeeMembers')}</h3>
                </div>
                
                <div className="grid gap-4 sm:gap-6">
                  {form.watch("committeeMembers").map((_, index) => (
                    <div key={index} className="grid gap-4 sm:grid-cols-2 border-2 p-5 sm:p-6 rounded-xl bg-card hover:shadow-md transition-shadow">
                      <FormField
                        control={form.control}
                        name={`committeeMembers.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t('fields.memberName')} {index + 1}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`committeeMembers.${index}.signature`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t('fields.signature')} {index + 1}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
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

