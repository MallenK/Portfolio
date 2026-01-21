
import { Project, Experience, SkillGroup } from './types';

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'Ateneu Unió',
    category: 'Corporate / Gastronomy',
    description: 'Web profesional para restaurante histórico. Enfoque en UX de reserva y showcase visual de alta fidelidad.',
    stack: ['PHP', 'CodeIgniter', 'MySQL', 'JavaScript'],
    role: 'Full Stack Developer',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '02',
    title: 'Mapamundi Game',
    category: 'Interactive / Education',
    description: 'Juego geográfico interactivo con mecánicas de tiempo real y feedback dinámico para aprendizaje.',
    stack: ['React', 'Canvas API', 'Firebase', 'Tailwind'],
    role: 'Creative Developer',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '03',
    title: 'Peluquería Aura',
    category: 'SaaS / Appointment',
    description: 'Sistema integral de gestión de citas y CRM para negocios de estética con panel de administración.',
    stack: ['Angular', 'Node.js', 'Supabase', 'PostgreSQL'],
    role: 'Lead Developer',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '04',
    title: 'Cafeteras Review',
    category: 'Affiliation / E-commerce',
    description: 'Plataforma de reseñas técnica con integración de APIs de Amazon y análisis de productos.',
    stack: ['Angular', 'Express', 'MongoDB', 'Amazon API'],
    role: 'Full Stack Architect',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    company: 'Freelance / Creative Tech',
    role: 'Full Stack Web Developer',
    period: '2021 - Present',
    achievements: [
      'Desarrollo de soluciones E-commerce y SaaS personalizadas',
      'Implementación de sistemas de automatización con IA y Supabase',
      'Especialización en refactorización de código legacy a arquitecturas modernas'
    ]
  },
  {
    id: 'exp2',
    company: 'Proyectos Educativos',
    role: 'Mentor & Developer',
    period: '2020 - 2021',
    achievements: [
      'Creación de dashboards interactivos para seguimiento académico',
      'Desarrollo de herramientas internas para gestión de contenidos CMS',
      'Formación técnica en stacks modernos (React/Node)'
    ]
  }
];

export const SKILLS: SkillGroup[] = [
  {
    category: 'Frontend Core',
    skills: ['React', 'Angular', 'TypeScript', 'Tailwind CSS', 'GSAP']
  },
  {
    category: 'Backend & Data',
    skills: ['PHP (Symfony)', 'Node.js', 'Supabase', 'MySQL', 'API REST']
  },
  {
    category: 'Tools & DevOps',
    skills: ['Git', 'Docker', 'NPM/Composer', 'Postman', 'Vercel']
  },
  {
    category: 'Design & UX',
    skills: ['Figma', 'Prototypado', 'Micro-animaciones', 'Responsive Design']
  }
];

export const SERVICES = [
  {
    title: 'Custom Web Apps',
    desc: 'Desarrollo Full Stack desde la idea hasta el despliegue.',
    icon: '⚡'
  },
  {
    title: 'IA Integration',
    desc: 'Automatización y potenciación de negocios mediante LLMs.',
    icon: '🤖'
  },
  {
    title: 'Performance UX',
    desc: 'Optimización de velocidad y experiencia de usuario premium.',
    icon: '🎯'
  }
];
