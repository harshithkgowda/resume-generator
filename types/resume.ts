export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin?: string
  portfolio?: string
  github?: string
}

export interface Experience {
  id: string
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  degree: string
  school: string
  location: string
  graduationDate: string
  gpa?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  date?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialId?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  startDate?: string
  endDate?: string
}

export interface Language {
  id: string
  name: string
  proficiency: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  about?: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  achievements: Achievement[]
  certifications: Certification[]
  projects: Project[]
  languages: Language[]
}

export interface Template {
  id: string
  name: string
  description: string
  atsScore: number
}
