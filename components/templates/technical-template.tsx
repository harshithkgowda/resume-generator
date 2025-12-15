import type { ResumeData } from "@/types/resume"
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react"

interface TemplateProps {
  data: ResumeData
}

export function TechnicalTemplate({ data }: TemplateProps) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const [year, month] = date.split("-")
    return `${month}/${year}`
  }

  return (
    <div className="space-y-5 font-mono text-sm">
      {/* Header */}
      <div className="bg-gray-100 p-4 rounded">
        <h1 className="text-2xl font-bold text-black mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-700">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1.5">
              <Github className="h-3.5 w-3.5" />
              <span>{data.personalInfo.github}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="h-3.5 w-3.5" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          {data.personalInfo.portfolio && (
            <div className="flex items-center gap-1.5 sm:col-span-2">
              <Globe className="h-3.5 w-3.5" />
              <span>{data.personalInfo.portfolio}</span>
            </div>
          )}
        </div>
      </div>

      {/* Skills - Prioritized for technical roles */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-black mb-2 uppercase flex items-center gap-2">
            <span className="text-gray-500">{">"}</span> Technical Skills
          </h2>
          <div className="pl-6 space-y-1">
            {data.skills.map((skill, idx) => (
              <div key={idx} className="text-xs text-gray-800">
                <span className="text-gray-500 mr-2">-</span>
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.about && (
        <div>
          <h2 className="text-base font-bold text-black mb-2 uppercase flex items-center gap-2">
            <span className="text-gray-500">{">"}</span> About
          </h2>
          <p className="text-xs text-gray-800 leading-relaxed pl-6">{data.about}</p>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div>
          <h2 className="text-base font-bold text-black mb-2 uppercase flex items-center gap-2">
            <span className="text-gray-500">{">"}</span> Summary
          </h2>
          <p className="text-xs text-gray-800 leading-relaxed pl-6">{data.summary}</p>
        </div>
      )}

      {data.projects.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-black mb-3 uppercase flex items-center gap-2">
            <span className="text-gray-500">{">"}</span> Projects
          </h2>
          <div className="space-y-3 pl-6">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-black text-sm">{project.name}</h3>
                <p className="text-xs text-gray-800 leading-relaxed mt-1">{project.description}</p>
                {project.technologies.length > 0 && (
                  <p className="text-xs text-gray-700 mt-1">
                    <span className="text-gray-500">Stack:</span> {project.technologies.join(", ")}
                  </p>
                )}
                {project.link && (
                  <p className="text-xs text-gray-700">
                    <span className="text-gray-500">URL:</span> {project.link}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-black mb-3 uppercase flex items-center gap-2">
            <span className="text-gray-500">{">"}</span> Experience
          </h2>
          <div className="space-y-4 pl-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="mb-1">
                  <h3 className="font-bold text-black text-sm">{exp.jobTitle}</h3>
                  <div className="flex justify-between items-baseline text-xs">
                    <p className="text-gray-700">
                      {exp.company} | {exp.location}
                    </p>
                    <p className="text-gray-600 whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                {exp.description && (
                  <div className="text-xs text-gray-800 leading-relaxed whitespace-pre-line mt-2">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-black mb-3 uppercase flex items-center gap-2">
            <span className="text-gray-500">{">"}</span> Education
          </h2>
          <div className="space-y-3 pl-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <h3 className="font-bold text-black">{edu.degree}</h3>
                <div className="flex justify-between items-baseline mt-0.5">
                  <p className="text-gray-700">
                    {edu.school} | {edu.location}
                  </p>
                  <p className="text-gray-600">{formatDate(edu.graduationDate)}</p>
                </div>
                {edu.gpa && <p className="text-gray-700 mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.certifications.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-black mb-3 uppercase flex items-center gap-2">
            <span className="text-gray-500">{">"}</span> Certifications
          </h2>
          <div className="space-y-2 pl-6">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="text-xs">
                <h3 className="font-bold text-black">{cert.name}</h3>
                <p className="text-gray-700">
                  {cert.issuer} | {formatDate(cert.date)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.languages.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-black mb-2 uppercase flex items-center gap-2">
            <span className="text-gray-500">{">"}</span> Languages
          </h2>
          <div className="pl-6 text-xs text-gray-800">
            {data.languages.map((lang) => `${lang.name} (${lang.proficiency})`).join(" | ")}
          </div>
        </div>
      )}
    </div>
  )
}
