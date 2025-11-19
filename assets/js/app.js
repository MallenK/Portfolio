// assets/js/app.js
(function(){
  document.documentElement.classList.add('js');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menú móvil (si existe)
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');
  function toggleMenu(force){
    if(!navMenu) return;
    const open = typeof force === 'boolean' ? force : !navMenu.classList.contains('is-open');
    navMenu.classList.toggle('is-open', open);
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
  }
  if(menuBtn && navMenu){
    menuBtn.addEventListener('click', e=>{ e.stopPropagation(); toggleMenu(); });
    document.addEventListener('click', e=>{
      if(!navMenu.classList.contains('is-open')) return;
      const inside = navMenu.contains(e.target) || menuBtn.contains(e.target);
      if(!inside) toggleMenu(false);
    });
    navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>toggleMenu(false)));
    document.addEventListener('keydown', e=>{ if(e.key==='Escape' && navMenu.classList.contains('is-open')) toggleMenu(false); });
  }

  // Scroll suave accesible
  if(!prefersReduced){
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        const id = a.getAttribute('href').slice(1);
        if(!id) return;
        const el = document.getElementById(id);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth', block:'start'});
          history.pushState(null, '', '#'+id);
          el.setAttribute('tabindex','-1');
          el.focus({preventScroll:true});
          setTimeout(()=>el.removeAttribute('tabindex'), 500);
        }
      }, {passive:true});
    });
  }

  // ==== Reveal on scroll con variaciones de efecto ====
  const animatedNodes = document.querySelectorAll('[data-animate], [data-animate-group]');
  const revealNow = (el)=>{
    if(el.hasAttribute('data-animate')) el.classList.add('is-visible');
    if(el.hasAttribute('data-animate-group')){
      el.classList.add('is-visible');
      const children = Array.from(el.children);
      children.forEach((child, i)=>{
        child.style.setProperty('--delay', `${i * 80}ms`);
        child.classList.add('is-visible');
      });
    }
  };
  if(animatedNodes.length){
    if(prefersReduced){
      animatedNodes.forEach(revealNow);
    } else {
      const io = new IntersectionObserver((entries, obs)=>{
        entries.forEach(entry=>{
          if(!entry.isIntersecting) return;
          revealNow(entry.target);
          obs.unobserve(entry.target);
        });
      }, {threshold:0.15, rootMargin:'0px 0px -10% 0px'});
      animatedNodes.forEach(el=>io.observe(el));
      // Garantiza hero visible si carga ya en viewport
      const hero = document.querySelector('.hero [data-animate]');
      if (hero){
        const r = hero.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) revealNow(hero);
      }
    }
  }

  // ==== Parallax múltiple por sección ====
  // Requiere: <div class="scene" data-parallax> ... <span class="layer" data-depth="0.2"> ... </span></div>
  const scenes = Array.from(document.querySelectorAll('.scene[data-parallax]'));
  function initParallaxOn(el){
    if(!el || prefersReduced) return;
    if(typeof Parallax === 'undefined') return;
    if(el._parallax) return;
    el._parallax = new Parallax(el, {
      relativeInput: true,
      scalarX: Number(el.getAttribute('data-scalar-x') || 14),
      scalarY: Number(el.getAttribute('data-scalar-y') || 14),
      frictionX: 0.12, frictionY: 0.12,
      hoverOnly: false
    });
  }
  function destroyParallaxOn(el){
    if(el && el._parallax && typeof el._parallax.destroy === 'function'){
      el._parallax.destroy(); el._parallax = null;
    }
  }

  // Carga defensiva del script si el CDN aún no está
  function ensureParallax(cb){
    if(prefersReduced) return;
    if(typeof Parallax !== 'undefined') { cb(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/parallax-js@3.1.0/dist/parallax.min.js';
    s.defer = true; s.onload = cb; s.onerror = cb;
    document.head.appendChild(s);
  }

  ensureParallax(()=>{
    scenes.forEach(initParallaxOn);
    // Pausa/reanuda en visibility change
    document.addEventListener('visibilitychange', ()=>{
      scenes.forEach(sc=>{
        if(!sc._parallax) return;
        if(document.visibilityState === 'hidden' && sc._parallax.disable) sc._parallax.disable();
        if(document.visibilityState === 'visible' && sc._parallax.enable) sc._parallax.enable();
      });
    });
    // Opcional: desactivar en móviles muy estrechos
    const mq = window.matchMedia('(max-width: 480px)');
    function handleMQ(e){ scenes.forEach(sc=> e.matches ? destroyParallaxOn(sc) : initParallaxOn(sc)); }
    if(mq.addEventListener) mq.addEventListener('change', handleMQ); else mq.addListener(handleMQ);
    handleMQ(mq);
  });

  // Año footer
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();




const translations = {
  es: {
    // --- NAV ---
    "nav.about": "Sobre mí",
    "nav.skills": "Skills",
    "nav.projects": "Proyectos",
    "nav.services": "Servicios",
    "nav.cv": "CV",
    "nav.contact": "Contacto",

    // --- HERO ---
    "hero.subtitle": "Web Developer",
    "hero.text": "Full-Stack centrado en rendimiento, accesibilidad y mantenimiento a largo plazo. Sitios y APIs claros, seguros y escalables.",
    "hero.btn_projects": "Ver proyectos",
    "hero.btn_budget": "Pedir presupuesto",

    // --- SOBRE MÍ ---
    "about.title": "Sobre mí",
    "about.p1": "Soy <strong>Sergi Mallén</strong>, desarrollador web con más de cuatro años de experiencia. Me especializo en la creación de sitios corporativos y aplicaciones web funcionales.",
    "about.p2": "Mi dominio abarca <strong>HTML, CSS, JavaScript, PHP y MySQL</strong>. Priorizo siempre un código limpio, una estructura lógica y la eficiencia del producto.",
    "about.p3": "He trabajado con frameworks como <strong>CodeIgniter</strong> y <strong>Symfony</strong>, además de tecnologías modernas como <strong>React</strong> y <strong>Node.js</strong>.",
    "about.list1": "Stack Principal: <strong>PHP, MySQL</strong>, CodeIgniter y React/Node.js.",
    "about.list2": "Filosofía: Código limpio, eficiencia y fiabilidad del Backend.",
    "about.list3": "Herramientas: Git, jQuery, WordPress, Figma y SEO.",
    "about.btn_contact": "Contactar",

    // --- SKILLS ---
    "skills.title": "Skills",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend & Bases de Datos",
    "skills.tools": "Plataformas & Herramientas",

    // --- PROYECTOS ---
    "projects.title": "Proyectos",
    "projects.p1_desc": "Web corporativa del restaurante. Contenidos claros, diseño accesible y enfoque local.",
    "projects.p2_desc": "Equipo de soporte técnico internacional para herramientas de gestión interna de Schneider Electric.",
    "projects.p3_desc": "Diseño y maquetación de la web corporativa para taller de motos local.",
    "projects.p4_desc": "Diseño y maquetación web corporativa para traductora independiente.",
    "projects.tpl_title": "Plantillas",
    "projects.tpl_desc": "Plantilla ligera para negocios locales, optimizada para móvil y despliegue rápido.",
    "projects.btn_visit": "Visitar",
    "projects.btn_demo": "Ver demo",

    // --- SERVICIOS ---
    "services.title": "Servicios",
    "services.s1_title": "Creación de páginas web",
    "services.s1_desc": "Webs rápidas, seguras y fáciles de gestionar.",
    "services.s2_title": "Rediseño de webs",
    "services.s2_desc": "Mejora visual, UX y rendimiento.",
    "services.s3_title": "Consultoría web",
    "services.s3_desc": "Auditoría y plan de mejoras.",
    "services.s4_title": "Gestión de e-commerce",
    "services.s4_desc": "Soporte y contenidos mensuales.",
    "services.s5_title": "Clases de programación",
    "services.s5_desc": "Sesiones 1:1 prácticas.",
    "services.price_hour": "€/h",
    "services.price_month": "€/mes",

    // --- CV / EXPERIENCIA ---
    "cv.title": "Experiencia",
    "cv.btn_download": "Descargar CV",
    "cv.job1_title": "Full Stack Developer",
    "cv.job1_desc": "Desarrollo de apps internas, APIs y automatización de procesos corporativos.",
    "cv.job2_title": "Desarrollador Backend",
    "cv.job2_desc": "Mantenimiento de sistemas backend, optimización de rendimiento y refactorización.",
    "cv.job3_title": "Desarrollador Web",
    "cv.job3_desc": "Creación de webs corporativas, tiendas online y optimización SEO.",
    "cv.job4_title": "Operaciones Digitales",
    "cv.job4_desc": "Gestión de catálogos, SEO técnico y optimización de e-commerce.",

    // --- CONTACTO ---
    "contact.title": "Contacto",
    "contact.subtitle": "Hablemos de tu proyecto",
    "contact.text": "Cuéntame qué necesitas: una nueva web, mejorar la actual o desarrollo a medida. Suelo responder en 24–48 h.",
    "contact.form_name": "Tu nombre",
    "contact.form_email": "Tu email",
    "contact.form_msg_ph": "Cuéntame brevemente tu proyecto, objetivos y plazos",
    "contact.btn_send": "Enviar mensaje",
    "contact.privacy": "No compartiré tus datos con terceros.",
    "contact.budget_note": "Si quieres, indícame también presupuesto aproximado y plazos deseados.",

    // --- FOOTER ---
    "footer.role": "Desarrollador Web Full-Stack — Portfolio personal",
    "footer.hosted": "Alojado en"
  },

  ca: {
    // --- NAV ---
    "nav.about": "Sobre mi",
    "nav.skills": "Habilitats",
    "nav.projects": "Projectes",
    "nav.services": "Serveis",
    "nav.cv": "CV",
    "nav.contact": "Contacte",

    // --- HERO ---
    "hero.subtitle": "Desenvolupador Web",
    "hero.text": "Full-Stack centrat en rendiment, accessibilitat i manteniment a llarg termini. Llocs i APIs clars, segurs i escalables.",
    "hero.btn_projects": "Veure projectes",
    "hero.btn_budget": "Demanar pressupost",

    // --- SOBRE MÍ ---
    "about.title": "Sobre mi",
    "about.p1": "Sóc <strong>Sergi Mallén</strong>, desenvolupador web amb més de quatre anys d'experiència. M'especialitzo en la creació de llocs corporatius i aplicacions web funcionals.",
    "about.p2": "El meu domini abasta <strong>HTML, CSS, JavaScript, PHP i MySQL</strong>. Prioritzo sempre un codi net, una estructura lògica i l'eficiència del producte.",
    "about.p3": "He treballat amb frameworks com <strong>CodeIgniter</strong> i <strong>Symfony</strong>, a més de tecnologies modernes com <strong>React</strong> i <strong>Node.js</strong>.",
    "about.list1": "Stack Principal: <strong>PHP, MySQL</strong>, CodeIgniter i React/Node.js.",
    "about.list2": "Filosofia: Codi net, eficiència i fiabilitat del Backend.",
    "about.list3": "Eines: Git, jQuery, WordPress, Figma i SEO.",
    "about.btn_contact": "Contactar",

    // --- SKILLS ---
    "skills.title": "Habilitats",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend i Bases de Dades",
    "skills.tools": "Plataformes i Eines",

    // --- PROYECTOS ---
    "projects.title": "Projectes",
    "projects.p1_desc": "Web corporativa del restaurant. Continguts clars, disseny accessible i enfocament local.",
    "projects.p2_desc": "Equip de suport tècnic internacional per a eines de gestió interna de Schneider Electric.",
    "projects.p3_desc": "Disseny i maquetació de la web corporativa per a taller de motos local.",
    "projects.p4_desc": "Disseny i maquetació web corporativa per a traductora independent.",
    "projects.tpl_title": "Plantilles",
    "projects.tpl_desc": "Plantilla lleugera per a negocis locals, optimitzada per a mòbil i desplegament ràpid.",
    "projects.btn_visit": "Visitar",
    "projects.btn_demo": "Veure demo",

    // --- SERVICIOS ---
    "services.title": "Serveis",
    "services.s1_title": "Creació de pàgines web",
    "services.s1_desc": "Webs ràpides, segures i fàcils de gestionar.",
    "services.s2_title": "Redisseny de webs",
    "services.s2_desc": "Millora visual, UX i rendiment.",
    "services.s3_title": "Consultoria web",
    "services.s3_desc": "Auditoria i pla de millores.",
    "services.s4_title": "Gestió d'e-commerce",
    "services.s4_desc": "Suport i continguts mensuals.",
    "services.s5_title": "Classes de programació",
    "services.s5_desc": "Sessions 1:1 pràctiques.",
    "services.price_hour": "€/h",
    "services.price_month": "€/mes",

    // --- CV / EXPERIENCIA ---
    "cv.title": "Experiència",
    "cv.btn_download": "Descarregar CV",
    "cv.job1_title": "Full Stack Developer",
    "cv.job1_desc": "Desenvolupament d'apps internes, APIs i automatització de processos corporatius.",
    "cv.job2_title": "Desenvolupador Backend",
    "cv.job2_desc": "Manteniment de sistemes backend, optimització de rendiment i refactorització.",
    "cv.job3_title": "Desenvolupador Web",
    "cv.job3_desc": "Creació de webs corporatives, botigues online i optimització SEO.",
    "cv.job4_title": "Operacions Digitals",
    "cv.job4_desc": "Gestió de catàlegs, SEO tècnic i optimització d'e-commerce.",

    // --- CONTACTO ---
    "contact.title": "Contacte",
    "contact.subtitle": "Parlem del teu projecte",
    "contact.text": "Explica'm què necessites: una nova web, millorar l'actual o desenvolupament a mida. Solc respondre en 24–48 h.",
    "contact.form_name": "El teu nom",
    "contact.form_email": "El teu email",
    "contact.form_msg_ph": "Explica'm breument el teu projecte, objectius i terminis",
    "contact.btn_send": "Enviar missatge",
    "contact.privacy": "No compartiré les teves dades amb tercers.",
    "contact.budget_note": "Si vols, indica'm també pressupost aproximat i terminis desitjats.",

    // --- FOOTER ---
    "footer.role": "Desenvolupador Web Full-Stack — Portfolio personal",
    "footer.hosted": "Allotjat a"
  },

  en: {
    // --- NAV ---
    "nav.about": "About me",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.services": "Services",
    "nav.cv": "CV",
    "nav.contact": "Contact",

    // --- HERO ---
    "hero.subtitle": "Web Developer",
    "hero.text": "Full-Stack focused on performance, accessibility, and long-term maintenance. Clear, secure, and scalable sites and APIs.",
    "hero.btn_projects": "View projects",
    "hero.btn_budget": "Get a quote",

    // --- ABOUT ME ---
    "about.title": "About me",
    "about.p1": "I am <strong>Sergi Mallén</strong>, a web developer with over four years of experience. I specialize in building corporate sites and functional web applications.",
    "about.p2": "My domain covers <strong>HTML, CSS, JavaScript, PHP, and MySQL</strong>. I always prioritize clean code, logical structure, and product efficiency.",
    "about.p3": "I have worked with frameworks like <strong>CodeIgniter</strong> and <strong>Symfony</strong>, as well as modern technologies like <strong>React</strong> and <strong>Node.js</strong>.",
    "about.list1": "Main Stack: <strong>PHP, MySQL</strong>, CodeIgniter and React/Node.js.",
    "about.list2": "Philosophy: Clean code, efficiency, and Backend reliability.",
    "about.list3": "Tools: Git, jQuery, WordPress, Figma, and SEO.",
    "about.btn_contact": "Contact",

    // --- SKILLS ---
    "skills.title": "Skills",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend & Databases",
    "skills.tools": "Platforms & Tools",

    // --- PROJECTS ---
    "projects.title": "Projects",
    "projects.p1_desc": "Corporate website for the restaurant. Clear content, accessible design, and local focus.",
    "projects.p2_desc": "International technical support team for internal management tools at Schneider Electric.",
    "projects.p3_desc": "Design and layout of the corporate website for a local motorcycle workshop.",
    "projects.p4_desc": "Design and web layout for a freelance translator.",
    "projects.tpl_title": "Templates",
    "projects.tpl_desc": "Lightweight template for local businesses, optimized for mobile and quick deployment.",
    "projects.btn_visit": "Visit",
    "projects.btn_demo": "View demo",

    // --- SERVICES ---
    "services.title": "Services",
    "services.s1_title": "Website Creation",
    "services.s1_desc": "Fast, secure, and easy-to-manage websites.",
    "services.s2_title": "Web Redesign",
    "services.s2_desc": "Visual improvement, UX, and performance.",
    "services.s3_title": "Web Consulting",
    "services.s3_desc": "Audit and improvement plan.",
    "services.s4_title": "E-commerce Management",
    "services.s4_desc": "Support and monthly content updates.",
    "services.s5_title": "Programming Classes",
    "services.s5_desc": "Practical 1:1 sessions.",
    "services.price_hour": "€/h",
    "services.price_month": "€/month",

    // --- CV / EXPERIENCE ---
    "cv.title": "Experience",
    "cv.btn_download": "Download CV",
    "cv.job1_title": "Full Stack Developer",
    "cv.job1_desc": "Development of internal apps, APIs, and corporate process automation.",
    "cv.job2_title": "Backend Developer",
    "cv.job2_desc": "Maintenance of backend systems, performance optimization, and refactoring.",
    "cv.job3_title": "Web Developer",
    "cv.job3_desc": "Creation of corporate websites, online stores, and SEO optimization.",
    "cv.job4_title": "Digital Operations",
    "cv.job4_desc": "Catalog management, technical SEO, and e-commerce optimization.",

    // --- CONTACT ---
    "contact.title": "Contact",
    "contact.subtitle": "Let's talk about your project",
    "contact.text": "Tell me what you need: a new website, improving the current one, or custom development. I usually reply in 24–48h.",
    "contact.form_name": "Your name",
    "contact.form_email": "Your email",
    "contact.form_msg_ph": "Briefly tell me about your project, goals, and deadlines",
    "contact.btn_send": "Send message",
    "contact.privacy": "I will not share your data with third parties.",
    "contact.budget_note": "If you like, also tell me your approximate budget and desired deadlines.",

    // --- FOOTER ---
    "footer.role": "Full-Stack Web Developer — Personal Portfolio",
    "footer.hosted": "Hosted on"
  }
};

function changeLanguage(lang) {
  // 1. Actualizar textos
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      // Usamos innerHTML para permitir negritas (<strong>)
      element.innerHTML = translations[lang][key];
    }
  });

  // 2. Actualizar atributo lang del HTML (bueno para SEO)
  document.documentElement.lang = lang;

  // 3. Guardar preferencia en LocalStorage
  localStorage.setItem('selectedLang', lang);

  // 4. Actualizar estilo visual de los botones
  updateActiveButton(lang);
}

function updateActiveButton(lang) {
  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    // Comprobamos si el texto del botón coincide con el idioma o usamos un data-attribute en el botón
    if(btn.getAttribute('onclick').includes(lang)) {
      btn.classList.add('active');
    }
  });
}

// Al cargar la página, verificar si hay idioma guardado
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('selectedLang') || 'es';
  changeLanguage(savedLang);
});