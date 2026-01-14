"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, Plus, X, Leaf, Award, MapPin, Star } from "lucide-react"
import Link from "next/link"

export default function TherapistRegisterPage() {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      languages: [] as string[],
      profileImage: null as File | null,
    },
    professional: {
      title: "",
      experience: "",
      specializations: [] as string[],
      education: [] as string[],
      certifications: [] as string[],
      bio: "",
      consultationFee: "",
    },
    availability: {
      timezone: "",
      workingDays: [] as string[],
      workingHours: {
        start: "",
        end: "",
      },
    },
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [newSpecialization, setNewSpecialization] = useState("")
  const [newEducation, setNewEducation] = useState("")
  const [newCertification, setNewCertification] = useState("")

  const specializations = [
    "Panchakarma",
    "Women's Health",
    "Stress Management",
    "Pain Management",
    "Nutrition",
    "Detoxification",
    "Herbal Medicine",
    "Pulse Diagnosis",
    "Lifestyle Counseling",
    "Preventive Care",
    "Chronic Conditions",
  ]

  const languages = ["English", "Hindi", "Sanskrit", "Tamil", "Telugu", "Marathi", "Gujarati", "Bengali", "Kannada"]
  const workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const addToArray = (field: string, value: string, category: "professional" | "personalInfo") => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: [...(prev[category][field as keyof (typeof prev)[category]] as string[]), value.trim()],
        },
      }))
    }
  }

  const removeFromArray = (field: string, index: number, category: "professional" | "personalInfo") => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: (prev[category][field as keyof (typeof prev)[category]] as string[]).filter((_, i) => i !== index),
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Show success message and redirect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/therapists" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Therapists
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AyurSutra</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Register as an Ayurvedic Therapist</h1>
          <p className="text-muted-foreground">
            Join our platform and connect with patients seeking authentic Ayurvedic healing
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-12 h-0.5 mx-2 ${currentStep > step ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Tell us about yourself and your background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.personalInfo.firstName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, firstName: e.target.value },
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.personalInfo.lastName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, lastName: e.target.value },
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, email: e.target.value },
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.personalInfo.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, phone: e.target.value },
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location (City, State) *</Label>
                  <Input
                    id="location"
                    value={formData.personalInfo.location}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, location: e.target.value },
                      }))
                    }
                    placeholder="e.g., Mumbai, Maharashtra"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Languages Spoken</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {languages.map((lang) => (
                      <div key={lang} className="flex items-center space-x-2">
                        <Checkbox
                          id={lang}
                          checked={formData.personalInfo.languages.includes(lang)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addToArray("languages", lang, "personalInfo")
                            } else {
                              const index = formData.personalInfo.languages.indexOf(lang)
                              if (index > -1) removeFromArray("languages", index, "personalInfo")
                            }
                          }}
                        />
                        <Label htmlFor={lang} className="text-sm">
                          {lang}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Profile Photo</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Upload your professional photo</p>
                    <Button type="button" variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Professional Information */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Professional Information
                </CardTitle>
                <CardDescription>Share your qualifications and expertise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title *</Label>
                    <Input
                      id="title"
                      value={formData.professional.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          professional: { ...prev.professional, title: e.target.value },
                        }))
                      }
                      placeholder="e.g., Senior Ayurvedic Physician"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Select
                      value={formData.professional.experience}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          professional: { ...prev.professional, experience: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="4-7">4-7 years</SelectItem>
                        <SelectItem value="8-12">8-12 years</SelectItem>
                        <SelectItem value="13-20">13-20 years</SelectItem>
                        <SelectItem value="20+">20+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Specializations *</Label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {specializations.map((spec) => (
                      <div key={spec} className="flex items-center space-x-2">
                        <Checkbox
                          id={spec}
                          checked={formData.professional.specializations.includes(spec)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addToArray("specializations", spec, "professional")
                            } else {
                              const index = formData.professional.specializations.indexOf(spec)
                              if (index > -1) removeFromArray("specializations", index, "professional")
                            }
                          }}
                        />
                        <Label htmlFor={spec} className="text-sm">
                          {spec}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add custom specialization"
                      value={newSpecialization}
                      onChange={(e) => setNewSpecialization(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        addToArray("specializations", newSpecialization, "professional")
                        setNewSpecialization("")
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.professional.specializations.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.professional.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {spec}
                          <button
                            type="button"
                            onClick={() => removeFromArray("specializations", index, "professional")}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Education</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="e.g., BAMS - University Name"
                      value={newEducation}
                      onChange={(e) => setNewEducation(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        addToArray("education", newEducation, "professional")
                        setNewEducation("")
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.professional.education.map((edu, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{edu}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray("education", index, "professional")}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Certifications</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="e.g., Panchakarma Specialist Certification"
                      value={newCertification}
                      onChange={(e) => setNewCertification(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        addToArray("certifications", newCertification, "professional")
                        setNewCertification("")
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.professional.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{cert}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray("certifications", index, "professional")}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio *</Label>
                  <Textarea
                    id="bio"
                    value={formData.professional.bio}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        professional: { ...prev.professional, bio: e.target.value },
                      }))
                    }
                    placeholder="Describe your approach to Ayurvedic healing, experience, and what makes you unique..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consultationFee">Consultation Fee (₹) *</Label>
                  <Input
                    id="consultationFee"
                    type="number"
                    value={formData.professional.consultationFee}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        professional: { ...prev.professional, consultationFee: e.target.value },
                      }))
                    }
                    placeholder="e.g., 2500"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Availability */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Availability & Final Details
                </CardTitle>
                <CardDescription>Set your working hours and availability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Working Days</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {workingDays.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={day}
                          checked={formData.availability.workingDays.includes(day)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData((prev) => ({
                                ...prev,
                                availability: {
                                  ...prev.availability,
                                  workingDays: [...prev.availability.workingDays, day],
                                },
                              }))
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                availability: {
                                  ...prev.availability,
                                  workingDays: prev.availability.workingDays.filter((d) => d !== day),
                                },
                              }))
                            }
                          }}
                        />
                        <Label htmlFor={day} className="text-sm">
                          {day.slice(0, 3)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Working Hours Start</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.availability.workingHours.start}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          availability: {
                            ...prev.availability,
                            workingHours: { ...prev.availability.workingHours, start: e.target.value },
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Working Hours End</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.availability.workingHours.end}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          availability: {
                            ...prev.availability,
                            workingHours: { ...prev.availability.workingHours, end: e.target.value },
                          },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={formData.availability.timezone}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        availability: { ...prev.availability, timezone: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IST">India Standard Time (IST)</SelectItem>
                      <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                      <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Terms & Conditions</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms">I agree to the AyurSutra Terms of Service and Privacy Policy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verification" required />
                      <Label htmlFor="verification">
                        I consent to verification of my credentials and qualifications
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="code" required />
                      <Label htmlFor="code">I agree to follow the AyurSutra Code of Ethics for practitioners</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            {currentStep < 3 ? (
              <Button type="button" onClick={() => setCurrentStep((prev) => Math.min(3, prev + 1))}>
                Next
              </Button>
            ) : (
              <Button type="submit" className="bg-primary">
                Submit Application
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
