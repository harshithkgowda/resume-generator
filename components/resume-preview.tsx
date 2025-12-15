import { Card } from "@/components/ui/card"
import { ProfessionalTemplate } from "@/components/templates/professional-template"
import { ModernTemplate } from "@/components/templates/modern-template"
import { ExecutiveTemplate } from "@/components/templates/executive-template"
import { TechnicalTemplate } from "@/components/templates/technical-template"
import type { ResumeData } from "@/types/resume"

interface ResumePreviewProps {
  template: string
  data: ResumeData
}

export function ResumePreview({ template, data }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case "professional":
        return <ProfessionalTemplate data={data} />
      case "modern":
        return <ModernTemplate data={data} />
      case "executive":
        return <ExecutiveTemplate data={data} />
      case "technical":
        return <TechnicalTemplate data={data} />
      default:
        return <ProfessionalTemplate data={data} />
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between no-print">
        <h3 className="text-sm font-medium text-muted-foreground">Live Preview</h3>
        <div className="text-xs text-muted-foreground">Updates in real-time</div>
      </div>
      <Card
        id="resume-print-area"
        className="p-8 bg-white text-black print:shadow-none print:border-0 shadow-xl animate-in fade-in slide-in-from-bottom duration-500"
      >
        {renderTemplate()}
      </Card>
    </div>
  )
}
