import type { ResumeData } from "@/types/resume"
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react"

interface TemplateProps {
  data: ResumeData
}

export function ExecutiveTemplate({ data }: TemplateProps) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const [year, month] = date.split("-")
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div className="space-y-6 font-serif">
      {/* Header */}
      <div className="pb-3">
        <h1 className="text-4xl font-bold text-black mb-4 tracking-tight">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-700">
          {data.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span>{data.personalInfo.github}</span>
            </div>
          )}
          {data.personalInfo.portfolio && (
            <div className="flex items-center gap-2 col-span-2">
              <Globe className="h-4 w-4" />
              <span>{data.personalInfo.portfolio}</span>
            </div>
          )}
        </div>
      </div>

      <div className="h-px bg-gray-900" />

      {data.about && (
        <div>
          <h2 className="text-sm font-bold text-black mb-3 uppercase tracking-widest">About</h2>
          <p className="text-sm text-gray-800 leading-relaxed font-sans">{data.about}</p>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div>
          <h2 className="text-sm font-bold text-black mb-3 uppercase tracking-widest">Executive Summary</h2>
          <p className="text-sm text-gray-800 leading-relaxed font-sans">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-black mb-4 uppercase tracking-widest">Professional Experience</h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="mb-2">
                  <h3 className="font-bold text-black text-base">{exp.jobTitle}</h3>
                  <div className="flex justify-between items-baseline mt-1">
                    <p className="text-sm text-gray-700 font-semibold">{exp.company}</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{exp.location}</p>
                </div>
                {exp.description && (
                  <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-sans">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-black mb-4 uppercase tracking-widest">Key Projects</h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-black">{project.name}</h3>
                <p className="text-sm text-gray-800 leading-relaxed font-sans mt-1">{project.description}</p>
                {project.technologies.length > 0 && (
                  <p className="text-sm text-gray-700 mt-1 font-sans">
                    <span className="font-semibold">Technologies:</span> {project.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.achievements.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-black mb-4 uppercase tracking-widest">Key Achievements</h2>
          <div className="space-y-2">
            {data.achievements.map((achievement) => (
              <div key={achievement.id}>
                <h3 className="font-bold text-black text-sm">{achievement.title}</h3>
                <p className="text-sm text-gray-800 font-sans">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-black mb-4 uppercase tracking-widest">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-bold text-black">{edu.degree}</h3>
                <div className="flex justify-between items-baseline mt-1">
                  <p className="text-sm text-gray-700">
                    {edu.school}, {edu.location}
                  </p>
                  <p className="text-sm text-gray-600">{formatDate(edu.graduationDate)}</p>
                </div>
                {edu.gpa && <p className="text-sm text-gray-700 mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.certifications.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-black mb-4 uppercase tracking-widest">Certifications</h2>
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-bold text-black text-sm">{cert.name}</h3>
                <p className="text-sm text-gray-700">
                  {cert.issuer} • {formatDate(cert.date)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-black mb-3 uppercase tracking-widest">Core Competencies</h2>
          <p className="text-sm text-gray-800 leading-relaxed font-sans">{data.skills.join(" | ")}</p>
        </div>
      )}

      {data.languages.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-black mb-3 uppercase tracking-widest">Languages</h2>
          <p className="text-sm text-gray-800 font-sans">
            {data.languages.map((lang) => `${lang.name} (${lang.proficiency})`).join(" | ")}
          </p>
        </div>
      )}
    </div>
  )
}
