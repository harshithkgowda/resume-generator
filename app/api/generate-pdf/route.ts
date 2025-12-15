import { type NextRequest, NextResponse } from "next/server"
// import { jsPDF } from "jspdf"

export async function POST(request: NextRequest) {
  try {
    const { html } = await request.json()

    // Since we can't use Puppeteer in the browser environment,
    // we'll return instructions to use client-side PDF generation
    return NextResponse.json(
      {
        error: "Server-side PDF generation not available. Use client-side generation.",
      },
      { status: 501 },
    )

    // /** rest of code here **/
    // const { resumeData, template } = await request.json()

    // // Create PDF document
    // const doc = new jsPDF({
    //   orientation: "portrait",
    //   unit: "mm",
    //   format: "a4",
    // })

    // const pageWidth = doc.internal.pageSize.getWidth()
    // const pageHeight = doc.internal.pageSize.getHeight()
    // const margin = 15
    // const contentWidth = pageWidth - 2 * margin
    // let yPosition = margin

    // // Helper function to add text with wrapping
    // const addText = (text: string, fontSize: number, isBold = false, color: [number, number, number] = [0, 0, 0]) => {
    //   doc.setFontSize(fontSize)
    //   doc.setFont("helvetica", isBold ? "bold" : "normal")
    //   doc.setTextColor(color[0], color[1], color[2])

    //   const lines = doc.splitTextToSize(text, contentWidth)

    //   // Check if we need a new page
    //   if (yPosition + lines.length * fontSize * 0.35 > pageHeight - margin) {
    //     doc.addPage()
    //     yPosition = margin
    //   }

    //   doc.text(lines, margin, yPosition)
    //   yPosition += lines.length * fontSize * 0.35 + 2
    // }

    // const addSection = (title: string) => {
    //   yPosition += 3
    //   doc.setFillColor(59, 130, 246)
    //   doc.rect(margin, yPosition - 2, contentWidth, 0.5, "F")
    //   yPosition += 2
    //   addText(title, 12, true, [59, 130, 246])
    //   yPosition += 2
    // }

    // // Header - Name and Contact
    // doc.setFillColor(59, 130, 246)
    // doc.rect(0, 0, pageWidth, 35, "F")

    // doc.setTextColor(255, 255, 255)
    // doc.setFontSize(24)
    // doc.setFont("helvetica", "bold")
    // doc.text(resumeData.personalInfo.fullName || "Your Name", margin, 15)

    // doc.setFontSize(10)
    // doc.setFont("helvetica", "normal")
    // const contactInfo = [
    //   resumeData.personalInfo.email,
    //   resumeData.personalInfo.phone,
    //   resumeData.personalInfo.location,
    //   resumeData.personalInfo.linkedin,
    //   resumeData.personalInfo.github,
    // ]
    //   .filter(Boolean)
    //   .join(" • ")

    // doc.text(contactInfo, margin, 23)

    // yPosition = 40

    // // Professional Summary / About
    // if (resumeData.professionalSummary || resumeData.about) {
    //   addSection("PROFESSIONAL SUMMARY")
    //   addText(resumeData.professionalSummary || resumeData.about || "", 10)
    // }

    // // Skills
    // if (resumeData.skills?.length > 0) {
    //   addSection("SKILLS")
    //   const skillsText = resumeData.skills.join(" • ")
    //   addText(skillsText, 10)
    // }

    // // Work Experience
    // if (resumeData.workExperience?.length > 0) {
    //   addSection("WORK EXPERIENCE")
    //   resumeData.workExperience.forEach((exp) => {
    //     addText(exp.position, 11, true)
    //     addText(`${exp.company} | ${exp.startDate} - ${exp.endDate || "Present"}`, 9, false, [100, 100, 100])
    //     if (exp.description) {
    //       addText(exp.description, 9)
    //     }
    //     yPosition += 2
    //   })
    // }

    // // Projects
    // if (resumeData.projects?.length > 0) {
    //   addSection("PROJECTS")
    //   resumeData.projects.forEach((project) => {
    //     addText(project.name, 11, true)
    //     if (project.technologies) {
    //       addText(`Technologies: ${project.technologies}`, 9, false, [100, 100, 100])
    //     }
    //     if (project.description) {
    //       addText(project.description, 9)
    //     }
    //     if (project.link) {
    //       doc.setTextColor(59, 130, 246)
    //       addText(project.link, 9)
    //       doc.setTextColor(0, 0, 0)
    //     }
    //     yPosition += 2
    //   })
    // }

    // // Education
    // if (resumeData.education?.length > 0) {
    //   addSection("EDUCATION")
    //   resumeData.education.forEach((edu) => {
    //     addText(edu.degree, 11, true)
    //     addText(`${edu.school} | ${edu.year}`, 9, false, [100, 100, 100])
    //     yPosition += 2
    //   })
    // }

    // // Certifications
    // if (resumeData.certifications?.length > 0) {
    //   addSection("CERTIFICATIONS")
    //   resumeData.certifications.forEach((cert) => {
    //     addText(`${cert.name} - ${cert.issuer}`, 10)
    //     if (cert.date) {
    //       addText(cert.date, 9, false, [100, 100, 100])
    //     }
    //     yPosition += 1
    //   })
    // }

    // // Achievements
    // if (resumeData.achievements?.length > 0) {
    //   addSection("ACHIEVEMENTS")
    //   resumeData.achievements.forEach((achievement) => {
    //     addText(`• ${achievement.title}`, 10)
    //     if (achievement.description) {
    //       addText(`  ${achievement.description}`, 9, false, [100, 100, 100])
    //     }
    //     yPosition += 1
    //   })
    // }

    // // Languages
    // if (resumeData.languages?.length > 0) {
    //   addSection("LANGUAGES")
    //   const languagesText = resumeData.languages.map((lang) => `${lang.language} (${lang.proficiency})`).join(" • ")
    //   addText(languagesText, 10)
    // }

    // // Generate PDF as buffer
    // const pdfBuffer = doc.output("arraybuffer")

    // // Return PDF as downloadable file
    // return new NextResponse(pdfBuffer, {
    //   headers: {
    //     "Content-Type": "application/pdf",
    //     "Content-Disposition": `attachment; filename="${resumeData.personalInfo.fullName || "resume"}.pdf"`,
    //   },
    // })
  } catch (error) {
    console.error("[v0] PDF generation error:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
