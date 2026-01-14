import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import * as nodemailer from "nodemailer"

admin.initializeApp()

// Configure your email service (example with Gmail)
const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password,
  },
})

// Store verification codes temporarily (use Firestore in production)
const verificationCodes = new Map<string, { code: string; expires: number }>()

export const sendVerificationCode = functions.https.onCall(async (data, context) => {
  const { email } = data

  if (!email) {
    throw new functions.https.HttpsError("invalid-argument", "Email is required")
  }

  // Generate 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expires = Date.now() + 10 * 60 * 1000 // 10 minutes

  // Store code
  verificationCodes.set(email, { code, expires })

  // Send email
  const mailOptions = {
    from: functions.config().email.user,
    to: email,
    subject: "AyurSutra - Email Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">AyurSutra Email Verification</h2>
        <p>Your verification code is:</p>
        <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
          ${code}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    throw new functions.https.HttpsError("internal", "Failed to send verification email")
  }
})

export const verifyEmailCode = functions.https.onCall(async (data, context) => {
  const { email, code } = data

  if (!email || !code) {
    throw new functions.https.HttpsError("invalid-argument", "Email and code are required")
  }

  const storedData = verificationCodes.get(email)

  if (!storedData) {
    throw new functions.https.HttpsError("not-found", "No verification code found for this email")
  }

  if (Date.now() > storedData.expires) {
    verificationCodes.delete(email)
    throw new functions.https.HttpsError("deadline-exceeded", "Verification code has expired")
  }

  if (storedData.code !== code) {
    throw new functions.https.HttpsError("invalid-argument", "Invalid verification code")
  }

  // Code is valid - clean up
  verificationCodes.delete(email)

  return { success: true }
})
