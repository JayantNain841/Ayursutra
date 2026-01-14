"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, Activity, Moon, Heart, Brain, ArrowLeft, Calendar, Target } from "lucide-react"
import Link from "next/link"

// Sample data for charts
const stressData = [
  { date: "Week 1", stress: 8.2, target: 6.0 },
  { date: "Week 2", stress: 7.8, target: 6.0 },
  { date: "Week 3", stress: 7.1, target: 6.0 },
  { date: "Week 4", stress: 6.9, target: 6.0 },
  { date: "Week 5", stress: 6.2, target: 6.0 },
  { date: "Week 6", stress: 5.8, target: 6.0 },
  { date: "Week 7", stress: 5.4, target: 6.0 },
  { date: "Week 8", stress: 5.1, target: 6.0 },
]

const sleepData = [
  { week: "Week 1", quality: 4.2, duration: 6.5 },
  { week: "Week 2", quality: 4.8, duration: 6.8 },
  { week: "Week 3", quality: 5.1, duration: 7.2 },
  { week: "Week 4", quality: 5.6, duration: 7.5 },
  { week: "Week 5", quality: 6.2, duration: 7.8 },
  { week: "Week 6", quality: 6.8, duration: 8.0 },
  { week: "Week 7", quality: 7.1, duration: 8.2 },
  { week: "Week 8", quality: 7.4, duration: 8.1 },
]

const therapyCompletionData = [
  { name: "Completed", value: 85, color: "#22c55e" },
  { name: "Missed", value: 10, color: "#ef4444" },
  { name: "Rescheduled", value: 5, color: "#f59e0b" },
]

const doshaBalanceData = [
  { month: "Jan", vata: 65, pitta: 45, kapha: 30 },
  { month: "Feb", vata: 60, pitta: 50, kapha: 35 },
  { month: "Mar", vata: 55, pitta: 55, kapha: 40 },
  { month: "Apr", vata: 50, pitta: 50, kapha: 45 },
  { month: "May", vata: 48, pitta: 48, kapha: 48 },
]

const metrics = [
  {
    title: "Stress Level",
    value: "5.1/10",
    change: "-37%",
    trend: "down",
    icon: Brain,
    color: "text-green-600",
    description: "Significant improvement over 8 weeks",
  },
  {
    title: "Sleep Quality",
    value: "7.4/10",
    change: "+76%",
    trend: "up",
    icon: Moon,
    color: "text-blue-600",
    description: "Excellent progress in sleep patterns",
  },
  {
    title: "Energy Level",
    value: "8.2/10",
    change: "+45%",
    trend: "up",
    icon: Activity,
    color: "text-orange-600",
    description: "Sustained energy throughout the day",
  },
  {
    title: "Overall Wellness",
    value: "85%",
    change: "+28%",
    trend: "up",
    icon: Heart,
    color: "text-red-600",
    description: "Holistic improvement across all metrics",
  },
]

export default function TrackingPage() {
  const [timeRange, setTimeRange] = useState("8weeks")

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4weeks">4 Weeks</SelectItem>
                  <SelectItem value="8weeks">8 Weeks</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Wellness Progress Tracking</h1>
          <p className="text-muted-foreground">
            Monitor your Ayurvedic healing journey with digital biomarkers and insights
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                  <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="gap-1">
                    {metric.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {metric.change}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">{metric.title}</h3>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="stress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stress">Stress Reduction</TabsTrigger>
            <TabsTrigger value="sleep">Sleep Quality</TabsTrigger>
            <TabsTrigger value="completion">Therapy Progress</TabsTrigger>
            <TabsTrigger value="dosha">Dosha Balance</TabsTrigger>
          </TabsList>

          <TabsContent value="stress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Stress Level Reduction Over Time
                </CardTitle>
                <CardDescription>Track your stress levels and progress toward your target goal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="stress"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        name="Stress Level"
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="hsl(var(--secondary))"
                        strokeDasharray="5 5"
                        name="Target Goal"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Insight:</strong> Your stress levels have decreased by 37% over the past 8 weeks, and you've
                    successfully reached your target goal. Continue with your current Panchakarma routine.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sleep" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-blue-600" />
                  Sleep Quality Improvements
                </CardTitle>
                <CardDescription>Monitor sleep quality and duration improvements through therapy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sleepData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="quality" fill="hsl(var(--chart-1))" name="Sleep Quality (1-10)" />
                      <Bar dataKey="duration" fill="hsl(var(--chart-2))" name="Sleep Duration (hours)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Insight:</strong> Your sleep quality has improved by 76% and you're now getting optimal
                    sleep duration. The Shirodhara treatments are showing excellent results.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Therapy Completion Rate
                </CardTitle>
                <CardDescription>Your commitment to scheduled therapy sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={therapyCompletionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {therapyCompletionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Insight:</strong> Excellent commitment! You've completed 85% of your scheduled sessions.
                    This consistency is key to achieving optimal therapeutic outcomes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dosha" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-orange-600" />
                  Dosha Balance Progress
                </CardTitle>
                <CardDescription>Track how your Vata, Pitta, and Kapha doshas are balancing over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={doshaBalanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="vata" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Vata" />
                      <Line type="monotone" dataKey="pitta" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Pitta" />
                      <Line type="monotone" dataKey="kapha" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Kapha" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Insight:</strong> Your doshas are approaching perfect balance (33% each). The Panchakarma
                    treatments are effectively harmonizing your constitution.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Items */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recommended Next Steps
            </CardTitle>
            <CardDescription>Based on your progress data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-green-600 mb-2">Continue Current Plan</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Your stress reduction is on track. Maintain your current Abhyanga and meditation schedule.
                </p>
                <Button size="sm" variant="outline">
                  Schedule Next Session
                </Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">Optimize Sleep Routine</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Consider adding evening Shirodhara sessions to further improve sleep quality.
                </p>
                <Button size="sm" variant="outline">
                  Book Consultation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
