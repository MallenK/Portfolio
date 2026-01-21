
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  role: string;
  year: string;
  image: string;
  link?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
