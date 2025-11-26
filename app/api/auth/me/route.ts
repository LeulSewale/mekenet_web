import { NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers'
import { getUserById } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      )
    }

    const user = getUserById(parseInt(userId))

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
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
    console.error("Get user error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching user information.",
      },
      { status: 500 }
    )
  }
}

