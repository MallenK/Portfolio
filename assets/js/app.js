// assets/js/app.js

(function(){
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
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
})();
