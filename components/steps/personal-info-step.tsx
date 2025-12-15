"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User } from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface PersonalInfoStepProps {
  resumeData: ResumeData
  onDataChange: (data: ResumeData) => void
}

export function PersonalInfoStep({ resumeData, onDataChange }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Personal Information</CardTitle>
          </div>
          <CardDescription>Your contact details and professional links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={resumeData.personalInfo.fullName}
                onChange={(e) =>
                  onDataChange({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, fullName: e.target.value },
                  })
                }
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) =>
                  onDataChange({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, email: e.target.value },
                  })
                }
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) =>
                  onDataChange({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, phone: e.target.value },
                  })
                }
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={resumeData.personalInfo.location}
                onChange={(e) =>
                  onDataChange({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, location: e.target.value },
                  })
                }
                placeholder="New York, NY"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={resumeData.personalInfo.linkedin}
                onChange={(e) =>
                  onDataChange({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value },
                  })
                }
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={resumeData.personalInfo.github}
                onChange={(e) =>
                  onDataChange({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, github: e.target.value },
                  })
                }
                placeholder="github.com/johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio</Label>
              <Input
                id="portfolio"
                value={resumeData.personalInfo.portfolio}
                onChange={(e) =>
                  onDataChange({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, portfolio: e.target.value },
                  })
                }
                placeholder="johndoe.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>About Me</CardTitle>
          <CardDescription>A brief introduction about yourself</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={resumeData.about || ""}
            onChange={(e) => onDataChange({ ...resumeData, about: e.target.value })}
            placeholder="Tell recruiters about your background, passions, and what makes you unique..."
            rows={3}
            className="resize-none"
          />
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
          <CardDescription>Highlight your key qualifications and career objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={resumeData.summary}
            onChange={(e) => onDataChange({ ...resumeData, summary: e.target.value })}
            placeholder="Experienced software engineer with 5+ years of expertise in full-stack development..."
            rows={4}
            className="resize-none"
          />
        </CardContent>
      </Card>
    </div>
  )
}
