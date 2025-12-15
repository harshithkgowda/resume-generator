"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface ATSScoreStepProps {
  resumeData: ResumeData
  selectedTemplate: string
}

interface ATSResult {
  score: number
  feedback: string[]
  improvements: string[]
}

export function ATSScoreStep({ resumeData }: ATSScoreStepProps) {
  const [loading, setLoading] = useState(false)
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    calculateATSScore()
  }, [])

  const calculateATSScore = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/calculate-ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData }),
      })

      if (!response.ok) {
        throw new Error("Failed to calculate ATS score")
      }

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      setAtsResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to calculate ATS score. Please try again.")
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {loading ? (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-medium">Analyzing your resume with AI...</p>
            <p className="text-sm text-muted-foreground">This may take a few seconds</p>
          </div>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button onClick={calculateATSScore} className="w-full mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : atsResult ? (
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">ATS Score Analysis</CardTitle>
            <CardDescription>How well your resume performs with Applicant Tracking Systems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-7xl font-bold mb-2 ${getScoreColor(atsResult.score)}`}>
                {atsResult.score}
                <span className="text-3xl">/100</span>
              </div>
              <Progress value={atsResult.score} className="h-4 mt-4" />
              <p className="text-muted-foreground mt-4">
                {atsResult.score >= 80
                  ? "Excellent! Your resume is highly optimized for ATS."
                  : atsResult.score >= 60
                    ? "Good! Some improvements could boost your score."
                    : "Needs work. Follow the suggestions below to improve."}
              </p>
            </div>

            {atsResult.feedback.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  What's Working Well
                </h3>
                <ul className="space-y-2">
                  {atsResult.feedback.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {atsResult.improvements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  Suggested Improvements
                </h3>
                <ul className="space-y-2">
                  {atsResult.improvements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
