"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Clock, Award, Users, Search, Leaf, Plus, Calendar, Globe } from "lucide-react"
import Link from "next/link"

const therapists = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    title: "Senior Ayurvedic Physician",
    specializations: ["Panchakarma", "Women's Health", "Stress Management"],
    rating: 4.9,
    reviews: 127,
    experience: "15+ years",
    location: "Mumbai, India",
    languages: ["English", "Hindi", "Marathi"],
    availability: "Available Today",
    price: "₹2,500/session",
    image: "/placeholder.svg?key=dr1",
    verified: true,
    bio: "Specialized in traditional Panchakarma treatments with modern wellness approaches.",
    education: ["BAMS - Pune University", "MD Ayurveda - Gujarat Ayurved University"],
    certifications: ["Panchakarma Specialist", "Yoga Therapy Certified"],
  },
  {
    id: 2,
    name: "Dr. Raj Patel",
    title: "Panchakarma Specialist",
    specializations: ["Panchakarma", "Detoxification", "Pain Management"],
    rating: 4.8,
    reviews: 89,
    experience: "12+ years",
    location: "Delhi, India",
    languages: ["English", "Hindi", "Gujarati"],
    availability: "Available Tomorrow",
    price: "₹2,200/session",
    image: "/placeholder.svg?key=dr2",
    verified: true,
    bio: "Expert in traditional detoxification therapies and chronic pain management.",
    education: ["BAMS - Delhi University", "PG Diploma in Panchakarma"],
    certifications: ["Pain Management Specialist", "Detox Therapy Expert"],
  },
  {
    id: 3,
    name: "Dr. Meera Gupta",
    title: "Ayurvedic Consultant",
    specializations: ["Nutrition", "Lifestyle Counseling", "Preventive Care"],
    rating: 4.7,
    reviews: 156,
    experience: "10+ years",
    location: "Bangalore, India",
    languages: ["English", "Hindi", "Kannada"],
    availability: "Available This Week",
    price: "₹1,800/session",
    image: "/placeholder.svg?key=dr3",
    verified: true,
    bio: "Focuses on preventive Ayurveda and personalized nutrition planning.",
    education: ["BAMS - Bangalore University", "MSc in Ayurvedic Nutrition"],
    certifications: ["Nutrition Specialist", "Lifestyle Coach"],
  },
  {
    id: 4,
    name: "Dr. Arjun Singh",
    title: "Traditional Ayurveda Practitioner",
    specializations: ["Herbal Medicine", "Pulse Diagnosis", "Chronic Conditions"],
    rating: 4.9,
    reviews: 203,
    experience: "20+ years",
    location: "Rishikesh, India",
    languages: ["English", "Hindi", "Sanskrit"],
    availability: "Available Next Week",
    price: "₹3,000/session",
    image: "/placeholder.svg?key=dr4",
    verified: true,
    bio: "Master of traditional pulse diagnosis and herbal formulations.",
    education: ["BAMS - Haridwar University", "Traditional Gurukul Training"],
    certifications: ["Pulse Diagnosis Master", "Herbal Medicine Expert"],
  },
]

export default function TherapistsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const filteredTherapists = therapists.filter((therapist) => {
    const matchesSearch =
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specializations.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialization =
      selectedSpecialization === "all" || therapist.specializations.includes(selectedSpecialization)
    const matchesLocation = selectedLocation === "all" || therapist.location.includes(selectedLocation)

    return matchesSearch && matchesSpecialization && matchesLocation
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AyurSutra</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/therapists/register">
                  <Plus className="h-4 w-4 mr-2" />
                  Register as Therapist
                </Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Your Ayurvedic Therapist</h1>
          <p className="text-muted-foreground">
            Connect with certified Ayurvedic practitioners for personalized healing
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search therapists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  <SelectItem value="Panchakarma">Panchakarma</SelectItem>
                  <SelectItem value="Women's Health">Women's Health</SelectItem>
                  <SelectItem value="Stress Management">Stress Management</SelectItem>
                  <SelectItem value="Pain Management">Pain Management</SelectItem>
                  <SelectItem value="Nutrition">Nutrition</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Rishikesh">Rishikesh</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredTherapists.map((therapist) => (
            <Card key={therapist.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={therapist.image || "/placeholder.svg"} />
                    <AvatarFallback>
                      {therapist.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{therapist.name}</h3>
                          {therapist.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">{therapist.title}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{therapist.rating}</span>
                          <span className="text-muted-foreground text-sm">({therapist.reviews})</span>
                        </div>
                        <p className="text-sm font-medium text-primary">{therapist.price}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {therapist.specializations.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{therapist.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{therapist.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{therapist.availability}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <span>{therapist.languages.join(", ")}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{therapist.bio}</p>

                      <div className="flex gap-3 pt-2">
                        <Button className="flex-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Session
                        </Button>
                        <Button variant="outline">View Profile</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTherapists.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">No therapists found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedSpecialization("all")
                  setSelectedLocation("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
