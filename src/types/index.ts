// Portfolio data types
export interface Skill {
  name: string
  level: number
}

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  live: string
}

export interface Certification {
  id: number
  name: string
  issuer: string
  date: string
  expiry?: string
  credentialId?: string
  credentialUrl?: string
  skills: string[]
}

export interface Experience {
  id: number
  title: string
  company: string
  duration: string
  description: string
  type: 'internship' | 'hackathon' | 'freelance'
}

export interface PortfolioData {
  name: string
  title: string
  subtitle: string
  bio: string
  email: string
  phone: string
  location: string
  github: string
  linkedin: string
  twitter: string
}

export interface SkillCategory {
  [key: string]: Skill[]
}
