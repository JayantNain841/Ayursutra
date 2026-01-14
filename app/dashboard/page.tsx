"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NotificationSystem } from "@/components/notification-system"
import { Bell, CalendarIcon, Home, Settings, TrendingUp, Clock, MapPin, User, Leaf, Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { AuthGuard } from "@/components/auth-guard"
import Link from "next/link"

const upcomingSessions = [
  {
    id: 1,
    therapy: "Abhyanga Massage",
    therapist: "Dr. Priya Sharma",
    date: "Today",
    time: "2:00 PM - 3:30 PM",
    location: "Wellness Center - Room 3",
    status: "confirmed",
    avatar: "/indian-woman-doctor.png",
  },
  {
    id: 2,
    therapy: "Shirodhara Treatment",
    therapist: "Dr. Raj Patel",
    date: "Tomorrow",
    time: "10:00 AM - 11:00 AM",
    location: "Wellness Center - Room 1",
    status: "confirmed",
    avatar: "/placeholder-6vtv3.png",
  },
  {
    id: 3,
    therapy: "Panchakarma Consultation",
    therapist: "Dr. Meera Gupta",
    date: "Dec 22",
    time: "3:00 PM - 4:00 PM",
    location: "Online Session",
    status: "pending",
    avatar: "/placeholder-r93bh.png",
  },
]

const notifications = [
  {
    id: 1,
    type: "reminder",
    title: "Session Reminder",
    message: "Your Abhyanga session is in 2 hours. Please arrive 15 minutes early.",
    time: "2 hours ago",
    urgent: true,
  },
  {
    id: 2,
    type: "care",
    title: "Post-Treatment Care",
    message: "Remember to drink warm water and avoid cold foods after your last session.",
    time: "1 day ago",
    urgent: false,
  },
  {
    id: 3,
    type: "booking",
    title: "New Session Available",
    message: "Dr. Priya has opened a slot for Nasya treatment this Friday.",
    time: "2 days ago",
    urgent: false,
  },
]

function DashboardContent() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [activeTab, setActiveTab] = useState("home")
  const { user } = useAuth()

  const notificationSystem = NotificationSystem({
    userId: "user123",
    sessionType: "Abhyanga",
    sessionTime: new Date(),
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card/50 min-h-screen">
          <div className="p-6">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AyurSutra</span>
            </Link>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("home")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === "home" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <Home className="h-4 w-4" />
                Home
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === "schedule" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <CalendarIcon className="h-4 w-4" />
                Schedule
              </button>
              <Link
                href="/tracking"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors hover:bg-muted"
              >
                <TrendingUp className="h-4 w-4" />
                Progress
              </Link>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <header className="border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, {user?.displayName || "Guest"}</h1>
                  <p className="text-muted-foreground">Your wellness journey continues</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Book Session
                  </Button>
                  <div className="relative">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full" />
                  </div>
                  <Avatar>
                    <AvatarImage src={user?.photoURL || "/woman-profile.png"} />
                    <AvatarFallback>{user?.displayName?.charAt(0) || "G"}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Hero Section */}
            <div className="mb-8">
              <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="flex-1 p-8">
                    <div className="space-y-4">
                      <Badge variant="secondary" className="w-fit">
                        Welcome to AyurSutra
                      </Badge>
                      <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight">
                        Your Journey to <span className="text-primary">Holistic Wellness</span> Begins Here
                      </h2>
                      <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                        Embrace the ancient wisdom of Ayurveda with modern convenience. Track your progress, book
                        sessions, and discover your path to balanced living.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button size="lg" className="bg-primary hover:bg-primary/90">
                          Start Assessment
                        </Button>
                        <Button variant="outline" size="lg" className="bg-transparent">
                          View Progress
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-80 p-4 lg:p-8">
                    <div className="aspect-square lg:aspect-auto lg:h-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <img
                        src="/serene-ayurvedic-meditation-scene-with-herbs-and-n.jpg"
                        alt="Serene Ayurvedic meditation scene with herbs and natural elements"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?key=opd7f"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Next Session</p>
                          <p className="text-lg font-semibold">Today 2:00 PM</p>
                        </div>
                        <Clock className="h-8 w-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Sessions This Month</p>
                          <p className="text-lg font-semibold">8 completed</p>
                        </div>
                        <CalendarIcon className="h-8 w-8 text-secondary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Wellness Score</p>
                          <p className="text-lg font-semibold">85%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-accent" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification System Demo</CardTitle>
                    <CardDescription>Test the various notification types</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => notificationSystem.showPreTherapyNotification("Abhyanga")}
                      >
                        Pre-Therapy Alert
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => notificationSystem.showPostTherapyNotification("Shirodhara")}
                      >
                        Post-Therapy Care
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => notificationSystem.showSessionReminder("Panchakarma", "1 hour")}
                      >
                        Session Reminder
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => notificationSystem.showWellnessTip()}>
                        Wellness Tip
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Sessions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Sessions</CardTitle>
                    <CardDescription>Your scheduled therapy appointments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Avatar>
                          <AvatarImage src={session.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{session.therapy}</h4>
                            <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                              {session.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">with {session.therapist}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              {session.date} • {session.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {session.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button size="sm">Join</Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Calendar View */}
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar View</CardTitle>
                    <CardDescription>View and manage your therapy schedule</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border w-full"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Notifications */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                    <CardDescription>Important updates and reminders</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border ${notification.urgent ? "border-destructive/20 bg-destructive/5" : "border-border"}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-sm">{notification.title}</h5>
                          {notification.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Book New Session
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/therapists">
                        <User className="h-4 w-4 mr-2" />
                        Find Therapist
                      </Link>
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/tracking">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Progress
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Dosha Reminder */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-primary">Your Dosha: Vata</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Remember to maintain regular routines and stay warm during treatments.
                    </p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <Link href="/quiz">Retake Assessment</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
