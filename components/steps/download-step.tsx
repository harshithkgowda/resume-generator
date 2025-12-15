"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, CheckCircle, Printer } from "lucide-react"
import { ResumePreview } from "@/components/resume-preview"
import type { ResumeData } from "@/types/resume"

interface DownloadStepProps {
  resumeData: ResumeData
  selectedTemplate: string
}

export function DownloadStep({ resumeData, selectedTemplate }: DownloadStepProps) {
  const [success, setSuccess] = useState(false)

  const handleDownload = () => {
    // Trigger browser's print dialog which allows saving as PDF
    window.print()

    // Show success message
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
  }

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Your Resume is Ready!</CardTitle>
          <CardDescription>Preview and download your professional resume</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white rounded-lg p-6 border-2 print-section">
            <ResumePreview template={selectedTemplate} data={resumeData} />
          </div>

          {success && (
            <Alert className="border-green-500 bg-green-50 no-print">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Print dialog opened! Select "Save as PDF" to download your resume.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4 no-print">
            <Button onClick={handleDownload} size="lg" className="w-full gap-2">
              <Download className="h-5 w-5" />
              Download Resume as PDF
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Printer className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-blue-900">How to download:</p>
                  <ol className="list-decimal list-inside space-y-1 text-blue-800">
                    <li>Click the "Download Resume as PDF" button above</li>
                    <li>In the print dialog, select "Save as PDF" as the destination</li>
                    <li>Click "Save" to download your resume</li>
                  </ol>
                </div>
              </div>
            </div>

            <p className="text-sm text-center text-muted-foreground">
              Click "Next" after downloading to get your ATS compatibility score
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
