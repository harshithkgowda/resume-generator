"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean, traditional layout perfect for corporate roles",
    atsScore: 98,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with subtle styling",
    atsScore: 95,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated format for senior positions",
    atsScore: 97,
  },
  {
    id: "technical",
    name: "Technical",
    description: "Skills-focused layout for tech professionals",
    atsScore: 96,
  },
]

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <Card className="p-6 border-2 hover:border-primary/50 transition-colors">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Choose Template</h2>
          <p className="text-sm text-muted-foreground mt-1">Select an ATS-optimized template</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {templates.map((template, index) => (
            <Card
              key={template.id}
              className={cn(
                "relative p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] animate-in fade-in slide-in-from-bottom",
                selectedTemplate === template.id && "ring-2 ring-primary shadow-lg scale-[1.02]",
              )}
              style={{ animationDelay: `${index * 75}ms` }}
              onClick={() => onSelectTemplate(template.id)}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-primary flex items-center justify-center animate-in zoom-in">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-card-foreground">{template.name}</h3>
                  <Badge variant="secondary" className="text-xs font-mono">
                    {template.atsScore}%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{template.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  )
}
