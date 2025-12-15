"use client"

import { Card } from "@/components/ui/card"
import { TemplateSelector } from "@/components/template-selector"
import { ResumePreview } from "@/components/resume-preview"
import type { ResumeData } from "@/types/resume"

interface TemplatePreviewStepProps {
  resumeData: ResumeData
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

export function TemplatePreviewStep({ resumeData, selectedTemplate, onSelectTemplate }: TemplatePreviewStepProps) {
  return (
    <div className="space-y-6">
      <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={onSelectTemplate} />

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Live Preview</h3>
        <div className="bg-muted/30 rounded-lg p-4">
          <ResumePreview template={selectedTemplate} data={resumeData} />
        </div>
      </Card>
    </div>
  )
}
