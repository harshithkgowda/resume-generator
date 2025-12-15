"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { AIImport } from "@/components/ai-import"
import { PersonalInfoStep } from "@/components/steps/personal-info-step"
import { ExperienceEducationStep } from "@/components/steps/experience-education-step"
import { SkillsProjectsStep } from "@/components/steps/skills-projects-step"
import { AdditionalDetailsStep } from "@/components/steps/additional-details-step"
import { TemplatePreviewStep } from "@/components/steps/template-preview-step"
import { DownloadStep } from "@/components/steps/download-step"
import { ATSScoreStep } from "@/components/steps/ats-score-step"
import type { ResumeData } from "@/types/resume"
import { cn } from "@/lib/utils"

interface StepWizardProps {
  resumeData: ResumeData
  onDataChange: (data: ResumeData) => void
}

const steps = [
  { id: 1, title: "Import Data", description: "Quick start with GitHub" },
  { id: 2, title: "Personal Info", description: "Contact details" },
  { id: 3, title: "Experience", description: "Work & education" },
  { id: 4, title: "Skills", description: "Skills & projects" },
  { id: 5, title: "Additional", description: "Extra details" },
  { id: 6, title: "Template", description: "Choose design" },
  { id: 7, title: "Download", description: "Get your resume" },
  { id: 8, title: "ATS Score", description: "AI analysis" },
]

export function StepWizard({ resumeData, onDataChange }: StepWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState("professional")

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleDataExtracted = (extractedData: ResumeData) => {
    onDataChange({
      personalInfo: { ...resumeData.personalInfo, ...extractedData.personalInfo },
      summary: extractedData.summary || resumeData.summary,
      about: extractedData.about || resumeData.about,
      experience: extractedData.experience.length > 0 ? extractedData.experience : resumeData.experience,
      education: extractedData.education.length > 0 ? extractedData.education : resumeData.education,
      skills: extractedData.skills.length > 0 ? extractedData.skills : resumeData.skills,
      achievements: extractedData.achievements.length > 0 ? extractedData.achievements : resumeData.achievements,
      certifications:
        extractedData.certifications.length > 0 ? extractedData.certifications : resumeData.certifications,
      projects: extractedData.projects.length > 0 ? extractedData.projects : resumeData.projects,
      languages: extractedData.languages.length > 0 ? extractedData.languages : resumeData.languages,
    })
    setCurrentStep(2)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Step Progress */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Step {currentStep} of {steps.length}
              </h2>
              <p className="text-muted-foreground mt-1">{steps[currentStep - 1].title}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{Math.round(progress)}%</div>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </div>
          <Progress value={progress} className="h-3" />

          {/* Step Indicators */}
          <div className="flex items-center justify-between pt-4 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center gap-2 flex-1 min-w-[80px]">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                      : currentStep > step.id
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </button>
                <div className="text-center hidden sm:block">
                  <p className="text-xs font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Step Content */}
      <div className="animate-in fade-in slide-in-from-bottom duration-500">
        {currentStep === 1 && <AIImport onDataExtracted={handleDataExtracted} />}
        {currentStep === 2 && <PersonalInfoStep resumeData={resumeData} onDataChange={onDataChange} />}
        {currentStep === 3 && <ExperienceEducationStep resumeData={resumeData} onDataChange={onDataChange} />}
        {currentStep === 4 && <SkillsProjectsStep resumeData={resumeData} onDataChange={onDataChange} />}
        {currentStep === 5 && <AdditionalDetailsStep resumeData={resumeData} onDataChange={onDataChange} />}
        {currentStep === 6 && (
          <TemplatePreviewStep
            resumeData={resumeData}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        )}
        {currentStep === 7 && <DownloadStep resumeData={resumeData} selectedTemplate={selectedTemplate} />}
        {currentStep === 8 && <ATSScoreStep resumeData={resumeData} selectedTemplate={selectedTemplate} />}
      </div>

      {/* Navigation */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <Button onClick={handlePrev} variant="outline" disabled={currentStep === 1} className="gap-2 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </p>
          </div>
          <Button onClick={handleNext} disabled={currentStep === steps.length} className="gap-2">
            {currentStep === steps.length ? "Complete" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
