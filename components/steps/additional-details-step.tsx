"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Trophy, Award, Languages } from "lucide-react"
import type { ResumeData, Achievement, Certification, Language } from "@/types/resume"

interface AdditionalDetailsStepProps {
  resumeData: ResumeData
  onDataChange: (data: ResumeData) => void
}

export function AdditionalDetailsStep({ resumeData, onDataChange }: AdditionalDetailsStepProps) {
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: "",
      description: "",
      date: "",
    }
    onDataChange({
      ...resumeData,
      achievements: [...resumeData.achievements, newAchievement],
    })
  }

  const removeAchievement = (id: string) => {
    onDataChange({
      ...resumeData,
      achievements: resumeData.achievements.filter((item) => item.id !== id),
    })
  }

  const updateAchievement = (id: string, field: keyof Achievement, value: any) => {
    onDataChange({
      ...resumeData,
      achievements: resumeData.achievements.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    })
  }

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      credentialId: "",
    }
    onDataChange({
      ...resumeData,
      certifications: [...resumeData.certifications, newCert],
    })
  }

  const removeCertification = (id: string) => {
    onDataChange({
      ...resumeData,
      certifications: resumeData.certifications.filter((item) => item.id !== id),
    })
  }

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    onDataChange({
      ...resumeData,
      certifications: resumeData.certifications.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    })
  }

  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: "",
      proficiency: "intermediate",
    }
    onDataChange({
      ...resumeData,
      languages: [...resumeData.languages, newLang],
    })
  }

  const removeLanguage = (id: string) => {
    onDataChange({
      ...resumeData,
      languages: resumeData.languages.filter((item) => item.id !== id),
    })
  }

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    onDataChange({
      ...resumeData,
      languages: resumeData.languages.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Highlight your accomplishments</CardDescription>
            </div>
          </div>
          <Button onClick={addAchievement} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.achievements.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No achievements added yet. Highlight your wins!</p>
            </div>
          ) : (
            resumeData.achievements.map((achievement) => (
              <div key={achievement.id} className="p-6 border-2 rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Achievement Title</Label>
                      <Input
                        value={achievement.title}
                        onChange={(e) => updateAchievement(achievement.id, "title", e.target.value)}
                        placeholder="Employee of the Year"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date (Optional)</Label>
                      <Input
                        type="month"
                        value={achievement.date || ""}
                        onChange={(e) => updateAchievement(achievement.id, "date", e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAchievement(achievement.id)}
                    className="ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={achievement.description}
                    onChange={(e) => updateAchievement(achievement.id, "description", e.target.value)}
                    placeholder="Recognized for outstanding performance..."
                    rows={2}
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
            <Award className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Professional certifications</CardDescription>
            </div>
          </div>
          <Button onClick={addCertification} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.certifications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Award className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No certifications added yet. Show your credentials!</p>
            </div>
          ) : (
            resumeData.certifications.map((cert) => (
              <div key={cert.id} className="p-6 border-2 rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Certification Name</Label>
                      <Input
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                        placeholder="AWS Certified Solutions Architect"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Issuing Organization</Label>
                      <Input
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                        placeholder="Amazon Web Services"
                      />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeCertification(cert.id)} className="ml-2">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date Issued</Label>
                    <Input
                      type="month"
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Credential ID (Optional)</Label>
                    <Input
                      value={cert.credentialId || ""}
                      onChange={(e) => updateCertification(cert.id, "credentialId", e.target.value)}
                      placeholder="ABC123XYZ"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Languages</CardTitle>
              <CardDescription>Spoken languages</CardDescription>
            </div>
          </div>
          <Button onClick={addLanguage} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.languages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Languages className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No languages added yet. Showcase your linguistic skills!</p>
            </div>
          ) : (
            resumeData.languages.map((lang) => (
              <div key={lang.id} className="p-4 border-2 rounded-lg flex items-center gap-4">
                <div className="flex-1 grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Input
                      value={lang.name}
                      onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                      placeholder="English"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Proficiency</Label>
                    <Select
                      value={lang.proficiency}
                      onValueChange={(value) => updateLanguage(lang.id, "proficiency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="native">Native</SelectItem>
                        <SelectItem value="fluent">Fluent</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="basic">Basic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeLanguage(lang.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
