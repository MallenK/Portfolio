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

  // ==== Reveal on scroll (fallback sin GSAP) ====
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

    // ==== GSAP (ScrollSmoother + paneles fullpage + on-scroll) ====
  try {
    const canAnimate = !prefersReduced && typeof window.gsap !== 'undefined';
    if (canAnimate) {
      const gs = window.gsap;
      const ST = window.ScrollTrigger;
      const SS = window.ScrollSmoother;

      if (ST) gs.registerPlugin(ST);
      if (ST && SS) gs.registerPlugin(SS);

      if (ST) {
        ST.defaults({
          markers: {
            startColor: 'lime',
            endColor: 'crimson',
            fontSize: '11px',
            indent: 18
          }
        });
      }

      gs.config({ nullTargetWarn: false });

      // Optimización de composición
      gs.set('.neoglass, .card, .section-head, .title, .kicker, .cta .btn', {
        willChange: 'transform, opacity'
      });

      // ---------------- ScrollSmoother ----------------
      let smoother = null;
      if (SS && !prefersReduced) {
        smoother = SS.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.5,       // cuanto mayor, más “resbaladizo”
          effects: true
        });
        console.log('[GSAP][SMOOTHER] creado', smoother);
      } else {
        console.log('[GSAP][SMOOTHER] no disponible (sin plugin o motion reduce)');
      }

      // Helper estado inicial
      const setInitialState = (targets) => {
        gs.set(targets, {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 0.98,
          opacity: 0,
          visibility: 'hidden',
          transformOrigin: '50% 50%',
          force3D: true
        });
      };

      // ======================================================
      // 1) Paneles fullpage (cada sección como "pantalla") + snap suave
      // ======================================================
      const panels = gs.utils.toArray('main > section.parallax-wrap, main > footer.parallax-wrap');

      panels.forEach((panel, index) => {
        if (index === 0) {
          // Hero visible de inicio
          gs.set(panel, {
            opacity: 1,
            y: 0,
            visibility: 'inherit'
          });
        } else {
          gs.set(panel, {
            opacity: 0,
            y: 80,
            visibility: 'hidden'
          });

          if (ST) {
            gs.to(panel, {
              opacity: 1,
              y: 0,
              visibility: 'inherit',
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top center',
                end: 'bottom center',
                toggleActions: 'play none none reverse',
                markers: true,
                onEnter: (self) => {
                  console.log('[GSAP][PANEL ENTER]', panel.id || panel, {
                    start: self.start,
                    end: self.end
                  });
                },
                onLeaveBack: (self) => {
                  console.log('[GSAP][PANEL LEAVEBACK]', panel.id || panel, {
                    progress: self.progress
                  });
                }
              }
            });
          }
        }
      });

      // ======================================================
      // 1.b) Botones Anterior / Siguiente entre secciones
      // ======================================================

      // Helper para hacer scroll a un panel concreto
      const scrollToPanel = (index) => {
        const target = panels[index];
        if (!target) return;

        console.log('[NAV][SCROLL TO PANEL]', index, target.id || target);

        if (smoother) {
          // ScrollSmoother controla el scroll
          smoother.scrollTo(target, true); // true = animado
        } else {
          // Fallback: scroll nativo suave
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      panels.forEach((panel, index) => {
        const hasPrev = index > 0;
        const hasNext = index < panels.length - 1;

        // Si no hay ni anterior ni siguiente (solo en el caso absurdo de una sola sección), no hacemos nada
        if (!hasPrev && !hasNext) return;

        const nav = document.createElement('div');
        nav.className = 'section-nav';

        // Botón anterior
        if (hasPrev) {
          const prevBtn = document.createElement('button');
          prevBtn.type = 'button';
          prevBtn.className = 'btn btn-outline btn-section-nav btn-prev';
          prevBtn.textContent = '↑ Sección anterior';
          prevBtn.setAttribute('aria-label', 'Ir a la sección anterior');
          prevBtn.addEventListener('click', () => scrollToPanel(index - 1));
          nav.appendChild(prevBtn);
        }

        // Botón siguiente
        if (hasNext) {
          const nextBtn = document.createElement('button');
          nextBtn.type = 'button';
          nextBtn.className = 'btn btn-primary btn-section-nav btn-next';
          nextBtn.textContent = 'Siguiente sección ↓';
          nextBtn.setAttribute('aria-label', 'Ir a la siguiente sección');
          nextBtn.addEventListener('click', () => scrollToPanel(index + 1));
          nav.appendChild(nextBtn);
        }

        // Insertamos la navegación al final del contenido de la sección
        // Si existe .parallax-slot, la ponemos dentro; si no, al final del panel
        const slot = panel.querySelector('.parallax-slot') || panel;
        slot.appendChild(nav);

        console.log('[NAV][INIT SECTION NAV]', {
          panelIndex: index,
          panelId: panel.id || null,
          hasPrev,
          hasNext
        });
      });


      // Snap entre secciones (suave gracias al ScrollSmoother)
      if (ST && panels.length > 1) {
        ST.create({
          trigger: '#smooth-content',
          start: 'top top',
          end: 'bottom bottom',
          snap: {
            snapTo: (value) => {
              // value = progreso 0..1, lo mapeamos a panel más cercano
              const n = panels.length - 1;
              const snapIndex = Math.round(value * n);
              const result = snapIndex / n;
              console.log('[GSAP][SNAP]', { value, snapIndex, result });
              return result;
            },
            duration: 0.25,
            ease: 'power1.out'
          },
          markers: true
        });
      }

      // ======================================================
      // 2) Intro del HERO (título + kicker + botones)
      // ======================================================
      setInitialState(['#hero-title', '.kicker', '.cta .btn']);

      const heroTl = gs.timeline({
        defaults: { duration: 0.8, ease: 'power3.out' },
        onStart: () => console.log('[GSAP][HERO] timeline start'),
        onComplete: () => console.log('[GSAP][HERO] timeline complete')
      });

      heroTl
        .to('#hero-title', { opacity: 1, visibility: 'inherit', scale: 1, y: 0 }, 0)
        .to('.kicker', { opacity: 1, visibility: 'inherit', scale: 1, y: 0 }, '-=0.5')
        .to('.cta .btn', {
          opacity: 1,
          visibility: 'inherit',
          scale: 1,
          y: 0,
          stagger: 0.08
        }, '-=0.5');

      // ======================================================
      // 3) Presets por data-effect para elementos internos
      // ======================================================
      const presets = {
        fade:     { to: { opacity: 1, visibility: 'inherit', scale: 1 } },
        up:       { to: { opacity: 1, visibility: 'inherit', scale: 1, y: 0 } },
        down:     { to: { opacity: 1, visibility: 'inherit', scale: 1, y: 0 } },
        blur:     { to: { opacity: 1, visibility: 'inherit', scale: 1, y: 0, filter: 'blur(0px)' } },
        blackout: { to: { opacity: 1, visibility: 'inherit', scale: 1 } }
      };

      // Excluimos .hero de singles
      const singles = Array.from(document.querySelectorAll('[data-animate]'))
        .filter(el => !el.classList.contains('hero'));

      const groups  = Array.from(document.querySelectorAll('[data-animate-group]'));

      setInitialState(singles);
      groups.forEach(g => setInitialState(Array.from(g.children)));

      // ======================================================
      // 4) [data-animate] individual
      // ======================================================
      singles.forEach((el, idx) => {
        const effect = el.getAttribute('data-effect') || 'fade';
        const cfg = presets[effect] || presets.fade;

        console.groupCollapsed(`[GSAP][INIT SINGLE] #${idx} ${effect}`);
        console.log('target:', el);
        console.groupEnd();

        gs.to(el, {
          ...cfg.to,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: ST && {
            trigger: el.closest('section.parallax-wrap') || el,
            start: 'top 70%',
            end: 'bottom 60%',
            once: true,
            markers: true,
            onEnter: (self) => {
              console.log('[GSAP][ENTER SINGLE]', el, {
                start: self.start,
                end: self.end,
                progress: self.progress
              });
            },
            onUpdate: (self) => {
              console.log('[GSAP][UPDATE SINGLE]', el, {
                progress: Number(self.progress.toFixed(3)),
                direction: self.direction
              });
            }
          }
        });
      });

      // ======================================================
      // 5) [data-animate-group] con stagger
      // ======================================================
      groups.forEach((group, gIdx) => {
        const kids = Array.from(group.children).filter(n => n.nodeType === 1);
        if (!kids.length) return;

        console.groupCollapsed(`[GSAP][GROUP INIT] #${gIdx}`);
        console.log('group:', group, 'children:', kids.length);
        console.groupEnd();

        gs.to(kids, {
          opacity: 1,
          visibility: 'inherit',
          scale: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: ST && {
            trigger: group.closest('section.parallax-wrap') || group,
            start: 'top 75%',
            end: 'top 40%',
            once: true,
            markers: true,
            onEnter: (self) =>
              console.log('[GSAP][GROUP ENTER]', group, {
                start: self.start,
                end: self.end
              }),
            onUpdate: (self) =>
              console.log('[GSAP][GROUP UPDATE]', group, {
                progress: Number(self.progress.toFixed(3))
              })
          }
        });
      });

      // ======================================================
      // 6) Micro-parallax vertical de tarjetas (suave)
      // ======================================================
      gs.utils.toArray('.project.card, .service.card, .timeline-item').forEach((el, i) => {
        gs.fromTo(el, { y: 20 }, {
          y: 0,
          ease: 'none',
          scrollTrigger: ST && {
            trigger: el.closest('section.parallax-wrap') || el,
            start: 'top bottom',
            end: 'top center',
            scrub: 0.2,
            markers: true,
            onEnter: () => console.log('[GSAP][PARALLAX ENTER]', i, el),
            onUpdate: (self) =>
              console.log('[GSAP][PARALLAX UPDATE]', i, {
                progress: Number(self.progress.toFixed(3))
              })
          }
        });
      });

      // app.js (Bloque de Animación de Fondo)

      // ======================================================
      // 7) Animación de Fondo: Movimiento de Ola Explicito
      // ======================================================
      try {
          // 1. Crear un Timeline para la animación infinita
          const backgroundTimeline = gs.timeline({
              repeat: -1, // Repetir infinitamente
              yoyo: true, // Animación de ida y vuelta
              ease: 'linear' // Movimiento constante
          });

          // 2. Definir los movimientos de background-position
          backgroundTimeline
          .to('body', {
              // Mover a la esquina inferior derecha
              '--bg-position': '100% 100%',
              duration: 30, // Duración lenta: 30 segundos
              ease: 'none'
          })
          .to('body', {
              // Mover a la esquina superior derecha
              '--bg-position': '100% 0%',
              duration: 30,
              ease: 'none'
          });

      } catch (err) {
          console.warn('[GSAP] Background movement init error:', err);
      }





    }
  } catch (err) {
    console.warn('[GSAP] init error:', err);
  }



  // Año footer
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();
