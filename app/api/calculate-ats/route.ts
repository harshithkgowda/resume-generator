import { type NextRequest, NextResponse } from "next/server"
import type { ResumeData } from "@/types/resume"

function calculateFallbackATS(resumeData: ResumeData) {
  let score = 0
  const feedback: string[] = []
  const improvements: string[] = []

  // Contact info (20 points)
  if (resumeData.personalInfo.fullName) {
    score += 5
    feedback.push("Has full name")
  }
  if (resumeData.personalInfo.email) {
    score += 5
    feedback.push("Has email contact")
  }
  if (resumeData.personalInfo.phone) {
    score += 5
    feedback.push("Has phone number")
  }
  if (resumeData.personalInfo.location) {
    score += 5
    feedback.push("Has location")
  } else {
    improvements.push("Add location to increase ATS visibility")
  }

  // Summary (10 points)
  if (resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 50) {
    score += 10
    feedback.push("Has a professional summary")
  } else {
    improvements.push("Add a detailed professional summary (50+ characters)")
  }

  // Experience (25 points)
  if (resumeData.experience.length > 0) {
    score += 10
    feedback.push(`Has ${resumeData.experience.length} work experience entries`)
    if (resumeData.experience.some((exp) => exp.description && exp.description.length > 50)) {
      score += 15
      feedback.push("Work experiences have detailed descriptions")
    } else {
      improvements.push("Add detailed descriptions to work experience with achievements")
    }
  } else {
    improvements.push("Add work experience entries")
  }

  // Skills (15 points)
  if (resumeData.skills.length >= 5) {
    score += 15
    feedback.push(`Has ${resumeData.skills.length} skills listed`)
  } else if (resumeData.skills.length > 0) {
    score += 8
    improvements.push("Add more skills (aim for 5+)")
  } else {
    improvements.push("Add relevant skills")
  }

  // Education (15 points)
  if (resumeData.education.length > 0) {
    score += 15
    feedback.push("Has education details")
  } else {
    improvements.push("Add education information")
  }

  // Projects (10 points)
  if (resumeData.projects && resumeData.projects.length > 0) {
    score += 10
    feedback.push(`Has ${resumeData.projects.length} projects showcased`)
  } else {
    improvements.push("Add projects to demonstrate practical skills")
  }

  // Certifications (5 points)
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    score += 5
    feedback.push("Has professional certifications")
  } else {
    improvements.push("Consider adding relevant certifications")
  }

  return { score: Math.min(score, 100), feedback, improvements }
}

export async function POST(request: NextRequest) {
  try {
    const { resumeData } = (await request.json()) as { resumeData: ResumeData }

    const prompt = `You are an ATS (Applicant Tracking System) analyzer. Analyze this resume and return ONLY a JSON object with no additional text.

Resume:
- Name: ${resumeData.personalInfo.fullName || "Not provided"}
- Email: ${resumeData.personalInfo.email || "Not provided"}
- Phone: ${resumeData.personalInfo.phone || "Not provided"}
- Location: ${resumeData.personalInfo.location || "Not provided"}
- Summary: ${resumeData.personalInfo.summary || "Not provided"}
- Skills: ${resumeData.skills.join(", ") || "None"}
- Experience: ${resumeData.experience.length} entries
- Education: ${resumeData.education.length} entries
- Projects: ${resumeData.projects?.length || 0} entries
- Certifications: ${resumeData.certifications?.length || 0} entries

Return this exact JSON format:
{"score": <number 0-100>, "feedback": ["strength1", "strength2", "strength3"], "improvements": ["improvement1", "improvement2", "improvement3"]}`

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an ATS analyzer. Always respond with ONLY valid JSON, no markdown, no explanation.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.1,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.log("[v0] OpenRouter error, using fallback:", errorBody)
      return NextResponse.json(calculateFallbackATS(resumeData))
    }

    const data = await response.json()
    let content = data.choices?.[0]?.message?.content

    if (!content) {
      console.log("[v0] No content in response, using fallback")
      return NextResponse.json(calculateFallbackATS(resumeData))
    }

    // Clean the response
    content = content.trim()

    // Remove markdown code blocks
    if (content.includes("```")) {
      const match = content.match(/```(?:json)?\s*([\s\S]*?)```/)
      if (match) content = match[1].trim()
    }

    // Extract JSON object
    const firstBrace = content.indexOf("{")
    const lastBrace = content.lastIndexOf("}")
    if (firstBrace !== -1 && lastBrace !== -1) {
      content = content.substring(firstBrace, lastBrace + 1)
    }

    try {
      const result = JSON.parse(content)

      if (typeof result.score !== "number" || !Array.isArray(result.feedback) || !Array.isArray(result.improvements)) {
        console.log("[v0] Invalid format, using fallback")
        return NextResponse.json(calculateFallbackATS(resumeData))
      }

      return NextResponse.json(result)
    } catch (parseError) {
      console.log("[v0] JSON parse failed, using fallback:", parseError)
      return NextResponse.json(calculateFallbackATS(resumeData))
    }
  } catch (error) {
    console.error("[v0] ATS calculation error:", error)
    try {
      const { resumeData } = await request.clone().json()
      return NextResponse.json(calculateFallbackATS(resumeData))
    } catch {
      return NextResponse.json({
        score: 50,
        feedback: ["Resume submitted for analysis"],
        improvements: ["Add more details to improve your score"],
      })
    }
  }
}
