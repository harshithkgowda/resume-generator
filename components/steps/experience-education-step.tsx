"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Briefcase, GraduationCap } from "lucide-react"
import type { ResumeData, Experience, Education } from "@/types/resume"

interface ExperienceEducationStepProps {
  resumeData: ResumeData
  onDataChange: (data: ResumeData) => void
}

export function ExperienceEducationStep({ resumeData, onDataChange }: ExperienceEducationStepProps) {
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    onDataChange({
      ...resumeData,
      experience: [...resumeData.experience, newExp],
    })
  }

  const removeExperience = (id: string) => {
    onDataChange({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    })
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onDataChange({
      ...resumeData,
      experience: resumeData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      location: "",
      graduationDate: "",
      gpa: "",
    }
    onDataChange({
      ...resumeData,
      education: [...resumeData.education, newEdu],
    })
  }

  const removeEducation = (id: string) => {
    onDataChange({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    })
  }

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onDataChange({
      ...resumeData,
      education: resumeData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>List your professional experience</CardDescription>
            </div>
          </div>
          <Button onClick={addExperience} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.experience.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No experience added yet. Click "Add" to get started.</p>
            </div>
          ) : (
            resumeData.experience.map((exp) => (
              <div key={exp.id} className="p-6 border-2 rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input
                        value={exp.jobTitle}
                        onChange={(e) => updateExperience(exp.id, "jobTitle", e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        placeholder="Tech Corp"
                      />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} className="ml-2">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                      disabled={exp.current}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onCheckedChange={(checked) => updateExperience(exp.id, "current", checked)}
                  />
                  <Label htmlFor={`current-${exp.id}`} className="font-normal cursor-pointer">
                    I currently work here
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                    placeholder="• Led development of key features&#10;• Collaborated with cross-functional teams&#10;• Improved system performance by 40%"
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Education</CardTitle>
              <CardDescription>Your academic background</CardDescription>
            </div>
          </div>
          <Button onClick={addEducation} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.education.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No education added yet. Click "Add" to get started.</p>
            </div>
          ) : (
            resumeData.education.map((edu) => (
              <div key={edu.id} className="p-6 border-2 rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        placeholder="Bachelor of Science in Computer Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>School</Label>
                      <Input
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)} className="ml-2">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Location</Label>
                    <Input
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                      placeholder="Boston, MA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Graduation</Label>
                    <Input
                      type="month"
                      value={edu.graduationDate}
                      onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>GPA (Optional)</Label>
                  <Input
                    value={edu.gpa || ""}
                    onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
