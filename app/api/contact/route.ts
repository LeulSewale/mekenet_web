import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import nodemailer from "nodemailer"

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

// Admin email recipient
const ADMIN_EMAIL = "bettysimachew11@gmail.com"

// Create nodemailer transporter
const createTransporter = () => {
  // If SMTP credentials are provided, use them
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  
  // For Gmail, you can use OAuth2 or App Password
  // For now, return null if no SMTP config
  return null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = contactSchema.parse(body)

    const { firstName, lastName, email, phone, subject, message } = validatedData
    const fullName = `${firstName} ${lastName}`

    // Escape HTML to prevent XSS attacks
    const escapeHtml = (text: string) => {
      const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      }
      return text.replace(/[&<>"']/g, (m) => map[m])
    }

    const safeFullName = escapeHtml(fullName)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    // Email to admin (bettysimachew11@gmail.com)
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #667eea; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 3px solid #667eea; }
            .message-box { background: white; padding: 15px; border-radius: 4px; border-left: 3px solid #764ba2; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
              <p>You have received a new message from the Mekenet SACCO website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${safeFullName}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${safeEmail}</div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${safePhone}</div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${safeSubject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${safeMessage}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Confirmation email to user
    const safeFirstName = escapeHtml(firstName)
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .message { background: white; padding: 20px; border-radius: 4px; border-left: 3px solid #667eea; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
              <p>Dear ${safeFirstName},</p>
              <div class="message">
                <p>We have received your message and will get back to you as soon as possible.</p>
                <p><strong>Your Message Details:</strong></p>
                <p><strong>Subject:</strong> ${safeSubject}</p>
                <p><strong>Message:</strong></p>
                <p>${safeMessage}</p>
              </div>
              <p>Our team typically responds within 24-48 hours. If your inquiry is urgent, please call us at <strong>0988103028</strong>.</p>
              <p>Best regards,<br><strong>Mekenet SACCO LTD</strong></p>
              <div class="footer">
                <p>Lem hotel marketing center 3rd floor office no 308</p>
                <p>P.O. Box 2761 | Phone: 0988103028</p>
                <p>Email: mekenet2015@gmail.com</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Send emails using nodemailer
    const transporter = createTransporter()
    
    if (transporter) {
      try {
        // Verify connection first
        await transporter.verify()
        console.log("SMTP connection verified successfully")

        // Send email to admin
        await transporter.sendMail({
          from: process.env.SMTP_USER || ADMIN_EMAIL,
          to: ADMIN_EMAIL,
          subject: `New Contact Form: ${safeSubject}`,
          html: adminEmailHtml,
          replyTo: email,
        })

        // Send confirmation email to user
        await transporter.sendMail({
          from: process.env.SMTP_USER || ADMIN_EMAIL,
          to: email,
          subject: `Thank you for contacting Mekenet SACCO`,
          html: userEmailHtml,
        })

        console.log("Emails sent successfully:", { to: ADMIN_EMAIL, user: email })
      } catch (emailError: any) {
        console.error("Error sending emails:", emailError)
        
        // Provide helpful error messages
        if (emailError.code === 'EAUTH') {
          console.error("\n❌ Gmail Authentication Failed!")
          console.error("Common causes:")
          console.error("1. App Password is incorrect or has spaces")
          console.error("2. 2-Step Verification is not enabled")
          console.error("3. App Password was not generated correctly")
          console.error("\n📝 How to fix:")
          console.error("1. Go to: https://myaccount.google.com/apppasswords")
          console.error("2. Make sure 2-Step Verification is enabled")
          console.error("3. Generate a new App Password for 'Mail'")
          console.error("4. Copy the 16-character password (remove spaces)")
          console.error("5. Update SMTP_PASS in .env.local")
          console.error("6. Restart your dev server\n")
        } else {
          console.error("Email error details:", {
            code: emailError.code,
            command: emailError.command,
            response: emailError.response,
          })
        }
        // Don't fail the request if email fails, just log it
      }
    } else {
      console.warn("SMTP not configured. Emails not sent.")
      console.log("Contact form submission (no email):", validatedData)
      console.log("To enable emails, configure SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local")
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    )
  }
}

