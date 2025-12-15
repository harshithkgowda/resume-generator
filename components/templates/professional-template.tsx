import type { ResumeData } from "@/types/resume"
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react"

interface TemplateProps {
  data: ResumeData
}

export function ProfessionalTemplate({ data }: TemplateProps) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const [year, month] = date.split("-")
    return `${month}/${year}`
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold text-black mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-3.5 w-3.5" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="h-3.5 w-3.5" />
              <span>{data.personalInfo.github}</span>
            </div>
          )}
          {data.personalInfo.portfolio && (
            <div className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" />
              <span>{data.personalInfo.portfolio}</span>
            </div>
          )}
        </div>
      </div>

      {data.about && (
        <div>
          <h2 className="text-lg font-bold text-black mb-2 uppercase tracking-wide">About</h2>
          <p className="text-sm text-gray-800 leading-relaxed">{data.about}</p>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div>
          <h2 className="text-lg font-bold text-black mb-2 uppercase tracking-wide">Professional Summary</h2>
          <p className="text-sm text-gray-800 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">Work Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-black">{exp.jobTitle}</h3>
                    <p className="text-sm text-gray-700">
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                {exp.description && (
                  <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">Projects</h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-black">{project.name}</h3>
                <p className="text-sm text-gray-800 leading-relaxed mt-1">{project.description}</p>
                {project.technologies.length > 0 && (
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-semibold">Technologies:</span> {project.technologies.join(", ")}
                  </p>
                )}
                {project.link && (
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Link:</span> {project.link}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-black">{edu.degree}</h3>
                    <p className="text-sm text-gray-700">
                      {edu.school} • {edu.location}
                    </p>
                  </div>
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
          <h2 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">Certifications</h2>
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-bold text-black">{cert.name}</h3>
                <p className="text-sm text-gray-700">
                  {cert.issuer} • {formatDate(cert.date)}
                  {cert.credentialId && ` • ID: ${cert.credentialId}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.achievements.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">Achievements</h2>
          <div className="space-y-2">
            {data.achievements.map((achievement) => (
              <div key={achievement.id}>
                <h3 className="font-bold text-black">{achievement.title}</h3>
                <p className="text-sm text-gray-800">{achievement.description}</p>
                {achievement.date && <p className="text-sm text-gray-600">{formatDate(achievement.date)}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-black mb-2 uppercase tracking-wide">Skills</h2>
          <p className="text-sm text-gray-800 leading-relaxed">{data.skills.join(" • ")}</p>
        </div>
      )}

      {data.languages.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-black mb-2 uppercase tracking-wide">Languages</h2>
          <p className="text-sm text-gray-800">
            {data.languages.map((lang) => `${lang.name} (${lang.proficiency})`).join(" • ")}
          </p>
        </div>
      )}
    </div>
  )
}
