"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Code, FolderOpen } from "lucide-react"
import type { ResumeData, Project } from "@/types/resume"

interface SkillsProjectsStepProps {
  resumeData: ResumeData
  onDataChange: (data: ResumeData) => void
}

export function SkillsProjectsStep({ resumeData, onDataChange }: SkillsProjectsStepProps) {
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
    onDataChange({
      ...resumeData,
      projects: resumeData.projects.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-2">
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
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">Separate skills with commas</p>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Showcase your portfolio</CardDescription>
            </div>
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
              <p className="text-sm">No projects added yet. Showcase your work!</p>
            </div>
          ) : (
            resumeData.projects.map((project) => (
              <div key={project.id} className="p-6 border-2 rounded-lg space-y-4">
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
    </div>
  )
}
