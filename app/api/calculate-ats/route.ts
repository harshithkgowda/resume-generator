import { type NextRequest, NextResponse } from "next/server"
import type { ResumeData } from "@/types/resume"

async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options)
      if (response.ok) return response

      // If rate limited and retries left, wait and try again
      if (response.status === 429 && i < maxRetries - 1) {
        const waitTime = Math.pow(2, i) * 1000 // Exponential backoff: 1s, 2s, 4s
        console.log(`[v0] Rate limited, retrying in ${waitTime}ms...`)
        await new Promise((resolve) => setTimeout(resolve, waitTime))
        continue
      }

      return response
    } catch (error) {
      if (i === maxRetries - 1) throw error
      const waitTime = Math.pow(2, i) * 1000
      await new Promise((resolve) => setTimeout(resolve, waitTime))
    }
  }
  throw new Error("Max retries exceeded")
}

export async function POST(request: NextRequest) {
  try {
    const { resumeData } = (await request.json()) as { resumeData: ResumeData }

    const prompt = `Analyze this resume data and provide an ATS (Applicant Tracking System) compatibility score from 0-100, along with specific feedback and improvements.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

IMPORTANT: You MUST respond with ONLY valid JSON in this exact format, with no additional text before or after:
{
  "score": 85,
  "feedback": ["positive point 1", "positive point 2"],
  "improvements": ["improvement 1", "improvement 2"]
}

Consider these ATS factors:
- Clear contact information
- Relevant keywords and skills
- Proper formatting and structure
- Work experience with measurable achievements
- Education details
- Use of standard section headers
- Presence of relevant certifications and projects`

    const response = await fetchWithRetry("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-haiku",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("[v0] OpenRouter error:", errorBody)
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    let content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error("No content in API response")
    }

    console.log("[v0] Raw AI response:", content)

    // Try to extract JSON from markdown code blocks first
    const codeBlockMatch = content.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/)
    if (codeBlockMatch) {
      content = codeBlockMatch[1].trim()
    }

    // Remove any text before the first { or after the last }
    const firstBrace = content.indexOf("{")
    const lastBrace = content.lastIndexOf("}")
    if (firstBrace !== -1 && lastBrace !== -1) {
      content = content.substring(firstBrace, lastBrace + 1)
    }

    // Parse the cleaned JSON
    const result = JSON.parse(content)

    // Validate the result has required fields
    if (typeof result.score !== "number" || !Array.isArray(result.feedback) || !Array.isArray(result.improvements)) {
      throw new Error("Invalid response format from AI")
    }

    console.log("[v0] ATS calculation successful:", result.score)
    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] ATS calculation error:", error)
    return NextResponse.json({ error: "Failed to calculate ATS score. Please try again in a moment." }, { status: 500 })
  }
}
