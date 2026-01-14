"use client"

import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Bell, Heart, Droplets, Leaf, Clock } from "lucide-react"

interface NotificationSystemProps {
  userId?: string
  sessionType?: string
  sessionTime?: Date
}

export function NotificationSystem({ userId, sessionType, sessionTime }: NotificationSystemProps) {
  const { toast } = useToast()

  // Pre-therapy notifications
  const showPreTherapyNotification = (therapy: string) => {
    const precautions = {
      Abhyanga: {
        title: "Pre-Abhyanga Preparation",
        message: "Please avoid heavy meals 2 hours before your session. Wear comfortable, loose clothing.",
        icon: <Droplets className="h-5 w-5" />,
      },
      Shirodhara: {
        title: "Pre-Shirodhara Guidelines",
        message: "Avoid washing your hair today. Come with an empty stomach and relaxed mind.",
        icon: <Bell className="h-5 w-5" />,
      },
      Panchakarma: {
        title: "Panchakarma Preparation",
        message: "Follow the prescribed diet. Avoid cold foods and drinks. Arrive 30 minutes early.",
        icon: <Leaf className="h-5 w-5" />,
      },
    }

    const precaution = precautions[therapy as keyof typeof precautions] || precautions["Abhyanga"]

    toast({
      variant: "info",
      title: precaution.title,
      description: precaution.message,
      duration: 8000,
    })
  }

  // Post-therapy notifications
  const showPostTherapyNotification = (therapy: string) => {
    const careInstructions = {
      Abhyanga: {
        title: "Post-Abhyanga Care",
        message: "Rest for 30 minutes. Drink warm water. Avoid cold shower for 2 hours.",
        icon: <Heart className="h-5 w-5" />,
      },
      Shirodhara: {
        title: "Post-Shirodhara Care",
        message: "Keep your head covered. Avoid loud noises. Rest in a quiet environment.",
        icon: <Bell className="h-5 w-5" />,
      },
      Panchakarma: {
        title: "Post-Panchakarma Care",
        message: "Follow prescribed diet strictly. Avoid physical exertion. Take prescribed medicines.",
        icon: <Leaf className="h-5 w-5" />,
      },
    }

    const care = careInstructions[therapy as keyof typeof careInstructions] || careInstructions["Abhyanga"]

    toast({
      variant: "success",
      title: care.title,
      description: care.message,
      duration: 10000,
    })
  }

  // Session reminder notifications
  const showSessionReminder = (therapy: string, timeUntil: string) => {
    toast({
      variant: "warning",
      title: "Session Reminder",
      description: `Your ${therapy} session is in ${timeUntil}. Please prepare accordingly.`,
      duration: 6000,
    })
  }

  // Wellness tip notifications
  const showWellnessTip = () => {
    const tips = [
      {
        title: "Daily Ayurvedic Tip",
        message: "Start your day with warm water and lemon to balance your doshas.",
        icon: <Leaf className="h-5 w-5" />,
      },
      {
        title: "Mindfulness Reminder",
        message: "Take 5 minutes for deep breathing to reduce Vata imbalance.",
        icon: <Heart className="h-5 w-5" />,
      },
      {
        title: "Nutrition Tip",
        message: "Eat your largest meal at midday when your digestive fire is strongest.",
        icon: <Clock className="h-5 w-5" />,
      },
    ]

    const randomTip = tips[Math.floor(Math.random() * tips.length)]

    toast({
      variant: "default",
      title: randomTip.title,
      description: randomTip.message,
      duration: 7000,
    })
  }

  // Demo notifications - in a real app, these would be triggered by actual events
  useEffect(() => {
    // Simulate pre-therapy notification (2 hours before session)
    const preTherapyTimer = setTimeout(() => {
      showPreTherapyNotification(sessionType || "Abhyanga")
    }, 2000)

    // Simulate session reminder (30 minutes before)
    const reminderTimer = setTimeout(() => {
      showSessionReminder(sessionType || "Abhyanga", "30 minutes")
    }, 5000)

    // Simulate post-therapy notification (after session)
    const postTherapyTimer = setTimeout(() => {
      showPostTherapyNotification(sessionType || "Abhyanga")
    }, 8000)

    // Simulate wellness tip (daily)
    const wellnessTipTimer = setTimeout(() => {
      showWellnessTip()
    }, 11000)

    return () => {
      clearTimeout(preTherapyTimer)
      clearTimeout(reminderTimer)
      clearTimeout(postTherapyTimer)
      clearTimeout(wellnessTipTimer)
    }
  }, [sessionType])

  // Expose methods for manual triggering
  return {
    showPreTherapyNotification,
    showPostTherapyNotification,
    showSessionReminder,
    showWellnessTip,
  }
}
