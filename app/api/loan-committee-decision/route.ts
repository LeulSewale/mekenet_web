import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const loanCommitteeDecisionSchema = z.object({
  documentNumber: z.string().min(1),
  date: z.string().min(1),
  to: z.string().min(1),
  committeeMeetingDate: z.string().min(1),
  committeeMeetingYear: z.string().min(1),
  committeeMember: z.string().min(1),
  meetingLocation: z.string().min(1),
  loanAmountInNumbers: z.string().min(1),
  loanAmountInFederal: z.string().optional(),
  approvedAmountInNumbers: z.string().min(1),
  approvedAmountInFederal: z.string().optional(),
  decision: z.enum(["approved", "rejected", "partial"]),
  rejectionReason: z.string().optional(),
  committeeMembers: z.array(z.object({
    name: z.string().min(1),
    signature: z.string().min(1),
  })).min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = loanCommitteeDecisionSchema.parse(body)

    // TODO: Here you would typically:
    // 1. Save to database
    // 2. Link to the original loan application
    // 3. Send notification to applicant
    // 4. Generate PDF of the decision
    // 5. Update loan application status
    
    // For now, we'll just log and return success
    console.log("Loan committee decision submission:", {
      documentNumber: validatedData.documentNumber,
      decision: validatedData.decision,
      approvedAmount: validatedData.approvedAmountInNumbers,
      // Don't log sensitive data in production
    })

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(
      {
        success: true,
        message: "Loan committee decision has been recorded successfully.",
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

    console.error("Loan committee decision error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing the decision. Please try again later.",
      },
      { status: 500 }
    )
  }
}

