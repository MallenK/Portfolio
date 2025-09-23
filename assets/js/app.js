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

  // -------- Animaciones on-scroll --------
  const animated = document.querySelectorAll('[data-animate], [data-animate-group]');

  function revealNow(el){
    if(el.hasAttribute('data-animate')) el.classList.add('is-visible');
    if(el.hasAttribute('data-animate-group')){
      el.classList.add('is-visible');
      const children = Array.from(el.children);
      children.forEach((child, index)=>{
        child.style.setProperty('--delay', `${index * 70}ms`);
        child.classList.add('is-visible');
      });
    }
  }

  if(animated.length){
    if(prefersReduced){
      animated.forEach(revealNow);
    } else {
      const observer = new IntersectionObserver((entries, obs)=>{
        entries.forEach(entry=>{
          if(!entry.isIntersecting) return;
          revealNow(entry.target);
          obs.unobserve(entry.target);
        });
      }, {threshold:0.15, rootMargin:'0px 0px -10% 0px'});

      animated.forEach(el=>observer.observe(el));

      // Fuerza visibilidad inmediata del hero si ya está en viewport al cargar
      const heroSection = document.querySelector('.hero[data-animate]');
      if (heroSection) {
        const r = heroSection.getBoundingClientRect();
        const inView = r.top < window.innerHeight && r.bottom > 0;
        if(inView) revealNow(heroSection);
      }
    }
  }

  // -------- Parallax hero --------
  const heroScene = document.getElementById('heroParallax');
  const enableParallax = !!heroScene && !prefersReduced;

  function loadScript(src, cb){
    const s = document.createElement('script');
    s.src = src; s.defer = true; s.onload = cb; s.onerror = cb;
    document.head.appendChild(s);
  }

  function initParallax(){
    if(!enableParallax) return;
    if(heroScene._parallax) return;
    if(typeof Parallax === 'undefined') { return; }
    heroScene.style.transformStyle = 'preserve-3d';
    heroScene._parallax = new Parallax(heroScene, {
      relativeInput: true,
      hoverOnly: false,
      scalarX: 12,
      scalarY: 12,
      frictionX: 0.1,
      frictionY: 0.1
    });
  }

  function destroyParallax(){
    if(heroScene && heroScene._parallax && typeof heroScene._parallax.destroy === 'function'){
      heroScene._parallax.destroy();
      heroScene._parallax = null;
    }
  }

  if(enableParallax){
    if(typeof Parallax === 'undefined'){
      // Fallback por si el CDN no cargó por orden de red
      loadScript('https://cdn.jsdelivr.net/npm/parallax-js@3.1.0/dist/parallax.min.js', initParallax);
    } else {
      initParallax();
    }

    // Desactiva en pantallas muy estrechas si quieres
    const mq = window.matchMedia('(max-width: 480px)');
    function handleMQ(e){ e.matches ? destroyParallax() : initParallax(); }
    if(mq.addEventListener){ mq.addEventListener('change', handleMQ); }
    else { mq.addListener(handleMQ); }
    handleMQ(mq);

    // Pausa cuando la pestaña no es visible
    document.addEventListener('visibilitychange', ()=>{
      if(!heroScene || !heroScene._parallax) return;
      if(document.visibilityState === 'hidden' && heroScene._parallax.disable) heroScene._parallax.disable();
      if(document.visibilityState === 'visible' && heroScene._parallax.enable) heroScene._parallax.enable();
    });

    // Limpieza
    window.addEventListener('pagehide', destroyParallax);
  }

  // Año footer
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();
