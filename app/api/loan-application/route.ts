import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const loanApplicationSchema = z.object({
  accountNumber: z.string().min(1),
  fullName: z.string().min(2),
  gender: z.enum(["male", "female"]),
  regularJob: z.string().min(1),
  monthlyIncome: z.string().min(1),
  estimatedAnnualIncome: z.string().min(1),
  addressZone: z.string().min(1),
  woreda: z.string().min(1),
  city: z.string().min(1),
  kebele: z.string().min(1),
  houseNumber: z.string().optional(),
  workPhone: z.string().optional(),
  personalMobile: z.string().min(1),
  loanAmount: z.string().min(1),
  loanAmountInWords: z.string().min(1),
  loanMonth: z.string().min(1),
  loanYear: z.string().min(1),
  loanReason: z.string().min(10),
  regularSavings: z.string().optional(),
  lotterySavings: z.string().optional(),
  totalSavings: z.string().optional(),
  otherDebts: z.string().optional(),
  existingLoanAmount: z.string().optional(),
  loanSource: z.string().optional(),
  lenderNameAddress: z.string().optional(),
  supportingDocuments: z.string().optional(),
  declaration: z.boolean().refine((val) => val === true),
  signature: z.string().min(1),
  signatureName: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = loanApplicationSchema.parse(body)

    // TODO: Here you would typically:
    // 1. Save to database
    // 2. Send email notification to loan officers
    // 3. Generate PDF of the application
    // 4. Integrate with loan management system
    
    // For now, we'll just log and return success
    console.log("Loan application submission:", {
      accountNumber: validatedData.accountNumber,
      fullName: validatedData.fullName,
      loanAmount: validatedData.loanAmount,
      // Don't log sensitive data in production
    })

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(
      {
        success: true,
        message: "Loan application submitted successfully. We will review it and contact you soon.",
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please check all required fields.",
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    console.error("Loan application error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your application. Please try again later.",
      },
      { status: 500 }
    )
  }
}

