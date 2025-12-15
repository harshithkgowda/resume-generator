"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle } from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface ProgressTrackerProps {
  data: ResumeData
}

export function ProgressTracker({ data }: ProgressTrackerProps) {
  const sections = [
    {
      name: "Personal Info",
      completed: !!(
        data.personalInfo.fullName &&
        data.personalInfo.email &&
        data.personalInfo.phone &&
        data.personalInfo.location
      ),
    },
    {
      name: "Summary",
      completed: data.summary.length > 50,
    },
    {
      name: "Experience",
      completed: data.experience.length > 0,
    },
    {
      name: "Education",
      completed: data.education.length > 0,
    },
    {
      name: "Skills",
      completed: data.skills.length >= 3,
    },
  ]

  const completedCount = sections.filter((s) => s.completed).length
  const progressPercentage = (completedCount / sections.length) * 100

  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Resume Completion</h3>
              <span className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          <div className="space-y-2">
            {sections.map((section) => (
              <div key={section.name} className="flex items-center gap-2 text-sm">
                {section.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={section.completed ? "text-foreground" : "text-muted-foreground"}>{section.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
