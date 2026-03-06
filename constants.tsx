import { PortfolioContent } from './types';

// Datos comunes (imágenes, stacks técnicos que no requieren traducción)

const IMAGES = {
  schneider:
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
  myker:
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  cafeteras:
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200',
  crotxet:
    'https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&q=80&w=1200'
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
  linkedin: 'https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit',
  github: 'https://github.com/MallenK',
  instagram: 'https://instagram.com/mallenk18',
  whatsapp: 'https://wa.me/34670248461'
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
        {
          title: 'Web Corporativa Premium',
          desc: 'Desarrollo de webs profesionales orientadas a conversión y marca.',
          icon: '💎',
          url: 'https://mykeracademy.com/'
        },
        {
          title: 'SaaS & Apps a Medida',
          desc: 'Construcción de plataformas escalables y productos digitales.',
          icon: '🚀',
          url: 'https://mallenk.github.io/Plantilla-Plataforma-Academia-Escolar/'
        },
        { title: 'Automatización Procesos', desc: 'Optimización de flujos internos y sistemas empresariales.', icon: '⚙️' },
        {
          title: 'Integración IA',
          desc: 'Chatbots, análisis de datos y asistentes inteligentes.',
          icon: '🧠',
          action: 'open-ai-chat'
        },       
        {
          title: 'Consultoría y Auditoría Web',
          desc: 'Análisis técnico, evaluación de rendimiento y arquitectura, auditoría de experiencia de usuario y definición de planes de mejora con recomendaciones accionables para productos digitales.',
          icon: '🔍'
        },
        { title: 'Clases Programación/IA', desc: 'Sesiones prácticas personalizadas para aprender programación e inteligencia artificial.', icon: '🎓' }
      ]
    },
    projects: {
      label: 'Portfolio / 03',
      title: 'Proyectos',
      items: [
        {
          id: '01',
          title: 'Schneider Electric',
          category: 'Enterprise / Industria',
          year: '2024',
          role: 'Full Stack Engineer',
          image: IMAGES.schneider,
          url: 'https://www.se.com/es/es/',
          stack: ['PHP', 'CodeIgniter', 'MySQL', 'Git', 'Postman', 'Docker'],
          description:
            'Mantenimiento y evolución de plataforma industrial en entorno corporativo internacional. Desarrollo full-stack crítico en producción.'
        },
        {
          id: '02',
          title: 'Myker Academy',
          category: 'Corporativo / EdTech',
          year: '2025',
          role: 'Lead Developer',
          image: IMAGES.myker,
          url: 'https://mykeracademy.com/',
          stack: ['Google AI Studio', 'React', 'TypeScript', 'Tailwind', 'npm', 'SEO'],
          description:
            'Diseño y desarrollo de web corporativa para escuela de idiomas con enfoque en captación de leads y posicionamiento de marca.'
        },
        {
          id: '03',
          title: 'Project Architecture Planner',
          category: 'AI Architecture / Dev Tool',
          year: '2024',
          role: 'AI Product Engineer',
          image: IMAGES.ai,
          url: 'https://chatgpt.com/g/g-699de200e9c481919b02f30b73bc79bb-project-architecture-planner',
          stack: ['GPT', 'OpenAI', 'System Design'],
          description:
            'Asistente de arquitectura de software basado en IA que ayuda a diseñar la estructura técnica de proyectos digitales.'
        },
        {
          id: '04',
          title: 'Cro&Txet',
          category: 'E-commerce / Handmade',
          year: '2025',
          role: 'Full Stack Developer',
          image: IMAGES.crotxet,
          url: 'https://www.croandtxet.cat/',
          stack: ['React', 'TypeScript', 'Tailwind', 'Vercel', 'EmailJS', 'i18n', 'SEO'],
          description:
            'Tienda online de bolsos hechos a mano. Experiencia de compra cuidada, catálogo visual, multi-idioma y enfoque en marca para convertir visitas en pedidos.'
        },
        {
          id: '05',
          title: 'Cafeteras Review',
          category: 'Producto Personal / SEO',
          year: '2024',
          role: 'Founder & Dev',
          image: IMAGES.cafeteras,
          url: 'https://cafeterasreview.vercel.app/#/',
          stack: ['Amazon API', 'Google AI Studio', 'Supabase', 'Angular', 'Vercel'],
          description:
            'Plataforma de comparación y afiliación desarrollada como producto propio. Enfocada en SEO programático y rendimiento.'
        },
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
          id: 'exp1',
          company: 'Schneider Electric',
          role: 'Full Stack Web Developer',
          period: 'Actualidad',
          achievements: [
            'Mantenimiento y evolución de plataforma web industrial crítica',
            'Desarrollo Full Stack en entorno Enterprise internacional',
            'Gestión de incidencias y optimización de rendimiento en producción'
          ]
        },
        {
          id: 'exp2',
          company: 'Freelance & Consultant',
          role: 'Product Engineer',
          period: '2021 - Present',
          achievements: [
            'Desarrollo de webs corporativas premium y soluciones SaaS',
            'Implementación de automatizaciones de negocio e integración de IA',
            'Auditoría técnica y refactorización de sistemas legacy'
          ]
        }
      ]
    },
    contact: {
      label: 'Collaborate / 06',
      freelanceLabel: 'Servicios Freelance y Empresa',
      socialLabel: 'Social',
      formName: 'Tu Nombre',
      formEmail: 'Tu correo electrónico',
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
      p2: "Combino la solidesa del desenvolupament Enterprise amb l'agilitat de l'ecosistema freelance. Especialitzat en crear arquitectures robustes que resolen problemes de negoci reals."
    },
    services: {
      label: 'Core / 02',
      title: 'Serveis',
      items: [
        {
          title: 'Web Corporativa Premium',
          desc: 'Desenvolupament de webs professionals orientades a conversió i marca.',
          icon: '💎',
          url: 'https://mykeracademy.com/'
        },
        {
          title: 'SaaS & Apps a Mida',
          desc: 'Construcció de plataformes escalables i productes digitals.',
          icon: '🚀',
          url: 'https://mallenk.github.io/Plantilla-Plataforma-Academia-Escolar/'
        },
        {
          title: 'Automatització Processos',
          desc: 'Optimització de fluxos interns i sistemes empresarials.',
          icon: '⚙️'
        },
        {
          title: 'Integració IA',
          desc: 'Chatbots, anàlisi de dades i assistents intel·ligents.',
          icon: '🧠',
          action: 'open-ai-chat'
        },
        {
          title: 'Consultoria i Auditoria Web',
          desc: "Anàlisi tècnic, avaluació de rendiment i arquitectura, auditoria d'experiència d'usuari i definició de plans de millora amb recomanacions accionables per a productes digitals.",
          icon: '🔍'
        },
        {
          title: 'Classes Programació/IA',
          desc: 'Sessions pràctiques personalitzades per aprendre programació i intel·ligència artificial.',
          icon: '🎓'
        }
      ]
    },
    projects: {
      label: 'Portfolio / 03',
      title: 'Projectes',
      items: [
        {
          id: '01',
          title: 'Schneider Electric',
          category: 'Enterprise / Indústria',
          year: '2024',
          role: 'Full Stack Engineer',
          image: IMAGES.schneider,
          url: 'https://www.se.com/es/es/',
          stack: ['PHP', 'CodeIgniter', 'MySQL', 'Git', 'Postman', 'Docker'],
          description:
            'Manteniment i evolució d’una plataforma industrial en un entorn corporatiu internacional. Desenvolupament full-stack crític en producció.'
        },
        {
          id: '02',
          title: 'Myker Academy',
          category: 'Corporatiu / EdTech',
          year: '2025',
          role: 'Lead Developer',
          image: IMAGES.myker,
          url: 'https://mykeracademy.com/',
          stack: ['Google AI Studio', 'React', 'TypeScript', 'Tailwind', 'npm', 'SEO'],
          description:
            'Disseny i desenvolupament de web corporativa per a una escola d’idiomes, amb enfocament en la captació de leads, el posicionament de marca i l’escalabilitat digital.'
        },
        {
          id: '03',
          title: 'Project Architecture Planner',
          category: 'Arquitectura IA / Eina Dev',
          year: '2024',
          role: 'AI Product Engineer',
          image: IMAGES.ai,
          url: 'https://chatgpt.com/g/g-699de200e9c481919b02f30b73bc79bb-project-architecture-planner',
          stack: ['GPT', 'OpenAI', 'System Design'],
          description:
            'Assistent d’arquitectura de software basat en IA que ajuda a dissenyar l’estructura tècnica de projectes digitals.'
        },
        {
          id: '04',
          title: 'Cro&Txet',
          category: 'E-commerce / Handmade',
          year: '2025',
          role: 'Full Stack Developer',
          image: IMAGES.crotxet,
          url: 'https://www.croandtxet.cat/',
          stack: ['React', 'TypeScript', 'Tailwind', 'Vercel', 'EmailJS', 'i18n', 'SEO'],
          description:
            'Botiga online de bolsos fets a mà. Experiència de compra cuidada, catàleg visual, multi-idioma i enfocament en marca per convertir visites en comandes.'
        },
        {
          id: '05',
          title: 'Cafeteras Review',
          category: 'Producte Personal / SEO',
          year: '2024',
          role: 'Founder & Dev',
          image: IMAGES.cafeteras,
          url: 'https://cafeterasreview.vercel.app/#/',
          stack: ['Amazon API', 'Google AI Studio', 'Supabase', 'Angular', 'Vercel'],
          description:
            'Plataforma de comparació i afiliació desenvolupada com a producte propi, enfocada en SEO programàtic, rendiment i automatització de contingut.'
        },
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
          id: 'exp1',
          company: 'Schneider Electric',
          role: 'Full Stack Web Developer',
          period: 'Actualitat',
          achievements: [
            'Manteniment i evolució de plataforma web industrial crítica',
            "Desenvolupament Full Stack en entorn Enterprise internacional",
            "Gestió d'incidències i optimització de rendiment en producció"
          ]
        },
        {
          id: 'exp2',
          company: 'Freelance & Consultant',
          role: 'Product Engineer',
          period: '2021 - Present',
          achievements: [
            'Desenvolupament de webs corporatives premium i solucions SaaS',
            "Implementació d'automatitzacions de negoci i integració d'IA",
            'Auditoria tècnica i refactorització de sistemes legacy'
          ]
        }
      ]
    },
    contact: {
      label: 'Collaborate / 06',
      freelanceLabel: 'Freelance i entorn corporatiu',
      socialLabel: 'Social',
      formName: 'El teu Nom',
      formEmail: 'El teu correu electrònic',
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
      p1: "and automated systems to improve my clients' productivity.",
      p2: 'I combine the solidity of Enterprise development with the agility of the freelance ecosystem. Specialized in creating robust architectures that solve real business problems.'
    },
    services: {
      label: 'Core / 02',
      title: 'Services',
      items: [
        {
          title: 'Premium Corporate Web',
          desc: 'Development of professional websites focused on conversion and branding.',
          icon: '💎',
          url: 'https://mykeracademy.com/'
        },
        {
          title: 'SaaS & Custom Apps',
          desc: 'Construction of scalable platforms and digital products.',
          icon: '🚀',
          url: 'https://mallenk.github.io/Plantilla-Plataforma-Academia-Escolar/'
        },
        {
          title: 'Process Automation',
          desc: 'Optimization of internal workflows and business systems.',
          icon: '⚙️'
        },
        {
          title: 'AI Integration',
          desc: 'Chatbots, data analysis, and intelligent assistants.',
          icon: '🧠',
          action: 'open-ai-chat'
        },
        {
          title: 'Web Consulting & Audit',
          desc: 'Technical analysis, performance and architecture evaluation, UX audit, and definition of improvement plans with actionable recommendations for digital products.',
          icon: '🔍'
        },
        {
          title: 'Coding/AI Mentoring',
          desc: 'Personalized practical sessions to learn programming and artificial intelligence.',
          icon: '🎓'
        }
      ]
    },
    projects: {
      label: 'Portfolio / 03',
      title: 'Projects',
      items: [
        {
          id: '01',
          title: 'Schneider Electric',
          category: 'Enterprise / Industry',
          year: '2024',
          role: 'Full Stack Engineer',
          image: IMAGES.schneider,
          url: 'https://www.se.com/es/es/',
          stack: ['PHP', 'CodeIgniter', 'MySQL', 'Git', 'Postman', 'Docker'],
          description:
            'Maintenance and evolution of an industrial platform within an international corporate environment. Critical full-stack development in production.'
        },
        {
          id: '02',
          title: 'Myker Academy',
          category: 'Corporate / EdTech',
          year: '2025',
          role: 'Lead Developer',
          image: IMAGES.myker,
          url: 'https://mykeracademy.com/',
          stack: ['Google AI Studio', 'React', 'TypeScript', 'Tailwind', 'npm', 'SEO'],
          description:
            'Design and development of a corporate website for a language school, focused on lead generation, brand positioning, and scalable digital presence.'
        },
        {
          id: '03',
          title: 'Project Architecture Planner',
          category: 'AI Architecture / Dev Tool',
          year: '2024',
          role: 'AI Product Engineer',
          image: IMAGES.ai,
          url: 'https://chatgpt.com/g/g-699de200e9c481919b02f30b73bc79bb-project-architecture-planner',
          stack: ['GPT', 'OpenAI', 'System Design'],
          description:
            'AI-powered software architecture assistant designed to help structure digital projects.'
        },
        {
          id: '04',
          title: 'Cro&Txet',
          category: 'E-commerce / Handmade',
          year: '2025',
          role: 'Full Stack Developer',
          image: IMAGES.crotxet,
          url: 'https://www.croandtxet.cat/',
          stack: ['React', 'TypeScript', 'Tailwind', 'Vercel', 'EmailJS', 'i18n', 'SEO'],
          description:
            'Handmade bags online store. Crafted shopping experience, visual catalog, multi-language support, and brand-focused UX to convert visits into orders.'
        },
        {
          id: '05',
          title: 'Cafeteras Review',
          category: 'Personal Product / SEO',
          year: '2024',
          role: 'Founder & Dev',
          image: IMAGES.cafeteras,
          url: 'https://cafeterasreview.vercel.app/#/',
          stack: ['Amazon API', 'Google AI Studio', 'Supabase', 'Angular', 'Vercel'],
          description:
            'Product comparison and affiliate platform developed as a personal product, focused on programmatic SEO, performance, and content automation.'
        },
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
          id: 'exp1',
          company: 'Schneider Electric',
          role: 'Full Stack Web Developer',
          period: 'Present',
          achievements: [
            'Maintenance and evolution of critical industrial web platform',
            'Full Stack Development in international Enterprise environment',
            'Incident management and performance optimization in production'
          ]
        },
        {
          id: 'exp2',
          company: 'Freelance & Consultant',
          role: 'Product Engineer',
          period: '2021 - Present',
          achievements: [
            'Development of premium corporate websites and SaaS solutions',
            'Implementation of business automations and AI integration',
            'Technical audit and legacy system refactoring'
          ]
        }
      ]
    },
    contact: {
      label: 'Collaborate / 06',
      freelanceLabel: 'Freelance & Enterprise',
      socialLabel: 'Social',
      formName: 'Your Name',
      formEmail: 'Your email',
      formIdea: 'Project / Idea',
      btn: 'Send Request',
      footerText: 'Sergi Mallén © 2024',
      footerLoc: 'Based in Colònia Güell, Barcelona',
      footerRole: 'Full Stack Logic'
    }
  }
};