// assets/js/app.js

(function(){
  document.documentElement.classList.add('js');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReduced = motionQuery.matches;

  // Menú móvil
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');

  function toggleMenu(force){
    const open = typeof force === 'boolean' ? force : !navMenu.classList.contains('is-open');
    navMenu.classList.toggle('is-open', open);
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
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

  // Animaciones y parallax
  if(!prefersReduced){
    const heroScene = document.getElementById('heroParallax');
    if(heroScene && typeof Parallax !== 'undefined'){
      new Parallax(heroScene);
    }
  }

  const animatedElements = document.querySelectorAll('[data-animate], [data-animate-group]');
  if(animatedElements.length){
    if(prefersReduced){
      animatedElements.forEach(el=>{
        if(el.hasAttribute('data-animate')) el.classList.add('is-visible');
        if(el.hasAttribute('data-animate-group')){
          el.classList.add('is-visible');
          Array.from(el.children).forEach(child=>child.classList.add('is-visible'));
        }
      });
    } else {
      const observer = new IntersectionObserver((entries, obs)=>{
        entries.forEach(entry=>{
          if(!entry.isIntersecting) return;
          const el = entry.target;
          if(el.hasAttribute('data-animate')) el.classList.add('is-visible');
          if(el.hasAttribute('data-animate-group')){
            el.classList.add('is-visible');
            const children = Array.from(el.children);
            children.forEach((child, index)=>{
              child.style.setProperty('--delay', `${index * 70}ms`);
              requestAnimationFrame(()=>child.classList.add('is-visible'));
            });
          }
          obs.unobserve(el);
        });
      }, {threshold:0.18, rootMargin:'0px 0px -10% 0px'});

      animatedElements.forEach(el=>observer.observe(el));
    }
  }

  // Año footer
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();
