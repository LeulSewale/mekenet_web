import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createUser } from "@/lib/auth"

const registrationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number").optional(),
  accountNumber: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = registrationSchema.parse(body)

    // Create user
    const user = createUser(validatedData)

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful. You can now login.",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
      },
      { status: 201 }
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

    // Handle duplicate user error
    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 409 }
      )
    }

    console.error("Registration error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your registration. Please try again later.",
      },
      { status: 500 }
    )
  }
}

