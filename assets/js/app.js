// assets/js/app.js

(function(){
  const scriptEl = document.currentScript;
  const rootPath = scriptEl?.dataset.root || '.';
  const basePath = document.body?.dataset?.base || './';
  const dataUrl = `${rootPath}/assets/data/site-content.json`;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let siteData = null;

  const resolveInternalUrl = (slug) => {
    if(/^https?:/i.test(slug)) return slug;
    return basePath.endsWith('/') ? `${basePath}${slug}` : `${basePath}/${slug}`;
  };

  const getValue = (path, fallback = '') => {
    if(!siteData) return fallback;
    return path.split('.').reduce((acc, key) => (acc && typeof acc === 'object') ? acc[key] : undefined, siteData) ?? fallback;
  };

  const formatDate = (iso) => {
    try{
      return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(new Date(iso));
    }catch(err){
      return iso;
    }
  };

  const renderProjects = () => {
    const container = document.querySelector('[data-dynamic="projects"]');
    if(!container || !Array.isArray(siteData?.projects)) return;
    container.innerHTML = '';
    siteData.projects.forEach((project) => {
      const article = document.createElement('article');
      article.className = 'card project neo-depth';
      article.setAttribute('role', 'listitem');
      article.innerHTML = `
        <figure class="media neo-depth">
          <img loading="lazy" src="${project.image}" alt="${project.imageAlt}">
        </figure>
        <div class="project-body">
          <h3>${project.title}</h3>
          <p class="muted">${project.summary}</p>
          <div class="card-actions">
            <a class="btn btn-primary" href="${project.url}" target="_blank" rel="noopener noreferrer">${project.cta}</a>
          </div>
        </div>
      `;
      container.appendChild(article);
    });
  };

  const renderServices = () => {
    const container = document.querySelector('[data-dynamic="services"]');
    if(!container || !Array.isArray(siteData?.services)) return;
    container.innerHTML = '';
    siteData.services.forEach((service) => {
      const card = document.createElement('div');
      card.className = 'card service neo-depth';
      card.setAttribute('role', 'listitem');
      card.innerHTML = `
        <h3>${service.title}</h3>
        <p class="muted">${service.tagline}</p>
        <p class="price">${service.price}</p>
      `;
      container.appendChild(card);
    });
  };

  const renderTimeline = () => {
    const container = document.querySelector('[data-dynamic="experience"]');
    if(container && Array.isArray(siteData?.experience)){
      container.innerHTML = '';
      siteData.experience.forEach((item) => {
        const block = document.createElement('div');
        block.className = 'timeline-item neo-depth';
        block.setAttribute('role', 'listitem');
        block.innerHTML = `
          <div class="timeline-header">
            <strong>${item.role} — ${item.company}</strong>
            <span class="muted">${item.period}</span>
          </div>
          <p class="muted">${item.description}</p>
        `;
        container.appendChild(block);
      });
    }

    const eduContainer = document.querySelector('[data-dynamic="education"]');
    if(eduContainer && Array.isArray(siteData?.education)){
      eduContainer.innerHTML = '';
      siteData.education.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'card neo-depth';
        card.setAttribute('role', 'listitem');
        card.innerHTML = `
          <h4>${item.title}</h4>
          <p class="muted">${item.year}</p>
        `;
        eduContainer.appendChild(card);
      });
    }
  };

  const renderBlogHighlights = () => {
    const containers = document.querySelectorAll('[data-dynamic="blog-latest"]');
    if(!containers.length || !Array.isArray(siteData?.blogPosts)) return;
    const posts = siteData.blogPosts.slice().sort((a,b)=>new Date(b.date) - new Date(a.date)).slice(0,3);
    containers.forEach((container) => {
      container.innerHTML = '';
      posts.forEach((post) => {
        const article = document.createElement('article');
        article.className = 'card blog-card neo-depth';
        article.setAttribute('role', 'listitem');
        article.innerHTML = `
          <h3>
            <a href="${resolveInternalUrl(post.slug)}">${post.title}</a>
          </h3>
          <p class="muted">${post.excerpt}</p>
          <p class="blog-meta"><time datetime="${post.date}">${formatDate(post.date)}</time> · ${post.readingTime}</p>
        `;
        container.appendChild(article);
      });
    });
  };

  const renderBlogIndex = () => {
    const container = document.querySelector('[data-dynamic="blog-index"]');
    if(!container || !Array.isArray(siteData?.blogPosts)) return;
    container.innerHTML = '';
    const posts = siteData.blogPosts.slice().sort((a,b)=>new Date(b.date) - new Date(a.date));
    posts.forEach((post) => {
      const article = document.createElement('article');
      article.className = 'card blog-card neo-depth';
      article.setAttribute('role', 'listitem');
      const tags = Array.isArray(post.tags) ? post.tags.map(tag => `<span class="pill">${tag}</span>`).join('') : '';
      article.innerHTML = `
        <div class="blog-card-head">
          <h3><a href="${resolveInternalUrl(post.slug)}">${post.title}</a></h3>
          <p class="blog-meta"><time datetime="${post.date}">${formatDate(post.date)}</time> · ${post.readingTime}</p>
        </div>
        <p class="muted">${post.excerpt}</p>
        <div class="blog-tags" aria-label="Etiquetas">${tags}</div>
      `;
      container.appendChild(article);
    });
  };

  const renderRelatedPosts = () => {
    const container = document.querySelector('[data-dynamic="related-posts"]');
    if(!container || !Array.isArray(siteData?.blogPosts)) return;
    const currentSlug = container.dataset.currentSlug;
    const posts = siteData.blogPosts.filter(post => post.slug !== currentSlug).slice(0,3);
    container.innerHTML = '';
    posts.forEach((post) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${resolveInternalUrl(post.slug)}">${post.title}</a>`;
      container.appendChild(li);
    });
  };

  const applyBindings = () => {
    document.querySelectorAll('[data-bind-text]').forEach((el) => {
      const value = getValue(el.dataset.bindText);
      if(value) el.textContent = value;
    });
    document.querySelectorAll('[data-bind-href]').forEach((el) => {
      const value = getValue(el.dataset.bindHref);
      if(value) el.setAttribute('href', value);
    });
  };

  const activateParallax = () => {
    if(prefersReduced) return;
    const parallaxItems = document.querySelectorAll('[data-parallax]');
    if(!parallaxItems.length) return;
    const update = () => {
      const scrollY = window.scrollY;
      parallaxItems.forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 0.25;
        el.style.transform = `translate3d(0, ${scrollY * speed * -1}px, 0)`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  };

  const hydrate = () => {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        siteData = data;
        applyBindings();
        renderProjects();
        renderServices();
        renderTimeline();
        renderBlogHighlights();
        renderBlogIndex();
        renderRelatedPosts();
      })
      .catch((err) => {
        console.warn('No se pudo cargar el contenido dinámico', err);
      });
  };

  // Menú móvil
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');

  function toggleMenu(force){
    if(!navMenu) return;
    const open = typeof force === 'boolean' ? force : !navMenu.classList.contains('is-open');
    navMenu.classList.toggle('is-open', open);
    if(menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
  }

  if(menuBtn && navMenu){
    menuBtn.addEventListener('click', (e)=>{ e.stopPropagation(); toggleMenu(); });
    document.addEventListener('click', (e)=>{
      if(!navMenu.classList.contains('is-open')) return;
      const inside = navMenu.contains(e.target) || menuBtn.contains(e.target);
      if(!inside) toggleMenu(false);
    });
    navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>toggleMenu(false)));
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && navMenu.classList.contains('is-open')) toggleMenu(false); });
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

  // Año footer
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  hydrate();
  activateParallax();
})();
