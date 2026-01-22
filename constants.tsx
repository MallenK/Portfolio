
import { PortfolioContent } from './types';

// Datos comunes (imágenes, stacks técnicos que no requieren traducción)
const IMAGES = {
  schneider: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
  myker: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
  ateneu: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  cafeteras: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200'
};

const COMMON_SKILLS = [
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Next.js']
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'PHP', 'MySQL', 'PostgreSQL', 'API REST', 'Supabase']
  },
  {
    category: 'Infraestructura & Producto',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'CI/CD', 'Agile']
  },
  {
    category: 'IA & Automatización',
    skills: ['Integración LLM', 'Chatbots', 'Automatización', 'Prompt Engineering', 'Data Analysis']
  }
];

export const SOCIAL_LINKS = {
  email: 'sergimallenweb@gmail.com',
  linkedin: 'https://linkedin.com/in/mallenk',
  github: 'https://github.com/MallenK'
};

export const TRANSLATIONS: Record<'es' | 'en' | 'cat', PortfolioContent> = {
  es: {
    nav: { projects: 'Proyectos', about: 'Perfil', contact: 'Contacto' },
    hero: {
      subtitle: 'Full Stack Developer • MallenK • AI Integration',
      cta: 'Ver Proyectos',
      scroll: 'Scroll to Explore'
    },
    about: {
      label: 'Profile / 01',
      title: 'Desarrollador Full Stack enfocado en construir',
      highlight: 'PRODUCTOS ESCALABLES',
      p1: 'y sistemas automatizados para mejorar la productividad de mis clientes.',
      p2: 'Combino la solidez del desarrollo Enterprise con la agilidad del ecosistema freelance. Especializado en crear arquitecturas robustas que resuelven problemas de negocio reales.'
    },
    services: {
      label: 'Core / 02',
      title: 'Servicios',
      items: [
        { title: 'Web Corporativa Premium', desc: 'Desarrollo de webs profesionales orientadas a conversión y marca.', icon: '💎' },
        { title: 'SaaS & Apps a Medida', desc: 'Construcción de plataformas escalables y productos digitales.', icon: '🚀' },
        { title: 'Automatización Procesos', desc: 'Optimización de flujos internos y sistemas empresariales.', icon: '⚙️' },
        { title: 'Integración IA', desc: 'Chatbots, análisis de datos y asistentes inteligentes.', icon: '🧠' },
        { title: 'Consultoría y Auditoría Web', desc: 'Análisis técnico, evaluación de rendimiento y arquitectura, auditoría de experiencia de usuario y definición de planes de mejora con recomendaciones accionables para productos digitales.', icon: '🔍' },
        { title: 'Clases Programación/IA', desc: 'Sesiones prácticas personalizadas para aprender programación e inteligencia artificial.', icon: '🎓' }
      ]
    },
    projects: {
      label: 'Portfolio / 03',
      title: 'Proyectos',
      items: [
        {
          id: '01', title: 'Schneider Electric', category: 'Enterprise / Industria', year: '2024', role: 'Full Stack Engineer', image: IMAGES.schneider, stack: ['PHP', 'CodeIgniter', 'MySQL', 'Git', 'Postman', 'Docker'],
          description: 'Mantenimiento y evolución de plataforma industrial en entorno corporativo internacional. Desarrollo full-stack crítico en producción.'
        },
        {
          id: '02', title: 'Myker Academy', category: 'Corporativo / EdTech', year: '2025', role: 'Lead Developer', image: IMAGES.myker, stack: ['Google AI Studio', 'React', 'TypeScript', 'Tailwind', 'npm', 'SEO'],
          description: 'Diseño y desarrollo de web corporativa para escuela de idiomas con enfoque en captación de leads y posicionamiento de marca.'
        },
        {
          id: '03', title: 'Ateneu Unió', category: 'Negocio / Gastronomía', year: '2023', role: 'Full Stack Developer', image: IMAGES.ateneu, stack: ['HTML', 'CSS', 'JavaScript', 'Figma', 'SEO'],
          description: 'Web corporativa para restaurante histórico local. Diseño responsive de alta fidelidad y optimización para conversión de reservas.'
        },
        {
          id: '04', title: 'AI Exam Assistant', category: 'Asistente IA / Producto', year: '2024', role: 'Product Engineer', image: IMAGES.ai, stack: ['GPT', 'OpenAI API'],
          description: 'Asistente de estudio inteligente capaz de generar exámenes y resúmenes personalizados a partir de documentos subidos por el usuario.'
        },
        {
          id: '05', title: 'Cafeteras Review', category: 'Producto Personal / SEO', year: '2024', role: 'Founder & Dev', image: IMAGES.cafeteras, stack: ['Amazon API', 'Google AI Studio', 'Supabase', 'Angular', 'Vercel'],
          description: 'Plataforma de comparación y afiliación desarrollada como producto propio. Enfocada en SEO programático y rendimiento.'
        }
      ]
    },
    skills: {
      label: 'Stack / 04',
      intro: 'Arquitectura',
      introHighlight1: 'Full Stack',
      introHighlight2: 'Automatización e IA',
      items: COMMON_SKILLS
    },
    experience: {
      label: 'History / 05',
      items: [
        {
          id: 'exp1', company: 'Schneider Electric', role: 'Full Stack Web Developer', period: 'Actualidad',
          achievements: ['Mantenimiento y evolución de plataforma web industrial crítica', 'Desarrollo Full Stack en entorno Enterprise internacional', 'Gestión de incidencias y optimización de rendimiento en producción']
        },
        {
          id: 'exp2', company: 'Freelance & Consultant', role: 'Product Engineer', period: '2021 - Present',
          achievements: ['Desarrollo de webs corporativas premium y soluciones SaaS', 'Implementación de automatizaciones de negocio e integración de IA', 'Auditoría técnica y refactorización de sistemas legacy']
        }
      ]
    },
    contact: {
      label: 'Collaborate / 06',
      freelanceLabel: 'Freelance & Enterprise',
      socialLabel: 'Social',
      formName: 'Tu Nombre',
      formIdea: 'Proyecto / Idea',
      btn: 'Enviar Solicitud',
      footerText: 'Sergi Mallén © 2024',
      footerLoc: 'Basado en Colònia Güell, Barcelona',
      footerRole: 'Full Stack Logic'
    }
  },
  cat: {
    nav: { projects: 'Projectes', about: 'Perfil', contact: 'Contacte' },
    hero: {
      subtitle: 'Full Stack Developer • MallenK • AI Integration',
      cta: 'Veure Projectes',
      scroll: 'Scroll to Explore'
    },
    about: {
      label: 'Perfil / 01',
      title: 'Desenvolupador Full Stack enfocat en construir',
      highlight: 'PRODUCTES ESCALABLES',
      p1: 'i sistemes automatitzats per millorar la productivitat dels meus clients.',
      p2: 'Combino la solidesa del desenvolupament Enterprise amb l\'agilitat de l\'ecosistema freelance. Especialitzat en crear arquitectures robustes que resolen problemes de negoci reals.'
    },
    services: {
      label: 'Core / 02',
      title: 'Serveis',
      items: [
        { title: 'Web Corporativa Premium', desc: 'Desenvolupament de webs professionals orientades a conversió i marca.', icon: '💎' },
        { title: 'SaaS & Apps a Mida', desc: 'Construcció de plataformes escalables i productes digitals.', icon: '🚀' },
        { title: 'Automatització Processos', desc: 'Optimització de fluxos interns i sistemes empresarials.', icon: '⚙️' },
        { title: 'Integració IA', desc: 'Chatbots, anàlisi de dades i assistents intel·ligents.', icon: '🧠' },
        { title: 'Consultoria i Auditoria Web', desc: 'Anàlisi tècnic, avaluació de rendiment i arquitectura, auditoria d\'experiència d\'usuari i definició de plans de millora amb recomanacions accionables per a productes digitals.', icon: '🔍' },
        { title: 'Classes Programació/IA', desc: 'Sessions pràctiques personalitzades per aprendre programació i intel·ligència artificial.', icon: '🎓' }
      ]
    },
    projects: {
      label: 'Portfolio / 03',
      title: 'Projectes',
      items: [
        {
          id: '01', title: 'Schneider Electric', category: 'Enterprise / Indústria', year: '2024', role: 'Full Stack Engineer', image: IMAGES.schneider, stack: ['PHP', 'CodeIgniter', 'MySQL', 'Git', 'Postman', 'Docker'],
          description: 'Manteniment i evolució de plataforma industrial en entorn corporatiu internacional. Desenvolupament full-stack crític en producció.'
        },
        {
          id: '02', title: 'Myker Academy', category: 'Corporatiu / EdTech', year: '2025', role: 'Lead Developer', image: IMAGES.myker, stack: ['Google AI Studio', 'React', 'TypeScript', 'Tailwind', 'npm', 'SEO'],
          description: 'Disseny, desenvolupament i manteniment de web corporativa per a escola d\'idiomes amb enfocament en captació de leads i posicionament de marca.'
        },
        {
          id: '03', title: 'Ateneu Unió', category: 'Negoci / Gastronomia', year: '2023', role: 'Full Stack Developer', image: IMAGES.ateneu, stack: ['HTML', 'CSS', 'JavaScript', 'Figma', 'SEO'],
          description: 'Web corporativa per a restaurant històric local. Disseny responsive d\'alta fidelitat i optimització per a conversió de reserves.'
        },
        {
          id: '04', title: 'AI Exam Assistant', category: 'Assistent IA / Producte', year: '2024', role: 'Product Engineer', image: IMAGES.ai, stack: ['GPT', 'OpenAI API'],
          description: 'Assistent d\'estudi intel·ligent capaç de generar exàmens i resums personalitzats a partir de documents pujats per l\'usuari.'
        },
        {
          id: '05', title: 'Cafeteras Review', category: 'Producte Personal / SEO', year: '2024', role: 'Founder & Dev', image: IMAGES.cafeteras, stack: ['Amazon API', 'Google AI Studio', 'Supabase', 'Angular', 'Vercel'],
          description: 'Plataforma de comparació i afiliació desenvolupada com a producte propi. Enfocada en SEO programàtic i rendiment.'
        }
      ]
    },
    skills: {
      label: 'Stack / 04',
      intro: 'Arquitectura',
      introHighlight1: 'Full Stack',
      introHighlight2: 'Automatització i IA',
      items: COMMON_SKILLS
    },
    experience: {
      label: 'History / 05',
      items: [
        {
          id: 'exp1', company: 'Schneider Electric', role: 'Full Stack Web Developer', period: 'Actualitat',
          achievements: ['Manteniment i evolució de plataforma web industrial crítica', 'Desenvolupament Full Stack en entorn Enterprise internacional', 'Gestió d\'incidències i optimització de rendiment en producció']
        },
        {
          id: 'exp2', company: 'Freelance & Consultant', role: 'Product Engineer', period: '2021 - Present',
          achievements: ['Desenvolupament de webs corporatives premium i solucions SaaS', 'Implementació d\'automatitzacions de negoci i integració d\'IA', 'Auditoria tècnica i refactorització de sistemes legacy']
        }
      ]
    },
    contact: {
      label: 'Collaborate / 06',
      freelanceLabel: 'Freelance & Enterprise',
      socialLabel: 'Social',
      formName: 'El teu Nom',
      formIdea: 'Projecte / Idea',
      btn: 'Enviar Sol·licitud',
      footerText: 'Sergi Mallén © 2024',
      footerLoc: 'Basat a Colònia Güell, Barcelona',
      footerRole: 'Full Stack Logic'
    }
  },
  en: {
    nav: { projects: 'Projects', about: 'Profile', contact: 'Contact' },
    hero: {
      subtitle: 'Full Stack Developer • MallenK • AI Integration',
      cta: 'View Projects',
      scroll: 'Scroll to Explore'
    },
    about: {
      label: 'Profile / 01',
      title: 'Full Stack Developer focused on building',
      highlight: 'SCALABLE PRODUCTS',
      p1: 'and automated systems to improve my clients\' productivity.',
      p2: 'I combine the solidity of Enterprise development with the agility of the freelance ecosystem. Specialized in creating robust architectures that solve real business problems.'
    },
    services: {
      label: 'Core / 02',
      title: 'Services',
      items: [
        { title: 'Premium Corporate Web', desc: 'Development of professional websites focused on conversion and branding.', icon: '💎' },
        { title: 'SaaS & Custom Apps', desc: 'Construction of scalable platforms and digital products.', icon: '🚀' },
        { title: 'Process Automation', desc: 'Optimization of internal workflows and business systems.', icon: '⚙️' },
        { title: 'AI Integration', desc: 'Chatbots, data analysis, and intelligent assistants.', icon: '🧠' },
        { title: 'Web Consulting & Audit', desc: 'Technical analysis, performance and architecture evaluation, UX audit, and definition of improvement plans with actionable recommendations for digital products.', icon: '🔍' },
        { title: 'Coding/AI Mentoring', desc: 'Personalized practical sessions to learn programming and artificial intelligence.', icon: '🎓' }
      ]
    },
    projects: {
      label: 'Portfolio / 03',
      title: 'Projects',
      items: [
        {
          id: '01', title: 'Schneider Electric', category: 'Enterprise / Industry', year: '2024', role: 'Full Stack Engineer', image: IMAGES.schneider, stack: ['PHP', 'CodeIgniter', 'MySQL', 'Git', 'Postman', 'Docker'],
          description: 'Maintenance and evolution of industrial platform in international corporate environment. Critical full-stack development in production.'
        },
        {
          id: '02', title: 'Myker Academy', category: 'Corporate / EdTech', year: '2025', role: 'Lead Developer', image: IMAGES.myker, stack: ['Google AI Studio', 'React', 'TypeScript', 'Tailwind', 'npm', 'SEO'],
          description: 'Design and development of corporate website for language school focused on lead generation and brand positioning.'
        },
        {
          id: '03', title: 'Ateneu Unió', category: 'Business / Gastronomy', year: '2023', role: 'Full Stack Developer', image: IMAGES.ateneu, stack: ['HTML', 'CSS', 'JavaScript', 'Figma', 'SEO'],
          description: 'Corporate website for historic local restaurant. High-fidelity responsive design and optimization for reservation conversion.'
        },
        {
          id: '04', title: 'AI Exam Assistant', category: 'AI Assistant / Product', year: '2024', role: 'Product Engineer', image: IMAGES.ai, stack: ['GPT', 'OpenAI API'],
          description: 'Intelligent study assistant capable of generating personalized exams and summaries from user-uploaded documents.'
        },
        {
          id: '05', title: 'Cafeteras Review', category: 'Personal Product / SEO', year: '2024', role: 'Founder & Dev', image: IMAGES.cafeteras, stack: ['Amazon API', 'Google AI Studio', 'Supabase', 'Angular', 'Vercel'],
          description: 'Comparison and affiliation platform developed as own product. Focused on programmatic SEO and performance.'
        }
      ]
    },
    skills: {
      label: 'Stack / 04',
      intro: 'Solid',
      introHighlight1: 'Full Stack Architecture',
      introHighlight2: 'Automation & AI',
      items: COMMON_SKILLS
    },
    experience: {
      label: 'History / 05',
      items: [
        {
          id: 'exp1', company: 'Schneider Electric', role: 'Full Stack Web Developer', period: 'Present',
          achievements: ['Maintenance and evolution of critical industrial web platform', 'Full Stack Development in international Enterprise environment', 'Incident management and performance optimization in production']
        },
        {
          id: 'exp2', company: 'Freelance & Consultant', role: 'Product Engineer', period: '2021 - Present',
          achievements: ['Development of premium corporate websites and SaaS solutions', 'Implementation of business automations and AI integration', 'Technical audit and legacy system refactoring']
        }
      ]
    },
    contact: {
      label: 'Collaborate / 06',
      freelanceLabel: 'Freelance & Enterprise',
      socialLabel: 'Social',
      formName: 'Your Name',
      formIdea: 'Project / Idea',
      btn: 'Send Request',
      footerText: 'Sergi Mallén © 2024',
      footerLoc: 'Based in Colònia Güell, Barcelona',
      footerRole: 'Full Stack Logic'
    }
  }
};
