import { PortfolioContent } from './types';

const IMAGES = {
  myker:
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
  jpprep:
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200',
  crotxet:
    'https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&q=80&w=1200',
  ateneu:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200'
};

export const SOCIAL_LINKS = {
  email: 'sergimallenweb@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sergi-mallen',
  github: 'https://github.com/MallenK',
  instagram: 'https://instagram.com/mallenk18',
  whatsapp: 'https://wa.me/34670248461'
};

const COMMON_SKILLS = [
  { category: 'Backend', skills: ['PHP', 'CodeIgniter', 'Symfony', 'Node.js', 'MySQL', 'API REST', 'Docker'] },
  { category: 'Frontend', skills: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS / SASS', 'Tailwind'] },
  { category: 'Tooling', skills: ['Git', 'Docker', 'Vite', 'CI/CD', 'Linux', 'WordPress'] },
  { category: 'Marketing & Data', skills: ['SEO', 'Google Analytics & GTM', 'CRO'] }
];

const projectBase = [
  {
    id: '01',
    title: 'JP Preparation',
    year: '2026',
    url: 'https://www.jppreparation.com/',
    image: IMAGES.jpprep,
    live: true,
    stack: ['PHP 8.2', 'CodeIgniter 4', 'MySQL', 'Docker', 'PHPUnit', 'React', 'TypeScript', 'Tailwind']
  },
  {
    id: '02',
    title: 'Cro&Txet',
    year: '2025',
    url: 'https://www.croandtxet.cat/',
    image: IMAGES.crotxet,
    live: true,
    stack: ['React', 'TypeScript', 'Tailwind', 'Vercel', 'EmailJS', 'i18n', 'SEO']
  },
  {
    id: '03',
    title: 'Ateneu Unió',
    year: '2025',
    url: 'https://ateneuuniorestaurant.com/',
    image: IMAGES.ateneu,
    live: true,
    stack: ['React', 'Node.js', 'Tailwind']
  },
  {
    id: '04',
    title: 'Myker Academy',
    year: '2025',
    url: 'https://mykeracademy.com/',
    image: IMAGES.myker,
    live: true,
    stack: ['React', 'TypeScript', 'Tailwind', 'SEO']
  }
];

const merge = (
  loc: { category: string; role: string; description: string; highlights?: string[] }[]
) => projectBase.map((p, i) => ({ ...p, ...loc[i] }));

export const TRANSLATIONS: Record<'es' | 'en' | 'cat', PortfolioContent> = {
  /* ---------------------------------------------------------- ES */
  es: {
    meta: {
      name: 'Sergi Mallén',
      alias: 'MallenK',
      role: 'Full Stack Developer · Backend & Automatización',
      tagline: 'De la base de datos al deploy. Sin que nadie tape huecos.',
      location: 'Colònia Güell, Barcelona',
      statement:
        'Sergi Mallén — Full Stack Developer con 4+ años en producción. Cojo una feature y la llevo de punta a punta: modelo de datos, API, interfaz y deploy. Peso en backend, sin descuidar el producto. Lo que entrego se queda en producción y se mantiene.'
    },
    nav: {
      perfil: 'Perfil',
      proyectos: 'Proyectos',
      experiencia: 'Experiencia',
      servicios: 'Servicios',
      contacto: 'Contacto',
      cv: 'CV'
    },
    ui: {
      scroll: 'Baja para explorar',
      mapHint: 'Arrastra para orbitar · clic derecho o 2 dedos para desplazar · zoom con rueda',
      open: 'Abrir',
      live: 'En producción',
      roleLabel: 'Rol',
      copy: 'Copiar',
      copied: 'Copiado',
      send: 'Enviar mensaje',
      sending: 'Enviando…',
      sent: 'Recibido. Respondo en menos de 24 h.',
      error: 'No se pudo enviar. Escríbeme a sergimallenweb@gmail.com.',
      close: 'Cerrar',
      indexTitle: 'Manifiesto',
      mapLabel: 'Mapa · estás aquí'
    },
    about: {
      tag: 'Perfil',
      lead: 'Cuatro años construyendo aplicaciones web y sitios corporativos para clientes y equipos de producto — de la base de datos al deploy.',
      body: 'Trabajo el backend y el frontend con la misma exigencia, con más soltura en el backend: modelo de datos, APIs, autenticación, infraestructura. Me implico de lleno en cada proyecto — código limpio, estructura lógica y que aguante en producción. También automatizo procesos con IA y trabajo con NFC para llevar esas automatizaciones al mundo físico.',
      skillsTag: 'Stack',
      skills: COMMON_SKILLS,
      educationTag: 'Formación',
      education: [
        { title: 'Curso de Python', org: 'Fundación General · Universidad de Salamanca', period: '2026 · en curso' },
        { title: 'Curso avanzado para desarrolladores Full Stack', org: 'Fundación General · Universidad de Salamanca', period: '2025' },
        { title: 'Programación en JavaScript, MySQL y PHP', org: 'Fundación General · Universidad de Salamanca', period: '2024' },
        { title: 'Certificados de PHP y JavaScript', org: 'OpenBootcamp', period: '2022 – 2023' },
        { title: 'Grado Superior en Gráfica Interactiva', org: 'Escola La Llotja, Barcelona', period: '2019 – 2022' }
      ],
      languagesTag: 'Idiomas',
      languages: [
        { name: 'Español', level: 'Nativo' },
        { name: 'Catalán', level: 'Nativo' },
        { name: 'Inglés', level: 'Profesional' }
      ]
    },
    projects: {
      tag: 'Proyectos',
      title: 'Cuatro proyectos reales, en producción.',
      items: merge([
        {
          category: 'Plataforma de gestión · Deporte',
          role: 'Full-Stack',
          description:
            'La academia funcionaba con WhatsApp y hojas de Excel: sin saber cuántos alumnos activos tenía, qué clases había cada día ni quién asistía. Construí en solitario, de punta a punta, la aplicación que lo sustituye — a la vez back-office de la academia y portal del alumno.',
          highlights: [
            'Modelo de datos en MySQL (~65 migraciones versionadas). El núcleo es el ciclo bono → sesión → asistencia: al marcar «presente» se descuenta una sesión y, si la clase se cancela, se devuelve al bono exacto del que salió.',
            'Autenticación propia, sin librería: login en tiempo constante, sesiones con timeout configurable, autorización por rol en cada ruta y anti-fuerza-bruta persistente por cuenta e IP.',
            'Concurrencia sin locks: el descuento de bono es un compare-and-set de fila dentro de transacción, así dos gestores a la vez nunca restan dos sesiones por la misma clase.',
            'Una imagen Docker, tres entornos (local, pre-producción, producción) y ~165 tests que pasan antes de cada release.',
            'En producción desde el 1 de septiembre de 2026. Primeras dos semanas: 97 alumnos activos, 11 entrenadores.'
          ]
        },
        {
          category: 'E-commerce · Artesanía',
          role: 'Full-Stack',
          description:
            'Tienda online de bolsos hechos a mano. Catálogo visual, tres idiomas (catalán, español, inglés), SEO técnico y una experiencia de compra cuidada, con los pedidos gestionados por formulario. La construí entera: diseño, front, internacionalización y despliegue.'
        },
        {
          category: 'Web · Restauración',
          role: 'Full-Stack',
          description:
            'Web para el restaurante Ateneu Unió: carta, información práctica y presencia de marca. De la primera maqueta a producción en dos semanas, yo solo.'
        },
        {
          category: 'Web corporativa · EdTech',
          role: 'Desarrollador único',
          description:
            'Web de una escuela de idiomas centrada en captación de leads y marca. Único desarrollador: diseño (a partir de una base generada con IA), desarrollo, SEO y un sistema para que la academia gestione su propio contenido sin tocar código.'
        }
      ])
    },
    experience: {
      tag: 'Experiencia',
      title: 'Cinco etapas, de las prácticas a llevar sistemas enteros.',
      items: [
        {
          id: 'exp1',
          company: 'Freelance',
          role: 'Full-Stack & Automatización',
          period: '2026 – actualidad',
          achievements: [
            'Aplicaciones web a medida y automatización de procesos con IA para negocios pequeños',
            'Integración de LLMs y APIs externas en flujos de trabajo internos',
            'Python, React, Node.js, OpenAI API, NFC'
          ]
        },
        {
          id: 'exp2',
          company: 'Tempel Group',
          role: 'Full Stack Developer',
          period: '2026',
          achievements: [
            'Responsable de todo el ecosistema web internacional de una multinacional: coherencia de marca, rendimiento y escalabilidad de las plataformas',
            'Landing pages y sitios corporativos optimizados para la conversión de campañas y lanzamientos',
            'Aplicaciones web internas a medida, desde cero, con backend eficiente',
            'WordPress, PHP, MySQL, JavaScript, Tailwind CSS, REST API, Git'
          ]
        },
        {
          id: 'exp3',
          company: 'Devinet',
          role: 'Full Stack Developer',
          period: '2024 – 2026',
          achievements: [
            'Encargado de punta a punta de una aplicación para una multinacional que controlaba todo el sistema de producción de armarios, incluido el control de calidad',
            'Nuevas funcionalidades en backend y frontend, optimización de consultas y automatización de procesos internos',
            'Diseño de soluciones completas junto al equipo, con componentes reutilizables e integración de APIs',
            'CodeIgniter, MySQL, AWS, API REST, jQuery'
          ]
        },
        {
          id: 'exp4',
          company: 'Tenea',
          role: 'Backend Developer',
          period: '2023 – 2024',
          achievements: [
            'Mantenimiento y mejora de sistemas backend para clientes enterprise',
            'Refactorización, optimización de endpoints y resolución de incidencias en producción',
            'Symfony, Node.js, RxJS, MySQL, React'
          ]
        },
        {
          id: 'exp5',
          company: 'Vilax',
          role: 'Prácticas de desarrollo web',
          period: '2023',
          achievements: [
            'Webs corporativas y de e-commerce para clientes, de Figma a producción',
            'Gestión de catálogo multiplataforma e implementación de SEO',
            'WordPress, PHP, Tailwind CSS, SEO, Figma, Google Analytics'
          ]
        }
      ]
    },
    services: {
      tag: 'Servicios',
      title: 'Lo que puedes contratar. Freelance o para tu equipo.',
      items: [
        { title: 'Plataformas de gestión a medida', desc: 'Aplicaciones para academias y negocios: calendario, roles, bonos, control de asistencia. Como JP Preparation.', url: 'https://www.jppreparation.com/' },
        { title: 'Webs corporativas y e-commerce', desc: 'Sitios orientados a conversión, con SEO técnico y multi-idioma.', url: 'https://mykeracademy.com/' },
        { title: 'Automatización con IA', desc: 'Flujos que integran LLMs y APIs externas. Entre ellos, generación automatizada de vídeo corto.' },
        { title: 'NFC', desc: 'Automatizaciones que conectan el mundo físico con el sistema.' },
        { title: 'Formación individual en IA', desc: 'Sesiones prácticas para aprender a trabajar con IA en tu día a día.' }
      ]
    },
    contact: {
      tag: 'Contacto',
      title: 'Cuéntame qué quieres construir.',
      line: 'Disponible para proyectos freelance y para incorporarme a un equipo de producto.',
      directLabel: 'Directo',
      socialLabel: 'Redes',
      formName: 'Tu nombre',
      formEmail: 'Tu correo',
      formIdea: 'Proyecto o idea',
      footerLoc: 'Colònia Güell, Barcelona',
      footerRole: 'Full Stack Developer'
    }
  },

  /* ---------------------------------------------------------- CAT */
  cat: {
    meta: {
      name: 'Sergi Mallén',
      alias: 'MallenK',
      role: 'Full Stack Developer · Backend & Automatització',
      tagline: 'De la base de dades al deploy. Sense que ningú tapi forats.',
      location: 'Colònia Güell, Barcelona',
      statement:
        'Sergi Mallén — Full Stack Developer amb 4+ anys en producció. Agafo una feature i la porto de punta a punta: model de dades, API, interfície i deploy. Pes en backend, sense descuidar el producte. El que entrego es queda en producció i es manté.'
    },
    nav: {
      perfil: 'Perfil',
      proyectos: 'Projectes',
      experiencia: 'Experiència',
      servicios: 'Serveis',
      contacto: 'Contacte',
      cv: 'CV'
    },
    ui: {
      scroll: 'Baixa per explorar',
      mapHint: 'Arrossega per orbitar · clic dret o 2 dits per moure’t · zoom amb la roda',
      open: 'Obrir',
      live: 'En producció',
      roleLabel: 'Rol',
      copy: 'Copiar',
      copied: 'Copiat',
      send: 'Enviar missatge',
      sending: 'Enviant…',
      sent: 'Rebut. Responc en menys de 24 h.',
      error: 'No s’ha pogut enviar. Escriu-me a sergimallenweb@gmail.com.',
      close: 'Tancar',
      indexTitle: 'Manifest',
      mapLabel: 'Mapa · ets aquí'
    },
    about: {
      tag: 'Perfil',
      lead: 'Quatre anys construint aplicacions web i llocs corporatius per a clients i equips de producte — de la base de dades al deploy.',
      body: 'Treballo el backend i el frontend amb la mateixa exigència, amb més soltesa al backend: model de dades, APIs, autenticació, infraestructura. M’implico de ple en cada projecte — codi net, estructura lògica i que aguanti en producció. També automatitzo processos amb IA i treballo amb NFC per portar aquestes automatitzacions al món físic.',
      skillsTag: 'Stack',
      skills: COMMON_SKILLS,
      educationTag: 'Formació',
      education: [
        { title: 'Curs de Python', org: 'Fundación General · Universitat de Salamanca', period: '2026 · en curs' },
        { title: 'Curs avançat per a desenvolupadors Full Stack', org: 'Fundación General · Universitat de Salamanca', period: '2025' },
        { title: 'Programació en JavaScript, MySQL i PHP', org: 'Fundación General · Universitat de Salamanca', period: '2024' },
        { title: 'Certificats de PHP i JavaScript', org: 'OpenBootcamp', period: '2022 – 2023' },
        { title: 'Grau Superior en Gràfica Interactiva', org: 'Escola La Llotja, Barcelona', period: '2019 – 2022' }
      ],
      languagesTag: 'Idiomes',
      languages: [
        { name: 'Català', level: 'Natiu' },
        { name: 'Castellà', level: 'Natiu' },
        { name: 'Anglès', level: 'Professional' }
      ]
    },
    projects: {
      tag: 'Projectes',
      title: 'Quatre projectes reals, en producció.',
      items: merge([
        {
          category: 'Plataforma de gestió · Esport',
          role: 'Full-Stack',
          description:
            'L’acadèmia funcionava amb WhatsApp i fulls d’Excel: sense saber quants alumnes actius tenia, quines classes hi havia cada dia ni qui assistia. Vaig construir en solitari, de punta a punta, l’aplicació que ho substitueix — alhora back-office de l’acadèmia i portal de l’alumne.',
          highlights: [
            'Model de dades a MySQL (~65 migracions versionades). El nucli és el cicle bo → sessió → assistència: en marcar «present» es descompta una sessió i, si la classe es cancel·la, es retorna al bo exacte del qual va sortir.',
            'Autenticació pròpia, sense llibreria: login en temps constant, sessions amb timeout configurable, autorització per rol a cada ruta i anti-força-bruta persistent per compte i IP.',
            'Concurrència sense locks: el descompte de bo és un compare-and-set de fila dins de transacció, així dos gestors alhora mai resten dues sessions per la mateixa classe.',
            'Una imatge Docker, tres entorns (local, pre-producció, producció) i ~165 tests que passen abans de cada release.',
            'En producció des de l’1 de setembre de 2026. Primeres dues setmanes: 97 alumnes actius, 11 entrenadors.'
          ]
        },
        {
          category: 'E-commerce · Artesania',
          role: 'Full-Stack',
          description:
            'Botiga online de bosses fetes a mà. Catàleg visual, tres idiomes (català, castellà, anglès), SEO tècnic i una experiència de compra cuidada, amb les comandes gestionades per formulari. La vaig construir sencera: disseny, front, internacionalització i desplegament.'
        },
        {
          category: 'Web · Restauració',
          role: 'Full-Stack',
          description:
            'Web per al restaurant Ateneu Unió: carta, informació pràctica i presència de marca. De la primera maqueta a producció en dues setmanes, jo sol.'
        },
        {
          category: 'Web corporativa · EdTech',
          role: 'Desenvolupador únic',
          description:
            'Web d’una escola d’idiomes centrada en la captació de leads i marca. Únic desenvolupador: disseny (a partir d’una base generada amb IA), desenvolupament, SEO i un sistema perquè l’acadèmia gestioni el seu propi contingut sense tocar codi.'
        }
      ])
    },
    experience: {
      tag: 'Experiència',
      title: 'Cinc etapes, de les pràctiques a portar sistemes sencers.',
      items: [
        {
          id: 'exp1',
          company: 'Freelance',
          role: 'Full-Stack & Automatització',
          period: '2026 – actualitat',
          achievements: [
            'Aplicacions web a mida i automatització de processos amb IA per a negocis petits',
            'Integració de LLMs i APIs externes en fluxos de treball interns',
            'Python, React, Node.js, OpenAI API, NFC'
          ]
        },
        {
          id: 'exp2',
          company: 'Tempel Group',
          role: 'Full Stack Developer',
          period: '2026',
          achievements: [
            'Responsable de tot l’ecosistema web internacional d’una multinacional: coherència de marca, rendiment i escalabilitat de les plataformes',
            'Landing pages i llocs corporatius optimitzats per a la conversió de campanyes i llançaments',
            'Aplicacions web internes a mida, des de zero, amb backend eficient',
            'WordPress, PHP, MySQL, JavaScript, Tailwind CSS, REST API, Git'
          ]
        },
        {
          id: 'exp3',
          company: 'Devinet',
          role: 'Full Stack Developer',
          period: '2024 – 2026',
          achievements: [
            'Encarregat de punta a punta d’una aplicació per a una multinacional que controlava tot el sistema de producció d’armaris, inclòs el control de qualitat',
            'Noves funcionalitats a backend i frontend, optimització de consultes i automatització de processos interns',
            'Disseny de solucions completes amb l’equip, amb components reutilitzables i integració d’APIs',
            'CodeIgniter, MySQL, AWS, API REST, jQuery'
          ]
        },
        {
          id: 'exp4',
          company: 'Tenea',
          role: 'Backend Developer',
          period: '2023 – 2024',
          achievements: [
            'Manteniment i millora de sistemes backend per a clients enterprise',
            'Refactorització, optimització d’endpoints i resolució d’incidències en producció',
            'Symfony, Node.js, RxJS, MySQL, React'
          ]
        },
        {
          id: 'exp5',
          company: 'Vilax',
          role: 'Pràctiques de desenvolupament web',
          period: '2023',
          achievements: [
            'Webs corporatives i d’e-commerce per a clients, de Figma a producció',
            'Gestió de catàleg multiplataforma i implementació de SEO',
            'WordPress, PHP, Tailwind CSS, SEO, Figma, Google Analytics'
          ]
        }
      ]
    },
    services: {
      tag: 'Serveis',
      title: 'El que pots contractar. Freelance o per al teu equip.',
      items: [
        { title: 'Plataformes de gestió a mida', desc: 'Aplicacions per a acadèmies i negocis: calendari, rols, bons, control d’assistència. Com JP Preparation.', url: 'https://www.jppreparation.com/' },
        { title: 'Webs corporatives i e-commerce', desc: 'Llocs orientats a conversió, amb SEO tècnic i multi-idioma.', url: 'https://mykeracademy.com/' },
        { title: 'Automatització amb IA', desc: 'Fluxos que integren LLMs i APIs externes. Entre ells, generació automatitzada de vídeo curt.' },
        { title: 'NFC', desc: 'Automatitzacions que connecten el món físic amb el sistema.' },
        { title: 'Formació individual en IA', desc: 'Sessions pràctiques per aprendre a treballar amb IA en el teu dia a dia.' }
      ]
    },
    contact: {
      tag: 'Contacte',
      title: 'Explica’m què vols construir.',
      line: 'Disponible per a projectes freelance i per incorporar-me a un equip de producte.',
      directLabel: 'Directe',
      socialLabel: 'Xarxes',
      formName: 'El teu nom',
      formEmail: 'El teu correu',
      formIdea: 'Projecte o idea',
      footerLoc: 'Colònia Güell, Barcelona',
      footerRole: 'Full Stack Developer'
    }
  },

  /* ---------------------------------------------------------- EN */
  en: {
    meta: {
      name: 'Sergi Mallén',
      alias: 'MallenK',
      role: 'Full Stack Developer · Backend & Automation',
      tagline: 'From the database to the deploy. Nobody covering the gaps.',
      location: 'Colònia Güell, Barcelona',
      statement:
        'Sergi Mallén — Full Stack Developer with 4+ years in production. I take a feature and carry it end to end: data model, API, interface and deploy. Backend-leaning, without neglecting the product. What I ship stays in production and gets maintained.'
    },
    nav: {
      perfil: 'Profile',
      proyectos: 'Work',
      experiencia: 'Experience',
      servicios: 'Services',
      contacto: 'Contact',
      cv: 'CV'
    },
    ui: {
      scroll: 'Scroll to explore',
      mapHint: 'Drag to orbit · right-click or 2 fingers to pan · scroll to zoom',
      open: 'Open',
      live: 'In production',
      roleLabel: 'Role',
      copy: 'Copy',
      copied: 'Copied',
      send: 'Send message',
      sending: 'Sending…',
      sent: 'Received. I reply within 24 h.',
      error: 'Could not send. Email me at sergimallenweb@gmail.com.',
      close: 'Close',
      indexTitle: 'Manifesto',
      mapLabel: 'Map · you are here'
    },
    about: {
      tag: 'Profile',
      lead: 'Four years building web applications and corporate sites for clients and product teams — from the database to the deploy.',
      body: 'I work the backend and the frontend to the same standard, with more ease on the backend: data model, APIs, authentication, infrastructure. I commit fully to every project — clean code, a logical structure, and holding up in production. I also automate processes with AI, and work with NFC to take those automations into the physical world.',
      skillsTag: 'Stack',
      skills: COMMON_SKILLS,
      educationTag: 'Education',
      education: [
        { title: 'Python course', org: 'Fundación General · University of Salamanca', period: '2026 · ongoing' },
        { title: 'Advanced Full Stack developer course', org: 'Fundación General · University of Salamanca', period: '2025' },
        { title: 'JavaScript, MySQL and PHP programming', org: 'Fundación General · University of Salamanca', period: '2024' },
        { title: 'PHP and JavaScript certifications', org: 'OpenBootcamp', period: '2022 – 2023' },
        { title: 'Higher Diploma in Interactive Graphics', org: 'Escola La Llotja, Barcelona', period: '2019 – 2022' }
      ],
      languagesTag: 'Languages',
      languages: [
        { name: 'Spanish', level: 'Native' },
        { name: 'Catalan', level: 'Native' },
        { name: 'English', level: 'Professional' }
      ]
    },
    projects: {
      tag: 'Work',
      title: 'Four real projects, live in production.',
      items: merge([
        {
          category: 'Management platform · Sports',
          role: 'Full-Stack',
          description:
            'The academy ran on WhatsApp and spreadsheets: no idea how many active students it had, what classes ran each day, or who showed up. I built the replacement solo, end to end — the academy back-office and the student portal in one.',
          highlights: [
            'MySQL data model (~65 versioned migrations). The core is the pass → session → attendance cycle: marking «present» deducts one session, and if the class is cancelled it goes back to the exact pass it came from.',
            'Custom auth, no library: constant-time login, sessions with a configurable timeout, per-route role authorisation, and persistent brute-force protection per account and per IP.',
            'Concurrency without locks: the pass deduction is a row-level compare-and-set inside a transaction, so two managers at once never deduct two sessions for the same class.',
            'One Docker image, three environments (local, pre-production, production), and ~165 tests that pass before every release.',
            'Live since 1 September 2026. First two weeks: 97 active students, 11 coaches.'
          ]
        },
        {
          category: 'E-commerce · Craft',
          role: 'Full-Stack',
          description:
            'Handmade bags online store. Visual catalogue, three languages (Catalan, Spanish, English), technical SEO and a crafted shopping experience, with orders handled by form. I built it whole: design, front, internationalisation and deploy.'
        },
        {
          category: 'Web · Hospitality',
          role: 'Full-Stack',
          description:
            'Website for the Ateneu Unió restaurant: menu, practical info and brand presence. From first mockup to production in two weeks, on my own.'
        },
        {
          category: 'Corporate web · EdTech',
          role: 'Sole developer',
          description:
            'Corporate website for a language school, focused on lead generation and brand. Sole developer: design (from an AI-generated base), development, SEO and a system for the academy to manage its own content without touching code.'
        }
      ])
    },
    experience: {
      tag: 'Experience',
      title: 'Five stages, from the internship to owning whole systems.',
      items: [
        {
          id: 'exp1',
          company: 'Freelance',
          role: 'Full-Stack & Automation',
          period: '2026 – present',
          achievements: [
            'Custom web applications and AI process automation for small businesses',
            'Integrating LLMs and external APIs into internal workflows',
            'Python, React, Node.js, OpenAI API, NFC'
          ]
        },
        {
          id: 'exp2',
          company: 'Tempel Group',
          role: 'Full Stack Developer',
          period: '2026',
          achievements: [
            'Owned the entire international web ecosystem of a multinational: brand consistency, performance and platform scalability',
            'Landing pages and corporate sites optimised for conversion across campaigns and launches',
            'Internal custom web applications, from scratch, with an efficient backend',
            'WordPress, PHP, MySQL, JavaScript, Tailwind CSS, REST API, Git'
          ]
        },
        {
          id: 'exp3',
          company: 'Devinet',
          role: 'Full Stack Developer',
          period: '2024 – 2026',
          achievements: [
            'Owned end to end an application for a multinational that ran its entire wardrobe production system, quality control included',
            'New backend and frontend features, query optimisation and internal process automation',
            'Designed complete solutions with the team, with reusable components and API integration',
            'CodeIgniter, MySQL, AWS, REST API, jQuery'
          ]
        },
        {
          id: 'exp4',
          company: 'Tenea',
          role: 'Backend Developer',
          period: '2023 – 2024',
          achievements: [
            'Maintenance and improvement of backend systems for enterprise clients',
            'Refactoring, endpoint optimisation and incident resolution in production',
            'Symfony, Node.js, RxJS, MySQL, React'
          ]
        },
        {
          id: 'exp5',
          company: 'Vilax',
          role: 'Web Development Internship',
          period: '2023',
          achievements: [
            'Corporate and e-commerce sites for clients, from Figma to production',
            'Multi-platform catalogue management and SEO implementation',
            'WordPress, PHP, Tailwind CSS, SEO, Figma, Google Analytics'
          ]
        }
      ]
    },
    services: {
      tag: 'Services',
      title: 'What you can hire. Freelance or for your team.',
      items: [
        { title: 'Custom management platforms', desc: 'Apps for academies and businesses: calendar, roles, passes, attendance tracking. Like JP Preparation.', url: 'https://www.jppreparation.com/' },
        { title: 'Corporate web & e-commerce', desc: 'Conversion-focused sites, with technical SEO and multi-language.', url: 'https://mykeracademy.com/' },
        { title: 'AI automation', desc: 'Workflows that integrate LLMs and external APIs. Among them, automated short-form video generation.' },
        { title: 'NFC', desc: 'Automations that connect the physical world to the system.' },
        { title: 'One-to-one AI mentoring', desc: 'Hands-on sessions to learn to work with AI in your day to day.' }
      ]
    },
    contact: {
      tag: 'Contact',
      title: 'Tell me what you want to build.',
      line: 'Available for freelance projects and to join a product team.',
      directLabel: 'Direct',
      socialLabel: 'Social',
      formName: 'Your name',
      formEmail: 'Your email',
      formIdea: 'Project or idea',
      footerLoc: 'Colònia Güell, Barcelona',
      footerRole: 'Full Stack Developer'
    }
  }
};
