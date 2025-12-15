"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, Award, Trophy, FolderOpen, Languages } from "lucide-react"
import type { ResumeData, Experience, Education, Achievement, Certification, Project, Language } from "@/types/resume"

interface ResumeFormProps {
  resumeData: ResumeData
  onDataChange: (data: ResumeData) => void
}

export function ResumeForm({ resumeData, onDataChange }: ResumeFormProps) {
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
    try {
      onDataChange({
        ...resumeData,
        experience: resumeData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
      })
    } catch (err) {
      console.error("[v0] Error updating experience:", err)
    }
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
    try {
      onDataChange({
        ...resumeData,
        education: resumeData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
      })
    } catch (err) {
      console.error("[v0] Error updating education:", err)
    }
  }

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

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
    }
    onDataChange({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    })
  }

  const removeProject = (id: string) => {
    onDataChange({
      ...resumeData,
      projects: resumeData.projects.filter((item) => item.id !== id),
    })
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    try {
      onDataChange({
        ...resumeData,
        projects: resumeData.projects.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
      })
    } catch (err) {
      console.error("[v0] Error updating project:", err)
    }
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
      <Card className="border-2 hover:border-primary/50 transition-colors">
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

      <Card className="border-2 hover:border-primary/50 transition-colors">
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

      <Card className="border-2 hover:border-primary/50 transition-colors">
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

      <Card className="border-2 hover:border-primary/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <CardTitle>Work Experience</CardTitle>
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
            resumeData.experience.map((exp, index) => (
              <div
                key={exp.id}
                className="p-6 border-2 rounded-lg space-y-4 hover:border-primary/50 transition-all animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 50}ms` }}
              >
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

      <Card className="border-2 hover:border-primary/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <CardTitle>Education</CardTitle>
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
            resumeData.education.map((edu, index) => (
              <div
                key={edu.id}
                className="p-6 border-2 rounded-lg space-y-4 hover:border-primary/50 transition-all animate-in fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
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

      <Card className="border-2 hover:border-primary/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            <CardTitle>Projects</CardTitle>
          </div>
          <Button onClick={addProject} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.projects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No projects added yet. Showcase your portfolio!</p>
            </div>
          ) : (
            resumeData.projects.map((project, index) => (
              <div
                key={project.id}
                className="p-6 border-2 rounded-lg space-y-4 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label>Project Name</Label>
                      <Input
                        value={project.name}
                        onChange={(e) => updateProject(project.id, "name", e.target.value)}
                        placeholder="E-commerce Platform"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, "description", e.target.value)}
                        placeholder="Built a full-stack e-commerce platform with payment integration..."
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Technologies Used</Label>
                      <Input
                        value={project.technologies.join(", ")}
                        onChange={(e) =>
                          updateProject(
                            project.id,
                            "technologies",
                            e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          )
                        }
                        placeholder="React, Node.js, MongoDB, Stripe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Project Link (Optional)</Label>
                      <Input
                        value={project.link || ""}
                        onChange={(e) => updateProject(project.id, "link", e.target.value)}
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeProject(project.id)} className="ml-2">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <CardTitle>Achievements</CardTitle>
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
              <div
                key={achievement.id}
                className="p-6 border-2 rounded-lg space-y-4 hover:border-primary/50 transition-all"
              >
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
                    placeholder="Recognized for outstanding performance and leadership..."
                    rows={2}
                    className="resize-none"
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <CardTitle>Certifications</CardTitle>
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
              <div key={cert.id} className="p-6 border-2 rounded-lg space-y-4 hover:border-primary/50 transition-all">
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

      <Card className="border-2 hover:border-primary/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            <CardTitle>Skills</CardTitle>
          </div>
          <CardDescription>List your technical and soft skills</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={resumeData.skills.join(", ")}
            onChange={(e) =>
              onDataChange({
                ...resumeData,
                skills: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            placeholder="JavaScript, React, Node.js, Python, AWS, Git, Leadership, Communication..."
            rows={3}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">Separate skills with commas</p>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" />
            <CardTitle>Languages</CardTitle>
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
              <div
                key={lang.id}
                className="p-4 border-2 rounded-lg flex items-center gap-4 hover:border-primary/50 transition-all"
              >
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
