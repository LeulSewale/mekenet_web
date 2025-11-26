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
    <div className="container max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <FileCheck className="h-6 w-6" />
            <div>
              <CardTitle className="text-2xl sm:text-3xl">{t('title')}</CardTitle>
              <CardDescription className="mt-2">{t('subtitle')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Header Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">{t('sections.header')}</h3>
                
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
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 text-center">{t('sections.decision')}</h3>
                
                <div className="bg-muted p-4 rounded-lg space-y-4">
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
                      <FormItem className="space-y-3">
                        <FormLabel>{t('fields.decision')}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="approved" id="approved" />
                              <Label htmlFor="approved">{t('fields.decisionApproved')}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="rejected" id="rejected" />
                              <Label htmlFor="rejected">{t('fields.decisionRejected')}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="partial" id="partial" />
                              <Label htmlFor="partial">{t('fields.decisionPartial')}</Label>
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
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">{t('sections.committeeMembers')}</h3>
                
                <div className="grid gap-4">
                  {form.watch("committeeMembers").map((_, index) => (
                    <div key={index} className="grid gap-4 sm:grid-cols-2 border p-4 rounded-lg">
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

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isSubmitting}
                >
                  {t('form.reset')}
                </Button>
                <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
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

