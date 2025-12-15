"use client"

import { useState } from "react"
import { StepWizard } from "@/components/step-wizard"
import { Sparkles } from "lucide-react"
import type { ResumeData } from "@/types/resume"

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
      github: "",
    },
    summary: "",
    about: "",
    experience: [],
    education: [],
    skills: [],
    achievements: [],
    certifications: [],
    projects: [],
    languages: [],
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Resume Builder Pro</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Create ATS-optimized resumes in simple steps</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <StepWizard resumeData={resumeData} onDataChange={setResumeData} />
      </div>
    </main>
  )
}
