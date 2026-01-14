"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Leaf, CheckCircle } from "lucide-react"
import Link from "next/link"

const questions = [
  {
    id: 1,
    question: "What is your natural body build?",
    options: [
      { value: "vata", label: "Thin, light frame with prominent joints", dosha: "vata" },
      { value: "pitta", label: "Medium build with good muscle definition", dosha: "pitta" },
      { value: "kapha", label: "Large frame with tendency to gain weight easily", dosha: "kapha" },
    ],
  },
  {
    id: 2,
    question: "How would you describe your skin?",
    options: [
      { value: "vata", label: "Dry, rough, cool to touch", dosha: "vata" },
      { value: "pitta", label: "Warm, oily, prone to rashes or acne", dosha: "pitta" },
      { value: "kapha", label: "Thick, moist, cool, and smooth", dosha: "kapha" },
    ],
  },
  {
    id: 3,
    question: "What is your typical energy pattern?",
    options: [
      { value: "vata", label: "Bursts of energy followed by fatigue", dosha: "vata" },
      { value: "pitta", label: "Steady, intense energy throughout the day", dosha: "pitta" },
      { value: "kapha", label: "Slow to start but sustained energy", dosha: "kapha" },
    ],
  },
  {
    id: 4,
    question: "How do you typically handle stress?",
    options: [
      { value: "vata", label: "Become anxious, worried, or scattered", dosha: "vata" },
      { value: "pitta", label: "Become irritable, angry, or critical", dosha: "pitta" },
      { value: "kapha", label: "Withdraw, become stubborn, or procrastinate", dosha: "kapha" },
    ],
  },
  {
    id: 5,
    question: "What is your preferred climate?",
    options: [
      { value: "vata", label: "Warm, humid weather", dosha: "vata" },
      { value: "pitta", label: "Cool, dry weather", dosha: "pitta" },
      { value: "kapha", label: "Warm, dry weather", dosha: "kapha" },
    ],
  },
  {
    id: 6,
    question: "How is your appetite and digestion?",
    options: [
      { value: "vata", label: "Variable appetite, irregular digestion", dosha: "vata" },
      { value: "pitta", label: "Strong appetite, efficient digestion", dosha: "pitta" },
      { value: "kapha", label: "Steady appetite, slow digestion", dosha: "kapha" },
    ],
  },
  {
    id: 7,
    question: "What is your sleep pattern like?",
    options: [
      { value: "vata", label: "Light sleeper, difficulty falling asleep", dosha: "vata" },
      { value: "pitta", label: "Moderate sleep, wake up refreshed", dosha: "pitta" },
      { value: "kapha", label: "Deep sleeper, need more than 8 hours", dosha: "kapha" },
    ],
  },
  {
    id: 8,
    question: "How do you learn and remember information?",
    options: [
      { value: "vata", label: "Learn quickly but forget easily", dosha: "vata" },
      { value: "pitta", label: "Learn at moderate pace with good retention", dosha: "pitta" },
      { value: "kapha", label: "Learn slowly but remember for long time", dosha: "kapha" },
    ],
  },
]

const doshaResults = {
  vata: {
    name: "Vata",
    description: "Air and Space elements dominate your constitution",
    characteristics: [
      "Creative and energetic",
      "Quick thinking",
      "Loves variety and change",
      "Prone to anxiety when imbalanced",
    ],
    recommendations: [
      "Maintain regular routines",
      "Eat warm, cooked foods",
      "Practice calming activities like yoga",
      "Get adequate rest and sleep",
    ],
    color: "text-blue-600",
  },
  pitta: {
    name: "Pitta",
    description: "Fire and Water elements dominate your constitution",
    characteristics: ["Natural leader", "Sharp intellect", "Good digestion", "Prone to anger when imbalanced"],
    recommendations: [
      "Avoid excessive heat and spicy foods",
      "Practice cooling activities",
      "Maintain work-life balance",
      "Stay hydrated and cool",
    ],
    color: "text-red-600",
  },
  kapha: {
    name: "Kapha",
    description: "Earth and Water elements dominate your constitution",
    characteristics: [
      "Calm and stable",
      "Strong immunity",
      "Loyal and compassionate",
      "Prone to lethargy when imbalanced",
    ],
    recommendations: [
      "Engage in regular vigorous exercise",
      "Eat light, warm, spicy foods",
      "Maintain active lifestyle",
      "Avoid excessive sleep",
    ],
    color: "text-green-600",
  },
}

export default function DoshaQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [dominantDosha, setDominantDosha] = useState<string>("")

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      calculateResults()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const calculateResults = () => {
    const doshaScores = { vata: 0, pitta: 0, kapha: 0 }

    Object.values(answers).forEach((answer) => {
      if (answer in doshaScores) {
        doshaScores[answer as keyof typeof doshaScores]++
      }
    })

    const dominant = Object.entries(doshaScores).reduce((a, b) =>
      doshaScores[a[0] as keyof typeof doshaScores] > doshaScores[b[0] as keyof typeof doshaScores] ? a : b,
    )[0]

    setDominantDosha(dominant)
    setShowResults(true)
  }

  const currentAnswer = answers[questions[currentQuestion]?.id]

  if (showResults) {
    const result = doshaResults[dominantDosha as keyof typeof doshaResults]

    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">AyurSutra</span>
              </Link>
              <Badge variant="secondary">Assessment Complete</Badge>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-6 mb-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">Your Dosha Assessment Results</h1>
            <p className="text-xl text-muted-foreground">Based on your responses, your dominant dosha is:</p>
          </div>

          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center pb-6">
              <CardTitle className={`text-4xl font-bold ${result.color}`}>{result.name} Dosha</CardTitle>
              <CardDescription className="text-lg">{result.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Your Characteristics</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {result.characteristics.map((char, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">{char}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Personalized Recommendations</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span className="text-muted-foreground">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" className="flex-1" asChild>
                  <Link href="/dashboard">
                    Book Therapy Session
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="flex-1 bg-transparent" asChild>
                  <Link href="/tracking">Start Tracking Progress</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button variant="ghost" asChild>
              <Link href="/quiz">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retake Assessment
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AyurSutra</span>
            </Link>
            <Badge variant="secondary">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-balance">{questions[currentQuestion].question}</CardTitle>
            <CardDescription>Select the option that best describes you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={currentAnswer || ""} onValueChange={handleAnswer} className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={option.value} id={`option-${index}`} className="mt-1" />
                  <Label htmlFor={`option-${index}`} className="text-base leading-relaxed cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={nextQuestion} disabled={!currentAnswer}>
                {currentQuestion === questions.length - 1 ? "Get Results" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Question Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentQuestion ? "bg-primary" : answers[questions[index].id] ? "bg-primary/50" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
