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
        child.style.setProperty('--delay', `${i * 0}ms`);
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
