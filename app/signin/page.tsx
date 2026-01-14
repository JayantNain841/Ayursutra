"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import {
  Leaf,
  Chrome,
  ArrowLeft,
  Info,
  Mail,
  Lock,
  User,
  CheckCircle,
  Eye,
  EyeOff,
  Stethoscope,
  Heart,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<"patient" | "therapist">("patient")
  const [showVerificationForm, setShowVerificationForm] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationEmail, setVerificationEmail] = useState("")

  const { signInWithGoogle, signInWithEmail, signUpWithEmail, verifyEmailWithCode, sendVerificationCode } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
      toast({
        title: "Welcome to AyurSutra!",
        description: "You have successfully signed in.",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "There was an error signing you in. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setLoading(true)
    try {
      await signInWithEmail(email, password, userType)
      toast({
        title: "Welcome back!",
        description: `You have successfully signed in as a ${userType}.`,
      })
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || !confirmPassword) return

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const result = await signUpWithEmail(email, password, userType)
      if (result.needsVerification) {
        setVerificationEmail(email)
        setShowVerificationForm(true)
        toast({
          title: "Account created!",
          description: `Please check your email for a verification code to complete your ${userType} registration.`,
        })
      }
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!verificationCode) return

    setLoading(true)
    try {
      await verifyEmailWithCode(verificationEmail, verificationCode)
      toast({
        title: "Email verified!",
        description: "Your account has been verified. You can now sign in.",
      })
      setShowVerificationForm(false)
      setVerificationCode("")
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message || "Invalid verification code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    setLoading(true)
    try {
      await sendVerificationCode(verificationEmail)
      toast({
        title: "Verification code sent",
        description: "A new verification code has been sent to your email.",
      })
    } catch (error: any) {
      toast({
        title: "Failed to send code",
        description: error.message || "There was an error sending the verification code.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (showVerificationForm) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />

        <div className="relative w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <Card className="border-2">
            <CardHeader className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Leaf className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground">AyurSutra</span>
              </div>
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-2xl">Enter verification code</CardTitle>
              <CardDescription className="text-base">
                We've sent a 6-digit code to <strong>{verificationEmail}</strong>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Alert className="border-primary/20 bg-primary/5">
                <Mail className="h-4 w-4" />
                <AlertDescription>Enter the 6-digit code from your email to verify your account.</AlertDescription>
              </Alert>

              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verification-code">Verification Code</Label>
                  <Input
                    id="verification-code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="text-center text-2xl tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
                <Button type="submit" disabled={loading || verificationCode.length !== 6} className="w-full">
                  {loading ? "Verifying..." : "Verify Account"}
                </Button>
              </form>

              <div className="space-y-4">
                <Button
                  onClick={handleResendCode}
                  disabled={loading}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  {loading ? "Sending..." : "Resend verification code"}
                </Button>

                <Button onClick={() => setShowVerificationForm(false)} variant="ghost" className="w-full">
                  Back to sign up
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />

      <div className="relative w-full max-w-md">
        {/* Back to home link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <Card className="border-2">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">AyurSutra</span>
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription className="text-base">
              Sign in to continue your wellness journey with personalized Ayurvedic care
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Hero image placeholder */}
            <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
              <img
                src="/serene-ayurvedic-meditation-scene-with-herbs-and-n.jpg"
                alt="Ayurvedic wellness"
                className="rounded-lg opacity-80 w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=200&width=400&text=Ayurvedic+Wellness"
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>I am a:</Label>
              <Select value={userType} onValueChange={(value: "patient" | "therapist") => setUserType(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Patient
                    </div>
                  </SelectItem>
                  <SelectItem value="therapist">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      Therapist/Doctor
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabs for sign in and sign up options */}
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" disabled={loading} size="lg" className="w-full text-lg">
                    <Mail className="h-5 w-5 mr-3" />
                    {loading ? "Signing in..." : `Sign In as ${userType === "patient" ? "Patient" : "Therapist"}`}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password (min 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Alert className="border-info/20 bg-info/5">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      After creating your {userType} account, you'll receive a verification code via email. Please enter
                      the code to complete your registration.
                    </AlertDescription>
                  </Alert>
                  <Button type="submit" disabled={loading} size="lg" className="w-full text-lg">
                    <User className="h-5 w-5 mr-3" />
                    {loading
                      ? "Creating account..."
                      : `Create ${userType === "patient" ? "Patient" : "Therapist"} Account`}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              size="lg"
              className="w-full text-lg bg-transparent"
              variant="outline"
            >
              <Chrome className="h-5 w-5 mr-3" />
              {loading ? "Signing in..." : "Continue with Google"}
            </Button>

            {/* Features preview */}
            <div className="mt-8 text-center space-y-4">
              <h3 className="font-semibold text-foreground">What awaits you:</h3>
              <div className="grid grid-cols-1 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {userType === "patient" ? "AI-powered dosha assessment" : "Patient management dashboard"}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  {userType === "patient" ? "Expert Panchakarma therapy booking" : "Treatment planning tools"}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  {userType === "patient" ? "Personalized wellness tracking" : "Client progress monitoring"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
