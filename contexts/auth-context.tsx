"use client"

import type React from "react"
import { httpsCallable } from "firebase/functions"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { auth, googleProvider, isFirebaseEnabled, functions } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string, userType?: "patient" | "therapist") => Promise<void>
  signUpWithEmail: (
    email: string,
    password: string,
    userType?: "patient" | "therapist",
  ) => Promise<{ needsVerification: boolean }>
  verifyEmailWithCode: (email: string, code: string) => Promise<void>
  sendVerificationCode: (email: string) => Promise<void>
  logout: () => Promise<void>
  isDemoMode: boolean
  userType: "patient" | "therapist" | null
  firebaseConfigStatus: "configured" | "missing" | "error"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo user for testing without Firebase
const demoUser = {
  uid: "demo-user-123",
  displayName: "Demo User",
  email: "demo@ayursutra.com",
  photoURL: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  emailVerified: true,
  getIdToken: async () => "demo-token",
} as User

const demoVerificationCodes = new Map<string, string>()

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDemoMode] = useState(!isFirebaseEnabled)
  const [userType, setUserType] = useState<"patient" | "therapist" | null>(null)
  const [firebaseConfigStatus, setFirebaseConfigStatus] = useState<"configured" | "missing" | "error">("missing")

  useEffect(() => {
    if (isFirebaseEnabled && auth) {
      setFirebaseConfigStatus("configured")
      console.log("✅ Firebase is properly configured")
    } else {
      setFirebaseConfigStatus("missing")
      console.warn("⚠️ Firebase not configured - running in demo mode")
      console.log("📧 In demo mode, verification codes are logged to console")
    }

    if (isFirebaseEnabled && auth) {
      // Real Firebase authentication
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user && (user.emailVerified || user.providerData.some((p) => p.providerId === "google.com"))) {
          setUser(user)
          const token = await user.getIdToken()
          document.cookie = `firebase-auth-token=${token}; path=/; max-age=3600; secure; samesite=strict`
        } else if (user && !user.emailVerified) {
          // User exists but email not verified - don't set as authenticated
          setUser(null)
          document.cookie = "firebase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        } else {
          setUser(null)
          document.cookie = "firebase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
        setLoading(false)
      })

      return unsubscribe
    } else {
      // Demo mode - check localStorage for demo user
      const demoUserData = localStorage.getItem("demo-user")
      if (demoUserData) {
        const userData = JSON.parse(demoUserData)
        setUser({
          ...demoUser,
          email: userData.email || demoUser.email,
          displayName: userData.displayName || demoUser.displayName,
        })
        setUserType(userData.userType || null)
        document.cookie = "firebase-auth-token=demo-token; path=/; max-age=3600"
      }
      setLoading(false)
    }
  }, [])

  const signInWithGoogle = async () => {
    if (isFirebaseEnabled && auth && googleProvider) {
      // Real Firebase Google sign-in
      try {
        await signInWithPopup(auth, googleProvider)
      } catch (error) {
        console.error("Error signing in with Google:", error)
        throw error
      }
    } else {
      // Demo mode sign-in
      const userData = { email: "demo@ayursutra.com", displayName: "Demo User (Google)" }
      localStorage.setItem("demo-user", JSON.stringify(userData))
      setUser({
        ...demoUser,
        ...userData,
      })
      document.cookie = "firebase-auth-token=demo-token; path=/; max-age=3600"
    }
  }

  const signInWithEmail = async (email: string, password: string, userType: "patient" | "therapist" = "patient") => {
    if (isFirebaseEnabled && auth) {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        if (!result.user.emailVerified) {
          await signOut(auth)
          throw new Error("Please verify your email before signing in. Check your inbox for the verification code.")
        }
        setUserType(userType)
        localStorage.setItem("user-type", userType)
      } catch (error) {
        console.error("Error signing in with email:", error)
        throw error
      }
    } else {
      // Demo mode - simulate email sign-in
      const userData = {
        email: email,
        displayName: email.split("@")[0],
        verified: true,
        userType: userType,
      }
      localStorage.setItem("demo-user", JSON.stringify(userData))
      localStorage.setItem("user-type", userType)
      setUserType(userType)
      setUser({
        ...demoUser,
        email: email,
        displayName: email.split("@")[0],
      })
      document.cookie = "firebase-auth-token=demo-token; path=/; max-age=3600"
    }
  }

  const signUpWithEmail = async (email: string, password: string, userType: "patient" | "therapist" = "patient") => {
    if (isFirebaseEnabled && auth) {
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        await sendVerificationCode(email)
        await signOut(auth) // Sign out until email is verified
        return { needsVerification: true }
      } catch (error) {
        console.error("Error signing up with email:", error)
        throw error
      }
    } else {
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      demoVerificationCodes.set(email, code)

      console.log("🔐 DEMO MODE - New Verification Code")
      console.log("📧 Email:", email)
      console.log("🔢 Code:", code)
      console.log("⚠️ Check the browser console for your verification code")

      // Store user data temporarily until verification
      localStorage.setItem("pending-verification", JSON.stringify({ email, userType }))

      return { needsVerification: true }
    }
  }

  const sendVerificationCode = async (email: string) => {
    if (isFirebaseEnabled && functions) {
      try {
        const sendCode = httpsCallable(functions, "sendVerificationCode")
        await sendCode({ email })
        console.log("📧 Verification code sent to:", email)
      } catch (error) {
        console.error("Error sending verification code:", error)
        // Fallback to demo mode if cloud function fails
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        demoVerificationCodes.set(email, code)
        console.log("🔐 FALLBACK - Verification Code:", code)
        console.log("📧 Email:", email)
      }
    } else {
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      demoVerificationCodes.set(email, code)

      console.log("🔐 DEMO MODE - Verification Code")
      console.log("📧 Email:", email)
      console.log("🔢 Code:", code)
      console.log("⚠️ This is demo mode. In production, this code would be sent via email.")
    }
  }

  const verifyEmailWithCode = async (email: string, code: string) => {
    if (isFirebaseEnabled && functions) {
      try {
        const verifyCode = httpsCallable(functions, "verifyEmailCode")
        const result = await verifyCode({ email, code })

        if (result.data.success) {
          // Sign in the user after successful verification
          const pendingData = localStorage.getItem("pending-verification")
          if (pendingData) {
            const { userType } = JSON.parse(pendingData)
            setUserType(userType)
            localStorage.setItem("user-type", userType)
            localStorage.removeItem("pending-verification")
          }
          console.log("✅ Email verified successfully!")
        } else {
          throw new Error("Invalid verification code")
        }
      } catch (error) {
        console.error("Error verifying code:", error)
        throw new Error("Invalid verification code. Please try again.")
      }
    } else {
      // Demo mode - check verification code
      const storedCode = demoVerificationCodes.get(email)
      if (!storedCode || storedCode !== code) {
        throw new Error("Invalid verification code. Please check the console for the correct code.")
      }

      const pendingData = localStorage.getItem("pending-verification")
      let finalUserType = "patient"

      if (pendingData) {
        const { userType: pendingUserType } = JSON.parse(pendingData)
        finalUserType = pendingUserType || "patient"
        localStorage.removeItem("pending-verification")
      }

      // Code is valid - mark as verified and sign in
      demoVerificationCodes.delete(email)
      const userData = {
        email: email,
        displayName: email.split("@")[0],
        verified: true,
        userType: finalUserType,
      }

      localStorage.setItem("demo-user", JSON.stringify(userData))
      localStorage.setItem("user-type", finalUserType)
      setUserType(finalUserType)
      setUser({
        ...demoUser,
        email: email,
        displayName: email.split("@")[0],
      })
      document.cookie = "firebase-auth-token=demo-token; path=/; max-age=3600"

      console.log("✅ Email verified successfully!")
    }
  }

  const logout = async () => {
    if (isFirebaseEnabled && auth) {
      // Real Firebase logout
      try {
        await signOut(auth)
      } catch (error) {
        console.error("Error signing out:", error)
        throw error
      }
    } else {
      localStorage.removeItem("demo-user")
      localStorage.removeItem("user-type")
      setUser(null)
      setUserType(null)
      document.cookie = "firebase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    verifyEmailWithCode,
    sendVerificationCode,
    logout,
    isDemoMode,
    userType,
    firebaseConfigStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
