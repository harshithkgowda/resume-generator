"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Download, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { ResumeData } from "@/types/resume"

interface AIImportProps {
  onDataExtracted: (data: ResumeData) => void
}

export function AIImport({ onDataExtracted }: AIImportProps) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleExtract = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL")
      return
    }

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      console.log("[v0] Starting extraction for URL:", url.trim())

      const response = await fetch("/api/extract-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.error("[v0] Non-JSON response received:", contentType)
        throw new Error("Server returned an invalid response. Please try again.")
      }

      const result = await response.json()
      console.log("[v0] Extraction result:", result)

      if (!response.ok) {
        throw new Error(result.error || "Failed to extract resume data")
      }

      if (!result.data) {
        throw new Error("No data received from server")
      }

      const sanitizedData = {
        personalInfo: result.data.personalInfo || {
          fullName: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          portfolio: "",
          github: "",
        },
        summary: result.data.summary || "",
        about: result.data.about || "",
        experience: Array.isArray(result.data.experience) ? result.data.experience : [],
        education: Array.isArray(result.data.education) ? result.data.education : [],
        skills: Array.isArray(result.data.skills) ? result.data.skills : [],
        achievements: Array.isArray(result.data.achievements) ? result.data.achievements : [],
        certifications: Array.isArray(result.data.certifications) ? result.data.certifications : [],
        projects: Array.isArray(result.data.projects) ? result.data.projects : [],
        languages: Array.isArray(result.data.languages) ? result.data.languages : [],
      }

      console.log("[v0] Sanitized data being passed to form:", sanitizedData)
      onDataExtracted(sanitizedData)
      setUrl("")
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      console.error("[v0] Extract error:", err)
      setError(err.message || "Failed to extract resume data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          <CardTitle>Import from Profile</CardTitle>
        </div>
        <CardDescription>Import your information from GitHub or LinkedIn profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profile-url">Profile URL</Label>
          <div className="flex gap-2">
            <Input
              id="profile-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/username"
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  handleExtract()
                }
              }}
            />
            <Button onClick={handleExtract} disabled={loading || !url.trim()} className="gap-2 min-w-[120px]">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Import
                </>
              )}
            </Button>
          </div>
        </div>

        {success && (
          <Alert className="border-green-500 bg-green-50 text-green-900">
            <AlertDescription>Profile data imported successfully! Scroll down to edit and customize.</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p className="font-medium">Supported platforms:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>GitHub profiles (github.com/username) - Extracts name, bio, location, and projects</li>
            <li>LinkedIn profiles - Limited data extraction due to platform restrictions</li>
          </ul>
          <p className="mt-2 text-amber-600 font-medium flex items-start gap-1">
            <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span>Note: GitHub provides the most complete data. LinkedIn has limited access.</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
