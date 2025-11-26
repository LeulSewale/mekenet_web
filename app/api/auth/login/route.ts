import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { authenticateUser } from "@/lib/auth"
import { cookies } from 'next/headers'

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = loginSchema.parse(body)

    // Authenticate user
    const user = await authenticateUser(validatedData.email, validatedData.password)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password. Please try again.",
        },
        { status: 401 }
      )
    }

    // Set session cookie (in production, use secure, httpOnly cookies with proper session management)
    const cookieStore = await cookies()
    cookieStore.set('user_id', user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
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

    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your login. Please try again later.",
      },
      { status: 500 }
    )
  }
}

