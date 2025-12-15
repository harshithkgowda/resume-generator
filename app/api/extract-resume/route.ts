import { type NextRequest, NextResponse } from "next/server"

const OPENROUTER_API_KEY = "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"
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Validate URL format
    let validUrl: URL
    try {
      validUrl = new URL(url)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    const hostname = validUrl.hostname.toLowerCase()

    // Detect platform
    if (hostname.includes("github.com")) {
      return await extractFromGitHub(url)
    } else if (hostname.includes("linkedin.com")) {
      return await extractFromLinkedIn(url)
    } else {
      return NextResponse.json({ error: "Currently only GitHub and LinkedIn URLs are supported" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("[v0] Unexpected error:", error)
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred. Please try again." },
      { status: 500 },
    )
  }
}

async function extractFromGitHub(url: string) {
  try {
    // Extract username from URL (e.g., https://github.com/username)
    const username = url.split("github.com/")[1]?.split("/")[0]?.trim()

    if (!username) {
      return NextResponse.json({ error: "Invalid GitHub URL format" }, { status: 400 })
    }

    console.log("[v0] Fetching GitHub profile for:", username)

    // Fetch user data from GitHub API
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Resume-Builder-App",
      },
    })

    if (!userResponse.ok) {
      if (userResponse.status === 404) {
        return NextResponse.json({ error: "GitHub user not found" }, { status: 404 })
      }
      return NextResponse.json({ error: "Failed to fetch GitHub profile" }, { status: 500 })
    }

    const userData = await userResponse.json()

    // Fetch repositories to extract skills
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Resume-Builder-App",
      },
    })

    let repos = []
    if (reposResponse.ok) {
      repos = await reposResponse.json()
    }

    // Extract skills from languages used in repos
    const languages = new Set<string>()
    for (const repo of repos) {
      if (repo.language) {
        languages.add(repo.language)
      }
    }

    // Build resume data
    const extractedData = {
      personalInfo: {
        fullName: userData.name || username,
        email: userData.email || "",
        phone: "",
        location: userData.location || "",
        linkedin: "",
        portfolio: userData.blog || userData.html_url,
      },
      summary: userData.bio || "",
      experience: repos.slice(0, 5).map((repo: any, index: number) => ({
        id: `exp-${Date.now()}-${index}`,
        jobTitle: "Developer",
        company: repo.name,
        location: "GitHub",
        startDate: repo.created_at ? repo.created_at.slice(0, 7) : "",
        endDate: repo.updated_at ? repo.updated_at.slice(0, 7) : "",
        current: false,
        description: repo.description || `${repo.name} - ${repo.language || "Project"}`,
      })),
      education: [],
      skills: Array.from(languages),
    }

    console.log("[v0] GitHub extraction successful")
    return NextResponse.json({ data: extractedData })
  } catch (error: any) {
    console.error("[v0] GitHub extraction error:", error)
    return NextResponse.json({ error: `Failed to extract GitHub data: ${error.message}` }, { status: 500 })
  }
}

async function extractFromLinkedIn(url: string) {
  try {
    console.log("[v0] Fetching LinkedIn profile:", url)

    // Try to fetch the page
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "LinkedIn profile is not accessible. LinkedIn may block automated requests. Try GitHub instead." },
        { status: 403 },
      )
    }

    const html = await response.text()

    // Basic extraction using regex patterns (LinkedIn structure)
    const extractedData = {
      personalInfo: {
        fullName: extractWithRegex(html, /<title>([^|]+)\|/i) || "",
        email: "",
        phone: "",
        location: extractWithRegex(html, /"geoLocationName":"([^"]+)"/i) || "",
        linkedin: url,
        portfolio: "",
      },
      summary: extractWithRegex(html, /"summary":"([^"]+)"/i) || "",
      experience: [],
      education: [],
      skills: [],
    }

    console.log("[v0] LinkedIn extraction complete (limited data)")
    return NextResponse.json({ data: extractedData })
  } catch (error: any) {
    console.error("[v0] LinkedIn extraction error:", error)
    return NextResponse.json(
      {
        error:
          "LinkedIn profiles are protected and difficult to access. Please use GitHub or manually enter your information.",
      },
      { status: 500 },
    )
  }
}

function extractWithRegex(text: string, pattern: RegExp): string {
  const match = text.match(pattern)
  return match
    ? match[1].replace(/\\u[\dA-F]{4}/gi, (match) =>
        String.fromCharCode(Number.parseInt(match.replace(/\\u/g, ""), 16)),
      )
    : ""
}
