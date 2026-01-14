import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Settings, Database, Shield, Mail, Chrome } from "lucide-react"

export function FirebaseSetupGuide() {
  const steps = [
    {
      title: "Create Firebase Project",
      description: "Go to Firebase Console and create a new project",
      icon: <Database className="h-5 w-5" />,
      link: "https://console.firebase.google.com/",
    },
    {
      title: "Add Web App",
      description: "Register your web app and copy the config",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Set Environment Variables",
      description: "Add Firebase config to v0 project settings",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      title: "Enable Authentication",
      description: "Enable Email/Password and Google providers",
      icon: <Mail className="h-5 w-5" />,
    },
  ]

  const envVars = [
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Firebase Setup Guide</h1>
        <p className="text-muted-foreground">Set up real authentication for your AyurSutra application</p>
      </div>

      <Alert className="border-amber-200 bg-amber-50">
        <Settings className="h-4 w-4" />
        <AlertDescription>
          <strong>Currently in Demo Mode:</strong> Follow these steps to enable real Firebase authentication
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <Card key={index} className="relative">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>
                {step.icon}
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </div>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            {step.link && (
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <a href={step.link} target="_blank" rel="noopener noreferrer">
                    Open Firebase Console <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Environment Variables
          </CardTitle>
          <CardDescription>Add these variables in v0 Project Settings → Environment Variables</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {envVars.map((envVar) => (
              <div key={envVar} className="flex items-center justify-between p-2 bg-muted rounded">
                <code className="text-sm">{envVar}</code>
                <Badge variant="outline">Required</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What You'll Get</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm">Real email verification</span>
            </div>
            <div className="flex items-center gap-2">
              <Chrome className="h-4 w-4 text-primary" />
              <span className="text-sm">Google OAuth login</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm">Secure user sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              <span className="text-sm">Role-based access</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
