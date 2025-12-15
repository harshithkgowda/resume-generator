import type { ResumeData } from "@/types/resume"
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react"

interface TemplateProps {
  data: ResumeData
}

export function ModernTemplate({ data }: TemplateProps) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const [year, month] = date.split("-")
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div className="space-y-5 font-sans">
      {/* Header */}
      <div className="text-center pb-4 border-b border-gray-300">
        <h1 className="text-4xl font-bold text-black mb-3">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="h-4 w-4" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1.5">
              <Github className="h-4 w-4" />
              <span>{data.personalInfo.github}</span>
            </div>
          )}
          {data.personalInfo.portfolio && (
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              <span>{data.personalInfo.portfolio}</span>
            </div>
          )}
        </div>
      </div>

      {data.about && (
        <div>
          <h2 className="text-base font-bold text-black mb-2 pb-1 border-b border-gray-300">ABOUT</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{data.about}</p>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div>
          <h2 className="text-base font-bold text-black mb-2 pb-1 border-b border-gray-300">SUMMARY</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-black mb-3 pb-1 border-b border-gray-300">EXPERIENCE</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-black text-base">{exp.jobTitle}</h3>
                  <p className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                <p className="text-sm text-gray-600 italic mb-2">
                  {exp.company}, {exp.location}
                </p>
                {exp.description && (
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-black mb-3 pb-1 border-b border-gray-300">PROJECTS</h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-black">{project.name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mt-1">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                        {tech}
                      </span>
                    ))}
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
          <h2 className="text-base font-bold text-black mb-3 pb-1 border-b border-gray-300">EDUCATION</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div className="flex-1">
                    <h3 className="font-semibold text-black text-base">{edu.degree}</h3>
                    <p className="text-sm text-gray-600 italic">
                      {edu.school}, {edu.location}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 whitespace-nowrap ml-4">{formatDate(edu.graduationDate)}</p>
                </div>
                {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.certifications.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-black mb-3 pb-1 border-b border-gray-300">CERTIFICATIONS</h2>
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-semibold text-black text-sm">{cert.name}</h3>
                <p className="text-sm text-gray-600">
                  {cert.issuer} • {formatDate(cert.date)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.achievements.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-black mb-3 pb-1 border-b border-gray-300">ACHIEVEMENTS</h2>
          <div className="space-y-2">
            {data.achievements.map((achievement) => (
              <div key={achievement.id}>
                <h3 className="font-semibold text-black text-sm">{achievement.title}</h3>
                <p className="text-sm text-gray-700">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-black mb-2 pb-1 border-b border-gray-300">SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.languages.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-black mb-2 pb-1 border-b border-gray-300">LANGUAGES</h2>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((lang) => (
              <span key={lang.id} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                {lang.name} • {lang.proficiency}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
